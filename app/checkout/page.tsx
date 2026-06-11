'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Course, Batch } from '@/lib/types';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from '@/components/payment-form';
import { Loader } from 'lucide-react';

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY 
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null;

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const courseId = searchParams.get('courseId');
  const batchId = searchParams.get('batchId');
  
  const [course, setCourse] = useState<Course | null>(null);
  const [batch, setBatch] = useState<Batch | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadCheckoutData() {
      try {
        // Lazy load supabase only in browser
        const { supabase } = await import('@/lib/supabase');
        
        // Check authentication
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session?.user) {
          router.push(`/sign-in?redirect=/checkout?courseId=${courseId}&batchId=${batchId}`);
          return;
        }

        setUser(session.user);

        // Get course and batch data
        if (courseId) {
          const { data: courseData } = await supabase
            .from('courses')
            .select('*')
            .eq('id', courseId)
            .single();

          if (courseData) {
            setCourse(courseData);
          }

          if (batchId) {
            const { data: batchData } = await supabase
              .from('batches')
              .select('*')
              .eq('id', batchId)
              .single();

            if (batchData) {
              setBatch(batchData);
            }
          }
        }
      } catch (error) {
        console.error('[v0] Checkout load error:', error);
        setError('Failed to load checkout information');
      } finally {
        setLoading(false);
      }
    }

    if (courseId) {
      loadCheckoutData();
    }
  }, [courseId, batchId, router]);

  const handlePaymentSuccess = async (paymentId: string) => {
    try {
      // Create enrollment after successful payment
      if (courseId && batchId && user) {
        const { data: branch } = await supabase
          .from('batches')
          .select('branch_id')
          .eq('id', batchId)
          .single();

        const { data: enrollment } = await supabase
          .from('enrollments')
          .insert({
            user_id: user.id,
            course_id: courseId,
            batch_id: batchId,
            branch_id: branch?.branch_id,
            status: 'active',
            enrollment_date: new Date().toISOString(),
          })
          .select()
          .single();

        if (enrollment) {
          router.push('/account');
        }
      }
    } catch (error) {
      console.error('[v0] Error creating enrollment:', error);
      setError('Failed to complete enrollment');
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <Loader className="w-8 h-8 animate-spin text-primary" />
        </main>
        <Footer />
      </>
    );
  }

  if (!course) {
    return (
      <>
        <Header />
        <main className="min-h-screen py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold mb-4">Checkout Error</h1>
            <p className="text-muted-foreground mb-6">Could not load course information</p>
            <Button onClick={() => router.push('/courses')}>Back to Courses</Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl font-bold mb-8">Complete Your Purchase</h1>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Payment Form */}
            <div className="lg:col-span-2">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6">Payment Method</h2>
                {!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ? (
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800">
                    <p className="text-sm font-semibold mb-2">Stripe Configuration Required</p>
                    <p className="text-sm">Please configure your Stripe publishable key to proceed with payments.</p>
                  </div>
                ) : stripePromise ? (
                  <Elements
                    stripe={stripePromise}
                    options={{
                      clientSecret,
                    }}
                  >
                    <PaymentForm
                      courseId={courseId}
                      batchId={batchId}
                      amount={course.price}
                      onSuccess={handlePaymentSuccess}
                    />
                  </Elements>
                ) : (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                    <p className="text-sm">Failed to load payment system. Please try again.</p>
                  </div>
                )}
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="p-6 sticky top-24">
                <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Course</p>
                    <p className="font-semibold">{course.name}</p>
                  </div>

                  {batch && (
                    <div>
                      <p className="text-sm text-muted-foreground">Batch</p>
                      <p className="font-semibold">
                        {new Date(batch.start_date).toLocaleDateString()} - {new Date(batch.end_date).toLocaleDateString()}
                      </p>
                    </div>
                  )}

                  <div className="pt-4 border-t border-border">
                    <div className="flex justify-between items-center">
                      <span>Course Price</span>
                      <span className="font-semibold">${course.price.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <div className="flex justify-between items-center text-lg">
                      <span className="font-semibold">Total</span>
                      <span className="font-bold text-primary">${course.price.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full" onClick={() => router.back()}>
                  Cancel
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

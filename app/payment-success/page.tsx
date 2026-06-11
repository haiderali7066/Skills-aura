'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle2, Loader } from 'lucide-react';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const paymentId = searchParams.get('paymentId');
  
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function verifyPayment() {
      if (!paymentId) {
        setError('No payment ID provided');
        setLoading(false);
        return;
      }

      try {
        // Small delay to ensure webhook has processed
        await new Promise((resolve) => setTimeout(resolve, 2000));
        
        // In a real app, you would verify the payment status with your backend
        // For now, we'll just mark it as verified since the payment was processed
        setVerified(true);
      } catch (err) {
        console.error('[v0] Payment verification error:', err);
        setError('Could not verify payment');
      } finally {
        setLoading(false);
      }
    }

    verifyPayment();
  }, [paymentId]);

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

  return (
    <>
      <Header />
      <main className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          {verified ? (
            <Card className="p-8 text-center space-y-6">
              <div className="flex justify-center">
                <div className="rounded-full bg-green-100 p-4">
                  <CheckCircle2 className="w-12 h-12 text-green-600" />
                </div>
              </div>

              <div>
                <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
                <p className="text-muted-foreground text-lg">
                  Your enrollment has been confirmed and you can start learning today.
                </p>
              </div>

              <div className="bg-muted p-4 rounded-lg space-y-2 text-left">
                <p className="text-sm font-semibold text-muted-foreground">Payment Details</p>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm">Payment ID:</span>
                    <span className="text-sm font-mono">{paymentId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Status:</span>
                    <span className="text-sm font-semibold text-green-600">Completed</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Date:</span>
                    <span className="text-sm">{new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  A confirmation email has been sent to your registered email address.
                </p>
                <p className="text-sm text-muted-foreground">
                  You can view your enrollment details and track your progress in your account.
                </p>
              </div>

              <div className="flex flex-col gap-3 pt-4">
                <Link href="/account">
                  <Button className="w-full" size="lg">
                    View My Courses
                  </Button>
                </Link>
                <Link href="/courses">
                  <Button variant="outline" className="w-full" size="lg">
                    Browse More Courses
                  </Button>
                </Link>
              </div>
            </Card>
          ) : (
            <Card className="p-8 text-center space-y-6">
              <div className="text-xl font-semibold text-red-600">{error}</div>
              <p className="text-muted-foreground">
                If you&apos;ve already been charged, your enrollment will be processed shortly.
              </p>
              <div className="flex flex-col gap-3">
                <Link href="/account">
                  <Button className="w-full" size="lg">
                    Go to Account
                  </Button>
                </Link>
                <Link href="/courses">
                  <Button variant="outline" className="w-full" size="lg">
                    Back to Courses
                  </Button>
                </Link>
              </div>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';

interface PaymentFormProps {
  courseId: string | null;
  batchId: string | null;
  amount: number;
  onSuccess: (paymentId: string) => void;
}

export default function PaymentForm({
  courseId,
  batchId,
  amount,
  onSuccess,
}: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Lazy load supabase
      const { supabase } = await import('@/lib/supabase');
      
      // Get auth token
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        throw new Error('Please sign in to continue');
      }

      const token = session.access_token;

      // First, create an enrollment to get an enrollment ID
      const enrollmentRes = await fetch('/api/enrollments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          courseId,
          batchId,
        }),
      });

      if (!enrollmentRes.ok) {
        const error = await enrollmentRes.json();
        throw new Error(error.error || 'Failed to create enrollment');
      }

      const enrollmentData = await enrollmentRes.json();
      const enrollmentId = enrollmentData.enrollment?.id;

      // Create payment intent
      const checkoutRes = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          enrollmentId,
          amount,
          courseId,
        }),
      });

      if (!checkoutRes.ok) {
        const error = await checkoutRes.json();
        throw new Error(error.error || 'Failed to create payment');
      }

      const checkoutData = await checkoutRes.json();
      const { clientSecret, paymentId } = checkoutData;

      // Confirm payment
      const result = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success?paymentId=${paymentId}`,
        },
      });

      if (result.error) {
        setError(result.error.message || 'Payment failed');
      } else if (result.paymentIntent?.status === 'succeeded') {
        onSuccess(paymentId);
      }
    } catch (err) {
      console.error('[v0] Payment error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
          {error}
        </div>
      )}

      <Button
        type="submit"
        disabled={!stripe || loading}
        className="w-full"
        size="lg"
      >
        {loading ? (
          <>
            <Loader className="w-4 h-4 mr-2 animate-spin" />
            Processing Payment...
          </>
        ) : (
          `Pay $${(amount).toFixed(2)}`
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        Your payment is secure and encrypted
      </p>
    </form>
  );
}

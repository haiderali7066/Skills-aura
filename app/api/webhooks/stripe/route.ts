import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/supabase-factory';

let stripe: any = null;
if (process.env.STRIPE_SECRET_KEY) {
  const Stripe = require('stripe');
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-06-20',
  });
}

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

export async function POST(request: NextRequest) {
  if (!stripe) {
    console.warn('[v0] Stripe webhook received but Stripe is not configured');
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 503 });
  }

  const supabase = getSupabaseClient();
  if (!supabase) {
    console.warn('[v0] Webhook received but database is not configured');
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
  }

  const body = await request.text();
  const sig = request.headers.get('stripe-signature') || '';

  let event: any;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (error: any) {
    console.error('[v0] Webhook signature verification failed:', error.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object;
        console.log('[v0] Payment succeeded:', paymentIntent.id);

        // Update payment status in database
        const { error } = await supabase
          .from('payments')
          .update({
            status: 'completed',
            payment_date: new Date().toISOString(),
          })
          .eq('stripe_payment_intent_id', paymentIntent.id);

        if (error) {
          console.error('[v0] Error updating payment:', error);
        } else {
          // Update enrollment status
          const { data: payment } = await supabase
            .from('payments')
            .select('enrollment_id')
            .eq('stripe_payment_intent_id', paymentIntent.id)
            .single();

          if (payment?.enrollment_id) {
            await supabase
              .from('enrollments')
              .update({ status: 'active' })
              .eq('id', payment.enrollment_id);
          }
        }
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object;
        console.log('[v0] Payment failed:', paymentIntent.id);

        // Update payment status
        await supabase
          .from('payments')
          .update({ status: 'failed' })
          .eq('stripe_payment_intent_id', paymentIntent.id);
        break;
      }

      default:
        console.log(`[v0] Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('[v0] Webhook error:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}

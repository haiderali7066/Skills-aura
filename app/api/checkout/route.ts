import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/supabase-factory';

let stripe: any = null;
if (process.env.STRIPE_SECRET_KEY) {
  const Stripe = require('stripe');
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-06-20',
  });
}

export async function POST(request: NextRequest) {
  try {
    if (!stripe) {
      return NextResponse.json(
        { error: 'Payment processing is not configured' },
        { status: 503 }
      );
    }

    const supabase = getSupabaseClient();
    if (!supabase) {
      return NextResponse.json(
        { error: 'Database is not configured' },
        { status: 503 }
      );
    }

    const { enrollmentId, amount, courseId } = await request.json();

    // Get user from auth header
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get enrollment data (optional, for verification)
    let enrollmentUserId = user.id;
    if (enrollmentId) {
      const { data: enrollment } = await supabase
        .from('enrollments')
        .select('user_id')
        .eq('id', enrollmentId)
        .single();

      if (enrollment) {
        enrollmentUserId = enrollment.user_id;
      }
    }

    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        enrollmentId: enrollmentId || courseId,
        userId: enrollmentUserId,
        courseId,
      },
    });

    // Create payment record in database
    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .insert({
        enrollment_id: enrollmentId || null,
        user_id: enrollmentUserId,
        amount,
        currency: 'USD',
        status: 'pending',
        stripe_payment_intent_id: paymentIntent.id,
        payment_method: 'stripe',
      })
      .select();

    if (paymentError) {
      console.error('[v0] Payment creation error:', paymentError);
      return NextResponse.json(
        { error: 'Failed to create payment record' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentId: payment?.[0]?.id,
    });
  } catch (error) {
    console.error('[v0] Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}

import { NextRequest } from 'next/server';
import { ApiResponse, getSupabaseClient } from '@/lib/api-utils';

export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return ApiResponse.error('Database not configured', 503);
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const status = searchParams.get('status') || '';
    const branchId = searchParams.get('branch_id') || '';

    const offset = (page - 1) * limit;

    let query = supabase
      .from('payments')
      .select(
        `id, amount, status, payment_method, transaction_id, enrollment_id,
         enrollments(id, users(id, name, email), courses(id, title))`,
        { count: 'exact' }
      );

    if (status) {
      query = query.eq('status', status);
    }

    if (branchId) {
      query = query.eq('branch_id', branchId);
    }

    const { data, error, count } = await query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      throw error;
    }

    return ApiResponse.success({
      payments: data,
      pagination: {
        page,
        limit,
        total: count || 0,
        pages: Math.ceil((count || 0) / limit),
      },
    });
  } catch (error) {
    return ApiResponse.serverError('Failed to fetch payments', error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return ApiResponse.error('Database not configured', 503);
    }

    const body = await request.json();
    const { enrollment_id, amount, payment_method, transaction_id } = body;

    if (!enrollment_id || !amount) {
      return ApiResponse.validation({
        enrollment_id: !enrollment_id ? 'Enrollment is required' : '',
        amount: !amount ? 'Amount is required' : '',
      });
    }

    const { data: payment, error } = await supabase
      .from('payments')
      .insert({
        enrollment_id,
        amount,
        payment_method: payment_method || 'stripe',
        transaction_id,
        status: 'pending',
        created_at: new Date().toISOString(),
      })
      .select();

    if (error) {
      throw error;
    }

    return ApiResponse.success(
      payment?.[0],
      'Payment created successfully',
      201
    );
  } catch (error) {
    return ApiResponse.serverError('Failed to create payment', error);
  }
}

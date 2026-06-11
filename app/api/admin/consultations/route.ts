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
      .from('consultations')
      .select(
        `id, topic, scheduled_date, status, user_id, 
         users(id, name, email), messages(count)`,
        { count: 'exact' }
      );

    if (status) {
      query = query.eq('status', status);
    }

    if (branchId) {
      query = query.eq('branch_id', branchId);
    }

    const { data, error, count } = await query
      .order('scheduled_date', { ascending: true })
      .range(offset, offset + limit - 1);

    if (error) {
      throw error;
    }

    return ApiResponse.success({
      consultations: data,
      pagination: {
        page,
        limit,
        total: count || 0,
        pages: Math.ceil((count || 0) / limit),
      },
    });
  } catch (error) {
    return ApiResponse.serverError('Failed to fetch consultations', error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return ApiResponse.error('Database not configured', 503);
    }

    const body = await request.json();
    const { user_id, topic, scheduled_date } = body;

    if (!user_id || !topic || !scheduled_date) {
      return ApiResponse.validation({
        user_id: !user_id ? 'User is required' : '',
        topic: !topic ? 'Topic is required' : '',
        scheduled_date: !scheduled_date ? 'Scheduled date is required' : '',
      });
    }

    const { data: consultation, error } = await supabase
      .from('consultations')
      .insert({
        user_id,
        topic,
        scheduled_date,
        status: 'scheduled',
        created_at: new Date().toISOString(),
      })
      .select();

    if (error) {
      throw error;
    }

    return ApiResponse.success(
      consultation?.[0],
      'Consultation scheduled successfully',
      201
    );
  } catch (error) {
    return ApiResponse.serverError('Failed to schedule consultation', error);
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return ApiResponse.error('Database not configured', 503);
    }

    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return ApiResponse.validation({ id: 'Consultation ID is required' });
    }

    const { data: consultation, error } = await supabase
      .from('consultations')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return ApiResponse.success(consultation, 'Consultation updated successfully');
  } catch (error) {
    return ApiResponse.serverError('Failed to update consultation', error);
  }
}

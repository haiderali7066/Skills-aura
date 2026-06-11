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
    const courseId = searchParams.get('course_id') || '';
    const branchId = searchParams.get('branch_id') || '';
    const status = searchParams.get('status') || '';

    const offset = (page - 1) * limit;

    let query = supabase
      .from('batches')
      .select('*, courses(id, title), branches(id, name)', { count: 'exact' });

    if (courseId) {
      query = query.eq('course_id', courseId);
    }

    if (branchId) {
      query = query.eq('branch_id', branchId);
    }

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error, count } = await query
      .order('start_date', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      throw error;
    }

    return ApiResponse.success({
      batches: data,
      pagination: {
        page,
        limit,
        total: count || 0,
        pages: Math.ceil((count || 0) / limit),
      },
    });
  } catch (error) {
    return ApiResponse.serverError('Failed to fetch batches', error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return ApiResponse.error('Database not configured', 503);
    }

    const body = await request.json();
    const { course_id, branch_id, start_date, end_date, time_slot, capacity } = body;

    if (!course_id || !branch_id || !start_date || !end_date) {
      return ApiResponse.validation({
        course_id: !course_id ? 'Course is required' : '',
        branch_id: !branch_id ? 'Branch is required' : '',
        start_date: !start_date ? 'Start date is required' : '',
        end_date: !end_date ? 'End date is required' : '',
      });
    }

    const { data: batch, error } = await supabase
      .from('batches')
      .insert({
        course_id,
        branch_id,
        start_date,
        end_date,
        time_slot,
        capacity: capacity || 30,
        status: 'upcoming',
        created_at: new Date().toISOString(),
      })
      .select();

    if (error) {
      throw error;
    }

    return ApiResponse.success(
      batch?.[0],
      'Batch created successfully',
      201
    );
  } catch (error) {
    return ApiResponse.serverError('Failed to create batch', error);
  }
}

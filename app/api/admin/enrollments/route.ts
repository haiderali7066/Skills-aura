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
    const search = searchParams.get('search') || '';

    const offset = (page - 1) * limit;

    let query = supabase
      .from('enrollments')
      .select(
        `id, user_id, course_id, batch_id, status, enrollment_date, 
         users(id, email, name), courses(id, title), batches(id, title)`,
        { count: 'exact' }
      );

    if (status) {
      query = query.eq('status', status);
    }

    if (branchId) {
      query = query.eq('branch_id', branchId);
    }

    if (search) {
      query = query.or(`users.email.ilike.%${search}%,users.name.ilike.%${search}%`);
    }

    const { data, error, count } = await query
      .order('enrollment_date', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      throw error;
    }

    return ApiResponse.success({
      enrollments: data,
      pagination: {
        page,
        limit,
        total: count || 0,
        pages: Math.ceil((count || 0) / limit),
      },
    });
  } catch (error) {
    return ApiResponse.serverError('Failed to fetch enrollments', error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return ApiResponse.error('Database not configured', 503);
    }

    const body = await request.json();
    const { user_id, course_id, batch_id } = body;

    if (!user_id || !course_id) {
      return ApiResponse.validation({
        user_id: !user_id ? 'User is required' : '',
        course_id: !course_id ? 'Course is required' : '',
      });
    }

    const { data: enrollment, error } = await supabase
      .from('enrollments')
      .insert({
        user_id,
        course_id,
        batch_id,
        status: 'active',
        enrollment_date: new Date().toISOString(),
      })
      .select();

    if (error) {
      throw error;
    }

    return ApiResponse.success(enrollment?.[0], 'Enrollment created successfully', 201);
  } catch (error) {
    return ApiResponse.serverError('Failed to create enrollment', error);
  }
}

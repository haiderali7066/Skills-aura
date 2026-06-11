import { NextRequest } from 'next/server';
import { ApiResponse, getSupabaseClient } from '@/lib/api-utils';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return ApiResponse.error('Database not configured', 503);
    }

    const { data: course, error } = await supabase
      .from('courses')
      .select('*, batches(*)')
      .eq('id', params.id)
      .single();

    if (error || !course) {
      return ApiResponse.notFound('Course not found');
    }

    return ApiResponse.success(course, 'Course fetched successfully');
  } catch (error) {
    return ApiResponse.serverError('Failed to fetch course', error);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return ApiResponse.error('Database not configured', 503);
    }

    const body = await request.json();

    const { data: course, error } = await supabase
      .from('courses')
      .update(body)
      .eq('id', params.id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return ApiResponse.success(
      course,
      'Course updated successfully'
    );
  } catch (error) {
    return ApiResponse.serverError('Failed to update course', error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return ApiResponse.error('Database not configured', 503);
    }

    const { error } = await supabase
      .from('courses')
      .delete()
      .eq('id', params.id);

    if (error) {
      throw error;
    }

    return ApiResponse.success(null, 'Course deleted successfully');
  } catch (error) {
    return ApiResponse.serverError('Failed to delete course', error);
  }
}

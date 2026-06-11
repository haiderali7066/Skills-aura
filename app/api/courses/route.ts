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
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';

    const offset = (page - 1) * limit;

    let query = supabase.from('courses').select('*, batches(count)');

    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
    }

    if (category) {
      query = query.eq('category', category);
    }

    const { data: courses, error, count } = await query
      .range(offset, offset + limit - 1);

    if (error) {
      throw error;
    }

    return ApiResponse.success(
      {
        courses,
        pagination: {
          page,
          limit,
          total: count || 0,
          pages: Math.ceil((count || 0) / limit),
        },
      },
      'Courses fetched successfully'
    );
  } catch (error) {
    return ApiResponse.serverError('Failed to fetch courses', error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return ApiResponse.error('Database not configured', 503);
    }

    const body = await request.json();
    const { title, description, category, price, instructor_id, duration_weeks } =
      body;

    if (!title || !description || !category || !instructor_id) {
      return ApiResponse.validation({
        title: !title ? 'Title is required' : '',
        description: !description ? 'Description is required' : '',
        category: !category ? 'Category is required' : '',
        instructor_id: !instructor_id ? 'Instructor is required' : '',
      });
    }

    const { data: course, error } = await supabase
      .from('courses')
      .insert({
        title,
        description,
        category,
        price: price || 0,
        instructor_id,
        duration_weeks: duration_weeks || 4,
        status: 'draft',
      })
      .select();

    if (error) {
      throw error;
    }

    return ApiResponse.success(
      course?.[0],
      'Course created successfully',
      201
    );
  } catch (error) {
    return ApiResponse.serverError('Failed to create course', error);
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/supabase-factory';
import { verifySuperAdminRole, errorResponse } from '@/lib/auth-middleware';


export async function GET(request: NextRequest) {
  const { error, status } = await verifySuperAdminRole(request);

  if (error) {
    return errorResponse(error, status);
  }

  try {
    const { data: courses, error: fetchError } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false });

    if (fetchError) throw fetchError;

    return NextResponse.json({ courses });
  } catch (err) {
    console.error('[v0] Error fetching courses:', err);
    return errorResponse('Failed to fetch courses');
  }
}

export async function POST(request: NextRequest) {
  const { error, status } = await verifySuperAdminRole(request);

  if (error) {
    return errorResponse(error, status);
  }

  try {
    const {
      name,
      description,
      price,
      duration_weeks,
      category,
      instructor_name,
      image_url,
      max_capacity,
    } = await request.json();

    if (!name || price === undefined) {
      return errorResponse('Missing required fields', 400);
    }

    const { data: course, error: insertError } = await supabase
      .from('courses')
      .insert({
        name,
        description,
        price,
        duration_weeks,
        category,
        instructor_name,
        image_url,
        max_capacity,
      })
      .select();

    if (insertError) throw insertError;

    return NextResponse.json(
      { message: 'Course created', course: course?.[0] },
      { status: 201 }
    );
  } catch (err) {
    console.error('[v0] Error creating course:', err);
    return errorResponse('Failed to create course');
  }
}

export async function PUT(request: NextRequest) {
  const { error, status } = await verifySuperAdminRole(request);

  if (error) {
    return errorResponse(error, status);
  }

  try {
    const courseId = new URL(request.url).searchParams.get('courseId');
    if (!courseId) {
      return errorResponse('Missing courseId', 400);
    }

    const updates = await request.json();

    const { data: course, error: updateError } = await supabase
      .from('courses')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', courseId)
      .select();

    if (updateError) throw updateError;

    return NextResponse.json({
      message: 'Course updated',
      course: course?.[0],
    });
  } catch (err) {
    console.error('[v0] Error updating course:', err);
    return errorResponse('Failed to update course');
  }
}

export async function DELETE(request: NextRequest) {
  const { error, status } = await verifySuperAdminRole(request);

  if (error) {
    return errorResponse(error, status);
  }

  try {
    const courseId = new URL(request.url).searchParams.get('courseId');
    if (!courseId) {
      return errorResponse('Missing courseId', 400);
    }

    const { error: deleteError } = await supabase
      .from('courses')
      .delete()
      .eq('id', courseId);

    if (deleteError) throw deleteError;

    return NextResponse.json({ message: 'Course deleted' });
  } catch (err) {
    console.error('[v0] Error deleting course:', err);
    return errorResponse('Failed to delete course');
  }
}

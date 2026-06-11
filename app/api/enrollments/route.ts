import { getSupabaseClient } from '@/lib/supabase-factory';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(request: NextRequest) {
  try {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
  }
    const { courseId, batchId } = await request.json();

    // Get user from header (passed from client)
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Extract token
    const token = authHeader.replace('Bearer ', '');

    // Validate required fields
    if (!courseId || !batchId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get user from token
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get batch to find branch_id
    const { data: batchData } = await supabase
      .from('batches')
      .select('branch_id')
      .eq('id', batchId)
      .single();

    if (!batchData) {
      return NextResponse.json(
        { error: 'Batch not found' },
        { status: 404 }
      );
    }

    // Create enrollment
    const { data: enrollment, error: enrollmentError } = await supabase
      .from('enrollments')
      .insert({
        user_id: user.id,
        course_id: courseId,
        batch_id: batchId,
        branch_id: batchData.branch_id,
        status: 'pending',
      })
      .select();

    if (enrollmentError) {
      console.error('[v0] Enrollment error:', enrollmentError);
      return NextResponse.json(
        { error: 'Failed to create enrollment' },
        { status: 500 }
      );
    }

    return NextResponse.json({ enrollment: enrollment?.[0] }, { status: 201 });
  } catch (error) {
    console.error('[v0] API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

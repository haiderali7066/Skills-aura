import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/supabase-factory';

export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
    }

    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);

    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: consultations, error } = await supabase
      .from('consultations')
      .select('*')
      .eq('user_id', user.id)
      .order('scheduled_at', { ascending: false });

    if (error) {
      console.error('[v0] Consultations fetch error:', error);
      return NextResponse.json({ error: 'Failed to fetch consultations' }, { status: 500 });
    }

    return NextResponse.json({ consultations });
  } catch (error) {
    console.error('[v0] API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
    }

    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);

    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, description, scheduledAt, branchId, durationMinutes } = await request.json();

    const { data: consultation, error } = await supabase
      .from('consultations')
      .insert({
        user_id: user.id,
        title,
        description,
        scheduled_at: scheduledAt,
        branch_id: branchId,
        duration_minutes: durationMinutes || 30,
      })
      .select();

    if (error) {
      console.error('[v0] Consultation creation error:', error);
      return NextResponse.json({ error: 'Failed to book consultation' }, { status: 500 });
    }

    return NextResponse.json({ consultation: consultation?.[0] }, { status: 201 });
  } catch (error) {
    console.error('[v0] API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

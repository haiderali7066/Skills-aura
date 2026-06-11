import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/supabase-factory';

export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
    }

    const { name, email, phone, subject, body, messageType, branchId } = await request.json();

    // Validate required fields
    if (!name || !email || !body) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get current user if authenticated
    const authHeader = request.headers.get('authorization');
    let userId = null;
    
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      const { data: { user } } = await supabase.auth.getUser(token);
      userId = user?.id;
    }

    const { data: message, error } = await supabase
      .from('messages')
      .insert({
        sender_id: userId,
        name,
        email,
        phone,
        subject: subject || 'No subject',
        body,
        message_type: messageType || 'general',
        branch_id: branchId,
      })
      .select();

    if (error) {
      console.error('[v0] Message creation error:', error);
      return NextResponse.json(
        { error: 'Failed to send message' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: message?.[0] },
      { status: 201 }
    );
  } catch (error) {
    console.error('[v0] API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

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

    // Get user role to determine which messages to show
    const { data: userData } = await supabase
      .from('users')
      .select('role, assigned_branch_id')
      .eq('id', user.id)
      .single();

    let query = supabase.from('messages').select('*');

    if (userData?.role === 'branch_admin') {
      query = query.eq('branch_id', userData.assigned_branch_id);
    } else if (userData?.role !== 'super_admin') {
      // Regular users can only see messages they sent
      query = query.eq('sender_id', user.id);
    }

    const { data: messages, error } = await query.order('created_at', { ascending: false });

    if (error) {
      console.error('[v0] Messages fetch error:', error);
      return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
    }

    return NextResponse.json({ messages });
  } catch (error) {
    console.error('[v0] API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { UserRole } from './types';

export async function verifyAuth(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader) {
      return { error: 'Unauthorized', status: 401 };
    }

    const token = authHeader.replace('Bearer ', '');
    
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_ROLE_KEY || ''
    );

    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return { error: 'Unauthorized', status: 401 };
    }

    return { user, error: null, status: 200 };
  } catch (error) {
    console.error('[v0] Auth error:', error);
    return { error: 'Internal server error', status: 500 };
  }
}

export async function verifyAdminRole(request: NextRequest) {
  const { user, error, status } = await verifyAuth(request);

  if (error) {
    return { error, status };
  }

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_ROLE_KEY || ''
    );

    const { data: userData, error: fetchError } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();

    if (fetchError || !userData) {
      return { error: 'User not found', status: 404 };
    }

    const role = userData.role as UserRole;

    if (role !== 'super_admin' && role !== 'branch_admin') {
      return { error: 'Forbidden', status: 403 };
    }

    return { user, role, error: null, status: 200 };
  } catch (error) {
    console.error('[v0] Admin role check error:', error);
    return { error: 'Internal server error', status: 500 };
  }
}

export async function verifySuperAdminRole(request: NextRequest) {
  const { user, role, error, status } = await verifyAdminRole(request);

  if (error) {
    return { error, status };
  }

  if (role !== 'super_admin') {
    return { error: 'Forbidden - Super admin only', status: 403 };
  }

  return { user, role, error: null, status: 200 };
}

export function unauthorizedResponse() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

export function forbiddenResponse() {
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}

export function errorResponse(message: string, status: number = 500) {
  return NextResponse.json({ error: message }, { status });
}

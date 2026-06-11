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
    const role = searchParams.get('role') || '';
    const branchId = searchParams.get('branch_id') || '';
    const search = searchParams.get('search') || '';

    const offset = (page - 1) * limit;

    let query = supabase
      .from('users')
      .select('*', { count: 'exact' });

    if (role) {
      query = query.eq('role', role);
    }

    if (branchId) {
      query = query.eq('branch_id', branchId);
    }

    if (search) {
      query = query.or(`email.ilike.%${search}%,name.ilike.%${search}%`);
    }

    const { data, error, count } = await query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      throw error;
    }

    return ApiResponse.success({
      users: data,
      pagination: {
        page,
        limit,
        total: count || 0,
        pages: Math.ceil((count || 0) / limit),
      },
    });
  } catch (error) {
    return ApiResponse.serverError('Failed to fetch users', error);
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
      return ApiResponse.validation({ id: 'User ID is required' });
    }

    const validRoles = ['user', 'branch_admin', 'super_admin'];
    if (updates.role && !validRoles.includes(updates.role)) {
      return ApiResponse.validation({ role: 'Invalid role' });
    }

    const { data: user, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return ApiResponse.success(user, 'User updated successfully');
  } catch (error) {
    return ApiResponse.serverError('Failed to update user', error);
  }
}

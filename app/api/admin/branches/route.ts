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
    const search = searchParams.get('search') || '';

    const offset = (page - 1) * limit;

    let query = supabase
      .from('branches')
      .select('*', { count: 'exact' });

    if (search) {
      query = query.or(`name.ilike.%${search}%,location.ilike.%${search}%`);
    }

    const { data, error, count } = await query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      throw error;
    }

    return ApiResponse.success({
      branches: data,
      pagination: {
        page,
        limit,
        total: count || 0,
        pages: Math.ceil((count || 0) / limit),
      },
    });
  } catch (error) {
    return ApiResponse.serverError('Failed to fetch branches', error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return ApiResponse.error('Database not configured', 503);
    }

    const body = await request.json();
    const { name, location, manager_id } = body;

    if (!name || !location) {
      return ApiResponse.validation({
        name: !name ? 'Branch name is required' : '',
        location: !location ? 'Location is required' : '',
      });
    }

    const { data: branch, error } = await supabase
      .from('branches')
      .insert({
        name,
        location,
        manager_id,
        status: 'active',
        created_at: new Date().toISOString(),
      })
      .select();

    if (error) {
      throw error;
    }

    return ApiResponse.success(
      branch?.[0],
      'Branch created successfully',
      201
    );
  } catch (error) {
    return ApiResponse.serverError('Failed to create branch', error);
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
      return ApiResponse.validation({ id: 'Branch ID is required' });
    }

    const { data: branch, error } = await supabase
      .from('branches')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return ApiResponse.success(branch, 'Branch updated successfully');
  } catch (error) {
    return ApiResponse.serverError('Failed to update branch', error);
  }
}

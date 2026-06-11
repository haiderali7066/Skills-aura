import { NextRequest } from 'next/server';
import { ApiResponse, getSupabaseClient } from '@/lib/api-utils';

export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return ApiResponse.error('Database not configured', 503);
    }

    const { searchParams } = new URL(request.url);
    const branchId = searchParams.get('branch_id');

    // Fetch enrollment statistics
    let enrollmentQuery = supabase
      .from('enrollments')
      .select('status', { count: 'exact' });

    if (branchId) {
      enrollmentQuery = enrollmentQuery.eq('branch_id', branchId);
    }

    const { count: totalEnrollments, data: enrollmentData } = await enrollmentQuery;

    // Fetch payment statistics
    let paymentQuery = supabase
      .from('payments')
      .select('amount, status', { count: 'exact' });

    if (branchId) {
      paymentQuery = paymentQuery.eq('branch_id', branchId);
    }

    const { count: totalPayments, data: paymentData } = await paymentQuery;

    // Fetch consultation statistics
    let consultationQuery = supabase
      .from('consultations')
      .select('status', { count: 'exact' });

    if (branchId) {
      consultationQuery = consultationQuery.eq('branch_id', branchId);
    }

    const { count: totalConsultations } = await consultationQuery;

    // Fetch course count
    const { count: totalCourses } = await supabase
      .from('courses')
      .select('id', { count: 'exact' });

    // Fetch user count
    let userQuery = supabase.from('users').select('id', { count: 'exact' });
    if (branchId) {
      userQuery = userQuery.eq('branch_id', branchId);
    }
    const { count: totalUsers } = await userQuery;

    // Calculate metrics
    const activeEnrollments =
      enrollmentData?.filter((e: any) => e.status === 'active').length || 0;
    const completedEnrollments =
      enrollmentData?.filter((e: any) => e.status === 'completed').length || 0;

    const completedPayments =
      paymentData?.filter((p: any) => p.status === 'completed').length || 0;
    const totalRevenue =
      paymentData?.reduce((sum: number, p: any) => {
        return p.status === 'completed' ? sum + (p.amount || 0) : sum;
      }, 0) || 0;

    const completionRate = totalEnrollments
      ? ((completedEnrollments / totalEnrollments) * 100).toFixed(2)
      : '0';

    return ApiResponse.success({
      stats: {
        totalUsers: totalUsers || 0,
        totalCourses: totalCourses || 0,
        totalEnrollments: totalEnrollments || 0,
        activeEnrollments,
        completedEnrollments,
        totalPayments: totalPayments || 0,
        completedPayments,
        totalRevenue,
        totalConsultations: totalConsultations || 0,
        completionRate: parseFloat(completionRate as string),
      },
      branch: branchId || 'all',
    });
  } catch (error) {
    return ApiResponse.serverError('Failed to fetch analytics', error);
  }
}

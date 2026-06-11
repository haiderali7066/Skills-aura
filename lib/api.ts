import { supabase } from './supabase';

export async function getCourses() {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getCourseById(id: string) {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function getBranchesWithBatches() {
  const { data, error } = await supabase
    .from('branches')
    .select(`
      *,
      batches (
        *,
        courses (*)
      )
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getBatchesByCourse(courseId: string) {
  const { data, error } = await supabase
    .from('batches')
    .select(`
      *,
      branches (*)
    `)
    .eq('course_id', courseId)
    .order('start_date', { ascending: true });

  if (error) throw error;
  return data;
}

export async function getUserEnrollments(userId: string) {
  const { data, error } = await supabase
    .from('enrollments')
    .select(`
      *,
      courses (*),
      batches (*),
      payments (*)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getBranches() {
  const { data, error } = await supabase
    .from('branches')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

import { supabase } from './supabase';

export async function getCurrentUser() {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    
    if (!session?.user) {
      return null;
    }

    // Get user role and details from users table
    const { data: userData, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', session.user.email)
      .single();

    if (error) {
      console.error('[v0] Error fetching user data:', error);
      return null;
    }

    return userData;
  } catch (error) {
    console.error('[v0] Error in getCurrentUser:', error);
    return null;
  }
}

export async function signOut() {
  return supabase.auth.signOut();
}

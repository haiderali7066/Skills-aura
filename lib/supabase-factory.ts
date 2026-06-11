import { createClient } from '@supabase/supabase-js';

let instance: any = null;

export function getSupabaseClient() {
  // Only create client if env vars exist
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return null;
  }

  // Reuse instance if already created
  if (instance) {
    return instance;
  }

  instance = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  return instance;
}

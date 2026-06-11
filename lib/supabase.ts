// This module exports a lazy-loaded Supabase client
// that only initializes when accessed in the browser

let instance: any = null;

const handler = {
  get: (target: any, prop: string) => {
    if (typeof window === 'undefined') {
      // Return a dummy object during SSR
      return () => Promise.resolve({ data: null, error: new Error('Not in browser') });
    }
    
    if (!instance) {
      const { createClient } = require('@supabase/supabase-js');
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      
      if (!url || !key) {
        return () => Promise.resolve({ data: null, error: new Error('Missing Supabase config') });
      }
      
      instance = createClient(url, key);
    }
    
    return instance[prop];
  },
};

export const supabase = new Proxy({}, handler) as any;

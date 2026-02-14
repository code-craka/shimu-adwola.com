
import { createClient } from '@supabase/supabase-js';

// Environment variables with hardcoded fallbacks for reliability in this specific environment
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://dzjscfwijflsgpyfuwzt.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_fBwCl9RPswaafcDPS9tSNQ_uVIbcOOH';

// Validation and logging
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('⛔ Critical Error: Supabase credentials missing!');
} else {
  console.log('✅ Supabase Client Initializing:', {
    url: supabaseUrl,
    keyLength: supabaseAnonKey?.length || 0
  });
}

// Create the Supabase client
export const supabase = createClient(
  supabaseUrl, 
  supabaseAnonKey
);

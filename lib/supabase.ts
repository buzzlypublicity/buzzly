import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error(
    'Missing Supabase environment variables. Check .env.local'
  );
}

/* ============================================================
   ADMIN CLIENT (Server-side only)
   Service role key use kar rahe hain — RLS bypass karega
   ⚠️ Is file ko kisi client component mein import na karo
   ============================================================ */
export const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseServiceKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);
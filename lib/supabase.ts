import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('SUPABASE_URL:', supabaseUrl); // Log the values
console.log('SUPABASE_ANON_KEY:', supabaseKey);

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase URL or Key in environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseKey);

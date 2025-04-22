// utils/supabase/server.ts
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers'; // 👈 used to get the cookies in server components

export function createServerClient() {
  return createServerComponentClient({ cookies });
}

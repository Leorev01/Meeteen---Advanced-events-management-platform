// app/api/auth/session/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  const { data: { session } } = await supabase.auth.getSession();

  if (session) {
    return NextResponse.json({ session });
  } else {
    return NextResponse.json({ message: 'No active session' }, { status: 401 });
  }
}

import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  // Verify the user's session using Supabase
  const { data: user, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    return NextResponse.json({ message: 'Invalid or expired session' }, { status: 401 });
  }

  return NextResponse.json({ user });
}

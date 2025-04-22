import { createAdminClient } from '@/lib/supabase-admin';
import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST() {
  
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const admin = createAdminClient();

  // Delete from Supabase Auth
  const { error: deleteAuthError } = await admin.auth.admin.deleteUser(user.id);
  if (deleteAuthError) {
    return NextResponse.json({ error: deleteAuthError.message }, { status: 500 });
  }

  // Delete from custom users table
  const { error: deleteUserTableError } = await admin
    .from('users')
    .delete()
    .eq('id', user.id);

  if (deleteUserTableError) {
    return NextResponse.json({ error: deleteUserTableError.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'User fully deleted' }, { status: 200 });
}

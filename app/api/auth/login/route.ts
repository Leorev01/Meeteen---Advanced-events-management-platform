import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Handle POST request for user login
export async function POST(req: NextRequest) {
  try {
    // Parse incoming request body to get email and password
    const { email, password } = await req.json();

    // Validate the inputs
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    }

    // Call Supabase sign-in function
    const { data: { user, session }, error: authError } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    // Check for any errors during the sign-in process
    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 401 });
    }

    // Fetch user profile information from the 'profiles' table
    const { data: profile, error: profileError } = await supabase
    .from('users')
    .select('email, name)') // Retrieve only the 'name' from the profile
    .eq('email', email);
      

    // Check for errors when fetching the profile data
    if (profileError) {
      return NextResponse.json({ error: profileError.message }, { status: 500 });
    }

    // Return user and profile information along with session
    return NextResponse.json({ user, session, profile });

  } catch (error) {
    // Catch and log any unexpected errors, send a 500 status code
    console.error('Unexpected error during login:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}

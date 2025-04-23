import { NextRequest, NextResponse } from "next/server";
import {supabase} from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    // Step 1: Sign in with Supabase
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 401 });
    }

    const user = authData?.user;
    if (!user) {
      return NextResponse.json({ error: "Login failed, please try again." }, { status: 401 });
    }

    // Step 2: Fetch the user's profile from the 'users' table
    const { data: profileData, error: profileError } = await supabase
      .from("users")
      .select("id, name")
      .eq("email", user.email)
      .single();

    if (profileError) {
      console.error("Profile fetch error:", profileError);
    }

    // Step 3: Log user activity (optional)
    await supabase.from("user_activities").insert({
      user_id: user.id,
      action: "login",
      metadata: { email: user.email, name: profileData?.name || "Unknown" },
    });

    // Return user and session data
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: profileData?.name || "Unknown",
      },
      session: authData.session,
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}
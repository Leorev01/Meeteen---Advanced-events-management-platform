import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { createServerClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    // Parsing the body of the request
    const body = await req.json();
    const { email, password } = body;

    // Validate the request data
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    // Initialize Supabase client
    const supabase = createServerClient();

    // Attempt to sign in the user with email and password
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    // Handle errors if authentication fails
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: data.user.id, email: data.user.email },
      process.env.JWT_SECRET!, 
      { expiresIn: "1h" }
    );

    // Store the token in cookies (HttpOnly and Secure)
    (await cookies()).set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60, // Expires in 1 hour
    });

    // Return success response
    return NextResponse.json({ message: "Login successful", token }, { status: 200 });

  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

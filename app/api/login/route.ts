import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/utils/supabase/server";
import { setCookie } from "cookies-next";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.email || !body.password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const supabase = createServerClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: body.email,
      password: body.password,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    // Get the session token from Supabase
    const access_token = data.session?.access_token;
    if (!access_token) {
      return NextResponse.json({ error: "Failed to retrieve session token" }, { status: 500 });
    }

    // Create response and set HTTP-only cookie
    const response = NextResponse.json({ message: "Login successful", user: data.user });

    setCookie("auth_token", access_token, {
      req,
      res: response,
      httpOnly: true, // Prevents JavaScript access for security
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

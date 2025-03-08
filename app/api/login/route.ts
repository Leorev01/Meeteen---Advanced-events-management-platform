import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { createServerClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const supabase = createServerClient();
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    // ✅ Generate JWT Token
    const token = jwt.sign(
      { id: data.user.id, email: data.user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" } // 🔥 Extend session duration
    );

    // ✅ Store token in a HttpOnly cookie (Session-based)
    const response = NextResponse.json({ message: "Login successful" });
    response.headers.append(
      "Set-Cookie",
      `auth_token=${token}; HttpOnly; Secure; Path=/; Max-Age=${60 * 60 * 24 * 7}`
    );

    return response;
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/utils/supabase/server"; // Ensure Supabase client is correctly imported

export async function POST(req: NextRequest) {
  try {
    // ✅ Ensure the request has a valid JSON body
    if (!req.body) {
      return NextResponse.json({ error: "Missing request body" }, { status: 400 });
    }

    // ✅ Parse the request body safely
    const body = await req.json();
    
    if (!body.email || !body.password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const supabase = createServerClient();

    // ✅ Authenticate the user with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email: body.email,
      password: body.password,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    return NextResponse.json({ message: "Login successful", data }, { status: 200 });

  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

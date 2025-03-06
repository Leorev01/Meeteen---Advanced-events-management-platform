import { NextResponse } from "next/server";
import { createServerClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    // ✅ Delete auth token cookie
    const cookieStore = await cookies();
    cookieStore.delete("auth_token"); // Ensure the cookie is deleted for the whole app

    // ✅ Sign out user from Supabase
    const supabase = createServerClient();
    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    // ✅ Return success response
    return NextResponse.json({ message: "Logged out successfully" }, { status: 200 });

  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ error: "Logout failed" }, { status: 500 });
  }
}

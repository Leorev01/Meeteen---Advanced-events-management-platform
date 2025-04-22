// filepath: c:\Users\revre\OneDrive\Desktop\WebDev_Projects\Meeteen\my-meetup-app\app\api\auth\delete-user\route.ts
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

// Initialize Supabase with the Service Role Key
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Use the Service Role Key here
);

export async function DELETE(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");
  const token = authHeader?.split(" ")[1]; // Extract the Bearer token

  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // Verify the user's session using the token
  const { data: user, error: userError } = await supabaseAdmin.auth.getUser(token);

  if (userError || !user) {
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
  }

  const user_id = user.user.id;

  // Delete the user from Supabase Auth
  const { error: deleteUserError } = await supabaseAdmin.auth.admin.deleteUser(user_id);

  if (deleteUserError) {
    return NextResponse.json({ error: deleteUserError.message }, { status: 400 });
  }

  // Optionally, delete the user's data from your database
  const { error: deleteDataError } = await supabaseAdmin.from("users").delete().eq("id", user_id);

  if (deleteDataError) {
    return NextResponse.json({ error: deleteDataError.message }, { status: 400 });
  }

  return NextResponse.json({ message: "Account deleted successfully" }, { status: 200 });
}
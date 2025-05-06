import { createServerClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = createServerClient(); // Initialize Supabase client

  try {
    // Parse the request body to get the eventId
    const { eventId } = await request.json();

    if (!eventId) {
      return NextResponse.json({ error: "Event ID is required" }, { status: 400 });
    }

    // Fetch the event from the database
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("id", eventId)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Return the event data
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error in fetchEvent route:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
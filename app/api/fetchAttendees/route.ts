import { createServerClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const supabase = createServerClient(); // Initialize Supabase client
    const { eventId } = await request.json(); // Parse the request body to get the eventId
    try{
        // Fetch the user Ids from the event registrations table
        const { data, error } = await supabase
            .from("event_registrations")
            .select("user_id")
            .eq("event_id", eventId);
        
        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        
        if (!data) {
            return NextResponse.json({ error: "No data found" }, { status: 404 });
        }
        // Fetch the users from the users table
        const {data:attendees, error:attendeesError} = await supabase
            .from("users")
            .select("*")
            .in("id", data.map((registration) => registration.user_id));
        
        if (attendeesError) {
            return NextResponse.json({ error: attendeesError.message }, { status: 500 });
        }
        if (!attendees) {
            return NextResponse.json({ error: "No data found" }, { status: 404 });
        }
        // Return the attendees data
        return NextResponse.json(attendees, { status: 200 });
    }catch{
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
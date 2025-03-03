import { createServerClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const supabase = createServerClient();
    const body = await request.json();

    // Register the user in Supabase Auth
    const { data, error } = await supabase.auth.signUp({
        email: body.email,
        password: body.password,  // Supabase Auth handles passwords
    });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Insert user data into the "users" table
    const { error: insertError } = await supabase.from("users").insert([
        {
            id: data.user?.id, // Use the ID from Supabase Auth
            email: body.email,
            password: body.password,
            name: body.name,
            avatar: body.avatar || null, // Optional avatar
        },
    ]);

    if (insertError) {
        return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    return NextResponse.json({ message: "User registered successfully!" }, { status: 200 });
}

import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
    const body = await request.json();

    // Register the user in Supabase Auth
    const { data, error } = await supabase.auth.signUp({
        email: body.email,
        password: body.password,  // Supabase Auth handles passwords
        options: {
            data: {
                name: body.name.toString(),
            },
        }
    });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    const hashedPassword = await bcrypt.hash(body.password, 10); // Hash the password for storage
    
    // Insert user data into the "users" table
    const { error: insertError } = await supabase.from("users").insert([
        {
            id: data.user?.id, // Use the ID from Supabase Auth
            email: body.email,
            password: hashedPassword,
            name: body.name,
            avatar: body.avatar || null, // Optional avatar
        },
    ]);

    supabase.from("user_activities").insert({
        user_id: data.user?.id,
        action: "register",
        metadata: { email: body.email, name: body.name },
    });

    if (insertError) {
        return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    return NextResponse.json({ message: "User registered successfully!" }, { status: 200 });
}

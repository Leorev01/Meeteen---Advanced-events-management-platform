import { createServerClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const supabase = createServerClient();
    const body = await req.json();

    const { data, error } = await supabase.auth.signInWithPassword({
        email: body.email,
        password: body.password,
    });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 401 });
    }

    return NextResponse.json({ user: data.user }, { status: 200 });
}

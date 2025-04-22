import {supabase} from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    const {email} = await req.json();

    if(!email) return NextResponse.json({error: "User ID is required"}, {status: 400});
    
    const { data, error: fetchError } = await supabase.from("users").select("id").eq("email", email).single();
    if (fetchError || !data?.id) return NextResponse.json({error: "User not found"}, {status: 404});

    const userId = data.id;
    const {data:userData, error} = await supabase.auth.admin.deleteUser(userId);
    if(error) return NextResponse.json({error: error.message}, {status: 400});

    if(!userData) return NextResponse.json({error: "User not found"}, {status: 404});

    const {error:userError2} = await supabase.from("users").delete().eq("id", userId);
    if(userError2) return NextResponse.json({error: userError2.message}, {status: 400});

    return NextResponse.json({message: "User deleted successfully"}, {status: 200});
}
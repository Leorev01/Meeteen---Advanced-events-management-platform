import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  try {
    // ✅ Get the auth_token from cookies
    const token = req.cookies.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    // ✅ Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    return NextResponse.json({ user: decoded });
  } catch {
    return NextResponse.json({ user: null }, { status: 401 });
  }
}

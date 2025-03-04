import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getCookie } from "cookies-next";

export async function GET(req: Request) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const token = await getCookie("auth_token", { req: req as any });

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return NextResponse.json({ user: decoded });
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}

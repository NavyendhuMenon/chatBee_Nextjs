// /api/signup/check/route.ts

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await connectDB();

  const url = new URL(req.url);
  const name = url.searchParams.get("name");
  const email = url.searchParams.get("email");

  if (name) {
    const nameExists = await User.findOne({ name });
    if (nameExists) return NextResponse.json({ exists: true });
    return NextResponse.json({ exists: false });
  }

  if (email) {
    const emailExists = await User.findOne({ email });
    if (emailExists) return NextResponse.json({ exists: true });
    return NextResponse.json({ exists: false });
  }

  return NextResponse.json({ error: "Missing query param" }, { status: 400 });
}

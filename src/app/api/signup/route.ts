import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json(); 
  console.log("I'm in signup with body:", body);
  const { name, email, password, profile_pic } = body;
  await connectDB();

  const existing = await User.findOne({ email });
  if (existing)
    return NextResponse.json(
      { message: "Email already exists" },
      { status: 400 }
    );

  const hash = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hash, profile_pic });
  await user.save();

  return NextResponse.json({ message: "User registered" }, { status: 201 });
}

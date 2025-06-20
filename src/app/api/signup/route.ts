import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const form = await req.formData();

  const name = form.get("name") as string;
  const email = form.get("email") as string;
  const password = form.get("password") as string;
  const profilePic = form.get("profile_pic");

  console.log("I'm in signup with:", { name, email, password });

  await connectDB();

  const nameExists = await User.findOne({ name });
  if (nameExists) {
    return NextResponse.json(
      { message: "Name already taken" },
      { status: 400 }
    );
  }

  const existing = await User.findOne({ email });
  if (existing)
    return NextResponse.json(
      { message: "Email already exists" },
      { status: 400 }
    );

  const hash = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    password: hash,
    profile_pic: profilePic ? profilePic.toString() : "",
  });

  await user.save();

  return NextResponse.json({ message: "User registered" }, { status: 201 });
}

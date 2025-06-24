import User from "@/models/User";
import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function getUsers() {
  try {
    await connectDB();
    const users = await User.find({}, "-password").lean();
    return NextResponse.json(users);
  } catch (err) {
    console.error("❌ Error fetching users:", err);
    return new NextResponse("Server error", { status: 500 });
  }
}

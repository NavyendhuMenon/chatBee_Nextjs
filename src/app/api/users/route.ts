import { NextRequest } from "next/server";
import { getUsers } from "@/server/userController";

export async function GET(req: NextRequest) {
  return getUsers();
}
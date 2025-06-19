import NextAuth from "next-auth";

import { authOptions } from "@/lib/authOptions";

const handler = NextAuth(authOptions)

console.log("In next auth handler ")
export {handler as GET, handler as POST}
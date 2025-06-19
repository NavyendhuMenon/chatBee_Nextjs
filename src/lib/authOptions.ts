import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "./mongodb";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";
import type { NextAuthOptions, User } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials
      ): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        await connectDB();
        const user = await UserModel.findOne({ email: credentials.email });

        if (!user) return null;

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;

        console.log(`User logged in successfully: ${user.email}`); 

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
           isAdmin: user.isAdmin,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};

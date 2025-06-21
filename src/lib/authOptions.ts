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
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) return null;

        await connectDB();

        const user = await UserModel.findOne({ email: credentials.email });

        if (!user) return null;

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;

        console.log(`✅ User logged in successfully: ${user.email}`);

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          profile_pic: user.profile_pic, 

        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // Default max session age = 30 days
  },

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/auth/signin",
  },

  callbacks: {
    async jwt({ token, user, account, trigger, session }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.isAdmin = user.isAdmin;
        token.profile_pic = user.profile_pic || "";

        // Handle rememberMe manually if needed
        if (session?.remember) {
          // Token expiration set manually for remember me
          token.exp = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60; // 30 days
        } else {
          token.exp = Math.floor(Date.now() / 1000) + 24 * 60 * 60; // 1 day
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.isAdmin = token.isAdmin;
        session.user.image = token.profile_pic || "";

      }
      return session;
    },
  },
};

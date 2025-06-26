import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email: string;
      isAdmin: boolean;
      image?: string; 
    };
  }

  interface User {
    id: string;
    name?: string | null;
    email: string;
    isAdmin: boolean;
    profile_pic?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name?: string | null;
    email: string;
    isAdmin: boolean;
    profile_pic?: string;

  }
}

export {};

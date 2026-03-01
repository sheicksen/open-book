// lib/auth.ts
// Central NextAuth configuration — imported by the API route and anywhere
// you need to read the session server-side.

import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const authOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [

    // ── Email + password ─────────────────────────────────────────────────────
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email:    { label: "Email",    type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) return null;

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        return passwordMatch ? user : null;
      },
    }),
  ],

  session: {
    strategy: "jwt", // use JWT so credentials provider works alongside OAuth
  },

  callbacks: {
    // Attach user id and username to the JWT token
    async jwt({ token, user }) {
      if (user) {
        token.id       = user.id;
        token.username = user.username;
      }
      return token;
    },
    // Expose id and username on the client-side session object
    async session({ session, token }) {
      if (session.user) {
        session.user.id       = token.id;
        session.user.username = token.username;
      }
      return session;
    },
  },

  pages: {
    signIn:  "/login",   // redirect here instead of NextAuth's default page
    newUser: "/signup",
    error:   "/login",
  },
};

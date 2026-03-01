// types/next-auth.d.ts
// Extends the default NextAuth session and JWT types to include
// the custom fields we add in the callbacks (id, username).

import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
    } & DefaultSession["user"];
  }

  interface User {
    username?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string;
  }
}

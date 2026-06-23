import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      firstName?: string | null;
      lastName?: string | null;
      accountType?: string;
      orgName?: string | null;
      postAmount?: boolean;
      postName?: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    firstName?: string | null;
    lastName?: string | null;
    accountType?: string;
    orgName?: string | null;
    postAmount?: boolean;
    postName?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    firstName?: string | null;
    lastName?: string | null;
    accountType?: string;
    orgName?: string | null;
    postAmount?: boolean;
    postName?: boolean;
  }
}

export {};

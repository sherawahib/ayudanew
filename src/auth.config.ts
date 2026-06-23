import type { NextAuthConfig } from "next-auth";

/**
 * Edge-safe auth config — no Prisma/database imports.
 * Used by middleware; must stay compatible with JWT tokens from auth.ts.
 */
export const authConfig = {
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/donors/sign-in",
    newUser: "/donors/dashboard",
  },
  providers: [],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user?.id) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.accountType = user.accountType;
        token.orgName = user.orgName;
        token.postAmount = user.postAmount;
        token.postName = user.postName;
      }

      if (trigger === "update" && session?.user && token.id) {
        token.name = session.user.name;
        token.firstName = session.user.firstName;
        token.lastName = session.user.lastName;
        token.accountType = session.user.accountType;
        token.orgName = session.user.orgName;
        token.postAmount = session.user.postAmount;
        token.postName = session.user.postName;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.image = (token.picture as string) ?? null;
        session.user.firstName = token.firstName as string | null;
        session.user.lastName = token.lastName as string | null;
        session.user.accountType = token.accountType as string;
        session.user.orgName = token.orgName as string | null;
        session.user.postAmount = token.postAmount as boolean;
        session.user.postName = token.postName as boolean;
      }
      return session;
    },
  },
  trustHost: true,
} satisfies NextAuthConfig;

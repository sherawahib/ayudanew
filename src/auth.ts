import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Facebook from "next-auth/providers/facebook";
import Google from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";

export type DonorSessionUser = {
  id: string;
  email: string;
  name?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  image?: string | null;
  accountType?: string;
  orgName?: string | null;
  postAmount?: boolean;
  postName?: boolean;
};

async function loadUserTokenFields(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      firstName: true,
      lastName: true,
      name: true,
      email: true,
      image: true,
      accountType: true,
      orgName: true,
      postAmount: true,
      postName: true,
    },
  });
}

function applyDbUserToToken(
  token: Record<string, unknown>,
  dbUser: NonNullable<Awaited<ReturnType<typeof loadUserTokenFields>>>,
) {
  token.email = dbUser.email;
  token.name = dbUser.name ?? `${dbUser.firstName ?? ""} ${dbUser.lastName ?? ""}`.trim();
  token.firstName = dbUser.firstName;
  token.lastName = dbUser.lastName;
  token.picture = dbUser.image;
  token.accountType = dbUser.accountType;
  token.orgName = dbUser.orgName;
  token.postAmount = dbUser.postAmount;
  token.postName = dbUser.postName;
}

const providers: NextAuthConfig["providers"] = [
  Credentials({
    name: "Email",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      try {
        const email = credentials?.email?.toString().trim().toLowerCase();
        const password = credentials?.password?.toString();

        if (!email || !password) {
          return null;
        }

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user?.passwordHash) {
          return null;
        }

        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name ?? `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
          image: user.image,
        };
      } catch (error) {
        console.error("Credentials authorize failed:", error);
        return null;
      }
    },
  }),
];

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  );
}

if (process.env.FACEBOOK_CLIENT_ID && process.env.FACEBOOK_CLIENT_SECRET) {
  providers.push(
    Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  );
}

const authConfig = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/donors/sign-in",
    newUser: "/donors/dashboard",
  },
  providers,
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // Only hit the database on sign-in or explicit session updates — never on
      // every middleware read (Edge runtime cannot run Prisma).
      if (user?.id) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;

        const dbUser = await loadUserTokenFields(user.id);
        if (dbUser) {
          applyDbUserToToken(token, dbUser);
        }
      }

      if (trigger === "update" && session?.user && token.id) {
        token.name = session.user.name;
        token.firstName = session.user.firstName;
        token.lastName = session.user.lastName;
        token.accountType = session.user.accountType;
        token.orgName = session.user.orgName;
        token.postAmount = session.user.postAmount;
        token.postName = session.user.postName;

        const dbUser = await loadUserTokenFields(token.id as string);
        if (dbUser) {
          applyDbUserToToken(token, dbUser);
        }
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
    async signIn({ user, account }) {
      if (account?.provider === "credentials") {
        return true;
      }

      if (!user.email) {
        return false;
      }

      const existing = await prisma.user.findUnique({
        where: { email: user.email.toLowerCase() },
      });

      if (existing && !existing.name && user.name) {
        const [firstName, ...rest] = user.name.split(" ");
        await prisma.user.update({
          where: { id: existing.id },
          data: {
            firstName: existing.firstName ?? firstName,
            lastName: existing.lastName ?? rest.join(" "),
            name: user.name,
            image: existing.image ?? user.image,
          },
        });
      }

      return true;
    },
  },
  trustHost: true,
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);

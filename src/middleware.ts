import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import { isAdminEmail } from "@/lib/admin";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((request) => {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const isSignedIn = Boolean(request.auth?.user?.id);

  if (!isSignedIn) {
    const signInUrl = new URL("/donors/sign-in", request.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  if (!isAdminEmail(request.auth?.user?.email)) {
    return NextResponse.redirect(
      new URL("/donors/dashboard?error=admin_access_denied", request.url),
    );
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};

import { auth } from "@/auth";
import { isAdminEmail } from "@/lib/admin";
import { NextResponse } from "next/server";

export default auth((request) => {
  const { pathname } = request.nextUrl;
  const isDashboard = pathname.startsWith("/donors/dashboard");
  const isSignedIn = Boolean(request.auth);

  if (isDashboard && !isSignedIn) {
    const signInUrl = new URL("/donors/sign-in", request.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  if ((pathname === "/donors/sign-in" || pathname === "/donors/sign-up") && isSignedIn) {
    const callbackUrl = request.nextUrl.searchParams.get("callbackUrl") ?? "";
    const needsAdmin = callbackUrl.startsWith("/admin");
    const isAdmin = isAdminEmail(request.auth?.user?.email);

    if (!needsAdmin || isAdmin) {
      return NextResponse.redirect(new URL("/donors/dashboard", request.url));
    }
  }

  const isAdminRoute = pathname.startsWith("/admin");
  if (isAdminRoute && isSignedIn) {
    const email = request.auth?.user?.email;
    if (!isAdminEmail(email)) {
      return NextResponse.redirect(new URL("/donors/dashboard", request.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/donors/dashboard",
    "/donors/dashboard/:path*",
    "/donors/sign-in",
    "/donors/sign-up",
    "/admin",
    "/admin/:path*",
  ],
};

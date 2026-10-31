import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getExpectedSessionToken } from "@/lib/auth";

const SESSION_COOKIE_NAME = "admin_session";

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  const sessionToken = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const expectedToken = await getExpectedSessionToken();
  const isAuthenticated = sessionToken === expectedToken;

  // If trying to access admin dashboard and not authenticated, redirect to login
  if (path.startsWith("/admin") && path !== "/admin/login" && !isAuthenticated) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // If already authenticated and trying to access login page, redirect to dashboard
  if (path === "/admin/login" && isAuthenticated) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/admin/:path*"],
};

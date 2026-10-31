import { NextRequest, NextResponse } from "next/server";
import { getExpectedSessionToken } from "@/lib/auth";

const SESSION_COOKIE_NAME = "admin_session";
const DEFAULT_PASSWORD = "admin123";

// Helper to get admin password
function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || DEFAULT_PASSWORD;
}

// POST login
export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    const correctPassword = getAdminPassword();

    if (password === correctPassword) {
      const response = NextResponse.json({ success: true, message: "Logged in successfully" });
      const expectedToken = await getExpectedSessionToken();
      
      // Set HttpOnly session cookie
      response.cookies.set({
        name: SESSION_COOKIE_NAME,
        value: expectedToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24, // 24 hours
      });

      return response;
    }

    return NextResponse.json({ success: false, message: "Invalid password" }, { status: 401 });
  } catch {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

// GET check status
export async function GET(request: NextRequest) {
  const sessionToken = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const expectedToken = await getExpectedSessionToken();
  const isAuthenticated = sessionToken === expectedToken;

  return NextResponse.json({ authenticated: isAuthenticated });
}

// DELETE logout
export async function DELETE() {
  const response = NextResponse.json({ success: true, message: "Logged out successfully" });
  
  // Clear cookie
  response.cookies.delete(SESSION_COOKIE_NAME);

  return response;
}

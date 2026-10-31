import { NextRequest, NextResponse } from "next/server";
import { getExpectedSessionToken } from "@/lib/auth";
import { checkRateLimit } from "@/lib/rateLimit";

const SESSION_COOKIE_NAME = "admin_session";
const DEFAULT_PASSWORD = "admin123";

// Helper to get admin password
function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || DEFAULT_PASSWORD;
}

// POST login
export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    const { allowed, retryAfterSeconds } = checkRateLimit(`login_${ip}`, 5, 15 * 60 * 1000);
    if (!allowed) {
      return NextResponse.json(
        {
          success: false,
          message: `Too many login attempts. Please wait ${retryAfterSeconds} seconds before trying again.`,
        },
        { status: 429 }
      );
    }

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
        sameSite: "strict",
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

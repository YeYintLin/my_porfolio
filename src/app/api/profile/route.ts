import { NextRequest, NextResponse } from "next/server";
import { getProfile, saveProfile, ProfileData } from "@/lib/db";
import { getExpectedSessionToken } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const SESSION_COOKIE_NAME = "admin_session";

async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const sessionToken = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const expectedToken = await getExpectedSessionToken();
  return sessionToken === expectedToken;
}

// GET profile info
export async function GET() {
  try {
    const profile = await getProfile();
    return NextResponse.json(profile, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    });
  } catch {
    return NextResponse.json({ message: "Failed to fetch profile" }, { status: 500 });
  }
}

// POST update profile info
export async function POST(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body: ProfileData = await request.json();
    await saveProfile(body);
    return NextResponse.json({ success: true, profile: body });
  } catch {
    return NextResponse.json({ message: "Failed to update profile" }, { status: 500 });
  }
}

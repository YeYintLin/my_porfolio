import { NextRequest, NextResponse } from "next/server";
import { getExperienceData, saveExperienceData, TimelineItem } from "@/lib/db";
import { getExpectedSessionToken } from "@/lib/auth";

const SESSION_COOKIE_NAME = "admin_session";

async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const sessionToken = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const expectedToken = await getExpectedSessionToken();
  return sessionToken === expectedToken;
}

// GET experience & education
export async function GET() {
  try {
    const data = await getExperienceData();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ message: "Failed to fetch experience data" }, { status: 500 });
  }
}

// POST add or update item
export async function POST(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, type, title, subtitle, date, description } = body;

    if (!title || !subtitle || !date) {
      return NextResponse.json({ message: "Title, subtitle and date are required" }, { status: 400 });
    }

    const currentData = await getExperienceData();
    const targetKey = type === "edu" ? "education" : "experiences";

    if (id) {
      // Edit existing
      currentData[targetKey] = currentData[targetKey].map((item) =>
        item.id === id ? { ...item, title, subtitle, date, description: description || "" } : item
      );
    } else {
      // Add new
      const newItem: TimelineItem = {
        id: Date.now().toString(),
        type: type === "edu" ? "edu" : "work",
        title,
        subtitle,
        date,
        description: description || "",
      };
      currentData[targetKey].unshift(newItem);
    }

    await saveExperienceData(currentData);
    return NextResponse.json({ success: true, data: currentData });
  } catch {
    return NextResponse.json({ message: "Failed to save experience" }, { status: 500 });
  }
}

// DELETE item
export async function DELETE(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const type = searchParams.get("type");

    if (!id || !type) {
      return NextResponse.json({ message: "Item ID and type are required" }, { status: 400 });
    }

    const currentData = await getExperienceData();
    const targetKey = type === "edu" ? "education" : "experiences";

    currentData[targetKey] = currentData[targetKey].filter((item) => item.id !== id);
    await saveExperienceData(currentData);

    return NextResponse.json({ success: true, data: currentData });
  } catch {
    return NextResponse.json({ message: "Failed to delete experience item" }, { status: 500 });
  }
}

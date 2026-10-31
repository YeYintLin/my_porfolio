import { NextRequest, NextResponse } from "next/server";
import { getTechStack, saveTechStack, TechCategory } from "@/lib/db";
import { getExpectedSessionToken } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const SESSION_COOKIE_NAME = "admin_session";

// Helper check authentication
async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const sessionToken = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const expectedToken = await getExpectedSessionToken();
  return sessionToken === expectedToken;
}

// GET all tech stack categories
export async function GET() {
  try {
    const categories = await getTechStack();
    return NextResponse.json(categories, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    });
  } catch {
    return NextResponse.json({ message: "Failed to fetch tech stack" }, { status: 500 });
  }
}

// POST create or update category
export async function POST(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const { id, title, skills } = data;

    if (!title) {
      return NextResponse.json({ message: "Category title is required" }, { status: 400 });
    }

    const techstack = await getTechStack();

    if (id) {
      // Update existing
      const categoryIndex = techstack.findIndex((c) => c.id === id);
      if (categoryIndex === -1) {
        return NextResponse.json({ message: "Category not found" }, { status: 404 });
      }
      techstack[categoryIndex] = {
        id,
        title,
        skills: skills || [],
      };
      await saveTechStack(techstack);
      return NextResponse.json({ success: true, category: techstack[categoryIndex] });
    } else {
      // Create new
      const newCategory: TechCategory = {
        id: Date.now().toString(),
        title,
        skills: skills || [],
      };
      techstack.push(newCategory);
      await saveTechStack(techstack);
      return NextResponse.json({ success: true, category: newCategory });
    }
  } catch {
    return NextResponse.json({ message: "Failed to save tech stack" }, { status: 500 });
  }
}

// DELETE category or skill
export async function DELETE(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const skill = searchParams.get("skill");

    if (!id) {
      return NextResponse.json({ message: "Category ID is required" }, { status: 400 });
    }

    const techstack = await getTechStack();
    const categoryIndex = techstack.findIndex((c) => c.id === id);

    if (categoryIndex === -1) {
      return NextResponse.json({ message: "Category not found" }, { status: 404 });
    }

    if (skill) {
      // Delete specific skill from category
      techstack[categoryIndex].skills = techstack[categoryIndex].skills.filter((s) => s !== skill);
      await saveTechStack(techstack);
      return NextResponse.json({ success: true, category: techstack[categoryIndex] });
    } else {
      // Delete whole category
      const filteredStack = techstack.filter((c) => c.id !== id);
      await saveTechStack(filteredStack);
      return NextResponse.json({ success: true, message: "Category deleted successfully" });
    }
  } catch {
    return NextResponse.json({ message: "Failed to delete tech stack item" }, { status: 500 });
  }
}

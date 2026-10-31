import { NextRequest, NextResponse } from "next/server";
import { getProjects, saveProjects, Project } from "@/lib/db";
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

// GET all projects
export async function GET() {
  try {
    const projects = await getProjects();
    return NextResponse.json(projects, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    });
  } catch {
    return NextResponse.json({ message: "Failed to fetch projects" }, { status: 500 });
  }
}

// POST add new project
export async function POST(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const { title, description, image, tags, liveUrl, githubUrl } = data;

    if (!title || !description) {
      return NextResponse.json({ message: "Title and description are required" }, { status: 400 });
    }

    const projects = await getProjects();
    const newProject: Project = {
      id: Date.now().toString(),
      title,
      description,
      image: image || "/projects/ecommerce_mockup.png",
      tags: tags || [],
      liveUrl: liveUrl || "#",
      githubUrl: githubUrl || "#",
    };

    projects.push(newProject);
    await saveProjects(projects);

    return NextResponse.json({ success: true, project: newProject });
  } catch {
    return NextResponse.json({ message: "Failed to create project" }, { status: 500 });
  }
}

// PUT update project
export async function PUT(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const { id, title, description, image, tags, liveUrl, githubUrl } = data;

    if (!id || !title || !description) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const projects = await getProjects();
    const projectIndex = projects.findIndex((p) => p.id === id);

    if (projectIndex === -1) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }

    projects[projectIndex] = {
      id,
      title,
      description,
      image: image || "/projects/ecommerce_mockup.png",
      tags: tags || [],
      liveUrl: liveUrl || "#",
      githubUrl: githubUrl || "#",
    };

    await saveProjects(projects);
    return NextResponse.json({ success: true, project: projects[projectIndex] });
  } catch {
    return NextResponse.json({ message: "Failed to update project" }, { status: 500 });
  }
}

// DELETE project
export async function DELETE(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "Project ID is required" }, { status: 400 });
    }

    const projects = await getProjects();
    const filteredProjects = projects.filter((p) => p.id !== id);

    if (projects.length === filteredProjects.length) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }

    await saveProjects(filteredProjects);
    return NextResponse.json({ success: true, message: "Project deleted successfully" });
  } catch {
    return NextResponse.json({ message: "Failed to delete project" }, { status: 500 });
  }
}

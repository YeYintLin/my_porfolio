import fs from "fs/promises";
import path from "path";

const projectsPath = path.join(process.cwd(), "data", "projects.json");
const techStackPath = path.join(process.cwd(), "data", "techstack.json");
const messagesPath = path.join(process.cwd(), "data", "messages.json");

// Helper to ensure data directory and files exist
async function ensureFileExists(filePath: string, initialContent: string) {
  try {
    await fs.access(filePath);
  } catch {
    // Ensure parent directory exists
    const dir = path.dirname(filePath);
    await fs.mkdir(dir, { recursive: true });
    // Write initial content
    await fs.writeFile(filePath, initialContent, "utf-8");
  }
}

// Ensure all files are ready
async function initializeDb() {
  await ensureFileExists(projectsPath, "[]");
  await ensureFileExists(techStackPath, "[]");
  await ensureFileExists(messagesPath, "[]");
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
}

export interface TechCategory {
  id: string;
  title: string;
  skills: string[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
}

// Projects operations
export async function getProjects(): Promise<Project[]> {
  await initializeDb();
  const data = await fs.readFile(projectsPath, "utf-8");
  return JSON.parse(data);
}

export async function saveProjects(projects: Project[]): Promise<void> {
  await initializeDb();
  await fs.writeFile(projectsPath, JSON.stringify(projects, null, 2), "utf-8");
}

// Tech Stack operations
export async function getTechStack(): Promise<TechCategory[]> {
  await initializeDb();
  const data = await fs.readFile(techStackPath, "utf-8");
  return JSON.parse(data);
}

export async function saveTechStack(techstack: TechCategory[]): Promise<void> {
  await initializeDb();
  await fs.writeFile(techStackPath, JSON.stringify(techstack, null, 2), "utf-8");
}

// Messages operations
export async function getMessages(): Promise<ContactMessage[]> {
  await initializeDb();
  const data = await fs.readFile(messagesPath, "utf-8");
  return JSON.parse(data);
}

export async function saveMessages(messages: ContactMessage[]): Promise<void> {
  await initializeDb();
  await fs.writeFile(messagesPath, JSON.stringify(messages, null, 2), "utf-8");
}

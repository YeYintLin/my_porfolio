import fs from "fs/promises";
import path from "path";

const projectsPath = path.join(process.cwd(), "data", "projects.json");
const techStackPath = path.join(process.cwd(), "data", "techstack.json");
const messagesPath = path.join(process.cwd(), "data", "messages.json");
const experiencePath = path.join(process.cwd(), "data", "experience.json");
const profilePath = path.join(process.cwd(), "data", "profile.json");

// Helper to ensure data directory and files exist
async function ensureFileExists(filePath: string, initialContent: string) {
  try {
    await fs.access(filePath);
  } catch {
    const dir = path.dirname(filePath);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(filePath, initialContent, "utf-8");
  }
}

// Ensure all files are ready
async function initializeDb() {
  await ensureFileExists(projectsPath, "[]");
  await ensureFileExists(techStackPath, "[]");
  await ensureFileExists(messagesPath, "[]");
  await ensureFileExists(experiencePath, JSON.stringify({ experiences: [], education: [] }));
  await ensureFileExists(profilePath, "{}");
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

export interface TimelineItem {
  id: string;
  type: "work" | "edu";
  title: string;
  subtitle: string;
  date: string;
  description: string;
}

export interface ExperienceData {
  experiences: TimelineItem[];
  education: TimelineItem[];
}

export interface ProfileData {
  name: string;
  title: string;
  email: string;
  phone: string;
  whatsapp: string;
  location: string;
  linkedin: string;
  github: string;
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

// Experience operations
export async function getExperienceData(): Promise<ExperienceData> {
  await initializeDb();
  const data = await fs.readFile(experiencePath, "utf-8");
  return JSON.parse(data);
}

export async function saveExperienceData(expData: ExperienceData): Promise<void> {
  await initializeDb();
  await fs.writeFile(experiencePath, JSON.stringify(expData, null, 2), "utf-8");
}

// Profile & Contact operations
export async function getProfile(): Promise<ProfileData> {
  await initializeDb();
  const data = await fs.readFile(profilePath, "utf-8");
  return JSON.parse(data);
}

export async function saveProfile(profile: ProfileData): Promise<void> {
  await initializeDb();
  await fs.writeFile(profilePath, JSON.stringify(profile, null, 2), "utf-8");
}

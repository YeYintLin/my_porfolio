import fs from "fs/promises";
import path from "path";

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

const isVercel = process.env.VERCEL === "1" || !!process.env.AWS_LAMBDA_FUNCTION_NAME;

// Serverless-safe file path helper
function getWritablePath(filename: string): string {
  if (isVercel) {
    return path.join("/tmp", filename);
  }
  return path.join(process.cwd(), "data", filename);
}

function getSeedPath(filename: string): string {
  return path.join(process.cwd(), "data", filename);
}

// In-memory cache for serverless environments
const memoryCache: Record<string, string> = {};

// Helper to safely read json data with Vercel /tmp fallback
async function readDataFile<T>(filename: string, defaultValue: T): Promise<T> {
  const writablePath = getWritablePath(filename);
  const seedPath = getSeedPath(filename);

  // 1. Try reading from memory cache first if updated
  if (memoryCache[filename]) {
    try {
      return JSON.parse(memoryCache[filename]);
    } catch {}
  }

  // 2. Try reading from writable path (contains changes made in runtime)
  try {
    const content = await fs.readFile(writablePath, "utf-8");
    memoryCache[filename] = content;
    return JSON.parse(content);
  } catch {
    // 3. Fall back to seed data from repository /data
    try {
      const seedContent = await fs.readFile(seedPath, "utf-8");
      memoryCache[filename] = seedContent;

      if (isVercel) {
        try {
          await fs.mkdir(path.dirname(writablePath), { recursive: true });
          await fs.writeFile(writablePath, seedContent, "utf-8");
        } catch {}
      }

      return JSON.parse(seedContent);
    } catch {
      return defaultValue;
    }
  }
}

// Helper to safely write json data with Vercel /tmp resilience
async function writeDataFile<T>(filename: string, data: T): Promise<void> {
  const json = JSON.stringify(data, null, 2);
  memoryCache[filename] = json;

  const writablePath = getWritablePath(filename);
  try {
    const dir = path.dirname(writablePath);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(writablePath, json, "utf-8");
  } catch (err) {
    console.warn(`[db] File write warning for ${filename}, persisted in memory cache:`, err);
  }
}

// Projects operations
export async function getProjects(): Promise<Project[]> {
  return readDataFile<Project[]>("projects.json", []);
}

export async function saveProjects(projects: Project[]): Promise<void> {
  return writeDataFile("projects.json", projects);
}

// Tech Stack operations
export async function getTechStack(): Promise<TechCategory[]> {
  return readDataFile<TechCategory[]>("techstack.json", []);
}

export async function saveTechStack(techstack: TechCategory[]): Promise<void> {
  return writeDataFile("techstack.json", techstack);
}

// Messages operations
export async function getMessages(): Promise<ContactMessage[]> {
  return readDataFile<ContactMessage[]>("messages.json", []);
}

export async function saveMessages(messages: ContactMessage[]): Promise<void> {
  return writeDataFile("messages.json", messages);
}

// Experience operations
export async function getExperienceData(): Promise<ExperienceData> {
  return readDataFile<ExperienceData>("experience.json", {
    experiences: [],
    education: [],
  });
}

export async function saveExperienceData(expData: ExperienceData): Promise<void> {
  return writeDataFile("experience.json", expData);
}

// Profile & Contact operations
const defaultProfile: ProfileData = {
  name: "Ye Yint Lin",
  title: "Full-Stack Developer & DevOps Specialist",
  email: "yeyint2702@gmail.com",
  phone: "+95 9 798 123456",
  whatsapp: "",
  location: "Yangon, Myanmar",
  linkedin: "https://www.linkedin.com/in/ye-yint-lin-altair-822a10298/",
  github: "https://github.com/YeYintLin",
};

export async function getProfile(): Promise<ProfileData> {
  return readDataFile<ProfileData>("profile.json", defaultProfile);
}

export async function saveProfile(profile: ProfileData): Promise<void> {
  return writeDataFile("profile.json", profile);
}

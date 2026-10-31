export interface TechCategory {
  id: string;
  title: string;
  skills: string[];
}

export const TECH_STACK_DATA: TechCategory[] = [
  {
    id: "frontend",
    title: "Frontend & Mobile",
    skills: ["React", "Next.js 16", "TypeScript", "JavaScript", "React Native", "Expo", "Tailwind CSS", "Redux"],
  },
  {
    id: "backend",
    title: "Backend & Architecture",
    skills: ["Node.js", "Express", "Microservices", "RESTful APIs", "API Gateway", "MongoDB", "PostgreSQL", "PHP"],
  },
  {
    id: "devops",
    title: "DevOps & Cloud Deployment",
    skills: ["Docker Compose", "Linux VPS Setup", "Nginx Reverse Proxy", "CI/CD (GitHub Actions)", "SSL Automation", "Health Checks"],
  },
  {
    id: "engineering",
    title: "Engineering & Hardware Control",
    skills: ["Python", "C++ (Embedded / IoT)", "Git", "ESP32 / Arduino", "Robotics & Sensors"],
  },
];

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TECH_STACK_DATA, TechCategory } from "@/data/techstack";

// Connected ecosystem mapping
const RELATED_TECH_MAP: Record<string, string[]> = {
  "React": ["Next.js", "TypeScript", "Tailwind CSS", "Node.js"],
  "Next.js": ["React", "TypeScript", "Node.js", "Docker Compose", "Nginx"],
  "TypeScript": ["React", "Next.js", "Node.js", "Express.js"],
  "React Native": ["React", "TypeScript", "Node.js"],
  "Tailwind CSS": ["React", "Next.js"],
  "Node.js": ["Express.js", "MongoDB", "PostgreSQL", "Docker Compose", "RESTful APIs", "JWT Auth"],
  "Express.js": ["Node.js", "MongoDB", "PostgreSQL", "RESTful APIs", "JWT Auth"],
  "RESTful APIs": ["Node.js", "Express.js", "API Gateway Architecture"],
  "API Gateway Architecture": ["Node.js", "Microservices Design", "Docker Compose", "Nginx"],
  "Microservices Design": ["API Gateway Architecture", "Docker Compose", "MongoDB"],
  "MongoDB": ["Node.js", "Express.js", "Docker Compose"],
  "PostgreSQL": ["Node.js", "Express.js", "Docker Compose"],
  "Docker Compose": ["Docker", "Linux VPS", "Nginx", "CI/CD Workflows", "Automated Backups"],
  "Docker": ["Docker Compose", "Linux VPS", "CI/CD Workflows"],
  "Linux VPS": ["Docker Compose", "Nginx", "Uptime Monitoring"],
  "Nginx": ["Docker Compose", "Linux VPS", "SSL / TLS (Let's Encrypt)"],
  "CI/CD Workflows": ["Docker Compose", "Linux VPS", "Git"],
  "C/C++": ["ESP32", "Arduino", "Robotics Control"],
  "Python": ["Robotics Control", "Microcontroller Integration"],
  "ESP32": ["C/C++", "Arduino", "Sensor Interfacing", "IoT Prototypes"],
  "Arduino": ["C/C++", "ESP32", "Sensor Interfacing"],
  "Robotics Control": ["C/C++", "Python", "Microcontroller Integration"],
};

export default function TechStack() {
  const [categories, setCategories] = useState<TechCategory[]>(TECH_STACK_DATA);
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  useEffect(() => {
    // Optionally revalidate from API on client if admin updated it
    fetch(`/api/techstack?t=${Date.now()}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setCategories(data);
        }
      })
      .catch(() => {});
  }, []);

  const isRelated = (skill: string) => {
    if (!activeSkill) return false;
    if (skill === activeSkill) return true;
    const related = RELATED_TECH_MAP[activeSkill] || [];
    return related.includes(skill);
  };

  return (
    <section id="tech-stack" className="py-20 sm:py-24 px-4 sm:px-6 border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 text-center"
        >
          <span className="type-eyebrow text-[var(--accent)] mb-2 block">
            Technical Ecosystem & Architecture
          </span>
          <h2 className="type-h2 text-[var(--text)] mb-3">
            Technologies & Tools
          </h2>
          <p className="type-body text-[var(--muted)] max-w-[65ch] mx-auto text-pretty">
            Languages, frameworks, databases, and DevOps tooling applied in real production and academic projects.
            Hover over any technology to trace connected system relationships.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categories.map((category, catIndex) => (
            <div
              key={category.id || category.title}
              className="portfolio-card p-6 flex flex-col justify-between transition-all duration-300 hover:border-[var(--accent)]/60 hover:shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-[var(--border)]">
                  <h3 className="text-base sm:text-lg font-semibold text-[var(--text)]">
                    {category.title}
                  </h3>
                  <span className="type-eyebrow text-[var(--muted)] text-[11px] px-2 py-0.5 rounded bg-[var(--bg)] border border-[var(--border)]">
                    Tier 0{catIndex + 1}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => {
                    const active = isRelated(skill);
                    const isDirect = activeSkill === skill;
                    const dim = activeSkill && !active;

                    return (
                      <button
                        type="button"
                        key={skill}
                        onMouseEnter={() => setActiveSkill(skill)}
                        onMouseLeave={() => setActiveSkill(null)}
                        onFocus={() => setActiveSkill(skill)}
                        onBlur={() => setActiveSkill(null)}
                        className={`type-mono-meta font-mono text-sm px-2.5 py-1 rounded-md border transition-all duration-200 cursor-pointer text-left ${
                          isDirect
                            ? "bg-[var(--accent)] text-[var(--bg)] font-semibold border-[var(--accent)] scale-105 shadow-md"
                            : active
                            ? "bg-[var(--accent)]/15 text-[var(--accent)] border-[var(--accent)] font-medium"
                            : dim
                            ? "bg-[var(--bg)] text-[var(--muted)]/50 border-[var(--border)] opacity-50"
                            : "bg-[var(--bg)] text-[var(--muted)] border-[var(--border)] hover:border-[var(--accent)]/60 hover:text-[var(--text)]"
                        }`}
                      >
                        {skill}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

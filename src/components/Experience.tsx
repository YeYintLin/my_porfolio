"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

interface TimelineItem {
  id: string;
  type: "work" | "edu";
  title: string;
  subtitle: string;
  date: string;
  description: string;
}

const defaultExperiences: TimelineItem[] = [
  {
    id: "1",
    type: "work",
    title: "Junior Full Stack Developer",
    subtitle: "Full-Time",
    date: "Jan 2026 - Present",
    description: "Developing scalable web applications, engineering RESTful APIs, optimizing database queries, and collaborating on deployment pipelines.",
  },
  {
    id: "2",
    type: "work",
    title: "Freelance Full-Stack & DevOps Developer",
    subtitle: "Independent / Contract",
    date: "Available from December 2026",
    description: "Designing modern web applications, containerizing multi-service backends with Docker Compose, and automating CI/CD workflows.",
  },
];

const defaultEducation: TimelineItem[] = [
  {
    id: "1",
    type: "edu",
    title: SITE_CONFIG.education.degree,
    subtitle: SITE_CONFIG.education.institution,
    date: SITE_CONFIG.education.period,
    description: SITE_CONFIG.education.description,
  },
];

export default function Experience() {
  const [experiences, setExperiences] = useState<TimelineItem[]>(defaultExperiences);
  const [education, setEducation] = useState<TimelineItem[]>(defaultEducation);

  useEffect(() => {
    fetch(`/api/experience?t=${Date.now()}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data.experiences && Array.isArray(data.experiences) && data.experiences.length > 0) {
          setExperiences(data.experiences);
        }
        if (data.education && Array.isArray(data.education) && data.education.length > 0) {
          // Filter out any legacy high school entries
          setEducation(data.education.filter((item: TimelineItem) => !item.title.toLowerCase().includes("high school")));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="experience" className="py-20 sm:py-24 px-4 sm:px-6 border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 text-center"
        >
          <span className="type-eyebrow text-[var(--accent)] mb-2 block">
            Career Timeline & Education
          </span>
          <h2 className="type-h2 text-[var(--text)] mb-3">
            Experience & Education
          </h2>
          <p className="type-body text-[var(--muted)] max-w-[65ch] mx-auto text-pretty">
            Practical development background and academic mechatronics engineering foundation.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14"
        >
          {/* Work Experience */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] shrink-0">
                <Briefcase className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="type-h3 text-xl sm:text-2xl font-bold text-[var(--text)]">Experience</h3>
            </div>

            <div className="relative border-l-2 border-[var(--border)] ml-5 pl-6 space-y-8">
              {experiences.map((item) => (
                <div key={item.id} className="relative group">
                  {/* Timeline bullet dot with pulse and halo on hover */}
                  <div className="absolute -left-[32px] top-2 w-3.5 h-3.5 rounded-full bg-[var(--surface)] border-2 border-[var(--accent)] transition-all duration-300 group-hover:scale-125 group-hover:bg-[var(--accent)] group-hover:shadow-[0_0_12px_var(--accent)]" />

                  <div className="portfolio-card p-5 sm:p-6 transition-all duration-300 group-hover:border-[var(--accent)] group-hover:-translate-y-1 group-hover:shadow-lg">
                    <span className="type-mono-meta font-mono text-sm text-[var(--accent)] mb-1 block">
                      {item.date}
                    </span>
                    <h4 className="text-base sm:text-lg font-semibold text-[var(--text)] mb-0.5 group-hover:text-[var(--accent)] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-sm font-sans text-[var(--muted)] mb-3 font-medium">
                      {item.subtitle}
                    </p>
                    <p className="type-body text-sm text-[var(--muted)] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] shrink-0 shadow-sm">
                <GraduationCap className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="type-h3 text-xl sm:text-2xl font-bold text-[var(--text)]">Education</h3>
            </div>

            <div className="relative border-l-2 border-[var(--border)] ml-5 pl-6 space-y-8">
              {education.map((item) => (
                <div key={item.id} className="relative group">
                  {/* Timeline bullet dot */}
                  <div className="absolute -left-[32px] top-2 w-3.5 h-3.5 rounded-full bg-[var(--surface)] border-2 border-[var(--accent)] transition-all duration-300 group-hover:scale-125 group-hover:bg-[var(--accent)] group-hover:shadow-[0_0_12px_var(--accent)]" />

                  <div className="portfolio-card p-5 sm:p-6 transition-all duration-300 group-hover:border-[var(--accent)] group-hover:-translate-y-1 group-hover:shadow-lg">
                    <span className="type-mono-meta font-mono text-sm text-[var(--accent)] mb-1 block">
                      {item.date}
                    </span>
                    <h4 className="text-base sm:text-lg font-semibold text-[var(--text)] mb-0.5 group-hover:text-[var(--accent)] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-sm font-sans text-[var(--muted)] mb-3 font-medium">
                      {item.subtitle}
                    </p>
                    <p className="type-body text-sm text-[var(--muted)] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

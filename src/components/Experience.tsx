"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";

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
    date: "Jan 19, 2026 - Present",
    description: "Developing scalable full-stack web applications, engineering RESTful APIs, optimizing database queries, and collaborating on production deployment pipelines.",
  },
  {
    id: "2",
    type: "work",
    title: "Freelance Full-Stack & DevOps Engineer",
    subtitle: "Independent / Contract",
    date: "Nov 2026 - Present",
    description: "Designing modern web applications, Dockerizing multi-service backends, provisioning Linux VPS environments, and automating CI/CD deployment workflows.",
  },
];

const defaultEducation: TimelineItem[] = [
  {
    id: "1",
    type: "edu",
    title: "Undergraduate Student",
    subtitle: "University of Technology (Hmawbi)",
    date: "2018 - Present",
    description: "Major: Mechatronic Engineering",
  },
  {
    id: "2",
    type: "edu",
    title: "High School Student",
    subtitle: "Yangon, Myanmar",
    date: "2016 - 2018",
    description: "Completed basic education high school.",
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
          setEducation(data.education);
        }
      })
      .catch((err) => console.error("Failed to load experience data:", err));
  }, []);

  return (
    <section id="experience" className="py-20 sm:py-28 md:py-32 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-12 sm:mb-20 text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 sm:mb-6">
            Journey & Experience
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-[#526E3A] to-[#739655] dark:from-[#10B981] dark:to-[#38BDF8] rounded-full mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16">
          {/* Work Experience */}
          <div>
            <div className="flex items-center gap-3.5 mb-6 sm:mb-8">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center shrink-0">
                <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--primary)]" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold">Experience</h3>
            </div>
            
            <div className="relative border-l border-[var(--primary)]/30 ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-10 sm:space-y-12">
              {experiences.map((item, idx) => (
                <motion.div
                  key={item.id || idx}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative"
                >
                  <div className="absolute -left-[33px] sm:-left-[41px] top-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[var(--background)] border-3 sm:border-4 border-[var(--primary)]" />
                  <span className="text-[var(--primary)] font-medium text-xs sm:text-sm block mb-1">{item.date}</span>
                  <h4 className="text-lg sm:text-xl font-bold mb-1">{item.title}</h4>
                  <h5 className="text-base sm:text-lg opacity-80 mb-2 sm:mb-3">{item.subtitle}</h5>
                  <p className="opacity-70 font-light leading-relaxed text-xs sm:text-sm">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <div className="flex items-center gap-3.5 mb-6 sm:mb-8">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center shrink-0">
                <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--primary)]" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold">Education</h3>
            </div>
            
            <div className="relative border-l border-[var(--primary)]/30 ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-10 sm:space-y-12">
              {education.map((item, idx) => (
                <motion.div
                  key={item.id || idx}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative"
                >
                  <div className="absolute -left-[33px] sm:-left-[41px] top-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[var(--background)] border-3 sm:border-4 border-[var(--primary)]" />
                  <span className="text-[var(--primary)] font-medium text-xs sm:text-sm block mb-1">{item.date}</span>
                  <h4 className="text-lg sm:text-xl font-bold mb-1">{item.title}</h4>
                  <h5 className="text-base sm:text-lg opacity-80 mb-2 sm:mb-3">{item.subtitle}</h5>
                  <p className="opacity-70 font-light leading-relaxed text-xs sm:text-sm">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

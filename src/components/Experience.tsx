"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";

const experience = [
  {
    type: "work",
    title: "Junior Full Stack Developer",
    subtitle: "Full-Time",
    date: "Jan 19, 2026 - Present",
    description: "Developing scalable full-stack web applications, engineering RESTful APIs, optimizing database queries, and collaborating on production deployment pipelines.",
  },
  {
    type: "work",
    title: "Freelance Full-Stack & DevOps Engineer",
    subtitle: "Independent / Contract",
    date: "Nov 2026 - Present",
    description: "Designing modern web applications, Dockerizing multi-service backends, provisioning Linux VPS environments, and automating CI/CD deployment workflows.",
  },
];

const education = [
  {
    type: "edu",
    title: "Undergraduate Student",
    subtitle: "University of Technology (Hmawbi)",
    date: "2018 - Present",
    description: "Major: Mechatronic Engineering",
  },
  {
    type: "edu",
    title: "High School Student",
    subtitle: "Yangon, Myanmar",
    date: "2016 - 2018",
    description: "Completed basic education high school.",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-32 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Journey & Experience
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-[#526E3A] to-[#739655] dark:from-[#10B981] dark:to-[#38BDF8] rounded-full mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Work Experience */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-[var(--primary)]" />
              </div>
              <h3 className="text-3xl font-bold">Experience</h3>
            </div>
            
            <div className="relative border-l border-[var(--primary)]/30 ml-6 pl-8 space-y-12">
              {experience.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative"
                >
                  <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-[var(--background)] border-4 border-[var(--primary)]" />
                  <span className="text-[var(--primary)] font-medium text-sm block mb-1">{item.date}</span>
                  <h4 className="text-xl font-bold mb-1">{item.title}</h4>
                  <h5 className="text-lg opacity-80 mb-3">{item.subtitle}</h5>
                  <p className="opacity-70 font-light leading-relaxed text-sm">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-[var(--primary)]" />
              </div>
              <h3 className="text-3xl font-bold">Education</h3>
            </div>
            
            <div className="relative border-l border-[var(--primary)]/30 ml-6 pl-8 space-y-12">
              {education.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative"
                >
                  <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-[var(--background)] border-4 border-[var(--primary)]" />
                  <span className="text-[var(--primary)] font-medium text-sm block mb-1">{item.date}</span>
                  <h4 className="text-xl font-bold mb-1">{item.title}</h4>
                  <h5 className="text-lg opacity-80 mb-3">{item.subtitle}</h5>
                  <p className="opacity-70 font-light leading-relaxed text-sm">
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

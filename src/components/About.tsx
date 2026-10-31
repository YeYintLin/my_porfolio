"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Code, Server, Cloud, ShieldCheck, Globe, Clock, MapPin } from "lucide-react";
import { useProfile } from "@/context/ProfileContext";
import { SITE_CONFIG } from "@/config/site";

const features = [
  {
    icon: <Code className="w-5 h-5 text-[var(--accent)]" />,
    title: "Full-Stack Development",
    description: "Building responsive web user interfaces with React and Next.js paired with Node.js and Express backend services.",
  },
  {
    icon: <Server className="w-5 h-5 text-[var(--accent)]" />,
    title: "APIs & Data Modeling",
    description: "Designing RESTful APIs, decoupled microservices, and structured schemas with MongoDB and PostgreSQL.",
  },
  {
    icon: <Cloud className="w-5 h-5 text-[var(--accent)]" />,
    title: "Containerized VPS Deployments",
    description: "Configuring production deployments on Linux VPS using Docker Compose and Nginx reverse proxy.",
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-[var(--accent)]" />,
    title: "Operational Reliability",
    description: "Setting up database backups, automated SSL renewal, and automatic restart policies and health checks.", // TODO: confirm automated backup target
  },
];

export default function About() {
  const { profile } = useProfile();

  return (
    <section id="about" className="py-20 sm:py-24 px-4 sm:px-6 border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 text-center"
        >
          <span className="type-eyebrow text-[var(--accent)] mb-2 block">
            Background & Engineering Focus
          </span>
          <h2 className="type-h2 text-[var(--text)] mb-3">
            About Me
          </h2>
          <p className="type-body text-[var(--muted)] max-w-[65ch] mx-auto text-pretty">
            Practical full-stack development, mechatronics problem solving, and Linux deployment workflows.
          </p>
        </motion.div>

        {/* Profile Card & Bio Grid */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center mb-16"
        >
          {/* Profile Photo (Local file using next/image with placeholder) */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden border-2 border-[var(--border)] bg-[var(--surface)] shadow-md">
              <Image
                src="/profile.jpg"
                alt="Ye Yint Lin - Full-Stack Developer with DevOps skills"
                fill
                priority
                sizes="(max-width: 640px) 176px, 208px"
                className="object-cover object-top"
              />
            </div>
          </div>

          {/* Bio text */}
          <div className="lg:col-span-8 space-y-4 type-body text-base text-[var(--muted)] leading-relaxed prose-mobile-justify">
            <p>
              Hi, I’m <strong className="text-[var(--text)] font-semibold">{profile.name || SITE_CONFIG.name}</strong> — a {SITE_CONFIG.title}. I specialize in taking software from conceptual architecture all the way to production deployments on Linux VPS using Docker Compose and Nginx.
            </p>
            <p>
              With a background in Mechatronics Engineering from the University of Technology (Hmawbi), I approach web engineering with a focus on reliability, clear system boundaries, and maintainability. My stack centers on React, Next.js, Node.js, and containerized deployment workflows.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-sm text-[var(--text)] font-sans">
              <span className="inline-flex items-center gap-1.5 text-[var(--muted)]">
                <MapPin className="w-4 h-4 text-[var(--accent)]" /> Yangon, Myanmar
              </span>
              <span className="inline-flex items-center gap-1.5 text-[var(--muted)]">
                <Clock className="w-4 h-4 text-[var(--accent)]" /> {SITE_CONFIG.timezone}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[var(--muted)]">
                <Globe className="w-4 h-4 text-[var(--accent)]" /> {SITE_CONFIG.languages}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Remote Readiness & Practical Operational Setup */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="portfolio-card p-6 sm:p-8 mb-12"
        >
          <h3 className="type-h3 text-base sm:text-lg font-bold mb-6 text-[var(--text)] flex items-center gap-2">
            <Globe className="w-4 h-4 text-[var(--accent)]" /> Remote Collaboration & Operational Setup
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-sm">
            <div className="p-4 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
              <span className="type-eyebrow text-[var(--muted)] block mb-1">Timezone Overlap</span>
              <span className="font-semibold text-sm sm:text-base text-[var(--text)] block mb-1">UTC+6:30 (Yangon)</span>
              <span className="type-body text-sm text-[var(--muted)] prose-mobile-justify block">Overlaps comfortably with SGT, CET, and morning EST hours.</span>
            </div>
            <div className="p-4 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
              <span className="type-eyebrow text-[var(--muted)] block mb-1">Work Mode</span>
              <span className="font-semibold text-sm sm:text-base text-[var(--text)] block mb-1">Remote & Contractor</span>
              <span className="type-body text-sm text-[var(--muted)] prose-mobile-justify block">Available for remote contractor projects from December 2026.</span>
            </div>
            <div className="p-4 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
              <span className="type-eyebrow text-[var(--muted)] block mb-1">Languages</span>
              <span className="font-semibold text-sm sm:text-base text-[var(--text)] block mb-1">English & Burmese</span>
              <span className="type-body text-sm text-[var(--muted)] prose-mobile-justify block">{SITE_CONFIG.languages}.</span>
            </div>
            <div className="p-4 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
              <span className="type-eyebrow text-[var(--muted)] block mb-1">Connectivity Setup</span>
              <span className="font-semibold text-sm sm:text-base text-[var(--text)] block mb-1">Backup Power & Dual ISP</span>
              <span className="type-body text-sm text-[var(--muted)] prose-mobile-justify block">{SITE_CONFIG.connectivity}.</span> {/* TODO: confirm backup setup */}
            </div>
          </div>
        </motion.div>

        {/* 4 Core Pillars */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="portfolio-card p-5 sm:p-6"
            >
              <div className="w-9 h-9 rounded-lg bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center mb-4 text-[var(--accent)]">
                {feature.icon}
              </div>
              <h4 className="text-base font-semibold mb-2 text-[var(--text)]">{feature.title}</h4>
              <p className="type-body text-sm text-[var(--muted)] leading-relaxed prose-mobile-justify">{feature.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

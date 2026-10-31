"use client";

import Image from "next/image";
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
        <div className="mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)] mb-2 block">
            Background & Engineering Focus
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3 text-[var(--text)]">
            About Me
          </h2>
          <p className="text-sm sm:text-base text-[var(--muted)] max-w-2xl mx-auto">
            Practical full-stack development, mechatronics problem solving, and Linux deployment workflows.
          </p>
        </div>

        {/* Profile Card & Bio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center mb-16">
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
          <div className="lg:col-span-8 space-y-4 text-sm sm:text-base text-[var(--muted)] leading-relaxed">
            <p>
              Hi, I’m <strong className="text-[var(--text)] font-semibold">{profile.name || SITE_CONFIG.name}</strong> — a {SITE_CONFIG.title}. I specialize in taking software from conceptual architecture all the way to production deployments on Linux VPS using Docker Compose and Nginx.
            </p>
            <p>
              With a background in Mechatronics Engineering from the University of Technology (Hmawbi), I approach web engineering with a focus on reliability, clear system boundaries, and maintainability. My stack centers on React, Next.js, Node.js, and containerized deployment workflows.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs sm:text-sm text-[var(--text)]">
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
        </div>

        {/* Remote Readiness & Practical Operational Setup */}
        <div className="portfolio-card p-6 sm:p-8 mb-12">
          <h3 className="text-base sm:text-lg font-bold mb-6 text-[var(--text)] flex items-center gap-2">
            <Globe className="w-4 h-4 text-[var(--accent)]" /> Remote Collaboration & Operational Setup
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-xs sm:text-sm">
            <div className="p-4 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
              <span className="text-[11px] uppercase tracking-wider text-[var(--muted)] font-semibold block mb-1">Timezone Overlap</span>
              <span className="font-semibold text-[var(--text)] block mb-1">UTC+6:30 (Yangon)</span>
              <span className="text-[var(--muted)]">Overlaps comfortably with SGT, CET, and morning EST hours.</span>
            </div>
            <div className="p-4 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
              <span className="text-[11px] uppercase tracking-wider text-[var(--muted)] font-semibold block mb-1">Work Mode</span>
              <span className="font-semibold text-[var(--text)] block mb-1">Remote & Contractor</span>
              <span className="text-[var(--muted)]">Available for remote contractor projects from December 2026.</span>
            </div>
            <div className="p-4 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
              <span className="text-[11px] uppercase tracking-wider text-[var(--muted)] font-semibold block mb-1">Languages</span>
              <span className="font-semibold text-[var(--text)] block mb-1">English & Burmese</span>
              <span className="text-[var(--muted)]">{SITE_CONFIG.languages}.</span>
            </div>
            <div className="p-4 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
              <span className="text-[11px] uppercase tracking-wider text-[var(--muted)] font-semibold block mb-1">Connectivity Setup</span>
              <span className="font-semibold text-[var(--text)] block mb-1">Backup Power & Dual ISP</span>
              <span className="text-[var(--muted)]">{SITE_CONFIG.connectivity}.</span> {/* TODO: confirm backup setup */}
            </div>
          </div>
        </div>

        {/* 4 Core Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="portfolio-card p-5 sm:p-6"
            >
              <div className="w-9 h-9 rounded-lg bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center mb-4 text-[var(--accent)]">
                {feature.icon}
              </div>
              <h4 className="text-sm sm:text-base font-semibold mb-2 text-[var(--text)]">{feature.title}</h4>
              <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

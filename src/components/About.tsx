"use client";

import { motion } from "framer-motion";
import { Code, Server, Cloud, ShieldCheck } from "lucide-react";
import { useProfile } from "@/context/ProfileContext";

const features = [
  {
    icon: <Code className="w-6 h-6 text-[var(--primary)]" />,
    title: "Full-Stack Development",
    description: "Building responsive, modern user interfaces with React & Next.js 16 paired with high-performance Node.js backends.",
  },
  {
    icon: <Server className="w-6 h-6 text-[var(--primary)]" />,
    title: "Microservices & APIs",
    description: "Architecting decoupled microservices, API Gateways, and isolated databases (MongoDB & PostgreSQL).",
  },
  {
    icon: <Cloud className="w-6 h-6 text-[var(--primary)]" />,
    title: "DevOps & Cloud Deployments",
    description: "Containerizing services with Docker Compose, automating CI/CD via GitHub Actions, and configuring Linux VPS + Nginx.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-[var(--primary)]" />,
    title: "Reliability & Backups",
    description: "Setting up automated cloud backups, SSL certification, server monitoring, and zero-downtime restart policies.",
  },
];

export default function About() {
  const { profile } = useProfile();

  return (
    <section id="about" className="py-20 sm:py-28 md:py-32 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-12 sm:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 sm:mb-6">
            About Me
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-[#B45309] to-[#D97706] dark:from-[#38BDF8] dark:to-[#06B6D4] rounded-full mb-6 sm:mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-12 text-base sm:text-lg opacity-80 leading-relaxed font-light">
            <p>
              Hi, I’m <span className="font-semibold text-[var(--primary)]">{profile.name}</span> — a {profile.title}. I specialize in taking software from conceptual design and clean architecture all the way to containerized, high-availability cloud production.
            </p>
            <p>
              My expertise spans modern Next.js/React ecosystems, microservices with Node.js, database architecture (MongoDB/PostgreSQL), and cloud infrastructure (Docker Compose, Linux VPS, Nginx, CI/CD). I build software that not only looks exceptional, but performs reliably under real-world workloads.
            </p>
          </div>

          {/* Global Collaboration & Remote Readiness Info */}
          <div className="mt-10 sm:mt-16 p-5 sm:p-8 glass-card border border-[var(--primary)]/15 bg-white/50 dark:bg-black/20 backdrop-blur-md">
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center gap-3">
              <span className="text-xl sm:text-2xl">🌐</span> Global Collaboration & Remote Readiness
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-sm">
              <div className="flex flex-col gap-1.5 p-4 sm:p-5 rounded-2xl bg-white/5 dark:bg-black/5 border border-gray-100 dark:border-gray-800/80">
                <span className="text-xs opacity-50 uppercase tracking-wider font-semibold">Timezone Compatibility</span>
                <span className="font-semibold text-base text-[var(--primary)]">UTC+6:30 (Yangon)</span>
                <span className="opacity-75 font-light leading-relaxed">Comfortably overlap with SGT, CET, and EST business hours.</span>
              </div>
              <div className="flex flex-col gap-1.5 p-4 sm:p-5 rounded-2xl bg-white/5 dark:bg-black/5 border border-gray-100 dark:border-gray-800/80">
                <span className="text-xs opacity-50 uppercase tracking-wider font-semibold">Work Mode</span>
                <span className="font-semibold text-base text-[var(--primary)]">Remote / Relocation</span>
                <span className="opacity-75 font-light leading-relaxed">Open to full-time remote contractor roles and global relocation.</span>
              </div>
              <div className="flex flex-col gap-1.5 p-4 sm:p-5 rounded-2xl bg-white/5 dark:bg-black/5 border border-gray-100 dark:border-gray-800/80">
                <span className="text-xs opacity-50 uppercase tracking-wider font-semibold">Languages</span>
                <span className="font-semibold text-base text-[var(--primary)]">English & Burmese</span>
                <span className="opacity-75 font-light leading-relaxed">Professional working proficiency in English for team syncs.</span>
              </div>
              <div className="flex flex-col gap-1.5 p-4 sm:p-5 rounded-2xl bg-white/5 dark:bg-black/5 border border-gray-100 dark:border-gray-800/80">
                <span className="text-xs opacity-50 uppercase tracking-wider font-semibold">Infrastructure Stability</span>
                <span className="font-semibold text-base text-[var(--primary)]">Power & Net Backups</span>
                <span className="opacity-75 font-light leading-relaxed">Equipped with reliable generator backup & dual high-speed ISP lines.</span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
              className="glass-card p-5 sm:p-8 group hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-[var(--primary)]/10 dark:bg-[var(--primary)]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="opacity-70 text-sm leading-relaxed font-light">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

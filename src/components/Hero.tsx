"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Sparkles, Briefcase } from "lucide-react";
import { useProfile } from "@/context/ProfileContext";
import { SITE_CONFIG } from "@/config/site";
import TechBackground from "@/components/TechBackground";

export default function Hero() {
  const { profile } = useProfile();
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative min-h-[85vh] flex items-center justify-center py-20 px-4 sm:px-6 overflow-hidden"
    >
      {/* Living workspace: technical node background */}
      <TechBackground />

      {/* Gentle desktop spotlight following cursor */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-100 transition-opacity duration-300 hidden md:block"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, var(--accent)/0.06, transparent 40%)`,
        }}
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Availability Badge with subtle radar ping */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6 inline-block"
        >
          <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] text-sm font-sans font-medium text-[var(--text)] shadow-sm backdrop-blur-sm">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--cta)] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--cta)]" />
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[var(--cta)]" aria-hidden="true" />
            <span>{SITE_CONFIG.availabilityBadge}</span>
          </span>
        </motion.div>

        {/* Headline: single semantic H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="type-h1 text-[var(--text)] mb-6 text-balance"
        >
          Full-Stack Developer building and deploying reliable web applications.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="type-body text-base sm:text-lg text-[var(--muted)] mb-10 max-w-[65ch] mx-auto text-pretty"
        >
          Hi, I&apos;m <span className="font-semibold text-[var(--text)]">{profile.name || SITE_CONFIG.name}</span>. A {SITE_CONFIG.title} specialized in building modern React/Next.js interfaces, robust Node.js backend services, and Linux VPS deployments with Docker Compose.
        </motion.p>

        {/* Exactly 3 Buttons: 1 Primary CTA + 2 Secondary/Outline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 w-full"
        >
          {/* Primary CTA (Amber background with dark text) */}
          <a
            href="#projects"
            className="btn-cta group"
          >
            View Projects <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </a>

          {/* Secondary 1: Resume */}
          <a
            href="/Ye_Yint_Lin_Resume.pdf"
            download="Ye_Yint_Lin_Resume.pdf"
            className="btn-secondary group"
          >
            <Download className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" aria-hidden="true" /> Resume
          </a>

          {/* Secondary 2: Services */}
          <a
            href="#services"
            className="btn-secondary group"
          >
            <Briefcase className="w-4 h-4 transition-transform group-hover:scale-110" aria-hidden="true" /> Services
          </a>
        </motion.div>
      </div>
    </section>
  );
}

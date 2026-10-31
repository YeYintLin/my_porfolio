"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Sparkles, Briefcase } from "lucide-react";
import { useProfile } from "@/context/ProfileContext";
import { SITE_CONFIG } from "@/config/site";

export default function Hero() {
  const { profile } = useProfile();

  return (
    <section id="hero" className="relative min-h-[85vh] flex items-center justify-center py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6 inline-block"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] text-sm font-sans font-medium text-[var(--text)]">
            <span className="w-2 h-2 rounded-full bg-[var(--cta)] animate-pulse" aria-hidden="true" />
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
            className="btn-cta"
          >
            View Projects <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>

          {/* Secondary 1: Resume */}
          <a
            href="/Ye_Yint_Lin_Resume.pdf"
            download="Ye_Yint_Lin_Resume.pdf"
            className="btn-secondary"
          >
            <Download className="w-4 h-4" aria-hidden="true" /> Resume
          </a>

          {/* Secondary 2: Services */}
          <a
            href="#services"
            className="btn-secondary"
          >
            <Briefcase className="w-4 h-4" aria-hidden="true" /> Services
          </a>
        </motion.div>
      </div>
    </section>
  );
}

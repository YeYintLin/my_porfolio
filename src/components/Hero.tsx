"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { useProfile } from "@/context/ProfileContext";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Hero() {
  const { profile } = useProfile();

  return (
    <section id="home" className="relative min-h-[92vh] flex items-center justify-center pt-24 sm:pt-28 md:pt-32 pb-16 px-4 sm:px-6 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] bg-[var(--primary)] rounded-full blur-[150px] opacity-10 dark:opacity-20 pointer-events-none -z-10" />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto text-center z-10"
      >
        <motion.div variants={itemVariants} className="mb-6 sm:mb-8 inline-block">
          <span className="inline-flex items-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full glass-card text-xs sm:text-sm font-medium tracking-wide">
            <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 dark:bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-amber-500 dark:bg-cyan-500"></span>
            </span>
            Available for Freelance & Contract Roles 🚀
          </span>
        </motion.div>
        
        <motion.h1 
          variants={itemVariants}
          className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight sm:tracking-tighter mb-6 sm:mb-8 leading-[1.15] sm:leading-[1.1]"
        >
          Building & Deploying <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-[#B45309] via-[#D97706] to-[#F59E0B] dark:from-[#38BDF8] dark:via-[#06B6D4] dark:to-[#10B981] bg-clip-text text-transparent">Resilient Systems</span> with Purpose.
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-base sm:text-lg md:text-xl opacity-75 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed font-light"
        >
          Hi, I&apos;m <span className="font-semibold opacity-100 text-[var(--primary)]">{profile.name}</span>. A {profile.title} crafting scalable web applications, robust microservices, and automated cloud deployments.
        </motion.p>
        
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-5 w-full">
          <a href="#projects" className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center px-6 sm:px-8 py-3.5 sm:py-4 text-base sm:text-lg">
            Featured Projects <ArrowRight className="w-5 h-5" />
          </a>
          <a href="#services" className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-full border border-gray-300 dark:border-gray-700 font-medium hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all flex items-center gap-2 w-full sm:w-auto justify-center text-base sm:text-lg bg-white/5 dark:bg-black/5 backdrop-blur-sm">
            Freelance Services
          </a>
          <a href="/Ye_Yint_Lin_Resume.pdf" download="Ye_Yint_Lin_Resume.pdf" className="px-5 py-3 rounded-full text-xs sm:text-sm font-medium opacity-70 hover:opacity-100 hover:text-[var(--primary)] transition-all flex items-center gap-2">
            Resume <Download className="w-4 h-4" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

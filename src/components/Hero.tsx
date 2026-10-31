"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";

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
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] bg-[var(--primary)] rounded-full blur-[150px] opacity-10 dark:opacity-20 pointer-events-none -z-10" />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto text-center z-10"
      >
        <motion.div variants={itemVariants} className="mb-8 inline-block">
          <span className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full glass-card text-sm font-medium tracking-wide">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            Available for Freelance & Contract Roles 🚀
          </span>
        </motion.div>
        
        <motion.h1 
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 leading-[1.1]"
        >
          Building & Deploying <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-[#526E3A] via-[#739655] to-[#8FBC8F] dark:from-[#10B981] dark:via-[#06B6D4] dark:to-[#38BDF8] bg-clip-text text-transparent">Resilient Systems</span> with Purpose.
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-lg md:text-xl opacity-75 mb-12 max-w-2xl mx-auto leading-relaxed font-light"
        >
          Hi, I&apos;m <span className="font-semibold opacity-100 text-[var(--primary)]">Ye Yint Lin</span>. A Full-Stack Developer & DevOps Specialist crafting scalable web applications, robust microservices, and automated cloud deployments.
        </motion.p>
        
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <a href="#projects" className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center px-8 py-4 text-lg">
            Featured Projects <ArrowRight className="w-5 h-5" />
          </a>
          <a href="#services" className="px-8 py-4 rounded-full border border-gray-300 dark:border-gray-700 font-medium hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all flex items-center gap-2 w-full sm:w-auto justify-center text-lg bg-white/5 dark:bg-black/5 backdrop-blur-sm">
            Freelance Services
          </a>
          <a href="/Ye_Yint_Lin_Resume.pdf" download="Ye_Yint_Lin_Resume.pdf" className="px-6 py-4 rounded-full text-sm font-medium opacity-70 hover:opacity-100 hover:text-[var(--primary)] transition-all flex items-center gap-2">
            Resume <Download className="w-4 h-4" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import ThemeToggle from "@/components/ThemeToggle";
import Hero from "@/components/Hero";
import About from "@/components/About";
import TechStack from "@/components/TechStack";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Contact from "@/components/Contact";

export default function Home() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-hover)] origin-left z-50"
        style={{ scaleX }}
      />

      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      
      <main className={`flex-1 overflow-y-auto relative bg-grid-pattern transition-all duration-300 ${isCollapsed ? 'md:ml-[80px]' : 'md:ml-[280px]'}`}>
        {/* Background ambient floating glowing orbs */}
        <div className="absolute top-[8%] left-[-5%] w-[35rem] h-[35rem] rounded-full bg-gradient-to-tr from-[#526E3A]/20 via-[#739655]/15 to-transparent dark:from-emerald-500/20 dark:via-teal-500/15 dark:to-cyan-500/10 blur-[130px] pointer-events-none -z-20 animate-float-slow" />
        <div className="absolute bottom-[25%] right-[-5%] w-[40rem] h-[40rem] rounded-full bg-gradient-to-br from-[#739655]/15 via-[#526E3A]/20 to-transparent dark:from-cyan-500/15 dark:via-indigo-500/15 dark:to-emerald-500/10 blur-[150px] pointer-events-none -z-20 animate-float-slower" />
        <div className="absolute top-[50%] left-[30%] w-[30rem] h-[30rem] rounded-full bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 blur-[140px] pointer-events-none -z-20" />

        {/* Floating Theme Toggle */}
        <div className="absolute top-6 right-6 z-50">
          <ThemeToggle />
        </div>
        
        <Hero />
        <About />
        <TechStack />
        <Experience />
        <Projects />
        <Services />
        <Contact />
        
        <footer className="py-8 text-center opacity-50 text-sm font-light border-t border-gray-200 dark:border-gray-800 mt-10">
          &copy; {new Date().getFullYear()} Ye Yint Lin. Crafted with precision.
        </footer>
      </main>
    </div>
  );
}

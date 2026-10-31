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
import Footer from "@/components/Footer";
import WelcomeSplash from "@/components/WelcomeSplash";
import { ProfileProvider } from "@/context/ProfileContext";

export default function Home() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <ProfileProvider>
      <div className="flex h-screen overflow-hidden">
        {/* Welcome Splash Screen */}
        <WelcomeSplash duration={2200} />

        {/* Scroll Progress Bar */}
        <motion.div 
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-hover)] origin-left z-50"
          style={{ scaleX }}
        />

        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        
        <main className={`flex-1 overflow-y-auto overflow-x-hidden relative bg-grid-pattern transition-all duration-300 ${isCollapsed ? 'md:ml-[80px]' : 'md:ml-[280px]'}`}>
          {/* Background ambient floating glowing orbs with smooth transition */}
          <div className="absolute top-[8%] left-[-5%] w-[35rem] h-[35rem] rounded-full bg-gradient-to-tr from-amber-500/15 via-orange-500/10 to-transparent dark:from-sky-500/15 dark:via-cyan-500/12 dark:to-transparent blur-[130px] pointer-events-none -z-20 animate-float-slow transition-all duration-700 ease-in-out" />
          <div className="absolute bottom-[25%] right-[-5%] w-[40rem] h-[40rem] rounded-full bg-gradient-to-br from-sky-500/15 via-blue-500/10 to-transparent dark:from-cyan-500/15 dark:via-sky-600/12 dark:to-transparent blur-[150px] pointer-events-none -z-20 animate-float-slower transition-all duration-700 ease-in-out" />
          <div className="absolute top-[50%] left-[30%] w-[30rem] h-[30rem] rounded-full bg-gradient-to-r from-amber-500/8 to-sky-500/8 dark:from-sky-500/8 dark:to-cyan-500/8 blur-[140px] pointer-events-none -z-20 transition-all duration-700 ease-in-out" />

          {/* Floating Theme Toggle */}
          <div className="absolute top-4 right-4 md:top-6 md:right-6 z-30">
            <ThemeToggle />
          </div>
          
          <Hero />
          <About />
          <TechStack />
          <Experience />
          <Projects />
          <Services />
          <Contact />
          
          <Footer />
        </main>
      </div>
    </ProfileProvider>
  );
}

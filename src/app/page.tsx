"use client";

import WelcomeSplash from "@/components/WelcomeSplash";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import TechStack from "@/components/TechStack";
import Experience from "@/components/Experience";
import About from "@/components/About";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { ProfileProvider } from "@/context/ProfileContext";

export default function Home() {
  return (
    <ProfileProvider>
      {/* Animated Welcome Splash Overlay */}
      <WelcomeSplash duration={2200} />

      <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--text)] transition-colors duration-150">
        {/* Sticky Navbar with backdrop blur & IntersectionObserver active highlight */}
        <Navbar />

        {/* Section order: Hero -> Projects -> Tech Stack -> Experience -> About -> Services -> Contact */}
        <main className="flex-1 w-full">
          <Hero />
          <Projects />
          <TechStack />
          <Experience />
          <About />
          <Services />
          <Contact />
        </main>

        {/* Public Footer (Admin Portal link removed) */}
        <Footer />
      </div>
    </ProfileProvider>
  );
}

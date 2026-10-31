"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useProfile } from "@/context/ProfileContext";
import { 
  Home, 
  User, 
  GraduationCap, 
  Code2, 
  Briefcase, 
  Mail,
  Layers,
  Menu,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const navLinks = [
  { id: "home", name: "Home", href: "#home", icon: Home },
  { id: "about", name: "About", href: "#about", icon: User },
  { id: "techstack", name: "Tech Stack", href: "#techstack", icon: Code2 },
  { id: "experience", name: "Experience", href: "#experience", icon: Briefcase },
  { id: "projects", name: "Projects", href: "#projects", icon: GraduationCap },
  { id: "services", name: "Services", href: "#services", icon: Layers },
  { id: "contact", name: "Contact", href: "#contact", icon: Mail },
];

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

export default function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
  const { profile } = useProfile();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const mainEl = document.querySelector("main");
      const scrollPosition = (mainEl ? mainEl.scrollTop : window.scrollY) || 0;
      const windowHeight = window.innerHeight;
      const scrollBottom = scrollPosition + windowHeight;
      const totalScrollHeight = mainEl ? mainEl.scrollHeight : document.documentElement.scrollHeight;

      // When reaching near the bottom, highlight "contact"
      if (totalScrollHeight - scrollBottom < 120) {
        setActiveSection("contact");
        return;
      }

      // Check sections from bottom to top
      const thresholdOffset = windowHeight * 0.35;

      for (let i = navLinks.length - 1; i >= 0; i--) {
        const id = navLinks[i].id;
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top - thresholdOffset) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    const mainEl = document.querySelector("main");
    if (mainEl) {
      mainEl.addEventListener("scroll", handleScroll, { passive: true });
    }
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initial check
    handleScroll();

    return () => {
      if (mainEl) mainEl.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setActiveSection(id);
    setIsOpen(false);

    const targetEl = document.getElementById(id);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        className="md:hidden fixed top-4 left-4 z-50 p-2.5 rounded-xl sidebar-toggle-btn text-white shadow-xl backdrop-blur-md active:scale-95 transition-all"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Navigation Menu"
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <motion.aside
        className={`fixed inset-y-0 left-0 z-40 sidebar-custom text-white flex flex-col transition-all duration-300 ease-in-out md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'} ${isCollapsed ? 'w-[280px] md:w-[80px]' : 'w-[280px]'}`}
      >
        {/* Toggle Button for Desktop */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden md:flex absolute top-6 -right-3.5 z-50 w-7 h-7 items-center justify-center rounded-full bg-white text-gray-900 shadow-[0_2px_10px_rgba(0,0,0,0.25)] border border-gray-200 hover:scale-110 active:scale-95 transition-all cursor-pointer dark:bg-[#1E293B] dark:text-white dark:border-gray-700"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>

        {/* Profile Section */}
        <div className={`flex flex-col items-center mt-14 mb-8 px-6 transition-all duration-300 ${isCollapsed ? 'md:px-2 md:mt-8' : ''}`}>
          <div className={`rounded-full overflow-hidden border-3 border-white/30 mb-3 bg-white/10 shadow-xl transition-all duration-300 ${isCollapsed ? 'w-12 h-12 border-2' : 'w-28 h-28'}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/profile.jpg" 
              alt="Ye Yint Lin" 
              className="w-full h-full object-cover object-top"
            />
          </div>
          
          <div className={`flex flex-col items-center transition-all duration-300 ${isCollapsed ? 'md:opacity-0 md:h-0 md:overflow-hidden md:mt-0' : 'opacity-100 mt-2'}`}>
            <h2 className="text-xl font-bold text-center text-white tracking-wide whitespace-nowrap">{profile.name}</h2>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-300 dark:text-cyan-300 bg-white/10 dark:bg-cyan-500/15 px-3 py-0.5 rounded-full text-center whitespace-nowrap mt-1.5 border border-white/15 dark:border-cyan-500/20 max-w-[200px] truncate">
              {profile.title}
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto px-3.5 py-2 space-y-1.5 relative">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeSection === link.id;

            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.id)}
                className={`relative group flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
                  isCollapsed ? 'md:justify-center md:px-0' : ''
                } ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-white/70 hover:text-white hover:bg-white/10 dark:hover:bg-white/5'
                }`}
              >
                {/* Animated active sliding pill with spring physics */}
                {isActive && (
                  <motion.div
                    layoutId="activeSidebarPill"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-500/25 via-orange-500/20 to-amber-500/10 dark:from-cyan-500/25 dark:via-sky-500/20 dark:to-cyan-500/10 border border-amber-400/35 dark:border-cyan-400/35 shadow-[0_0_20px_rgba(245,158,11,0.25)] dark:shadow-[0_0_20px_rgba(56,189,248,0.25)] backdrop-blur-sm pointer-events-none"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 32,
                    }}
                  />
                )}

                {/* Animated left luminous neon accent indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeSidebarIndicator"
                    className="absolute left-0 top-2.5 bottom-2.5 w-1 rounded-r-full bg-amber-400 dark:bg-cyan-400 shadow-[0_0_12px_#F59E0B] dark:shadow-[0_0_12px_#38BDF8] pointer-events-none"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 32,
                    }}
                  />
                )}

                <Icon 
                  size={20} 
                  className={`shrink-0 relative z-10 transition-all duration-300 ${
                    isActive 
                      ? 'text-amber-300 dark:text-cyan-300 scale-110 drop-shadow-[0_0_10px_rgba(245,158,11,0.9)] dark:drop-shadow-[0_0_10px_rgba(56,189,248,0.9)]' 
                      : 'text-white/80 group-hover:scale-110 group-hover:text-white'
                  }`} 
                />
                
                <span 
                  className={`relative z-10 font-medium tracking-wide transition-all duration-300 whitespace-nowrap ${
                    isCollapsed ? 'md:opacity-0 md:w-0 md:overflow-hidden' : 'opacity-100'
                  } ${isActive ? 'text-white font-semibold' : ''}`}
                >
                  {link.name}
                </span>
                
                {/* Premium Floating Tooltip for Collapsed Sidebar */}
                {isCollapsed && (
                  <div className="hidden md:block absolute left-16 scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200 origin-left bg-gray-900 text-white text-xs font-semibold px-3.5 py-2 rounded-lg shadow-xl border border-gray-700/50 whitespace-nowrap pointer-events-none z-50">
                    {link.name}
                  </div>
                )}
              </a>
            );
          })}
        </nav>

        {/* Social Quick Links at Bottom of Sidebar */}
        <div className={`p-4 border-t border-white/10 flex items-center justify-center gap-3 transition-all duration-300 ${isCollapsed ? 'flex-col gap-2' : ''}`}>
          {profile.github && (
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:scale-105 active:scale-95 transition-all"
              title="GitHub Profile"
              aria-label="GitHub Profile"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            </a>
          )}
          {profile.linkedin && (
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:scale-105 active:scale-95 transition-all"
              title="LinkedIn Profile"
              aria-label="LinkedIn Profile"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
          )}
        </div>
      </motion.aside>
    </>
  );
}

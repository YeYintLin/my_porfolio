"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
            <img 
              src="https://cdn.download.ams.birds.cornell.edu/api/v2/asset/612763581/900" 
              alt="Ye Yint Lin" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className={`flex flex-col items-center transition-all duration-300 ${isCollapsed ? 'md:opacity-0 md:h-0 md:overflow-hidden md:mt-0' : 'opacity-100 mt-2'}`}>
            <h2 className="text-xl font-bold text-center text-white tracking-wide whitespace-nowrap">Ye Yint Lin</h2>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-300 bg-white/10 dark:bg-emerald-500/15 px-3 py-0.5 rounded-full text-center whitespace-nowrap mt-1.5 border border-white/15 dark:border-emerald-500/20">
              Full-Stack & DevOps
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
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/25 via-teal-500/20 to-emerald-500/10 border border-emerald-400/35 shadow-[0_0_20px_rgba(16,185,129,0.22)] backdrop-blur-sm pointer-events-none"
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
                    className="absolute left-0 top-2.5 bottom-2.5 w-1 rounded-r-full bg-emerald-400 shadow-[0_0_12px_#34D399] pointer-events-none"
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
                      ? 'text-emerald-300 scale-110 drop-shadow-[0_0_10px_rgba(52,211,153,0.9)]' 
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
      </motion.aside>
    </>
  );
}

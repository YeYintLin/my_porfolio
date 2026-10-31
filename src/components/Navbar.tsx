"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { SITE_CONFIG } from "@/config/site";

interface NavItem {
  name: string;
  href: string;
  id: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: "Projects", href: "#projects", id: "projects" },
  { name: "Experience", href: "#experience", id: "experience" },
  { name: "About", href: "#about", id: "about" },
  { name: "Services", href: "#services", id: "services" },
  { name: "Contact", href: "#contact", id: "contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const sectionIds = ["hero", "projects", "tech-stack", "experience", "about", "services", "contact"];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Map tech-stack to about for the 5-item navigation indicator
              if (id === "tech-stack") {
                setActiveSection("about");
              } else {
                setActiveSection(id);
              }
            }
          });
        },
        { rootMargin: "-20% 0px -60% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace("#", "");
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[var(--bg)]/90 border-b border-[var(--border)] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link
          href="#hero"
          onClick={(e) => handleNavClick(e, "#hero")}
          className="flex items-center gap-2 group font-semibold text-base sm:text-lg text-[var(--text)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-md px-1"
        >
          <span className="w-2 h-2 rounded-full bg-[var(--accent)]" aria-hidden="true" />
          <span>{SITE_CONFIG.name}</span>
          <span className="hidden sm:inline-block text-xs font-normal text-[var(--muted)] border-l border-[var(--border)] pl-2 ml-1">
            {SITE_CONFIG.shortTitle}
          </span>
        </Link>

        {/* Desktop Navigation (5 items max) */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  isActive
                    ? "text-[var(--accent)] font-semibold"
                    : "text-[var(--muted)] hover:text-[var(--text)]"
                } focus-visible:ring-2 focus-visible:ring-[var(--accent)]`}
              >
                {item.name}
                {isActive && (
                  <span
                    className="absolute bottom-0 left-3 right-3 h-0.5 bg-[var(--accent)] rounded-full"
                    aria-hidden="true"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Controls: Theme toggle & Mobile menu button */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[var(--border)] bg-[var(--surface)] px-4 pt-3 pb-5 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[var(--accent)]/10 text-[var(--accent)] font-semibold"
                    : "text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--bg)]"
                }`}
              >
                {item.name}
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
}

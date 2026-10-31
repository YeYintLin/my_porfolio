"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    // Check initial theme state on client
    const darkActive = document.documentElement.classList.contains("dark");
    const timer = setTimeout(() => {
      setIsDark(darkActive);
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);

    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // Render a clean accessible placeholder before mounting to avoid layout shifts
  if (!mounted) {
    return (
      <div 
        className="w-9 h-9 rounded-full border border-[var(--border)] bg-[var(--surface)] opacity-50" 
        aria-hidden="true" 
      />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="w-9 h-9 rounded-full flex items-center justify-center border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--text)] hover:border-[var(--accent)] transition-colors"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-[var(--accent)]" aria-hidden="true" />
      ) : (
        <Moon className="w-4 h-4 text-[var(--accent)]" aria-hidden="true" />
      )}
    </button>
  );
}

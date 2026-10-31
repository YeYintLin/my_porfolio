"use client";

import { useEffect, useState } from "react";

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

    // Keep synchronized if theme is toggled by other triggers (e.g. Command Palette)
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
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

  // Render a clean placeholder before mounting to avoid layout shifts
  if (!mounted) {
    return (
      <div className="checkbox-wrapper-35 opacity-0 pointer-events-none flex items-center h-6" aria-hidden="true">
        <span className="text-xs font-sans">This is Dark</span>
      </div>
    );
  }

  return (
    <div className="checkbox-wrapper-35 flex items-center">
      <input
        value="theme"
        name="theme-switch"
        id="theme-switch"
        type="checkbox"
        className="switch"
        checked={isDark}
        onChange={toggleTheme}
        aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      />
      <label htmlFor="theme-switch">
        <span className="switch-x-text">This is </span>
        <span className="switch-x-toggletext">
          <span className="switch-x-unchecked">
            <span className="switch-x-hiddenlabel">Theme: </span>Light
          </span>
          <span className="switch-x-checked">
            <span className="switch-x-hiddenlabel">Theme: </span>Dark
          </span>
        </span>
      </label>
    </div>
  );
}

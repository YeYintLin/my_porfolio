"use client";

import { useProfile } from "@/context/ProfileContext";
import { SITE_CONFIG } from "@/config/site";

export default function Footer() {
  const { profile } = useProfile();

  return (
    <footer className="py-10 px-4 sm:px-6 text-sm font-sans text-[var(--muted)] border-t border-[var(--border)] mt-16 max-w-6xl mx-auto flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <span className="font-medium text-[var(--text)]">
            &copy; {new Date().getFullYear()} {profile.name || SITE_CONFIG.name}
          </span>
          <span className="mx-2 text-[var(--border)]" aria-hidden="true">•</span>
          <span>{SITE_CONFIG.title}</span>
        </div>

        {/* Live operational status pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface)] border border-[var(--border)] text-xs font-mono">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="text-[var(--text)]">Systems Nominal</span>
          <span className="text-[var(--muted)]">•</span>
          <span className="text-[var(--muted)]">Yangon (UTC+6:30)</span>
        </div>
      </div>

      <p className="type-body text-xs text-[var(--muted)] text-center border-t border-[var(--border)]/60 pt-4">
        Designed & built with clean architecture, mechatronics curiosity, and care. All rights reserved.
      </p>
    </footer>
  );
}

"use client";

import { useProfile } from "@/context/ProfileContext";
import { SITE_CONFIG } from "@/config/site";

export default function Footer() {
  const { profile } = useProfile();

  return (
    <footer className="py-8 px-4 sm:px-6 text-sm font-sans text-[var(--muted)] border-t border-[var(--border)] mt-16 max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
      <span>
        &copy; {new Date().getFullYear()} {profile.name || SITE_CONFIG.name}. {SITE_CONFIG.title}.
      </span>
      <span>
        Built with Next.js 16 & React 19. All rights reserved.
      </span>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { Lock } from "lucide-react";
import { useProfile } from "@/context/ProfileContext";

export default function Footer() {
  const { profile } = useProfile();

  return (
    <footer className="py-8 px-4 sm:px-6 text-xs sm:text-sm font-light border-t border-gray-200 dark:border-gray-800 mt-10 max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 opacity-60 text-center sm:text-left">
      <span>&copy; {new Date().getFullYear()} {profile.name}. Crafted with precision.</span>
      <Link href="/admin" className="text-xs hover:text-[var(--primary)] transition-colors flex items-center gap-1.5 opacity-60 hover:opacity-100">
        <Lock className="w-3.5 h-3.5" /> Admin Portal
      </Link>
    </footer>
  );
}

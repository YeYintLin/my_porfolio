"use client";

import { useEffect, useState, useRef } from "react";
import {
  Search,
  FolderGit2,
  Cpu,
  Briefcase,
  User,
  Layers,
  Mail,
  Copy,
  Check,
  Download,
  Moon,
  Terminal,
  X,
  CornerDownLeft,
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

interface CommandItem {
  id: string;
  title: string;
  category: "Navigation" | "Actions" | "System";
  icon: React.ReactNode;
  shortcut?: string;
  action: () => void;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains("dark");
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  const navigateTo = (id: string) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE_CONFIG.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const runDiagnostics = () => {
    setTerminalOutput("Running diagnostics...\n> Ping MCU bus: OK (12ms)\n> Docker daemon: 3 containers active\n> API gateway: healthy\n> Mechatronics system status: 100% NOMINAL\n> Ready for hire.");
    setTimeout(() => {
      setTerminalOutput(null);
      setIsOpen(false);
    }, 4500);
  };

  const commands: CommandItem[] = [
    {
      id: "nav-projects",
      title: "Featured Projects",
      category: "Navigation",
      icon: <FolderGit2 className="w-4 h-4 text-[var(--accent)]" />,
      action: () => navigateTo("projects"),
    },
    {
      id: "nav-tech",
      title: "Tech Stack & Architecture",
      category: "Navigation",
      icon: <Cpu className="w-4 h-4 text-[var(--accent)]" />,
      action: () => navigateTo("tech-stack"),
    },
    {
      id: "nav-exp",
      title: "Experience & Education",
      category: "Navigation",
      icon: <Briefcase className="w-4 h-4 text-[var(--accent)]" />,
      action: () => navigateTo("experience"),
    },
    {
      id: "nav-about",
      title: "About Ye Yint Lin",
      category: "Navigation",
      icon: <User className="w-4 h-4 text-[var(--accent)]" />,
      action: () => navigateTo("about"),
    },
    {
      id: "nav-services",
      title: "Services & Pricing Plans",
      category: "Navigation",
      icon: <Layers className="w-4 h-4 text-[var(--accent)]" />,
      action: () => navigateTo("services"),
    },
    {
      id: "nav-contact",
      title: "Contact & Inquiries",
      category: "Navigation",
      icon: <Mail className="w-4 h-4 text-[var(--accent)]" />,
      action: () => navigateTo("contact"),
    },
    {
      id: "act-copy-email",
      title: copied ? "Email Copied!" : `Copy Email (${SITE_CONFIG.email})`,
      category: "Actions",
      icon: copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-[var(--accent)]" />,
      action: handleCopyEmail,
    },
    {
      id: "act-resume",
      title: "Download Resume (PDF)",
      category: "Actions",
      icon: <Download className="w-4 h-4 text-[var(--accent)]" />,
      action: () => {
        window.open("/Ye_Yint_Lin_Resume.pdf", "_blank");
        setIsOpen(false);
      },
    },
    {
      id: "act-theme",
      title: "Toggle Theme (Dark / Light)",
      category: "Actions",
      icon: <Moon className="w-4 h-4 text-[var(--accent)]" />,
      action: () => {
        toggleTheme();
        setIsOpen(false);
      },
    },
    {
      id: "sys-diagnostics",
      title: "Run Engineering Diagnostics (Easter Egg)",
      category: "System",
      icon: <Terminal className="w-4 h-4 text-emerald-400" />,
      shortcut: "diag",
      action: runDiagnostics,
    },
  ];

  const filtered = commands.filter((c) =>
    c.title.toLowerCase().includes(query.toLowerCase()) ||
    c.category.toLowerCase().includes(query.toLowerCase()) ||
    (c.shortcut && c.shortcut.includes(query.toLowerCase()))
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open on Cmd+K, Ctrl+K or '/'
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        return;
      }

      if (e.key === "/" && !isOpen) {
        const active = document.activeElement;
        const isInput = active instanceof HTMLInputElement || active instanceof HTMLTextAreaElement;
        if (!isInput) {
          e.preventDefault();
          setIsOpen(true);
        }
        return;
      }

      if (!isOpen) return;

      if (e.key === "Escape") {
        e.preventDefault();
        setIsOpen(false);
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
        return;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
        return;
      }

      if (e.key === "Enter" && filtered[selectedIndex]) {
        e.preventDefault();
        filtered[selectedIndex].action();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filtered, selectedIndex]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const handleOpen = () => {
    setQuery("");
    setSelectedIndex(0);
    setTerminalOutput(null);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setTerminalOutput(null);
  };

  return (
    <>
      {/* Keyboard Trigger Pill for Navbar */}
      <button
        type="button"
        onClick={handleOpen}
        className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-[var(--border)] bg-[var(--surface)] text-xs font-mono text-[var(--muted)] hover:text-[var(--text)] hover:border-[var(--accent)] transition-colors cursor-pointer"
        title="Open Command Palette (Ctrl+K or /)"
        aria-label="Open Command Palette"
      >
        <Search className="w-3.5 h-3.5" aria-hidden="true" />
        <span>Quick Jump</span>
        <kbd className="px-1.5 py-0.5 rounded bg-[var(--bg)] border border-[var(--border)] text-[10px]">
          ⌘K
        </kbd>
      </button>

      {/* Palette Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Command Palette"
          onClick={handleClose}
        >
          <div
            className="portfolio-card w-full max-w-xl overflow-hidden bg-[var(--surface)] shadow-2xl border border-[var(--border)] animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Input Header */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[var(--border)]">
              <Search className="w-5 h-5 text-[var(--muted)] shrink-0" aria-hidden="true" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Type a command or search sections... (ESC to close)"
                className="w-full bg-transparent text-sm sm:text-base font-sans text-[var(--text)] placeholder:text-[var(--muted)] outline-none"
              />
              <button
                type="button"
                onClick={handleClose}
                className="p-1 rounded text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--bg)]"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Terminal Diagnostic Output (Easter Egg) */}
            {terminalOutput && (
              <div className="p-4 bg-[var(--bg)] border-b border-[var(--border)] font-mono text-xs text-emerald-400 whitespace-pre-line leading-relaxed">
                {terminalOutput}
              </div>
            )}

            {/* Results List */}
            <div className="max-h-[320px] overflow-y-auto p-2 space-y-1">
              {filtered.length === 0 ? (
                <div className="py-8 text-center text-sm text-[var(--muted)]">
                  No matching commands found.
                </div>
              ) : (
                filtered.map((item, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={item.action}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left text-sm transition-colors cursor-pointer ${
                        isSelected
                          ? "bg-[var(--accent)] text-[var(--bg)] font-semibold shadow-sm"
                          : "text-[var(--text)] hover:bg-[var(--bg)]"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className={isSelected ? "text-[var(--bg)]" : ""}>
                          {item.icon}
                        </span>
                        <span className="truncate">{item.title}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span
                          className={`text-[11px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded ${
                            isSelected
                              ? "bg-[var(--bg)]/20 text-[var(--bg)]"
                              : "bg-[var(--bg)] text-[var(--muted)] border border-[var(--border)]"
                          }`}
                        >
                          {item.category}
                        </span>
                        {isSelected && (
                          <CornerDownLeft className="w-3.5 h-3.5" aria-hidden="true" />
                        )}
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer Help */}
            <div className="flex items-center justify-between px-4 py-2 border-t border-[var(--border)] bg-[var(--bg)] text-[11px] font-mono text-[var(--muted)]">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>ESC Close</span>
              </div>
              <span>Engineer&apos;s Palette</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

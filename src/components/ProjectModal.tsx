"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X, GitBranch, ArrowUpRight, Cpu } from "lucide-react";
import { FeaturedProject } from "@/data/projects";

interface ProjectModalProps {
  project: FeaturedProject | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      onClick={onClose}
    >
      <div
        className="portfolio-card w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[var(--surface)] p-6 sm:p-8 my-auto relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Title and Close Button */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-[var(--border)] mb-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)] mb-1 block">
              {project.teamContext} • {project.role}
            </span>
            <h2 id="modal-project-title" className="text-xl sm:text-2xl font-bold text-[var(--text)]">
              {project.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg border border-[var(--border)] text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--bg)] transition-colors focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            aria-label="Close project details"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Thumbnail Preview */}
        <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-[var(--border)] mb-6 bg-[var(--bg)]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Overview & Technical Explanation */}
        <div className="space-y-4 mb-6 text-sm text-[var(--muted)] leading-relaxed">
          <h3 className="text-base font-semibold text-[var(--text)]">Technical Architecture & Explanation</h3>
          <p>{project.description}</p>
        </div>

        {/* Inline SVG Architecture Diagram */}
        <div className="mb-6 p-4 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
          <div className="flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
            <Cpu className="w-4 h-4" aria-hidden="true" />
            <span>Architecture Diagram</span>
          </div>
          <div
            className="w-full overflow-x-auto py-2"
            dangerouslySetInnerHTML={{ __html: project.architectureSvg }}
          />
        </div>

        {/* Key Architectural Decisions */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-[var(--text)] mb-2.5">Key Implementation Details</h4>
          <ul className="space-y-2 text-xs sm:text-sm text-[var(--muted)] list-disc pl-5">
            {project.architectureDetails.map((detail, idx) => (
              <li key={idx}>{detail}</li>
            ))}
          </ul>
        </div>

        {/* Technology Stack */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-[var(--text)] mb-2.5">Technologies Used</h4>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium px-2.5 py-1 rounded-md bg-[var(--bg)] text-[var(--text)] border border-[var(--border)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary text-xs px-4 py-2"
          >
            Close Details
          </button>

          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary text-xs px-4 py-2 inline-flex items-center gap-1.5"
              >
                <GitBranch className="w-3.5 h-3.5" aria-hidden="true" /> GitHub Repository
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-cta text-xs px-4 py-2 inline-flex items-center gap-1.5"
              >
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" /> Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

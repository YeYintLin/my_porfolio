"use client";

import Image from "next/image";
import { GitBranch, Info, ArrowUpRight } from "lucide-react";
import { FeaturedProject } from "@/data/projects";

interface ProjectCardProps {
  project: FeaturedProject;
  onOpenDetails: (project: FeaturedProject) => void;
}

export default function ProjectCard({ project, onOpenDetails }: ProjectCardProps) {
  return (
    <article className="portfolio-card flex flex-col overflow-hidden h-full">
      {/* Thumbnail */}
      <div className="relative aspect-video w-full bg-[var(--bg)] border-b border-[var(--border)] overflow-hidden">
        <Image
          src={project.image}
          alt={`${project.title} screenshot`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span className="type-meta font-sans font-medium px-2.5 py-1 rounded-md bg-[var(--surface)]/95 text-[var(--accent)] border border-[var(--border)] shadow-sm">
            {project.teamContext}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="type-h3 text-[var(--text)] mb-2">
            {project.title}
          </h3>

          {/* Problem -> Solution format */}
          <div className="type-meta text-sm text-[var(--muted)] leading-relaxed mb-4 space-y-1">
            <p>
              <strong className="text-[var(--text)] font-medium">Problem:</strong> {project.oneLiner.problem}
            </p>
            <p>
              <strong className="text-[var(--accent)] font-medium">Solution:</strong> {project.oneLiner.solution}
            </p>
          </div>

          {/* My Role */}
          <div className="mb-4 text-sm font-sans text-[var(--muted)] border-t border-[var(--border)] pt-3">
            <span className="font-semibold text-[var(--text)]">My Role:</span> {project.role}
          </div>

          {/* Stack Chips: Geist Mono */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="type-mono-meta font-mono text-sm px-2.5 py-1 rounded-md bg-[var(--bg)] text-[var(--muted)] border border-[var(--border)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action Links */}
        <div className="flex items-center justify-between pt-4 border-t border-[var(--border)] mt-auto">
          <button
            type="button"
            onClick={() => onOpenDetails(project)}
            className="inline-flex items-center gap-1.5 text-sm font-sans font-medium text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded"
          >
            <Info className="w-4 h-4" aria-hidden="true" />
            Architecture & Details
          </button>

          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-md text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--bg)] border border-[var(--border)] transition-colors"
                title="View Source on GitHub"
                aria-label={`View ${project.title} on GitHub`}
              >
                <GitBranch className="w-4 h-4" aria-hidden="true" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-md text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--bg)] border border-[var(--border)] transition-colors"
                title="View Live Demo"
                aria-label={`View live demo of ${project.title}`}
              >
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

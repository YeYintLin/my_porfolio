"use client";

import { useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import ProjectModal from "@/components/ProjectModal";
import { FEATURED_PROJECTS, FeaturedProject } from "@/data/projects";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<FeaturedProject | null>(null);

  return (
    <section id="projects" className="py-20 sm:py-24 px-4 sm:px-6 border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)] mb-2 block">
            Featured Engineering Work
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3 text-[var(--text)]">
            Featured Projects
          </h2>
          <p className="text-sm sm:text-base text-[var(--muted)] max-w-2xl mx-auto">
            Practical full-stack web applications, microservices architecture, and containerized deployments.
          </p>
        </div>

        {/* Compact Grid: exactly 3 featured projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {FEATURED_PROJECTS.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenDetails={setSelectedProject}
            />
          ))}
        </div>

        {/* Modal for Technical Architecture & Long-form Details */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
}

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
          <span className="type-eyebrow text-[var(--accent)] mb-2 block">
            Featured Engineering Work
          </span>
          <h2 className="type-h2 text-[var(--text)] mb-3">
            Featured Projects
          </h2>
          <p className="type-body text-[var(--muted)] max-w-[65ch] mx-auto text-pretty">
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

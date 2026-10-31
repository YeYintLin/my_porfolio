"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, GitBranch } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
}

export default function Projects() {
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProjectList(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load projects", err);
        setLoading(false);
      });
  }, []);

  return (
    <section id="projects" className="py-20 sm:py-28 md:py-32 px-4 sm:px-6 relative bg-black/5 dark:bg-white/5">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-12 sm:mb-16 text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 sm:mb-6">
            Featured Projects
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-[#526E3A] to-[#739655] dark:from-[#10B981] dark:to-[#38BDF8] rounded-full mx-auto" />
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="glass-card overflow-hidden animate-pulse flex flex-col h-[450px]">
                <div className="h-48 sm:h-56 bg-gray-200/50 dark:bg-gray-800/50" />
                <div className="p-5 sm:p-8 flex-1 flex flex-col gap-4">
                  <div className="h-7 w-2/3 bg-gray-200/50 dark:bg-gray-800/50 rounded-lg" />
                  <div className="h-4 w-full bg-gray-200/50 dark:bg-gray-800/50 rounded-md" />
                  <div className="h-4 w-5/6 bg-gray-200/50 dark:bg-gray-800/50 rounded-md" />
                  <div className="mt-auto flex gap-2 pt-4 border-t border-gray-100 dark:border-gray-950">
                    <div className="h-4 w-12 bg-gray-200/50 dark:bg-gray-800/50 rounded" />
                    <div className="h-4 w-16 bg-gray-200/50 dark:bg-gray-800/50 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {projectList.map((project, idx) => (
              <motion.div
                key={project.id || idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
                className="glass-card overflow-hidden group flex flex-col hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(143,188,143,0.3)] dark:hover:shadow-[0_20px_40px_-15px_rgba(56,189,248,0.3)] transition-all duration-300"
              >
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-[var(--primary)]/20 group-hover:opacity-0 transition-opacity duration-300 z-10" />
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                </div>
                
                <div className="p-5 sm:p-8 flex-1 flex flex-col">
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 group-hover:text-[var(--primary)] transition-colors">
                    {project.title}
                  </h3>
                  <p className="opacity-70 text-xs sm:text-sm leading-relaxed mb-5 sm:mb-6 font-light flex-1">
                    {project.description}
                  </p>
                  
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-5 sm:mb-6">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-xs font-medium px-2.5 sm:px-3 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                    <a href={project.githubUrl} className="flex items-center gap-2 text-sm font-medium opacity-70 hover:opacity-100 hover:text-[var(--primary)] transition-colors">
                      <GitBranch className="w-4 h-4" /> Code
                    </a>
                    <a href={project.liveUrl} className="flex items-center gap-2 text-sm font-medium opacity-70 hover:opacity-100 hover:text-[var(--primary)] transition-colors">
                      <ExternalLink className="w-4 h-4" /> Live Demo
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

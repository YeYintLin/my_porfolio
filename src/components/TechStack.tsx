"use client";

import { useEffect, useState } from "react";
import { TECH_STACK_DATA, TechCategory } from "@/data/techstack";

export default function TechStack() {
  const [categories, setCategories] = useState<TechCategory[]>(TECH_STACK_DATA);

  useEffect(() => {
    // Optionally revalidate from API on client if admin updated it
    fetch(`/api/techstack?t=${Date.now()}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setCategories(data);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="tech-stack" className="py-20 sm:py-24 px-4 sm:px-6 border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)] mb-2 block">
            Technical Proficiency
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3 text-[var(--text)]">
            Technologies & Tools
          </h2>
          <p className="text-sm sm:text-base text-[var(--muted)] max-w-2xl mx-auto">
            Languages, frameworks, databases, and DevOps tooling applied in real production and academic projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.id || category.title}
              className="portfolio-card p-6 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-base font-semibold mb-4 text-[var(--text)] pb-2 border-b border-[var(--border)]">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs font-medium px-2.5 py-1 rounded-md bg-[var(--bg)] text-[var(--muted)] border border-[var(--border)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

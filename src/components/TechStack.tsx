"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TechCategory {
  id: string;
  title: string;
  skills: string[];
}

export default function TechStack() {
  const [categories, setCategories] = useState<TechCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/techstack?t=${Date.now()}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCategories(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load tech stack", err);
        setLoading(false);
      });
  }, []);

  return (
    <section id="techstack" className="py-20 sm:py-28 md:py-32 px-4 sm:px-6 relative bg-white/30 dark:bg-black/20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-12 sm:mb-16 text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 sm:mb-6">
            Technologies Stack
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-[#606C38] to-[#8FBC8F] dark:from-[#38BDF8] dark:to-[#6366F1] rounded-full mx-auto mb-6" />
          <p className="text-base sm:text-lg opacity-70 max-w-2xl mx-auto font-light">
            Including programming languages, frameworks, databases, front-end and back-end tools, and APIs.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="glass-card p-5 sm:p-8 animate-pulse flex flex-col h-[280px]">
                <div className="h-6 w-1/2 bg-gray-200/50 dark:bg-gray-800/50 rounded-lg mb-6" />
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="h-7 w-16 bg-gray-200/50 dark:bg-gray-800/50 rounded-full" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
            {categories.map((category, idx) => (
              <motion.div
                key={category.id || category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
                className="glass-card p-5 sm:p-8 group hover:-translate-y-2 transition-transform duration-300"
              >
                <h3 className="text-xl font-bold mb-5 sm:mb-6 group-hover:text-[var(--primary)] transition-colors">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2 sm:gap-2.5">
                  {category.skills.map((skill) => (
                    <span 
                      key={skill} 
                      className="text-xs sm:text-sm font-medium px-3 sm:px-4 py-1.5 sm:py-2 bg-white/40 dark:bg-black/25 text-[var(--foreground)] border border-gray-200 dark:border-gray-800 rounded-full hover:bg-gradient-to-r hover:from-[#606C38] hover:to-[#8FBC8F] dark:hover:from-[#38BDF8] dark:hover:to-[#6366F1] hover:text-white hover:border-transparent hover:shadow-[0_0_12px_rgba(116,161,46,0.3)] dark:hover:shadow-[0_0_12px_rgba(56,189,248,0.3)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

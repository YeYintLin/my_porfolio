"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, Sparkles, Code2, Cloud, ShieldCheck } from "lucide-react";
import { SERVICES_DATA, ServicePlan } from "@/config/site";

const iconMap: Record<string, React.ReactNode> = {
  "full-stack": <Code2 className="w-5 h-5 text-[var(--accent)]" />,
  "deployment": <Cloud className="w-5 h-5 text-[var(--accent)]" />,
  "maintenance": <ShieldCheck className="w-5 h-5 text-[var(--accent)]" />,
};

export default function Services() {
  // Default currency toggle to USD, MMK as alternative per specification
  const [currency, setCurrency] = useState<"usd" | "mmk">("usd");

  return (
    <section id="services" className="py-20 sm:py-24 px-4 sm:px-6 border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 text-center"
        >
          <span className="type-eyebrow text-[var(--accent)] mb-2 block">
            Engineering & Deployment Packages
          </span>
          <h2 className="type-h2 text-[var(--text)] mb-3">
            Services & Delivery Plans
          </h2>
          <p className="type-body text-[var(--muted)] max-w-[65ch] mx-auto mb-6 text-pretty">
            Transparent software engineering and deployment packages for growing businesses and remote teams.
          </p>

          {/* Currency Switcher: Default to USD */}
          <div className="inline-flex items-center p-1 rounded-full border border-[var(--border)] bg-[var(--surface)]" role="group" aria-label="Currency selection">
            <button
              type="button"
              onClick={() => setCurrency("usd")}
              className={`px-4 py-1.5 rounded-full text-sm font-sans font-medium transition-colors ${
                currency === "usd"
                  ? "bg-[var(--accent)] text-[var(--bg)] font-semibold shadow-sm"
                  : "text-[var(--muted)] hover:text-[var(--text)]"
              }`}
            >
              USD ($)
            </button>
            <button
              type="button"
              onClick={() => setCurrency("mmk")}
              className={`px-4 py-1.5 rounded-full text-sm font-sans font-medium transition-colors ${
                currency === "mmk"
                  ? "bg-[var(--accent)] text-[var(--bg)] font-semibold shadow-sm"
                  : "text-[var(--muted)] hover:text-[var(--text)]"
              }`}
            >
              MMK (Kyat)
            </button>
          </div>
        </motion.div>

        {/* Services Grid with "Most popular" highlight */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch"
        >
          {SERVICES_DATA.map((plan: ServicePlan) => {
            const isPopular = plan.isPopular;

            return (
              <div
                key={plan.id}
                className={`portfolio-card p-6 sm:p-7 flex flex-col justify-between relative transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${
                  isPopular
                    ? "border-[var(--accent)] ring-1 ring-[var(--accent)]/30 shadow-md"
                    : "hover:border-[var(--accent)]/70"
                }`}
              >
                {/* "Most popular" badge */}
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-xs font-sans font-bold uppercase tracking-wider bg-[var(--accent)] text-[var(--bg)] shadow-sm flex items-center gap-1">
                    <Sparkles className="w-3 h-3" aria-hidden="true" />
                    <span>Most popular</span>
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-lg bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center shrink-0">
                      {iconMap[plan.id] || <Code2 className="w-5 h-5 text-[var(--accent)]" />}
                    </div>
                    <div>
                      <span className="type-eyebrow text-[var(--accent)] block">
                        {plan.badge}
                      </span>
                      <h3 className="type-h3 text-lg font-bold text-[var(--text)]">{plan.title}</h3>
                    </div>
                  </div>

                  <p className="type-body text-sm text-[var(--muted)] leading-relaxed mb-6">
                    {plan.description}
                  </p>

                  {/* Price: Tabular Nums & Geist Mono */}
                  <div className="pb-4 mb-4 border-b border-[var(--border)]">
                    <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-[var(--text)]">
                      {currency === "usd" ? plan.priceUsd : plan.priceMmk}
                    </div>
                    <span className="text-sm font-sans text-[var(--muted)]">{plan.timeline}</span>
                  </div>

                  {/* Feature Checklist */}
                  <ul className="space-y-2.5 mb-6 text-sm text-[var(--muted)]">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="#contact"
                  className={`w-full text-center text-sm font-sans font-semibold py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                    isPopular
                      ? "bg-[var(--accent)] text-[var(--bg)] hover:bg-[var(--accent-hover)]"
                      : "btn-secondary text-sm"
                  }`}
                >
                  Inquire About This Plan <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

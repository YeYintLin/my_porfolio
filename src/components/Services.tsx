"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Code2, 
  Cloud, 
  ShieldCheck, 
  Check, 
  ArrowRight, 
  Sparkles,
  Zap,
  Clock
} from "lucide-react";

export default function Services() {
  const [pricingMode, setPricingMode] = useState<"mmk" | "usd">("mmk");

  const services = [
    {
      icon: <Code2 className="w-7 h-7 text-[var(--primary)]" />,
      badge: "Core Engineering",
      title: "Full-Stack Web Development",
      description: "End-to-end web apps, business dashboards, and custom APIs built with high-performance React/Next.js and Node.js.",
      features: [
        "Modern SPA & SSR applications (Next.js 16, React 19)",
        "Robust RESTful APIs & Microservices architecture",
        "Secure database modeling (MongoDB, PostgreSQL)",
        "Role-based authentication & admin management panels",
      ],
      priceMmk: "From 350,000 MMK",
      priceUsd: "From $150 USD",
      timeline: "1–3 weeks delivery",
    },
    {
      icon: <Cloud className="w-7 h-7 text-[var(--primary)]" />,
      badge: "Cloud & DevOps",
      title: "Deployment & Infrastructure",
      description: "Automated, containerized deployment pipelines to make your applications resilient, scalable, and bulletproof.",
      features: [
        "Linux VPS setup, firewall, & security hardening",
        "Multi-service containerization with Docker Compose",
        "Nginx reverse proxy, custom domains & automated SSL",
        "Automated CI/CD workflows with GitHub Actions",
      ],
      priceMmk: "From 150,000 MMK",
      priceUsd: "From $80 USD",
      timeline: "2–5 days delivery",
    },
    {
      icon: <ShieldCheck className="w-7 h-7 text-[var(--primary)]" />,
      badge: "Retainer & Support",
      title: "Maintenance & Reliability",
      description: "Continuous care and peace of mind for your production apps so you never lose customer data or suffer prolonged downtime.",
      features: [
        "24/7 uptime monitoring & rapid downtime alerts",
        "Automated daily cloud backups for databases",
        "Security patching, dependency updates & SSL renewal",
        "Monthly developer support hours for fixes & tweaks",
      ],
      priceMmk: "From 120,000 MMK / mo",
      priceUsd: "From $60 USD / mo",
      timeline: "Monthly subscription",
    },
  ];

  return (
    <section id="services" className="py-32 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-xs font-semibold tracking-wider uppercase text-[var(--primary)] mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Client Services & Solutions
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            How I Can Help Your Business
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-[#606C38] to-[#8FBC8F] dark:from-[#38BDF8] dark:to-[#6366F1] rounded-full mx-auto mb-6" />
          <p className="max-w-2xl mx-auto text-base md:text-lg opacity-75 font-light leading-relaxed mb-8">
            Transparent, reliable software engineering and deployment packages tailored for local businesses, growing startups, and international teams.
          </p>

          {/* Currency Switcher */}
          <div className="inline-flex items-center p-1.5 rounded-full glass-card border border-gray-200 dark:border-gray-800">
            <button
              onClick={() => setPricingMode("mmk")}
              className={`px-5 py-2 rounded-full text-xs md:text-sm font-medium transition-all ${
                pricingMode === "mmk"
                  ? "bg-[var(--primary)] text-white shadow-md"
                  : "opacity-70 hover:opacity-100"
              }`}
            >
              🇲🇲 Myanmar (MMK)
            </button>
            <button
              onClick={() => setPricingMode("usd")}
              className={`px-5 py-2 rounded-full text-xs md:text-sm font-medium transition-all ${
                pricingMode === "usd"
                  ? "bg-[var(--primary)] text-white shadow-md"
                  : "opacity-70 hover:opacity-100"
              }`}
            >
              🌐 International (USD)
            </button>
          </div>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
              className="glass-card p-8 rounded-3xl flex flex-col justify-between hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(143,188,143,0.25)] dark:hover:shadow-[0_20px_40px_-15px_rgba(56,189,248,0.25)] transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3.5 rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)]">
                    {service.icon}
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 opacity-80">
                    {service.badge}
                  </span>
                </div>

                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-sm opacity-70 leading-relaxed font-light mb-6">
                  {service.description}
                </p>

                <div className="space-y-3 mb-8 pt-4 border-t border-gray-100 dark:border-gray-800">
                  {service.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-2.5 text-xs md:text-sm opacity-85">
                      <Check className="w-4 h-4 text-[var(--primary)] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs uppercase tracking-wider opacity-60 font-medium">Estimated Pricing</span>
                  <span className="text-lg font-bold text-[var(--primary)]">
                    {pricingMode === "mmk" ? service.priceMmk : service.priceUsd}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs opacity-60">
                  <Clock className="w-3.5 h-3.5" /> {service.timeline}
                </div>
                <a
                  href="#contact"
                  className="btn-primary flex items-center justify-center gap-2 py-3 text-sm font-medium w-full mt-2"
                >
                  Request a Quote <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* DevOps & Reliability Promise Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 rounded-3xl border border-[var(--primary)]/20 bg-gradient-to-r from-[var(--primary)]/5 via-transparent to-[var(--primary)]/5 text-center flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="text-left max-w-xl">
            <h4 className="text-xl font-bold mb-2 flex items-center gap-2">
              <Zap className="w-5 h-5 text-[var(--primary)]" /> Need a tailored or emergency technical fix?
            </h4>
            <p className="text-sm opacity-75 font-light leading-relaxed">
              Whether you need server migration, VPS performance tuning, SSL repair, or bug fixes on an existing MERN codebase, I offer flexible hourly and fixed-milestone pricing.
            </p>
          </div>
          <a
            href="#contact"
            className="px-6 py-3.5 rounded-full border border-gray-300 dark:border-gray-700 font-medium hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all shrink-0 text-sm bg-white/5 dark:bg-black/5"
          >
            Schedule a Consultation
          </a>
        </motion.div>
      </div>
    </section>
  );
}

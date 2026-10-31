/**
 * Site-wide configuration and verifiable facts.
 * Unverified facts and user-customizable endpoints use TODO placeholders.
 */

export const SITE_CONFIG = {
  name: "Ye Yint Lin",
  title: "Full-Stack Developer with DevOps skills",
  shortTitle: "Full-Stack Developer",
  email: "yeyint2702@gmail.com", // Configured in one place for future custom-domain migration
  github: "https://github.com/YeYintLin",
  linkedin: "https://www.linkedin.com/in/ye-yint-lin-altair-822a10298/",
  location: "Yangon, Myanmar",
  timezone: "UTC+6:30 (Yangon)",
  availability: "Available from December 2026",
  availabilityBadge: "Open to remote roles and freelance projects from December 2026",
  
  // Placeholders requiring user confirmation
  graduationDate: "TODO_GRADUATION_DATE",
  canonicalUrl: "TODO_CANONICAL_URL", // e.g., https://yeyintlin.dev
  
  education: {
    degree: "B.E. Mechatronics Engineering",
    institution: "University of Technology (Hmawbi)",
    period: "2018 - Expected TODO_GRADUATION_DATE",
    description: "Focusing on embedded systems, robotics control, and software engineering.",
  },

  languages: "English (working proficiency) and Burmese (native)",
  connectivity: "Reliable connectivity (generator backup, dual ISP)", // TODO: confirm infrastructure setup
};

export interface ServicePlan {
  id: string;
  badge: string;
  title: string;
  description: string;
  features: string[];
  priceMmk: string;
  priceUsd: string;
  timeline: string;
  isPopular?: boolean;
}

export const SERVICES_DATA: ServicePlan[] = [
  {
    id: "full-stack",
    badge: "Core Engineering",
    title: "Full-Stack Web App Development",
    description: "End-to-end web applications, client portals, and custom APIs built with React, Next.js, and Node.js.",
    features: [
      "Modern SPA & SSR applications (Next.js 16, React 19)",
      "Robust RESTful APIs & decoupled backend architecture",
      "Structured database schemas (PostgreSQL, MongoDB)",
      "Role-based authentication & administrative panels",
    ],
    priceMmk: "From 350,000 MMK",
    priceUsd: "From $150 USD",
    timeline: "1–3 weeks delivery",
    isPopular: true, // Highlighted as "Most popular"
  },
  {
    id: "deployment",
    badge: "Cloud & DevOps",
    title: "Production Deployment & Infrastructure",
    description: "Containerized deployment pipelines on Linux VPS using Docker Compose and Nginx.",
    features: [
      "Linux VPS setup, firewall, & security hardening",
      "Multi-service containerization with Docker Compose",
      "Nginx reverse proxy, custom domains & automated SSL", // TODO: confirm SSL renewal method
      "Automated CI/CD workflows with GitHub Actions",
    ],
    priceMmk: "From 150,000 MMK",
    priceUsd: "From $80 USD",
    timeline: "2–5 days delivery",
    isPopular: false,
  },
  {
    id: "maintenance",
    badge: "Retainer & Support",
    title: "Maintenance & Reliability",
    description: "Continuous care and operational monitoring for production applications.",
    features: [
      "Uptime monitoring with email or Telegram alerts",
      "Automated daily database backups", // TODO: confirm backup storage destination
      "Automatic restart policies and health checks",
      "Monthly developer support hours for fixes & tweaks",
    ],
    priceMmk: "From 120,000 MMK / mo",
    priceUsd: "From $60 USD / mo",
    timeline: "Monthly subscription",
    isPopular: false,
  },
];

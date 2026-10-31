/**
 * 3 Featured Projects showcasing individual engineering & DevOps work.
 * Client identities are kept private and described generically.
 */

export interface FeaturedProject {
  id: string;
  slug: string;
  title: string;
  oneLiner: {
    problem: string;
    solution: string;
  };
  role: string;
  teamContext: "Solo Engineering" | "Team Project (Specific Individual Contributions)";
  image: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  description: string;
  architectureDetails: string[];
  architectureSvg: string; // Clean inline SVG string
  verifiedInRepo: boolean;
}

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: "cms",
    slug: "smart-campus-management-system",
    title: "Smart Campus Management System (CMS)",
    oneLiner: {
      problem: "Monolithic campus administration suffered database lock contention and slow grade processing.",
      solution: "Architected decoupled microservices with isolated databases and an API Gateway.",
    },
    role: "Solo Architect & Full-Stack Developer",
    teamContext: "Solo Engineering",
    image: "/projects/smart_campus_cover.jpg",
    tags: ["Microservices", "Docker Compose", "API Gateway", "Node.js", "Express", "MongoDB", "React", "Gemini AI"],
    githubUrl: "https://github.com/YeYintLin/campus_management_system",
    liveUrl: undefined, // Rendered only if provided
    description:
      "A decoupled microservices-based academic and campus administration system. Replaced monolithic bottlenecks with an API Gateway handling routing and token validation, paired with three database-isolated MongoDB services across a 28-entity schema (Students, Faculty, Courses, Attendance, Examination, Finance). Features Google Gemini AI integration for student inquiries and production container orchestration via Docker Compose.",
    architectureDetails: [
      "API Gateway handles JWT validation, rate limiting, and reverse proxy routing",
      "3 isolated MongoDB database instances preventing cross-domain schema contention",
      "Google Gemini AI API integration for natural-language student inquiry assistance",
      "Docker Compose network configuration connecting frontend, gateway, and backend microservices",
    ],
    architectureSvg: `<svg viewBox="0 0 700 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <rect x="10" y="80" width="120" height="70" rx="8" fill="#121A2B" stroke="#38BDF8" stroke-width="1.5"/>
      <text x="70" y="112" fill="#E6EAF2" font-size="12" font-family="var(--font-mono), monospace" text-anchor="middle" font-weight="bold">React Client</text>
      <text x="70" y="130" fill="#94A3B8" font-size="10" font-family="var(--font-mono), monospace" text-anchor="middle">SPA Portal</text>

      <path d="M130 115 H180" stroke="#38BDF8" stroke-width="1.5" stroke-dasharray="4 4"/>
      <polygon points="180,111 188,115 180,119" fill="#38BDF8"/>

      <rect x="190" y="60" width="130" height="110" rx="8" fill="#121A2B" stroke="#F59E0B" stroke-width="1.5"/>
      <text x="255" y="95" fill="#E6EAF2" font-size="12" font-family="var(--font-mono), monospace" text-anchor="middle" font-weight="bold">API Gateway</text>
      <text x="255" y="115" fill="#94A3B8" font-size="10" font-family="var(--font-mono), monospace" text-anchor="middle">JWT & Rate Limit</text>
      <text x="255" y="133" fill="#94A3B8" font-size="10" font-family="var(--font-mono), monospace" text-anchor="middle">Proxy Routing</text>

      <path d="M320 85 H370" stroke="#38BDF8" stroke-width="1.5"/>
      <path d="M320 115 H370" stroke="#38BDF8" stroke-width="1.5"/>
      <path d="M320 145 H370" stroke="#38BDF8" stroke-width="1.5"/>

      <rect x="370" y="30" width="130" height="50" rx="6" fill="#121A2B" stroke="#1F2A44" stroke-width="1.5"/>
      <text x="435" y="55" fill="#E6EAF2" font-size="11" font-family="var(--font-mono), monospace" text-anchor="middle">Auth & User Service</text>
      <text x="435" y="69" fill="#94A3B8" font-size="9" font-family="var(--font-mono), monospace" text-anchor="middle">Node / Express</text>

      <rect x="370" y="90" width="130" height="50" rx="6" fill="#121A2B" stroke="#1F2A44" stroke-width="1.5"/>
      <text x="435" y="115" fill="#E6EAF2" font-size="11" font-family="var(--font-mono), monospace" text-anchor="middle">Academic Service</text>
      <text x="435" y="129" fill="#94A3B8" font-size="9" font-family="var(--font-mono), monospace" text-anchor="middle">+ Gemini AI Inquiries</text>

      <rect x="370" y="150" width="130" height="50" rx="6" fill="#121A2B" stroke="#1F2A44" stroke-width="1.5"/>
      <text x="435" y="175" fill="#E6EAF2" font-size="11" font-family="var(--font-mono), monospace" text-anchor="middle">Finance Service</text>
      <text x="435" y="189" fill="#94A3B8" font-size="9" font-family="var(--font-mono), monospace" text-anchor="middle">Tuition & Invoicing</text>

      <path d="M500 55 H550" stroke="#94A3B8" stroke-width="1.5"/>
      <path d="M500 115 H550" stroke="#94A3B8" stroke-width="1.5"/>
      <path d="M500 175 H550" stroke="#94A3B8" stroke-width="1.5"/>

      <rect x="550" y="30" width="130" height="50" rx="6" fill="#121A2B" stroke="#38BDF8" stroke-width="1.5"/>
      <text x="615" y="55" fill="#E6EAF2" font-size="11" font-family="var(--font-mono), monospace" text-anchor="middle">MongoDB (Auth)</text>
      <text x="615" y="69" fill="#94A3B8" font-size="9" font-family="var(--font-mono), monospace" text-anchor="middle">Users, Roles, Logs</text>

      <rect x="550" y="90" width="130" height="50" rx="6" fill="#121A2B" stroke="#38BDF8" stroke-width="1.5"/>
      <text x="615" y="115" fill="#E6EAF2" font-size="11" font-family="var(--font-mono), monospace" text-anchor="middle">MongoDB (Acad)</text>
      <text x="615" y="129" fill="#94A3B8" font-size="9" font-family="var(--font-mono), monospace" text-anchor="middle">18 Entities Schema</text>

      <rect x="550" y="150" width="130" height="50" rx="6" fill="#121A2B" stroke="#38BDF8" stroke-width="1.5"/>
      <text x="615" y="175" fill="#E6EAF2" font-size="11" font-family="var(--font-mono), monospace" text-anchor="middle">MongoDB (Fin)</text>
      <text x="615" y="189" fill="#94A3B8" font-size="9" font-family="var(--font-mono), monospace" text-anchor="middle">Ledger & Payments</text>
    </svg>`,
    verifiedInRepo: true,
  },
  {
    id: "shopping-cart",
    slug: "react-ecommerce-shopping-cart",
    title: "React E-Commerce Shopping Cart",
    oneLiner: {
      problem: "Traditional shopping carts suffer from stale cart state, sluggish updates, and poor mobile checkout UX.",
      solution: "Engineered a reactive React & Next.js shopping cart with real-time state synchronization, MongoDB persistence, and responsive UI.",
    },
    role: "Full-Stack Developer",
    teamContext: "Solo Engineering",
    image: "/projects/ecommerce_mockup.png",
    tags: ["React", "Next.js", "Tailwind CSS", "MongoDB", "Node.js", "REST API"],
    githubUrl: "https://github.com/YeYintLin/react_project",
    liveUrl: undefined,
    description:
      "A modular e-commerce shopping cart web application built with React and Next.js backend services. Features dynamic product filtering, real-time quantity adjustments, persistent cart sessions backed by MongoDB, and an optimized, frictionless checkout flow.",
    architectureDetails: [
      "Modular React client with stateful cart context and optimistic UI updates",
      "Next.js API route handlers managing inventory queries and cart session payloads",
      "MongoDB database integration for persistent item catalogs and order records",
      "Clean RESTful communication between frontend components and backend services",
    ],
    architectureSvg: `<svg viewBox="0 0 680 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <rect x="20" y="55" width="140" height="70" rx="8" fill="#121A2B" stroke="#38BDF8" stroke-width="1.5"/>
      <text x="90" y="88" fill="#E6EAF2" font-size="11" font-family="var(--font-mono), monospace" text-anchor="middle" font-weight="bold">React SPA</text>
      <text x="90" y="104" fill="#94A3B8" font-size="9" font-family="var(--font-mono), monospace" text-anchor="middle">Cart State & UI</text>

      <path d="M160 90 H240" stroke="#38BDF8" stroke-width="1.5"/>
      <polygon points="240,86 248,90 240,94" fill="#38BDF8"/>

      <rect x="250" y="55" width="160" height="70" rx="8" fill="#121A2B" stroke="#F59E0B" stroke-width="1.5"/>
      <text x="330" y="88" fill="#E6EAF2" font-size="11" font-family="var(--font-mono), monospace" text-anchor="middle" font-weight="bold">Next.js Backend</text>
      <text x="330" y="104" fill="#94A3B8" font-size="9" font-family="var(--font-mono), monospace" text-anchor="middle">REST Cart & Orders API</text>

      <path d="M410 90 H490" stroke="#38BDF8" stroke-width="1.5"/>
      <polygon points="490,86 498,90 490,94" fill="#38BDF8"/>

      <rect x="500" y="55" width="160" height="70" rx="8" fill="#121A2B" stroke="#38BDF8" stroke-width="1.5"/>
      <text x="580" y="88" fill="#E6EAF2" font-size="11" font-family="var(--font-mono), monospace" text-anchor="middle" font-weight="bold">MongoDB</text>
      <text x="580" y="104" fill="#94A3B8" font-size="9" font-family="var(--font-mono), monospace" text-anchor="middle">Products & Cart Items</text>
    </svg>`,
    verifiedInRepo: true,
  },
  {
    id: "fitness",
    slug: "infinity-fitness-platform",
    title: "Infinity Fitness Platform",
    oneLiner: {
      problem: "Gym branches relied on manual paperwork for memberships, session attendance, and trainer allocations.",
      solution: "Developed a centralized Next.js web portal and React Native mobile app for bookings, attendance, and member tiers.",
    },
    role: "Full-Stack & Mobile Developer (Client Project)",
    teamContext: "Team Project (Specific Individual Contributions)",
    image: "/projects/infinity_fitness_cover.png",
    tags: ["Next.js", "PWA", "React Native", "TypeScript", "Node.js", "PostgreSQL", "Docker Compose"],
    githubUrl: undefined, // Private client codebase (TODO_GITHUB_URL if open-sourced)
    liveUrl: undefined,
    description:
      "A multi-branch fitness management platform developed for an enterprise wellness client. Provided gym administrators with automated member subscription tracking, trainer scheduling, and attendance reporting. Built mobile screens in React Native for members to browse branch schedules, reserve workout slots, and track subscription renewal status.",
    architectureDetails: [
      "Next.js web portal for front-desk attendance logging and branch administrative controls",
      "React Native & Expo cross-platform mobile client for member self-service and schedule booking",
      "PostgreSQL database integration for transactional membership and booking records",
      "Containerized deployment using Docker Compose on staging environment",
    ],
    architectureSvg: `<svg viewBox="0 0 680 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <rect x="10" y="30" width="140" height="60" rx="8" fill="#121A2B" stroke="#38BDF8" stroke-width="1.5"/>
      <text x="80" y="58" fill="#E6EAF2" font-size="11" font-family="var(--font-mono), monospace" text-anchor="middle" font-weight="bold">Admin Web App</text>
      <text x="80" y="74" fill="#94A3B8" font-size="9" font-family="var(--font-mono), monospace" text-anchor="middle">Next.js / TypeScript</text>

      <rect x="10" y="110" width="140" height="60" rx="8" fill="#121A2B" stroke="#38BDF8" stroke-width="1.5"/>
      <text x="80" y="138" fill="#E6EAF2" font-size="11" font-family="var(--font-mono), monospace" text-anchor="middle" font-weight="bold">Member Mobile App</text>
      <text x="80" y="154" fill="#94A3B8" font-size="9" font-family="var(--font-mono), monospace" text-anchor="middle">React Native / Expo</text>

      <path d="M150 60 H230" stroke="#38BDF8" stroke-width="1.5"/>
      <path d="M150 140 H230" stroke="#38BDF8" stroke-width="1.5"/>

      <rect x="230" y="60" width="180" height="80" rx="8" fill="#121A2B" stroke="#F59E0B" stroke-width="1.5"/>
      <text x="320" y="95" fill="#E6EAF2" font-size="12" font-family="var(--font-mono), monospace" text-anchor="middle" font-weight="bold">Backend API Services</text>
      <text x="320" y="115" fill="#94A3B8" font-size="10" font-family="var(--font-mono), monospace" text-anchor="middle">Node.js / Express & Auth</text>

      <path d="M410 100 H480" stroke="#38BDF8" stroke-width="1.5"/>
      <polygon points="480,96 488,100 480,104" fill="#38BDF8"/>

      <rect x="490" y="60" width="170" height="80" rx="8" fill="#121A2B" stroke="#38BDF8" stroke-width="1.5"/>
      <text x="575" y="95" fill="#E6EAF2" font-size="12" font-family="var(--font-mono), monospace" text-anchor="middle" font-weight="bold">PostgreSQL Database</text>
      <text x="575" y="115" fill="#94A3B8" font-size="10" font-family="var(--font-mono), monospace" text-anchor="middle">Memberships & Logs</text>
    </svg>`,
    verifiedInRepo: true,
  },
  {
    id: "tkmlms",
    slug: "tkmlms",
    title: "TKMLMS (Myanmar-Language LMS)",
    oneLiner: {
      problem: "Standard educational software lacked Burmese script rendering, local timezones, and low-bandwidth optimizations.",
      solution: "Localized learning management system with custom API integration, Nginx reverse proxy, and containerized deployment.",
    },
    role: "Full-Stack Developer & DevOps Engineer",
    teamContext: "Team Project (Specific Individual Contributions)",
    image: "/projects/ecommerce_mockup.png",
    tags: ["React", "Node.js", "PHP", "MySQL", "Docker", "Nginx", "Linux VPS"],
    githubUrl: undefined, // Proprietary client project (TODO_GITHUB_URL if open source)
    liveUrl: undefined,
    description:
      "A localized learning management system customized for an education client in Myanmar. Built customized portal components supporting native Burmese font rendering, student assignment submissions, and instructor course management. Handled Dockerization, Nginx reverse proxy configuration with SSL termination, and automated daily database backups.",
    architectureDetails: [
      "Custom React frontend interfaces for Burmese student and instructor dashboard",
      "Nginx reverse proxy enforcing SSL encryption and static asset caching",
      "LMS backend application containerized with Docker on Linux VPS",
      "Automated MySQL dump backup routines running on scheduled intervals",
    ],
    architectureSvg: `<svg viewBox="0 0 680 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <rect x="20" y="55" width="130" height="70" rx="8" fill="#121A2B" stroke="#38BDF8" stroke-width="1.5"/>
      <text x="85" y="88" fill="#E6EAF2" font-size="11" font-family="var(--font-mono), monospace" text-anchor="middle" font-weight="bold">Web & Mobile</text>
      <text x="85" y="104" fill="#94A3B8" font-size="9" font-family="var(--font-mono), monospace" text-anchor="middle">Burmese Localization</text>

      <path d="M150 90 H210" stroke="#38BDF8" stroke-width="1.5"/>
      <polygon points="210,86 218,90 210,94" fill="#38BDF8"/>

      <rect x="220" y="55" width="140" height="70" rx="8" fill="#121A2B" stroke="#F59E0B" stroke-width="1.5"/>
      <text x="290" y="88" fill="#E6EAF2" font-size="11" font-family="var(--font-mono), monospace" text-anchor="middle" font-weight="bold">Nginx Reverse Proxy</text>
      <text x="290" y="104" fill="#94A3B8" font-size="9" font-family="var(--font-mono), monospace" text-anchor="middle">SSL & Static Cache</text>

      <path d="M360 90 H420" stroke="#38BDF8" stroke-width="1.5"/>
      <polygon points="420,86 428,90 420,94" fill="#38BDF8"/>

      <rect x="430" y="55" width="130" height="70" rx="8" fill="#121A2B" stroke="#1F2A44" stroke-width="1.5"/>
      <text x="495" y="88" fill="#E6EAF2" font-size="11" font-family="var(--font-mono), monospace" text-anchor="middle" font-weight="bold">LMS Application</text>
      <text x="495" y="104" fill="#94A3B8" font-size="9" font-family="var(--font-mono), monospace" text-anchor="middle">Docker Container</text>

      <path d="M560 90 H600" stroke="#38BDF8" stroke-width="1.5"/>
      <polygon points="600,86 608,90 600,94" fill="#38BDF8"/>

      <rect x="610" y="55" width="60" height="70" rx="8" fill="#121A2B" stroke="#38BDF8" stroke-width="1.5"/>
      <text x="640" y="88" fill="#E6EAF2" font-size="10" font-family="var(--font-mono), monospace" text-anchor="middle" font-weight="bold">MySQL</text>
      <text x="640" y="104" fill="#94A3B8" font-size="8" font-family="var(--font-mono), monospace" text-anchor="middle">+Backup</text>
    </svg>`,
    verifiedInRepo: true,
  },
];

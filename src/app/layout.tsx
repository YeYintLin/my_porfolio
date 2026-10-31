import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/config/site";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "Arial", "sans-serif"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  fallback: ["ui-monospace", "SF Mono", "Menlo", "Consolas", "monospace"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yeyintlin.dev"), // Fallback base URL for relative paths
  title: "Ye Yint Lin - Full-Stack Developer (React, Next.js, Node.js) with DevOps skills",
  description:
    "Full-Stack Developer building and deploying reliable web applications with React, Next.js, Node.js, Docker Compose, and Linux VPS environments.",
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  keywords: [
    "Ye Yint Lin",
    "Full-Stack Developer",
    "DevOps",
    "React",
    "Next.js",
    "Node.js",
    "Docker Compose",
    "Linux VPS",
    "Nginx",
    "TypeScript",
  ],
  alternates: {
    canonical: SITE_CONFIG.canonicalUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.canonicalUrl,
    title: "Ye Yint Lin - Full-Stack Developer (React, Next.js, Node.js) with DevOps skills",
    description:
      "Full-Stack Developer building and deploying reliable web applications with React, Next.js, Node.js, Docker Compose, and Linux VPS environments.",
    siteName: "Ye Yint Lin Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ye Yint Lin - Full-Stack Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ye Yint Lin - Full-Stack Developer (React, Next.js, Node.js) with DevOps skills",
    description:
      "Full-Stack Developer building and deploying reliable web applications with React, Next.js, Node.js, Docker Compose, and Linux VPS environments.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLdPerson = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_CONFIG.name,
  jobTitle: SITE_CONFIG.title,
  url: SITE_CONFIG.canonicalUrl,
  sameAs: [SITE_CONFIG.github, SITE_CONFIG.linkedin],
  knowsAbout: [
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "Docker Compose",
    "Linux VPS",
    "Nginx",
    "MongoDB",
    "PostgreSQL",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark h-full ${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Flash-free theme script runs synchronously before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (saved === 'light' || (!saved && !prefersDark)) {
                    document.documentElement.classList.remove('dark');
                  } else {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--bg)] text-[var(--text)] font-sans antialiased transition-colors duration-150">
        {children}
      </body>
    </html>
  );
}

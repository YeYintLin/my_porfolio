import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";
const isCspEnforced = process.env.CSP_ENFORCE === "true";

// Safe rollout: Content-Security-Policy-Report-Only by default.
// Set environment variable CSP_ENFORCE=true to switch to enforcing Content-Security-Policy.
const cspHeaderName = isCspEnforced
  ? "Content-Security-Policy"
  : "Content-Security-Policy-Report-Only";

const scriptSrc = isDev
  ? "'self' 'unsafe-inline' 'unsafe-eval'"
  : "'self' 'unsafe-inline'";

const cspDirectives = [
  "default-src 'self'",
  `script-src ${scriptSrc}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const securityHeaders = [
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  {
    key: cspHeaderName,
    value: cspDirectives,
  },
];

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  allowedDevOrigins: ["localhost:3000", "localhost:3001", "localhost:3002"],
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;

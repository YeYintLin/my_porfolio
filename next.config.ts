import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["172.16.0.2", "localhost:3000", "localhost:3001", "localhost:3002"]
};

export default nextConfig;

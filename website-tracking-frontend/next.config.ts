import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/auth/:path",
        destination: "https://website-tracking-backend-nxu2.vercel.app/api/auth/:path*"

      }
    ]
  },
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;

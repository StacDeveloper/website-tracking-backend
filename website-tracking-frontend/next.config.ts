import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites(){
    return [
      {
        source:"/api/auth/:path",
        destination:"https://website-tracking-backend.onrender.com/api/auth/:path*"
      
      }
    ]
  },
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;

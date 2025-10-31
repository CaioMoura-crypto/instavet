import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ...all other settings
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
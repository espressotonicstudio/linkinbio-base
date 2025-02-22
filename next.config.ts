import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        hostname: "github.com",
      },
      {
        hostname: "cdn.simpleicons.org",
      },
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['cdn.sanity.io'],
  },
  async headers() {
    return [
      {
        source: '/studio/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self'"
          }
        ]
      }
    ]
  }
};

export default nextConfig;
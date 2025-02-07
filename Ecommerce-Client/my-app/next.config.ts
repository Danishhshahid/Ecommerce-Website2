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
    ];
  },
  transpilePackages: ['react-icons', 'rxjs'],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(js|mjs)$/,
      include: /node_modules\/(react-icons|rxjs)/,
      type: 'javascript/auto'
    });
    return config;
  }
};

export default nextConfig;
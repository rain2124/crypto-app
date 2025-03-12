import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    domains: ['platform.theverge.com', 'media.wired.com','gizmodo.com'],
  },
};

export default nextConfig;

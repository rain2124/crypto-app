import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    domains: ['platform.theverge.com', 'media.wired.com','gizmodo.com','media.cnn.com','dims.apnews.com','ichef.bbci.co.uk','kubrick.htvapps.com'],
  },
};

export default nextConfig;

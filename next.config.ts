import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Build caches can persist server environment values in deployment artifacts.
    turbopackFileSystemCacheForBuild: false,
  },
};

export default nextConfig;

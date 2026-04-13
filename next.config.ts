import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/artecno',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

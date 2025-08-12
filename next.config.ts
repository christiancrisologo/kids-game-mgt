import type { NextConfig } from "next";

const repoName = "kids-math-quiz";

const nextConfig: NextConfig = {
  // Enable static export for GitHub Pages
  // output: 'export',
  
  // Add trailing slash for GitHub Pages compatibility
  trailingSlash: true,
  
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  
  // Configure base path and asset prefix for GitHub Pages
  basePath: process.env.NODE_ENV === 'production' ? `/${repoName}` : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? `/${repoName}/` : '',
};

export default nextConfig;

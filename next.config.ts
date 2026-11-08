import type { NextConfig } from "next";

// Auto-detect repository name from GitHub Actions environment, falling back to new repo name
const repo = process.env.GITHUB_REPOSITORY?.split("/")[1] || "E-Learning-Platform";
const basePath = process.env.NODE_ENV === "production" ? `/${repo}` : "";

const nextConfig: NextConfig = {
  output: "export",           // Static HTML export for GitHub Pages
  basePath,                   // Must match your repo name on GitHub Pages
  assetPrefix: basePath ? `${basePath}/` : undefined,
  allowedDevOrigins: ["192.168.56.1"],
  images: {
    unoptimized: true,        // GitHub Pages can't run Next.js image optimization
  },
  trailingSlash: true,        // Ensures /dashboard → /dashboard/index.html
  // Bake the base path into every client bundle at build time.
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;

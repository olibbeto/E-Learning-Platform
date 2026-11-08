import type { NextConfig } from "next";

const repo = "E-Learning-Platform---HCI-Usability-Evaluation";
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
  // NEXT_PUBLIC_* vars are inlined by the compiler — no runtime look-up needed.
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;

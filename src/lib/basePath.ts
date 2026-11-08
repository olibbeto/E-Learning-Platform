/**
 * withBasePath — prepend the GitHub Pages base path to any /public asset URL.
 *
 * Why this exists:
 *   next/image with `unoptimized: true` in `output: "export"` mode passes the
 *   src string straight to a plain <img> without prepending basePath. That means
 *   `/images/courses/hci.svg` resolves to the repo root on GitHub Pages instead
 *   of the subpath where the site is actually hosted.
 *
 * How it works:
 *   NEXT_PUBLIC_BASE_PATH is baked into the JS bundle at build time via
 *   next.config.ts `env`. On localhost it is an empty string, so paths are
 *   unchanged. On GitHub Pages it is `/E-Learning-Platform---HCI-Usability-Evaluation`.
 *
 * Usage:
 *   <img src={withBasePath('/images/courses/hci.svg')} ... />
 *
 * Rules:
 *   - Absolute URLs (http/https/protocol-relative) are returned unchanged.
 *   - Empty strings are returned unchanged.
 *   - If already prefixed with BASE, returns path as-is.
 *   - A leading slash is added to `path` if it is missing.
 */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function withBasePath(path: string): string {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('//')) return path;
  if (BASE && (path === BASE || path.startsWith(`${BASE}/`))) return path;
  const normalised = path.startsWith('/') ? path : `/${path}`;
  return `${BASE}${normalised}`;
}

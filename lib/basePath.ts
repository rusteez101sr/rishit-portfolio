/** Public asset prefix for GitHub Pages static export (`basePath` in next.config). */
export const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ?? "/rishit-portfolio";

export function withBasePath(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${normalized}`;
}

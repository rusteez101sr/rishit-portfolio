import type { Project } from "@/lib/types";

/**
 * Featured stubs only — no fabricated metrics, tech lists, employers, or dates.
 * Accents from design system; copy is neutral placeholders for layout.
 */
export const projects: Project[] = [
  {
    id: "labflow",
    slug: "labflow",
    title: "LabFlow",
    shortTitle: "LabFlow",
    summary: "Case study coming soon.",
    description: null,
    year: null,
    status: null,
    categories: [],
    technologies: [],
    featured: true,
    accent: "#1AA6B7",
    accentSoft: "rgba(26, 166, 183, 0.12)",
    accentDark: "#0E6F7A",
    primaryMedia: { type: "placeholder", motif: "gradient", alt: "LabFlow visual placeholder" },
    hoverMedia: { type: "placeholder", motif: "gradient", alt: "LabFlow secondary visual placeholder" },
    heroMedia: { type: "placeholder", motif: "gradient", alt: "LabFlow hero placeholder" },
    links: [],
    overview: null,
    problem: null,
    approach: null,
    role: null,
    engineering: null,
    challenge: null,
    outcome: null,
    gallery: null,
  },
  {
    id: "cybot",
    slug: "cybot",
    title: "CyBot",
    shortTitle: "CyBot",
    summary: "Case study coming soon.",
    description: null,
    year: null,
    status: null,
    categories: [],
    technologies: [],
    featured: true,
    accent: "#D4892A",
    accentSoft: "rgba(212, 137, 42, 0.12)",
    accentDark: "#8A5614",
    primaryMedia: { type: "placeholder", motif: "gradient", alt: "CyBot visual placeholder" },
    hoverMedia: { type: "placeholder", motif: "gradient", alt: "CyBot secondary visual placeholder" },
    heroMedia: { type: "placeholder", motif: "gradient", alt: "CyBot hero placeholder" },
    links: [],
    overview: null,
    problem: null,
    approach: null,
    role: null,
    engineering: null,
    challenge: null,
    outcome: null,
    gallery: null,
  },
  {
    id: "document-intelligence",
    slug: "document-intelligence",
    title: "AI Document Intelligence",
    shortTitle: "AI Doc",
    summary: "Case study coming soon.",
    description: null,
    year: null,
    status: null,
    categories: [],
    technologies: [],
    featured: true,
    accent: "#6B5CAD",
    accentSoft: "rgba(107, 92, 173, 0.12)",
    accentDark: "#433878",
    primaryMedia: { type: "placeholder", motif: "gradient", alt: "AI Document Intelligence visual placeholder" },
    hoverMedia: { type: "placeholder", motif: "gradient", alt: "AI Document Intelligence secondary visual placeholder" },
    heroMedia: { type: "placeholder", motif: "gradient", alt: "AI Document Intelligence hero placeholder" },
    links: [],
    overview: null,
    problem: null,
    approach: null,
    role: null,
    engineering: null,
    challenge: null,
    outcome: null,
    gallery: null,
  },
];

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}

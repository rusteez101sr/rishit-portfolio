import type { Project } from "@/lib/types";

/**
 * Featured projects — content from Aura CONTENT HANDOFF 2026-09-10.
 * Media remain placeholders until art assets exist. CyBot is minimal interim.
 */
export const projects: Project[] = [
  {
    id: "labflow",
    slug: "labflow",
    title: "LabFlow",
    shortTitle: "LabFlow",
    summary:
      "Android + Spring Boot platform that structures university lab workflows into checkpoints — progress tracking, deadlines, resources, and feedback-driven grading without spoon-feeding students.",
    description:
      "COMS 3090 project (Iowa State, Spring 2026). Unified lab management for students, TAs, and instructors: hierarchical labs→parts→checkpoints, persistent progress, TA rubrics and comments, analytics, and equipment/resource management.",
    year: 2026,
    status: "in-progress",
    categories: ["Software", "Android", "Education"],
    technologies: ["Java", "Android", "Spring Boot", "MySQL", "JWT", "Material Design 3"],
    featured: true,
    accent: "#1AA6B7",
    accentSoft: "rgba(26, 166, 183, 0.12)",
    accentDark: "#0E6F7A",
    primaryMedia: { type: "placeholder", motif: "gradient", alt: "LabFlow visual placeholder" },
    hoverMedia: { type: "placeholder", motif: "gradient", alt: "LabFlow secondary visual placeholder" },
    heroMedia: { type: "placeholder", motif: "gradient", alt: "LabFlow hero placeholder" },
    links: [],
    overview:
      "LabFlow closes the gap between static lab manuals and modern coursework tools — structured checkpoints that keep academic rigor while giving TAs and instructors visibility at scale.",
    problem:
      "Lab courses rely on monolithic PDFs and scattered resources; students lose progress across sessions; TAs lack consistent feedback tools; instructors can't see bottlenecks in real time.",
    approach:
      "Three integrated systems: structured lab content management, student progress & submission workflow, and TA feedback & grading infrastructure — backed by Android (MVVM) and Spring Boot REST APIs.",
    role: null,
    engineering:
      "Graph-based lab/checkpoint prerequisites (DAG + topological sort), JWT auth, MySQL relational schema, file resource serving, optional WebSocket stretch for live progress.",
    challenge: null,
    outcome: null,
    gallery: null,
  },
  {
    id: "cybot",
    slug: "cybot",
    title: "CyBot",
    shortTitle: "CyBot",
    summary:
      "Iowa State CprE 288 embedded systems final project on the CyBot mobile platform — C on microcontroller hardware with sensors, communication, and navigation.",
    description: null,
    year: null,
    status: null,
    categories: ["Embedded", "Robotics", "Computer Engineering"],
    technologies: ["C", "Embedded Systems"],
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
    summary:
      "AI prototype for Pfizer clinical supply documents — OCR, field extraction, classification, and RAG search so messy PDFs stop living in Ctrl+F.",
    description:
      "Built through the Pfizer Advanced AI-Powered Document Intelligence Externship (via Extern). Focus: non-GMP clinical supply documents; scanned + digital PDFs; fast experimentation toward a proof-of-concept Pfizer can evaluate for scale.",
    year: 2026,
    status: "in-progress",
    categories: ["AI", "Document Intelligence", "Healthcare"],
    technologies: [
      "Python",
      "OCR",
      "RAG",
      "PyMuPDF",
      "pdfplumber",
      "LlamaIndex",
      "FAISS",
      "Chroma",
      "Streamlit",
      "Gradio",
    ],
    featured: true,
    accent: "#6B5CAD",
    accentSoft: "rgba(107, 92, 173, 0.12)",
    accentDark: "#433878",
    primaryMedia: {
      type: "placeholder",
      motif: "gradient",
      alt: "AI Document Intelligence visual placeholder",
    },
    hoverMedia: {
      type: "placeholder",
      motif: "gradient",
      alt: "AI Document Intelligence secondary visual placeholder",
    },
    heroMedia: {
      type: "placeholder",
      motif: "gradient",
      alt: "AI Document Intelligence hero placeholder",
    },
    links: [
      {
        label: "Externship program",
        href: "https://www.extern.com/externships/pfizer-advanced-ai-powered-document-intelligence-externship-may-2026",
        kind: "external",
      },
    ],
    overview:
      "Automate review of pharmaceutical clinical-supply documents with parsing, OCR, structured extraction, and intelligent search — a portfolio project grounded in a real Pfizer workflow pain point.",
    problem:
      "Reviewing non-GMP clinical supply documents often means opening PDFs and hunting with Ctrl+F across messy, real-world files.",
    approach:
      "Ingest scanned/digital docs; extract and structure fields; RAG search with metadata filters; routing/classification; optional lightweight UI for query demos.",
    role: "Extern (Computer Engineering junior)",
    engineering:
      "Python pipelines; OCR engines (e.g. Tesseract / PaddleOCR / EasyOCR per program stack); vector search (LlamaIndex, FAISS, Chroma); LLM-assisted Q&A; optional Gradio/Streamlit UI.",
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

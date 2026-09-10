import type { SkillGroup } from "@/lib/types";

/**
 * Toolbox v1 — provisional evidence mapping (Aura-approved).
 * Only skills with ≥1 evidence ship. Engineering Workflow omitted until tools listed.
 */
export const skillGroups: SkillGroup[] = [
  {
    id: "software",
    title: "Software",
    skills: [
      {
        id: "java",
        name: "Java",
        evidence: [{ projectSlug: "labflow" }],
      },
      {
        id: "android",
        name: "Android",
        evidence: [{ projectSlug: "labflow" }],
      },
      {
        id: "spring-boot",
        name: "Spring Boot",
        evidence: [{ projectSlug: "labflow" }],
      },
      {
        id: "mysql",
        name: "MySQL",
        evidence: [{ projectSlug: "labflow" }],
      },
    ],
  },
  {
    id: "ai-data",
    title: "AI / Data",
    skills: [
      {
        id: "python",
        name: "Python",
        evidence: [{ projectSlug: "document-intelligence" }],
      },
      {
        id: "ocr",
        name: "OCR",
        evidence: [{ projectSlug: "document-intelligence" }],
      },
      {
        id: "rag",
        name: "RAG",
        evidence: [{ projectSlug: "document-intelligence" }],
      },
    ],
  },
  {
    id: "computer-engineering",
    title: "Computer Engineering",
    skills: [
      {
        id: "c",
        name: "C",
        evidence: [{ projectSlug: "cybot" }],
      },
      {
        id: "embedded-systems",
        name: "Embedded Systems",
        evidence: [{ projectSlug: "cybot" }],
      },
      {
        id: "uart",
        name: "UART",
        evidence: [{ projectSlug: "cybot" }],
      },
      {
        id: "adc",
        name: "ADC",
        evidence: [{ projectSlug: "cybot" }],
      },
      {
        id: "tcp-sockets",
        name: "TCP sockets",
        evidence: [{ projectSlug: "cybot" }],
      },
    ],
  },
];

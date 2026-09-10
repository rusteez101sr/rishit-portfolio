export type ProjectStatus = "shipped" | "in-progress" | "concept" | "archived";

export type ProjectMedia = {
  type: "image" | "placeholder";
  src?: string | null;
  alt?: string | null;
  motif?: "gradient" | null;
};

export type ProjectLink = {
  label: string;
  href: string;
  kind?: "live" | "repo" | "case-study" | "external";
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  shortTitle?: string | null;
  summary?: string | null;
  description?: string | null;
  year?: number | null;
  status?: ProjectStatus | null;
  categories: string[];
  technologies: string[];
  featured: boolean;
  accent: string;
  accentSoft: string;
  accentDark: string;
  primaryMedia?: ProjectMedia | null;
  hoverMedia?: ProjectMedia | null;
  heroMedia?: ProjectMedia | null;
  links: ProjectLink[];
  overview?: string | null;
  problem?: string | null;
  approach?: string | null;
  role?: string | null;
  engineering?: string | null;
  challenge?: string | null;
  outcome?: string | null;
  gallery?: ProjectMedia[] | null;
};

export type SkillEvidence = {
  projectSlug: string;
  label?: string;
};

export type SkillItem = {
  id: string;
  name: string;
  evidence: SkillEvidence[];
};

export type SkillGroup = {
  id: string;
  title: string;
  skills: SkillItem[];
};

export type ExperienceItem = {
  id: string;
  org: string;
  role: string;
  location?: string | null;
  start?: string | null;
  end?: string | null;
  summary?: string | null;
  highlights?: string[] | null;
};

export type SiteConfig = {
  name: string;
  shortName: string;
  tagline?: string | null;
  title: string;
  description: string;
  email?: string | null;
  socials: {
    label: string;
    href: string;
  }[];
};

export type BuildingStatus =
  | "Researching"
  | "Building"
  | "Testing"
  | "Learning"
  | "In Progress";

export type BuildingItem = {
  id: string;
  title: string;
  status: BuildingStatus;
  blurb: string;
  href?: string | null;
};

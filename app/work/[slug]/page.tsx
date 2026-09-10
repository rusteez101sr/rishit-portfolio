import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllProjectSlugs,
  getProjectBySlug,
} from "@/data/projects";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.title} — Rishit Dwivedi`,
    description: project.summary ?? project.description ?? undefined,
  };
}

function DetailBlock({
  label,
  body,
}: {
  label: string;
  body?: string | null;
}) {
  if (!body) return null;
  return (
    <div style={{ marginBottom: "1.75rem" }}>
      <h2
        style={{
          margin: "0 0 0.5rem",
          fontSize: "0.8rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--text-2)",
          fontWeight: 600,
        }}
      >
        {label}
      </h2>
      <p
        style={{
          margin: 0,
          fontSize: "1.05rem",
          lineHeight: 1.65,
          color: "var(--text)",
          maxWidth: "42rem",
        }}
      >
        {body}
      </p>
    </div>
  );
}

export default async function WorkPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <main>
      <article className="section-shell">
        <div className="section-inner" style={{ paddingBlock: "clamp(64px, 10vh, 112px)" }}>
          <p style={{ margin: "0 0 1.5rem" }}>
            <Link
              href="/#featured-work"
              style={{
                color: "var(--text-2)",
                fontSize: "0.9rem",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
              }}
            >
              ← Featured Work
            </Link>
          </p>

          <div
            style={{
              width: "100%",
              maxWidth: "720px",
              aspectRatio: "16 / 10",
              borderRadius: "var(--radius-media)",
              marginBottom: "2rem",
              overflow: "hidden",
              background: `linear-gradient(155deg, color-mix(in srgb, ${project.accent} 28%, #f7f4ee), #efece5 75%)`,
              border: "1px solid var(--border)",
            }}
            role="img"
            aria-label={project.heroMedia?.alt ?? `${project.title} hero`}
          />

          <p className="section-index" style={{ marginBottom: "0.75rem" }}>
            Project
            {project.year != null ? ` · ${project.year}` : ""}
          </p>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              margin: "0 0 0.75rem",
              lineHeight: 1.1,
            }}
          >
            {project.title}
          </h1>

          {project.summary ? (
            <p
              style={{
                margin: "0 0 2rem",
                fontSize: "1.125rem",
                lineHeight: 1.55,
                color: "var(--text-2)",
                maxWidth: "36rem",
              }}
            >
              {project.summary}
            </p>
          ) : null}

          <DetailBlock label="Overview" body={project.overview} />
          <DetailBlock label="Problem" body={project.problem} />
          <DetailBlock label="Approach" body={project.approach} />
          <DetailBlock label="Role" body={project.role} />
          <DetailBlock label="Engineering" body={project.engineering} />
          <DetailBlock label="Challenge" body={project.challenge} />
          <DetailBlock label="Outcome" body={project.outcome} />

          {!project.overview &&
          !project.problem &&
          !project.approach &&
          !project.role &&
          !project.engineering &&
          !project.challenge &&
          !project.outcome ? (
            <p className="placeholder-copy">Full case study coming soon.</p>
          ) : null}

          {project.technologies.length > 0 ? (
            <div style={{ marginTop: "2rem" }}>
              <h2
                style={{
                  margin: "0 0 0.75rem",
                  fontSize: "0.8rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--text-2)",
                }}
              >
                Technologies
              </h2>
              <ul
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.4rem",
                }}
              >
                {project.technologies.map((tech) => (
                  <li
                    key={tech}
                    style={{
                      fontSize: "13px",
                      padding: "0.4rem 0.65rem",
                      borderRadius: "999px",
                      background: "var(--surface-2)",
                      color: "var(--text-2)",
                    }}
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </article>
    </main>
  );
}

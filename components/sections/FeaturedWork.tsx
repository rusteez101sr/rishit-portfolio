"use client";

import { useCallback, useState, type CSSProperties } from "react";
import type { Project } from "@/lib/types";

type FeaturedWorkProps = {
  projects: Project[];
};

function Motif({
  accent,
  accentDark,
  variant,
  label,
}: {
  accent: string;
  accentDark: string;
  variant: "a" | "b";
  label: string;
}) {
  return (
    <div
      className={`featured-motif featured-motif--${variant}`}
      style={
        {
          "--motif": accent,
          "--motif-dark": accentDark,
        } as CSSProperties
      }
      role="img"
      aria-label={label}
    />
  );
}

function FeaturedCard({
  project,
  isActive,
  onActivate,
}: {
  project: Project;
  isActive: boolean;
  onActivate: (id: string | null) => void;
}) {
  const primaryAlt =
    project.primaryMedia?.alt ?? `${project.title} primary visual`;
  const hoverAlt =
    project.hoverMedia?.alt ?? `${project.title} secondary visual`;

  return (
    <a
      href={`/work/${project.slug}`}
      className={["featured-card", isActive ? "is-active" : ""]
        .filter(Boolean)
        .join(" ")}
      style={{ ["--card-accent" as string]: project.accent } as CSSProperties}
      onMouseEnter={() => onActivate(project.id)}
      onFocus={() => onActivate(project.id)}
      aria-label={`${project.title} — view project`}
    >
      <div className="featured-card__media">
        {/* Both layers always mounted — crossfade via opacity, never swap src */}
        <div className="featured-card__layer featured-card__layer--primary">
          <Motif
            accent={project.accent}
            accentDark={project.accentDark}
            variant="a"
            label={primaryAlt}
          />
        </div>
        <div className="featured-card__layer featured-card__layer--hover">
          <Motif
            accent={project.accent}
            accentDark={project.accentDark}
            variant="b"
            label={hoverAlt}
          />
        </div>
      </div>

      <div className="featured-card__meta">
        <div
          className="featured-card__category"
          aria-hidden={!project.categories.length}
        >
          {project.categories[0] ?? "\u00A0"}
        </div>
        <h3 className="featured-card__title">{project.title}</h3>
        {project.summary ? (
          <p className="featured-card__summary">{project.summary}</p>
        ) : (
          <p className="featured-card__summary">Case study coming soon.</p>
        )}
        {project.technologies.length > 0 ? (
          <ul className="featured-card__techs">
            {project.technologies.slice(0, 3).map((tech) => (
              <li key={tech} className="featured-card__tech">
                {tech}
              </li>
            ))}
          </ul>
        ) : null}
        <span className="featured-card__cta">View project →</span>
      </div>
    </a>
  );
}

export function FeaturedWork({ projects }: FeaturedWorkProps) {
  const [activeProject, setActiveProject] = useState<string | null>(null);

  const clearSpotlight = useCallback(() => {
    setActiveProject(null);
  }, []);

  const handleActivate = useCallback((id: string | null) => {
    setActiveProject(id);
  }, []);

  return (
    <section
      id="featured-work"
      className="featured-work"
      aria-labelledby="featured-work-title"
      onMouseLeave={clearSpotlight}
      onBlur={(event) => {
        const next = event.relatedTarget as Node | null;
        if (!event.currentTarget.contains(next)) {
          clearSpotlight();
        }
      }}
    >
      <div className="featured-work__inner">
        <p className="section-index">04</p>
        <h2 id="featured-work-title" className="section-title">
          Featured Work
        </h2>

        <div
          className={[
            "featured-grid",
            activeProject ? "is-spotlighted" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {projects.map((project) => (
            <FeaturedCard
              key={project.id}
              project={project}
              isActive={activeProject === project.id}
              onActivate={handleActivate}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

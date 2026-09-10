"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import { ProjectEvidenceDiagram } from "@/components/evidence/ProjectDiagrams";
import { useAtmosphere } from "@/components/ui/Atmosphere";
import type { Project } from "@/lib/types";

type SelectedWorkProps = {
  projects: Project[];
};

function WorkCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);
  const { setAccentTint } = useAtmosphere();
  const primaryAlt =
    project.primaryMedia?.alt ?? `${project.title} evidence diagram`;
  const hoverAlt =
    project.hoverMedia?.alt ?? `${project.title} secondary evidence`;

  const setHover = (next: boolean) => {
    setHovered(next);
    setAccentTint(next ? project.accent : null);
  };

  return (
    <Link
      href={`/work/${project.slug}`}
      className={["work-card", hovered ? "is-hovered" : ""]
        .filter(Boolean)
        .join(" ")}
      style={
        {
          ["--card-accent" as string]: project.accent,
          ["--card-accent-soft" as string]: project.accentSoft,
        } as CSSProperties
      }
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      aria-label={`${project.title} — view project`}
    >
      <div className="work-card__top">
        <h2 className="work-card__title">{project.title}</h2>
        <span className="work-card__arrow" aria-hidden="true">
          {hovered ? "↗" : "→"}
        </span>
      </div>

      {project.cardContext ? (
        <p className="work-card__context">{project.cardContext}</p>
      ) : project.summary ? (
        <p className="work-card__context">{project.summary}</p>
      ) : null}

      <div className="work-card__frame">
        <div className="work-card__layer work-card__layer--primary">
          <ProjectEvidenceDiagram
            slug={project.slug}
            accent={project.accent}
            accentDark={project.accentDark}
            label={primaryAlt}
          />
        </div>
        <div className="work-card__layer work-card__layer--secondary" aria-hidden="true">
          <ProjectEvidenceDiagram
            slug={project.slug}
            accent={project.accentDark}
            accentDark={project.accent}
            label={hoverAlt}
          />
        </div>
      </div>
    </Link>
  );
}

export function SelectedWork({ projects }: SelectedWorkProps) {
  return (
    <section id="work" className="selected-work" aria-label="Selected work">
      <div className="selected-work__inner">
        <div className="selected-work__stack">
          {projects.map((project) => (
            <WorkCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

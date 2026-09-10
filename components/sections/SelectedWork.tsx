"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import { ProjectEvidenceDiagram } from "@/components/evidence/ProjectDiagrams";
import SpotlightCard from "@/components/react-bits/SpotlightCard";
import type { Project } from "@/lib/types";

type SelectedWorkProps = {
  projects: Project[];
};

function hexToSpotlight(
  hex: string,
  alpha = 0.28,
): `rgba(${number}, ${number}, ${number}, ${number})` {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function WorkCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);
  const primaryAlt =
    project.primaryMedia?.alt ?? `${project.title} evidence diagram`;
  const hoverAlt =
    project.hoverMedia?.alt ?? `${project.title} secondary evidence`;

  const setHover = (next: boolean) => {
    setHovered(next);
  };

  return (
    <Link
      href={`/work/${project.slug}`}
      className="work-card-link"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      aria-label={`${project.title} — view project`}
    >
      <SpotlightCard
        className={["work-card", hovered ? "is-hovered" : ""]
          .filter(Boolean)
          .join(" ")}
        style={
          {
            ["--card-accent" as string]: project.accent,
            ["--card-accent-soft" as string]: project.accentSoft,
          } as CSSProperties
        }
        spotlightColor={hexToSpotlight(project.accent, 0.28)}
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
          <div
            className="work-card__layer work-card__layer--secondary"
            aria-hidden="true"
          >
            <ProjectEvidenceDiagram
              slug={project.slug}
              accent={project.accentDark}
              accentDark={project.accent}
              label={hoverAlt}
            />
          </div>
        </div>
      </SpotlightCard>
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

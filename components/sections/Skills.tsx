"use client";

import { useRef, type CSSProperties } from "react";
import Link from "next/link";
import { SectionShell } from "@/components/ui/SectionShell";
import { getProjectBySlug } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import { useInViewOnce, useIsClient } from "@/lib/motion";
import type { SkillItem } from "@/lib/types";

function EvidenceChips({ skill }: { skill: SkillItem }) {
  return (
    <ul className="toolbox__evidence" aria-label={`${skill.name} evidence`}>
      {skill.evidence.map((item) => {
        const project = getProjectBySlug(item.projectSlug);
        if (!project) return null;

        const label = item.label ?? project.shortTitle ?? project.title;

        return (
          <li key={`${skill.id}-${item.projectSlug}`}>
            <Link
              href={`/work/${project.slug}`}
              className="toolbox__chip"
              style={
                {
                  ["--chip-accent" as string]: project.accent,
                  ["--chip-accent-soft" as string]: project.accentSoft,
                } as CSSProperties
              }
            >
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function SkillRow({ skill, index }: { skill: SkillItem; index: number }) {
  return (
    <div
      className="toolbox__skill is-open stagger-row"
      style={{ ["--stagger-i" as string]: index }}
    >
      <div className="toolbox__skill-label">
        <span className="toolbox__skill-name">{skill.name}</span>
      </div>
      <div id={`toolbox-evidence-${skill.id}`} className="toolbox__skill-body">
        <EvidenceChips skill={skill} />
      </div>
    </div>
  );
}

export function Skills() {
  const gridRef = useRef<HTMLDivElement>(null);
  const inView = useInViewOnce(gridRef);
  const armed = useIsClient();

  return (
    <SectionShell id="skills" index="TOOLBOX" title="Toolbox" className="toolbox">
      <p className="toolbox__dek">Connected to work — not percentage bars.</p>

      {skillGroups.length === 0 ? (
        <p className="placeholder-copy">Toolbox details coming soon.</p>
      ) : (
        <div
          ref={gridRef}
          className={[
            "toolbox__grid",
            "stagger-parent",
            armed && !inView ? "is-pending" : "",
            inView ? "is-inview" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {skillGroups.map((group, gi) => (
            <article key={group.id} className="toolbox__group">
              <h3 className="toolbox__group-title">{group.title}</h3>
              <div className="toolbox__skills">
                {group.skills.map((skill, si) => (
                  <SkillRow
                    key={skill.id}
                    skill={skill}
                    index={gi * 4 + si}
                  />
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </SectionShell>
  );
}

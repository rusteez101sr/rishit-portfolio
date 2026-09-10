"use client";

import {
  useCallback,
  useState,
  type CSSProperties,
} from "react";
import { SectionShell } from "@/components/ui/SectionShell";
import { getProjectBySlug } from "@/data/projects";
import { skillGroups } from "@/data/skills";
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
            <a
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
            </a>
          </li>
        );
      })}
    </ul>
  );
}

function SkillRow({
  skill,
  isOpen,
  onToggle,
}: {
  skill: SkillItem;
  isOpen: boolean;
  onToggle: (id: string) => void;
}) {
  return (
    <div
      className={["toolbox__skill", isOpen ? "is-open" : ""]
        .filter(Boolean)
        .join(" ")}
    >
      <button
        type="button"
        className="toolbox__skill-toggle"
        aria-expanded={isOpen}
        aria-controls={`toolbox-evidence-${skill.id}`}
        onClick={() => onToggle(skill.id)}
      >
        <span className="toolbox__skill-name">{skill.name}</span>
      </button>
      <div id={`toolbox-evidence-${skill.id}`} className="toolbox__skill-body">
        <EvidenceChips skill={skill} />
      </div>
    </div>
  );
}

export function Skills() {
  const [openSkillId, setOpenSkillId] = useState<string | null>(null);

  const handleToggle = useCallback((id: string) => {
    setOpenSkillId((current) => (current === id ? null : id));
  }, []);

  return (
    <SectionShell id="skills" index="06" title="Toolbox" className="toolbox">
      <p className="toolbox__dek">Connected to work — not percentage bars.</p>

      {skillGroups.length === 0 ? (
        <p className="placeholder-copy">Toolbox details coming soon.</p>
      ) : (
        <div className="toolbox__grid">
          {skillGroups.map((group) => (
            <article key={group.id} className="toolbox__group">
              <h3 className="toolbox__group-title">{group.title}</h3>
              <div className="toolbox__skills">
                {group.skills.map((skill) => (
                  <SkillRow
                    key={skill.id}
                    skill={skill}
                    isOpen={openSkillId === skill.id}
                    onToggle={handleToggle}
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

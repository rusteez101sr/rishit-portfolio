"use client";

import {
  useCallback,
  useEffect,
  useState,
  type CSSProperties,
} from "react";
import Link from "next/link";
import { SectionShell } from "@/components/ui/SectionShell";
import { getProjectBySlug } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import type { SkillItem } from "@/lib/types";

/** ≤900px viewport OR coarse/no-hover: evidence must stay visible (no accordion hide). */
const ALWAYS_EXPANDED_MQ =
  "(max-width: 900px), (hover: none), (pointer: coarse)";

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

function SkillRow({
  skill,
  isOpen,
  onToggle,
  alwaysExpanded,
}: {
  skill: SkillItem;
  isOpen: boolean;
  onToggle: (id: string) => void;
  alwaysExpanded: boolean;
}) {
  const expanded = alwaysExpanded || isOpen;

  return (
    <div
      className={["toolbox__skill", expanded ? "is-open" : ""]
        .filter(Boolean)
        .join(" ")}
    >
      <button
        type="button"
        className="toolbox__skill-toggle"
        aria-expanded={expanded}
        aria-controls={`toolbox-evidence-${skill.id}`}
        onClick={() => {
          if (!alwaysExpanded) onToggle(skill.id);
        }}
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
  const [alwaysExpanded, setAlwaysExpanded] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(ALWAYS_EXPANDED_MQ);
    const sync = () => setAlwaysExpanded(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const handleToggle = useCallback((id: string) => {
    setOpenSkillId((current) => (current === id ? null : id));
  }, []);

  return (
    <SectionShell id="skills" title="Toolbox" className="toolbox">
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
                    alwaysExpanded={alwaysExpanded}
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

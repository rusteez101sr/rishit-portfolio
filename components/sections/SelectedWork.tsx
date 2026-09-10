"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import Link from "next/link";
import { ProjectEvidenceDiagram } from "@/components/evidence/ProjectDiagrams";
import {
  useFinePointer,
  useInViewOnce,
  useIsClient,
  usePrefersReducedMotion,
} from "@/lib/motion";
import type { Project } from "@/lib/types";

type SelectedWorkProps = {
  projects: Project[];
};

const LERP = 0.2;
const RADIUS_HOVER = 150;

function XRaySchematic({ project }: { project: Project }) {
  const year = project.year ?? "——";
  const techs = project.technologies.slice(0, 4);

  return (
    <div className="work-card__xray-inner">
      <div className="work-card__xray-grid" aria-hidden="true" />
      <div className="work-card__xray-meta">
        <span className="work-card__xray-slug">{project.slug}</span>
        <span className="work-card__xray-year">{year}</span>
      </div>
      <div className="work-card__xray-title-box" aria-hidden="true">
        <span className="work-card__xray-dim">W · title</span>
        <span className="work-card__xray-label">{project.title}</span>
      </div>
      <div className="work-card__xray-frame-box" aria-hidden="true">
        <span className="work-card__xray-dim">H · media</span>
        <span className="work-card__xray-cross" />
      </div>
      <ul className="work-card__xray-chips" aria-hidden="true">
        {techs.map((tech) => (
          <li key={tech} className="work-card__xray-chip">
            {tech}
          </li>
        ))}
      </ul>
    </div>
  );
}

function WorkCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const targetRef = useRef({ x: 0, y: 0, r: 0 });
  const currentRef = useRef({ x: 0, y: 0, r: 0 });
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const finePointer = useFinePointer();
  const reduceMotion = usePrefersReducedMotion();

  const primaryAlt =
    project.primaryMedia?.alt ?? `${project.title} evidence diagram`;

  useEffect(() => {
    const tick = () => {
      const cur = currentRef.current;
      const tgt = targetRef.current;
      cur.x += (tgt.x - cur.x) * LERP;
      cur.y += (tgt.y - cur.y) * LERP;
      cur.r += (tgt.r - cur.r) * LERP;

      const el = cardRef.current;
      if (el) {
        el.style.setProperty("--x", `${cur.x.toFixed(1)}px`);
        el.style.setProperty("--y", `${cur.y.toFixed(1)}px`);
        el.style.setProperty("--r", `${cur.r.toFixed(1)}px`);
      }

      const settling =
        Math.abs(tgt.x - cur.x) < 0.4 &&
        Math.abs(tgt.y - cur.y) < 0.4 &&
        Math.abs(tgt.r - cur.r) < 0.4;

      if (!settling || tgt.r > 0.5) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        rafRef.current = null;
        if (el && tgt.r <= 0) el.style.setProperty("--r", "0px");
      }
    };

    const ensureTick = () => {
      if (rafRef.current == null) rafRef.current = requestAnimationFrame(tick);
    };

    const node = cardRef.current?.parentElement;
    if (!node) return;

    const onMove = (e: Event) => {
      if (!finePointer || reduceMotion || !cardRef.current) return;
      const me = e as globalThis.MouseEvent;
      const rect = cardRef.current.getBoundingClientRect();
      targetRef.current.x = me.clientX - rect.left;
      targetRef.current.y = me.clientY - rect.top;
      targetRef.current.r = RADIUS_HOVER;
      ensureTick();
    };

    const onEnter = () => {
      if (!finePointer || reduceMotion) return;
      targetRef.current.r = RADIUS_HOVER;
      ensureTick();
    };

    const onLeave = () => {
      if (!finePointer || reduceMotion) return;
      targetRef.current.r = 0;
      ensureTick();
    };

    node.addEventListener("mousemove", onMove);
    node.addEventListener("mouseenter", onEnter);
    node.addEventListener("mouseleave", onLeave);

    return () => {
      node.removeEventListener("mousemove", onMove);
      node.removeEventListener("mouseenter", onEnter);
      node.removeEventListener("mouseleave", onLeave);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [finePointer, reduceMotion]);

  const onFocus = () => {
    setFocused(true);
    setHovered(true);
  };

  const onBlur = () => {
    setFocused(false);
    setHovered(false);
    targetRef.current.r = 0;
  };

  const modeClass = [
    "work-card",
    hovered ? "is-hovered" : "",
    focused ? "is-focused" : "",
    reduceMotion ? "is-reduced" : "",
    finePointer ? "is-fine" : "is-coarse",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Link
      href={`/work/${project.slug}`}
      className="work-card-link"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={onFocus}
      onBlur={onBlur}
      aria-label={`${project.title} — view project`}
    >
      <div
        ref={cardRef}
        className={modeClass}
        style={
          {
            ["--card-accent" as string]: project.accent,
            ["--card-accent-soft" as string]: project.accentSoft,
            ["--x" as string]: "50%",
            ["--y" as string]: "40%",
            ["--r" as string]: "0px",
          } as CSSProperties
        }
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
        </div>

        <div className="work-card__xray" aria-hidden="true">
          <XRaySchematic project={project} />
        </div>
      </div>
    </Link>
  );
}

export function SelectedWork({ projects }: SelectedWorkProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInViewOnce(ref);
  const armed = useIsClient();

  return (
    <section
      ref={ref}
      id="work"
      className={[
        "selected-work",
        "section-reveal",
        armed && !inView ? "is-pending" : "",
        inView ? "is-inview" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label="Selected work"
    >
      <div className="selected-work__inner">
        <div className="selected-work__stack">
          <header className="selected-work__header">
            <p className="section-index">WORK</p>
            <h2 className="section-title selected-work__title">Selected work</h2>
          </header>
          {projects.map((project, i) => (
            <div
              key={project.id}
              className="stagger-item"
              style={{ ["--stagger-i" as string]: i }}
            >
              <WorkCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

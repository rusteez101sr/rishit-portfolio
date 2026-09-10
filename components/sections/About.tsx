"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { SectionShell } from "@/components/ui/SectionShell";
import { useFinePointer, usePrefersReducedMotion } from "@/lib/motion";

const LERP = 0.22;
const RADIUS = 120;

function AboutProseCopy() {
  return (
    <>
      <p>
        I started in Computer Engineering at Nirma University, then continued at
        Iowa State University — still chasing how software meets the physical
        world.
      </p>
      <p>
        I&apos;m drawn to work that spans products people touch, systems that
        run close to hardware, and intelligence that has to be reliable — not
        just impressive in a demo.
      </p>
      <p className="about__prose-map">This portfolio is a map of that path.</p>
    </>
  );
}

function AboutSpotlight() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const targetRef = useRef({ x: 0, y: 0, r: 0 });
  const currentRef = useRef({ x: 0, y: 0, r: 0 });
  const finePointer = useFinePointer();
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const tick = () => {
      const cur = currentRef.current;
      const tgt = targetRef.current;
      cur.x += (tgt.x - cur.x) * LERP;
      cur.y += (tgt.y - cur.y) * LERP;
      cur.r += (tgt.r - cur.r) * LERP;

      el.style.setProperty("--tx", `${cur.x.toFixed(1)}px`);
      el.style.setProperty("--ty", `${cur.y.toFixed(1)}px`);
      el.style.setProperty("--tr", `${cur.r.toFixed(1)}px`);

      const settling =
        Math.abs(tgt.x - cur.x) < 0.4 &&
        Math.abs(tgt.y - cur.y) < 0.4 &&
        Math.abs(tgt.r - cur.r) < 0.4;

      if (!settling || tgt.r > 0.5) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        rafRef.current = null;
        if (tgt.r <= 0) el.style.setProperty("--tr", "0px");
      }
    };

    const ensureTick = () => {
      if (rafRef.current == null) rafRef.current = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      if (!finePointer || reduceMotion) return;
      const rect = el.getBoundingClientRect();
      targetRef.current.x = e.clientX - rect.left;
      targetRef.current.y = e.clientY - rect.top;
      targetRef.current.r = RADIUS;
      ensureTick();
    };

    const onEnter = () => {
      if (reduceMotion) {
        el.classList.add("is-bright");
        return;
      }
      if (!finePointer) return;
      targetRef.current.r = RADIUS;
      ensureTick();
    };

    const onLeave = () => {
      if (reduceMotion) {
        el.classList.remove("is-bright");
        return;
      }
      targetRef.current.r = 0;
      ensureTick();
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [finePointer, reduceMotion]);

  return (
    <div
      ref={wrapRef}
      className={[
        "about__spotlight",
        reduceMotion ? "is-reduced" : "",
        finePointer ? "is-fine" : "is-coarse",
      ]
        .filter(Boolean)
        .join(" ")}
      style={
        {
          ["--tx" as string]: "50%",
          ["--ty" as string]: "40%",
          ["--tr" as string]: "0px",
        } as CSSProperties
      }
    >
      <div className="about__prose about__prose--base">
        <AboutProseCopy />
      </div>
      <div className="about__prose about__prose--reveal" aria-hidden="true">
        <AboutProseCopy />
      </div>
    </div>
  );
}

export function About() {
  return (
    <SectionShell id="about" index="ABOUT" title="About" className="about">
      <div className="about__layout">
        <AboutSpotlight />

        <aside className="about__path" aria-label="Education path">
          <p className="about__path-label">PATH</p>
          <ol className="about__path-list">
            <li className="about__path-step">
              <span className="about__path-school">Nirma University</span>
              <span className="about__path-field">Computer Engineering</span>
            </li>
            <li className="about__path-arrow" aria-hidden="true">
              →
            </li>
            <li className="about__path-step">
              <span className="about__path-school">Iowa State University</span>
              <span className="about__path-field">Computer Engineering</span>
            </li>
          </ol>
        </aside>
      </div>
    </SectionShell>
  );
}

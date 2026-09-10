"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

const CHIPS = [
  { label: "AI", wash: "ai" as const },
  { label: "Software", wash: "software" as const },
  { label: "Embedded Systems", wash: "embedded" as const },
];

const MOTIF_PANELS = [
  { label: "Software", key: "software" as const },
  { label: "Hardware", key: "hardware" as const },
  { label: "Intelligent Systems", key: "intel" as const },
];

export function Hero() {
  const motifRef = useRef<HTMLDivElement>(null);
  const [activePanel, setActivePanel] = useState<number | null>(null);
  const [spotlightEnabled, setSpotlightEnabled] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => {
      setSpotlightEnabled(finePointer.matches && !reducedMotion.matches);
    };

    sync();
    finePointer.addEventListener("change", sync);
    reducedMotion.addEventListener("change", sync);
    return () => {
      finePointer.removeEventListener("change", sync);
      reducedMotion.removeEventListener("change", sync);
    };
  }, []);

  const handleMotifMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!spotlightEnabled || !motifRef.current) return;
      const panels = motifRef.current.querySelectorAll<HTMLElement>(
        ".hero__motif-panel",
      );
      let nearest: number | null = null;
      let nearestDist = Infinity;
      panels.forEach((panel, index) => {
        const rect = panel.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dist = Math.hypot(event.clientX - cx, event.clientY - cy);
        if (dist < nearestDist) {
          nearestDist = dist;
          nearest = index;
        }
      });
      setActivePanel(nearest);
    },
    [spotlightEnabled],
  );

  const clearMotif = useCallback(() => {
    setActivePanel(null);
  }, []);

  return (
    <section id="hero" className="hero" aria-labelledby="hero-title">
      <div className="hero__inner">
        <p
          className="hero__eyebrow hero__enter"
          style={{ ["--enter-i" as string]: 0 }}
        >
          Computer Engineering · Iowa State
        </p>

        <h1
          id="hero-title"
          className="hero__name hero__enter"
          style={{ ["--enter-i" as string]: 1 }}
        >
          Rishit Dwivedi
        </h1>

        <p
          className="hero__role hero__enter"
          style={{ ["--enter-i" as string]: 2 }}
        >
          Computer Engineer
        </p>

        <ul
          className="hero__chips hero__enter"
          style={{ ["--enter-i" as string]: 3 }}
          aria-label="Focus areas"
        >
          {CHIPS.map((chip) => (
            <li
              key={chip.label}
              className={`hero__chip hero__chip--${chip.wash}`}
            >
              {chip.label}
            </li>
          ))}
        </ul>

        <p
          className="hero__lede hero__enter"
          style={{ ["--enter-i" as string]: 4 }}
        >
          I build across software, hardware, and intelligent systems — with
          clarity, curiosity, and care.
        </p>

        <div
          className="hero__ctas hero__enter"
          style={{ ["--enter-i" as string]: 5 }}
        >
          <a href="#featured" className="hero__cta-primary">
            View work →
          </a>
          <a href="#about" className="hero__cta-secondary">
            About
          </a>
        </div>

        <div
          ref={motifRef}
          className={[
            "hero__motif",
            "hero__enter",
            spotlightEnabled && activePanel !== null ? "is-spotlighted" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          style={{ ["--enter-i" as string]: 6 }}
          aria-hidden="true"
          onPointerMove={handleMotifMove}
          onPointerLeave={clearMotif}
        >
          {MOTIF_PANELS.map((panel, index) => (
            <div
              key={panel.key}
              className={[
                "hero__motif-panel",
                `hero__motif-panel--${panel.key}`,
                activePanel === index ? "is-active" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <span className="hero__motif-label">{panel.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

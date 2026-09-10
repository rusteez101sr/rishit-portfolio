"use client";

import {
  useCallback,
  useEffect,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { SectionShell } from "@/components/ui/SectionShell";

const PANELS = [
  {
    key: "software",
    title: "Software",
    body: "Products and systems you can ship, test, and improve.",
    evidence: "Apps, interfaces, and reliable application logic.",
    accent: "#1AA6B7",
  },
  {
    key: "hardware",
    title: "Hardware",
    body: "Sensors, robots, and constraints you can’t hand-wave away.",
    evidence: "Embedded software meeting real devices.",
    accent: "#D4892A",
  },
  {
    key: "intelligent",
    title: "Intelligent Systems",
    body: "Models and pipelines that earn trust in messy, real inputs.",
    evidence: "AI applied to documents, signals, and decisions.",
    accent: "#6B5CAD",
  },
] as const;

export function Origin() {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [finePointer, setFinePointer] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setFinePointer(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const clearActive = useCallback(() => {
    setActiveKey(null);
  }, []);

  const handleActivate = useCallback((key: string) => {
    setActiveKey(key);
  }, []);

  const handleKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLDivElement>, key: string) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      // Enter/Space toggles active — especially for coarse pointers
      setActiveKey((current) => (current === key ? null : key));
    },
    [],
  );

  return (
    <SectionShell
      id="origin"
      index="03"
      title="Software → Hardware → Intelligent Systems"
      className="origin"
    >
      <div
        className={[
          "origin__grid",
          activeKey ? "is-spotlighted" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        onMouseLeave={clearActive}
        onBlur={(event) => {
          const next = event.relatedTarget as Node | null;
          if (!event.currentTarget.contains(next)) {
            clearActive();
          }
        }}
      >
        {PANELS.map((panel) => {
          const isActive = activeKey === panel.key;
          return (
            <div
              key={panel.key}
              className={[
                "origin__panel",
                `origin__panel--${panel.key}`,
                isActive ? "is-active" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              style={{ ["--panel-accent" as string]: panel.accent }}
              tabIndex={0}
              role="button"
              aria-pressed={isActive}
              onMouseEnter={() => {
                if (finePointer) handleActivate(panel.key);
              }}
              onFocus={(event) => {
                // Fine-pointer hover path + keyboard :focus-visible only —
                // avoids sticky spotlight from touch-induced focus / first paint.
                if (
                  finePointer ||
                  event.currentTarget.matches(":focus-visible")
                ) {
                  handleActivate(panel.key);
                }
              }}
              onKeyDown={(event) => handleKeyDown(event, panel.key)}
            >
              <h3 className="origin__panel-title">{panel.title}</h3>
              <p className="origin__panel-body">{panel.body}</p>
              <p className="origin__panel-evidence">
                <span className="origin__panel-evidence-label">Evidence</span>
                {panel.evidence}
              </p>
            </div>
          );
        })}
      </div>
    </SectionShell>
  );
}

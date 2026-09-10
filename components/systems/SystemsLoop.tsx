"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";

export type SystemsNodeId = "structure" | "track" | "sync" | "feedback";

export type SystemsNode = {
  id: SystemsNodeId;
  index: number;
  label: string;
  sub: string;
  accent: string;
  caption: string;
  chips: string[];
};

/** Data-driven nodes — Rive Phase B can swap the visual layer while keeping this contract. */
export const SYSTEMS_NODES: SystemsNode[] = [
  {
    id: "structure",
    index: 1,
    label: "Structure",
    sub: "Checkpoints · Android",
    accent: "#3EC6D8",
    caption:
      "Break a lab into clear checkpoints students can actually finish.",
    chips: ["Java", "Android", "Material 3"],
  },
  {
    id: "track",
    index: 2,
    label: "Track",
    sub: "Progress · Deadlines",
    accent: "#3EC6D8",
    caption: "Live progress and deadlines without spoon-feeding the answer.",
    chips: ["Checkpoints", "JWT"],
  },
  {
    id: "sync",
    index: 3,
    label: "Sync",
    sub: "Spring Boot · MySQL",
    accent: "#3EC6D8",
    caption: "Android client talks to a Spring Boot API backed by MySQL.",
    chips: ["Spring Boot", "MySQL", "REST"],
  },
  {
    id: "feedback",
    index: 4,
    label: "Feedback",
    sub: "Grading · Mentors",
    accent: "#3EC6D8",
    caption:
      "Feedback-driven grading closes the loop for instructors and students.",
    chips: ["Feedback", "Grading"],
  },
];

const LOOP_PATH =
  "M 260 56 C 360 56, 424 120, 424 200 C 424 280, 360 344, 260 344 C 160 344, 96 280, 96 200 C 96 120, 160 56, 260 56";

const NODE_POSITIONS: Record<SystemsNodeId, { x: number; y: number }> = {
  structure: { x: 260, y: 56 },
  track: { x: 424, y: 200 },
  sync: { x: 260, y: 344 },
  feedback: { x: 96, y: 200 },
};

const NODE_ORDER: SystemsNodeId[] = [
  "structure",
  "track",
  "sync",
  "feedback",
];

const DEFAULT_NODE: SystemsNodeId = "structure";
const LABFLOW_TEAL = "#3EC6D8";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return reduced;
}

function useFinePointer() {
  const [fine, setFine] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setFine(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return fine;
}

function edgeLit(
  from: SystemsNodeId,
  to: SystemsNodeId,
  activeId: SystemsNodeId | null,
): boolean {
  if (!activeId) return false;
  const i = NODE_ORDER.indexOf(activeId);
  const prev = NODE_ORDER[(i + 3) % 4];
  const next = NODE_ORDER[(i + 1) % 4];
  return (
    (from === activeId && to === next) || (from === prev && to === activeId)
  );
}

export function SystemsLoop() {
  const reducedMotion = usePrefersReducedMotion();
  const finePointer = useFinePointer();
  const [hovered, setHovered] = useState<SystemsNodeId | null>(null);
  const [focused, setFocused] = useState<SystemsNodeId | null>(null);
  const [selected, setSelected] = useState<SystemsNodeId | null>(DEFAULT_NODE);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelected(finePointer ? null : DEFAULT_NODE);
        setHovered(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [finePointer]);

  const activeId = useMemo(() => {
    if (selected) return selected;
    if (hovered) return hovered;
    if (focused) return focused;
    if (!finePointer) return DEFAULT_NODE;
    return null;
  }, [selected, hovered, focused, finePointer]);

  const activeNode = useMemo(
    () => SYSTEMS_NODES.find((n) => n.id === activeId) ?? null,
    [activeId],
  );

  const handleSelect = useCallback(
    (id: SystemsNodeId) => {
      setSelected((current) => {
        if (current === id && finePointer) return null;
        return id;
      });
    },
    [finePointer],
  );

  const handleKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLButtonElement>, id: SystemsNodeId) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setSelected(finePointer ? null : DEFAULT_NODE);
        return;
      }
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleSelect(id);
      }
    },
    [finePointer, handleSelect],
  );

  const captionText =
    activeNode?.caption ??
    "Hover or focus a node to see how LabFlow runs a lab.";

  const edgePaths = [
    ["structure", "track", "M 260 56 C 360 56, 424 120, 424 200"],
    ["track", "sync", "M 424 200 C 424 280, 360 344, 260 344"],
    ["sync", "feedback", "M 260 344 C 160 344, 96 280, 96 200"],
    ["feedback", "structure", "M 96 200 C 96 120, 160 56, 260 56"],
  ] as const;

  return (
    <div className="systems-loop">
      <div
        className="systems-loop__diagram"
        aria-label="LabFlow structure-track-sync-feedback loop"
      >
        <svg
          className="systems-loop__svg"
          viewBox="0 0 520 400"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <filter id="systems-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Base loop track */}
          <path
            d={LOOP_PATH}
            fill="none"
            stroke="rgba(242,240,234,0.12)"
            strokeWidth="1.5"
          />

          {/* Soft idle token crawl */}
          {!reducedMotion ? (
            <circle
              r="3.5"
              fill={LABFLOW_TEAL}
              opacity="0.55"
              filter="url(#systems-glow)"
            >
              <animateMotion dur="10s" repeatCount="indefinite" path={LOOP_PATH} />
            </circle>
          ) : null}

          {/* Lit edges when a node is active */}
          {edgePaths.map(([from, to, d]) => {
            const lit = edgeLit(from, to, activeId);
            const accent =
              SYSTEMS_NODES.find((n) => n.id === activeId)?.accent ??
              LABFLOW_TEAL;
            return (
              <path
                key={`${from}-${to}`}
                d={d}
                fill="none"
                stroke={lit ? accent : "transparent"}
                strokeWidth={lit ? 2.25 : 0}
                strokeOpacity={lit ? 0.85 : 0}
                style={{
                  transition: reducedMotion
                    ? "none"
                    : "stroke-opacity 180ms ease, stroke-width 180ms ease",
                }}
              />
            );
          })}

          {/* Soft pulse on active edge */}
          {!reducedMotion && activeId
            ? edgePaths
                .filter(([from, to]) => edgeLit(from, to, activeId))
                .map(([from, to, d]) => {
                  const accent =
                    SYSTEMS_NODES.find((n) => n.id === activeId)?.accent ??
                    LABFLOW_TEAL;
                  return (
                    <circle
                      key={`pulse-${from}-${to}`}
                      r="3"
                      fill={accent}
                      opacity="0.9"
                      filter="url(#systems-glow)"
                    >
                      <animateMotion dur="1.6s" repeatCount="indefinite" path={d} />
                    </circle>
                  );
                })
            : null}
        </svg>

        <ul className="systems-loop__nodes" role="list">
          {SYSTEMS_NODES.map((node) => {
            const pos = NODE_POSITIONS[node.id];
            const isActive = activeId === node.id;
            const isPressed = selected === node.id;
            return (
              <li
                key={node.id}
                className="systems-loop__node-wrap"
                style={{
                  left: `${(pos.x / 520) * 100}%`,
                  top: `${(pos.y / 400) * 100}%`,
                }}
              >
                <button
                  type="button"
                  className={[
                    "systems-loop__node",
                    isActive ? "is-active" : "",
                    isPressed ? "is-selected" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  style={{ ["--node-accent" as string]: node.accent }}
                  aria-pressed={isPressed}
                  aria-label={`${node.label}: ${node.sub}`}
                  onMouseEnter={() => {
                    if (finePointer) setHovered(node.id);
                  }}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setFocused(node.id)}
                  onBlur={() => setFocused(null)}
                  onClick={() => handleSelect(node.id)}
                  onKeyDown={(event) => handleKeyDown(event, node.id)}
                >
                  <span className="systems-loop__node-label">{node.label}</span>
                  <span className="systems-loop__node-sub">{node.sub}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <aside
        className={[
          "systems-loop__caption",
          activeNode ? "has-node" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        aria-live="polite"
      >
        {activeNode ? (
          <>
            <p
              className="systems-loop__caption-kicker"
              style={{ color: activeNode.accent }}
            >
              {activeNode.label}
            </p>
            <p className="systems-loop__caption-body">{captionText}</p>
            {selected !== null ? (
              <ul className="systems-loop__chips" aria-label="Tech details">
                {activeNode.chips.map((chip) => (
                  <li key={chip} className="systems-loop__chip">
                    {chip}
                  </li>
                ))}
              </ul>
            ) : null}
          </>
        ) : (
          <p className="systems-loop__caption-body systems-loop__caption-body--idle">
            {captionText}
          </p>
        )}
      </aside>
    </div>
  );
}

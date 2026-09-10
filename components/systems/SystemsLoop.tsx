"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";

export type SystemsNodeId = "sense" | "decide" | "act" | "report";

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
    id: "sense",
    index: 1,
    label: "Sense",
    sub: "IR · Ping · Cliff",
    accent: "#E8A04A",
    caption: "Scan the world — IR, ultrasonic, cliff sensors.",
    chips: ["ADC", "IR", "GPIO"],
  },
  {
    id: "decide",
    index: 2,
    label: "Decide",
    sub: "TM4C123 · C",
    accent: "#E8A04A",
    caption: "TM4C123 runs the control loop in C.",
    chips: ["TM4C123", "C"],
  },
  {
    id: "act",
    index: 3,
    label: "Act",
    sub: "PWM · Drive",
    accent: "#E8A04A",
    caption: "PWM drives the Create base.",
    chips: ["PWM", "Drive"],
  },
  {
    id: "report",
    index: 4,
    label: "Report",
    sub: "UART → TCP → GUI",
    accent: "#3EC6D8",
    caption: "UART + TCP stream to a Python GUI with live plots.",
    chips: ["UART", "TCP", "matplotlib"],
  },
];

const LOOP_PATH =
  "M 260 56 C 360 56, 424 120, 424 200 C 424 280, 360 344, 260 344 C 160 344, 96 280, 96 200 C 96 120, 160 56, 260 56";

const NODE_POSITIONS: Record<SystemsNodeId, { x: number; y: number }> = {
  sense: { x: 260, y: 56 },
  decide: { x: 424, y: 200 },
  act: { x: 260, y: 344 },
  report: { x: 96, y: 200 },
};

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
  const order: SystemsNodeId[] = ["sense", "decide", "act", "report"];
  const i = order.indexOf(activeId);
  const prev = order[(i + 3) % 4];
  const next = order[(i + 1) % 4];
  return (
    (from === activeId && to === next) || (from === prev && to === activeId)
  );
}

export function SystemsLoop() {
  const reducedMotion = usePrefersReducedMotion();
  const finePointer = useFinePointer();
  const [hovered, setHovered] = useState<SystemsNodeId | null>(null);
  const [focused, setFocused] = useState<SystemsNodeId | null>(null);
  const [selected, setSelected] = useState<SystemsNodeId | null>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelected(finePointer ? null : "sense");
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
    if (!finePointer) return "sense";
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
        setSelected(finePointer ? null : "sense");
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
    "Hover or focus a node to see how CyBot closes the loop.";

  return (
    <div className="systems-loop">
      <div className="systems-loop__diagram" aria-label="CyBot sense-decide-act-report loop">
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
            <circle r="3.5" fill="#E8A04A" opacity="0.55" filter="url(#systems-glow)">
              <animateMotion dur="10s" repeatCount="indefinite" path={LOOP_PATH} />
            </circle>
          ) : null}

          {/* Lit edges when a node is active */}
          {(
            [
              ["sense", "decide", "M 260 56 C 360 56, 424 120, 424 200"],
              ["decide", "act", "M 424 200 C 424 280, 360 344, 260 344"],
              ["act", "report", "M 260 344 C 160 344, 96 280, 96 200"],
              ["report", "sense", "M 96 200 C 96 120, 160 56, 260 56"],
            ] as const
          ).map(([from, to, d]) => {
            const lit = edgeLit(from, to, activeId);
            const accent =
              SYSTEMS_NODES.find((n) => n.id === activeId)?.accent ?? "#E8A04A";
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
            ? (
                [
                  ["sense", "decide", "M 260 56 C 360 56, 424 120, 424 200"],
                  ["decide", "act", "M 424 200 C 424 280, 360 344, 260 344"],
                  ["act", "report", "M 260 344 C 160 344, 96 280, 96 200"],
                  ["report", "sense", "M 96 200 C 96 120, 160 56, 260 56"],
                ] as const
              )
                .filter(([from, to]) => edgeLit(from, to, activeId))
                .map(([from, to, d]) => {
                  const accent =
                    SYSTEMS_NODES.find((n) => n.id === activeId)?.accent ??
                    "#E8A04A";
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
            <p className="systems-loop__caption-kicker" style={{ color: activeNode.accent }}>
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

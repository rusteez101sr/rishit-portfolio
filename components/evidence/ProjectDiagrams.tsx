import type { CSSProperties } from "react";

type DiagramProps = {
  accent: string;
  accentDark: string;
  label: string;
};

export function LabFlowDiagram({ accent, accentDark, label }: DiagramProps) {
  return (
    <svg
      className="evidence-svg"
      viewBox="0 0 640 400"
      role="img"
      aria-label={label}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="lf-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.16" />
          <stop offset="100%" stopColor="#efece5" />
        </linearGradient>
      </defs>
      <rect width="640" height="400" fill="url(#lf-bg)" rx="12" />
      {/* App chrome */}
      <rect x="48" y="40" width="544" height="320" rx="14" fill="#fbfaf7" stroke={accent} strokeOpacity="0.35" />
      <rect x="48" y="40" width="544" height="44" rx="14" fill={accent} fillOpacity="0.12" />
      <rect x="48" y="70" width="544" height="14" fill={accent} fillOpacity="0.12" />
      <text x="72" y="68" fontFamily="ui-sans-serif, system-ui" fontSize="14" fontWeight="600" fill={accentDark}>
        LabFlow · Checkpoint workflow
      </text>
      {/* Sidebar */}
      <rect x="64" y="100" width="140" height="240" rx="10" fill={accent} fillOpacity="0.06" stroke={accent} strokeOpacity="0.2" />
      {["Labs", "Parts", "Checkpoints", "Feedback"].map((t, i) => (
        <g key={t}>
          <rect
            x="76"
            y={116 + i * 48}
            width="116"
            height="32"
            rx="8"
            fill={i === 2 ? accent : "#efece5"}
            fillOpacity={i === 2 ? 0.22 : 1}
          />
          <text
            x="134"
            y={136 + i * 48}
            textAnchor="middle"
            fontFamily="ui-sans-serif, system-ui"
            fontSize="12"
            fill={i === 2 ? accentDark : "#716d66"}
          >
            {t}
          </text>
        </g>
      ))}
      {/* Checkpoint list */}
      {[
        { label: "01  Setup environment", done: true },
        { label: "02  Implement core API", done: true },
        { label: "03  TA rubric review", done: false },
        { label: "04  Submit artifacts", done: false },
      ].map((row, i) => (
        <g key={row.label}>
          <rect
            x="224"
            y={112 + i * 52}
            width="348"
            height="40"
            rx="10"
            fill="#fff"
            stroke={accent}
            strokeOpacity={row.done ? 0.45 : 0.18}
          />
          <circle
            cx="248"
            cy={132 + i * 52}
            r="8"
            fill={row.done ? accent : "transparent"}
            stroke={accent}
            strokeWidth="2"
          />
          {row.done ? (
            <path
              d={`M243 ${132 + i * 52} l3.5 3.5 7 -8`}
              fill="none"
              stroke="#fbfaf7"
              strokeWidth="2"
              strokeLinecap="round"
            />
          ) : null}
          <text
            x="268"
            y={137 + i * 52}
            fontFamily="ui-sans-serif, system-ui"
            fontSize="13"
            fill="#181817"
          >
            {row.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function CyBotDiagram({ accent, accentDark, label }: DiagramProps) {
  return (
    <svg
      className="evidence-svg"
      viewBox="0 0 640 400"
      role="img"
      aria-label={label}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="cy-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.18" />
          <stop offset="100%" stopColor="#efece5" />
        </linearGradient>
      </defs>
      <rect width="640" height="400" fill="url(#cy-bg)" rx="12" />
      {/* Field */}
      <rect x="56" y="48" width="528" height="304" rx="16" fill="#fbfaf7" stroke={accent} strokeOpacity="0.3" />
      {/* Grid dots */}
      {Array.from({ length: 8 }).map((_, r) =>
        Array.from({ length: 12 }).map((__, c) => (
          <circle
            key={`${r}-${c}`}
            cx={90 + c * 40}
            cy={80 + r * 34}
            r="1.5"
            fill={accent}
            fillOpacity="0.25"
          />
        )),
      )}
      {/* Scan arc */}
      <path
        d="M320 250 L180 120 A190 190 0 0 1 460 120 Z"
        fill={accent}
        fillOpacity="0.12"
        stroke={accent}
        strokeOpacity="0.45"
        strokeWidth="2"
      />
      {/* Ping blips */}
      <circle cx="230" cy="150" r="6" fill={accent} fillOpacity="0.7" />
      <circle cx="360" cy="130" r="5" fill={accentDark} fillOpacity="0.55" />
      <circle cx="420" cy="170" r="7" fill={accent} fillOpacity="0.55" />
      {/* Bot top-down */}
      <g transform="translate(320 250)">
        <rect x="-28" y="-22" width="56" height="44" rx="14" fill={accent} fillOpacity="0.85" />
        <circle cx="-14" cy="0" r="6" fill="#fbfaf7" />
        <circle cx="14" cy="0" r="6" fill="#fbfaf7" />
        <rect x="-8" y="-28" width="16" height="10" rx="3" fill={accentDark} />
      </g>
      <text
        x="72"
        y="330"
        fontFamily="ui-sans-serif, system-ui"
        fontSize="13"
        fill={accentDark}
      >
        IR / ping scan · live Cartesian plot
      </text>
    </svg>
  );
}

export function AiDocDiagram({ accent, accentDark, label }: DiagramProps) {
  return (
    <svg
      className="evidence-svg"
      viewBox="0 0 640 400"
      role="img"
      aria-label={label}
      xmlns="http://www.w3.org/2000/svg"
      style={{ ["--accent" as string]: accent } as CSSProperties}
    >
      <defs>
        <linearGradient id="ai-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.16" />
          <stop offset="100%" stopColor="#efece5" />
        </linearGradient>
      </defs>
      <rect width="640" height="400" fill="url(#ai-bg)" rx="12" />
      {/* PDF doc */}
      <rect x="64" y="56" width="200" height="280" rx="12" fill="#fbfaf7" stroke={accent} strokeOpacity="0.35" />
      <rect x="84" y="80" width="160" height="12" rx="4" fill={accent} fillOpacity="0.25" />
      <rect x="84" y="108" width="140" height="8" rx="3" fill="#716d66" fillOpacity="0.25" />
      <rect x="84" y="126" width="152" height="8" rx="3" fill="#716d66" fillOpacity="0.2" />
      <rect x="84" y="144" width="120" height="8" rx="3" fill="#716d66" fillOpacity="0.2" />
      <rect x="84" y="176" width="160" height="72" rx="8" fill={accent} fillOpacity="0.08" stroke={accent} strokeOpacity="0.25" strokeDasharray="4 3" />
      <text x="164" y="216" textAnchor="middle" fontFamily="ui-sans-serif, system-ui" fontSize="12" fill={accentDark}>
        Clinical PDF
      </text>
      <rect x="84" y="268" width="130" height="8" rx="3" fill="#716d66" fillOpacity="0.18" />
      <rect x="84" y="286" width="100" height="8" rx="3" fill="#716d66" fillOpacity="0.15" />
      {/* Arrow */}
      <path d="M292 196 H348" stroke={accent} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M340 188 L352 196 L340 204" fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <text x="320" y="178" textAnchor="middle" fontFamily="ui-sans-serif, system-ui" fontSize="11" fill={accentDark}>
        OCR + RAG
      </text>
      {/* Structured fields */}
      <rect x="368" y="72" width="208" height="248" rx="12" fill="#fbfaf7" stroke={accent} strokeOpacity="0.35" />
      <text x="388" y="104" fontFamily="ui-sans-serif, system-ui" fontSize="13" fontWeight="600" fill={accentDark}>
        Extracted fields
      </text>
      {[
        ["Lot ID", "CS-20491"],
        ["Protocol", "SUP-118"],
        ["Status", "Non-GMP"],
        ["Query hit", "§4.2 dosage"],
      ].map(([k, v], i) => (
        <g key={k}>
          <rect x="388" y={124 + i * 44} width="168" height="36" rx="8" fill={accent} fillOpacity="0.08" />
          <text x="400" y={140 + i * 44} fontFamily="ui-sans-serif, system-ui" fontSize="11" fill="#716d66">
            {k}
          </text>
          <text x="400" y={154 + i * 44} fontFamily="ui-sans-serif, system-ui" fontSize="13" fontWeight="500" fill="#181817">
            {v}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function ProjectEvidenceDiagram({
  slug,
  accent,
  accentDark,
  label,
}: {
  slug: string;
  accent: string;
  accentDark: string;
  label: string;
}) {
  if (slug === "labflow") {
    return <LabFlowDiagram accent={accent} accentDark={accentDark} label={label} />;
  }
  if (slug === "cybot") {
    return <CyBotDiagram accent={accent} accentDark={accentDark} label={label} />;
  }
  return <AiDocDiagram accent={accent} accentDark={accentDark} label={label} />;
}

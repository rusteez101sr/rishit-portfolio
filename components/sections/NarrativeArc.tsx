import { SectionShell } from "@/components/ui/SectionShell";

const stages = ["Software", "Hardware", "Intelligent Systems"];

export function NarrativeArc() {
  return (
    <SectionShell id="arc" index="03" title="Software → Hardware → Intelligent Systems">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
        }}
      >
        {stages.map((label) => (
          <div
            key={label}
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-card)",
              padding: "1.25rem 1.35rem",
            }}
          >
            <h3
              style={{
                margin: "0 0 0.5rem",
                fontFamily: "var(--font-display)",
                fontSize: "1.35rem",
                fontWeight: 500,
              }}
            >
              {label}
            </h3>
            <p className="placeholder-copy" style={{ fontSize: "0.95rem" }}>
              Details coming soon.
            </p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

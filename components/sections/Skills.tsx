import { SectionShell } from "@/components/ui/SectionShell";
import { skillGroups } from "@/data/skills";

export function Skills() {
  return (
    <SectionShell id="skills" index="06" title="Skills">
      {skillGroups.length === 0 ? (
        <p className="placeholder-copy">Toolbox details coming soon.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1rem",
          }}
        >
          {skillGroups.map((group) => (
            <div
              key={group.id}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-card)",
                padding: "1.25rem",
              }}
            >
              <h3 style={{ margin: "0 0 0.75rem", fontSize: "1rem" }}>
                {group.label}
              </h3>
              <ul style={{ margin: 0, paddingLeft: "1.1rem", color: "var(--text-2)" }}>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </SectionShell>
  );
}

import { SectionShell } from "@/components/ui/SectionShell";
import { experience } from "@/data/experience";

export function Experience() {
  return (
    <SectionShell id="experience" index="07" title="Experience">
      {experience.length === 0 ? (
        <p className="placeholder-copy">Experience entries coming soon.</p>
      ) : (
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "1rem" }}>
          {experience.map((item) => (
            <li
              key={item.id}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-card)",
                padding: "1.25rem 1.35rem",
              }}
            >
              <h3 style={{ margin: "0 0 0.25rem", fontFamily: "var(--font-display)", fontSize: "1.35rem", fontWeight: 500 }}>
                {item.role}
              </h3>
              <p style={{ margin: 0, color: "var(--text-2)" }}>{item.org}</p>
              {item.summary ? (
                <p className="placeholder-copy" style={{ marginTop: "0.75rem" }}>
                  {item.summary}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </SectionShell>
  );
}

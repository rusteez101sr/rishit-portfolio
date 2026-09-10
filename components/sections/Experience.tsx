import { SectionShell } from "@/components/ui/SectionShell";
import { experience } from "@/data/experience";
import type { ExperienceItem } from "@/lib/types";

function formatTenure(item: ExperienceItem) {
  const parts: string[] = [];
  if (item.location) parts.push(item.location);
  if (item.start || item.end) {
    const start = item.start ?? "";
    const end = item.end ?? "Present";
    parts.push(start && end ? `${start} – ${end}` : start || end);
  }
  return parts.join(" · ");
}

function ExperienceEntry({ item }: { item: ExperienceItem }) {
  const tenure = formatTenure(item);
  const highlights = (item.highlights ?? []).slice(0, 3);

  return (
    <li className="experience__item">
      <span className="experience__dot" aria-hidden="true" />
      <div className="experience__body">
        <h3 className="experience__role">{item.role}</h3>
        <p className="experience__org">{item.org}</p>
        {tenure ? <p className="experience__meta">{tenure}</p> : null}
        {item.summary ? (
          <p className="experience__summary">{item.summary}</p>
        ) : null}
        {highlights.length > 0 ? (
          <ul className="experience__highlights">
            {highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </li>
  );
}

export function Experience() {
  return (
    <SectionShell
      id="experience"
      title="Experience"
      className="experience"
    >
      <p className="experience__dek">
        Roles and collaborations — added as they&apos;re ready.
      </p>

      {experience.length === 0 ? (
        <div className="experience__empty">
          <p className="experience__empty-copy">
            Technical roles will appear here. Education lives in About for now.
          </p>
          <a href="#about" className="experience__empty-link">
            About →
          </a>
        </div>
      ) : (
        <ol className="experience__timeline">
          {experience.map((item) => (
            <ExperienceEntry key={item.id} item={item} />
          ))}
        </ol>
      )}
    </SectionShell>
  );
}

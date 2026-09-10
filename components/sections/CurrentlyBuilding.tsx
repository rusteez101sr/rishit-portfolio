import { SectionShell } from "@/components/ui/SectionShell";
import { building } from "@/data/building";
import type { BuildingStatus } from "@/lib/types";

function statusTone(status: BuildingStatus): "violet" | "teal" | "amber" {
  if (status === "Learning" || status === "Researching") return "violet";
  if (status === "Testing") return "amber";
  return "teal";
}

export function CurrentlyBuilding() {
  return (
    <SectionShell
      id="building"
      index="08"
      title="Currently building"
      className="building"
    >
      <p className="building__dek">Alive work — states, not percentages.</p>

      <ul className="building__grid">
        {building.map((item) => {
          const tone = statusTone(item.status);
          const hasHref = Boolean(item.href);

          const inner = (
            <>
              <span className={`building__status building__status--${tone}`}>
                {item.status}
              </span>
              <h3 className="building__title">{item.title}</h3>
              <p className="building__blurb">{item.blurb}</p>
              {hasHref ? (
                <span className="building__cta" aria-hidden="true">
                  Open →
                </span>
              ) : null}
            </>
          );

          return (
            <li key={item.id} className="building__card-wrap">
              {hasHref && item.href ? (
                <a
                  href={item.href}
                  className="building__card building__card--link"
                  aria-label={`${item.title} — ${item.status}`}
                >
                  {inner}
                </a>
              ) : (
                <div
                  className="building__card building__card--static"
                  aria-label={`${item.title} — ${item.status}`}
                >
                  {inner}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </SectionShell>
  );
}

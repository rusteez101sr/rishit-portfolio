import { SectionShell } from "@/components/ui/SectionShell";
import { site } from "@/data/site";

export function Contact() {
  return (
    <SectionShell id="contact" index="09" title="Contact">
      {site.email ? (
        <p className="placeholder-copy">
          <a href={`mailto:${site.email}`} style={{ textDecoration: "underline" }}>
            {site.email}
          </a>
        </p>
      ) : (
        <p className="placeholder-copy">Contact details coming soon.</p>
      )}
      {site.socials.length > 0 ? (
        <ul style={{ listStyle: "none", margin: "1rem 0 0", padding: 0, display: "flex", gap: "1rem" }}>
          {site.socials.map((social) => (
            <li key={social.href}>
              <a href={social.href} style={{ textDecoration: "underline", color: "var(--text-2)" }}>
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </SectionShell>
  );
}

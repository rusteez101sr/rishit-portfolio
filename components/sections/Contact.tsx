import { SectionShell } from "@/components/ui/SectionShell";
import { site } from "@/data/site";

export function Contact() {
  const hasEmail = Boolean(site.email);
  const hasSocials = site.socials.length > 0;
  const hasContacts = hasEmail || hasSocials;

  return (
    <SectionShell
      id="contact"
      index="09"
      title="Let’s build something."
      className="contact"
    >
      <p className="contact__supporting">
        Open to thoughtful collaborations, research chats, and building real
        systems.
      </p>

      {hasContacts ? (
        <ul className="contact__pills">
          {hasEmail && site.email ? (
            <li>
              <a href={`mailto:${site.email}`} className="contact__pill">
                Email me
              </a>
            </li>
          ) : null}
          {site.socials.map((social) => (
            <li key={social.href}>
              <a
                href={social.href}
                className="contact__pill"
                rel="noopener noreferrer"
                target="_blank"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <div className="contact__pending">
          <p className="contact__pending-note">
            Contact links will land here soon.
          </p>
          <a href="#featured" className="contact__back">
            Back to work ↑
          </a>
        </div>
      )}
    </SectionShell>
  );
}

import { SectionShell } from "@/components/ui/SectionShell";

export function About() {
  return (
    <SectionShell id="about" title="About" className="about">
      <div className="about__layout">
        <div className="about__prose">
          <p>
            I started in Computer Engineering at Nirma University, then
            continued at Iowa State University — still chasing how software
            meets the physical world.
          </p>
          <p>
            I&apos;m drawn to work that spans products people touch, systems
            that run close to hardware, and intelligence that has to be
            reliable — not just impressive in a demo.
          </p>
          <p className="about__prose-map">
            This portfolio is a map of that path.
          </p>
        </div>

        <aside className="about__path" aria-label="Education path">
          <p className="about__path-label">PATH</p>
          <ol className="about__path-list">
            <li className="about__path-step">
              <span className="about__path-school">Nirma University</span>
              <span className="about__path-field">Computer Engineering</span>
            </li>
            <li className="about__path-arrow" aria-hidden="true">
              →
            </li>
            <li className="about__path-step">
              <span className="about__path-school">Iowa State University</span>
              <span className="about__path-field">Computer Engineering</span>
            </li>
          </ol>
        </aside>
      </div>
    </SectionShell>
  );
}

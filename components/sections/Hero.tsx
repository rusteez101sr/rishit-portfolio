import { site } from "@/data/site";

export function Hero() {
  return (
    <section id="hero" className="section-shell" aria-labelledby="hero-title">
      <div
        className="section-inner"
        style={{ paddingBlock: "clamp(96px, 16vh, 160px)" }}
      >
        <p className="section-index">01</p>
        <h1
          id="hero-title"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(40px, 6vw, 72px)",
            fontWeight: 500,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            margin: "0 0 1.25rem",
            maxWidth: "14ch",
          }}
        >
          {site.name}
        </h1>
        <p className="placeholder-copy">
          Software → Hardware → Intelligent Systems
        </p>
      </div>
    </section>
  );
}

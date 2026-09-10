export function Hero() {
  return (
    <section id="hero" className="hero" aria-labelledby="hero-title">
      <div className="hero__inner">
        <h1
          id="hero-title"
          className="hero__headline hero__enter"
          style={{ ["--enter-i" as string]: 0 }}
        >
          <span className="hero__headline-line">
            I build across software, hardware
          </span>
          <span className="hero__headline-line">
            <em className="hero__italic">&amp; intelligence.</em>
          </span>
        </h1>

        <p
          className="hero__supporting hero__enter"
          style={{ ["--enter-i" as string]: 1 }}
        >
          Computer Engineering · Iowa State. Building LabFlow, CyBot, and AI
          document systems.
        </p>

        <a
          href="#work"
          className="hero__cta hero__enter"
          style={{ ["--enter-i" as string]: 2 }}
        >
          See selected work ↓
        </a>
      </div>

      <a href="#work" className="hero__scroll" aria-label="Scroll to selected work">
        <span className="hero__scroll-chevron" aria-hidden="true">
          ↓
        </span>
      </a>
    </section>
  );
}

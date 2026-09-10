"use client";

import BlurText from "@/components/react-bits/BlurText";

export function Hero() {
  return (
    <section id="hero" className="hero" aria-labelledby="hero-title">
      <div className="hero__inner">
        <h1 id="hero-title" className="hero__headline">
          <BlurText
            text="I build across software, hardware"
            animateBy="words"
            direction="top"
            delay={70}
            stepDuration={0.28}
            className="hero__headline-line hero__blur-line"
          />
          <span
            className="hero__headline-line hero__enter"
            style={{ ["--enter-i" as string]: 1 }}
          >
            <span className="hero__amp">&amp; intelligence.</span>
          </span>
        </h1>

        <p
          className="hero__supporting hero__enter"
          style={{ ["--enter-i" as string]: 2 }}
        >
          Computer Engineering · Iowa State. Building LabFlow, CyBot, and AI
          document systems.
        </p>

        <a
          href="#work"
          className="hero__cta hero__enter"
          style={{ ["--enter-i" as string]: 3 }}
        >
          See selected work ↓
        </a>
      </div>
    </section>
  );
}

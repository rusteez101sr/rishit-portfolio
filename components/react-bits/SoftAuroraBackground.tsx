"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";

const SoftAurora = dynamic(() => import("./SoftAurora"), { ssr: false });

function subscribeMedia(query: string, onChange: () => void) {
  const mq = window.matchMedia(query);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function useMediaQuery(query: string, serverFallback = false) {
  return useSyncExternalStore(
    (onChange) => subscribeMedia(query, onChange),
    () => window.matchMedia(query).matches,
    () => serverFallback,
  );
}

/**
 * Primary site atmosphere — fixed full-viewport SoftAurora behind content.
 * Ambient only: no mouse interaction (GlowCursor handles follow).
 */
export function SoftAuroraBackground() {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  return (
    <div className="soft-aurora-bg" aria-hidden="true">
      <SoftAurora
        color1="#3EC6D8"
        color2="#9B8CFF"
        lightMode={false}
        brightness={0.75}
        speed={reduceMotion ? 0.1 : 0.35}
        enableMouseInteraction={false}
        scale={1.45}
        bandHeight={0.48}
        bandSpread={1.05}
      />
    </div>
  );
}

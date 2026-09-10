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
 * Mouse interaction only on fine desktop pointers; disabled for touch / reduced-motion.
 */
export function SoftAuroraBackground() {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const enableMouse = !reduceMotion && finePointer;

  return (
    <div className="soft-aurora-bg" aria-hidden="true">
      <SoftAurora
        color1="#3EC6D8"
        color2="#9B8CFF"
        lightMode={false}
        brightness={0.65}
        speed={reduceMotion ? 0.12 : 0.5}
        mouseInfluence={0.25}
        enableMouseInteraction={enableMouse}
        scale={1.45}
        bandHeight={0.48}
        bandSpread={1.05}
      />
    </div>
  );
}

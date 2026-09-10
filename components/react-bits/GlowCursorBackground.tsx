"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";

const GlowCursor = dynamic(() => import("./GlowCursor"), { ssr: false });

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
 * Real mouse-follow glow trail — fixed between SoftAurora and page content.
 * Fine pointer + !prefers-reduced-motion only; never blocks clicks.
 */
export function GlowCursorBackground() {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const enabled = !reduceMotion && finePointer;

  if (!enabled) return null;

  return (
    <div className="glow-cursor-bg" aria-hidden="true">
      <GlowCursor
        color="#3EC6D8"
        secondaryColor="#9B8CFF"
        trailLength={28}
        trailWidth={34}
        trailTaper={0.7}
        followSpeed={0.22}
        glowIntensity={1.0}
        glowSpread={1.4}
        hotspot={0.42}
        brightness={1.1}
        opacity={0.65}
        pulseSpeed={0}
        noiseStrength={0.01}
        idleFade
        idleTimeout={1800}
        fadeDuration={900}
        blendMode="screen"
        enabled
        className="h-full w-full"
      />
    </div>
  );
}

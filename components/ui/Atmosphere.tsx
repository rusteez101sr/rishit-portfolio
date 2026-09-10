"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

type AtmosphereContextValue = {
  setAccentTint: (accent: string | null) => void;
};

const AtmosphereContext = createContext<AtmosphereContextValue>({
  setAccentTint: () => {},
});

export function useAtmosphere() {
  return useContext(AtmosphereContext);
}

function AtmosphereLayer({ accentTint }: { accentTint: string | null }) {
  const glowRef = useRef<HTMLDivElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0.5, y: 0.42 });
  const current = useRef({ x: 0.5, y: 0.42 });
  const raf = useRef(0);
  const followEnabled = useRef(true);
  const smoothing = 0.1;

  const apply = useCallback(() => {
    const x = `${(current.current.x * 100).toFixed(3)}%`;
    const y = `${(current.current.y * 100).toFixed(3)}%`;
    if (glowRef.current) {
      glowRef.current.style.setProperty("--ax", x);
      glowRef.current.style.setProperty("--ay", y);
    }
    if (accentRef.current) {
      accentRef.current.style.setProperty("--ax", x);
      accentRef.current.style.setProperty("--ay", y);
    }
  }, []);

  useEffect(() => {
    const reduceMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarseMq = window.matchMedia("(hover: none), (pointer: coarse)");

    const syncFollow = () => {
      followEnabled.current = !reduceMq.matches && !coarseMq.matches;
      if (!followEnabled.current) {
        target.current = { x: 0.5, y: 0.42 };
        current.current = { x: 0.5, y: 0.42 };
        apply();
      }
    };

    syncFollow();
    reduceMq.addEventListener("change", syncFollow);
    coarseMq.addEventListener("change", syncFollow);

    const onMove = (event: PointerEvent) => {
      if (!followEnabled.current) return;
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      target.current = {
        x: Math.min(1, Math.max(0, event.clientX / w)),
        y: Math.min(1, Math.max(0, event.clientY / h)),
      };
    };

    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * smoothing;
      current.current.y += (target.current.y - current.current.y) * smoothing;
      apply();
      raf.current = window.requestAnimationFrame(tick);
    };

    apply();
    raf.current = window.requestAnimationFrame(tick);
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      window.cancelAnimationFrame(raf.current);
      window.removeEventListener("pointermove", onMove);
      reduceMq.removeEventListener("change", syncFollow);
      coarseMq.removeEventListener("change", syncFollow);
    };
  }, [apply]);

  useEffect(() => {
    if (!accentRef.current) return;
    if (accentTint) {
      accentRef.current.style.setProperty("--atm-accent", accentTint);
      accentRef.current.classList.add("is-on");
    } else {
      accentRef.current.classList.remove("is-on");
    }
  }, [accentTint]);

  return (
    <div className="atmosphere" aria-hidden="true">
      <div ref={glowRef} className="atmosphere__glow" />
      <div ref={accentRef} className="atmosphere__accent" />
      <div className="atmosphere__grain" />
    </div>
  );
}

export function AtmosphereProvider({ children }: { children: ReactNode }) {
  const [accentTint, setAccentTintState] = useState<string | null>(null);
  const setAccentTint = useCallback((accent: string | null) => {
    setAccentTintState(accent);
  }, []);
  const value = useMemo(() => ({ setAccentTint }), [setAccentTint]);

  return (
    <AtmosphereContext.Provider value={value}>
      <AtmosphereLayer accentTint={accentTint} />
      {children}
    </AtmosphereContext.Provider>
  );
}

"use client";

import {
  useRef,
  useState,
  type CSSProperties,
  type FocusEventHandler,
  type MouseEventHandler,
  type ReactNode,
} from "react";

interface Position {
  x: number;
  y: number;
}

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  spotlightColor?: `rgba(${number}, ${number}, ${number}, ${number})`;
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: MouseEventHandler<HTMLDivElement>;
  onFocus?: FocusEventHandler<HTMLDivElement>;
  onBlur?: FocusEventHandler<HTMLDivElement>;
}

/**
 * SpotlightCard (React Bits, TS+Tailwind) — chrome stripped so callers own layout.
 * Default border/bg/padding removed to wrap existing portfolio cards cleanly.
 */
export default function SpotlightCard({
  children,
  className = "",
  style,
  spotlightColor = "rgba(255, 255, 255, 0.25)",
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    if (!divRef.current || isFocused) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus: FocusEventHandler<HTMLDivElement> = (e) => {
    setIsFocused(true);
    setOpacity(0.6);
    onFocus?.(e);
  };

  const handleBlur: FocusEventHandler<HTMLDivElement> = (e) => {
    setIsFocused(false);
    setOpacity(0);
    onBlur?.(e);
  };

  const handleMouseEnter: MouseEventHandler<HTMLDivElement> = (e) => {
    setOpacity(0.6);
    onMouseEnter?.(e);
  };

  const handleMouseLeave: MouseEventHandler<HTMLDivElement> = (e) => {
    setOpacity(0);
    onMouseLeave?.(e);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
      style={style}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 ease-in-out"
        style={{
          opacity,
          background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
        }}
        aria-hidden="true"
      />
      {children}
    </div>
  );
}

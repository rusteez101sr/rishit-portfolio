"use client";

import { useRef, type ReactNode } from "react";
import { useInViewOnce, useIsClient } from "@/lib/motion";

type SectionShellProps = {
  id: string;
  index?: string;
  title?: string;
  children: ReactNode;
  className?: string;
};

export function SectionShell({
  id,
  index,
  title,
  children,
  className = "",
}: SectionShellProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInViewOnce(ref);
  const armed = useIsClient();

  return (
    <section
      ref={ref}
      id={id}
      className={[
        "section-shell",
        "section-reveal",
        armed && !inView ? "is-pending" : "",
        inView ? "is-inview" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-labelledby={title ? `${id}-title` : undefined}
    >
      <div className="section-inner">
        {index ? <p className="section-index">{index}</p> : null}
        {title ? (
          <h2 id={`${id}-title`} className="section-title">
            {title}
          </h2>
        ) : null}
        {children}
      </div>
    </section>
  );
}

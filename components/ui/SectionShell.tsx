import type { ReactNode } from "react";

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
  return (
    <section id={id} className={`section-shell ${className}`.trim()} aria-labelledby={title ? `${id}-title` : undefined}>
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

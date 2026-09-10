import { withBasePath } from "@/lib/basePath";

/**
 * Fixed full-viewport computer-engineering photographic blur wash.
 * Static only — GlowCursor is the sole pointer follow.
 */
export function CeBlurBackground() {
  return (
    <div className="bg-ce" aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="bg-ce__img"
        src={withBasePath("/bg/ce-blur-source.jpg")}
        alt=""
        decoding="async"
        fetchPriority="low"
      />
      <div className="bg-ce__veil" />
    </div>
  );
}

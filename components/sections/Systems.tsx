"use client";

import { SystemsLoop } from "@/components/systems/SystemsLoop";
import { SectionShell } from "@/components/ui/SectionShell";

export function Systems() {
  return (
    <SectionShell
      id="systems"
      index="SYSTEMS"
      title="How a CyBot thinks"
      className="systems"
    >
      <p className="systems__lede">
        Sense → decide → act → report — the CprE 288 loop, made visible.
      </p>
      <SystemsLoop />
    </SectionShell>
  );
}

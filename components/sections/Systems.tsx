"use client";

import { SystemsLoop } from "@/components/systems/SystemsLoop";
import { SectionShell } from "@/components/ui/SectionShell";

export function Systems() {
  return (
    <SectionShell
      id="systems"
      index="SYSTEMS"
      title="How LabFlow runs a lab"
      className="systems"
    >
      <p className="systems__lede">
        Checkpoints → progress → backend → feedback — the platform loop behind
        my strongest project.
      </p>
      <SystemsLoop />
    </SectionShell>
  );
}

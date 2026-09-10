import type { Metadata } from "next";
import { About } from "@/components/sections/About";
import { Systems } from "@/components/sections/Systems";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Info — Rishit Dwivedi",
  description:
    "About, experience, toolbox, and contact for Rishit Dwivedi — Computer Engineer.",
};

export default function InfoPage() {
  return (
    <main className="info-page">
      <About />
      <Systems />
      <Experience />
      <Skills />
      <Contact />
    </main>
  );
}

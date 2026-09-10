import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { NarrativeArc } from "@/components/sections/NarrativeArc";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { ProjectCollection } from "@/components/sections/ProjectCollection";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { CurrentlyBuilding } from "@/components/sections/CurrentlyBuilding";
import { Contact } from "@/components/sections/Contact";
import { getFeaturedProjects } from "@/data/projects";

export default function Home() {
  const featured = getFeaturedProjects();

  return (
    <main>
      <Hero />
      <About />
      <NarrativeArc />
      <FeaturedWork projects={featured} />
      <ProjectCollection />
      <Skills />
      <Experience />
      <CurrentlyBuilding />
      <Contact />
    </main>
  );
}

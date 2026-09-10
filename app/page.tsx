import { Hero } from "@/components/sections/Hero";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { getFeaturedProjects } from "@/data/projects";

export default function Home() {
  const featured = getFeaturedProjects().slice(0, 3);

  return (
    <main>
      <Hero />
      <SelectedWork projects={featured} />
    </main>
  );
}

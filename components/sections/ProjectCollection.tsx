import type { CSSProperties } from "react";
import { SectionShell } from "@/components/ui/SectionShell";
import { getFeaturedProjects } from "@/data/projects";

export function ProjectCollection() {
  const projects = getFeaturedProjects();

  return (
    <SectionShell
      id="projects"
      index="05"
      title="Selected work"
      className="project-collection"
    >
      <p className="project-collection__dek">
        A denser look at the same craft — built to grow.
      </p>

      <div className="project-collection__track">
        {projects.map((project) => {
          const category = project.categories[0];
          const techs = project.technologies.slice(0, 3);

          return (
            <a
              key={project.id}
              href={`/work/${project.slug}`}
              className="project-cell"
              style={
                {
                  ["--cell-accent" as string]: project.accent,
                } as CSSProperties
              }
              aria-label={`${project.title} — view project`}
            >
              {category ? (
                <span className="project-cell__category">{category}</span>
              ) : null}
              <h3 className="project-cell__title">{project.title}</h3>
              {project.summary ? (
                <p className="project-cell__summary">{project.summary}</p>
              ) : null}
              {techs.length > 0 ? (
                <ul className="project-cell__techs">
                  {techs.map((tech) => (
                    <li key={tech} className="project-cell__tech">
                      {tech}
                    </li>
                  ))}
                </ul>
              ) : null}
            </a>
          );
        })}
      </div>
    </SectionShell>
  );
}

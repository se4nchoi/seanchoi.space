import React from "react";
import type { AppLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/container";
import { PageIntro } from "@/components/ui/page-intro";
import { canonicalContentRegistry } from "@/data/content";
import { ProjectCard } from "@/components/ui/project-card";

export interface ProjectsIndexViewProps {
  locale: AppLocale;
}

export function ProjectsIndexView({ locale }: ProjectsIndexViewProps) {
  const dict = getDictionary(locale);
  const projects = canonicalContentRegistry.projects.filter(
    (p) => p.locale === locale && p.publicationStatus === "public"
  );

  // Honest empty state when no public projects exist
  if (projects.length === 0) {
    return (
      <Container size="default" className="space-y-12 pb-16">
        <PageIntro
          title={dict.projects}
          summary={dict.projectsStatus}
        />
        <div className="rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface)] p-6 text-[length:var(--text-small)] text-[var(--muted)] leading-[var(--leading-relaxed)]">
          <p>{dict.projectsStatus}</p>
        </div>
      </Container>
    );
  }

  return (
    <Container size="default" className="space-y-12 pb-16">
      <PageIntro
        title={dict.projects}
        summary={dict.projectsStatus}
      />
      <section aria-label={dict.projects} className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          {projects.map((project) => {
            const detailHref =
              locale === "ko"
                ? `/ko/projects/${project.slug}`
                : `/projects/${project.slug}`;
            return (
              <ProjectCard
                key={project.id}
                title={project.title}
                summary={project.summary}
                status={project.status}
                statusLabel={project.status}
                role={project.role}
                tags={project.topics}
                href={detailHref}
                headingLevel={2}
              />
            );
          })}
        </div>
      </section>
    </Container>
  );
}

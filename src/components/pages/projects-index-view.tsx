import React from "react";
import type { AppLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/container";
import { PageIntro } from "@/components/ui/page-intro";
import { ProjectCard } from "@/components/ui/project-card";
import {
  skeletonProjectEn,
  skeletonProjectKo,
} from "@/data/skeleton-preview";

export interface ProjectsIndexViewProps {
  locale: AppLocale;
}

export function ProjectsIndexView({ locale }: ProjectsIndexViewProps) {
  const dict = getDictionary(locale);
  const isKo = locale === "ko";
  const project = isKo ? skeletonProjectKo : skeletonProjectEn;
  const detailHref = isKo ? "/ko/projects/example-project" : "/projects/example-project";

  return (
    <Container size="default" className="space-y-12 pb-16">
      <div className="space-y-6">
        <PageIntro
          eyebrow={dict.skeleton.eyebrow}
          title={dict.projects}
          summary={dict.skeleton.direction}
        />
        <div className="rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface)] p-4 text-[length:var(--text-small)] text-[var(--muted)] leading-[var(--leading-relaxed)]">
          {dict.skeleton.notice}
        </div>
      </div>

      {/* Single Representative Project Skeleton */}
      <section className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <ProjectCard
            title={project.title}
            summary={project.summary}
            status="in-progress"
            statusLabel={dict.skeleton.inProgress}
            role={project.role}
            tags={project.topics}
            href={detailHref}
            headingLevel={2}
          />
        </div>
      </section>
    </Container>
  );
}

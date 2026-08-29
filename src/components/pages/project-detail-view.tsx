import React from "react";
import Link from "next/link";
import type { AppLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/container";
import { PageIntro } from "@/components/ui/page-intro";
import { Prose } from "@/components/ui/prose";
import {
  skeletonProjectEn,
  skeletonProjectKo,
  skeletonProjectNarrative,
} from "@/data/skeleton-preview";

export interface ProjectDetailViewProps {
  locale: AppLocale;
  slug?: string;
}

export function ProjectDetailView({ locale }: ProjectDetailViewProps) {
  const dict = getDictionary(locale);
  const isKo = locale === "ko";
  const project = isKo ? skeletonProjectKo : skeletonProjectEn;
  const narrative = skeletonProjectNarrative[locale] || skeletonProjectNarrative.en;
  const backHref = isKo ? "/ko/projects" : "/projects";

  return (
    <Container size="default" className="space-y-12 pb-16">
      {/* Back Navigation */}
      <nav aria-label={dict.skeleton.backNavigation}>
        <Link
          href={backHref}
          className="inline-flex items-center min-h-[44px] text-[length:var(--text-small)] font-medium text-[var(--accent)] hover:underline focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)]"
        >
          ← {dict.skeleton.backToProjects}
        </Link>
      </nav>

      {/* Page Intro & Notice */}
      <div className="space-y-6">
        <PageIntro
          eyebrow={dict.skeleton.eyebrow}
          title={project.title}
          summary={project.summary}
        />
        <div className="rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface)] p-4 text-[length:var(--text-small)] text-[var(--muted)] leading-[var(--leading-relaxed)]">
          {dict.skeleton.notice}
        </div>
      </div>

      {/* Metadata Definition List */}
      <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] text-[length:var(--text-small)]">
        <div>
          <dt className="font-mono text-xs text-[var(--muted)] uppercase tracking-wider mb-1">
            {dict.skeleton.context}
          </dt>
          <dd className="font-medium text-[var(--foreground)]">
            {dict.skeleton.personal}
          </dd>
        </div>
        <div>
          <dt className="font-mono text-xs text-[var(--muted)] uppercase tracking-wider mb-1">
            {dict.skeleton.status}
          </dt>
          <dd className="font-medium text-[var(--foreground)]">
            {dict.skeleton.inProgress}
          </dd>
        </div>
        <div>
          <dt className="font-mono text-xs text-[var(--muted)] uppercase tracking-wider mb-1">
            {dict.skeleton.role}
          </dt>
          <dd className="font-medium text-[var(--foreground)]">
            {project.role}
          </dd>
        </div>
        <div>
          <dt className="font-mono text-xs text-[var(--muted)] uppercase tracking-wider mb-1">
            {dict.skeleton.topics}
          </dt>
          <dd className="font-medium text-[var(--foreground)]">
            {project.topics.join(", ")}
          </dd>
        </div>
      </dl>

      {/* Contribution Boundary Before Narrative */}
      <section className="space-y-4">
        <h2 className="text-[length:var(--text-heading-2)] font-semibold tracking-[var(--tracking-display)] text-[var(--foreground)] border-b border-[var(--border)] pb-2">
          {dict.skeleton.contributionBoundary}
        </h2>
        <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-6 text-[length:var(--text-body)] text-[var(--muted)] leading-[var(--leading-relaxed)]">
          <p>{project.contributionBoundary}</p>
        </div>
      </section>

      {/* Narrative Section 1: Problem & Constraints */}
      <section className="space-y-4">
        <h2 className="text-[length:var(--text-heading-2)] font-semibold tracking-[var(--tracking-display)] text-[var(--foreground)] border-b border-[var(--border)] pb-2">
          {dict.skeleton.problemAndConstraints}
        </h2>
        <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-6">
          <Prose>
            <p>{narrative.context}</p>
            <p>{narrative.problem}</p>
            <ul>
              {narrative.constraints.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Prose>
        </div>
      </section>

      {/* Narrative Section 2: Decisions */}
      <section className="space-y-4">
        <h2 className="text-[length:var(--text-heading-2)] font-semibold tracking-[var(--tracking-display)] text-[var(--foreground)] border-b border-[var(--border)] pb-2">
          {dict.skeleton.decisions}
        </h2>
        <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-6">
          <Prose>
            <ul>
              {narrative.decisions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Prose>
        </div>
      </section>

      {/* Narrative Section 3: Validation */}
      <section className="space-y-4">
        <h2 className="text-[length:var(--text-heading-2)] font-semibold tracking-[var(--tracking-display)] text-[var(--foreground)] border-b border-[var(--border)] pb-2">
          {dict.skeleton.validation}
        </h2>
        <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-6">
          <Prose>
            <p>{narrative.validation}</p>
          </Prose>
        </div>
      </section>

      {/* Narrative Section 4: Outcome */}
      <section className="space-y-4">
        <h2 className="text-[length:var(--text-heading-2)] font-semibold tracking-[var(--tracking-display)] text-[var(--foreground)] border-b border-[var(--border)] pb-2">
          {dict.skeleton.outcome}
        </h2>
        <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-6">
          <Prose>
            <p>{narrative.outcome}</p>
          </Prose>
        </div>
      </section>

      {/* Narrative Section 5: Limitations */}
      <section className="space-y-4">
        <h2 className="text-[length:var(--text-heading-2)] font-semibold tracking-[var(--tracking-display)] text-[var(--foreground)] border-b border-[var(--border)] pb-2">
          {dict.skeleton.limitations}
        </h2>
        <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-6">
          <Prose>
            <p>{narrative.limitations}</p>
          </Prose>
        </div>
      </section>

      {/* Narrative Section 6: Evidence (No-Artifact State) */}
      <section className="space-y-4">
        <h2 className="text-[length:var(--text-heading-2)] font-semibold tracking-[var(--tracking-display)] text-[var(--foreground)] border-b border-[var(--border)] pb-2">
          {dict.skeleton.evidence}
        </h2>
        <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-6 text-[length:var(--text-small)] text-[var(--muted)] leading-[var(--leading-relaxed)]">
          <p>{dict.skeleton.evidenceUnavailable}</p>
        </div>
      </section>
    </Container>
  );
}

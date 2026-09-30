import React from "react";
import Link from "next/link";
import type { AppLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/container";
import { PageIntro } from "@/components/ui/page-intro";
import { Prose } from "@/components/ui/prose";
import type { ProjectRecord } from "@/lib/content/schemas";
import type { ProjectDetailNarrative } from "@/lib/content/case-study";
import { accentActionLinkClassName } from "@/components/ui/class-names";

export interface ProjectDetailViewProps {
  locale: AppLocale;
  project: ProjectRecord;
  narrative: ProjectDetailNarrative;
}

export function ProjectDetailView({ locale, project, narrative }: ProjectDetailViewProps) {
  const dict = getDictionary(locale);
  const backHref = locale === "ko" ? "/ko/projects" : "/projects";

  return (
    <Container size="default" className="space-y-12 pb-16">
      {/* Back Navigation */}
      <nav aria-label={dict.backNavigation}>
        <Link
          href={backHref}
          className={accentActionLinkClassName}
        >
          ← {dict.caseStudy.backToProjects}
        </Link>
      </nav>

      {/* Page Intro & Notice */}
      <div className="space-y-6">
        <PageIntro
          eyebrow={dict.skeleton.eyebrow}
          title={project.title}
          summary={project.summary}
        />
        <div className="rounded-[var(--radius-sm)] border border-line bg-surface p-4 text-small text-muted leading-relaxed">
          {dict.skeleton.notice}
        </div>
      </div>

      {/* Metadata Definition List */}
      <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-[var(--radius-md)] border border-line bg-surface text-small">
        <div>
          <dt className="font-mono text-xs text-muted uppercase tracking-wider mb-1">
            {dict.caseStudy.context}
          </dt>
          <dd className="font-medium text-foreground">
            {dict.skeleton.personal}
          </dd>
        </div>
        <div>
          <dt className="font-mono text-xs text-muted uppercase tracking-wider mb-1">
            {dict.caseStudy.status}
          </dt>
          <dd className="font-medium text-foreground">
            {dict.skeleton.inProgress}
          </dd>
        </div>
        <div>
          <dt className="font-mono text-xs text-muted uppercase tracking-wider mb-1">
            {dict.caseStudy.role}
          </dt>
          <dd className="font-medium text-foreground">
            {project.role}
          </dd>
        </div>
        <div>
          <dt className="font-mono text-xs text-muted uppercase tracking-wider mb-1">
            {dict.caseStudy.topics}
          </dt>
          <dd className="font-medium text-foreground">
            {project.topics.join(", ")}
          </dd>
        </div>
      </dl>

      {/* Contribution Boundary Before Narrative */}
      <section className="space-y-4">
        <h2 className="text-heading-2 font-semibold tracking-display text-foreground border-b border-line pb-2">
          {dict.caseStudy.contributionBoundary}
        </h2>
        <div className="rounded-[var(--radius-md)] border border-line bg-surface p-6 text-body text-muted leading-relaxed">
          <p>{project.contributionBoundary}</p>
        </div>
      </section>

      {/* Narrative Section 1: Problem & Constraints */}
      <section className="space-y-4">
        <h2 className="text-heading-2 font-semibold tracking-display text-foreground border-b border-line pb-2">
          {dict.caseStudy.problemAndConstraints}
        </h2>
        <div className="rounded-[var(--radius-md)] border border-line bg-surface p-6">
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
        <h2 className="text-heading-2 font-semibold tracking-display text-foreground border-b border-line pb-2">
          {dict.caseStudy.decisions}
        </h2>
        <div className="rounded-[var(--radius-md)] border border-line bg-surface p-6">
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
        <h2 className="text-heading-2 font-semibold tracking-display text-foreground border-b border-line pb-2">
          {dict.caseStudy.validation}
        </h2>
        <div className="rounded-[var(--radius-md)] border border-line bg-surface p-6">
          <Prose>
            <p>{narrative.validation}</p>
          </Prose>
        </div>
      </section>

      {/* Narrative Section 4: Outcome */}
      <section className="space-y-4">
        <h2 className="text-heading-2 font-semibold tracking-display text-foreground border-b border-line pb-2">
          {dict.caseStudy.outcome}
        </h2>
        <div className="rounded-[var(--radius-md)] border border-line bg-surface p-6">
          <Prose>
            <p>{narrative.outcome}</p>
          </Prose>
        </div>
      </section>

      {/* Narrative Section 5: Limitations */}
      <section className="space-y-4">
        <h2 className="text-heading-2 font-semibold tracking-display text-foreground border-b border-line pb-2">
          {dict.caseStudy.limitations}
        </h2>
        <div className="rounded-[var(--radius-md)] border border-line bg-surface p-6">
          <Prose>
            <p>{narrative.limitations}</p>
          </Prose>
        </div>
      </section>

      {/* Narrative Section 6: Evidence (No-Artifact State) */}
      <section className="space-y-4">
        <h2 className="text-heading-2 font-semibold tracking-display text-foreground border-b border-line pb-2">
          {dict.caseStudy.evidence}
        </h2>
        <div className="rounded-[var(--radius-md)] border border-line bg-surface p-6 text-small text-muted leading-relaxed">
          <p>{dict.skeleton.evidenceUnavailable}</p>
        </div>
      </section>
    </Container>
  );
}

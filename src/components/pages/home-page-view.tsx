import React from "react";
import Link from "next/link";
import type { AppLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/container";
import { ProjectCard } from "@/components/ui/project-card";
import { ArticleCard } from "@/components/ui/article-card";
import { ExperienceEntry } from "@/components/ui/experience-entry";
import { EvidenceCard } from "@/components/ui/evidence-card";
import { Tag } from "@/components/ui/tag";
import { ResumeAction } from "@/components/ui/resume-action";
import {
  skeletonSiteIdentity,
  skeletonEvidence,
  skeletonExperience,
  skeletonTraining,
  skeletonSkill,
  skeletonProjectEn,
  skeletonProjectKo,
  skeletonArticleEn,
  skeletonArticleKo,
} from "@/data/skeleton-preview";

export interface HomePageViewProps {
  locale: AppLocale;
}

export function HomePageView({ locale }: HomePageViewProps) {
  const dict = getDictionary(locale);
  const isKo = locale === "ko";
  const project = isKo ? skeletonProjectKo : skeletonProjectEn;
  const article = isKo ? skeletonArticleKo : skeletonArticleEn;
  const projectHref = isKo ? "/ko/projects/example-project" : "/projects/example-project";
  const articleHref = isKo ? "/ko/blog/example-article" : "/blog/example-article";
  const expHref = isKo ? "/ko/experience" : "/experience";
  const blogHref = isKo ? "/ko/blog" : "/blog";

  const expOrg = skeletonExperience.organization[locale] || skeletonExperience.organization.en;
  const expRole = skeletonExperience.role[locale] || skeletonExperience.role.en;
  const expSummary = skeletonExperience.summary[locale] || skeletonExperience.summary.en;
  const trainingProgram = skeletonTraining.program[locale] || skeletonTraining.program.en;
  const trainingInst = skeletonTraining.institution[locale] || skeletonTraining.institution.en;
  const skillName = skeletonSkill.name[locale] || skeletonSkill.name.en;

  return (
    <Container size="default" className="space-y-16 pb-16">
      {/* 1. First Viewport: Identity Hierarchy & Primary Actions */}
      <section className="space-y-6 pt-4 sm:pt-8">
        <div className="space-y-2">
          <p className="text-[length:var(--text-small)] font-mono text-[var(--muted)] tracking-[var(--tracking-label)] uppercase">
            {dict.skeleton.eyebrow}
          </p>
          <h1 className="text-[length:var(--text-display)] font-semibold leading-[var(--leading-tight)] tracking-[var(--tracking-display)] text-[var(--foreground)]">
            {skeletonSiteIdentity.displayName[locale] || skeletonSiteIdentity.displayName.en}
          </h1>
        </div>
        <div className="space-y-3 max-w-[var(--max-width-prose)] text-[length:var(--text-body)] leading-[var(--leading-relaxed)] text-[var(--muted)]">
          <p className="font-medium text-[var(--foreground)]">
            {dict.skeleton.baseline}
          </p>
          <p>{dict.skeleton.direction}</p>
        </div>
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Link
            href={projectHref}
            className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 rounded-[var(--radius-sm)] bg-[var(--accent)] text-[length:var(--text-small)] font-medium text-[var(--accent-foreground)] hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)]"
          >
            {dict.skeleton.viewProject}
          </Link>
          <ResumeAction
            label={dict.skeleton.resumeLabel}
            statusText={dict.skeleton.resumeUnavailable}
          />
        </div>
        <div className="rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface)] p-4 text-[length:var(--text-small)] text-[var(--muted)] leading-[var(--leading-relaxed)]">
          {dict.skeleton.notice}
        </div>
      </section>

      {/* 2. Compact Synthetic Fact Strip */}
      <section aria-label={dict.skeleton.syntheticOverview} className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-y border-[var(--border)] py-6 text-[length:var(--text-small)] text-[var(--muted)]">
        <div>
          <span className="font-mono text-xs text-[var(--muted)] block uppercase tracking-wider mb-1">
            {dict.skeleton.contributionBoundary}
          </span>
          <p className="font-medium text-[var(--foreground)]">
            {expOrg} · {dict.skeleton.fullTime}
          </p>
        </div>
        <div>
          <span className="font-mono text-xs text-[var(--muted)] block uppercase tracking-wider mb-1">
            {dict.skeleton.evidence}
          </span>
          <p className="font-medium text-[var(--foreground)]">
            {dict.skeleton.evidenceLabel} ({dict.skeleton.projectEvidence})
          </p>
        </div>
        <div>
          <span className="font-mono text-xs text-[var(--muted)] block uppercase tracking-wider mb-1">
            {dict.skeleton.reviewedRoutes}
          </span>
          <p className="font-medium text-[var(--foreground)]">
            {dict.skeleton.previewOnly}
          </p>
        </div>
      </section>

      {/* 3. Selected Evidence */}
      <section className="space-y-6">
        <h2 className="text-[length:var(--text-heading-2)] font-semibold tracking-[var(--tracking-display)] text-[var(--foreground)]">
          {dict.skeleton.selectedEvidence}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <ProjectCard
            title={project.title}
            summary={project.summary}
            status="in-progress"
            statusLabel={dict.skeleton.inProgress}
            role={project.role}
            tags={project.topics}
            href={projectHref}
            headingLevel={3}
          />
          <ArticleCard
            title={article.title}
            summary={article.summary}
            date={article.publishedOn}
            topics={article.topics}
            href={articleHref}
            headingLevel={3}
          />
        </div>
      </section>

      {/* 4. Experience Snapshot */}
      <section className="space-y-6">
        <h2 className="text-[length:var(--text-heading-2)] font-semibold tracking-[var(--tracking-display)] text-[var(--foreground)]">
          {dict.skeleton.experienceSnapshot}
        </h2>
        <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-6 space-y-6">
          <ExperienceEntry
            organization={expOrg}
            role={expRole}
            dateLabel="2024-01 — 2025-01"
            employmentType={dict.skeleton.fullTime}
            summary={expSummary}
            headingLevel={3}
          />
          <div className="border-t border-[var(--border)] pt-4 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-[length:var(--text-heading-3)] font-semibold text-[var(--foreground)]">
                {trainingProgram}
              </h3>
              <div className="flex gap-2">
                <Tag variant="accent">{dict.skeleton.training}</Tag>
                <Tag variant="default">{dict.skeleton.completed}</Tag>
              </div>
            </div>
            <p className="text-[length:var(--text-small)] text-[var(--muted)] font-mono">
              {trainingInst} · 2025-02 — 2025-04
            </p>
          </div>
          <div className="pt-2">
            <Link
              href={expHref}
              className="inline-flex items-center min-h-[44px] text-[length:var(--text-small)] font-medium text-[var(--accent)] hover:underline focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)]"
            >
              {dict.skeleton.viewExperience} →
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Capability with Evidence */}
      <section className="space-y-6">
        <h2 className="text-[length:var(--text-heading-2)] font-semibold tracking-[var(--tracking-display)] text-[var(--foreground)]">
          {dict.skeleton.capabilityEvidence}
        </h2>
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 p-4 rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface)]">
            <span className="font-medium text-[var(--foreground)] text-[length:var(--text-body)]">
              {skillName}
            </span>
            <Tag variant="accent">{dict.skeleton.projectEvidence}</Tag>
          </div>
          <EvidenceCard
            label={dict.skeleton.evidenceLabel}
            level={skeletonEvidence.level}
            levelLabel={dict.skeleton.projectEvidence}
            sourceKind={skeletonEvidence.sourceKind}
            sourceKindLabel={dict.skeleton.artifact}
          />
        </div>
      </section>

      {/* 6. Example Writing */}
      <section className="space-y-6">
        <h2 className="text-[length:var(--text-heading-2)] font-semibold tracking-[var(--tracking-display)] text-[var(--foreground)]">
          {dict.skeleton.recentWriting}
        </h2>
        <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-6 space-y-4">
          <ArticleCard
            title={article.title}
            summary={article.summary}
            date={article.publishedOn}
            topics={article.topics}
            href={articleHref}
            headingLevel={3}
          />
          <div>
            <Link
              href={blogHref}
              className="inline-flex items-center min-h-[44px] text-[length:var(--text-small)] font-medium text-[var(--accent)] hover:underline focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)]"
            >
              {dict.skeleton.viewBlog} →
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Contact Placement (Unavailable Status) */}
      <section aria-label={dict.skeleton.contactStatus} className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-6 text-[length:var(--text-small)] text-[var(--muted)]">
        <p className="leading-[var(--leading-relaxed)]">
          {dict.skeleton.contactUnavailable}
        </p>
      </section>
    </Container>
  );
}

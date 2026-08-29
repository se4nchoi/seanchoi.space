import React from "react";
import type { AppLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/container";
import { PageIntro } from "@/components/ui/page-intro";
import { ExperienceEntry } from "@/components/ui/experience-entry";
import { Tag } from "@/components/ui/tag";
import { Prose } from "@/components/ui/prose";
import {
  skeletonExperience,
  skeletonTraining,
} from "@/data/skeleton-preview";

export interface ExperiencePageViewProps {
  locale: AppLocale;
}

export function ExperiencePageView({ locale }: ExperiencePageViewProps) {
  const dict = getDictionary(locale);
  const contribs = skeletonExperience.contributions.map((c) => c.text[locale] || c.text.en);
  const expOrg = skeletonExperience.organization[locale] || skeletonExperience.organization.en;
  const expRole = skeletonExperience.role[locale] || skeletonExperience.role.en;
  const expSummary = skeletonExperience.summary[locale] || skeletonExperience.summary.en;
  const trainingProgram = skeletonTraining.program[locale] || skeletonTraining.program.en;
  const trainingInst = skeletonTraining.institution[locale] || skeletonTraining.institution.en;

  return (
    <Container size="default" className="space-y-12 pb-16">
      <div className="space-y-6">
        <PageIntro
          eyebrow={dict.skeleton.eyebrow}
          title={dict.experience}
          summary={dict.skeleton.baseline}
        />
        <div className="rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface)] p-4 text-[length:var(--text-small)] text-[var(--muted)] leading-[var(--leading-relaxed)]">
          {dict.skeleton.notice}
        </div>
      </div>

      {/* 1. Professional Experience Section */}
      <section className="space-y-6">
        <h2 className="text-[length:var(--text-heading-2)] font-semibold tracking-[var(--tracking-display)] text-[var(--foreground)] border-b border-[var(--border)] pb-2">
          {dict.skeleton.professionalExperience}
        </h2>
        <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-6">
          <ExperienceEntry
            organization={expOrg}
            role={expRole}
            dateLabel="2024-01 — 2025-01"
            employmentType={dict.skeleton.fullTime}
            summary={expSummary}
            contributions={contribs}
            headingLevel={3}
          />
        </div>
      </section>

      {/* 2. Education & Training Section (Never Labeled Employment) */}
      <section className="space-y-6">
        <h2 className="text-[length:var(--text-heading-2)] font-semibold tracking-[var(--tracking-display)] text-[var(--foreground)] border-b border-[var(--border)] pb-2">
          {dict.skeleton.educationAndTraining}
        </h2>
        <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-6 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-[length:var(--text-heading-3)] font-semibold text-[var(--foreground)]">
              {trainingProgram}
            </h3>
            <div className="flex gap-2">
              <Tag variant="accent">{dict.skeleton.training}</Tag>
              <Tag variant="default">{dict.skeleton.completed}</Tag>
            </div>
          </div>
          <p className="text-[length:var(--text-body)] text-[var(--muted)]">
            {trainingInst}
          </p>
          <p className="text-[length:var(--text-small)] font-mono text-[var(--muted)]">
            2025-02 — 2025-04 · {dict.skeleton.training}
          </p>
        </div>
      </section>

      {/* 3. Contribution Boundary Section */}
      <section className="space-y-4">
        <h2 className="text-[length:var(--text-heading-2)] font-semibold tracking-[var(--tracking-display)] text-[var(--foreground)] border-b border-[var(--border)] pb-2">
          {dict.skeleton.contributionBoundary}
        </h2>
        <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-6">
          <Prose>
            <p>{dict.skeleton.contributionBoundaryBody}</p>
          </Prose>
        </div>
      </section>
    </Container>
  );
}

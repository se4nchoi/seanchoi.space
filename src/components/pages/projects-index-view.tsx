import React from "react";
import type { AppLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/container";
import { PageIntro } from "@/components/ui/page-intro";
import { EngineeringEvidenceCard } from "@/components/ui/engineering-evidence-card";
import {
  canonicalSupportingProjects,
  getLocalizedText,
} from "@/data/content";
import type { SupportingProjectRecord } from "@/lib/content/schemas";

export interface ProjectsIndexViewProps {
  locale: AppLocale;
}

export function ProjectsIndexView({ locale }: ProjectsIndexViewProps) {
  const dict = getDictionary(locale);
  const isKo = locale === "ko";
  const currentWork = canonicalSupportingProjects.filter(
    (item) => item.context === "current-work"
  );
  const professionalEvidence = canonicalSupportingProjects.filter(
    (item) => item.context === "professional"
  );
  const projectEvidence = canonicalSupportingProjects.filter(
    (item) => item.context === "self-directed"
  );
  const trainingEvidence = canonicalSupportingProjects.filter(
    (item) => item.context === "training-exercise"
  );

  const levelLabel = (level: SupportingProjectRecord["evidenceLevel"]) => {
    if (level === "professional") return dict.careerUI.professionalLevel;
    if (level === "project") return dict.careerUI.projectLevel;
    if (level === "training") return dict.careerUI.trainingLevel;
    return isKo ? "학습 근거" : "Learning evidence";
  };
  const renderCards = (items: SupportingProjectRecord[]) => (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      {items.map((item) => (
        <EngineeringEvidenceCard
          key={item.id}
          title={getLocalizedText(item.title, locale)}
          summary={getLocalizedText(item.summary, locale)}
          role={item.role ? getLocalizedText(item.role, locale) : undefined}
          evidenceLabel={levelLabel(item.evidenceLevel)}
          status={item.status}
          statusLabel={
            item.status === "in-progress"
              ? dict.careerUI.inProgress
              : dict.careerUI.completed
          }
          contributionBoundary={getLocalizedText(item.contributionBoundary, locale)}
          contributionBoundaryLabel={dict.careerUI.contributionBoundaryLabel}
          technologies={item.technologies}
          completedScope={item.completedScope.map((scope) =>
            getLocalizedText(scope, locale)
          )}
          plannedScope={item.plannedScope.map((scope) =>
            getLocalizedText(scope, locale)
          )}
          completedScopeLabel={dict.careerUI.completedFoundation}
          plannedScopeLabel={dict.careerUI.plannedNext}
          headingLevel={3}
        />
      ))}
    </div>
  );

  return (
    <Container size="default" className="space-y-14 pb-16">
      <PageIntro title={dict.projects} summary={dict.projectsStatus} />

      <p className="max-w-[var(--max-width-prose)] text-[length:var(--text-body)] leading-[var(--leading-relaxed)] text-[var(--muted)]">
        {dict.careerUI.engineeringEvidenceIntro}
      </p>
      <p className="font-mono text-[length:var(--text-small)] text-[var(--muted)]">
        {dict.careerUI.editorialReviewable}
      </p>

      <section className="space-y-6">
        <div className="space-y-2 border-b border-[var(--border)] pb-3">
          <h2 className="text-[length:var(--text-heading-2)] font-semibold tracking-[var(--tracking-display)] text-[var(--foreground)]">
            {dict.careerUI.currentlyBuilding}
          </h2>
          <p className="text-[length:var(--text-body)] text-[var(--muted)]">
            {dict.careerUI.currentlyBuildingIntro}
          </p>
        </div>
        {renderCards(currentWork)}
      </section>

      <section className="space-y-6">
        <h2 className="border-b border-[var(--border)] pb-3 text-[length:var(--text-heading-2)] font-semibold tracking-[var(--tracking-display)] text-[var(--foreground)]">
          {dict.careerUI.professionalEvidence}
        </h2>
        {renderCards(professionalEvidence)}
      </section>

      <section className="space-y-6">
        <h2 className="border-b border-[var(--border)] pb-3 text-[length:var(--text-heading-2)] font-semibold tracking-[var(--tracking-display)] text-[var(--foreground)]">
          {dict.careerUI.projectEvidence}
        </h2>
        {renderCards(projectEvidence)}
      </section>

      <section className="space-y-6">
        <h2 className="border-b border-[var(--border)] pb-3 text-[length:var(--text-heading-2)] font-semibold tracking-[var(--tracking-display)] text-[var(--foreground)]">
          {dict.careerUI.trainingEvidence}
        </h2>
        {renderCards(trainingEvidence)}
      </section>
    </Container>
  );
}

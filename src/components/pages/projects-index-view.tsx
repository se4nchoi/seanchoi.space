import React from "react";
import type { AppLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/container";
import { PageIntro } from "@/components/ui/page-intro";
import { EngineeringEvidenceCard } from "@/components/ui/engineering-evidence-card";
import { WorkImage } from "@/components/ui/work-image";
import { workMedia } from "@/data/work-media";
import { canonicalSupportingProjects } from "@/data/content";
import { getLocalizedText } from "@/lib/content/format";
import type { SupportingProjectRecord } from "@/lib/content/schemas";
import { getEvidenceLevelLabel } from "@/i18n/career-labels";

export interface ProjectsIndexViewProps {
  locale: AppLocale;
}

export function ProjectsIndexView({ locale }: ProjectsIndexViewProps) {
  const dict = getDictionary(locale);
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

  const renderCards = (items: SupportingProjectRecord[]) => (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      {items.map((item) => (
        <EngineeringEvidenceCard
          key={item.id}
          title={getLocalizedText(item.title, locale)}
          summary={getLocalizedText(item.summary, locale)}
          role={item.role ? getLocalizedText(item.role, locale) : undefined}
          evidenceLabel={getEvidenceLevelLabel(item.evidenceLevel, locale)}
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
          media={workMedia[item.id] ? <WorkImage media={workMedia[item.id]} locale={locale} /> : undefined}
        />
      ))}
    </div>
  );

  return (
    <Container size="default" className={`space-y-14 pb-16 ${isKo ? "break-keep" : ""}`}>
      <PageIntro title={dict.projects} summary={dict.projectsStatus} />

      <section className="space-y-6">
        <div className="space-y-2 border-b border-line pb-3">
          <h2 className="text-heading-2 font-semibold tracking-display text-foreground">
            {dict.careerUI.currentlyBuilding}
          </h2>
          <p className="text-body text-muted">
            {dict.careerUI.currentlyBuildingIntro}
          </p>
        </div>
        {renderCards(currentWork)}
      </section>

      <section className="space-y-6">
        <h2 className="border-b border-line pb-3 text-heading-2 font-semibold tracking-display text-foreground">
          {dict.careerUI.professionalEvidence}
        </h2>
        {renderCards(professionalEvidence)}
      </section>

      <section className="space-y-6">
        <h2 className="border-b border-line pb-3 text-heading-2 font-semibold tracking-display text-foreground">
          {dict.careerUI.projectEvidence}
        </h2>
        {renderCards(projectEvidence)}
      </section>

      <section className="space-y-6">
        <h2 className="border-b border-line pb-3 text-heading-2 font-semibold tracking-display text-foreground">
          {dict.careerUI.trainingEvidence}
        </h2>
        {renderCards(trainingEvidence)}
      </section>
      <p className="text-xs text-muted">{dict.careerUI.editorialReviewable}</p>
    </Container>
  );
}

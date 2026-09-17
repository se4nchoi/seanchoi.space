import React from "react";
import Link from "next/link";
import type { AppLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/container";
import { Tag } from "@/components/ui/tag";
import { ExternalLink } from "@/components/ui/external-link";
import { EngineeringEvidenceCard } from "@/components/ui/engineering-evidence-card";
import {
  canonicalContentRegistry,
  canonicalSupportingProjects,
  getLocalizedText,
  systemLayerSkillGroups,
} from "@/data/content";

export interface HomePageViewProps {
  locale: AppLocale;
}

const selectedEvidenceIds = [
  "evidence-item-ruta40",
  "evidence-item-hoek-immersion",
  "project-lan-chat",
  "project-plc-robot-cell-integration",
];

export function HomePageView({ locale }: HomePageViewProps) {
  const dict = getDictionary(locale);
  const isKo = locale === "ko";
  const { siteIdentity, educationAndTraining, skills, links } =
    canonicalContentRegistry;

  const expHref = isKo ? "/ko/experience" : "/experience";
  const projectsHref = isKo ? "/ko/projects" : "/projects";
  const displayName = siteIdentity
    ? getLocalizedText(siteIdentity.displayName, locale)
    : isKo
      ? "최예현"
      : "Sean Choi";
  const degreeRecord = educationAndTraining.find((item) => item.kind === "education");
  const selectedEvidence = selectedEvidenceIds
    .map((id) => canonicalSupportingProjects.find((item) => item.id === id))
    .filter((item) => item !== undefined);
  const currentBuild = canonicalSupportingProjects.find(
    (item) => item.context === "current-work"
  );
  const githubLink = links.find((link) => link.kind === "github");
  const linkedinLink = links.find((link) => link.kind === "linkedin");
  const emailLink = links.find((link) => link.kind === "email");

  const levelLabel = (level: "professional" | "project" | "training" | "exposure") => {
    if (level === "professional") return dict.careerUI.professionalLevel;
    if (level === "project") return dict.careerUI.projectLevel;
    if (level === "training") return dict.careerUI.trainingLevel;
    return isKo ? "학습 근거" : "Learning evidence";
  };
  const layerLabel = (id: (typeof systemLayerSkillGroups)[number]["id"]) => {
    const labels = {
      interfaces: dict.careerUI.layerInterfaces,
      applications: dict.careerUI.layerApplications,
      infrastructure: dict.careerUI.layerInfrastructure,
      "physical-systems": dict.careerUI.layerPhysicalSystems,
      "ai-perception": dict.careerUI.layerAiPerception,
    };
    return labels[id];
  };

  return (
    <Container size="default" className="space-y-16 pb-16">
      <section className="space-y-6 pt-4 sm:pt-8">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2 font-mono text-[length:var(--text-small)] text-[var(--muted)]">
            <span className="uppercase tracking-[var(--tracking-label)]">
              {isKo ? "컴퓨터 엔지니어" : "Computer Engineer"}
            </span>
            <span aria-hidden="true">•</span>
            <span>{dict.careerUI.basedIn}</span>
          </div>
          <h1 className="text-[length:var(--text-display)] font-semibold leading-[var(--leading-tight)] tracking-[var(--tracking-display)] text-[var(--foreground)]">
            {displayName}
          </h1>
        </div>

        <div className="max-w-[var(--max-width-prose)] space-y-3 text-[length:var(--text-body)] leading-[var(--leading-relaxed)] text-[var(--muted)]">
          <p className="text-[length:var(--text-heading-3)] font-medium text-[var(--foreground)]">
            {dict.careerUI.homeHeadline}
          </p>
          <p>{dict.careerUI.homePositioning}</p>
          {degreeRecord && (
            <p className="font-mono text-[length:var(--text-small)]">
              {getLocalizedText(degreeRecord.program, locale)} —{" "}
              {getLocalizedText(degreeRecord.institution, locale)}, 2026
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Link
            href={projectsHref}
            className="inline-flex min-h-[44px] items-center justify-center rounded-[var(--radius-sm)] bg-[var(--accent)] px-5 py-2.5 text-[length:var(--text-small)] font-medium text-[var(--accent-foreground)] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)]"
          >
            {dict.careerUI.viewProjects}
          </Link>
          <Link
            href={expHref}
            className="inline-flex min-h-[44px] items-center justify-center rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface)] px-5 py-2.5 text-[length:var(--text-small)] font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--border)] focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)]"
          >
            {dict.careerUI.viewExperience}
          </Link>
        </div>
      </section>

      <section className="space-y-6">
        <div className="space-y-2 border-b border-[var(--border)] pb-3">
          <h2 className="text-[length:var(--text-heading-2)] font-semibold tracking-[var(--tracking-display)] text-[var(--foreground)]">
            {dict.careerUI.selectedEngineeringEvidence}
          </h2>
          <p className="max-w-[var(--max-width-prose)] text-[length:var(--text-body)] leading-[var(--leading-relaxed)] text-[var(--muted)]">
            {dict.careerUI.selectedEngineeringEvidenceIntro}
          </p>
          <p className="font-mono text-[length:var(--text-small)] text-[var(--muted)]">
            {dict.careerUI.editorialReviewable}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {selectedEvidence.map((item) => (
            <EngineeringEvidenceCard
              key={item.id}
              title={getLocalizedText(item.title, locale)}
              summary={getLocalizedText(item.summary, locale)}
              role={item.role ? getLocalizedText(item.role, locale) : undefined}
              evidenceLabel={levelLabel(item.evidenceLevel)}
              status={item.status}
              statusLabel={dict.careerUI.completed}
              contributionBoundary={getLocalizedText(item.contributionBoundary, locale)}
              contributionBoundaryLabel={dict.careerUI.contributionBoundaryLabel}
              technologies={item.technologies}
              completedScope={item.completedScope.map((scope) =>
                getLocalizedText(scope, locale)
              )}
              plannedScope={[]}
              completedScopeLabel={dict.careerUI.completedFoundation}
              plannedScopeLabel={dict.careerUI.plannedNext}
              compact
            />
          ))}
        </div>
        <Link
          href={projectsHref}
          className="inline-flex min-h-[44px] items-center text-[length:var(--text-small)] font-medium text-[var(--accent)] hover:underline focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)]"
        >
          {dict.careerUI.viewProjects} →
        </Link>
      </section>

      {currentBuild && (
        <section className="space-y-6">
          <div className="space-y-2 border-b border-[var(--border)] pb-3">
            <h2 className="text-[length:var(--text-heading-2)] font-semibold tracking-[var(--tracking-display)] text-[var(--foreground)]">
              {dict.careerUI.currentlyBuilding}
            </h2>
            <p className="max-w-[var(--max-width-prose)] text-[length:var(--text-body)] leading-[var(--leading-relaxed)] text-[var(--muted)]">
              {dict.careerUI.currentlyBuildingIntro}
            </p>
          </div>
          <EngineeringEvidenceCard
            title={getLocalizedText(currentBuild.title, locale)}
            summary={getLocalizedText(currentBuild.summary, locale)}
            role={currentBuild.role ? getLocalizedText(currentBuild.role, locale) : undefined}
            evidenceLabel={levelLabel(currentBuild.evidenceLevel)}
            status={currentBuild.status}
            statusLabel={dict.careerUI.inProgress}
            contributionBoundary={getLocalizedText(
              currentBuild.contributionBoundary,
              locale
            )}
            contributionBoundaryLabel={dict.careerUI.contributionBoundaryLabel}
            technologies={currentBuild.technologies}
            completedScope={currentBuild.completedScope.map((scope) =>
              getLocalizedText(scope, locale)
            )}
            plannedScope={currentBuild.plannedScope.map((scope) =>
              getLocalizedText(scope, locale)
            )}
            completedScopeLabel={dict.careerUI.completedFoundation}
            plannedScopeLabel={dict.careerUI.plannedNext}
          />
        </section>
      )}

      <section className="space-y-6">
        <h2 className="border-b border-[var(--border)] pb-3 text-[length:var(--text-heading-2)] font-semibold tracking-[var(--tracking-display)] text-[var(--foreground)]">
          {dict.careerUI.capabilitiesBySystemLayer}
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {systemLayerSkillGroups.map((group) => {
            const groupSkills = group.skillIds
              .map((skillId) => skills.find((skill) => skill.id === skillId))
              .filter((skill) => skill !== undefined);
            return (
              <div
                key={group.id}
                className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-5"
              >
                <h3 className="text-[length:var(--text-heading-3)] font-semibold text-[var(--foreground)]">
                  {layerLabel(group.id)}
                </h3>
                <ul className="mt-3 space-y-2">
                  {groupSkills.map((skill) => (
                    <li
                      key={skill.id}
                      className="flex flex-wrap items-center justify-between gap-2 text-[length:var(--text-small)]"
                    >
                      <span className="font-medium text-[var(--foreground)]">
                        {getLocalizedText(skill.name, locale)}
                      </span>
                      <Tag variant={skill.evidenceLevel === "professional" ? "accent" : "muted"}>
                        {levelLabel(skill.evidenceLevel)}
                      </Tag>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="border-b border-[var(--border)] pb-3 text-[length:var(--text-heading-2)] font-semibold tracking-[var(--tracking-display)] text-[var(--foreground)]">
          {dict.careerUI.contactAndProfiles}
        </h2>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[length:var(--text-small)]">
          <Link href={expHref} className="font-medium text-[var(--accent)] hover:underline">
            {dict.careerUI.viewExperience}
          </Link>
          {emailLink && (
            <a href={emailLink.href} className="font-medium text-[var(--accent)] hover:underline">
              {dict.careerUI.emailLabel}
            </a>
          )}
          {githubLink && (
            <ExternalLink href={githubLink.href as `https://${string}`} newTabLabel={dict.openInNewTab}>
              GitHub
            </ExternalLink>
          )}
          {linkedinLink && (
            <ExternalLink href={linkedinLink.href as `https://${string}`} newTabLabel={dict.openInNewTab}>
              LinkedIn
            </ExternalLink>
          )}
          <span className="text-[var(--muted)]">{dict.careerUI.basedIn}</span>
        </div>
      </section>
    </Container>
  );
}

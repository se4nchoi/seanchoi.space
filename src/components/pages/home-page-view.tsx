import React from "react";
import Link from "next/link";
import type { AppLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/container";
import { ExternalLink } from "@/components/ui/external-link";
import { EngineeringEvidenceCard } from "@/components/ui/engineering-evidence-card";
import { WorkImage } from "@/components/ui/work-image";
import { workMedia } from "@/data/work-media";
import { canonicalContentRegistry, canonicalSupportingProjects } from "@/data/content";
import { getLocalizedText } from "@/lib/content/format";
import { localizePathname } from "@/i18n/routing";

export interface HomePageViewProps { locale: AppLocale }

const selectedIds = ["evidence-item-ruta40", "evidence-item-hoek-immersion"];
const textLink = "inline-flex min-h-[44px] items-center font-medium text-accent hover:underline";

export function HomePageView({ locale }: HomePageViewProps) {
  const dict = getDictionary(locale);
  const { siteIdentity, links } = canonicalContentRegistry;
  const selected = selectedIds.flatMap((id) => canonicalSupportingProjects.filter((item) => item.id === id));
  const current = canonicalSupportingProjects.find((item) => item.context === "current-work");
  const email = links.find((link) => link.kind === "email");
  const profiles = links.filter((link) => link.kind === "github" || link.kind === "linkedin");

  const renderWork = (item: (typeof canonicalSupportingProjects)[number], compact: boolean) => (
    <EngineeringEvidenceCard
      key={item.id}
      title={getLocalizedText(item.title, locale)}
      summary={getLocalizedText(item.summary, locale)}
      role={item.role ? getLocalizedText(item.role, locale) : undefined}
      evidenceLabel={item.context === "professional" ? dict.careerUI.professionalWorkLabel : dict.careerUI.personalProjectLabel}
      status={item.status}
      statusLabel={item.status === "in-progress" ? dict.careerUI.inProgress : dict.careerUI.completed}
      contributionBoundary={getLocalizedText(item.contributionBoundary, locale)}
      contributionBoundaryLabel={dict.careerUI.contributionBoundaryLabel}
      technologies={item.technologies}
      completedScope={item.completedScope.map((scope) => getLocalizedText(scope, locale))}
      plannedScope={item.plannedScope.map((scope) => getLocalizedText(scope, locale))}
      completedScopeLabel={dict.careerUI.completedFoundation}
      plannedScopeLabel={dict.careerUI.plannedNext}
      compact={compact}
      repositoryHref={item.repositoryHref as `https://${string}` | undefined}
      repositoryLabel={locale === "ko" ? "소스 코드" : "Source code"}
      newTabLabel={dict.openInNewTab}
      media={workMedia[item.id] ? <WorkImage media={workMedia[item.id]} locale={locale} /> : undefined}
    />
  );

  return (
    <Container className={`space-y-20 pb-16 sm:space-y-24 ${locale === "ko" ? "break-keep" : ""}`}>
      <section className="grid items-center gap-8 pt-8 sm:gap-12 sm:pt-12 md:grid-cols-[1.35fr_1fr] lg:gap-20">
        <div className="space-y-6">
        <p className="text-sm text-muted">{dict.careerUI.basedIn}</p>
        <h1 className="text-display font-semibold leading-tight tracking-display">
          {siteIdentity ? getLocalizedText(siteIdentity.displayName, locale) : "Sean Choi"}
        </h1>
        <p className="max-w-2xl text-2xl leading-snug tracking-tight lg:text-3xl">
          {dict.careerUI.homeHeadline}
        </p>
        <p className="max-w-xl text-body leading-relaxed text-muted">
          {dict.careerUI.homePositioning}
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <a href="#selected-work" className={textLink}>{dict.careerUI.viewProjects} <span aria-hidden="true" className="ml-2">↓</span></a>
          {email && <a href={email.href} className={textLink}>{dict.careerUI.emailLabel}</a>}
        </div>
        </div>
        <div className="mx-auto w-full max-w-[25rem] md:justify-self-end">
          <WorkImage media={workMedia["project-plc-robot-cell-integration"]} locale={locale} portrait />
        </div>
      </section>

      <section id="selected-work" className="scroll-mt-24 space-y-6">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="text-2xl font-semibold tracking-tight">{dict.careerUI.selectedEngineeringEvidence}</h2>
          <Link href={localizePathname("/projects", locale)} className={textLink}>{dict.careerUI.viewProjects} <span aria-hidden="true" className="ml-2">→</span></Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">{selected.map((item) => renderWork(item, true))}</div>
      </section>

      {current && <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">{dict.careerUI.currentlyBuilding}</h2>
        {renderWork(current, false)}
      </section>}

      <section className="space-y-4 border-t border-line pt-8">
        <h2 className="text-2xl font-semibold tracking-tight">{dict.careerUI.contactAndProfiles}</h2>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <Link href={localizePathname("/experience", locale)} className={textLink}>{dict.careerUI.viewExperience}</Link>
          {email && <a href={email.href} className={textLink}>{dict.careerUI.emailLabel}</a>}
          {profiles.map((link) => <ExternalLink key={link.id} href={link.href as `https://${string}`} newTabLabel={dict.openInNewTab}>{link.kind === "github" ? "GitHub" : "LinkedIn"}</ExternalLink>)}
        </div>
      </section>
    </Container>
  );
}

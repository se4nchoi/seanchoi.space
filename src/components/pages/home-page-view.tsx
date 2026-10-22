import React from "react";
import Link from "next/link";
import type { AppLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/container";
import { ExternalLink } from "@/components/ui/external-link";
import { WorkImage } from "@/components/ui/work-image";
import { WorkTile, type WorkTileProps } from "@/components/ui/work-tile";
import { homeHeroMedia, workMedia } from "@/data/work-media";
import { canonicalContentRegistry, canonicalSupportingProjects } from "@/data/content";
import { getLocalizedText } from "@/lib/content/format";
import { getWorkContextLabel } from "@/i18n/career-labels";
import { getVisibleCaseStudies } from "@/data/case-studies";
import { isPreviewChannel } from "@/lib/release-channel";
import { localizePathname } from "@/i18n/routing";

export interface HomePageViewProps { locale: AppLocale }

/** Professional records shown as tiles, in display order, after any case studies. */
const tileRecordIds = ["evidence-item-ruta40", "evidence-item-hoek-immersion", "evidence-item-smart-city"];
const textLink = "inline-flex min-h-[44px] items-center font-medium text-accent hover:underline";

export function HomePageView({ locale }: HomePageViewProps) {
  const dict = getDictionary(locale);
  const preview = isPreviewChannel();
  const { siteIdentity, links } = canonicalContentRegistry;
  const email = links.find((link) => link.kind === "email");
  const profiles = links.filter((link) => link.kind === "github" || link.kind === "linkedin");
  const projectsPath = localizePathname("/projects", locale);

  // Case-study copy stays English on Korean pages until reviewed (drafts show on preview).
  const pick = (text: { en: string; ko?: string; koReview: string }) =>
    locale === "ko" && text.ko && (text.koReview === "reviewed" || preview) ? text.ko : text.en;

  const caseStudyTiles: (WorkTileProps & { key: string })[] = getVisibleCaseStudies().map((study) => ({
    key: study.slug,
    href: localizePathname(`/projects/${study.slug}`, locale),
    title: pick(study.title),
    label: dict.careerUI.caseStudyLabel,
    detail: study.stack.slice(0, 3).join(" · "),
    image: { src: study.hero.src, width: study.hero.width, height: study.hero.height, fit: "cover" },
    placeholder: study.stack.slice(0, 3),
    badge: preview && !study.approved ? dict.careerUI.inReview : undefined,
  }));

  const recordTiles: (WorkTileProps & { key: string })[] = tileRecordIds.flatMap((id) => {
    const item = canonicalSupportingProjects.find((record) => record.id === id);
    if (!item) return [];
    const media = workMedia[item.id];
    return [{
      key: item.id,
      href: `${projectsPath}#${item.id}`,
      title: getLocalizedText(item.title, locale),
      label: getWorkContextLabel(item.context, locale),
      detail: item.role ? getLocalizedText(item.role, locale) : item.technologies.join(" · "),
      image: media ? { src: media.src, width: media.width, height: media.height, fit: "contain" } : undefined,
      placeholder: item.technologies,
    }];
  });

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
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="#selected-work" className={textLink}>{dict.careerUI.viewWork} <span aria-hidden="true" className="ml-2">↓</span></a>
            {email && <a href={email.href} className={textLink}>{dict.careerUI.emailLabel}</a>}
          </div>
        </div>
        <div className="w-full">
          <WorkImage media={homeHeroMedia} locale={locale} eager />
        </div>
      </section>

      <section id="selected-work" className="scroll-mt-24 space-y-6">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="text-2xl font-semibold tracking-tight">{dict.careerUI.selectedEngineeringEvidence}</h2>
          <Link href={projectsPath} className={textLink}>{dict.careerUI.viewProjects} <span aria-hidden="true" className="ml-2">→</span></Link>
        </div>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...caseStudyTiles, ...recordTiles].map(({ key, ...tile }) => (
            <li key={key}><WorkTile {...tile} /></li>
          ))}
        </ul>
      </section>

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

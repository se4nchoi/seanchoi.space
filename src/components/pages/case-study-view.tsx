import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { AppLocale } from "@/i18n/config";
import type { LocalizedText } from "@/lib/content/schemas";
import { getDictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/container";
import { ExternalLink } from "@/components/ui/external-link";
import { TwinArchitectureDiagram } from "@/components/case-study/twin-architecture-diagram";
import { BambooChatArchitectureDiagram } from "@/components/case-study/bamboochat-architecture-diagram";
import type { CaseStudy, CaseStudyFigure } from "@/data/case-studies";
import { isPreviewChannel } from "@/lib/release-channel";

const ui = {
  en: {
    back: "Back to projects",
    eyebrow: "Case study",
    context: "Context",
    period: "Period",
    status: "Status",
    stack: "Stack",
    howBuilt: "How it was built",
    problem: "The problem",
    built: "What I built",
    architecture: "Architecture",
    walkthrough: "Walkthrough",
    decisions: "Design decisions",
    verification: "How it's verified",
    limits: "What this doesn't show yet",
    next: "Next",
    source: "Source on GitHub",
    translationNotice: "",
    draftNotice: "",
    inReview: "In review: not yet approved for seanchoi.space",
  },
  ko: {
    back: "프로젝트로 돌아가기",
    eyebrow: "사례 연구",
    context: "맥락",
    period: "기간",
    status: "상태",
    stack: "기술",
    howBuilt: "만든 방식",
    problem: "문제",
    built: "만든 것",
    architecture: "아키텍처",
    walkthrough: "동작 흐름",
    decisions: "설계 결정",
    verification: "검증 방법",
    limits: "아직 보여 주지 못하는 것",
    next: "다음 단계",
    source: "GitHub에서 소스 보기",
    translationNotice: "이 사례 연구의 한국어 번역은 검토 중이며, 현재 영어로 제공됩니다.",
    draftNotice: "한국어 초안 · 검토 전 (미리보기 전용)",
    inReview: "검토 중: seanchoi.space에는 아직 공개되지 않음",
  },
} as const;

function isKoreanReviewed(study: CaseStudy): boolean {
  const texts: LocalizedText[] = [
    study.title, study.summary, study.context, study.period, study.status, study.howBuilt,
    study.hero.alt, study.hero.caption, study.walkthroughIntro,
    ...study.problem, ...study.built, ...study.decisions, ...study.verification,
    ...study.limits, ...study.next,
    ...study.walkthrough.flatMap((step) => [
      step.title, step.body,
      ...(step.figure ? [step.figure.alt, step.figure.caption] : []),
    ]),
  ];
  return texts.every((text) => text.koReview === "reviewed" && Boolean(text.ko));
}

const sectionHeading =
  "border-b border-line pb-2 text-heading-2 font-semibold tracking-display text-foreground";
const bodyText = "text-body leading-relaxed text-foreground";

function Shot({ figure, pick, priority = false }: { figure: CaseStudyFigure; pick: (t: LocalizedText) => string; priority?: boolean }) {
  return (
    <figure>
      <div className="overflow-hidden rounded-xl border border-line bg-[#0f1214]">
        <Image
          src={figure.src}
          alt={pick(figure.alt)}
          width={figure.width}
          height={figure.height}
          sizes="(max-width: 1199px) calc(100vw - 48px), 1100px"
          priority={priority}
          className="h-auto w-full"
        />
      </div>
      <figcaption className="mt-3 text-xs leading-relaxed text-muted">{pick(figure.caption)}</figcaption>
    </figure>
  );
}

function BulletList({ items, pick }: { items: LocalizedText[]; pick: (t: LocalizedText) => string }) {
  return (
    <ul className={`list-disc space-y-2 pl-5 ${bodyText}`}>
      {items.map((item) => (
        <li key={item.en}>{pick(item)}</li>
      ))}
    </ul>
  );
}

export function CaseStudyView({ study, locale }: { study: CaseStudy; locale: AppLocale }) {
  const dict = getDictionary(locale);
  const t = ui[locale];
  const preview = isPreviewChannel();
  const koReviewed = isKoreanReviewed(study);
  // Preview shows Korean drafts in context so Sean can review them; production waits for approval.
  const contentLocale: AppLocale = locale === "ko" && (koReviewed || preview) ? "ko" : "en";
  const showingKoDraft = locale === "ko" && contentLocale === "ko" && !koReviewed;
  const pick = (text: LocalizedText) => (contentLocale === "ko" && text.ko ? text.ko : text.en);
  const backHref = locale === "ko" ? "/ko/projects" : "/projects";

  return (
    <Container size="default" className={`space-y-14 pb-16 ${locale === "ko" ? "break-keep" : ""}`}>
      <nav aria-label={dict.backNavigation}>
        <Link href={backHref} className="inline-flex min-h-[44px] items-center text-small font-medium text-accent hover:underline">
          ← {t.back}
        </Link>
      </nav>

      <header className="space-y-5" lang={contentLocale}>
        <p className="text-small font-medium uppercase tracking-label text-accent">{t.eyebrow}</p>
        <h1 className="text-display font-semibold leading-tight tracking-display">{pick(study.title)}</h1>
        <p className="max-w-3xl text-xl leading-relaxed text-foreground">{pick(study.summary)}</p>
        {preview && !study.approved && (
          <p className="rounded-[var(--radius-sm)] border border-accent p-3 text-small font-medium text-accent">{t.inReview}</p>
        )}
        {showingKoDraft && (
          <p lang="ko" className="rounded-[var(--radius-sm)] border border-line bg-surface p-3 text-small text-muted">{t.draftNotice}</p>
        )}
        {t.translationNotice && contentLocale !== locale && (
          <p lang="ko" className="rounded-[var(--radius-sm)] border border-line bg-surface p-3 text-small text-muted">{t.translationNotice}</p>
        )}
        <p className="text-small">
          <ExternalLink href={study.repositoryHref} newTabLabel={dict.openInNewTab}>{t.source}</ExternalLink>
        </p>
      </header>

      <Shot figure={study.hero} pick={pick} priority />

      <dl className="grid gap-5 rounded-[var(--radius-md)] border border-line bg-surface p-6 text-small sm:grid-cols-2" lang={contentLocale}>
        {[
          [t.context, pick(study.context)],
          [t.period, pick(study.period)],
          [t.status, pick(study.status)],
          [t.stack, study.stack.join(" · ")],
        ].map(([term, value]) => (
          <div key={term}>
            <dt className="mb-1 font-mono text-xs uppercase tracking-wider text-muted">{term}</dt>
            <dd className="font-medium text-foreground">{value}</dd>
          </div>
        ))}
        <div className="sm:col-span-2">
          <dt className="mb-1 font-mono text-xs uppercase tracking-wider text-muted">{t.howBuilt}</dt>
          <dd className="leading-relaxed text-foreground">{pick(study.howBuilt)}</dd>
        </div>
      </dl>

      <div className="mx-auto max-w-3xl space-y-14" lang={contentLocale}>
        <section className="space-y-4">
          <h2 className={sectionHeading}>{t.problem}</h2>
          {study.problem.map((p) => <p key={p.en} className={bodyText}>{pick(p)}</p>)}
        </section>

        <section className="space-y-4">
          <h2 className={sectionHeading}>{t.built}</h2>
          <BulletList items={study.built} pick={pick} />
        </section>

        <section className="space-y-6">
          <h2 className={sectionHeading}>{t.architecture}</h2>
          {study.diagram === "indy7-twin" ? (
            <TwinArchitectureDiagram locale={contentLocale} />
          ) : (
            <BambooChatArchitectureDiagram locale={contentLocale} />
          )}
        </section>
      </div>

      <section className="space-y-8" lang={contentLocale}>
        <div className="mx-auto max-w-3xl space-y-2">
          <h2 className={sectionHeading}>{t.walkthrough}</h2>
          <p className="text-body text-muted">{pick(study.walkthroughIntro)}</p>
        </div>
        <ol className="space-y-12">
          {study.walkthrough.map((step, index) => (
            <li key={step.title.en} className="space-y-4">
              <div className="mx-auto max-w-3xl space-y-2">
                <h3 className="text-heading-3 font-semibold text-foreground">
                  <span className="mr-2 font-mono text-accent">{index + 1}.</span>
                  {pick(step.title)}
                </h3>
                <p className={bodyText}>{pick(step.body)}</p>
              </div>
              {step.figure && <Shot figure={step.figure} pick={pick} />}
            </li>
          ))}
        </ol>
      </section>

      <div className="mx-auto max-w-3xl space-y-14" lang={contentLocale}>
        <section className="space-y-4">
          <h2 className={sectionHeading}>{t.decisions}</h2>
          <BulletList items={study.decisions} pick={pick} />
        </section>
        <section className="space-y-4">
          <h2 className={sectionHeading}>{t.verification}</h2>
          <BulletList items={study.verification} pick={pick} />
        </section>
        <section className="space-y-4">
          <h2 className={sectionHeading}>{t.limits}</h2>
          <BulletList items={study.limits} pick={pick} />
        </section>
        <section className="space-y-4">
          <h2 className={sectionHeading}>{t.next}</h2>
          <BulletList items={study.next} pick={pick} />
          <p className="pt-2 text-small">
            <ExternalLink href={study.repositoryHref} newTabLabel={dict.openInNewTab}>{t.source}</ExternalLink>
          </p>
        </section>
      </div>
    </Container>
  );
}

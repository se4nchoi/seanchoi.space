import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { AppLocale } from "@/i18n/config";
import type { CaseStudy } from "@/data/case-studies";
import { isPreviewChannel } from "@/lib/release-channel";

const ui = {
  en: { eyebrow: "Case study", read: "Read the case study", inReview: "In review" },
  ko: { eyebrow: "사례 연구", read: "사례 연구 보기", inReview: "검토 중" },
} as const;

/** Homepage/projects teaser. Copy stays English until the Korean case study is reviewed. */
export function FeaturedCaseStudy({
  study,
  locale,
  headingLevel = 2,
  showEyebrow = true,
}: {
  study: CaseStudy;
  locale: AppLocale;
  headingLevel?: 2 | 3;
  /** Off when a surrounding section heading already says "Case studies". */
  showEyebrow?: boolean;
}) {
  const t = ui[locale];
  const href = `${locale === "ko" ? "/ko" : ""}/projects/${study.slug}`;
  const preview = isPreviewChannel();
  // Preview shows Korean drafts; production shows reviewed Korean only.
  const pick = (text: { en: string; ko?: string; koReview: string }) =>
    locale === "ko" && text.ko && (text.koReview === "reviewed" || preview) ? text.ko : text.en;
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <article className="grid gap-6 overflow-hidden rounded-xl border border-line bg-surface md:grid-cols-[1.3fr_1fr]">
      <Link href={href} className="block bg-[#0f1214]" tabIndex={-1} aria-hidden="true">
        <Image
          src={study.hero.src}
          alt=""
          width={study.hero.width}
          height={study.hero.height}
          sizes="(max-width: 767px) calc(100vw - 48px), 640px"
          className="h-full w-full object-cover object-left-top"
        />
      </Link>
      <div className="flex flex-col justify-center gap-4 p-6 md:pl-0 md:pr-8">
        {(showEyebrow || (preview && !study.approved)) && (
          <p className="text-sm font-medium text-accent">
            {showEyebrow && t.eyebrow}
            {preview && !study.approved && (
              <span className="ml-2 rounded border border-accent px-1.5 py-0.5 text-xs">{t.inReview}</span>
            )}
          </p>
        )}
        <Heading className="text-heading-3 font-semibold leading-tight">
          <Link href={href} className="hover:underline">
            {pick(study.title)}
          </Link>
        </Heading>
        <p className="text-body leading-relaxed text-foreground">{pick(study.summary)}</p>
        <p className="text-small text-muted">{study.stack.join(" · ")}</p>
        <Link href={href} className="inline-flex min-h-[44px] items-center font-medium text-accent hover:underline">
          {t.read} <span aria-hidden="true" className="ml-2">→</span>
        </Link>
      </div>
    </article>
  );
}

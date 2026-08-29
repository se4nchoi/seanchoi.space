import React from "react";
import Link from "next/link";
import type { AppLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/container";
import { PageIntro } from "@/components/ui/page-intro";
import { Tag } from "@/components/ui/tag";
import { Prose } from "@/components/ui/prose";
import {
  skeletonArticleEn,
  skeletonArticleKo,
  skeletonArticleNarrative,
} from "@/data/skeleton-preview";

export interface BlogArticleViewProps {
  locale: AppLocale;
  slug?: string;
}

export function BlogArticleView({ locale }: BlogArticleViewProps) {
  const dict = getDictionary(locale);
  const isKo = locale === "ko";
  const article = isKo ? skeletonArticleKo : skeletonArticleEn;
  const narrative = skeletonArticleNarrative[locale] || skeletonArticleNarrative.en;
  const backHref = isKo ? "/ko/blog" : "/blog";

  return (
    <Container size="default" className="space-y-10 pb-16">
      {/* Back Navigation */}
      <nav aria-label={dict.skeleton.backNavigation}>
        <Link
          href={backHref}
          className="inline-flex items-center min-h-[44px] text-[length:var(--text-small)] font-medium text-[var(--accent)] hover:underline focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)]"
        >
          ← {dict.skeleton.backToBlog}
        </Link>
      </nav>

      {/* Article Header */}
      <header className="space-y-4">
        <PageIntro
          eyebrow={dict.skeleton.eyebrow}
          title={article.title}
          summary={article.summary}
        />
        <div className="flex flex-wrap items-center gap-4 text-[length:var(--text-small)]">
          <time dateTime={article.publishedOn} className="font-mono text-[var(--muted)]">
            {article.publishedOn}
          </time>
          <div className="flex flex-wrap gap-2">
            {article.topics.map((topic) => (
              <Tag key={topic} variant="muted">
                {topic}
              </Tag>
            ))}
          </div>
        </div>
      </header>

      {/* Disclaimer & Notice */}
      <div className="rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface)] p-4 text-[length:var(--text-small)] text-[var(--muted)] space-y-1 leading-[var(--leading-relaxed)]">
        <p className="font-semibold text-[var(--foreground)]">
          {dict.skeleton.articleDisclaimer}
        </p>
        <p>{dict.skeleton.notice}</p>
      </div>

      {/* Article Narrative Body through Prose */}
      <article className="pt-4">
        <Prose>
          <p className="text-lg leading-[var(--leading-relaxed)] font-medium text-[var(--foreground)]">
            {narrative.lede}
          </p>
          {narrative.sections.map((section) => (
            <React.Fragment key={section.heading}>
              <h2>{section.heading}</h2>
              <p>{section.body}</p>
            </React.Fragment>
          ))}
        </Prose>
      </article>
    </Container>
  );
}

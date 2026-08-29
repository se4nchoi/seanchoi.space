import React from "react";
import type { AppLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/container";
import { PageIntro } from "@/components/ui/page-intro";
import { ArticleCard } from "@/components/ui/article-card";
import {
  skeletonArticleEn,
  skeletonArticleKo,
} from "@/data/skeleton-preview";

export interface BlogIndexViewProps {
  locale: AppLocale;
}

export function BlogIndexView({ locale }: BlogIndexViewProps) {
  const dict = getDictionary(locale);
  const isKo = locale === "ko";
  const article = isKo ? skeletonArticleKo : skeletonArticleEn;
  const detailHref = isKo
    ? "/ko/blog/example-article"
    : "/blog/example-article";

  return (
    <Container size="default" className="space-y-12 pb-16">
      <div className="space-y-6">
        <PageIntro
          eyebrow={dict.skeleton.eyebrow}
          title={dict.blog}
          summary={article.summary}
        />
        <div className="rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface)] p-4 text-[length:var(--text-small)] text-[var(--muted)] leading-[var(--leading-relaxed)]">
          {dict.skeleton.notice}
        </div>
      </div>

      <section aria-label={dict.blog} className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <ArticleCard
            title={article.title}
            summary={article.summary}
            date={article.publishedOn}
            topics={article.topics}
            href={detailHref}
            headingLevel={2}
          />
        </div>
      </section>
    </Container>
  );
}

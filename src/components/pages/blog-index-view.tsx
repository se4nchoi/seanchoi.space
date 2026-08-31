import React from "react";
import Link from "next/link";
import type { AppLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/container";
import { PageIntro } from "@/components/ui/page-intro";
import { ArticleCard } from "@/components/ui/article-card";
import { TopicList } from "@/components/blog/topic-list";
import { getBlogArticles, getTopicsWithCounts } from "@/lib/content/blog";

export interface BlogIndexViewProps {
  locale: AppLocale;
  preview?: boolean;
}

export function BlogIndexView({
  locale,
  preview: previewProp,
}: BlogIndexViewProps) {
  const dict = getDictionary(locale);
  const isKo = locale === "ko";
  const preview = previewProp ?? false;
  const articles = getBlogArticles(locale, { preview });
  const topics = getTopicsWithCounts(locale, { allowPreview: preview });

  // When empty (standard production launch state)
  if (articles.length === 0) {
    return (
      <Container size="default" className="space-y-12 pb-16">
        <PageIntro
          title={dict.blogUI.emptyTitle}
          summary={dict.blogUI.emptyBody}
        />
        <div className="rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface)] p-6 text-[length:var(--text-small)] text-[var(--muted)] leading-[var(--leading-relaxed)]">
          <p>{dict.blogUI.emptyBody}</p>
          <div className="mt-4 pt-4 border-t border-[var(--border)]">
            <Link
              href="/feed.xml"
              className="inline-flex items-center gap-1.5 text-[var(--accent)] font-medium hover:underline focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)]"
            >
              <span>{dict.blogUI.feedSubscribe}</span>
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </Container>
    );
  }

  // Preview or populated state
  const isAllSynthetic = articles.every((a) => a.syntheticPlaceholder);

  return (
    <Container size="default" className="space-y-12 pb-16">
      <div className="space-y-6">
        <PageIntro
          eyebrow={isAllSynthetic ? dict.skeleton.eyebrow : undefined}
          title={dict.blog}
          summary={
            isAllSynthetic
              ? articles[0]?.summary || dict.blogStatus
              : dict.blogStatus
          }
        />
        {isAllSynthetic && (
          <div className="rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface)] p-4 text-[length:var(--text-small)] text-[var(--muted)] leading-[var(--leading-relaxed)]">
            {dict.skeleton.notice}
          </div>
        )}
      </div>

      {topics.length > 0 && !isAllSynthetic && (
        <TopicList topics={topics} title={dict.blogUI.topics} />
      )}

      <section aria-label={dict.blog} className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          {articles.map((article) => {
            const detailHref = isKo
              ? `/ko/blog/${article.slug}`
              : `/blog/${article.slug}`;
            return (
              <ArticleCard
                key={article.id}
                title={article.title}
                summary={article.summary}
                date={article.publishedOn}
                topics={article.topics}
                href={detailHref}
                headingLevel={2}
              />
            );
          })}
        </div>
      </section>

      <div className="pt-6 border-t border-[var(--border)] text-[length:var(--text-small)] text-[var(--muted)]">
        <Link
          href="/feed.xml"
          className="inline-flex items-center gap-1 text-[var(--accent)] hover:underline"
        >
          <span>{dict.blogUI.feedSubscribe}</span>
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </Container>
  );
}

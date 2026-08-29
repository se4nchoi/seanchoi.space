import React from "react";
import type { ArticleRecord } from "@/lib/content/schemas";
import { ArticleCard } from "@/components/ui/article-card";

export interface RelatedArticlesProps {
  articles: ArticleRecord[];
  title?: string;
}

export function RelatedArticles({
  articles,
  title = "Related writing",
}: RelatedArticlesProps) {
  if (articles.length === 0) {
    return null;
  }

  return (
    <section
      aria-label={title}
      className="mt-12 space-y-4 border-t border-[var(--border)] pt-8"
    >
      <h2 className="text-[length:var(--text-heading-3)] font-semibold text-[var(--foreground)]">
        {title}
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => {
          const href =
            article.locale === "ko"
              ? `/ko/blog/${article.slug}`
              : `/blog/${article.slug}`;
          return (
            <ArticleCard
              key={article.id}
              title={article.title}
              summary={article.summary}
              date={article.publishedOn}
              topics={article.topics}
              href={href}
              headingLevel={3}
            />
          );
        })}
      </div>
    </section>
  );
}

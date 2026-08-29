import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import type { MDXComponents } from "mdx/types";
import type { AppLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/container";
import { PageIntro } from "@/components/ui/page-intro";
import { Tag } from "@/components/ui/tag";
import { Prose } from "@/components/ui/prose";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { RelatedArticles } from "@/components/blog/related-articles";
import { createMdxComponents } from "@/components/blog/mdx-components";
import {
  getBlogArticleBySlug,
  getArticleTranslationCounterpart,
  getRelatedArticles,
  createHeadingIdGenerator,
} from "@/lib/content/blog";
import { isSkeletonPreviewEnabled } from "@/lib/skeleton-preview";

export interface BlogArticleViewProps {
  locale: AppLocale;
  slug: string;
  preview?: boolean;
  loadComponent?: () => Promise<{ default: ComponentType<{ components?: MDXComponents }> }>;
}

export async function BlogArticleView({
  locale,
  slug,
  preview: previewProp,
  loadComponent: loadComponentOverride,
}: BlogArticleViewProps) {
  const dict = getDictionary(locale);
  const isKo = locale === "ko";
  const preview =
    previewProp ?? (isSkeletonPreviewEnabled() || process.env.NODE_ENV === "test");

  const articleData = getBlogArticleBySlug(locale, slug, { preview });
  if (!articleData) {
    notFound();
  }

  const { record: article, headings, loadComponent: defaultLoader } = articleData;
  const backHref = isKo ? "/ko/blog" : "/blog";

  // Check for public translation counterpart (or preview counterpart if preview mode)
  const counterpart = getArticleTranslationCounterpart(
    article,
    undefined,
    !preview
  );

  // Calculate related articles
  const related = getRelatedArticles(article, undefined, {
    allowPreview: preview,
  });

  // Dynamic MDX component load
  const loader = loadComponentOverride || defaultLoader;
  const { default: MDXContent } = await loader();

  // Create duplicate-aware heading generator for this render
  const getHeadingId = createHeadingIdGenerator();
  const components = createMdxComponents({ getHeadingId, locale });

  return (
    <Container size="default" className="space-y-10 pb-16">
      {/* Back Navigation */}
      <nav aria-label={dict.skeleton.backNavigation}>
        <Link
          href={backHref}
          className="inline-flex items-center min-h-[44px] text-[length:var(--text-small)] font-medium text-[var(--accent)] hover:underline focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)]"
        >
          ← {dict.blogUI.backToBlog}
        </Link>
      </nav>

      {/* Missing Translation Notice if no counterpart is available */}
      {!counterpart && (
        <aside
          role="region"
          aria-label={dict.blogUI.translationUnavailable}
          className="rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface)] p-4 text-[length:var(--text-small)] text-[var(--muted)] leading-[var(--leading-relaxed)]"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <span className="font-semibold text-[var(--foreground)] mr-2">
                {dict.blogUI.translationUnavailable}:
              </span>
              <span>{dict.blogUI.translationUnavailableNotice}</span>
            </div>
            <Link
              href={isKo ? "/blog" : "/ko/blog"}
              className="text-[var(--accent)] hover:underline font-medium text-xs whitespace-nowrap"
            >
              {isKo ? dict.blogUI.viewEnglishBlog : dict.blogUI.viewKoreanBlog}
            </Link>
          </div>
        </aside>
      )}

      {/* Article Header */}
      <header className="space-y-4">
        <PageIntro
          eyebrow={article.syntheticPlaceholder ? dict.skeleton.eyebrow : undefined}
          title={article.title}
          summary={article.summary}
        />
        <div className="flex flex-wrap items-center gap-4 text-[length:var(--text-small)]">
          <div className="flex items-center gap-2 font-mono text-[var(--muted)]">
            <span>{dict.blogUI.publishedOn}:</span>
            <time dateTime={article.publishedOn}>{article.publishedOn}</time>
          </div>
          {article.updatedOn && (
            <div className="flex items-center gap-2 font-mono text-[var(--muted)]">
              <span>{dict.blogUI.updatedOn}:</span>
              <time dateTime={article.updatedOn}>{article.updatedOn}</time>
            </div>
          )}
          {article.topics.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {article.topics.map((topic) => (
                <Tag key={topic} variant="muted">
                  {topic}
                </Tag>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Synthetic Preview Disclaimer */}
      {article.syntheticPlaceholder && (
        <div className="rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface)] p-4 text-[length:var(--text-small)] text-[var(--muted)] space-y-1 leading-[var(--leading-relaxed)]">
          <p className="font-semibold text-[var(--foreground)]">
            {dict.skeleton.articleDisclaimer}
          </p>
          <p>{dict.skeleton.notice}</p>
        </div>
      )}

      {/* Table of Contents */}
      {headings.length > 0 && (
        <TableOfContents
          headings={headings}
          title={dict.blogUI.tableOfContents}
        />
      )}

      {/* Article Body rendered via MDX */}
      <article className="pt-2">
        <Prose>
          <MDXContent components={components} />
        </Prose>
      </article>

      {/* Related Content */}
      <RelatedArticles
        articles={related}
        title={dict.blogUI.relatedWriting}
      />
    </Container>
  );
}

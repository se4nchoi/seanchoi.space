import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { AppLocale } from "@/i18n/config";
import { localizePathname } from "@/i18n/routing";
import { BlogArticleView } from "@/components/pages/blog-article-view";
import {
  getBlogArticles,
  getBlogArticleBySlug,
  getArticleTranslationCounterpart,
} from "@/lib/content/blog";
import { createPageMetadata } from "@/lib/seo/metadata";
import { isSkeletonPreviewEnabled } from "@/lib/skeleton-preview";

interface SlugRouteProps {
  params: Promise<{ slug: string }>;
}

/**
 * Builds the `/blog/[slug]` route handlers for one locale. Each locale's
 * route file re-exports these so both stay behaviorally identical.
 */
export function createBlogArticleRoute(locale: AppLocale) {
  function generateStaticParams() {
    const preview = isSkeletonPreviewEnabled();
    return getBlogArticles(locale, { preview }).map((article) => ({
      slug: article.slug,
    }));
  }

  async function generateMetadata({ params }: SlugRouteProps): Promise<Metadata> {
    const { slug } = await params;
    const preview = isSkeletonPreviewEnabled();
    const articleData = getBlogArticleBySlug(locale, slug, { preview });

    if (!articleData) {
      return {};
    }

    const { record } = articleData;
    const counterpart = getArticleTranslationCounterpart(record, undefined, !preview);
    const selfPath = localizePathname(`/blog/${record.slug}`, locale);

    // Point to the counterpart's exact slug when a valid translation exists;
    // otherwise omit the other language entirely.
    const alternatePaths = counterpart
      ? locale === "en"
        ? { en: selfPath, ko: `/ko/blog/${counterpart.slug}`, "x-default": selfPath }
        : {
            en: `/blog/${counterpart.slug}`,
            ko: selfPath,
            "x-default": `/blog/${counterpart.slug}`,
          }
      : { [locale]: selfPath, "x-default": selfPath };

    return createPageMetadata({
      locale,
      pathname: `/blog/${record.slug}`,
      title: record.title,
      description: record.summary,
      alternatePaths,
      feedDiscovery: true,
    });
  }

  async function BlogArticlePage({ params }: SlugRouteProps) {
    const { slug } = await params;
    const preview = isSkeletonPreviewEnabled();

    if (!getBlogArticleBySlug(locale, slug, { preview })) {
      notFound();
    }

    return <BlogArticleView locale={locale} slug={slug} preview={preview} />;
  }

  return { generateStaticParams, generateMetadata, BlogArticlePage };
}

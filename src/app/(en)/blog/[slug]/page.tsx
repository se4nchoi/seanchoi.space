import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticleView } from "@/components/pages/blog-article-view";
import {
  getBlogArticles,
  getBlogArticleBySlug,
  getArticleTranslationCounterpart,
} from "@/lib/content/blog";
import { createPageMetadata } from "@/lib/seo/metadata";
import { isSkeletonPreviewEnabled } from "@/lib/skeleton-preview";

export const dynamicParams = false;

export async function generateStaticParams() {
  const preview = isSkeletonPreviewEnabled();
  const articles = getBlogArticles("en", { preview });
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const preview = isSkeletonPreviewEnabled();
  const articleData = getBlogArticleBySlug("en", slug, { preview });

  if (!articleData) {
    return {};
  }

  const { record } = articleData;
  const counterpart = getArticleTranslationCounterpart(
    record,
    undefined,
    !preview
  );

  // If a valid counterpart exists, point to its exact slug; otherwise, omit alternate language
  const alternatePaths = counterpart
    ? {
        en: `/blog/${record.slug}`,
        ko: `/ko/blog/${counterpart.slug}`,
        "x-default": `/blog/${record.slug}`,
      }
    : {
        en: `/blog/${record.slug}`,
        "x-default": `/blog/${record.slug}`,
      };

  return createPageMetadata({
    locale: "en",
    pathname: `/blog/${record.slug}`,
    title: record.title,
    description: record.summary,
    alternatePaths,
    feedDiscovery: true,
  });
}

export default async function EnglishBlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const preview = isSkeletonPreviewEnabled();
  const articleData = getBlogArticleBySlug("en", slug, { preview });

  if (!articleData) {
    notFound();
  }

  return <BlogArticleView locale="en" slug={slug} preview={preview} />;
}

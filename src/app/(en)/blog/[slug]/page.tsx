import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createPageMetadata } from "@/lib/seo/metadata";
import { isSkeletonPreviewEnabled } from "@/lib/skeleton-preview";
import { skeletonArticleEn } from "@/data/skeleton-preview";
import { BlogArticleView } from "@/components/pages/blog-article-view";

export const dynamicParams = false;

export function generateStaticParams() {
  if (!isSkeletonPreviewEnabled()) {
    return [];
  }
  return [{ slug: "example-article" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isSkeletonPreviewEnabled() || slug !== "example-article") {
    return {};
  }
  return createPageMetadata({
    locale: "en",
    pathname: `/blog/${slug}`,
    title: skeletonArticleEn.title,
    description: skeletonArticleEn.summary,
  });
}

export default async function EnglishBlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isSkeletonPreviewEnabled() || slug !== "example-article") {
    notFound();
  }
  return <BlogArticleView locale="en" slug={slug} />;
}

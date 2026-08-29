import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createPageMetadata } from "@/lib/seo/metadata";
import { isSkeletonPreviewEnabled } from "@/lib/skeleton-preview";
import { skeletonArticleKo } from "@/data/skeleton-preview";
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
    locale: "ko",
    pathname: `/ko/blog/${slug}`,
    title: skeletonArticleKo.title,
    description: skeletonArticleKo.summary,
  });
}

export default async function KoreanBlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isSkeletonPreviewEnabled() || slug !== "example-article") {
    notFound();
  }
  return <BlogArticleView locale="ko" slug={slug} />;
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createPageMetadata } from "@/lib/seo/metadata";
import { isSkeletonPreviewEnabled } from "@/lib/skeleton-preview";
import { skeletonProjectKo } from "@/data/skeleton-preview";
import { ProjectDetailView } from "@/components/pages/project-detail-view";

export const dynamicParams = false;

export function generateStaticParams() {
  if (!isSkeletonPreviewEnabled()) {
    return [];
  }
  return [{ slug: "example-project" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isSkeletonPreviewEnabled() || slug !== "example-project") {
    return {};
  }
  return createPageMetadata({
    locale: "ko",
    pathname: `/ko/projects/${slug}`,
    title: skeletonProjectKo.title,
    description: skeletonProjectKo.summary,
  });
}

export default async function KoreanProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isSkeletonPreviewEnabled() || slug !== "example-project") {
    notFound();
  }
  return <ProjectDetailView locale="ko" slug={slug} />;
}

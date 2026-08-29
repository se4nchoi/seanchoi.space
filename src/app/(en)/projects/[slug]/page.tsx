import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createPageMetadata } from "@/lib/seo/metadata";
import { isSkeletonPreviewEnabled } from "@/lib/skeleton-preview";
import { skeletonProjectEn } from "@/data/skeleton-preview";
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
    locale: "en",
    pathname: `/projects/${slug}`,
    title: skeletonProjectEn.title,
    description: skeletonProjectEn.summary,
  });
}

export default async function EnglishProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isSkeletonPreviewEnabled() || slug !== "example-project") {
    notFound();
  }
  return <ProjectDetailView locale="en" slug={slug} />;
}

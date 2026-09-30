import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { AppLocale } from "@/i18n/config";
import { ProjectDetailView } from "@/components/pages/project-detail-view";
import {
  skeletonProjectEn,
  skeletonProjectKo,
  skeletonProjectNarrative,
} from "@/data/skeleton-preview";
import { createPageMetadata } from "@/lib/seo/metadata";
import { isSkeletonPreviewEnabled } from "@/lib/skeleton-preview";

interface SlugRouteProps {
  params: Promise<{ slug: string }>;
}

// Only the synthetic preview project has a detail page until WP7 case
// studies exist; production builds emit no project-detail routes.
const PREVIEW_PROJECT_SLUG = "example-project";

function isRenderableSlug(slug: string): boolean {
  return isSkeletonPreviewEnabled() && slug === PREVIEW_PROJECT_SLUG;
}

/**
 * Builds the `/projects/[slug]` route handlers for one locale. Each locale's
 * route file re-exports these so both stay behaviorally identical.
 */
export function createProjectDetailRoute(locale: AppLocale) {
  // WP7 replaces this with lookups into verified case-study records.
  const project = locale === "ko" ? skeletonProjectKo : skeletonProjectEn;
  const narrative = skeletonProjectNarrative[locale];

  function generateStaticParams() {
    return isSkeletonPreviewEnabled() ? [{ slug: PREVIEW_PROJECT_SLUG }] : [];
  }

  async function generateMetadata({ params }: SlugRouteProps): Promise<Metadata> {
    const { slug } = await params;
    if (!isRenderableSlug(slug)) {
      return {};
    }

    return createPageMetadata({
      locale,
      pathname: `/projects/${slug}`,
      title: project.title,
      description: project.summary,
    });
  }

  async function ProjectDetailPage({ params }: SlugRouteProps) {
    const { slug } = await params;
    if (!isRenderableSlug(slug)) {
      notFound();
    }
    return <ProjectDetailView locale={locale} project={project} narrative={narrative} />;
  }

  return { generateStaticParams, generateMetadata, ProjectDetailPage };
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { AppLocale } from "@/i18n/config";
import { ProjectDetailView } from "@/components/pages/project-detail-view";
import { CaseStudyView } from "@/components/pages/case-study-view";
import { getCaseStudy, getVisibleCaseStudies } from "@/data/case-studies";
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

// Published case studies always have detail pages; the synthetic preview
// project is added only when skeleton preview is enabled.
const PREVIEW_PROJECT_SLUG = "example-project";

function isPreviewSlug(slug: string): boolean {
  return isSkeletonPreviewEnabled() && slug === PREVIEW_PROJECT_SLUG;
}

/**
 * Builds the `/projects/[slug]` route handlers for one locale. Each locale's
 * route file re-exports these so both stay behaviorally identical.
 */
export function createProjectDetailRoute(locale: AppLocale) {
  const project = locale === "ko" ? skeletonProjectKo : skeletonProjectEn;
  const narrative = skeletonProjectNarrative[locale];

  function generateStaticParams() {
    const slugs = getVisibleCaseStudies().map((study) => ({ slug: study.slug }));
    return isSkeletonPreviewEnabled() ? [...slugs, { slug: PREVIEW_PROJECT_SLUG }] : slugs;
  }

  async function generateMetadata({ params }: SlugRouteProps): Promise<Metadata> {
    const { slug } = await params;
    const study = getCaseStudy(slug);
    if (study) {
      return createPageMetadata({
        locale,
        pathname: `/projects/${slug}`,
        title: study.title.en,
        description: study.summary.en,
      });
    }
    if (!isPreviewSlug(slug)) {
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
    const study = getCaseStudy(slug);
    if (study) {
      return <CaseStudyView study={study} locale={locale} />;
    }
    if (!isPreviewSlug(slug)) {
      notFound();
    }
    return <ProjectDetailView locale={locale} project={project} narrative={narrative} />;
  }

  return { generateStaticParams, generateMetadata, ProjectDetailPage };
}

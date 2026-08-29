import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import { createPageMetadata } from "@/lib/seo/metadata";
import { isSkeletonPreviewEnabled } from "@/lib/skeleton-preview";
import { ProjectsIndexView } from "@/components/pages/projects-index-view";
import { StatusPageView } from "@/components/pages/status-page-view";

const dict = getDictionary("en");

export const metadata: Metadata = createPageMetadata({
  locale: "en",
  pathname: "/projects",
  title: dict.projects,
  description: dict.projectsStatus,
});

export default function EnglishProjectsPage() {
  if (isSkeletonPreviewEnabled()) {
    return <ProjectsIndexView locale="en" />;
  }
  return <StatusPageView title={dict.projects} summary={dict.projectsStatus} />;
}

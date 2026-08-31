import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import { createPageMetadata } from "@/lib/seo/metadata";
import { ProjectsIndexView } from "@/components/pages/projects-index-view";

const dict = getDictionary("en");

export const metadata: Metadata = createPageMetadata({
  locale: "en",
  pathname: "/projects",
  title: dict.projects,
  description: dict.projectsStatus,
});

export default function EnglishProjectsPage() {
  return <ProjectsIndexView locale="en" />;
}

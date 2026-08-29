import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import { createPageMetadata } from "@/lib/seo/metadata";
import { isSkeletonPreviewEnabled } from "@/lib/skeleton-preview";
import { ExperiencePageView } from "@/components/pages/experience-page-view";
import { StatusPageView } from "@/components/pages/status-page-view";

const dict = getDictionary("en");

export const metadata: Metadata = createPageMetadata({
  locale: "en",
  pathname: "/experience",
  title: dict.experience,
  description: dict.experienceStatus,
});

export default function EnglishExperiencePage() {
  if (isSkeletonPreviewEnabled()) {
    return <ExperiencePageView locale="en" />;
  }
  return <StatusPageView title={dict.experience} summary={dict.experienceStatus} />;
}

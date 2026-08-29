import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import { createPageMetadata } from "@/lib/seo/metadata";
import { isSkeletonPreviewEnabled } from "@/lib/skeleton-preview";
import { ExperiencePageView } from "@/components/pages/experience-page-view";
import { StatusPageView } from "@/components/pages/status-page-view";

const dict = getDictionary("ko");

export const metadata: Metadata = createPageMetadata({
  locale: "ko",
  pathname: "/ko/experience",
  title: dict.experience,
  description: dict.experienceStatus,
});

export default function KoreanExperiencePage() {
  if (isSkeletonPreviewEnabled()) {
    return <ExperiencePageView locale="ko" />;
  }
  return <StatusPageView title={dict.experience} summary={dict.experienceStatus} />;
}

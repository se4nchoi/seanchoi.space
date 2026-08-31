import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import { createPageMetadata } from "@/lib/seo/metadata";
import { ExperiencePageView } from "@/components/pages/experience-page-view";

const dict = getDictionary("ko");

export const metadata: Metadata = createPageMetadata({
  locale: "ko",
  pathname: "/ko/experience",
  title: dict.experience,
  description: dict.experienceStatus,
});

export default function KoreanExperiencePage() {
  return <ExperiencePageView locale="ko" />;
}

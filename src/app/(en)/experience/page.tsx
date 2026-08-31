import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import { createPageMetadata } from "@/lib/seo/metadata";
import { ExperiencePageView } from "@/components/pages/experience-page-view";

const dict = getDictionary("en");

export const metadata: Metadata = createPageMetadata({
  locale: "en",
  pathname: "/experience",
  title: dict.experience,
  description: dict.experienceStatus,
});

export default function EnglishExperiencePage() {
  return <ExperiencePageView locale="en" />;
}

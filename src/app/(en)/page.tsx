import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import { createPageMetadata } from "@/lib/seo/metadata";
import { HomePageView } from "@/components/pages/home-page-view";

const dict = getDictionary("en");

export const metadata: Metadata = createPageMetadata({
  locale: "en",
  pathname: "/",
  title: dict.homeTitle,
  description: dict.homeStatus,
});

export default function EnglishHomePage() {
  return <HomePageView locale="en" />;
}

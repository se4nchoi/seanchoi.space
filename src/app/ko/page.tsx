import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import { createPageMetadata } from "@/lib/seo/metadata";
import { HomePageView } from "@/components/pages/home-page-view";

const dict = getDictionary("ko");

export const metadata: Metadata = createPageMetadata({
  locale: "ko",
  pathname: "/ko",
  title: dict.homeTitle,
  description: dict.homeStatus,
});

export default function KoreanHomePage() {
  return <HomePageView locale="ko" />;
}

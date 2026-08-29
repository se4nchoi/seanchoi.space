import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import { createPageMetadata } from "@/lib/seo/metadata";
import { isSkeletonPreviewEnabled } from "@/lib/skeleton-preview";
import { HomePageView } from "@/components/pages/home-page-view";
import { StatusPageView } from "@/components/pages/status-page-view";

const dict = getDictionary("ko");

export const metadata: Metadata = createPageMetadata({
  locale: "ko",
  pathname: "/ko",
  title: dict.homeTitle,
  description: dict.homeStatus,
});

export default function KoreanHomePage() {
  if (isSkeletonPreviewEnabled()) {
    return <HomePageView locale="ko" />;
  }
  return <StatusPageView title={dict.homeTitle} summary={dict.homeStatus} />;
}

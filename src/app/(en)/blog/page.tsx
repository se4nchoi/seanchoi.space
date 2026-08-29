import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import { createPageMetadata } from "@/lib/seo/metadata";
import { isSkeletonPreviewEnabled } from "@/lib/skeleton-preview";
import { BlogIndexView } from "@/components/pages/blog-index-view";
import { StatusPageView } from "@/components/pages/status-page-view";

const dict = getDictionary("en");

export const metadata: Metadata = createPageMetadata({
  locale: "en",
  pathname: "/blog",
  title: dict.blog,
  description: dict.blogStatus,
});

export default function EnglishBlogPage() {
  if (isSkeletonPreviewEnabled()) {
    return <BlogIndexView locale="en" />;
  }
  return <StatusPageView title={dict.blog} summary={dict.blogStatus} />;
}

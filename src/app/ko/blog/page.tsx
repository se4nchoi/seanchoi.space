import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import { createPageMetadata } from "@/lib/seo/metadata";
import { BlogIndexView } from "@/components/pages/blog-index-view";

const dict = getDictionary("ko");

export const metadata: Metadata = createPageMetadata({
  locale: "ko",
  pathname: "/ko/blog",
  title: dict.blog,
  description: dict.blogStatus,
  feedDiscovery: true,
});

export default function KoreanBlogPage() {
  return <BlogIndexView locale="ko" />;
}

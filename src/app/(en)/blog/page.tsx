import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import { createPageMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/ui/container";
import { PageIntro } from "@/components/ui/page-intro";

const dict = getDictionary("en");

export const metadata: Metadata = createPageMetadata({
  locale: "en",
  pathname: "/blog",
  title: dict.blog,
  description: dict.blogStatus,
});

export default function EnglishBlogPage() {
  return (
    <Container size="default">
      <PageIntro title={dict.blog} summary={dict.blogStatus} />
    </Container>
  );
}

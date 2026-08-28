import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import { createPageMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/ui/container";
import { PageIntro } from "@/components/ui/page-intro";

const dict = getDictionary("en");

export const metadata: Metadata = createPageMetadata({
  locale: "en",
  pathname: "/projects",
  title: dict.projects,
  description: dict.projectsStatus,
});

export default function EnglishProjectsPage() {
  return (
    <Container size="default">
      <PageIntro title={dict.projects} summary={dict.projectsStatus} />
    </Container>
  );
}

import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import { createPageMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/ui/container";
import { PageIntro } from "@/components/ui/page-intro";

const dict = getDictionary("ko");

export const metadata: Metadata = createPageMetadata({
  locale: "ko",
  pathname: "/ko/projects",
  title: dict.projects,
  description: dict.projectsStatus,
});

export default function KoreanProjectsPage() {
  return (
    <Container size="default">
      <PageIntro title={dict.projects} summary={dict.projectsStatus} />
    </Container>
  );
}

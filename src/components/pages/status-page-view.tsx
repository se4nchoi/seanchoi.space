import React from "react";
import { Container } from "@/components/ui/container";
import { PageIntro } from "@/components/ui/page-intro";

export interface StatusPageViewProps {
  title: string;
  summary: string;
}

export function StatusPageView({ title, summary }: StatusPageViewProps) {
  return (
    <Container size="default">
      <PageIntro title={title} summary={summary} />
    </Container>
  );
}

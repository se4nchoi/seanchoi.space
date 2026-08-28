import React from "react";
import type { Metadata } from "next";
import { createRootMetadata } from "@/lib/seo/metadata";
import { getDictionary } from "@/i18n/dictionaries";
import { SiteShell } from "@/components/shell/site-shell";
import "../globals.css";

export const metadata: Metadata = createRootMetadata("ko");

export default function RootKoreanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dict = getDictionary("ko");

  return (
    <html lang="ko">
      <body>
        <a href="#main-content" className="skip-link">
          {dict.skipToContent}
        </a>
        <SiteShell locale="ko">{children}</SiteShell>
      </body>
    </html>
  );
}

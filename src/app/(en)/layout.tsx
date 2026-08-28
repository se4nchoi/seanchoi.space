import React from "react";
import type { Metadata } from "next";
import { createRootMetadata } from "@/lib/seo/metadata";
import { getDictionary } from "@/i18n/dictionaries";
import { SiteShell } from "@/components/shell/site-shell";
import "../globals.css";

export const metadata: Metadata = createRootMetadata("en");

export default function RootEnglishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dict = getDictionary("en");

  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-link">
          {dict.skipToContent}
        </a>
        <SiteShell locale="en">{children}</SiteShell>
      </body>
    </html>
  );
}

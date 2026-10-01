import React from "react";
import type { AppLocale } from "@/i18n/config";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { isPreviewChannel } from "@/lib/release-channel";

export interface SiteShellProps {
  locale: AppLocale;
  children: React.ReactNode;
}

export function SiteShell({ locale, children }: SiteShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {isPreviewChannel() && (
        <p className="bg-accent px-4 py-1.5 text-center text-xs font-medium text-accent-foreground print:hidden">
          {locale === "ko"
            ? "미리보기 사이트 · 아직 승인되지 않은 콘텐츠가 포함되어 있습니다"
            : "Preview site · includes content not yet approved for seanchoi.space"}
        </p>
      )}
      <SiteHeader locale={locale} />
      <main id="main-content" className="flex-1 py-8 sm:py-12 print:py-0">
        {children}
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}

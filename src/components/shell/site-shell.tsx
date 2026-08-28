import React from "react";
import type { AppLocale } from "@/i18n/config";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";

export interface SiteShellProps {
  locale: AppLocale;
  children: React.ReactNode;
}

export function SiteShell({ locale, children }: SiteShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--background)] text-[var(--foreground)]">
      <SiteHeader locale={locale} />
      <main id="main-content" className="flex-1 py-8 sm:py-12">
        {children}
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}

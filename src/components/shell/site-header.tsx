import React from "react";
import Link from "next/link";
import type { AppLocale } from "@/i18n/config";
import { Container } from "../ui/container";
import { PrimaryNavigation } from "./primary-navigation";
import { LanguageSwitch } from "./language-switch";

export interface SiteHeaderProps {
  locale: AppLocale;
}

export function SiteHeader({ locale }: SiteHeaderProps) {
  const homeHref = locale === "ko" ? "/ko" : "/";

  return (
    <header className="border-b border-[var(--border)] bg-[var(--background)] py-2 sm:py-3">
      <Container size="default">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center justify-between">
            <Link
              href={homeHref}
              className="min-h-[44px] inline-flex items-center text-base font-semibold tracking-tight text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
            >
              seanchoi.space
            </Link>

            {/* Mobile language switch positioned inline with brand for compact access */}
            <div className="sm:hidden">
              <LanguageSwitch currentLocale={locale} />
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end sm:gap-8">
            <PrimaryNavigation locale={locale} />
            <div className="hidden sm:block">
              <LanguageSwitch currentLocale={locale} />
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}

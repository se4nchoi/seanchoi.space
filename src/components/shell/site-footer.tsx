import React from "react";
import type { AppLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Container } from "../ui/container";

export interface SiteFooterProps {
  locale: AppLocale;
}

export function SiteFooter({ locale }: SiteFooterProps) {
  const dict = getDictionary(locale);

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--background)] py-8 text-xs text-[var(--muted)]">
      <Container size="default">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-semibold text-[var(--foreground)]">
            seanchoi.space
          </span>
          <p>{dict.footerPolicy}</p>
        </div>
      </Container>
    </footer>
  );
}

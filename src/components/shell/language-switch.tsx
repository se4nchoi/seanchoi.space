"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { AppLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getAlternatePath } from "@/i18n/routing";

export interface LanguageSwitchProps {
  currentLocale: AppLocale;
}

export function LanguageSwitch({ currentLocale }: LanguageSwitchProps) {
  const pathname = usePathname() || (currentLocale === "ko" ? "/ko" : "/");
  const enHref = getAlternatePath(pathname, "en");
  const koHref = getAlternatePath(pathname, "ko");
  const dict = getDictionary(currentLocale);

  return (
    <nav aria-label={dict.language} className="flex items-center text-xs font-mono">
      {currentLocale === "en" ? (
        <span
          aria-current="true"
          className="min-h-[44px] inline-flex items-center font-semibold text-[var(--foreground)] px-1"
        >
          EN
        </span>
      ) : (
        <Link
          href={enHref}
          className="min-h-[44px] inline-flex items-center text-[var(--muted)] hover:text-[var(--foreground)] transition-colors px-1"
        >
          EN
        </Link>
      )}

      <span className="mx-1 text-[var(--border)] select-none" aria-hidden="true">
        /
      </span>

      {currentLocale === "ko" ? (
        <span
          aria-current="true"
          className="min-h-[44px] inline-flex items-center font-semibold text-[var(--foreground)] px-1"
        >
          한국어
        </span>
      ) : (
        <Link
          href={koHref}
          className="min-h-[44px] inline-flex items-center text-[var(--muted)] hover:text-[var(--foreground)] transition-colors px-1"
        >
          한국어
        </Link>
      )}
    </nav>
  );
}

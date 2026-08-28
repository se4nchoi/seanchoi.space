"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { AppLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocalizedNavLinks, normalizePathname } from "@/i18n/routing";

export interface PrimaryNavigationProps {
  locale: AppLocale;
}

export function PrimaryNavigation({ locale }: PrimaryNavigationProps) {
  const pathname = usePathname() || (locale === "ko" ? "/ko" : "/");
  const normalizedCurrent = normalizePathname(pathname);
  const dict = getDictionary(locale);
  const navLinks = getLocalizedNavLinks(locale);

  const labels: Record<string, string> = {
    home: dict.home,
    experience: dict.experience,
    projects: dict.projects,
    blog: dict.blog,
  };

  return (
    <nav
      aria-label={dict.primaryNavigation}
      className="flex flex-wrap items-center gap-2 sm:gap-6 text-sm"
    >
      {navLinks.map(({ key, href }) => {
        const isHome = href === "/" || href === "/ko";
        const isActive = isHome
          ? normalizedCurrent === href
          : normalizedCurrent === href || normalizedCurrent.startsWith(`${href}/`);

        return (
          <Link
            key={key}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={`min-h-[44px] inline-flex items-center px-1.5 sm:px-0 transition-colors ${
              isActive
                ? "font-semibold text-[var(--foreground)] border-b-2 border-[var(--accent)]"
                : "text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            {labels[key]}
          </Link>
        );
      })}
    </nav>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { AppLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocalizedNavLinks, normalizePathname } from "@/i18n/routing";

export interface PrimaryNavigationProps {
  locale: AppLocale;
  /** Hide the Blog link until at least one article is published. */
  showBlog?: boolean;
}

export function PrimaryNavigation({ locale, showBlog = true }: PrimaryNavigationProps) {
  const pathname = usePathname() || (locale === "ko" ? "/ko" : "/");
  const normalizedCurrent = normalizePathname(pathname);
  const dict = getDictionary(locale);
  const navLinks = getLocalizedNavLinks(locale).filter(
    ({ key }) => showBlog || key !== "blog"
  );

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
                ? "font-semibold text-foreground border-b-2 border-accent"
                : "text-muted hover:text-foreground"
            }`}
          >
            {labels[key]}
          </Link>
        );
      })}
    </nav>
  );
}

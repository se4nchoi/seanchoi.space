import type { AppLocale } from "./config";
import { ARTICLE_ROUTE_PAIRS } from "@/lib/content/article-routes";

export interface RoutePair {
  en: string;
  ko: string;
}

export const ROUTE_PAIRS: RoutePair[] = [
  { en: "/", ko: "/ko" },
  { en: "/experience", ko: "/ko/experience" },
  { en: "/projects", ko: "/ko/projects" },
  { en: "/projects/example-project", ko: "/ko/projects/example-project" },
  { en: "/blog", ko: "/ko/blog" },
  ...ARTICLE_ROUTE_PAIRS.map((p) => ({
    en: `/blog/${p.enSlug}`,
    ko: `/ko/blog/${p.koSlug}`,
  })),
];

export function normalizePathname(rawPath: string): string {
  if (!rawPath) return "/";
  // Strip query string and fragment
  const clean = rawPath.split(/[?#]/)[0];
  // Remove trailing slashes except for root
  if (clean.length > 1 && clean.endsWith("/")) {
    return clean.replace(/\/+$/, "");
  }
  return clean.startsWith("/") ? clean : `/${clean}`;
}

export function getLocaleFromPathname(pathname: string): AppLocale {
  const normalized = normalizePathname(pathname);
  if (normalized === "/ko" || normalized.startsWith("/ko/")) {
    return "ko";
  }
  return "en";
}

export function removeLocaleFromPathname(pathname: string): string {
  const normalized = normalizePathname(pathname);
  if (normalized === "/ko") return "/";
  if (normalized.startsWith("/ko/")) {
    return normalized.slice(3);
  }
  return normalized;
}

export function localizePathname(pathname: string, targetLocale: AppLocale): string {
  const normalized = removeLocaleFromPathname(pathname);
  if (targetLocale === "en") {
    return normalized;
  }
  return normalized === "/" ? "/ko" : `/ko${normalized}`;
}

export function getAlternatePath(pathname: string, targetLocale: AppLocale): string {
  const normalized = normalizePathname(pathname);
  const currentLocale = getLocaleFromPathname(normalized);

  if (currentLocale === targetLocale) {
    return normalized;
  }

  // 1. Direct match in exact ROUTE_PAIRS
  for (const pair of ROUTE_PAIRS) {
    if (currentLocale === "en" && pair.en === normalized) {
      return targetLocale === "ko" ? pair.ko : pair.en;
    }
    if (currentLocale === "ko" && pair.ko === normalized) {
      return targetLocale === "en" ? pair.en : pair.ko;
    }
  }

  // 2. Fallback for /projects/<slug> or /ko/projects/<slug> to Projects index
  if (currentLocale === "en" && normalized.startsWith("/projects/")) {
    return targetLocale === "ko" ? "/ko/projects" : "/projects";
  }
  if (currentLocale === "ko" && normalized.startsWith("/ko/projects/")) {
    return targetLocale === "en" ? "/projects" : "/ko/projects";
  }

  // 3. Fallback for /blog/<slug> or /ko/blog/<slug> to Blog index
  if (currentLocale === "en" && normalized.startsWith("/blog/")) {
    return targetLocale === "ko" ? "/ko/blog" : "/blog";
  }
  if (currentLocale === "ko" && normalized.startsWith("/ko/blog/")) {
    return targetLocale === "en" ? "/blog" : "/ko/blog";
  }

  // 4. Generic fallback to home
  return targetLocale === "ko" ? "/ko" : "/";
}

export function getLocalizedNavLinks(locale: AppLocale) {
  const isKo = locale === "ko";
  return [
    { key: "home", href: isKo ? "/ko" : "/" },
    { key: "experience", href: isKo ? "/ko/experience" : "/experience" },
    { key: "projects", href: isKo ? "/ko/projects" : "/projects" },
    { key: "blog", href: isKo ? "/ko/blog" : "/blog" },
  ] as const;
}

import type { Metadata } from "next";
import { type AppLocale } from "@/i18n/config";
import { localizePathname } from "@/i18n/routing";

export const SITE_URL = "https://seanchoi.space";

export interface PageMetadataOptions {
  locale: AppLocale;
  pathname: string;
  title: string;
  description: string;
  alternatePaths?: {
    en?: string | null;
    ko?: string | null;
    "x-default"?: string | null;
  };
  feedDiscovery?: boolean;
}

export function createPageMetadata({
  locale,
  pathname,
  title,
  description,
  alternatePaths,
  feedDiscovery = false,
}: PageMetadataOptions): Metadata {
  const canonicalPath = localizePathname(pathname, locale);
  const canonicalUrl = `${SITE_URL}${canonicalPath === "/" ? "" : canonicalPath}`;

  // Build languages map
  const languages: Record<string, string> = {};

  if (alternatePaths) {
    if (alternatePaths.en) {
      languages.en = `${SITE_URL}${alternatePaths.en === "/" ? "" : alternatePaths.en}`;
    }
    if (alternatePaths.ko) {
      languages.ko = `${SITE_URL}${alternatePaths.ko === "/" ? "" : alternatePaths.ko}`;
    }
    if (alternatePaths["x-default"]) {
      languages["x-default"] = `${SITE_URL}${alternatePaths["x-default"] === "/" ? "" : alternatePaths["x-default"]}`;
    } else if (languages.en) {
      languages["x-default"] = languages.en;
    } else {
      languages["x-default"] = canonicalUrl;
    }
  } else {
    // Standard automatic bilingual pairing for core pages
    const enPath = localizePathname(pathname, "en");
    const koPath = localizePathname(pathname, "ko");
    languages.en = `${SITE_URL}${enPath === "/" ? "" : enPath}`;
    languages.ko = `${SITE_URL}${koPath === "/" ? "" : koPath}`;
    languages["x-default"] = `${SITE_URL}${enPath === "/" ? "" : enPath}`;
  }

  // Ensure current locale is always in languages if not explicitly omitted
  if (!languages[locale]) {
    languages[locale] = canonicalUrl;
  }

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages,
      ...(feedDiscovery
        ? {
            types: {
              "application/atom+xml": [
                {
                  url: `${SITE_URL}/feed.xml`,
                  title: "seanchoi.space — Blog Atom Feed",
                },
              ],
            },
          }
        : {}),
    },
  };
}

export function createRootMetadata(locale: AppLocale): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: "seanchoi.space",
      template: "%s — seanchoi.space",
    },
    description:
      locale === "ko"
        ? "이중 언어 포트폴리오 구조를 준비하고 있습니다. 검증된 작업과 글은 검토 후 추가합니다."
        : "The bilingual portfolio shell is being prepared. Verified work and writing will be added after review.",
  };
}

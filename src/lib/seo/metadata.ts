import type { Metadata } from "next";
import { type AppLocale } from "@/i18n/config";
import { localizePathname } from "@/i18n/routing";
import { getDictionary } from "@/i18n/dictionaries";

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

/** Absolute URL for a site path; the root maps to the bare origin. */
function toAbsoluteUrl(pathname: string): string {
  return `${SITE_URL}${pathname === "/" ? "" : pathname}`;
}

export function createPageMetadata({
  locale,
  pathname,
  title,
  description,
  alternatePaths,
  feedDiscovery = false,
}: PageMetadataOptions): Metadata {
  const canonicalUrl = toAbsoluteUrl(localizePathname(pathname, locale));

  // Build languages map
  const languages: Record<string, string> = {};

  if (alternatePaths) {
    if (alternatePaths.en) {
      languages.en = toAbsoluteUrl(alternatePaths.en);
    }
    if (alternatePaths.ko) {
      languages.ko = toAbsoluteUrl(alternatePaths.ko);
    }
    if (alternatePaths["x-default"]) {
      languages["x-default"] = toAbsoluteUrl(alternatePaths["x-default"]);
    } else if (languages.en) {
      languages["x-default"] = languages.en;
    } else {
      languages["x-default"] = canonicalUrl;
    }
  } else {
    // Standard automatic bilingual pairing for core pages
    languages.en = toAbsoluteUrl(localizePathname(pathname, "en"));
    languages.ko = toAbsoluteUrl(localizePathname(pathname, "ko"));
    languages["x-default"] = languages.en;
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
    description: getDictionary(locale).siteDescription,
  };
}

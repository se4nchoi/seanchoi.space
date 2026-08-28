import type { Metadata } from "next";
import type { AppLocale } from "@/i18n/config";
import { getAlternatePath, normalizePathname } from "@/i18n/routing";

export const SITE_URL = "https://seanchoi.space";

export interface PageMetadataOptions {
  locale: AppLocale;
  pathname: string;
  title: string;
  description: string;
}

export function createPageMetadata({
  pathname,
  title,
  description,
}: PageMetadataOptions): Metadata {
  const normalizedPath = normalizePathname(pathname);
  const enPath = getAlternatePath(normalizedPath, "en");
  const koPath = getAlternatePath(normalizedPath, "ko");

  const canonicalUrl = `${SITE_URL}${normalizedPath === "/" ? "" : normalizedPath}`;
  const enUrl = `${SITE_URL}${enPath === "/" ? "" : enPath}`;
  const koUrl = `${SITE_URL}${koPath === "/" ? "" : koPath}`;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: enUrl,
        ko: koUrl,
        "x-default": enUrl,
      },
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

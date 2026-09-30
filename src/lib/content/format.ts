import type { DateRange, LocalizedText } from "./schemas";
import type { AppLocale } from "@/i18n/config";

// Helper functions for accessing localized content cleanly
export function formatDateRange(
  dateRange: DateRange,
  locale: AppLocale = "en"
): string {
  const isKo = locale === "ko";
  const { start, end, ongoing } = dateRange;

  if (start === null && end !== null) {
    return isKo ? `${end.replace("-", "년 ")}월 졸업` : `Conferred ${end}`;
  }

  if (start !== null) {
    if (ongoing) {
      const inProgressLabel = isKo ? "진행 중" : "In progress";
      if (end !== null) {
        return `${start} — ${end} (${inProgressLabel})`;
      }
      return isKo ? `${start} — 진행 중` : `${start} — Present`;
    }
    if (end !== null) {
      return `${start} — ${end}`;
    }
  }

  return "";
}

/** Reviewed Korean text when available; otherwise the English source. */
export function getLocalizedText(text: LocalizedText, locale: AppLocale): string {
  if (locale === "ko" && text.ko && text.koReview === "reviewed") {
    return text.ko;
  }
  return text.en;
}

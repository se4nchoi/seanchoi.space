import type { DateRange, LocalizedText } from "./schemas";
import type { AppLocale } from "@/i18n/config";

const EN_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatMonth(value: string, locale: AppLocale): string {
  const [year, month] = value.split("-");
  if (locale === "ko") return `${year}.${month}`;
  return `${EN_MONTHS[Number(month) - 1]} ${year}`;
}

/** "Sep 2022 – Aug 2023" in English, "2022.09 – 2023.08" in Korean. */
export function formatDateRange(
  dateRange: DateRange,
  locale: AppLocale = "en"
): string {
  const isKo = locale === "ko";
  const { start, end, ongoing } = dateRange;

  if (start === null && end !== null) {
    return isKo ? `${formatMonth(end, locale)} 졸업` : `Graduated ${formatMonth(end, locale)}`;
  }

  if (start !== null) {
    const from = formatMonth(start, locale);
    if (ongoing) {
      if (end !== null) {
        return isKo
          ? `${from} – ${formatMonth(end, locale)} (진행 중)`
          : `${from} – ${formatMonth(end, locale)} (in progress)`;
      }
      return isKo ? `${from} – 진행 중` : `${from} – Present`;
    }
    if (end !== null) {
      return `${from} – ${formatMonth(end, locale)}`;
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

import { type AppLocale } from "@/i18n/config";
import type { ArticleRecord } from "../schemas";
import { loadAllMdxArticles, type LoadedArticle } from "./pipeline";

/**
 * Shared publication predicate.
 */
export function isPublishableArticle(
  record: ArticleRecord,
  now: string | Date = new Date()
): boolean {
  if (record.publicationStatus !== "public") return false;
  if (record.claimState !== "verified") return false;
  if (record.syntheticPlaceholder) return false;
  if (!record.reviewedOn) return false;

  const nowStr = typeof now === "string" ? now : now.toISOString().split("T")[0];
  if (record.publishedOn > nowStr) return false;
  if (record.updatedOn && record.updatedOn < record.publishedOn) return false;

  return true;
}

/**
 * Returns articles for blog index view.
 * Retired articles are never previewable.
 */
export function getBlogArticles(
  locale: AppLocale,
  options?: { preview?: boolean; now?: string | Date }
): ArticleRecord[] {
  const articles = loadAllMdxArticles({ now: options?.now }).map((a) => a.record);

  return articles
    .filter((article) => {
      if (article.locale !== locale) return false;
      // Retired articles are NEVER previewable
      if (article.publicationStatus === "retired") return false;

      if (options?.preview) {
        return true;
      }
      return isPublishableArticle(article, options?.now);
    })
    .sort((a, b) => {
      if (a.publishedOn !== b.publishedOn) {
        return b.publishedOn.localeCompare(a.publishedOn);
      }
      return a.slug.localeCompare(b.slug);
    });
}

/**
 * Returns article and headings for article detail view.
 * Retired articles are never previewable.
 */
export function getBlogArticleBySlug(
  locale: AppLocale,
  slug: string,
  options?: { preview?: boolean; now?: string | Date }
): LoadedArticle | undefined {
  const articles = loadAllMdxArticles({ now: options?.now });

  const found = articles.find(
    (a) => a.record.locale === locale && a.record.slug === slug
  );

  if (!found) return undefined;

  // Retired articles are NEVER previewable
  if (found.record.publicationStatus === "retired") {
    return undefined;
  }

  if (options?.preview) {
    return found;
  }

  if (!isPublishableArticle(found.record, options?.now)) {
    return undefined;
  }

  return found;
}

/**
 * Finds the reciprocal translation counterpart of an article.
 */
export function getArticleTranslationCounterpart(
  current: ArticleRecord,
  pool?: ArticleRecord[],
  requirePublic = true
): ArticleRecord | undefined {
  const articles =
    pool || loadAllMdxArticles().map((a) => a.record);

  let candidate: ArticleRecord | undefined;

  if (current.locale === "en") {
    // English source -> find Korean article with translationOf === current.id
    candidate = articles.find(
      (a) => a.locale !== "en" && a.translationOf === current.id
    );
  } else {
    // Non-English translation -> find English source with id === current.translationOf
    if (!current.translationOf) return undefined;
    candidate = articles.find(
      (a) => a.id === current.translationOf && a.locale === "en"
    );
  }

  if (!candidate) return undefined;
  if (candidate.publicationStatus === "retired") return undefined;

  if (requirePublic && !isPublishableArticle(candidate)) {
    return undefined;
  }

  return candidate;
}

/**
 * Calculates related articles for an article.
 * Retired articles are never related.
 */
export function getRelatedArticles(
  current: ArticleRecord,
  pool?: ArticleRecord[],
  options?: { allowPreview?: boolean; now?: string | Date }
): ArticleRecord[] {
  const articles =
    pool || loadAllMdxArticles({ now: options?.now }).map((a) => a.record);

  return articles
    .filter((a) => {
      if (a.id === current.id) return false;
      if (a.locale !== current.locale) return false;
      if (a.publicationStatus === "retired") return false;

      if (!options?.allowPreview && !isPublishableArticle(a, options?.now)) {
        return false;
      }
      return true;
    })
    .map((a) => {
      const sharedTopics = a.topics.filter((topic) =>
        current.topics.includes(topic)
      ).length;
      return { article: a, sharedTopics };
    })
    .sort((a, b) => {
      // 1. Shared topics count (descending)
      if (b.sharedTopics !== a.sharedTopics) {
        return b.sharedTopics - a.sharedTopics;
      }
      // 2. Published date (descending / newest first)
      if (b.article.publishedOn !== a.article.publishedOn) {
        return b.article.publishedOn.localeCompare(a.article.publishedOn);
      }
      // 3. Slug (ascending / alphabetical tiebreaker)
      return a.article.slug.localeCompare(b.article.slug);
    })
    .slice(0, 3)
    .map((item) => item.article);
}

/**
 * Restrained static topic listing and counts.
 */
export function getTopicsWithCounts(
  locale: AppLocale,
  options?: { allowPreview?: boolean; now?: string | Date }
): { name: string; count: number }[] {
  const articles = getBlogArticles(locale, {
    preview: options?.allowPreview,
    now: options?.now,
  });
  const topicCounts = new Map<string, number>();

  for (const article of articles) {
    for (const topic of article.topics) {
      topicCounts.set(topic, (topicCounts.get(topic) || 0) + 1);
    }
  }

  return Array.from(topicCounts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => {
      if (b.count !== a.count) return b.count - a.count;
      return a.name.localeCompare(b.name);
    });
}

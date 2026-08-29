import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { ComponentType } from "react";
import type { MDXComponents } from "mdx/types";
import { type AppLocale } from "@/i18n/config";
import {
  articleRecordSchema,
  type ArticleRecord,
} from "./schemas";
import {
  BLOG_MODULE_REGISTRY,
  type BlogRegistryEntry,
} from "./blog-registry";
import { validateMdxSource } from "./source-validator";

export interface HeadingItem {
  level: 2 | 3;
  text: string;
  id: string;
}

export type ArticleHeading = HeadingItem;

export interface LoadedArticle {
  record: ArticleRecord;
  rawBody: string;
  headings: HeadingItem[];
  loadComponent: () => Promise<{ default: ComponentType<{ components?: MDXComponents }> }>;
}

export interface ArticleDescriptor {
  record: ArticleRecord;
  filePath: string;
  rawBody?: string;
}

export class BlogIntegrityError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BlogIntegrityError";
  }
}

/**
 * Shared server-only helper to discover all existing public static asset paths.
 */
export function getAvailablePublicAssets(): Set<string> {
  const assets = new Set<string>();
  const publicDir = path.resolve(process.cwd(), "public");

  if (!fs.existsSync(publicDir)) {
    return assets;
  }

  function walk(dir: string, base: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.join(base, entry.name).replace(/\\/g, "/");
      if (entry.isDirectory()) {
        walk(fullPath, relativePath);
      } else {
        assets.add(`/${relativePath}`);
      }
    }
  }

  walk(publicDir, "");
  return assets;
}

/**
 * Deterministic heading slugifier supporting English and Korean characters.
 */
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s\uAC00-\uD7A3-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Creates a duplicate-aware heading ID generator per article render.
 */
export function createHeadingIdGenerator(): (text: string) => string {
  const slugCounts = new Map<string, number>();

  return (text: string): string => {
    const base = slugifyHeading(text) || "section";
    const current = slugCounts.get(base) || 0;
    slugCounts.set(base, current + 1);

    if (current === 0) {
      return base;
    }
    return `${base}-${current}`;
  };
}

/**
 * Deterministically sorts MDX filenames alphabetically.
 */
export function sortMdxFilenames(filenames: string[]): string[] {
  return [...filenames].sort((a, b) => a.localeCompare(b));
}

/**
 * Extracts plain-text h2 and h3 headings in document order for Table of Contents.
 */
export function extractHeadingsFromMdx(
  markdownBody: string,
  getHeadingId: (text: string) => string
): HeadingItem[] {
  const headings: HeadingItem[] = [];

  // Strip code blocks first so code comments do not look like headings
  const codeBlockRegex = /```[\s\S]*?```/g;
  const stripped = markdownBody.replace(codeBlockRegex, "");

  const lines = stripped.split("\n");
  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.*)$/);
    if (match) {
      const level = match[1].length as 2 | 3;
      const text = match[2].trim();
      const id = getHeadingId(text);
      headings.push({ level, text, id });
    }
  }

  return headings;
}

/**
 * Pure cross-record integrity validation over parsed article descriptors and registry descriptors.
 */
export function validateBlogArticlesIntegrity(
  articles: ArticleDescriptor[],
  registry: Record<string, BlogRegistryEntry | { id: string; filePath: string }>,
  options?: {
    now?: string | Date;
    availableAssets?: Set<string>;
  }
): void {
  const now = options?.now || new Date();
  const nowStr = typeof now === "string" ? now : now.toISOString().split("T")[0];

  // 1. Validate registry internal consistency
  const seenRegistryFilePaths = new Set<string>();
  for (const [key, regEntry] of Object.entries(registry)) {
    if (regEntry.id !== key) {
      throw new BlogIntegrityError(
        `Registry entry key '${key}' does not match embedded entry ID '${regEntry.id}'`
      );
    }
    const normalizedRegPath = regEntry.filePath.replace(/\\/g, "/");
    if (seenRegistryFilePaths.has(normalizedRegPath)) {
      throw new BlogIntegrityError(
        `Duplicate registry filePath found: '${normalizedRegPath}' for registry ID '${key}'`
      );
    }
    seenRegistryFilePaths.add(normalizedRegPath);
  }

  // 2. Validate article descriptors and cross-check against registry
  const seenIds = new Set<string>();
  const seenLocaleSlugs = new Set<string>();
  const seenArticleFilePaths = new Set<string>();
  const registryIds = new Set(Object.keys(registry));
  const articleIds = new Set<string>();

  for (const item of articles) {
    const { record, filePath, rawBody } = item;

    // A. Required and non-blank source filePath
    if (!filePath || !filePath.trim()) {
      throw new BlogIntegrityError(
        `Article '${record.id}' is missing a valid normalized source filePath`
      );
    }

    // B. Duplicate source filePath among descriptors
    const normalizedPath = filePath.trim().replace(/\\/g, "/");
    if (seenArticleFilePaths.has(normalizedPath)) {
      throw new BlogIntegrityError(
        `Duplicate article source filePath found: '${normalizedPath}' (ID: ${record.id})`
      );
    }
    seenArticleFilePaths.add(normalizedPath);

    // C. Duplicate article ID
    if (seenIds.has(record.id)) {
      throw new BlogIntegrityError(`Duplicate article ID found: '${record.id}'`);
    }
    seenIds.add(record.id);
    articleIds.add(record.id);

    // D. Duplicate locale and slug pair
    const localeSlug = `${record.locale}:${record.slug}`;
    if (seenLocaleSlugs.has(localeSlug)) {
      throw new BlogIntegrityError(
        `Duplicate locale and slug pair found: '${localeSlug}' (ID: ${record.id})`
      );
    }
    seenLocaleSlugs.add(localeSlug);

    // E. Duplicate normalized topics
    const normalizedTopics = record.topics.map((t) => t.toLowerCase().trim());
    if (new Set(normalizedTopics).size !== normalizedTopics.length) {
      throw new BlogIntegrityError(
        `Duplicate topic found in article '${record.id}': ${JSON.stringify(record.topics)}`
      );
    }

    // F. Registry 1:1 match and path equality
    if (!registryIds.has(record.id)) {
      throw new BlogIntegrityError(
        `Article '${record.id}' is missing corresponding entry in BLOG_MODULE_REGISTRY`
      );
    }

    const regEntry = registry[record.id];
    if (
      regEntry.filePath.replace(/\\/g, "/") !== normalizedPath
    ) {
      throw new BlogIntegrityError(
        `Registry file path mismatch for '${record.id}': registry has '${regEntry.filePath}', actual is '${normalizedPath}'`
      );
    }

    // G. Temporal consistency
    if (record.updatedOn && record.updatedOn < record.publishedOn) {
      throw new BlogIntegrityError(
        `Article '${record.id}' has updatedOn (${record.updatedOn}) earlier than publishedOn (${record.publishedOn})`
      );
    }

    // H. Public article publication constraints
    if (record.publicationStatus === "public") {
      if (record.claimState !== "verified") {
        throw new BlogIntegrityError(
          `Public article '${record.id}' must have claimState: 'verified', but has '${record.claimState}'`
        );
      }
      if (record.syntheticPlaceholder) {
        throw new BlogIntegrityError(
          `Public article '${record.id}' must not be marked syntheticPlaceholder: true`
        );
      }
      if (!record.reviewedOn) {
        throw new BlogIntegrityError(
          `Public article '${record.id}' must have a valid reviewedOn date`
        );
      }
      if (record.publishedOn > nowStr) {
        throw new BlogIntegrityError(
          `Public article '${record.id}' has future publishedOn date (${record.publishedOn} > ${nowStr})`
        );
      }
    }

    // I. MDX source validation (if rawBody is present)
    if (rawBody) {
      const sourceResult = validateMdxSource(rawBody, {
        articleId: record.id,
        declaredAssetPaths: record.assetPaths,
        availableAssets: options?.availableAssets,
      });

      if (!sourceResult.valid) {
        throw new BlogIntegrityError(
          `MDX source validation failed for '${record.id}':\n${sourceResult.errors.join("\n")}`
        );
      }
    }
  }

  // 3. Ensure no orphan registry entries
  for (const regId of registryIds) {
    if (!articleIds.has(regId)) {
      throw new BlogIntegrityError(
        `Orphan registry entry found: '${regId}' exists in BLOG_MODULE_REGISTRY but has no matching article file`
      );
    }
  }

  // 4. Translation topology validation (Accepted WP2 One-Way Model)
  const articlesById = new Map<string, ArticleRecord>();
  for (const a of articles) {
    articlesById.set(a.record.id, a.record);
  }

  const sourceTranslationLocales = new Map<string, Set<string>>();

  for (const a of articles) {
    const record = a.record;

    if (record.locale === "en") {
      // Source English articles must NOT have translationOf
      if (record.translationOf) {
        throw new BlogIntegrityError(
          `Source English article '${record.id}' must not specify 'translationOf'. In the WP2 one-way translation model, only translations point to the source.`
        );
      }
    } else {
      // Non-English articles (e.g. ko) MUST point to a valid English source
      if (!record.translationOf) {
        // Single-language non-English article without counterpart is permitted
        continue;
      }

      const sourceRecord = articlesById.get(record.translationOf);
      if (!sourceRecord) {
        throw new BlogIntegrityError(
          `Translation article '${record.id}' references non-existent translationOf source ID: '${record.translationOf}'`
        );
      }

      if (sourceRecord.locale === record.locale) {
        throw new BlogIntegrityError(
          `Translation article '${record.id}' references a source with the same locale ('${record.locale}')`
        );
      }

      if (sourceRecord.translationOf) {
        throw new BlogIntegrityError(
          `Chained translation detected: translation article '${record.id}' references '${sourceRecord.id}' which is itself a translation of '${sourceRecord.translationOf}'`
        );
      }

      // Check duplicate translations for the same target locale
      const existingLocales =
        sourceTranslationLocales.get(record.translationOf) || new Set<string>();
      if (existingLocales.has(record.locale)) {
        throw new BlogIntegrityError(
          `Duplicate translation detected: source '${record.translationOf}' already has a translation for locale '${record.locale}'`
        );
      }
      existingLocales.add(record.locale);
      sourceTranslationLocales.set(record.translationOf, existingLocales);
    }
  }
}

/**
 * Pipeline entry point: reads content/blog/*.mdx files from disk in deterministic sort order and validates them.
 * Defaults availableAssets to getAvailablePublicAssets() if not provided.
 * Fails closed if directory is missing/empty while registry contains entries.
 */
export function validateBlogPipeline(options?: {
  now?: string | Date;
  availableAssets?: Set<string>;
}): LoadedArticle[] {
  const blogDir = path.resolve(process.cwd(), "content/blog");
  const availableAssets = options?.availableAssets || getAvailablePublicAssets();

  // Sort filenames deterministically (or empty list if directory is absent)
  const rawFiles = fs.existsSync(blogDir)
    ? fs.readdirSync(blogDir).filter((f) => f.endsWith(".mdx"))
    : [];
  const files = sortMdxFilenames(rawFiles);

  const loadedArticles: LoadedArticle[] = [];
  const descriptors: ArticleDescriptor[] = [];

  for (const file of files) {
    const fullPath = path.join(blogDir, file);
    // Retain normalized repository-relative path of actual file read
    const relPath = path.relative(process.cwd(), fullPath).replace(/\\/g, "/");
    const raw = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(raw);

    const record = articleRecordSchema.parse(data);

    // Extract headings for Table of Contents using a temporary generator
    const getHeadingId = createHeadingIdGenerator();
    const headings = extractHeadingsFromMdx(content, getHeadingId);

    const regEntry = BLOG_MODULE_REGISTRY[record.id];
    const loadComponent = regEntry
      ? regEntry.loadComponent
      : async () => ({ default: (() => null) as ComponentType<{ components?: MDXComponents }> });

    loadedArticles.push({
      record,
      rawBody: content,
      headings,
      loadComponent,
    });

    descriptors.push({
      record,
      filePath: relPath,
      rawBody: content,
    });
  }

  // Pure integrity validation across all articles and registry
  validateBlogArticlesIntegrity(descriptors, BLOG_MODULE_REGISTRY, {
    now: options?.now,
    availableAssets,
  });

  return loadedArticles;
}

/**
 * Loads all validated MDX articles.
 */
export function loadAllMdxArticles(options?: {
  now?: string | Date;
  availableAssets?: Set<string>;
}): LoadedArticle[] {
  return validateBlogPipeline(options);
}

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

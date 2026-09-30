import type { ArticleRecord } from "../schemas";
import type { BlogRegistryEntry } from "../blog-registry";
import { validateMdxSource } from "../source-validator";

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

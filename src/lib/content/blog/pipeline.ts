import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { ComponentType } from "react";
import type { MDXComponents } from "mdx/types";
import { articleRecordSchema } from "../schemas";
import type { ArticleRecord } from "../schemas";
import { BLOG_MODULE_REGISTRY } from "../blog-registry";
import { getAvailablePublicAssets } from "./assets";
import { createHeadingIdGenerator, extractHeadingsFromMdx, type HeadingItem } from "./headings";
import { validateBlogArticlesIntegrity, type ArticleDescriptor } from "./article-integrity";

export interface LoadedArticle {
  record: ArticleRecord;
  rawBody: string;
  headings: HeadingItem[];
  loadComponent: () => Promise<{ default: ComponentType<{ components?: MDXComponents }> }>;
}

interface PipelineOptions {
  now?: string | Date;
  availableAssets?: Set<string>;
}

/**
 * Deterministically sorts MDX filenames alphabetically.
 */
export function sortMdxFilenames(filenames: string[]): string[] {
  return [...filenames].sort((a, b) => a.localeCompare(b));
}

/**
 * Pipeline entry point: reads content/blog/*.mdx files from disk in deterministic sort order and validates them.
 * Defaults availableAssets to getAvailablePublicAssets() if not provided.
 * Fails closed if directory is missing/empty while registry contains entries.
 */
export function validateBlogPipeline(options?: PipelineOptions): LoadedArticle[] {
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

// Every blog query loads the full article set, and a production build runs
// several queries per page. Memoize per validation date during production
// builds only, so `next dev` always reflects MDX edits and tests stay isolated.
const productionCache = new Map<string, LoadedArticle[]>();

function toDateKey(now: string | Date | undefined): string {
  const value = now || new Date();
  return typeof value === "string" ? value : value.toISOString().split("T")[0];
}

/**
 * Loads all validated MDX articles.
 */
export function loadAllMdxArticles(options?: PipelineOptions): LoadedArticle[] {
  if (process.env.NODE_ENV !== "production" || options?.availableAssets) {
    return validateBlogPipeline(options);
  }

  const key = toDateKey(options?.now);
  let articles = productionCache.get(key);
  if (!articles) {
    articles = validateBlogPipeline(options);
    productionCache.set(key, articles);
  }
  return articles;
}

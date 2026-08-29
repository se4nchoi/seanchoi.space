import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { canonicalContentRegistry } from "@/data/content";
import { validateContentRegistry } from "./validate";
import { validateBlogPipeline } from "./blog";
import { ARTICLE_ROUTE_PAIRS } from "./article-routes";
import { HISTORICAL_ROUTE_MANIFEST } from "./historical-manifest";

function getAvailablePublicAssets(): Set<string> {
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

describe("Production Content Publication Guard", () => {
  it("validates that the canonical content registry adheres to all production integrity rules", () => {
    const availableAssets = getAvailablePublicAssets();
    const result = validateContentRegistry(canonicalContentRegistry, {
      now: new Date(),
      availableAssets,
    });

    expect(result).toBeDefined();
    // At launch, zero public articles are in the canonical registry
    expect(canonicalContentRegistry.articles).toHaveLength(0);
  });

  it("validates that all MDX files in content/blog pass the blog pipeline validation", () => {
    const availableAssets = getAvailablePublicAssets();
    const articles = validateBlogPipeline({
      now: new Date(),
      availableAssets,
    });

    // In production launch, no article in content/blog is public
    for (const article of articles) {
      expect(
        article.record.publicationStatus,
        `Article ${article.record.id} must remain draft at launch`
      ).toBe("draft");
      expect(
        article.record.syntheticPlaceholder,
        `Article ${article.record.id} must be synthetic placeholder at launch`
      ).toBe(true);
      expect(
        article.record.claimState,
        `Article ${article.record.id} must be pending at launch`
      ).toBe("pending");
    }
  });

  it("validates that ARTICLE_ROUTE_PAIRS matches translation relationships in MDX articles", () => {
    const articles = validateBlogPipeline();
    const translationPairs: { enSlug: string; koSlug: string }[] = [];

    for (const a of articles) {
      if (a.record.locale === "ko" && a.record.translationOf) {
        const source = articles.find((s) => s.record.id === a.record.translationOf);
        if (source && source.record.locale === "en") {
          translationPairs.push({
            enSlug: source.record.slug,
            koSlug: a.record.slug,
          });
        }
      }
    }

    expect([...ARTICLE_ROUTE_PAIRS]).toEqual(translationPairs);
  });

  it("proves historical route retirement manifest is complete", () => {
    expect(HISTORICAL_ROUTE_MANIFEST).toHaveLength(5);
    for (const item of HISTORICAL_ROUTE_MANIFEST) {
      expect(item.disposition).toBe("retired");
      expect(item.replacementUrl).toBeNull();
    }
  });
});

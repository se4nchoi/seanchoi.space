import { describe, it, expect } from "vitest";
import {
  HISTORICAL_BLOG_SLUGS,
  HISTORICAL_ROUTE_MANIFEST,
  isHistoricalBlogSlug,
} from "./historical-manifest";

describe("Historical Route Manifest & 404 Integrity", () => {
  it("contains exactly the 5 retired v1 slugs with no unexpected entries", () => {
    const expectedSlugs = [
      "retrospect-hoek-agency",
      "retrospect-emg-global",
      "vimium-keyboard-lover-s-bestfriend-on-the-web",
      "how-to-use-notion-as-your-blog-post-database",
      "how-to-persist-images-on-notion-pages-made-from-notion-to-md",
    ];

    expect([...HISTORICAL_BLOG_SLUGS]).toEqual(expectedSlugs);
    expect(HISTORICAL_ROUTE_MANIFEST).toHaveLength(5);
  });

  it("verifies every entry has disposition 'retired' and null replacementUrl (no redirects)", () => {
    for (const entry of HISTORICAL_ROUTE_MANIFEST) {
      expect(entry.disposition).toBe("retired");
      expect(entry.replacementUrl).toBeNull();
      expect(entry.reviewedOn).toBe("2026-08-29");
      expect(entry.notes.length).toBeGreaterThan(0);
    }
  });

  it("identifies historical slugs accurately via isHistoricalBlogSlug", () => {
    expect(isHistoricalBlogSlug("retrospect-hoek-agency")).toBe(true);
    expect(isHistoricalBlogSlug("retrospect-emg-global")).toBe(true);
    expect(
      isHistoricalBlogSlug("vimium-keyboard-lover-s-bestfriend-on-the-web")
    ).toBe(true);
    expect(
      isHistoricalBlogSlug("how-to-use-notion-as-your-blog-post-database")
    ).toBe(true);
    expect(
      isHistoricalBlogSlug(
        "how-to-persist-images-on-notion-pages-made-from-notion-to-md"
      )
    ).toBe(true);

    expect(isHistoricalBlogSlug("example-article")).toBe(false);
    expect(isHistoricalBlogSlug("non-existent")).toBe(false);
  });
});

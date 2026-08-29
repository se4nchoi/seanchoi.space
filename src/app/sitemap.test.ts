import { describe, it, expect, vi } from "vitest";
import sitemap from "./sitemap";
import { SITE_URL } from "@/lib/seo/metadata";
import { HISTORICAL_BLOG_SLUGS } from "@/lib/content/historical-manifest";
import * as blogModule from "@/lib/content/blog";

describe("App Router Sitemap", () => {
  it("includes all core English and Korean launch routes with deterministic lastModified", () => {
    const entries = sitemap();
    const urls = entries.map((e) => e.url);

    expect(urls).toContain(`${SITE_URL}`);
    expect(urls).toContain(`${SITE_URL}/ko`);
    expect(urls).toContain(`${SITE_URL}/experience`);
    expect(urls).toContain(`${SITE_URL}/ko/experience`);
    expect(urls).toContain(`${SITE_URL}/projects`);
    expect(urls).toContain(`${SITE_URL}/ko/projects`);
    expect(urls).toContain(`${SITE_URL}/blog`);
    expect(urls).toContain(`${SITE_URL}/ko/blog`);

    for (const entry of entries) {
      expect((entry.lastModified as Date).toISOString()).toBe("2026-08-29T00:00:00.000Z");
    }
  });

  it("never emits non-existent routes such as /uses, topic routes, drafts, or historical slugs", () => {
    const entries = sitemap();
    const urls = entries.map((e) => e.url);

    // No /uses
    expect(urls).not.toContain(`${SITE_URL}/uses`);

    // No synthetic preview articles in launch sitemap
    expect(urls).not.toContain(`${SITE_URL}/blog/example-article`);
    expect(urls).not.toContain(`${SITE_URL}/ko/blog/example-article`);

    // No historical slugs
    for (const slug of HISTORICAL_BLOG_SLUGS) {
      expect(urls).not.toContain(`${SITE_URL}/blog/${slug}`);
      expect(urls).not.toContain(`${SITE_URL}/ko/blog/${slug}`);
    }

    // At launch, only the 8 core routes exist
    expect(entries).toHaveLength(8);
  });

  it("fails closed when blog pipeline validation throws (does not swallow error)", () => {
    const spy = vi.spyOn(blogModule, "loadAllMdxArticles").mockImplementationOnce(() => {
      throw new blogModule.BlogIntegrityError("Simulated pipeline validation failure");
    });

    expect(() => sitemap()).toThrow("Simulated pipeline validation failure");
    spy.mockRestore();
  });
});

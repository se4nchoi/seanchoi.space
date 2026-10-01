import { describe, it, expect, vi } from "vitest";
import sitemap from "./sitemap";
import { caseStudies } from "@/data/case-studies";
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

    for (const study of caseStudies) {
      for (const url of [`${SITE_URL}/projects/${study.slug}`, `${SITE_URL}/ko/projects/${study.slug}`]) {
        if (study.approved) expect(urls).toContain(url);
        else expect(urls).not.toContain(url);
      }
    }

    for (const entry of entries) {
      const expected = entry.url.includes("/projects/")
        ? "2026-10-01T00:00:00.000Z"
        : "2026-08-29T00:00:00.000Z";
      expect((entry.lastModified as Date).toISOString()).toBe(expected);
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

    // No synthetic project fixture
    expect(urls).not.toContain(`${SITE_URL}/projects/example-project`);

    // 8 core routes plus the EN/KO pair of each published case study
    // Only approved case studies belong in the production sitemap
    expect(entries).toHaveLength(8 + 2 * caseStudies.filter((s) => s.approved).length);
  });

  it("fails closed when blog pipeline validation throws (does not swallow error)", () => {
    const spy = vi.spyOn(blogModule, "loadAllMdxArticles").mockImplementationOnce(() => {
      throw new blogModule.BlogIntegrityError("Simulated pipeline validation failure");
    });

    expect(() => sitemap()).toThrow("Simulated pipeline validation failure");
    spy.mockRestore();
  });
});

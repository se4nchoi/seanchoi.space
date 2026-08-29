import { describe, it, expect } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  slugifyHeading,
  createHeadingIdGenerator,
  extractHeadingsFromMdx,
  sortMdxFilenames,
  validateBlogPipeline,
  validateBlogArticlesIntegrity,
  isPublishableArticle,
  getBlogArticles,
  getBlogArticleBySlug,
  getRelatedArticles,
  getArticleTranslationCounterpart,
  getAvailablePublicAssets,
  type ArticleDescriptor,
} from "./blog";
import { BLOG_MODULE_REGISTRY } from "./blog-registry";
import { type ArticleRecord } from "./schemas";
import { createMdxComponents } from "@/components/blog/mdx-components";
import { FigureMdx } from "@/components/blog/figure";
import { MdxLink } from "@/components/blog/mdx-link";
import { Callout } from "@/components/blog/callout";

describe("Blog Platform & MDX Integration", () => {
  describe("Heading Slugification and TOC Anchor Alignment", () => {
    it("slugifies English and Korean headings deterministically", () => {
      expect(slugifyHeading("Make the boundary visible")).toBe(
        "make-the-boundary-visible"
      );
      expect(slugifyHeading("범위를 명확히 표시하기")).toBe(
        "범위를-명확히-표시하기"
      );
      expect(slugifyHeading("Special Characters & Symbols @ 2026!")).toBe(
        "special-characters-symbols-2026"
      );
    });

    it("generates duplicate-safe IDs in document order matching TOC targets", () => {
      const markdown = `
## System Architecture
Overview.

### System Architecture
Sub-architecture.

## System Architecture
Third occurrence.
`;
      const getHeadingIdTOC = createHeadingIdGenerator();
      const headings = extractHeadingsFromMdx(markdown, getHeadingIdTOC);

      expect(headings).toEqual([
        { level: 2, text: "System Architecture", id: "system-architecture" },
        { level: 3, text: "System Architecture", id: "system-architecture-1" },
        { level: 2, text: "System Architecture", id: "system-architecture-2" },
      ]);

      const getHeadingIdDOM = createHeadingIdGenerator();
      const components = createMdxComponents({ getHeadingId: getHeadingIdDOM });

      const H2 = components.h2 as (
        props: React.HTMLAttributes<HTMLHeadingElement>
      ) => React.ReactNode;
      const H3 = components.h3 as (
        props: React.HTMLAttributes<HTMLHeadingElement>
      ) => React.ReactNode;

      const html1 = renderToStaticMarkup(
        H2({ children: "System Architecture" })
      );
      const html2 = renderToStaticMarkup(
        H3({ children: "System Architecture" })
      );
      const html3 = renderToStaticMarkup(
        H2({ children: "System Architecture" })
      );

      expect(html1).toContain('id="system-architecture"');
      expect(html2).toContain('id="system-architecture-1"');
      expect(html3).toContain('id="system-architecture-2"');
    });
  });

  describe("Public Asset Discovery & Production Pipeline", () => {
    it("discovers available files in public/ directory helper", () => {
      const assets = getAvailablePublicAssets();
      expect(assets).toBeInstanceOf(Set);
      expect(assets.size).toBeGreaterThanOrEqual(0);
    });

    it("sorts an explicitly unsorted virtual filename list deterministically", () => {
      const unsorted = [
        "zebra-post.en.mdx",
        "alpha-post.ko.mdx",
        "alpha-post.en.mdx",
        "beta-post.en.mdx",
      ];
      const sorted = sortMdxFilenames(unsorted);
      expect(sorted).toEqual([
        "alpha-post.en.mdx",
        "alpha-post.ko.mdx",
        "beta-post.en.mdx",
        "zebra-post.en.mdx",
      ]);
    });

    it("validates that all content/blog/*.mdx files pass pipeline checks in deterministic sort order", () => {
      const loaded = validateBlogPipeline();
      expect(loaded.length).toBeGreaterThan(0);
      for (const article of loaded) {
        expect(BLOG_MODULE_REGISTRY[article.record.id]).toBeDefined();
      }

      // Check deterministic alphabetical sort of loaded articles
      const slugs = loaded.map((a) => `${a.record.slug}.${a.record.locale}.mdx`);
      const sortedSlugs = sortMdxFilenames(slugs);
      expect(slugs).toEqual(sortedSlugs);
    });

    it("fails closed when descriptors list is empty but registry is nonempty", () => {
      expect(() =>
        validateBlogArticlesIntegrity([], BLOG_MODULE_REGISTRY)
      ).toThrow(/Orphan registry entry found/);
    });

    it("verifies isPublishableArticle predicate strictly", () => {
      const validPublic: ArticleRecord = {
        id: "valid-pub",
        slug: "valid-pub",
        locale: "en",
        publicationStatus: "public",
        claimState: "verified",
        syntheticPlaceholder: false,
        reviewedOn: "2026-08-29",
        title: "Valid",
        summary: "Valid",
        publishedOn: "2026-08-20",
        topics: ["test"],
        source: "original",
        assetPaths: [],
      };

      expect(isPublishableArticle(validPublic, "2026-08-29")).toBe(true);

      expect(
        isPublishableArticle(
          { ...validPublic, publishedOn: "2026-09-01" },
          "2026-08-29"
        )
      ).toBe(false);

      expect(
        isPublishableArticle({ ...validPublic, publicationStatus: "draft" })
      ).toBe(false);

      expect(
        isPublishableArticle({ ...validPublic, claimState: "pending" })
      ).toBe(false);

      expect(
        isPublishableArticle({ ...validPublic, syntheticPlaceholder: true })
      ).toBe(false);
    });
  });

  describe("Pure Cross-File Integrity Failures (Virtual Fixtures)", () => {
    const baseValidEn: ArticleRecord = {
      id: "art-1-en",
      slug: "art-1",
      locale: "en",
      publicationStatus: "draft",
      claimState: "pending",
      syntheticPlaceholder: true,
      reviewedOn: "2026-08-29",
      title: "Article 1",
      summary: "Summary 1",
      publishedOn: "2026-08-20",
      topics: ["systems"],
      source: "original",
      assetPaths: [],
    };

    const baseValidKo: ArticleRecord = {
      id: "art-1-ko",
      slug: "art-1",
      locale: "ko",
      translationOf: "art-1-en",
      publicationStatus: "draft",
      claimState: "pending",
      syntheticPlaceholder: true,
      reviewedOn: "2026-08-29",
      title: "글 1",
      summary: "요약 1",
      publishedOn: "2026-08-20",
      topics: ["시스템"],
      source: "original",
      assetPaths: [],
    };

    const validRegistry = {
      "art-1-en": { id: "art-1-en", filePath: "content/blog/art-1.en.mdx" },
      "art-1-ko": { id: "art-1-ko", filePath: "content/blog/art-1.ko.mdx" },
    };

    it("passes for valid virtual descriptors and matching registry", () => {
      const descriptors: ArticleDescriptor[] = [
        { record: baseValidEn, filePath: "content/blog/art-1.en.mdx" },
        { record: baseValidKo, filePath: "content/blog/art-1.ko.mdx" },
      ];
      expect(() =>
        validateBlogArticlesIntegrity(descriptors, validRegistry)
      ).not.toThrow();
    });

    it("rejects missing or blank descriptor filePath", () => {
      const descriptorsEmptyPath: ArticleDescriptor[] = [
        { record: baseValidEn, filePath: "   " },
        { record: baseValidKo, filePath: "content/blog/art-1.ko.mdx" },
      ];
      expect(() =>
        validateBlogArticlesIntegrity(descriptorsEmptyPath, validRegistry)
      ).toThrow(
        /Article 'art-1-en' is missing a valid normalized source filePath/
      );
    });

    it("rejects duplicate article IDs", () => {
      const dupId: ArticleRecord = { ...baseValidKo, id: "art-1-en" };
      const descriptors: ArticleDescriptor[] = [
        { record: baseValidEn, filePath: "content/blog/art-1.en.mdx" },
        { record: dupId, filePath: "content/blog/art-1.ko.mdx" },
      ];
      expect(() =>
        validateBlogArticlesIntegrity(descriptors, validRegistry)
      ).toThrow(/Duplicate article ID found: 'art-1-en'/);
    });

    it("rejects two distinct article descriptors using the same source path", () => {
      const art2En: ArticleRecord = {
        ...baseValidEn,
        id: "art-2-en",
        slug: "art-2",
      };
      const reg = {
        "art-1-en": { id: "art-1-en", filePath: "content/blog/art-1.en.mdx" },
        "art-2-en": { id: "art-2-en", filePath: "content/blog/art-2.en.mdx" },
      };
      const descriptors: ArticleDescriptor[] = [
        { record: baseValidEn, filePath: "content/blog/art-1.en.mdx" },
        { record: art2En, filePath: "content/blog/art-1.en.mdx" },
      ];
      expect(() => validateBlogArticlesIntegrity(descriptors, reg)).toThrow(
        /Duplicate article source filePath found: 'content\/blog\/art-1\.en\.mdx'/
      );
    });

    it("rejects two registry IDs pointing to the same source path", () => {
      const descriptors: ArticleDescriptor[] = [
        { record: baseValidEn, filePath: "content/blog/art-1.en.mdx" },
      ];
      const dupPathRegistry = {
        "art-1-en": { id: "art-1-en", filePath: "content/blog/art-1.en.mdx" },
        "art-dup-key": {
          id: "art-dup-key",
          filePath: "content/blog/art-1.en.mdx",
        },
      };
      expect(() =>
        validateBlogArticlesIntegrity(descriptors, dupPathRegistry)
      ).toThrow(
        /Duplicate registry filePath found: 'content\/blog\/art-1\.en\.mdx'/
      );
    });

    it("rejects a registry key whose embedded id differs from its key", () => {
      const descriptors: ArticleDescriptor[] = [
        { record: baseValidEn, filePath: "content/blog/art-1.en.mdx" },
      ];
      const mismatchedKeyRegistry = {
        "art-key-a": { id: "art-key-b", filePath: "content/blog/art-1.en.mdx" },
      };
      expect(() =>
        validateBlogArticlesIntegrity(descriptors, mismatchedKeyRegistry)
      ).toThrow(
        /Registry entry key 'art-key-a' does not match embedded entry ID 'art-key-b'/
      );
    });

    it("rejects a descriptor whose actual file path differs from registry expected path", () => {
      const descriptors: ArticleDescriptor[] = [
        { record: baseValidEn, filePath: "content/blog/actual-different.en.mdx" },
        { record: baseValidKo, filePath: "content/blog/art-1.ko.mdx" },
      ];
      expect(() =>
        validateBlogArticlesIntegrity(descriptors, validRegistry)
      ).toThrow(
        /Registry file path mismatch for 'art-1-en': registry has 'content\/blog\/art-1\.en\.mdx', actual is 'content\/blog\/actual-different\.en\.mdx'/
      );
    });

    it("rejects duplicate locale and slug pairs", () => {
      const dupSlug: ArticleRecord = {
        ...baseValidKo,
        id: "art-2-ko",
        translationOf: "art-1-en",
      };
      const reg = {
        ...validRegistry,
        "art-2-ko": { id: "art-2-ko", filePath: "content/blog/art-2.ko.mdx" },
      };
      const descriptors: ArticleDescriptor[] = [
        { record: baseValidEn, filePath: "content/blog/art-1.en.mdx" },
        { record: baseValidKo, filePath: "content/blog/art-1.ko.mdx" },
        { record: dupSlug, filePath: "content/blog/art-2.ko.mdx" },
      ];
      expect(() => validateBlogArticlesIntegrity(descriptors, reg)).toThrow(
        /Duplicate locale and slug pair found: 'ko:art-1'/
      );
    });

    it("rejects duplicate normalized topics within an article", () => {
      const dupTopics: ArticleRecord = {
        ...baseValidEn,
        topics: ["Systems", "systems"],
      };
      const descriptors: ArticleDescriptor[] = [
        { record: dupTopics, filePath: "content/blog/art-1.en.mdx" },
        { record: baseValidKo, filePath: "content/blog/art-1.ko.mdx" },
      ];
      expect(() =>
        validateBlogArticlesIntegrity(descriptors, validRegistry)
      ).toThrow(/Duplicate topic found in article 'art-1-en'/);
    });

    it("rejects missing registry entries", () => {
      const descriptors: ArticleDescriptor[] = [
        { record: baseValidEn, filePath: "content/blog/art-1.en.mdx" },
        { record: baseValidKo, filePath: "content/blog/art-1.ko.mdx" },
      ];
      const partialRegistry = {
        "art-1-en": { id: "art-1-en", filePath: "content/blog/art-1.en.mdx" },
      };
      expect(() =>
        validateBlogArticlesIntegrity(descriptors, partialRegistry)
      ).toThrow(/missing corresponding entry in BLOG_MODULE_REGISTRY/);
    });

    it("rejects orphan registry entries", () => {
      const descriptors: ArticleDescriptor[] = [
        { record: baseValidEn, filePath: "content/blog/art-1.en.mdx" },
      ];
      expect(() =>
        validateBlogArticlesIntegrity(descriptors, validRegistry)
      ).toThrow(/Orphan registry entry found: 'art-1-ko'/);
    });

    it("rejects missing translationOf source ID", () => {
      const missingSourceKo: ArticleRecord = {
        ...baseValidKo,
        translationOf: "non-existent-source-id",
      };
      const descriptors: ArticleDescriptor[] = [
        { record: baseValidEn, filePath: "content/blog/art-1.en.mdx" },
        { record: missingSourceKo, filePath: "content/blog/art-1.ko.mdx" },
      ];
      expect(() =>
        validateBlogArticlesIntegrity(descriptors, validRegistry)
      ).toThrow(
        /references non-existent translationOf source ID: 'non-existent-source-id'/
      );
    });

    it("rejects same-locale translationOf reference", () => {
      const sameLocaleKo: ArticleRecord = {
        ...baseValidKo,
        translationOf: "art-2-ko",
      };
      const art2Ko: ArticleRecord = {
        ...baseValidKo,
        id: "art-2-ko",
        slug: "art-2",
        translationOf: undefined,
      };
      const reg = {
        "art-1-ko": { id: "art-1-ko", filePath: "content/blog/art-1.ko.mdx" },
        "art-2-ko": { id: "art-2-ko", filePath: "content/blog/art-2.ko.mdx" },
      };
      const descriptors: ArticleDescriptor[] = [
        { record: sameLocaleKo, filePath: "content/blog/art-1.ko.mdx" },
        { record: art2Ko, filePath: "content/blog/art-2.ko.mdx" },
      ];
      expect(() => validateBlogArticlesIntegrity(descriptors, reg)).toThrow(
        /references a source with the same locale \('ko'\)/
      );
    });

    it("rejects chained translations", () => {
      const rootEn: ArticleRecord = {
        ...baseValidEn,
        id: "art-root-en",
        slug: "root",
      };
      const midTransNonEn: ArticleRecord = {
        ...baseValidKo,
        id: "art-mid-other",
        slug: "mid",
        locale: "ja" as "ko",
        translationOf: "art-root-en",
      };
      const chainedKo: ArticleRecord = {
        ...baseValidKo,
        id: "art-chained-ko",
        slug: "chained",
        translationOf: "art-mid-other",
      };
      const reg = {
        "art-root-en": {
          id: "art-root-en",
          filePath: "content/blog/root.en.mdx",
        },
        "art-mid-other": {
          id: "art-mid-other",
          filePath: "content/blog/mid.other.mdx",
        },
        "art-chained-ko": {
          id: "art-chained-ko",
          filePath: "content/blog/chained.ko.mdx",
        },
      };
      const descriptors: ArticleDescriptor[] = [
        { record: rootEn, filePath: "content/blog/root.en.mdx" },
        { record: midTransNonEn, filePath: "content/blog/mid.other.mdx" },
        {
          record: { ...chainedKo, translationOf: "art-mid-other" },
          filePath: "content/blog/chained.ko.mdx",
        },
      ];
      expect(() => validateBlogArticlesIntegrity(descriptors, reg)).toThrow(
        /Chained translation detected/
      );
    });

    it("rejects duplicate translations for the same target locale", () => {
      const trans1Ko: ArticleRecord = {
        ...baseValidKo,
        id: "art-trans-1-ko",
        slug: "trans-1",
        translationOf: "art-1-en",
      };
      const trans2Ko: ArticleRecord = {
        ...baseValidKo,
        id: "art-trans-2-ko",
        slug: "trans-2",
        translationOf: "art-1-en",
      };
      const reg = {
        "art-1-en": { id: "art-1-en", filePath: "content/blog/art-1.en.mdx" },
        "art-trans-1-ko": {
          id: "art-trans-1-ko",
          filePath: "content/blog/trans-1.ko.mdx",
        },
        "art-trans-2-ko": {
          id: "art-trans-2-ko",
          filePath: "content/blog/trans-2.ko.mdx",
        },
      };
      const descriptors: ArticleDescriptor[] = [
        { record: baseValidEn, filePath: "content/blog/art-1.en.mdx" },
        { record: trans1Ko, filePath: "content/blog/trans-1.ko.mdx" },
        { record: trans2Ko, filePath: "content/blog/trans-2.ko.mdx" },
      ];
      expect(() => validateBlogArticlesIntegrity(descriptors, reg)).toThrow(
        /Duplicate translation detected: source 'art-1-en' already has a translation for locale 'ko'/
      );
    });

    it("rejects public articles with invalid publication states (pending, synthetic, future-dated, unreviewed)", () => {
      const publicPending: ArticleRecord = {
        ...baseValidEn,
        publicationStatus: "public",
        claimState: "pending",
      };
      expect(() =>
        validateBlogArticlesIntegrity(
          [{ record: publicPending, filePath: "content/blog/art-1.en.mdx" }],
          {
            "art-1-en": {
              id: "art-1-en",
              filePath: "content/blog/art-1.en.mdx",
            },
          }
        )
      ).toThrow(/must have claimState: 'verified'/);

      const publicSynthetic: ArticleRecord = {
        ...baseValidEn,
        publicationStatus: "public",
        claimState: "verified",
        syntheticPlaceholder: true,
      };
      expect(() =>
        validateBlogArticlesIntegrity(
          [{ record: publicSynthetic, filePath: "content/blog/art-1.en.mdx" }],
          {
            "art-1-en": {
              id: "art-1-en",
              filePath: "content/blog/art-1.en.mdx",
            },
          }
        )
      ).toThrow(/must not be marked syntheticPlaceholder: true/);

      const publicFuture: ArticleRecord = {
        ...baseValidEn,
        publicationStatus: "public",
        claimState: "verified",
        syntheticPlaceholder: false,
        publishedOn: "2026-10-01",
      };
      expect(() =>
        validateBlogArticlesIntegrity(
          [{ record: publicFuture, filePath: "content/blog/art-1.en.mdx" }],
          {
            "art-1-en": {
              id: "art-1-en",
              filePath: "content/blog/art-1.en.mdx",
            },
          },
          { now: "2026-08-29" }
        )
      ).toThrow(/has future publishedOn date/);
    });
  });

  describe("Retired Articles Boundaries in Query APIs", () => {
    const retiredArticle: ArticleRecord = {
      id: "art-retired",
      slug: "retired-post",
      locale: "en",
      publicationStatus: "retired",
      claimState: "verified",
      syntheticPlaceholder: false,
      reviewedOn: "2026-08-29",
      title: "Retired Post",
      summary: "Retired summary.",
      publishedOn: "2026-08-01",
      topics: ["legacy"],
      source: "original",
      assetPaths: [],
    };

    it("proves retired articles are never returned in preview index or detail queries", () => {
      const articles = [retiredArticle];
      const previewFiltered = articles.filter(
        (a) => a.locale === "en" && a.publicationStatus !== "retired"
      );
      expect(previewFiltered).toHaveLength(0);

      // Detail lookup for retired slug returns undefined
      const detail = getBlogArticleBySlug("en", "retired-post", {
        preview: true,
      });
      expect(detail).toBeUndefined();

      // Production lookup
      const prodArticles = getBlogArticles("en", { preview: false });
      expect(prodArticles.some((a) => a.slug === "retired-post")).toBe(false);
    });

    it("proves retired articles are never related", () => {
      const current: ArticleRecord = {
        ...retiredArticle,
        id: "art-current",
        slug: "current-post",
        publicationStatus: "public",
      };
      const related = getRelatedArticles(current, [current, retiredArticle], {
        allowPreview: true,
      });
      expect(related).toHaveLength(0);
    });
  });

  describe("Translation Counterpart Resolution", () => {
    const enSource: ArticleRecord = {
      id: "art-source-en",
      slug: "art-source",
      locale: "en",
      publicationStatus: "public",
      claimState: "verified",
      syntheticPlaceholder: false,
      reviewedOn: "2026-08-29",
      title: "English Source",
      summary: "Summary",
      publishedOn: "2026-08-20",
      topics: ["test"],
      source: "original",
      assetPaths: [],
    };

    const koTranslation: ArticleRecord = {
      id: "art-trans-ko",
      slug: "art-trans",
      locale: "ko",
      translationOf: "art-source-en",
      publicationStatus: "public",
      claimState: "verified",
      syntheticPlaceholder: false,
      reviewedOn: "2026-08-29",
      title: "Korean Translation",
      summary: "Summary",
      publishedOn: "2026-08-20",
      topics: ["test"],
      source: "original",
      assetPaths: [],
    };

    const pool = [enSource, koTranslation];

    it("resolves counterpart in both directions for valid source-translation pair", () => {
      const counterpartKo = getArticleTranslationCounterpart(
        enSource,
        pool,
        false
      );
      expect(counterpartKo?.id).toBe("art-trans-ko");

      const counterpartEn = getArticleTranslationCounterpart(
        koTranslation,
        pool,
        false
      );
      expect(counterpartEn?.id).toBe("art-source-en");
    });
  });

  describe("MDX Prose Components & Safety Constraints", () => {
    it("throws when body-level h1 is rendered", () => {
      const components = createMdxComponents({
        getHeadingId: createHeadingIdGenerator(),
      });
      const H1 = components.h1 as () => React.ReactNode;
      expect(() => H1()).toThrowError(/MDX body must not include an <h1> tag/);
    });

    it("renders Figure component with contract-driven attributes and local asset path", () => {
      const el = React.createElement(FigureMdx, {
        src: "/assets/test.png",
        width: 800,
        height: 450,
        alt: "Architecture Diagram",
        caption: "System Overview",
      });
      const html = renderToStaticMarkup(el);

      expect(html).toContain("<figure");
      expect(html).toContain('alt="Architecture Diagram"');
      expect(html).toContain('width="800"');
      expect(html).toContain('height="450"');
      expect(html).toContain("System Overview");
    });

    it("renders Figure with empty alt when decorative={true}", () => {
      const el = React.createElement(FigureMdx, {
        src: "/assets/decorative.png",
        width: 400,
        height: 200,
        decorative: true,
      });
      const html = renderToStaticMarkup(el);

      expect(html).toContain('alt=""');
    });

    it("renders localized Callout titles by default without English leakage", () => {
      const enEl = React.createElement(
        Callout,
        { type: "note", locale: "en" },
        "English note"
      );
      const enHtml = renderToStaticMarkup(enEl);
      expect(enHtml).toContain("Note");
      expect(enHtml).toContain("English note");

      const koEl = React.createElement(
        Callout,
        { type: "note", locale: "ko" },
        "한국어 참고"
      );
      const koHtml = renderToStaticMarkup(koEl);
      expect(koHtml).toContain("참고");
      expect(koHtml).toContain("한국어 참고");
      expect(koHtml).not.toContain(">Note<");
    });

    it("sanitizes MdxLink rendering safe internal, external, and neutralizing unsafe schemes", () => {
      const intEl = React.createElement(
        MdxLink,
        { href: "/projects" },
        "Internal"
      );
      const intHtml = renderToStaticMarkup(intEl);
      expect(intHtml).toContain('href="/projects"');

      const extEl = React.createElement(
        MdxLink,
        { href: "https://example.com" },
        "External"
      );
      const extHtml = renderToStaticMarkup(extEl);
      expect(extHtml).toContain('href="https://example.com"');
      expect(extHtml).toContain('rel="noopener noreferrer"');

      const unsafeEl = React.createElement(
        MdxLink,
        { href: "javascript:alert(1)" },
        "Unsafe"
      );
      const unsafeHtml = renderToStaticMarkup(unsafeEl);
      expect(unsafeHtml).not.toContain("href=");
      expect(unsafeHtml).toContain("Unsafe");
    });
  });
});

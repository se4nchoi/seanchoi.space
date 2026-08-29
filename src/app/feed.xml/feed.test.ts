import { describe, it, expect } from "vitest";
import { generateAtomFeed, escapeXml, DEFAULT_FEED_UPDATED } from "@/lib/content/feed";
import type { ArticleRecord } from "@/lib/content/schemas";
import { SITE_URL } from "@/lib/seo/metadata";

describe("Atom Feed Generator", () => {
  it("escapes XML special characters", () => {
    expect(escapeXml("Tom & Jerry <friends> \"yes\" 'no'")).toBe(
      "Tom &amp; Jerry &lt;friends&gt; &quot;yes&quot; &apos;no&apos;"
    );
  });

  it("generates valid deterministic empty Atom 1.0 feed at launch with 0 entries and site author", () => {
    const feed = generateAtomFeed([]);

    expect(feed).toContain('<?xml version="1.0" encoding="utf-8"?>');
    expect(feed).toContain('<feed xmlns="http://www.w3.org/2005/Atom">');
    expect(feed).toContain("<title>seanchoi.space — Blog</title>");
    expect(feed).toContain("<subtitle>Reviewed writing published on seanchoi.space.</subtitle>");
    expect(feed).toContain(`<link href="${SITE_URL}/feed.xml" rel="self" type="application/atom+xml"/>`);
    expect(feed).toContain(`<link href="${SITE_URL}/blog" rel="alternate" type="text/html"/>`);
    expect(feed).toContain(`<updated>${DEFAULT_FEED_UPDATED}</updated>`);
    expect(feed).toContain("<author>\n    <name>seanchoi.space</name>");
    expect(feed).toContain("</feed>");
    expect(feed).not.toContain("<entry");

    // Guard against invented personal names or claims in feed
    expect(feed).not.toContain("최현우");
    expect(feed).not.toContain("systems architecture, web platforms");
  });

  it("excludes unpublishable records (drafts, pending claims, synthetic, future-dated)", () => {
    const articles: ArticleRecord[] = [
      {
        id: "draft-article",
        slug: "draft-article",
        locale: "en",
        publicationStatus: "draft",
        claimState: "pending",
        syntheticPlaceholder: true,
        reviewedOn: "2026-08-29",
        title: "Draft Article",
        summary: "Synthetic preview article.",
        publishedOn: "2026-08-28",
        topics: ["testing"],
        source: "original",
        assetPaths: [],
      },
      {
        id: "future-article",
        slug: "future-article",
        locale: "en",
        publicationStatus: "public",
        claimState: "verified",
        syntheticPlaceholder: false,
        reviewedOn: "2026-08-29",
        title: "Future Article",
        summary: "Future post.",
        publishedOn: "2026-09-15",
        topics: ["future"],
        source: "original",
        assetPaths: [],
      },
    ];

    const feed = generateAtomFeed(articles, { now: "2026-08-29" });
    expect(feed).not.toContain("<entry");
    expect(feed).not.toContain("Draft Article");
    expect(feed).not.toContain("Future Article");
  });

  it("formats valid Atom entry elements with XML-escaped absolute IDs, explicit xml:lang, site author, and deterministic date order", () => {
    const publicArticles: ArticleRecord[] = [
      {
        id: "post-older",
        slug: "post-older",
        locale: "en",
        publicationStatus: "public",
        claimState: "verified",
        syntheticPlaceholder: false,
        reviewedOn: "2026-08-29",
        title: "Older Post",
        summary: "Older summary.",
        publishedOn: "2026-08-10",
        topics: ["systems"],
        source: "original",
        assetPaths: [],
      },
      {
        id: "post-newer",
        slug: "post-newer",
        locale: "ko",
        publicationStatus: "public",
        claimState: "verified",
        syntheticPlaceholder: false,
        reviewedOn: "2026-08-29",
        title: "Newer Post <Korean>",
        summary: "Newer & updated summary.",
        publishedOn: "2026-08-25",
        topics: ["architecture", "embedded"],
        source: "original",
        assetPaths: [],
      },
    ];

    const feed = generateAtomFeed(publicArticles, { now: "2026-08-29" });

    expect(feed).toContain('<entry xml:lang="ko">');
    expect(feed).toContain('<entry xml:lang="en">');

    // Absolute IDs
    expect(feed).toContain(`<id>${SITE_URL}/ko/blog/post-newer</id>`);
    expect(feed).toContain(`<id>${SITE_URL}/blog/post-older</id>`);

    // Newer post should appear before older post
    const newerIndex = feed.indexOf("Newer Post &lt;Korean&gt;");
    const olderIndex = feed.indexOf("Older Post");
    expect(newerIndex).toBeGreaterThan(0);
    expect(olderIndex).toBeGreaterThan(newerIndex);

    expect(feed).toContain("<summary>Newer &amp; updated summary.</summary>");
    expect(feed).toContain(`<link href="${SITE_URL}/ko/blog/post-newer" rel="alternate" type="text/html"/>`);
    expect(feed).toContain(`<link href="${SITE_URL}/blog/post-older" rel="alternate" type="text/html"/>`);
    expect(feed).toContain('<category term="architecture"/>');
    expect(feed).toContain('<category term="embedded"/>');
    expect(feed).toContain("<author>\n      <name>seanchoi.space</name>");
  });
});

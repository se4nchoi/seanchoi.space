import type { ArticleRecord } from "./schemas";
import { SITE_URL } from "@/lib/seo/metadata";
import { isPublishableArticle } from "./blog";

export function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export const DEFAULT_FEED_UPDATED = "2026-08-29T00:00:00.000Z";

export function generateAtomFeed(
  articles: ArticleRecord[],
  options?: { now?: string | Date }
): string {
  const now = options?.now || new Date("2026-08-29T00:00:00Z");

  // Filter public verified non-synthetic articles
  const publicArticles = articles
    .filter((a) => isPublishableArticle(a, now))
    .sort((a, b) => {
      if (a.publishedOn !== b.publishedOn) {
        return b.publishedOn.localeCompare(a.publishedOn);
      }
      return a.slug.localeCompare(b.slug);
    });

  const latestUpdate = publicArticles[0]?.updatedOn || publicArticles[0]?.publishedOn;
  const updatedIso = latestUpdate
    ? new Date(latestUpdate).toISOString()
    : typeof options?.now !== "undefined"
      ? new Date(options.now).toISOString()
      : DEFAULT_FEED_UPDATED;

  const entriesXml = publicArticles
    .map((article) => {
      const canonicalPath =
        article.locale === "ko"
          ? `/ko/blog/${article.slug}`
          : `/blog/${article.slug}`;
      const canonicalUrl = `${SITE_URL}${canonicalPath}`;
      const escapedCanonicalUrl = escapeXml(canonicalUrl);
      const publishedIso = new Date(article.publishedOn).toISOString();
      const articleUpdatedIso = article.updatedOn
        ? new Date(article.updatedOn).toISOString()
        : publishedIso;

      const categoriesXml = article.topics
        .map((topic) => `    <category term="${escapeXml(topic)}"/>`)
        .join("\n");

      return `  <entry xml:lang="${article.locale}">
    <title>${escapeXml(article.title)}</title>
    <link href="${escapedCanonicalUrl}" rel="alternate" type="text/html"/>
    <id>${escapedCanonicalUrl}</id>
    <published>${publishedIso}</published>
    <updated>${articleUpdatedIso}</updated>
    <summary>${escapeXml(article.summary)}</summary>
    <author>
      <name>seanchoi.space</name>
      <uri>${escapeXml(SITE_URL)}</uri>
    </author>
${categoriesXml}
  </entry>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>seanchoi.space — Blog</title>
  <subtitle>Reviewed writing published on seanchoi.space.</subtitle>
  <link href="${escapeXml(SITE_URL)}/feed.xml" rel="self" type="application/atom+xml"/>
  <link href="${escapeXml(SITE_URL)}/blog" rel="alternate" type="text/html"/>
  <id>${escapeXml(SITE_URL)}/feed.xml</id>
  <updated>${updatedIso}</updated>
  <author>
    <name>seanchoi.space</name>
    <uri>${escapeXml(SITE_URL)}</uri>
  </author>
${entriesXml ? `\n${entriesXml}\n` : ""}
</feed>
`.trim() + "\n";
}

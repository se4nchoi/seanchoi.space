import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/metadata";
import { loadAllMdxArticles, isPublishableArticle } from "@/lib/content/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const coreLastModified = new Date("2026-08-29T00:00:00Z");

  // Core static bilingual pages
  const coreRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}`,
      lastModified: coreLastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/ko`,
      lastModified: coreLastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/experience`,
      lastModified: coreLastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/ko/experience`,
      lastModified: coreLastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: coreLastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/ko/projects`,
      lastModified: coreLastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: coreLastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/ko/blog`,
      lastModified: coreLastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // Publishable public articles - fail closed if validation fails (no try-catch swallowing)
  const articles = loadAllMdxArticles()
    .map((a) => a.record)
    .filter((a) => isPublishableArticle(a));

  const publicArticles: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${SITE_URL}${article.locale === "ko" ? "/ko" : ""}/blog/${article.slug}`,
    lastModified: new Date(article.updatedOn || article.publishedOn),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...coreRoutes, ...publicArticles];
}

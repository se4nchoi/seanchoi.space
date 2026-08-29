export interface HistoricalRouteEntry {
  slug: string;
  disposition: "retired";
  replacementUrl: null;
  reviewedOn: string;
  notes: string;
}

export const HISTORICAL_BLOG_SLUGS = [
  "retrospect-hoek-agency",
  "retrospect-emg-global",
  "vimium-keyboard-lover-s-bestfriend-on-the-web",
  "how-to-use-notion-as-your-blog-post-database",
  "how-to-persist-images-on-notion-pages-made-from-notion-to-md",
] as const;

export type HistoricalBlogSlug = (typeof HISTORICAL_BLOG_SLUGS)[number];

export const HISTORICAL_ROUTE_MANIFEST: readonly HistoricalRouteEntry[] = [
  {
    slug: "retrospect-hoek-agency",
    disposition: "retired",
    replacementUrl: null,
    reviewedOn: "2026-08-29",
    notes:
      "Preserved as draft source idea under legacy-content/; retired at launch with no redirect.",
  },
  {
    slug: "retrospect-emg-global",
    disposition: "retired",
    replacementUrl: null,
    reviewedOn: "2026-08-29",
    notes:
      "Preserved as draft source idea under legacy-content/; retired at launch with no redirect.",
  },
  {
    slug: "vimium-keyboard-lover-s-bestfriend-on-the-web",
    disposition: "retired",
    replacementUrl: null,
    reviewedOn: "2026-08-29",
    notes:
      "Preserved as draft source idea under legacy-content/; retired at launch with no redirect.",
  },
  {
    slug: "how-to-use-notion-as-your-blog-post-database",
    disposition: "retired",
    replacementUrl: null,
    reviewedOn: "2026-08-29",
    notes:
      "Preserved as draft source idea under legacy-content/; retired at launch with no redirect.",
  },
  {
    slug: "how-to-persist-images-on-notion-pages-made-from-notion-to-md",
    disposition: "retired",
    replacementUrl: null,
    reviewedOn: "2026-08-29",
    notes:
      "Preserved as draft source idea under legacy-content/; retired at launch with no redirect.",
  },
] as const;

export function isHistoricalBlogSlug(slug: string): slug is HistoricalBlogSlug {
  return (HISTORICAL_BLOG_SLUGS as readonly string[]).includes(slug);
}

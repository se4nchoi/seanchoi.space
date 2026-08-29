export interface ArticleRoutePair {
  enSlug: string;
  koSlug: string;
}

export const ARTICLE_ROUTE_PAIRS: readonly ArticleRoutePair[] = [
  {
    enSlug: "example-article",
    koSlug: "example-article",
  },
] as const;

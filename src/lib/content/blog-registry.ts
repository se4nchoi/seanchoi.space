import type { ComponentType } from "react";
import type { MDXComponents } from "mdx/types";

export interface BlogRegistryEntry {
  id: string;
  filePath: string;
  loadComponent: () => Promise<{ default: ComponentType<{ components?: MDXComponents }> }>;
}

export const BLOG_MODULE_REGISTRY: Record<string, BlogRegistryEntry> = {
  "example-article-en": {
    id: "example-article-en",
    filePath: "content/blog/example-article.en.mdx",
    loadComponent: () => import("../../../content/blog/example-article.en.mdx"),
  },
  "example-article-ko": {
    id: "example-article-ko",
    filePath: "content/blog/example-article.ko.mdx",
    loadComponent: () => import("../../../content/blog/example-article.ko.mdx"),
  },
};

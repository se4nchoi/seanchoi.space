import type { MDXComponents } from "mdx/types";
import { createMdxComponents } from "./components/blog/mdx-components";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...createMdxComponents(),
    ...components,
  };
}

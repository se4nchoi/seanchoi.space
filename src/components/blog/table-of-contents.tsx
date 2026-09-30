import React from "react";
import type { ArticleHeading } from "@/lib/content/blog";

export interface TableOfContentsProps {
  headings: ArticleHeading[];
  title?: string;
}

export function TableOfContents({
  headings,
  title = "On this page",
}: TableOfContentsProps) {
  if (headings.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label={title}
      className="rounded-[var(--radius-md)] border border-line bg-surface p-4 text-small"
    >
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
        {title}
      </h2>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={
              heading.level === 3
                ? "pl-4 text-muted"
                : "font-medium text-foreground"
            }
          >
            <a
              href={`#${heading.id}`}
              className="text-muted transition-colors hover:text-accent hover:underline"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

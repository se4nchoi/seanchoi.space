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
      className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-4 text-[length:var(--text-small)]"
    >
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
        {title}
      </h2>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={
              heading.level === 3
                ? "pl-4 text-[var(--muted)]"
                : "font-medium text-[var(--foreground)]"
            }
          >
            <a
              href={`#${heading.id}`}
              className="text-[var(--muted)] transition-colors hover:text-[var(--accent)] hover:underline"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

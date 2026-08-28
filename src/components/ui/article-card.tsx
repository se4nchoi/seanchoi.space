import React from "react";
import Link from "next/link";
import { Tag } from "./tag";

export interface ArticleCardProps {
  title: string;
  summary: string;
  date: string;
  topics?: string[];
  href: string;
  headingLevel?: 2 | 3;
  className?: string;
}

export function ArticleCard({
  title,
  summary,
  date,
  topics = [],
  href,
  headingLevel = 2,
  className = "",
}: ArticleCardProps) {
  const HeadingTag = headingLevel === 3 ? "h3" : "h2";

  return (
    <article
      className={`border-b border-[var(--border)] py-6 last:border-b-0 sm:py-7 ${className}`}
    >
      <div className="flex flex-col-reverse gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <HeadingTag className="text-[length:var(--text-heading-3)] font-semibold text-[var(--foreground)] leading-[var(--leading-tight)]">
          <Link
            href={href}
            className="hover:text-[var(--accent)] transition-colors underline-offset-2 hover:underline"
          >
            {title}
          </Link>
        </HeadingTag>
        <time className="text-[length:var(--text-small)] font-mono text-[var(--muted)] shrink-0">
          {date}
        </time>
      </div>
      <p className="mt-2 text-[length:var(--text-body)] leading-[var(--leading-relaxed)] text-[var(--muted)]">
        {summary}
      </p>
      {topics.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {topics.map((topic) => (
            <Tag key={topic} variant="muted">
              {topic}
            </Tag>
          ))}
        </div>
      )}
    </article>
  );
}

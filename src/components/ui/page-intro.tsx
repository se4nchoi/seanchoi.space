import React from "react";

export interface PageIntroProps {
  eyebrow?: string;
  title: string;
  summary?: string;
  className?: string;
}

export function PageIntro({
  eyebrow,
  title,
  summary,
  className = "",
}: PageIntroProps) {
  return (
    <div className={`mb-8 sm:mb-12 ${className}`}>
      {eyebrow && (
        <p className="mb-2 text-[length:var(--text-small)] font-medium uppercase tracking-[var(--tracking-label)] text-[var(--accent)]">
          {eyebrow}
        </p>
      )}
      <h1 className="text-[length:var(--text-heading-1)] font-semibold tracking-[var(--tracking-display)] leading-[var(--leading-tight)] text-[var(--foreground)]">
        {title}
      </h1>
      {summary && (
        <p className="mt-3 max-w-[var(--max-width-prose)] text-[length:var(--text-body)] leading-[var(--leading-relaxed)] text-[var(--muted)]">
          {summary}
        </p>
      )}
    </div>
  );
}

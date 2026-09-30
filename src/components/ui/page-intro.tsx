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
        <p className="mb-2 text-small font-medium uppercase tracking-label text-accent">
          {eyebrow}
        </p>
      )}
      <h1 className="text-heading-1 font-semibold tracking-display leading-tight text-foreground">
        {title}
      </h1>
      {summary && (
        <p className="mt-3 max-w-[var(--max-width-prose)] text-body leading-relaxed text-muted">
          {summary}
        </p>
      )}
    </div>
  );
}

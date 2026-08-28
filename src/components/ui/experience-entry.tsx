import React from "react";

export interface ExperienceEntryProps {
  organization: string;
  role: string;
  dateLabel: string;
  employmentType?: string;
  summary: string;
  contributions?: string[];
  headingLevel?: 2 | 3;
  className?: string;
}

export function ExperienceEntry({
  organization,
  role,
  dateLabel,
  employmentType,
  summary,
  contributions = [],
  headingLevel = 2,
  className = "",
}: ExperienceEntryProps) {
  const HeadingTag = headingLevel === 3 ? "h3" : "h2";

  return (
    <article
      className={`border-b border-[var(--border)] py-6 last:border-b-0 sm:py-8 ${className}`}
    >
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <div>
          <HeadingTag className="text-[length:var(--text-heading-3)] font-semibold text-[var(--foreground)] leading-[var(--leading-tight)]">
            {role}
          </HeadingTag>
          <p className="text-[length:var(--text-small)] font-medium text-[var(--muted)]">
            {organization}
            {employmentType && (
              <span className="ml-2 font-normal text-[length:var(--text-small)] text-[var(--muted)]">
                • {employmentType}
              </span>
            )}
          </p>
        </div>
        <time className="text-[length:var(--text-small)] font-mono text-[var(--muted)]">{dateLabel}</time>
      </div>
      <p className="mt-3 text-[length:var(--text-body)] leading-[var(--leading-relaxed)] text-[var(--foreground)]">
        {summary}
      </p>
      {contributions.length > 0 && (
        <ul className="mt-4 list-disc space-y-1.5 pl-5 text-[length:var(--text-small)] text-[var(--muted)]">
          {contributions.map((item, index) => (
            <li key={index} className="leading-[var(--leading-relaxed)]">
              {item}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

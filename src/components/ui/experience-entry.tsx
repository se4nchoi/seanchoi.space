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
      className={`border-b border-line py-6 last:border-b-0 sm:py-8 ${className}`}
    >
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <div>
          <HeadingTag className="text-heading-3 font-semibold text-foreground leading-tight">
            {role}
          </HeadingTag>
          <p className="text-small font-medium text-muted">
            {organization}
            {employmentType && (
              <span className="ml-2 font-normal text-small text-muted">
                • {employmentType}
              </span>
            )}
          </p>
        </div>
        <time className="text-small font-mono text-muted">{dateLabel}</time>
      </div>
      <p className="mt-3 text-body leading-relaxed text-foreground">
        {summary}
      </p>
      {contributions.length > 0 && (
        <ul className="mt-4 list-disc space-y-1.5 pl-5 text-small text-muted">
          {contributions.map((item, index) => (
            <li key={index} className="leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

import React from "react";

export interface EngineeringEvidenceCardProps {
  title: string;
  summary: string;
  role?: string;
  evidenceLabel: string;
  status: "completed" | "in-progress";
  statusLabel: string;
  contributionBoundary: string;
  contributionBoundaryLabel: string;
  technologies: string[];
  completedScope: string[];
  plannedScope: string[];
  completedScopeLabel: string;
  plannedScopeLabel: string;
  headingLevel?: 2 | 3;
  compact?: boolean;
  media?: React.ReactNode;
  className?: string;
}

export function EngineeringEvidenceCard({
  title,
  summary,
  role,
  evidenceLabel,
  status,
  statusLabel,
  contributionBoundary,
  contributionBoundaryLabel,
  technologies,
  completedScope,
  plannedScope,
  completedScopeLabel,
  plannedScopeLabel,
  headingLevel = 3,
  compact = false,
  media,
  className = "",
}: EngineeringEvidenceCardProps) {
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <article
      className={`min-w-0 ${media ? "" : "rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-8"} ${className}`}
    >
      {media}
      <div className={media ? "px-1 pb-2 pt-5" : ""}>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-[var(--muted)]">{evidenceLabel}</span>
        {status === "in-progress" && <span className="text-sm font-medium text-[var(--accent)]">· {statusLabel}</span>}
      </div>

      <Heading className="mt-3 text-[length:var(--text-heading-3)] font-semibold leading-[var(--leading-tight)] text-[var(--foreground)]">
        {title}
      </Heading>
      {role && (
        <p className="mt-2 text-[length:var(--text-small)] text-[var(--muted)]">
          {role}
        </p>
      )}
      <p className="mt-3 text-[length:var(--text-body)] leading-[var(--leading-relaxed)] text-[var(--foreground)]">
        {summary}
      </p>

      <div className={!compact && plannedScope.length > 0 ? "grid gap-x-10 sm:grid-cols-2" : ""}>
      {!compact && completedScope.length > 0 && (
        <div className="mt-5">
          <h4 className="font-mono text-[length:var(--text-small)] font-semibold uppercase tracking-[var(--tracking-label)] text-[var(--muted)]">
            {completedScopeLabel}
          </h4>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-[length:var(--text-small)] leading-[var(--leading-relaxed)] text-[var(--foreground)]">
            {completedScope.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {!compact && plannedScope.length > 0 && (
        <div className="mt-5 border-l-2 border-[var(--accent)] pl-4">
          <h4 className="font-mono text-[length:var(--text-small)] font-semibold uppercase tracking-[var(--tracking-label)] text-[var(--muted)]">
            {plannedScopeLabel}
          </h4>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-[length:var(--text-small)] leading-[var(--leading-relaxed)] text-[var(--foreground)]">
            {plannedScope.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      </div>
      <div className="mt-5 border-t border-[var(--border)] pt-4">
        <p className="sr-only">
          {contributionBoundaryLabel}
        </p>
        <p className="mt-1 text-[length:var(--text-small)] leading-[var(--leading-relaxed)] text-[var(--muted)]">
          {contributionBoundary}
        </p>
      </div>

      {technologies.length > 0 && (
        <p className="mt-4 text-[length:var(--text-small)] text-[var(--muted)]">
          {technologies.join(" · ")}
        </p>
      )}
      </div>
    </article>
  );
}

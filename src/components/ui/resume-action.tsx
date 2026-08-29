import React from "react";
import type { AssetPath } from "@/lib/content/schemas";

export interface ResumeActionProps {
  label: string;
  statusText?: string;
  href?: AssetPath;
  className?: string;
}

export function ResumeAction({
  label,
  statusText,
  href,
  className = "",
}: ResumeActionProps) {
  if (!href) {
    const baseClass =
      "inline-flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2 text-[length:var(--text-small)] text-[var(--muted)] ";
    return (
      <div className={(baseClass + className).trim()}>
        <span className="font-medium text-[var(--foreground)]">{label}</span>
        {statusText ? (
          <span className="text-xs text-[var(--muted)]">({statusText})</span>
        ) : null}
      </div>
    );
  }

  const linkClass =
    "inline-flex items-center justify-center min-h-[44px] px-4 py-2 rounded-[var(--radius-sm)] border border-[var(--accent)] text-[length:var(--text-small)] font-medium text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)] ";
  return (
    <a
      href={href}
      download
      className={(linkClass + className).trim()}
    >
      <span>{label}</span>
      {statusText ? (
        <span className="sr-only"> ({statusText})</span>
      ) : null}
    </a>
  );
}

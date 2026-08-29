import React from "react";
import type { AppLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export type CalloutType = "note" | "warning" | "info" | "tip";

export interface CalloutProps {
  type?: CalloutType;
  title?: string;
  locale?: AppLocale;
  children?: React.ReactNode;
  className?: string;
}

interface CalloutStyle {
  container: string;
  badge: string;
  defaultTitleKey: "calloutNote" | "calloutWarning" | "calloutInfo" | "calloutTip";
}

const calloutStyles: Record<CalloutType, CalloutStyle> = {
  note: {
    container: "border-[var(--border)] bg-[var(--surface)]",
    badge: "border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)]",
    defaultTitleKey: "calloutNote",
  },
  warning: {
    container: "border-[var(--border)] bg-[var(--surface)]",
    badge: "border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)]",
    defaultTitleKey: "calloutWarning",
  },
  info: {
    container: "border-[var(--border)] bg-[var(--surface)]",
    badge: "border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)]",
    defaultTitleKey: "calloutInfo",
  },
  tip: {
    container: "border-[var(--border)] bg-[var(--surface)]",
    badge: "border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)]",
    defaultTitleKey: "calloutTip",
  },
};

export function Callout({
  type = "note",
  title,
  locale = "en",
  children,
  className = "",
}: CalloutProps) {
  const style = calloutStyles[type] || calloutStyles.note;
  const dict = getDictionary(locale);
  const displayTitle = title || dict.blogUI[style.defaultTitleKey];

  return (
    <aside
      role="region"
      aria-label={displayTitle}
      className={`my-6 rounded-[var(--radius-sm)] border p-4 text-[length:var(--text-small)] leading-[var(--leading-relaxed)] ${style.container} ${className}`}
    >
      <div className="mb-2 flex items-center gap-2">
        <span
          className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-semibold uppercase tracking-wider border ${style.badge}`}
        >
          {displayTitle}
        </span>
      </div>
      <div className="text-[var(--foreground)] space-y-2">{children}</div>
    </aside>
  );
}

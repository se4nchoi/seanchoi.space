import React from "react";
import type { HttpsUrl } from "@/lib/content/schemas";
import { Tag } from "./tag";
import { ExternalLink } from "./external-link";

export interface EvidenceCardProps {
  label: string;
  level: "professional" | "project" | "training" | "exposure";
  levelLabel?: string;
  sourceKind:
    | "repository"
    | "demo"
    | "artifact"
    | "public-document"
    | "direct-confirmation";
  sourceKindLabel?: string;
  url?: HttpsUrl;
  className?: string;
}

export function EvidenceCard({
  label,
  level,
  levelLabel,
  sourceKind,
  sourceKindLabel,
  url,
  className = "",
}: EvidenceCardProps) {
  return (
    <div
      className={`rounded-md border border-[var(--border)] bg-[var(--surface)] p-4 transition-colors ${className}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-[length:var(--text-small)] font-medium text-[var(--foreground)]">
          {label}
        </span>
        <div className="flex items-center gap-1.5">
          <Tag variant="muted">{sourceKindLabel ?? sourceKind}</Tag>
          <Tag variant="accent">{levelLabel ?? level}</Tag>
        </div>
      </div>
      {url && (
        <div className="mt-3 text-[length:var(--text-small)]">
          <ExternalLink href={url}>Inspect evidence artifact</ExternalLink>
        </div>
      )}
    </div>
  );
}

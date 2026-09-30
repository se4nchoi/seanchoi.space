import React from "react";
import Link from "next/link";
import { Tag } from "./tag";

export interface ProjectCardProps {
  title: string;
  summary: string;
  status: "planned" | "in-progress" | "completed" | "archived";
  statusLabel?: string;
  role: string;
  tags?: string[];
  href?: string;
  headingLevel?: 2 | 3;
  className?: string;
}

export function ProjectCard({
  title,
  summary,
  status,
  statusLabel,
  role,
  tags = [],
  href,
  headingLevel = 2,
  className = "",
}: ProjectCardProps) {
  const HeadingTag = headingLevel === 3 ? "h3" : "h2";

  return (
    <article
      className={`flex flex-col justify-between rounded-md border border-line bg-surface p-5 transition-colors sm:p-6 ${className}`}
    >
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Tag variant={status === "completed" ? "accent" : "muted"}>
            {statusLabel ?? status}
          </Tag>
          <span className="text-small text-muted font-mono">{role}</span>
        </div>
        <HeadingTag className="mt-3 text-heading-3 font-semibold text-foreground leading-tight">
          {href ? (
            <Link
              href={href}
              className="hover:text-accent transition-colors underline-offset-2 hover:underline"
            >
              {title}
            </Link>
          ) : (
            title
          )}
        </HeadingTag>
        <p className="mt-2 text-body leading-relaxed text-muted">
          {summary}
        </p>
      </div>

      {tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5 pt-2 border-t border-line">
          {tags.map((tag) => (
            <Tag key={tag} variant="default">
              {tag}
            </Tag>
          ))}
        </div>
      )}
    </article>
  );
}

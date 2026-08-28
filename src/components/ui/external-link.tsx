import React from "react";
import { httpsUrlSchema, type HttpsUrl } from "@/lib/content/schemas";

export interface ExternalLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: HttpsUrl;
  children: React.ReactNode;
  newTabLabel?: string;
  className?: string;
}

export function ExternalLink({
  href,
  children,
  newTabLabel = "opens in a new tab",
  className = "",
  ...props
}: ExternalLinkProps) {
  // Enforce runtime HTTPS validation at the component boundary
  const validatedHref = httpsUrlSchema.parse(href);

  return (
    <a
      href={validatedHref}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-0.5 text-[var(--accent)] underline underline-offset-2 hover:opacity-80 ${className}`}
      {...props}
    >
      <span>{children}</span>
      <span aria-hidden="true" className="text-[0.75em] leading-none">
        ↗
      </span>
      <span className="sr-only">({newTabLabel})</span>
    </a>
  );
}

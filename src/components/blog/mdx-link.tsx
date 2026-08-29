import React from "react";
import Link from "next/link";
import { ExternalLink } from "@/components/ui/external-link";
import type { HttpsUrl } from "@/lib/content/schemas";

export interface MdxLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  children?: React.ReactNode;
  newTabLabel?: string;
}

function isValidHttpsUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return (
      parsed.protocol === "https:" &&
      Boolean(parsed.hostname && parsed.hostname.includes("."))
    );
  } catch {
    return false;
  }
}

export function MdxLink({
  href = "",
  children,
  newTabLabel = "opens in a new tab",
  className = "",
  ...props
}: MdxLinkProps) {
  if (!href) {
    return <span>{children}</span>;
  }

  // Anchor jump
  if (href.startsWith("#")) {
    return (
      <a
        href={href}
        className={`text-[var(--accent)] underline underline-offset-2 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)] ${className}`}
        {...props}
      >
        {children}
      </a>
    );
  }

  // Safe internal link (starts with single slash, not protocol-relative // and no traversal)
  if (href.startsWith("/") && !href.startsWith("//") && !href.includes("\\")) {
    return (
      <Link
        href={href}
        className={`text-[var(--accent)] underline underline-offset-2 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)] ${className}`}
        {...props}
      >
        {children}
      </Link>
    );
  }

  // Safe external HTTPS link with full URL parsing
  if (href.startsWith("https://") && isValidHttpsUrl(href)) {
    return (
      <ExternalLink
        href={href as HttpsUrl}
        newTabLabel={newTabLabel}
        className={className}
        {...props}
      >
        {children}
      </ExternalLink>
    );
  }

  // Unsafe or invalid scheme (http:, javascript:, data:, file:, protocol-relative //, etc.)
  // -> render as inert text to prevent XSS/vulnerabilities
  return (
    <span
      className={`underline decoration-dotted text-[var(--muted)] ${className}`}
      title="Unsafe or unsupported link scheme"
    >
      {children}
    </span>
  );
}

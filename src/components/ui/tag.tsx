import React from "react";

export interface TagProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "muted";
  className?: string;
}

export function Tag({
  children,
  variant = "default",
  className = "",
}: TagProps) {
  const variantStyles = {
    default: "bg-[var(--surface)] text-[var(--foreground)] border-[var(--border)]",
    accent: "bg-[var(--surface)] text-[var(--accent)] border-[var(--accent)]",
    muted: "bg-[var(--surface)] text-[var(--muted)] border-[var(--border)]",
  }[variant];

  return (
    <span
      className={`inline-flex items-center rounded-[var(--radius-sm)] px-2 py-0.5 text-[length:var(--text-small)] font-mono border-[length:var(--border-width)] ${variantStyles} ${className}`}
    >
      {children}
    </span>
  );
}

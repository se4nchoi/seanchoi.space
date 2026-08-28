import React from "react";

export interface FigureProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  caption?: string;
  className?: string;
}

export function Figure({
  children,
  caption,
  className = "",
  ...props
}: FigureProps) {
  return (
    <figure className={`my-6 sm:my-8 ${className}`} {...props}>
      <div className="overflow-hidden rounded-md border border-[var(--border)] bg-[var(--surface)]">
        {children}
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-xs text-[var(--muted)]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

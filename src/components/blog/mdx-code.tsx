import React from "react";

export function MdxPre({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLPreElement>) {
  return (
    <pre
      tabIndex={0}
      className={`overflow-x-auto rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-4 font-mono text-[length:var(--text-code)] leading-normal ${className}`}
      {...props}
    >
      {children}
    </pre>
  );
}

export function MdxCode({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <code
      className={`rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface)] px-1.5 py-0.5 font-mono text-[length:var(--text-code)] ${className}`}
      {...props}
    >
      {children}
    </code>
  );
}

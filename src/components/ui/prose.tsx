import React from "react";

export interface ProseProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function Prose({ children, className = "", ...props }: ProseProps) {
  return (
    <div className={`prose-content mx-auto w-full ${className}`} {...props}>
      {children}
    </div>
  );
}

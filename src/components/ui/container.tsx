import React from "react";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "prose" | "full";
}

export function Container({
  children,
  className = "",
  size = "default",
  ...props
}: ContainerProps) {
  const sizeClasses = {
    default: "max-w-[72rem]",
    prose: "max-w-[68ch]",
    full: "max-w-full",
  }[size];

  return (
    <div
      className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${sizeClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

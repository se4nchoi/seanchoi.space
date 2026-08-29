import React from "react";
import Image from "next/image";

export interface FigureMdxProps {
  src: string;
  width: number;
  height: number;
  alt?: string;
  decorative?: boolean;
  caption?: string;
  className?: string;
}

export function FigureMdx({
  src,
  width,
  height,
  alt = "",
  decorative = false,
  caption,
  className = "",
}: FigureMdxProps) {
  if (!src || !src.startsWith("/")) {
    throw new Error(`Figure src '${src}' must be a local absolute path starting with '/'.`);
  }
  if (typeof width !== "number" || width <= 0 || !Number.isInteger(width)) {
    throw new Error(`Figure width must be a positive integer.`);
  }
  if (typeof height !== "number" || height <= 0 || !Number.isInteger(height)) {
    throw new Error(`Figure height must be a positive integer.`);
  }
  if (!decorative && (!alt || alt.trim().length === 0)) {
    throw new Error(`Figure requires either non-empty alt text or decorative={true}.`);
  }

  const finalAlt = decorative ? "" : alt;

  return (
    <figure className="my-6 sm:my-8">
      <div className="overflow-hidden rounded-md border border-[var(--border)] bg-[var(--surface)]">
        <Image
          src={src}
          alt={finalAlt}
          width={width}
          height={height}
          className={`h-auto w-full object-cover ${className}`}
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-[length:var(--text-small)] text-[var(--muted)]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

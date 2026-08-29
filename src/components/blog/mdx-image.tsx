import React from "react";
import Image from "next/image";

export interface MdxImageProps {
  src?: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  caption?: string;
  className?: string;
}

export function MdxImage({
  src,
  alt = "",
  width,
  height,
  caption,
  className = "",
}: MdxImageProps) {
  if (!src) return null;

  // Enforce local asset constraint: remote images and relative paths are prohibited
  if (!src.startsWith("/")) {
    throw new Error(
      `Invalid image src '${src}': only declared local assets starting with '/' under public/ are permitted.`
    );
  }

  const numWidth = width ? Number(width) : 800;
  const numHeight = height ? Number(height) : 450;

  return (
    <figure className="my-6 sm:my-8">
      <div className="overflow-hidden rounded-md border border-[var(--border)] bg-[var(--surface)]">
        <Image
          src={src}
          alt={alt}
          width={numWidth}
          height={numHeight}
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

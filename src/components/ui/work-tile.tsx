import React from "react";
import Image from "next/image";
import Link from "next/link";

export interface WorkTileImage {
  src: string;
  width: number;
  height: number;
  /** "cover" fills the frame (photos, full screenshots); "contain" keeps wide strips whole. */
  fit: "cover" | "contain";
}

export interface WorkTileProps {
  href: string;
  title: string;
  label: string;
  detail: string;
  image?: WorkTileImage;
  /** Lines shown in the frame when there is no image yet, e.g. the stack. */
  placeholder: string[];
  badge?: string;
  headingLevel?: 2 | 3;
}

/**
 * Homepage grid tile: thumbnail, context label, title, and one detail line.
 * The heading link stretches over the whole tile, so there is one tab stop per tile.
 */
export function WorkTile({ href, title, label, detail, image, placeholder, badge, headingLevel = 3 }: WorkTileProps) {
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface transition-colors hover:border-muted focus-within:ring-2 focus-within:ring-accent">
      <div
        className={`aspect-[16/10] overflow-hidden sm:aspect-[4/3] border-b border-line ${
          image?.fit === "contain" ? "flex items-center justify-center bg-[#eceeed] p-4" : "bg-[#0f1214]"
        }`}
      >
        {image ? (
          <Image
            src={image.src}
            alt=""
            width={image.width}
            height={image.height}
            sizes="(max-width: 639px) calc(100vw - 32px), (max-width: 1023px) 45vw, 360px"
            className={
              image.fit === "contain"
                ? "h-auto max-h-full w-full object-contain"
                : "h-full w-full object-cover object-left-top transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            }
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-background p-6">
            <ul className="space-y-1 text-center font-mono text-small text-muted">
              {placeholder.map((line) => <li key={line}>{line}</li>)}
            </ul>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-5">
        <p className="flex flex-wrap items-center gap-2 text-sm text-muted">
          {label}
          {badge && <span className="rounded border border-accent px-1.5 py-0.5 text-xs text-accent">{badge}</span>}
        </p>
        <Heading className="text-heading-3 font-semibold leading-tight text-foreground">
          <Link
            href={href}
            className="after:absolute after:inset-0 after:content-[''] group-hover:underline"
          >
            {title}
          </Link>
        </Heading>
        <p className="text-small text-muted">{detail}</p>
      </div>
    </article>
  );
}

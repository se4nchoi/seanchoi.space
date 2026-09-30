import React from "react";
import Image from "next/image";
import type { AppLocale } from "@/i18n/config";
import type { WorkMedia } from "@/data/work-media";

export function WorkImage({
  media,
  locale,
  portrait = false,
}: {
  media: WorkMedia;
  locale: AppLocale;
  portrait?: boolean;
}) {
  return (
    <figure>
      <div className={portrait
        ? "overflow-hidden rounded-2xl bg-surface"
        : "flex aspect-[16/10] items-center justify-center overflow-hidden rounded-xl border border-line bg-[#eceeed] p-3 sm:p-5"}>
        <Image
          src={media.src}
          alt={media.alt[locale]}
          width={media.width}
          height={media.height}
          sizes={portrait
            ? "(max-width: 767px) calc(100vw - 48px), (max-width: 1199px) 36vw, 400px"
            : "(max-width: 767px) calc(100vw - 64px), (max-width: 1199px) 45vw, 510px"}
          loading={portrait ? "eager" : "lazy"}
          className={portrait
            ? "h-auto max-h-[26rem] w-full object-cover"
            : "h-auto max-h-full w-full object-contain"}
        />
      </div>
      <figcaption className="mt-3 text-xs leading-relaxed text-muted">
        {media.caption[locale]}
      </figcaption>
    </figure>
  );
}

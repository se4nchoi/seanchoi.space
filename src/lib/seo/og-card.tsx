import { ImageResponse } from "next/og";
import { getDictionary } from "@/i18n/dictionaries";
import { OG_CARD, SITE_NAME } from "@/lib/seo/metadata";

/**
 * Shared social card, served at OG_CARD.path. English only: the built-in OG
 * font has no Hangul glyphs, and the card shows the same identity in both
 * locales.
 */
const dict = getDictionary("en");

export function renderOgCard(): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "88px 96px",
          background: "#fdfdfd",
          color: "#171717",
          borderTop: "16px solid #0b63b6",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: "-0.02em" }}>
            {dict.homeTitle}
          </div>
          <div style={{ fontSize: 40, lineHeight: 1.3, color: "#525252", maxWidth: 960 }}>
            {dict.careerUI.homeHeadline}
          </div>
        </div>
        <div style={{ fontSize: 32, color: "#0b63b6" }}>{SITE_NAME}</div>
      </div>
    ),
    { width: OG_CARD.width, height: OG_CARD.height },
  );
}

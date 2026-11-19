import { renderOgCard } from "@/lib/seo/og-card";

// Stable URL for the shared social card. A route handler is used instead of
// the opengraph-image file convention because page-level `openGraph` metadata
// replaces images inherited from a layout; see createSocialMetadata.
export const dynamic = "force-static";

export function GET() {
  return renderOgCard();
}

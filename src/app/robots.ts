import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/metadata";
import { isPreviewChannel } from "@/lib/release-channel";

// Production is indexable; preview deployments (dev.seanchoi.space) never are.
export default function robots(): MetadataRoute.Robots {
  if (isPreviewChannel()) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${SITE_URL}/sitemap.xml` };
}

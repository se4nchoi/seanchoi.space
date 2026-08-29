import { NextResponse } from "next/server";
import { loadAllMdxArticles } from "@/lib/content/blog";
import { generateAtomFeed } from "@/lib/content/feed";

export const dynamic = "force-static";

export async function GET() {
  const articles = loadAllMdxArticles().map((a) => a.record);
  const feedXml = generateAtomFeed(articles);

  return new NextResponse(feedXml, {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}

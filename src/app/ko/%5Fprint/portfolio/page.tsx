import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortfolioPrintViewKo } from "@/components/pages/portfolio-print-view-ko";
import { isSkeletonPreviewEnabled } from "@/lib/skeleton-preview";

// Development/preview-only source for the Korean portfolio PDF (public/portfolio.pdf).
// Production builds return 404; the printed PDF is what gets published.
export const metadata: Metadata = {
  title: "포트폴리오 (인쇄용)",
  robots: { index: false, follow: false },
};

export default function KoreanPortfolioPrintPage() {
  if (!isSkeletonPreviewEnabled()) {
    notFound();
  }
  return <PortfolioPrintViewKo generatedOn={new Date().toISOString().slice(0, 10)} />;
}

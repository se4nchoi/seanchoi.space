import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortfolioPrintView } from "@/components/pages/portfolio-print-view";
import { isSkeletonPreviewEnabled } from "@/lib/skeleton-preview";

// Development/preview-only source for the private portfolio PDF.
// Production builds return 404, so no public résumé route exists.
export const metadata: Metadata = {
  title: "Portfolio (print)",
  robots: { index: false, follow: false },
};

export default function PortfolioPrintPage() {
  if (!isSkeletonPreviewEnabled()) {
    notFound();
  }
  return <PortfolioPrintView generatedOn={new Date().toISOString().slice(0, 10)} />;
}

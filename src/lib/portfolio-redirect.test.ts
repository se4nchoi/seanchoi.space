import { describe, it, expect } from "vitest";
import nextConfig from "../../next.config";

describe("portfolio PDF redirect", () => {
  it("sends the stable QR target to the PDF with a temporary redirect", async () => {
    const redirects = (await nextConfig.redirects?.()) ?? [];
    for (const source of ["/portfolio", "/ko/portfolio"]) {
      expect(redirects).toContainEqual({ source, destination: "/portfolio.pdf", permanent: false });
    }
  });
});

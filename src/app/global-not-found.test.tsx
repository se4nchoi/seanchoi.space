import { describe, it, expect } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import GlobalNotFound, { metadata } from "./global-not-found";
import { dictionaries } from "@/i18n/dictionaries";

describe("Global Bilingual Not-Found Boundary", () => {
  it("renders a full English document with one main landmark, one h1, a Korean lang=ko region, combined home link, and no shell chrome", () => {
    const html = renderToStaticMarkup(<GlobalNotFound />);

    // 1. Full English document
    expect(html).toContain('<html lang="en">');
    expect(html).toContain("<body>");
    expect(html).toContain("</body>");
    expect(html).toContain("</html>");

    // 2. Metadata title
    expect(metadata.title).toBe("Page not found — seanchoi.space");

    // 3. Skip link
    expect(html).toContain('href="#main-content"');
    expect(html).toContain('class="skip-link"');
    expect(html).toContain(dictionaries.en.skipToContent);

    // 4. Exactly one main landmark and one h1
    const mainMatches = html.match(/<main\b[^>]*id="main-content"[^>]*>/g);
    expect(mainMatches).toHaveLength(1);
    const allMainMatches = html.match(/<main\b/g);
    expect(allMainMatches).toHaveLength(1);

    const h1Matches = html.match(/<h1\b/g);
    expect(h1Matches).toHaveLength(1);
    expect(html).toContain(dictionaries.en.notFoundTitle);
    expect(html).toContain(dictionaries.en.notFoundBody);

    // 5. Korean section with lang="ko" and h2
    expect(html).toContain('lang="ko"');
    const h2Matches = html.match(/<h2\b/g);
    expect(h2Matches).toHaveLength(1);
    expect(html).toContain(dictionaries.ko.notFoundTitle);
    expect(html).toContain(dictionaries.ko.notFoundBody);

    // 6. Combined home link to /
    expect(html).toContain('href="/"');
    expect(html).toContain("Return home / 홈으로 돌아가기");

    // 7. No header, nav, or footer shell chrome
    expect(html).not.toContain("<header");
    expect(html).not.toContain("<nav");
    expect(html).not.toContain("<footer");
  });
});

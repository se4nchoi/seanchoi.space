import { describe, it, expect } from "vitest";
import {
  normalizePathname,
  getLocaleFromPathname,
  getAlternatePath,
  ROUTE_PAIRS,
} from "./routing";

describe("i18n Routing Infrastructure", () => {
  describe("normalizePathname", () => {
    it("handles empty or root path", () => {
      expect(normalizePathname("")).toBe("/");
      expect(normalizePathname("/")).toBe("/");
    });

    it("strips query parameters and URL fragments", () => {
      expect(normalizePathname("/experience?sort=asc")).toBe("/experience");
      expect(normalizePathname("/ko/projects#section-1")).toBe("/ko/projects");
      expect(normalizePathname("/blog?q=test#heading")).toBe("/blog");
    });

    it("strips trailing slashes from subpaths", () => {
      expect(normalizePathname("/experience/")).toBe("/experience");
      expect(normalizePathname("/ko/blog/")).toBe("/ko/blog");
    });
  });

  describe("getLocaleFromPathname", () => {
    it("detects Korean locale for /ko and /ko/* subpaths", () => {
      expect(getLocaleFromPathname("/ko")).toBe("ko");
      expect(getLocaleFromPathname("/ko/experience")).toBe("ko");
      expect(getLocaleFromPathname("/ko/projects/my-project")).toBe("ko");
    });

    it("detects English locale for unprefixed routes", () => {
      expect(getLocaleFromPathname("/")).toBe("en");
      expect(getLocaleFromPathname("/experience")).toBe("en");
      expect(getLocaleFromPathname("/projects")).toBe("en");
      expect(getLocaleFromPathname("/blog")).toBe("en");
    });
  });

  describe("getAlternatePath (Route Pairs & Fallbacks)", () => {
    it("correctly maps all exact route pairs bidirectionally", () => {
      for (const pair of ROUTE_PAIRS) {
        expect(getAlternatePath(pair.en, "ko")).toBe(pair.ko);
        expect(getAlternatePath(pair.ko, "en")).toBe(pair.en);
      }
    });

    it("falls back to Blog index for unmapped blog detail routes", () => {
      expect(getAlternatePath("/blog/some-article-slug", "ko")).toBe("/ko/blog");
      expect(getAlternatePath("/ko/blog/some-korean-article", "en")).toBe("/blog");
    });

    it("falls back to Home for unmapped project detail routes and arbitrary unmapped routes", () => {
      expect(getAlternatePath("/projects/some-project-slug", "ko")).toBe("/ko");
      expect(getAlternatePath("/ko/projects/some-korean-project", "en")).toBe("/");
      expect(getAlternatePath("/non-existent-page", "ko")).toBe("/ko");
      expect(getAlternatePath("/ko/unknown-page", "en")).toBe("/");
    });

    it("returns the same path if targetLocale matches currentLocale", () => {
      expect(getAlternatePath("/experience", "en")).toBe("/experience");
      expect(getAlternatePath("/ko/experience", "ko")).toBe("/ko/experience");
    });
  });
});

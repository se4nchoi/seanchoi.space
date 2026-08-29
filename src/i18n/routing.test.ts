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
      expect(normalizePathname("/projects/example-project?preview=true#details")).toBe(
        "/projects/example-project",
      );
    });

    it("strips trailing slashes from subpaths", () => {
      expect(normalizePathname("/experience/")).toBe("/experience");
      expect(normalizePathname("/ko/blog/")).toBe("/ko/blog");
      expect(normalizePathname("/projects/example-project/")).toBe(
        "/projects/example-project",
      );
    });
  });

  describe("getLocaleFromPathname", () => {
    it("detects Korean locale for /ko and /ko/* subpaths", () => {
      expect(getLocaleFromPathname("/ko")).toBe("ko");
      expect(getLocaleFromPathname("/ko/experience")).toBe("ko");
      expect(getLocaleFromPathname("/ko/projects/example-project")).toBe("ko");
      expect(getLocaleFromPathname("/ko/blog/example-article")).toBe("ko");
    });

    it("detects English locale for unprefixed routes", () => {
      expect(getLocaleFromPathname("/")).toBe("en");
      expect(getLocaleFromPathname("/experience")).toBe("en");
      expect(getLocaleFromPathname("/projects")).toBe("en");
      expect(getLocaleFromPathname("/projects/example-project")).toBe("en");
      expect(getLocaleFromPathname("/blog")).toBe("en");
      expect(getLocaleFromPathname("/blog/example-article")).toBe("en");
    });
  });

  describe("getAlternatePath (Route Pairs & Fallbacks)", () => {
    it("correctly maps all exact route pairs bidirectionally, including project and article details", () => {
      for (const pair of ROUTE_PAIRS) {
        expect(getAlternatePath(pair.en, "ko")).toBe(pair.ko);
        expect(getAlternatePath(pair.ko, "en")).toBe(pair.en);
      }
      expect(getAlternatePath("/projects/example-project", "ko")).toBe(
        "/ko/projects/example-project",
      );
      expect(getAlternatePath("/ko/projects/example-project", "en")).toBe(
        "/projects/example-project",
      );
      expect(getAlternatePath("/blog/example-article", "ko")).toBe(
        "/ko/blog/example-article",
      );
      expect(getAlternatePath("/ko/blog/example-article", "en")).toBe(
        "/blog/example-article",
      );
    });

    it("falls back to Projects index for unmapped project detail routes", () => {
      expect(getAlternatePath("/projects/some-unknown-project", "ko")).toBe(
        "/ko/projects",
      );
      expect(getAlternatePath("/ko/projects/some-unknown-korean-project", "en")).toBe(
        "/projects",
      );
    });

    it("falls back to Blog index for unmapped blog detail routes", () => {
      expect(getAlternatePath("/blog/some-article-slug", "ko")).toBe("/ko/blog");
      expect(getAlternatePath("/ko/blog/some-korean-article", "en")).toBe("/blog");
    });

    it("falls back to Home for arbitrary unmapped routes", () => {
      expect(getAlternatePath("/non-existent-page", "ko")).toBe("/ko");
      expect(getAlternatePath("/ko/unknown-page", "en")).toBe("/");
    });

    it("returns the same path if targetLocale matches currentLocale", () => {
      expect(getAlternatePath("/experience", "en")).toBe("/experience");
      expect(getAlternatePath("/ko/experience", "ko")).toBe("/ko/experience");
      expect(getAlternatePath("/projects/example-project", "en")).toBe(
        "/projects/example-project",
      );
    });
  });
});

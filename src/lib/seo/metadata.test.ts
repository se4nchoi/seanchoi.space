import { describe, it, expect } from "vitest";
import { createPageMetadata, SITE_URL } from "./metadata";

describe("SEO Metadata Helpers", () => {
  it("enforces constant SITE_URL and scoped alternates without OpenGraph/Twitter/Robots expansion", () => {
    expect(SITE_URL).toBe("https://seanchoi.space");

    const meta = createPageMetadata({
      locale: "en",
      pathname: "/",
      title: "Portfolio preview",
      description: "English preview description",
      feedDiscovery: true,
    });

    expect(meta.title).toBe("Portfolio preview");
    expect(meta.description).toBe("English preview description");
    expect(meta.alternates?.canonical).toBe(SITE_URL);
    expect(meta.alternates?.languages?.en).toBe(SITE_URL);
    expect(meta.alternates?.languages?.ko).toBe(`${SITE_URL}/ko`);
    expect(meta.alternates?.languages?.["x-default"]).toBe(SITE_URL);

    // Atom discovery
    expect(meta.alternates?.types?.["application/atom+xml"]).toEqual([
      {
        url: `${SITE_URL}/feed.xml`,
        title: "seanchoi.space — Blog Atom Feed",
      },
    ]);

    // Scoped metadata: no newly added global openGraph, twitter, or robots index
    expect(meta.openGraph).toBeUndefined();
    expect(meta.twitter).toBeUndefined();
    expect(meta.robots).toBeUndefined();
  });

  it("generates correct metadata and alternates for Korean Home", () => {
    const meta = createPageMetadata({
      locale: "ko",
      pathname: "/ko",
      title: "포트폴리오 미리보기",
      description: "한국어 미리보기 설명",
    });

    expect(meta.title).toBe("포트폴리오 미리보기");
    expect(meta.alternates?.canonical).toBe(`${SITE_URL}/ko`);
    expect(meta.alternates?.languages?.en).toBe(SITE_URL);
    expect(meta.alternates?.languages?.ko).toBe(`${SITE_URL}/ko`);
    expect(meta.alternates?.languages?.["x-default"]).toBe(SITE_URL);
  });

  it("generates reciprocal alternates for Projects in both locales", () => {
    const enMeta = createPageMetadata({
      locale: "en",
      pathname: "/projects",
      title: "Projects",
      description: "Projects description",
    });

    const koMeta = createPageMetadata({
      locale: "ko",
      pathname: "/ko/projects",
      title: "프로젝트",
      description: "프로젝트 설명",
    });

    expect(enMeta.alternates?.canonical).toBe(`${SITE_URL}/projects`);
    expect(enMeta.alternates?.languages?.ko).toBe(`${SITE_URL}/ko/projects`);

    expect(koMeta.alternates?.canonical).toBe(`${SITE_URL}/ko/projects`);
    expect(koMeta.alternates?.languages?.en).toBe(`${SITE_URL}/projects`);
  });

  it("generates exact alternates for translated articles when counterpart exists", () => {
    const articleEnMeta = createPageMetadata({
      locale: "en",
      pathname: "/blog/example-article",
      title: "Example Article",
      description: "Article description",
      alternatePaths: {
        en: "/blog/example-article",
        ko: "/ko/blog/example-article",
        "x-default": "/blog/example-article",
      },
    });

    expect(articleEnMeta.alternates?.canonical).toBe(`${SITE_URL}/blog/example-article`);
    expect(articleEnMeta.alternates?.languages?.en).toBe(`${SITE_URL}/blog/example-article`);
    expect(articleEnMeta.alternates?.languages?.ko).toBe(`${SITE_URL}/ko/blog/example-article`);
    expect(articleEnMeta.alternates?.languages?.["x-default"]).toBe(`${SITE_URL}/blog/example-article`);
  });

  it("omits missing alternate language for single-language article and never advertises blog index", () => {
    const singleLangMeta = createPageMetadata({
      locale: "en",
      pathname: "/blog/single-lang-post",
      title: "Single Language Post",
      description: "Only in English",
      alternatePaths: {
        en: "/blog/single-lang-post",
        "x-default": "/blog/single-lang-post",
      },
    });

    expect(singleLangMeta.alternates?.canonical).toBe(`${SITE_URL}/blog/single-lang-post`);
    expect(singleLangMeta.alternates?.languages?.en).toBe(`${SITE_URL}/blog/single-lang-post`);
    // Crucial: ko is NOT emitted and NOT pointed at /ko/blog
    expect(singleLangMeta.alternates?.languages?.ko).toBeUndefined();
    expect(singleLangMeta.alternates?.languages?.["x-default"]).toBe(`${SITE_URL}/blog/single-lang-post`);
  });
});

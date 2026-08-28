import { describe, it, expect } from "vitest";
import { createPageMetadata, SITE_URL } from "./metadata";

describe("SEO Metadata Helpers", () => {
  it("generates correct metadata and alternates for English Home", () => {
    const meta = createPageMetadata({
      locale: "en",
      pathname: "/",
      title: "Portfolio preview",
      description: "English preview description",
    });

    expect(meta.title).toBe("Portfolio preview");
    expect(meta.description).toBe("English preview description");
    expect(meta.alternates?.canonical).toBe(SITE_URL);
    expect(meta.alternates?.languages?.en).toBe(SITE_URL);
    expect(meta.alternates?.languages?.ko).toBe(`${SITE_URL}/ko`);
    expect(meta.alternates?.languages?.["x-default"]).toBe(SITE_URL);
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
});

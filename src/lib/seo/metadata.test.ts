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

  it("generates reciprocal alternates for project and article detail routes in both locales", () => {
    const projectEnMeta = createPageMetadata({
      locale: "en",
      pathname: "/projects/example-project",
      title: "Example Project",
      description: "Project description",
    });
    const projectKoMeta = createPageMetadata({
      locale: "ko",
      pathname: "/ko/projects/example-project",
      title: "예시 프로젝트",
      description: "프로젝트 설명",
    });

    expect(projectEnMeta.alternates?.canonical).toBe(`${SITE_URL}/projects/example-project`);
    expect(projectEnMeta.alternates?.languages?.ko).toBe(`${SITE_URL}/ko/projects/example-project`);
    expect(projectKoMeta.alternates?.canonical).toBe(`${SITE_URL}/ko/projects/example-project`);
    expect(projectKoMeta.alternates?.languages?.en).toBe(`${SITE_URL}/projects/example-project`);

    const articleEnMeta = createPageMetadata({
      locale: "en",
      pathname: "/blog/example-article",
      title: "Example Article",
      description: "Article description",
    });
    const articleKoMeta = createPageMetadata({
      locale: "ko",
      pathname: "/ko/blog/example-article",
      title: "예시 글",
      description: "글 설명",
    });

    expect(articleEnMeta.alternates?.canonical).toBe(`${SITE_URL}/blog/example-article`);
    expect(articleEnMeta.alternates?.languages?.ko).toBe(`${SITE_URL}/ko/blog/example-article`);
    expect(articleKoMeta.alternates?.canonical).toBe(`${SITE_URL}/ko/blog/example-article`);
    expect(articleKoMeta.alternates?.languages?.en).toBe(`${SITE_URL}/blog/example-article`);
  });
});

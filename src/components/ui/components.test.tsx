import { describe, it, expect } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { PageIntro } from "./page-intro";
import { Tag } from "./tag";
import { ExternalLink } from "./external-link";
import { EvidenceCard } from "./evidence-card";
import { ExperienceEntry } from "./experience-entry";
import { ProjectCard } from "./project-card";
import { ArticleCard } from "./article-card";
import { Figure } from "./figure";
import { Prose } from "./prose";
import { LanguageSwitch } from "../shell/language-switch";

describe("Presentation UI Components (Server Rendering & Contract)", () => {
  it("renders PageIntro with eyebrow, title, summary, and adopted type tokens without sm:text-lg override", () => {
    const html = renderToStaticMarkup(
      <PageIntro eyebrow="Eyebrow" title="Main Title" summary="Summary text" />
    );
    expect(html).toContain("Eyebrow");
    expect(html).toContain("<h1");
    expect(html).toContain("Main Title");
    expect(html).toContain("Summary text");
    expect(html).toContain("var(--text-heading-1)");
    expect(html).toContain("var(--text-body)");
    expect(html).not.toContain("sm:text-lg");
  });

  it("renders Tag with expected classes and content", () => {
    const html = renderToStaticMarkup(<Tag variant="accent">TypeScript</Tag>);
    expect(html).toContain("TypeScript");
    expect(html).toContain("font-mono");
    expect(html).toContain("var(--text-small)");
  });

  describe("ExternalLink HTTPS Enforcement", () => {
    it("renders valid HTTPS links with target=_blank, rel=noopener noreferrer, and accessible sr-only label", () => {
      const html = renderToStaticMarkup(
        <ExternalLink href="https://example.com/repo" newTabLabel="opens in a new tab">
          Example Source
        </ExternalLink>
      );
      expect(html).toContain('href="https://example.com/repo"');
      expect(html).toContain('target="_blank"');
      expect(html).toContain('rel="noopener noreferrer"');
      expect(html).toContain("↗");
      expect(html).toContain('<span class="sr-only">(opens in a new tab)</span>');
    });

    it("rejects non-HTTPS and malformed URLs at component boundary", () => {
      // Insecure HTTP
      expect(() =>
        renderToStaticMarkup(
          <ExternalLink href={"http://insecure.com" as unknown as never}>Insecure</ExternalLink>
        )
      ).toThrow();

      // Javascript protocol
      expect(() =>
        renderToStaticMarkup(
          <ExternalLink href={"javascript:alert(1)" as unknown as never}>JS</ExternalLink>
        )
      ).toThrow();

      // Relative path
      expect(() =>
        renderToStaticMarkup(
          <ExternalLink href={"/relative/path" as unknown as never}>Relative</ExternalLink>
        )
      ).toThrow();

      // Malformed bare https://
      expect(() =>
        renderToStaticMarkup(
          <ExternalLink href={"https://" as unknown as never}>Bare</ExternalLink>
        )
      ).toThrow();
    });
  });

  it("renders EvidenceCard with label, tags, optional inspect link, and type tokens", () => {
    const html = renderToStaticMarkup(
      <EvidenceCard
        label="Artifact Verification"
        level="project"
        sourceKind="repository"
        url="https://example.com/artifact"
      />
    );
    expect(html).toContain("Artifact Verification");
    expect(html).toContain("repository");
    expect(html).toContain("project");
    expect(html).toContain("Inspect evidence artifact");
    expect(html).toContain("var(--text-small)");
  });

  describe("Heading Level Polymorphism & Type Tokens in Cards/Entries", () => {
    it("renders ExperienceEntry with h2 by default, h3 when requested, and typography tokens", () => {
      const defaultHtml = renderToStaticMarkup(
        <ExperienceEntry
          organization="Example Corp"
          role="Systems Engineer"
          dateLabel="2024-01 — 2025-01"
          summary="Experience summary"
          contributions={["Contribution A"]}
        />
      );
      expect(defaultHtml).toContain("<h2");
      expect(defaultHtml).toContain("Systems Engineer");
      expect(defaultHtml).toContain("var(--text-heading-3)");
      expect(defaultHtml).toContain("var(--text-small)");
      expect(defaultHtml).toContain("var(--text-body)");

      const h3Html = renderToStaticMarkup(
        <ExperienceEntry
          organization="Example Corp"
          role="Systems Engineer"
          dateLabel="2024-01 — 2025-01"
          summary="Experience summary"
          headingLevel={3}
        />
      );
      expect(h3Html).toContain("<h3");
      expect(h3Html).toContain("Systems Engineer");
    });

    it("renders ProjectCard with h2 by default, h3 when requested, and typography tokens", () => {
      const defaultHtml = renderToStaticMarkup(
        <ProjectCard
          title="Example Project"
          summary="Project summary"
          status="completed"
          role="Lead"
        />
      );
      expect(defaultHtml).toContain("<h2");
      expect(defaultHtml).toContain("var(--text-heading-3)");
      expect(defaultHtml).toContain("var(--text-small)");
      expect(defaultHtml).toContain("var(--text-body)");

      const h3Html = renderToStaticMarkup(
        <ProjectCard
          title="Example Project"
          summary="Project summary"
          status="completed"
          role="Lead"
          headingLevel={3}
        />
      );
      expect(h3Html).toContain("<h3");
    });

    it("renders ArticleCard with h2 by default, h3 when requested, and typography tokens", () => {
      const defaultHtml = renderToStaticMarkup(
        <ArticleCard
          title="Example Article"
          summary="Article summary"
          date="2026-08-28"
          href="/blog/example"
        />
      );
      expect(defaultHtml).toContain("<h2");
      expect(defaultHtml).toContain("var(--text-heading-3)");
      expect(defaultHtml).toContain("var(--text-small)");
      expect(defaultHtml).toContain("var(--text-body)");

      const h3Html = renderToStaticMarkup(
        <ArticleCard
          title="Example Article"
          summary="Article summary"
          date="2026-08-28"
          href="/blog/example"
          headingLevel={3}
        />
      );
      expect(h3Html).toContain("<h3");
    });
  });

  describe("Accessibility & Target Size Contracts", () => {
    it("renders LanguageSwitch with localized aria-label for both locales", () => {
      const enHtml = renderToStaticMarkup(<LanguageSwitch currentLocale="en" />);
      expect(enHtml).toContain('aria-label="Language"');

      const koHtml = renderToStaticMarkup(<LanguageSwitch currentLocale="ko" />);
      expect(koHtml).toContain('aria-label="언어"');
    });

    it("renders LanguageSwitch with 44px min-height target classes", () => {
      const html = renderToStaticMarkup(<LanguageSwitch currentLocale="en" />);
      expect(html).toContain("min-h-[44px]");
    });
  });

  it("renders Figure with caption and container", () => {
    const html = renderToStaticMarkup(
      <Figure caption="Figure 1: Example Caption">
        <div>Media Content</div>
      </Figure>
    );
    expect(html).toContain("<figure");
    expect(html).toContain("<figcaption");
    expect(html).toContain("Figure 1: Example Caption");
    expect(html).toContain("Media Content");
  });

  it("renders Prose wrapper with prose-content class", () => {
    const html = renderToStaticMarkup(
      <Prose>
        <p>Prose paragraph</p>
      </Prose>
    );
    expect(html).toContain("prose-content");
    expect(html).toContain("Prose paragraph");
  });
});

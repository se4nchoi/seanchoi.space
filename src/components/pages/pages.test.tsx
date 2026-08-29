import { describe, it, expect } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { HomePageView } from "./home-page-view";
import { ExperiencePageView } from "./experience-page-view";
import { ProjectsIndexView } from "./projects-index-view";
import { ProjectDetailView } from "./project-detail-view";
import { BlogIndexView } from "./blog-index-view";
import { BlogArticleView } from "./blog-article-view";
import { StatusPageView } from "./status-page-view";
import { dictionaries } from "@/i18n/dictionaries";

describe("Page Components Server Rendering & Semantic Structure", () => {
  describe("HomePageView", () => {
    it("renders English Home hierarchy, single h1, notice, project link, non-interactive resume, and strictly ordered sections", () => {
      const html = renderToStaticMarkup(<HomePageView locale="en" />);

      // Single h1
      const h1Matches = html.match(/<h1/g) || [];
      expect(h1Matches.length).toBe(1);
      expect(html).toContain("Example Person");
      expect(html).toContain("Synthetic preview");

      // Notice
      expect(html).toContain(
        "All Example-labeled content is synthetic, non-publishable, and shown only to review the portfolio structure."
      );

      // Project link & Resume placement
      expect(html).toContain('href="/projects/example-project"');
      expect(html).toContain("View Example Project");
      expect(html).toContain("Résumé PDF");
      expect(html).toContain("Pending verified content; no file is available.");
      expect(html).not.toContain('href="/assets/resume.pdf"');

      // Compact fact strip with reviewed routes & preview only
      expect(html).toContain("Example Organization · full-time");
      expect(html).toContain("Example verification artifact (project evidence)");
      expect(html).toContain("Reviewed routes");
      expect(html).toContain("Preview only");
      expect(html).toContain('aria-label="Synthetic overview"');

      // Selected Evidence section
      expect(html).toContain("Selected example evidence");

      // Experience snapshot with separate training
      expect(html).toContain("Example experience snapshot");
      expect(html).toContain("Example Systems Lab");
      expect(html).toContain('href="/experience"');

      // Capability with evidence
      expect(html).toContain("Example capability with evidence");
      expect(html).toContain("Example interface validation");

      // Example writing
      expect(html).toContain("Example writing");
      expect(html).toContain('href="/blog"');

      // Contact unavailable with aria-label
      expect(html).toContain('aria-label="Contact status"');
      expect(html).toContain(
        "Contact details remain unavailable until factual review is complete."
      );
      expect(html).not.toContain("mailto:");

      // Strict Section Order Verification
      const idxFirstViewport = html.indexOf("Example Person");
      const idxFactStrip = html.indexOf('aria-label="Synthetic overview"');
      const idxSelectedEvidence = html.indexOf("Selected example evidence");
      const idxExpSnapshot = html.indexOf("Example experience snapshot");
      const idxCapability = html.indexOf("Example capability with evidence");
      const idxRecentWriting = html.indexOf("Example writing");
      const idxContact = html.indexOf('aria-label="Contact status"');

      expect(idxFirstViewport).toBeGreaterThan(-1);
      expect(idxFactStrip).toBeGreaterThan(idxFirstViewport);
      expect(idxSelectedEvidence).toBeGreaterThan(idxFactStrip);
      expect(idxExpSnapshot).toBeGreaterThan(idxSelectedEvidence);
      expect(idxCapability).toBeGreaterThan(idxExpSnapshot);
      expect(idxRecentWriting).toBeGreaterThan(idxCapability);
      expect(idxContact).toBeGreaterThan(idxRecentWriting);
    });

    it("renders Korean Home hierarchy and localized synthetic strings with zero English leakage", () => {
      const html = renderToStaticMarkup(<HomePageView locale="ko" />);
      expect(html).toContain("예시 인물");
      expect(html).toContain("합성 미리보기");
      expect(html).toContain('href="/ko/projects/example-project"');
      expect(html).toContain("선택된 예시 근거");
      expect(html).toContain("예시 경력 요약");
      expect(html).toContain('href="/ko/experience"');
      expect(html).toContain('href="/ko/blog"');

      // Korean accessible labels & fact strip
      expect(html).toContain('aria-label="합성 개요"');
      expect(html).toContain('aria-label="연락처 상태"');
      expect(html).toContain("검토 경로");
      expect(html).toContain("미리보기 전용");

      // Korean card badges and labels
      expect(html).toContain("진행 중");
      expect(html).toContain("예시 검증 자료");
      expect(html).toContain("프로젝트 근거");
      expect(html).toContain("자료");

      // Verify no English label leaks
      expect(html).not.toContain('aria-label="Synthetic Overview"');
      expect(html).not.toContain('aria-label="Contact Status"');
      expect(html).not.toContain(">in-progress<");
      expect(html).not.toContain(">artifact<");
      expect(html).not.toContain(">project<");
      expect(html).not.toContain("Example verification artifact");
    });
  });

  describe("ExperiencePageView", () => {
    it("renders distinct professional and training sections with contribution boundary in English in strict order", () => {
      const html = renderToStaticMarkup(<ExperiencePageView locale="en" />);
      const h1Matches = html.match(/<h1/g) || [];
      expect(h1Matches.length).toBe(1);
      expect(html).toContain("Professional experience");
      expect(html).toContain("Example Software Engineer");
      expect(html).toContain("Education and training");
      expect(html).toContain("Example Training Provider");
      expect(html).toContain("Contribution boundary");
      expect(html).toContain(dictionaries.en.skeleton.contributionBoundaryBody);

      const idxProf = html.indexOf("Professional experience");
      const idxEdu = html.indexOf("Education and training");
      const idxBoundary = html.indexOf("Contribution boundary");

      expect(idxProf).toBeGreaterThan(-1);
      expect(idxEdu).toBeGreaterThan(idxProf);
      expect(idxBoundary).toBeGreaterThan(idxEdu);
    });

    it("renders distinct professional and training sections with exact reviewed copy in Korean", () => {
      const html = renderToStaticMarkup(<ExperiencePageView locale="ko" />);
      expect(html).toContain("경력");
      expect(html).toContain("예시 소프트웨어 엔지니어");
      expect(html).toContain("학력 및 교육");
      expect(html).toContain("예시 교육 기관");
      expect(html).toContain("기여 범위");
      expect(html).toContain(dictionaries.ko.skeleton.contributionBoundaryBody);
    });
  });

  describe("ProjectsIndexView & DetailView", () => {
    it("renders Projects index with localized detail link and no search/filter controls", () => {
      const enHtml = renderToStaticMarkup(<ProjectsIndexView locale="en" />);
      expect(enHtml).toContain('href="/projects/example-project"');
      expect(enHtml).not.toContain("<input");
      expect(enHtml).not.toContain("<select");
      expect(enHtml).not.toContain("<form");

      const koHtml = renderToStaticMarkup(<ProjectsIndexView locale="ko" />);
      expect(koHtml).toContain('href="/ko/projects/example-project"');
      expect(koHtml).toContain("진행 중");
      expect(koHtml).not.toContain(">in-progress<");
    });

    it("renders Project detail with strictly ordered sections, dl metadata, boundary, and no-artifact evidence", () => {
      const html = renderToStaticMarkup(
        <ProjectDetailView locale="en" slug="example-project" />
      );
      const h1Matches = html.match(/<h1/g) || [];
      expect(h1Matches.length).toBe(1);
      expect(html).toContain("Example Project");
      expect(html).toContain('href="/projects"');
      expect(html).toContain('aria-label="Back navigation"');
      expect(html).toContain("<dl");
      expect(html).toContain("Contribution boundary");
      expect(html).toContain("Problem and constraints");
      expect(html).toContain("Decisions");
      expect(html).toContain("Validation");
      expect(html).toContain("Outcome");
      expect(html).toContain("Limitations");
      expect(html).toContain("Evidence");
      expect(html).toContain(
        "No inspectable artifact is attached to this synthetic record."
      );
      expect(html).not.toContain("<img");

      // Strict Section Order Verification
      const idxBackNav = html.indexOf('aria-label="Back navigation"');
      const idxBoundary = html.indexOf("Contribution boundary");
      const idxProblem = html.indexOf("Problem and constraints");
      const idxDecisions = html.indexOf("Decisions");
      const idxValidation = html.indexOf("Validation");
      const idxOutcome = html.indexOf("Outcome");
      const idxLimitations = html.indexOf("Limitations");
      const idxEvidence = html.indexOf("Evidence");

      expect(idxBackNav).toBeGreaterThan(-1);
      expect(idxBoundary).toBeGreaterThan(idxBackNav);
      expect(idxProblem).toBeGreaterThan(idxBoundary);
      expect(idxDecisions).toBeGreaterThan(idxProblem);
      expect(idxValidation).toBeGreaterThan(idxDecisions);
      expect(idxOutcome).toBeGreaterThan(idxValidation);
      expect(idxLimitations).toBeGreaterThan(idxOutcome);
      expect(idxEvidence).toBeGreaterThan(idxLimitations);
    });

    it("renders Korean Project detail with localized back navigation and '주제' metadata label with zero English leaks", () => {
      const html = renderToStaticMarkup(
        <ProjectDetailView locale="ko" slug="example-project" />
      );
      expect(html).toContain("예시 프로젝트");
      expect(html).toContain('aria-label="이전 페이지 탐색"');
      expect(html).toContain("주제");
      expect(html).not.toContain(">Topics<");
      expect(html).not.toContain('aria-label="Back navigation"');
      expect(html).not.toContain('aria-label="Back Navigation"');
    });
  });

  describe("BlogIndexView & ArticleView", () => {
    it("renders Blog index with localized article link and no search/filter controls", () => {
      const enHtml = renderToStaticMarkup(<BlogIndexView locale="en" />);
      expect(enHtml).toContain('href="/blog/example-article"');
      expect(enHtml).not.toContain("<input");
      expect(enHtml).not.toContain("<select");

      const koHtml = renderToStaticMarkup(<BlogIndexView locale="ko" />);
      expect(koHtml).toContain('href="/ko/blog/example-article"');
    });

    it("renders Blog article with back link, time element, disclaimer, and strictly ordered prose sections", () => {
      const html = renderToStaticMarkup(
        <BlogArticleView locale="en" slug="example-article" />
      );
      const h1Matches = html.match(/<h1/g) || [];
      expect(h1Matches.length).toBe(1);
      expect(html).toContain("Example Article");
      expect(html).toContain('href="/blog"');
      expect(html).toContain('aria-label="Back navigation"');
      expect(html).toContain('<time dateTime="2026-08-28"');
      expect(html).toContain("Synthetic article — structure review only.");
      expect(html).toContain("Make the boundary visible");
      expect(html).toContain("Record the decision");
      expect(html).toContain("Verify what the page promises");

      // Strict Section Order Verification
      const idxBackNav = html.indexOf('aria-label="Back navigation"');
      const idxDisclaimer = html.indexOf("Synthetic article — structure review only.");
      const idxSec1 = html.indexOf("Make the boundary visible");
      const idxSec2 = html.indexOf("Record the decision");
      const idxSec3 = html.indexOf("Verify what the page promises");

      expect(idxBackNav).toBeGreaterThan(-1);
      expect(idxDisclaimer).toBeGreaterThan(idxBackNav);
      expect(idxSec1).toBeGreaterThan(idxDisclaimer);
      expect(idxSec2).toBeGreaterThan(idxSec1);
      expect(idxSec3).toBeGreaterThan(idxSec2);
    });

    it("renders Korean Blog article with localized back navigation and zero English leaks", () => {
      const html = renderToStaticMarkup(
        <BlogArticleView locale="ko" slug="example-article" />
      );
      expect(html).toContain("예시 글");
      expect(html).toContain('aria-label="이전 페이지 탐색"');
      expect(html).not.toContain('aria-label="Back navigation"');
      expect(html).not.toContain('aria-label="Back Navigation"');
    });
  });

  describe("StatusPageView", () => {
    it("renders clean status page with single h1 and no synthetic preview strings", () => {
      const html = renderToStaticMarkup(
        <StatusPageView
          title="Portfolio preview"
          summary="The bilingual portfolio shell is being prepared. Verified work and writing will be added after review."
        />
      );
      const h1Matches = html.match(/<h1/g) || [];
      expect(h1Matches.length).toBe(1);
      expect(html).toContain("Portfolio preview");
      expect(html).not.toContain("Example Person");
      expect(html).not.toContain("Example Project");
      expect(html).not.toContain("Synthetic preview");
    });
  });
});

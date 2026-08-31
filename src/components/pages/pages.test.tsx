import { describe, it, expect } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import type { ComponentType } from "react";
import type { MDXComponents } from "mdx/types";
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
    it("renders English Home hierarchy, single h1, verified identity, primary actions, and strictly ordered sections", () => {
      const html = renderToStaticMarkup(<HomePageView locale="en" />);

      // Single h1
      const h1Matches = html.match(/<h1/g) || [];
      expect(h1Matches.length).toBe(1);
      expect(html).toContain("Sean Choi");
      expect(html).toContain("Software developer connecting web interfaces with operational systems.");
      expect(html).toContain("Computer Engineering graduate with professional experience");
      expect(html).toContain("University of Toronto, 2026");

      // No synthetic notice or example content on real home
      expect(html).not.toContain("Synthetic preview");
      expect(html).not.toContain("All Example-labeled content is synthetic");
      expect(html).not.toContain("Example Person");
      expect(html).not.toContain("Example Project");
      expect(html).not.toContain("Example Article");

      // No prohibited privacy data
      expect(html).not.toContain("Résumé");
      expect(html).not.toContain("이력서");
      expect(html).not.toContain(".pdf");
      expect(html).not.toContain("CGPA");
      expect(html).not.toContain("2.22");
      expect(html).not.toContain("hynix");

      // Action links
      expect(html).toContain('href="/experience"');
      expect(html).toContain("View experience");
      expect(html).toContain('href="/projects"');
      expect(html).toContain("View projects");

      // Public profile links
      expect(html).toContain("mailto:se4n.choi@gmail.com");
      expect(html).toContain("https://github.com/se4nchoi");
      expect(html).toContain("https://www.linkedin.com/in/se4nchoi/");

      // Verified Experience snapshot
      expect(html).toContain("Verified Experience Snapshot");
      expect(html).toContain("Hoek Agency");
      expect(html).toContain("EMG Global");
      expect(html).toContain("Korea Defense Intelligence Command");

      // Current training section (labeled in progress)
      expect(html).toContain("Current Training &amp; Trajectory");
      expect(html).toContain("Physical AI &amp; Smart Factory Training Program");
      expect(html).toContain("In progress");

      // Skills with evidence level
      expect(html).toContain("Skills &amp; Evidence Level");
      expect(html).toContain("Professional evidence");
      expect(html).toContain("Frontend Development / React");
      expect(html).toContain("API &amp; Stream Integration");

      // Contact & Profiles section
      expect(html).toContain("Contact &amp; Public Profiles");
      expect(html).toContain("Based in South Korea");

      // Strict Section Order Verification
      const idxHero = html.indexOf("Sean Choi");
      const idxExpSnapshot = html.indexOf("Verified Experience Snapshot");
      const idxTraining = html.indexOf("Current Training &amp; Trajectory");
      const idxSkills = html.indexOf("Skills &amp; Evidence Level");
      const idxContact = html.indexOf("Contact &amp; Public Profiles");

      expect(idxHero).toBeGreaterThan(-1);
      expect(idxExpSnapshot).toBeGreaterThan(idxHero);
      expect(idxTraining).toBeGreaterThan(idxExpSnapshot);
      expect(idxSkills).toBeGreaterThan(idxTraining);
      expect(idxContact).toBeGreaterThan(idxSkills);
    });

    it("renders Korean Home hierarchy with verified Korean copy, single h1, and zero English leakages", () => {
      const html = renderToStaticMarkup(<HomePageView locale="ko" />);

      // Single h1
      const h1Matches = html.match(/<h1/g) || [];
      expect(h1Matches.length).toBe(1);
      expect(html).toContain("최예현");
      expect(html).toContain("소프트웨어 개발자");
      expect(html).toContain("프론트엔드를 기반으로 풀스택 개발과 시스템 연동까지 경험을 확장해 온 소프트웨어 개발자.");
      expect(html).toContain("응용과학 학사(BASc), 컴퓨터공학 — 토론토대학교, 2026");

      // Action links
      expect(html).toContain('href="/ko/experience"');
      expect(html).toContain("경력 보기");
      expect(html).toContain('href="/ko/projects"');
      expect(html).toContain("프로젝트 보기");

      // Experience snapshot
      expect(html).toContain("주요 경력 요약");
      expect(html).toContain("Hoek Agency (획기획)");
      expect(html).toContain("EMG Global");
      expect(html).toContain("KDIC (국군정보사령부)");

      // Current training
      expect(html).toContain("현재 교육 및 학습 방향");
      expect(html).toContain("부산인력개발원 - Intel");
      expect(html).toContain("AI 융합 DX 마스터클래스");
      expect(html).toContain("진행 중");

      // Skills & contact
      expect(html).toContain("기술 역량 및 근거 수준");
      expect(html).toContain("실무 근거");
      expect(html).toContain("프로젝트 근거");
      expect(html).toContain("교육 근거");
      expect(html).toContain("연락처 및 프로필");
      expect(html).toContain("대한민국 거주");

      // No synthetic notices or English leaks
      expect(html).not.toContain("Synthetic preview");
      expect(html).not.toContain("Example Person");
      expect(html).not.toContain("Example Project");
    });
  });

  describe("ExperiencePageView", () => {
    it("renders distinct professional, education/training, side projects, and contribution boundaries in English in strict order", () => {
      const html = renderToStaticMarkup(<ExperiencePageView locale="en" />);
      const h1Matches = html.match(/<h1/g) || [];
      expect(h1Matches.length).toBe(1);

      // Page Title
      expect(html).toContain("Experience");
      expect(html).toContain("Verified professional experience, education, training, and technical capability evidence.");

      // Professional experience records
      expect(html).toContain("Professional Experience");
      expect(html).toContain("Hoek Agency");
      expect(html).toContain("Software Developer — Frontend to Full-Stack");
      expect(html).toContain("2022-09 — 2023-08");

      expect(html).toContain("EMG Global");
      expect(html).toContain("Software Developer");
      expect(html).toContain("2021-07 — 2022-07");

      expect(html).toContain("Korea Defense Intelligence Command");
      expect(html).toContain("Sergeant / English Interpreter");
      expect(html).toContain("2016-10 — 2018-07");

      // Factual & boundary checks in military copy
      expect(html).toContain("JavaScript utilities for Hangul text decomposition");
      expect(html).toContain("VBA utilities for file renaming");
      expect(html).toContain("PowerShell was prohibited");

      // Education & Training
      expect(html).toContain("Education &amp; Training");
      expect(html).toContain("University of Toronto");
      expect(html).toContain("Bachelor of Applied Science (BASc), Computer Engineering");
      expect(html).toContain("Conferred 2026-06");
      expect(html).toContain("Physical AI &amp; Smart Factory Training Program");

      // Self-directed projects
      expect(html).toContain("Self-Directed Projects");
      expect(html).toContain("Classroom LAN Chat");
      expect(html).toContain("Classroom Q&amp;A Board");
      expect(html).toContain("In-Class Implementation Exercises");

      // Contribution boundaries
      expect(html).toContain("Contribution Boundaries &amp; Disclosure Safeguards");
      expect(html).toContain("EMG Global — System &amp; API Boundaries");
      expect(html).toContain("Korea Defense Intelligence Command (KDIC) — Automation Scope &amp; Confidentiality");
      expect(html).toContain("Training Trajectory vs. Production Ownership");

      // Strict Section Order Verification
      const idxProf = html.indexOf("Professional Experience");
      const idxEdu = html.indexOf("Education &amp; Training");
      const idxSideProj = html.indexOf("Self-Directed Projects");
      const idxSkills = html.indexOf("Skills by Evidence Level");
      const idxBoundary = html.indexOf("Contribution Boundaries &amp; Disclosure Safeguards");

      expect(idxProf).toBeGreaterThan(-1);
      expect(idxEdu).toBeGreaterThan(idxProf);
      expect(idxSideProj).toBeGreaterThan(idxEdu);
      expect(idxSkills).toBeGreaterThan(idxSideProj);
      expect(idxBoundary).toBeGreaterThan(idxSkills);
    });

    it("renders distinct professional and training sections with exact reviewed copy in Korean", () => {
      const html = renderToStaticMarkup(<ExperiencePageView locale="ko" />);
      expect(html).toContain("경력");
      expect(html).toContain("실무 경력");
      expect(html).toContain("Hoek Agency (획기획)");
      expect(html).toContain("개발자 | 프론트엔드·풀스택 개발");
      expect(html).toContain("EMG Global");
      expect(html).toContain("소프트웨어 개발자");
      expect(html).toContain("KDIC (국군정보사령부)");
      expect(html).toContain("영어어학병");

      expect(html).toContain("학력 및 교육");
      expect(html).toContain("토론토대학교");
      expect(html).toContain("응용과학 학사(BASc), 컴퓨터공학");
      expect(html).toContain("부산인력개발원 - Intel");
      expect(html).toContain("AI 융합 DX 마스터클래스");

      expect(html).toContain("사이드 프로젝트");
      expect(html).toContain("Classroom LAN Chat");
      expect(html).toContain("수업 내 구현 실습");

      expect(html).toContain("기여 범위 및 보안 안내");
      expect(html).toContain("EMG Global — 시스템 및 연동 경계");
      expect(html).toContain("KDIC (국군정보사령부) — 자동화 도구 범위 및 보안 원칙");
    });
  });

  describe("ProjectsIndexView & DetailView", () => {
    it("renders Projects index in honest empty / coming-evidence state with no search/filter controls", () => {
      const enHtml = renderToStaticMarkup(<ProjectsIndexView locale="en" />);
      expect(enHtml).toContain("Projects");
      expect(enHtml).toContain(dictionaries.en.projectsStatus);
      expect(enHtml).not.toContain("<input");
      expect(enHtml).not.toContain("<select");
      expect(enHtml).not.toContain("<form");
      expect(enHtml).not.toContain("Example Project");

      const koHtml = renderToStaticMarkup(<ProjectsIndexView locale="ko" />);
      expect(koHtml).toContain("프로젝트");
      expect(koHtml).toContain(dictionaries.ko.projectsStatus);
      expect(koHtml).not.toContain("예시 프로젝트");
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
    it("renders Blog index in honest empty state without preview articles", () => {
      const enHtml = renderToStaticMarkup(<BlogIndexView locale="en" preview={false} />);
      expect(enHtml).toContain("Blog");
      expect(enHtml).toContain("No articles have been published yet.");
      expect(enHtml).toContain('href="/feed.xml"');

      const koHtml = renderToStaticMarkup(<BlogIndexView locale="ko" preview={false} />);
      expect(koHtml).toContain("블로그");
      expect(koHtml).toContain("아직 게시된 글이 없습니다.");
      expect(koHtml).toContain('href="/feed.xml"');
    });

    it("renders Blog article with back link, time element, disclaimer, and strictly ordered prose sections", async () => {
      const MockMdx = ({ components }: { components?: MDXComponents }) => {
        const H2 = (components?.h2 || "h2") as React.ElementType;
        return (
          <>
            <H2>Make the boundary visible</H2>
            <H2>Record the decision</H2>
            <H2>Verify what the page promises</H2>
          </>
        );
      };

      const view = await BlogArticleView({
        locale: "en",
        slug: "example-article",
        preview: true,
        loadComponent: async () => ({
          default: MockMdx as ComponentType<{ components?: MDXComponents }>,
        }),
      });
      const html = renderToStaticMarkup(view);

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

    it("renders Korean Blog article with localized back navigation and zero English leaks", async () => {
      const MockMdx = () => <div>본문</div>;

      const view = await BlogArticleView({
        locale: "ko",
        slug: "example-article",
        preview: true,
        loadComponent: async () => ({
          default: MockMdx as ComponentType<{ components?: MDXComponents }>,
        }),
      });
      const html = renderToStaticMarkup(view);

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

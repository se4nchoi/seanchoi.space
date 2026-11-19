import { describe, it, expect, vi, afterEach } from "vitest";
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
import {
  skeletonProjectEn,
  skeletonProjectKo,
  skeletonProjectNarrative,
} from "@/data/skeleton-preview";

describe("Page Components Server Rendering & Semantic Structure", () => {
  describe("HomePageView", () => {
    it("renders English Home hierarchy, single h1, verified identity, primary actions, and strictly ordered sections", () => {
      const html = renderToStaticMarkup(<HomePageView locale="en" />);

      // Single h1
      const h1Matches = html.match(/<h1/g) || [];
      expect(h1Matches.length).toBe(1);
      expect(html).toContain("Sean Choi");
      expect(html).toContain("An engineer connecting IT systems and manufacturing equipment.");
      expect(html).toContain("I developed and operated web services for two years.");
      // No in-page "view projects" jump link; the section follows the hero
      expect(html).not.toContain('href="#selected-work"');
      expect(html).toContain('id="selected-work"');
      expect(html).toContain("PLC wiring exercise");
      expect(html).toContain("RUTA40 mobile app screens");
      expect(html).toContain("몰입도 sign-in screen");
      expect(html).toContain("srcSet=");

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
      expect(html).toContain("All projects");

      // Public profile links
      expect(html).toContain("mailto:se4n.choi@gmail.com");
      expect(html).toContain("https://github.com/se4nchoi");
      expect(html).toContain("https://www.linkedin.com/in/se4nchoi/");

      // Selected evidence replaces the résumé-style employment snapshot
      expect(html).toContain(">Projects</h2>");
      expect(html).not.toContain("Selected work");
      expect(html).toContain("RUTA40 Electric Camper Smart Key App");
      expect(html).toContain("몰입도: Internal Attendance Service");
      expect(html).not.toContain("Classroom LAN Chat");
      // Approved case studies (canonical PDF, 2026-11-19) are featured
      expect(html).toContain("Details");
      expect(html).toContain("Indy7 Palletizing Cell Digital Twin");
      expect(html).toContain("Madi: a classroom LAN chat and study app");
      expect(html).not.toContain("Verified Experience Snapshot");

      // The ROS2 current-work card was retired with the canonical PDF
      expect(html).not.toContain("Currently Building");
      expect(html).not.toContain("ROS2");

      // Skills stay on Experience; the homepage is curated around work.
      expect(html).not.toContain("Capabilities Across System Layers");
      expect(html).toContain("I built the React web app, its API integration, and the Android app");
      expect(html).toContain("The embedded team built the door-lock module");
      // Contact & Profiles section
      expect(html).toContain(">Contact</h2>");
      expect(html).toContain("Based in South Korea");

      // Strict Section Order Verification
      const idxHero = html.indexOf("Sean Choi");
      const idxEvidence = html.indexOf(">Projects</h2>");
      const idxCareer = html.indexOf("RUTA40 Electric Camper Smart Key App");
      const idxCaseStudy = html.indexOf("Indy7 Palletizing Cell Digital Twin");
      const idxContact = html.indexOf(">Contact</h2>");

      expect(idxHero).toBeGreaterThan(-1);
      expect(idxEvidence).toBeGreaterThan(idxHero);
      // Career projects lead, as in the PDF
      expect(idxCareer).toBeGreaterThan(idxEvidence);
      expect(idxCaseStudy).toBeGreaterThan(idxCareer);
      expect(idxContact).toBeGreaterThan(idxCaseStudy);
    });

    it("renders Korean Home hierarchy with verified Korean copy, single h1, and zero English leakages", () => {
      const html = renderToStaticMarkup(<HomePageView locale="ko" />);

      // Single h1
      const h1Matches = html.match(/<h1/g) || [];
      expect(h1Matches.length).toBe(1);
      expect(html).toContain("최예현");
      expect(html).not.toContain("주요 엔지니어링 근거");
      expect(html).toContain("IT 시스템과 제조 설비를 연결하는 엔지니어");
      expect(html).toContain('id="selected-work"');

      // Action links
      expect(html).toContain('href="/ko/experience"');
      expect(html).toContain("경력 보기");
      expect(html).toContain('href="/ko/projects"');
      expect(html).toContain("전체 프로젝트");

      expect(html).toContain(">프로젝트</h2>");
      expect(html).not.toContain("만든 것들");
      expect(html).toContain("PLC 배선 실습");
      expect(html).toContain("RUTA40 앱의 시작");
      expect(html).toContain("RUTA40 전기 캠핑카 스마트키 앱");
      expect(html).toContain("사내 근태관리 서비스 「몰입도」");
      expect(html).toContain("Indy7 팔레타이징 셀 디지털 트윈");
      expect(html).toContain("Madi (마디): 교실 LAN 채팅·학습 앱");
      expect(html).not.toContain("현재 만들고 있는 것");
      expect(html).not.toContain("ROS2");

      // Skills & contact
      expect(html).not.toContain("시스템 계층별 역량");
      expect(html).toContain("경력 프로젝트");
      expect(html).toContain(">연락처</h2>");
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
      // No explanatory intro under the page title
      expect(html).not.toContain("Where I&#x27;ve worked");

      // Professional experience records
      expect(html).toContain("Professional Experience");
      expect(html).toContain("Hoek Agency");
      expect(html).toContain("Developer — Full-Stack");
      expect(html).toContain("Sep 2022 – Aug 2023");

      expect(html).toContain("EMG Global");
      expect(html).toContain("Researcher — Software Development");
      expect(html).toContain("Jul 2021 – Jul 2022");

      expect(html).toContain("Korea Defense Intelligence Command");
      expect(html).toContain("English Linguist");
      expect(html).toContain("Oct 2016 – Jul 2018");

      // Factual & boundary checks in military copy
      expect(html).toContain("JavaScript utilities for Hangul text decomposition");
      expect(html).toContain("VBA utilities for file renaming");
      expect(html).toContain("PowerShell was prohibited");
      expect(html).toContain("from about 30 minutes to about 10");

      // Education & Training
      expect(html).toContain("Education &amp; Training");
      expect(html).toContain("University of Toronto");
      expect(html).toContain("Bachelor of Applied Science (BASc), Computer Engineering");
      expect(html).toContain("Graduated Jun 2026");
      expect(html).toContain("Physical AI &amp; Smart Factory Training Program");

      // Self-directed projects
      expect(html).toContain("Personal Projects");
      expect(html).toContain("Madi");
      expect(html).not.toContain("BambooChat");
      expect(html).toContain("Classroom Q&amp;A Board");
      expect(html).toContain("In-Class Implementation Exercises");

      // Boundaries live on each record, not in a separate disclaimer section
      expect(html).not.toContain("Disclosure Safeguards");
      // Training program name is not repeated as its own institution line
      expect(html.split("Physical AI &amp; Smart Factory Training Program").length - 1).toBe(1);

      // Strict Section Order Verification
      const idxProf = html.indexOf("Professional Experience");
      const idxEdu = html.indexOf("Education &amp; Training");
      const idxSideProj = html.indexOf("Personal Projects");
      const idxSkills = html.indexOf(">Skills</h2>");

      expect(idxProf).toBeGreaterThan(-1);
      expect(idxEdu).toBeGreaterThan(idxProf);
      expect(idxSideProj).toBeGreaterThan(idxEdu);
      expect(idxSkills).toBeGreaterThan(idxSideProj);
    });

    it("renders distinct professional and training sections with exact reviewed copy in Korean", () => {
      const html = renderToStaticMarkup(<ExperiencePageView locale="ko" />);
      expect(html).toContain("경력");
      expect(html).toContain("실무 경력");
      expect(html).toContain("Hoek Agency (획기획)");
      expect(html).toContain("개발자 · 풀스택");
      expect(html).toContain("EMG Global");
      expect(html).toContain("연구원 · SW 개발");
      expect(html).toContain("국군정보사령부");
      expect(html).not.toContain("KDIC");
      expect(html).toContain("영어어학병");

      expect(html).toContain("학력 및 교육");
      expect(html).toContain("토론토대학교");
      expect(html).toContain("응용과학 학사(BASc), 컴퓨터공학");
      expect(html).toContain("부산인력개발원 - Intel");
      expect(html).toContain("AI 융합 DX 마스터클래스");

      expect(html).toContain("개인 프로젝트");
      expect(html).toContain("교육 실습");
      expect(html).toContain("기술사항");
      expect(html).not.toContain("일해 온 곳");
      expect(html).toContain("Madi (마디)");
      expect(html).toContain("수업 내 구현 실습");

      expect(html).toContain("2022.09 – 2023.08");
      expect(html).not.toContain("기여 범위 및 보안 안내");
    });
  });

  describe("ProjectsIndexView & DetailView", () => {
    it("renders a grouped engineering-evidence index without fabricated flagship links or controls", () => {
      const enHtml = renderToStaticMarkup(<ProjectsIndexView locale="en" />);
      expect(enHtml).toContain("Projects");
      expect(enHtml).not.toContain(dictionaries.en.projectsStatus);
      expect(enHtml).not.toContain("Currently Building");
      // PDF section names, career first
      const idxCareer = enHtml.indexOf("Career projects");
      const idxPersonal = enHtml.indexOf("Personal projects");
      const idxTraining = enHtml.indexOf(">Training</h2>");
      expect(idxCareer).toBeGreaterThan(-1);
      expect(idxPersonal).toBeGreaterThan(idxCareer);
      expect(idxTraining).toBeGreaterThan(idxPersonal);
      expect(enHtml).not.toContain("Case studies");
      // The PLC wiring photo belongs to the in-class exercises
      expect(enHtml.indexOf("PLC wiring exercise")).toBeGreaterThan(idxTraining);
      expect(enHtml).not.toContain("ROS2");
      expect(enHtml).toContain("Daegu Smart City Dashboard");
      expect(enHtml).not.toContain("<input");
      expect(enHtml).not.toContain("<select");
      expect(enHtml).not.toContain("<form");
      expect(enHtml).not.toContain("Example Project");
      // Production: approved case studies link to their pages, and Madi's
      // case study replaces its regular card.
      expect(new Set(enHtml.match(/href="\/projects\/[^"]+"/g) ?? [])).toEqual(
        new Set(['href="/projects/indy7-digital-twin"', 'href="/projects/bamboochat"'])
      );
      expect(enHtml).not.toContain("In review");
      expect(enHtml.split(">Madi<").length - 1).toBe(0);

      const koHtml = renderToStaticMarkup(<ProjectsIndexView locale="ko" />);
      expect(koHtml).toContain("프로젝트");
      expect(koHtml).not.toContain(dictionaries.ko.projectsStatus);
      expect(koHtml).toContain("Indy7 팔레타이징 셀 디지털 트윈");
      expect(koHtml).not.toContain("ROS2");
      expect(koHtml).toContain("경력 프로젝트");
      expect(koHtml).not.toContain("예시 프로젝트");
    });

    it("renders Project detail with strictly ordered sections, dl metadata, boundary, and no-artifact evidence", () => {
      const html = renderToStaticMarkup(
        <ProjectDetailView
          locale="en"
          project={skeletonProjectEn}
          narrative={skeletonProjectNarrative.en}
        />
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
        <ProjectDetailView
          locale="ko"
          project={skeletonProjectKo}
          narrative={skeletonProjectNarrative.ko}
        />
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
      expect(enHtml).toContain("Nothing published yet.");
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

describe("CaseStudyView", () => {
  it("renders the digital twin case study with one h1, limits, and a source link", async () => {
    const { CaseStudyView } = await import("./case-study-view");
    const { indy7DigitalTwin } = await import("@/data/case-studies");
    const html = renderToStaticMarkup(<CaseStudyView study={indy7DigitalTwin} locale="en" />);
    expect((html.match(/<h1/g) || []).length).toBe(1);
    expect(html).toContain("Indy7 Palletizing Cell Digital Twin");
    expect(html).toContain("What this doesn&#x27;t show yet");
    expect(html).toContain("https://github.com/se4nchoi/neuromeka-digitaltwin");
    expect(html).toContain("<svg");
  });

  it("falls back to English with a notice while the Korean copy is unreviewed", async () => {
    const { CaseStudyView } = await import("./case-study-view");
    const { indy7DigitalTwin } = await import("@/data/case-studies");
    const html = renderToStaticMarkup(<CaseStudyView study={indy7DigitalTwin} locale="ko" />);
    expect(html).toContain("한국어 번역은 검토 중");
    expect(html).toContain("Indy7 Palletizing Cell Digital Twin");
  });
});

describe("PortfolioPrintView", () => {
  it("renders the private PDF source with case studies and only approved contact data", async () => {
    // The print page exists only on the preview channel
    vi.stubEnv("VERCEL_ENV", "preview");
    const { PortfolioPrintView } = await import("./portfolio-print-view");
    const html = renderToStaticMarkup(<PortfolioPrintView generatedOn="2026-10-01" />);
    vi.unstubAllEnvs();
    expect(html).toContain("se4n.choi@gmail.com");
    expect(html).toContain("South Korea");
    expect(html).toContain("Indy7 Palletizing Cell Digital Twin");
    expect(html).toContain("Madi");
    expect(html).toContain("Generated 2026-10-01");
    // No phone numbers, street addresses, or GPA
    // (city-level "Daegu" appears legitimately in "Daegu Smart City Dashboard")
    expect(html).not.toMatch(/\+82|010-\d{3,4}-\d{4}|\bCGPA\b|Daegu, South Korea|-gu\b|-dong\b/);
  });
});

describe("PortfolioPrintViewKo", () => {
  it("renders the Korean PDF source with every project page and only approved contact data", async () => {
    const { PortfolioPrintViewKo } = await import("./portfolio-print-view-ko");
    const html = renderToStaticMarkup(<PortfolioPrintViewKo generatedOn="2026-11-03" />);
    expect(html).toContain("최예현");
    expect(html).toContain("se4n.choi@gmail.com");
    expect(html).toContain("대한민국");
    expect(html).toContain("05/05");
    expect(html).toContain("RUTA40 전기 캠핑카 스마트키 앱");
    expect(html).toContain("Indy7 팔레타이징 셀 디지털 트윈");
    expect(html).toContain("Madi (마디)");
    expect(html).toContain("2026-11-03 기준");
    expect(html).not.toMatch(/\+82|010-\d{3,4}-\d{4}|\bCGPA\b|2\.22|-gu\b|-dong\b|Yehyun/);
  });
});

describe("preview channel (dev.seanchoi.space)", () => {
  afterEach(() => vi.unstubAllEnvs());

  it("shows the same case studies as production, with no in-review badge once approved", () => {
    vi.stubEnv("VERCEL_ENV", "preview");
    const enHtml = renderToStaticMarkup(<ProjectsIndexView locale="en" />);
    const detailLinks = enHtml.match(/href="\/projects\/[^"]+"/g) ?? [];
    expect(new Set(detailLinks)).toEqual(
      new Set(['href="/projects/indy7-digital-twin"', 'href="/projects/bamboochat"'])
    );
    expect(enHtml).not.toContain("In review");
    expect(enHtml.split(">Madi<").length - 1).toBe(0);
    // Case studies sit under the personal-projects heading, without an eyebrow
    const koHtml = renderToStaticMarkup(<ProjectsIndexView locale="ko" />);
    expect(koHtml).not.toContain("사례 연구");
  });
});

describe("work labels are consistent across pages", () => {
  it("uses the same Korean label for the same record on Home and Projects", () => {
    const home = renderToStaticMarkup(<HomePageView locale="ko" />);
    const projects = renderToStaticMarkup(<ProjectsIndexView locale="ko" />);
    for (const html of [home, projects]) {
      expect(html).toContain("경력 프로젝트");
    }
  });
});

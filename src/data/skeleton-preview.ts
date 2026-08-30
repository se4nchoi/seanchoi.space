import type {
  ContentRegistry,
  SiteIdentity,
  EvidenceRecord,
  ExperienceRecord,
  EducationOrTrainingRecord,
  SkillRecord,
  ProjectRecord,
  ArticleRecord,
} from "@/lib/content/schemas";
import type { AppLocale } from "@/i18n/config";

export const skeletonSiteIdentity: SiteIdentity = {
  id: "skeleton-site-identity",
  publicationStatus: "draft",
  claimState: "pending",
  syntheticPlaceholder: true,
  reviewedOn: "2026-08-29",
  displayName: {
    en: "Example Person",
    ko: "예시 인물",
    koReview: "draft",
  },
  location: {
    en: "Example Location",
    ko: "예시 지역",
    koReview: "draft",
  },
  trajectory: {
    en: "Synthetic direction statement for information-hierarchy review; not a real biography.",
    ko: "정보 구조 검토를 위한 합성 방향 설명이며 실제 소개가 아닙니다.",
    koReview: "draft",
  },
  linkIds: [],
};

export const skeletonEvidence: EvidenceRecord = {
  id: "skeleton-evidence",
  publicationStatus: "draft",
  claimState: "pending",
  syntheticPlaceholder: true,
  reviewedOn: "2026-08-29",
  label: "Example verification artifact",
  level: "project",
  sourceKind: "artifact",
  publiclyInspectable: false,
};

export const skeletonExperience: ExperienceRecord = {
  id: "skeleton-experience",
  publicationStatus: "draft",
  claimState: "pending",
  syntheticPlaceholder: true,
  reviewedOn: "2026-08-29",
  organization: {
    en: "Example Organization",
    ko: "예시 조직",
    koReview: "draft",
  },
  role: {
    en: "Example Software Engineer",
    ko: "예시 소프트웨어 엔지니어",
    koReview: "draft",
  },
  dateRange: {
    start: "2024-01",
    end: "2025-01",
    ongoing: false,
  },
  employmentType: "full-time",
  summary: {
    en: "Synthetic professional record used to review chronology and contribution boundaries.",
    ko: "연대기와 기여 범위를 검토하기 위한 합성 경력 기록입니다.",
    koReview: "draft",
  },
  contributions: [
    {
      text: {
        en: "Example contribution limited to a documented interface.",
        ko: "문서화된 인터페이스로 범위를 제한한 예시 기여입니다.",
        koReview: "draft",
      },
      evidenceIds: ["skeleton-evidence"],
    },
    {
      text: {
        en: "Example validation described without a performance or business metric.",
        ko: "성능 또는 비즈니스 지표 없이 설명한 예시 검증입니다.",
        koReview: "draft",
      },
      evidenceIds: ["skeleton-evidence"],
    },
  ],
  evidenceIds: ["skeleton-evidence"],
};

export const skeletonTraining: EducationOrTrainingRecord = {
  id: "skeleton-training",
  publicationStatus: "draft",
  claimState: "pending",
  syntheticPlaceholder: true,
  reviewedOn: "2026-08-29",
  kind: "training",
  status: "completed",
  institution: {
    en: "Example Training Provider",
    ko: "예시 교육 기관",
    koReview: "draft",
  },
  program: {
    en: "Example Systems Lab",
    ko: "예시 시스템 실습",
    koReview: "draft",
  },
  dateRange: {
    start: "2025-02",
    end: "2025-04",
    ongoing: false,
  },
  evidenceLevel: "training",
  evidenceIds: ["skeleton-evidence"],
};

export const skeletonSkill: SkillRecord = {
  id: "skeleton-skill",
  publicationStatus: "draft",
  claimState: "pending",
  syntheticPlaceholder: true,
  reviewedOn: "2026-08-29",
  name: {
    en: "Example interface validation",
    ko: "예시 인터페이스 검증",
    koReview: "draft",
  },
  evidenceLevel: "project",
  prominence: "featured",
  evidenceIds: ["skeleton-evidence"],
};

export const skeletonProjectEn: ProjectRecord = {
  id: "skeleton-project-en",
  slug: "example-project",
  locale: "en",
  publicationStatus: "draft",
  claimState: "pending",
  syntheticPlaceholder: true,
  reviewedOn: "2026-08-29",
  title: "Example Project",
  summary:
    "A synthetic case-study record used to test evidence hierarchy, contribution boundaries, and responsive layout.",
  context: "personal",
  status: "in-progress",
  role: "Example contributor",
  contributionBoundary:
    "Synthetic boundary: this record claims responsibility only for the interface and validation described in the preview.",
  topics: ["interfaces", "validation"],
  evidenceIds: ["skeleton-evidence"],
  linkIds: [],
  assetPaths: [],
};

export const skeletonProjectKo: ProjectRecord = {
  id: "skeleton-project-ko",
  slug: "example-project",
  locale: "ko",
  translationOf: "skeleton-project-en",
  publicationStatus: "draft",
  claimState: "pending",
  syntheticPlaceholder: true,
  reviewedOn: "2026-08-29",
  title: "예시 프로젝트",
  summary:
    "근거 구조, 기여 범위, 반응형 레이아웃을 검토하기 위한 합성 사례 기록입니다.",
  context: "personal",
  status: "in-progress",
  role: "예시 기여자",
  contributionBoundary:
    "합성 범위: 이 기록은 미리보기에 설명된 인터페이스와 검증에 대해서만 책임을 표시합니다.",
  topics: ["인터페이스", "검증"],
  evidenceIds: ["skeleton-evidence"],
  linkIds: [],
  assetPaths: [],
};

export interface ProjectDetailNarrative {
  context: string;
  problem: string;
  constraints: string[];
  decisions: string[];
  validation: string;
  outcome: string;
  limitations: string;
}

export const skeletonProjectNarrative: Record<AppLocale, ProjectDetailNarrative> = {
  en: {
    context:
      "A synthetic personal-project context for testing the case-study structure. No deployment or employer is represented.",
    problem:
      "Demonstrate how a case study can explain a bounded problem without inventing operational impact.",
    constraints: [
      "Keep ownership explicit.",
      "Separate validation from outcomes.",
    ],
    decisions: [
      "Present role and contribution boundary before implementation detail.",
      "Reserve evidence links for artifacts that actually exist.",
    ],
    validation:
      "The skeleton is checked through schema validation, static route generation, semantic tests, and real HTTP responses.",
    outcome:
      "A reviewable page skeleton; no production, adoption, or business outcome is claimed.",
    limitations:
      "No real artifact, system diagram, employer context, or measured result is attached.",
  },
  ko: {
    context:
      "사례 구조를 검토하기 위한 합성 개인 프로젝트 맥락입니다. 배포 또는 고용주를 나타내지 않습니다.",
    problem:
      "운영 성과를 만들어 내지 않고 범위가 명확한 문제를 설명하는 사례 구조를 보여 줍니다.",
    constraints: [
      "소유 범위를 명확히 유지합니다.",
      "검증과 성과를 구분합니다.",
    ],
    decisions: [
      "구현 세부 정보보다 역할과 기여 범위를 먼저 제시합니다.",
      "실제로 존재하는 자료에만 근거 링크를 사용합니다.",
    ],
    validation:
      "이 골격은 스키마 검증, 정적 경로 생성, 시맨틱 테스트, 실제 HTTP 응답으로 확인합니다.",
    outcome:
      "검토 가능한 페이지 골격이며 프로덕션, 도입, 비즈니스 성과를 주장하지 않습니다.",
    limitations:
      "실제 자료, 시스템 다이어그램, 고용주 맥락, 측정 결과가 포함되지 않습니다.",
  },
};

export const skeletonArticleEn: ArticleRecord = {
  id: "skeleton-article-en",
  slug: "example-article",
  locale: "en",
  publicationStatus: "draft",
  claimState: "pending",
  syntheticPlaceholder: true,
  reviewedOn: "2026-08-29",
  title: "Example Article",
  summary:
    "Synthetic long-form content used to review article hierarchy and reading rhythm.",
  publishedOn: "2026-08-28",
  topics: ["evidence", "engineering"],
  source: "original",
  assetPaths: [],
};

export const skeletonArticleKo: ArticleRecord = {
  id: "skeleton-article-ko",
  slug: "example-article",
  locale: "ko",
  translationOf: "skeleton-article-en",
  publicationStatus: "draft",
  claimState: "pending",
  syntheticPlaceholder: true,
  reviewedOn: "2026-08-29",
  title: "예시 글",
  summary:
    "글의 구조와 읽기 흐름을 검토하기 위한 합성 장문 콘텐츠입니다.",
  publishedOn: "2026-08-28",
  topics: ["근거", "엔지니어링"],
  source: "original",
  assetPaths: [],
};

export interface ArticleDetailSection {
  heading: string;
  body: string;
}

export interface ArticleDetailNarrative {
  lede: string;
  sections: ArticleDetailSection[];
}

export const skeletonArticleNarrative: Record<AppLocale, ArticleDetailNarrative> = {
  en: {
    lede:
      "This synthetic article demonstrates structure only. It does not describe a real role, project, or result.",
    sections: [
      {
        heading: "Make the boundary visible",
        body:
          "A useful technical narrative separates context, individual contribution, team work, and evidence before discussing outcomes.",
      },
      {
        heading: "Record the decision",
        body:
          "The example structure pairs each decision with a constraint so the reader can evaluate the reasoning instead of reading a tool list.",
      },
      {
        heading: "Verify what the page promises",
        body:
          "Schema checks, semantic tests, static builds, and HTTP responses cover different failure modes; none proves a professional claim.",
      },
    ],
  },
  ko: {
    lede:
      "이 합성 글은 구조만 보여 줍니다. 실제 역할, 프로젝트, 결과를 설명하지 않습니다.",
    sections: [
      {
        heading: "범위를 명확히 표시하기",
        body:
          "유용한 기술 서술은 성과를 설명하기 전에 맥락, 개인 기여, 팀 작업, 근거를 구분합니다.",
      },
      {
        heading: "결정을 기록하기",
        body:
          "예시 구조는 각 결정을 제약 조건과 연결하여 독자가 도구 목록이 아니라 판단 과정을 평가할 수 있게 합니다.",
      },
      {
        heading: "페이지가 약속한 내용을 검증하기",
        body:
          "스키마 검사, 시맨틱 테스트, 정적 빌드, HTTP 응답은 서로 다른 실패 유형을 다루며 어떤 것도 경력 주장을 증명하지 않습니다.",
      },
    ],
  },
};

export const skeletonPreviewRegistry: ContentRegistry = {
  siteIdentity: skeletonSiteIdentity,
  evidence: [skeletonEvidence],
  links: [],
  experiences: [skeletonExperience],
  educationAndTraining: [skeletonTraining],
  skills: [skeletonSkill],
  projects: [skeletonProjectEn, skeletonProjectKo],
  articles: [skeletonArticleEn, skeletonArticleKo],
};

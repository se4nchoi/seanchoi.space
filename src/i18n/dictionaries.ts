import type { AppLocale } from "./config";

export interface SkeletonDictionary {
  eyebrow: string;
  notice: string;
  baseline: string;
  direction: string;
  viewProject: string;
  selectedEvidence: string;
  experienceSnapshot: string;
  professionalExperience: string;
  educationAndTraining: string;
  capabilityEvidence: string;
  recentWriting: string;
  viewExperience: string;
  viewAllProjects: string;
  viewBlog: string;
  contactUnavailable: string;
  context: string;
  status: string;
  role: string;
  contributionBoundary: string;
  problemAndConstraints: string;
  decisions: string;
  validation: string;
  outcome: string;
  limitations: string;
  evidence: string;
  evidenceUnavailable: string;
  synthetic: string;
  personal: string;
  inProgress: string;
  completed: string;
  fullTime: string;
  training: string;
  projectEvidence: string;
  artifact: string;
  backToProjects: string;
  backToBlog: string;
  articleDisclaimer: string;
  syntheticOverview: string;
  contactStatus: string;
  backNavigation: string;
  topics: string;
  reviewedRoutes: string;
  previewOnly: string;
  contributionBoundaryBody: string;
  evidenceLabel: string;
}

export interface BlogDictionary {
  emptyTitle: string;
  emptyBody: string;
  publishedOn: string;
  updatedOn: string;
  tableOfContents: string;
  relatedWriting: string;
  topics: string;
  feedTitle: string;
  feedSubscribe: string;
  translationUnavailable: string;
  translationUnavailableNotice: string;
  backToBlog: string;
  calloutNote: string;
  calloutWarning: string;
  calloutInfo: string;
  calloutTip: string;
  viewEnglishBlog: string;
  viewKoreanBlog: string;
}

export interface UIDictionary {
  skipToContent: string;
  primaryNavigation: string;
  home: string;
  experience: string;
  projects: string;
  blog: string;
  language: string;
  english: string;
  korean: string;
  openInNewTab: string;
  homeTitle: string;
  homeStatus: string;
  experienceStatus: string;
  projectsStatus: string;
  blogStatus: string;
  notFoundTitle: string;
  notFoundBody: string;
  backHome: string;
  footerPolicy: string;
  skeleton: SkeletonDictionary;
  blogUI: BlogDictionary;
}

export const dictionaries: Record<AppLocale, UIDictionary> = {
  en: {
    skipToContent: "Skip to content",
    primaryNavigation: "Primary navigation",
    home: "Home",
    experience: "Experience",
    projects: "Projects",
    blog: "Blog",
    language: "Language",
    english: "English",
    korean: "Korean",
    openInNewTab: "opens in a new tab",
    homeTitle: "Portfolio preview",
    homeStatus:
      "The bilingual portfolio shell is being prepared. Verified work and writing will be added after review.",
    experienceStatus: "Verified experience content will be added after review.",
    projectsStatus:
      "Verified project case studies will be added as evidence becomes available.",
    blogStatus:
      "Reviewed writing will be added through the local publishing workflow.",
    notFoundTitle: "Page not found",
    notFoundBody:
      "The requested page does not exist or is not available in this language.",
    backHome: "Return home",
    footerPolicy: "English-first. Korean content is published after review.",
    skeleton: {
      eyebrow: "Synthetic preview",
      notice:
        "All Example-labeled content is synthetic, non-publishable, and shown only to review the portfolio structure.",
      baseline:
        "Synthetic professional baseline for layout review; not a real biography.",
      direction:
        "Example direction toward evidence-backed software and systems work.",
      viewProject: "View Example Project",
      selectedEvidence: "Selected example evidence",
      experienceSnapshot: "Example experience snapshot",
      professionalExperience: "Professional experience",
      educationAndTraining: "Education and training",
      capabilityEvidence: "Example capability with evidence",
      recentWriting: "Example writing",
      viewExperience: "View experience structure",
      viewAllProjects: "View all example projects",
      viewBlog: "View example writing",
      contactUnavailable:
        "Contact details remain unavailable until factual review is complete.",
      context: "Context",
      status: "Status",
      role: "Role",
      contributionBoundary: "Contribution boundary",
      problemAndConstraints: "Problem and constraints",
      decisions: "Decisions",
      validation: "Validation",
      outcome: "Outcome",
      limitations: "Limitations",
      evidence: "Evidence",
      evidenceUnavailable:
        "No inspectable artifact is attached to this synthetic record.",
      synthetic: "synthetic",
      personal: "personal",
      inProgress: "in progress",
      completed: "completed",
      fullTime: "full-time",
      training: "training",
      projectEvidence: "project evidence",
      artifact: "artifact",
      backToProjects: "Back to projects",
      backToBlog: "Back to Blog",
      articleDisclaimer: "Synthetic article — structure review only.",
      syntheticOverview: "Synthetic overview",
      contactStatus: "Contact status",
      backNavigation: "Back navigation",
      topics: "Topics",
      reviewedRoutes: "Reviewed routes",
      previewOnly: "Preview only",
      contributionBoundaryBody:
        "Real portfolio content will distinguish the role, team context, individual contribution, and supporting evidence. This synthetic preview demonstrates that structure only.",
      evidenceLabel: "Example verification artifact",
    },
    blogUI: {
      emptyTitle: "Blog",
      emptyBody:
        "No articles have been published yet. Writing will be published here through the local publishing workflow after review.",
      publishedOn: "Published",
      updatedOn: "Updated",
      tableOfContents: "Table of Contents",
      relatedWriting: "Related Writing",
      topics: "Topics",
      feedTitle: "seanchoi.space — Blog",
      feedSubscribe: "Subscribe via Atom",
      translationUnavailable: "Translation unavailable",
      translationUnavailableNotice:
        "This article is currently only available in English.",
      backToBlog: "Back to blog",
      calloutNote: "Note",
      calloutWarning: "Warning",
      calloutInfo: "Info",
      calloutTip: "Tip",
      viewEnglishBlog: "View English blog →",
      viewKoreanBlog: "한국어 블로그 보기 →",
    },
  },
  ko: {
    skipToContent: "본문으로 건너뛰기",
    primaryNavigation: "주요 탐색",
    home: "홈",
    experience: "경력",
    projects: "프로젝트",
    blog: "블로그",
    language: "언어",
    english: "영어",
    korean: "한국어",
    openInNewTab: "새 탭에서 열림",
    homeTitle: "포트폴리오 미리보기",
    homeStatus:
      "이중 언어 포트폴리오 구조를 준비하고 있습니다. 검증된 작업과 글은 검토 후 추가합니다.",
    experienceStatus: "검증된 경력 콘텐츠는 검토 후 추가합니다.",
    projectsStatus:
      "검증 가능한 근거가 준비되는 대로 프로젝트 사례를 추가합니다.",
    blogStatus: "검토된 글은 로컬 게시 절차를 통해 추가합니다.",
    notFoundTitle: "페이지를 찾을 수 없습니다",
    notFoundBody: "요청한 페이지가 없거나 이 언어로 제공되지 않습니다.",
    backHome: "홈으로 돌아가기",
    footerPolicy: "영문을 기본으로 하며, 한국어 콘텐츠는 검토 후 공개합니다.",
    skeleton: {
      eyebrow: "합성 미리보기",
      notice:
        "‘예시’로 표시된 모든 콘텐츠는 합성된 비공개 자료이며 포트폴리오 구조 검토에만 사용됩니다.",
      baseline:
        "레이아웃 검토를 위한 합성 경력 기준이며 실제 소개가 아닙니다.",
      direction:
        "근거 중심의 소프트웨어 및 시스템 작업을 향한 예시 방향입니다.",
      viewProject: "예시 프로젝트 보기",
      selectedEvidence: "선택된 예시 근거",
      experienceSnapshot: "예시 경력 요약",
      professionalExperience: "경력",
      educationAndTraining: "학력 및 교육",
      capabilityEvidence: "근거가 있는 예시 역량",
      recentWriting: "예시 글",
      viewExperience: "경력 구조 보기",
      viewAllProjects: "모든 예시 프로젝트 보기",
      viewBlog: "예시 글 보기",
      contactUnavailable:
        "사실 검토가 완료될 때까지 연락처를 제공하지 않습니다.",
      context: "맥락",
      status: "상태",
      role: "역할",
      contributionBoundary: "기여 범위",
      problemAndConstraints: "문제와 제약 조건",
      decisions: "결정",
      validation: "검증",
      outcome: "결과",
      limitations: "한계",
      evidence: "근거",
      evidenceUnavailable:
        "이 합성 기록에는 검토 가능한 실제 자료가 첨부되지 않았습니다.",
      synthetic: "합성",
      personal: "개인",
      inProgress: "진행 중",
      completed: "완료",
      fullTime: "정규직 예시",
      training: "교육",
      projectEvidence: "프로젝트 근거",
      artifact: "자료",
      backToProjects: "프로젝트로 돌아가기",
      backToBlog: "블로그로 돌아가기",
      articleDisclaimer: "합성 글 — 구조 검토 전용입니다.",
      syntheticOverview: "합성 개요",
      contactStatus: "연락처 상태",
      backNavigation: "이전 페이지 탐색",
      topics: "주제",
      reviewedRoutes: "검토 경로",
      previewOnly: "미리보기 전용",
      contributionBoundaryBody:
        "실제 포트폴리오 콘텐츠에서는 역할, 팀 맥락, 개인 기여, 이를 뒷받침하는 근거를 구분합니다. 이 합성 미리보기는 해당 구조만 보여 줍니다.",
      evidenceLabel: "예시 검증 자료",
    },
    blogUI: {
      emptyTitle: "블로그",
      emptyBody:
        "아직 게시된 글이 없습니다. 검토 후 로컬 게시 워크플로를 통해 이곳에 글이 게시됩니다.",
      publishedOn: "작성일",
      updatedOn: "수정일",
      tableOfContents: "목차",
      relatedWriting: "관련 글",
      topics: "주제",
      feedTitle: "seanchoi.space — Blog",
      feedSubscribe: "Atom 피드 구독",
      translationUnavailable: "번역 미제공",
      translationUnavailableNotice: "이 글은 현재 한국어로만 제공됩니다.",
      backToBlog: "블로그 목록으로",
      calloutNote: "참고",
      calloutWarning: "주의",
      calloutInfo: "안내",
      calloutTip: "팁",
      viewEnglishBlog: "View English blog →",
      viewKoreanBlog: "한국어 블로그 보기 →",
    },
  },
};

export function getDictionary(locale: AppLocale): UIDictionary {
  return dictionaries[locale] || dictionaries.en;
}

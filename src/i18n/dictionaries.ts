import type { AppLocale } from "./config";

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
  },
};

export function getDictionary(locale: AppLocale): UIDictionary {
  return dictionaries[locale] || dictionaries.en;
}

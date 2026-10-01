import type { AppLocale } from "./config";

/** Strings that exist only for synthetic preview content. */
export interface SkeletonDictionary {
  eyebrow: string;
  notice: string;
  articleDisclaimer: string;
  evidenceUnavailable: string;
  personal: string;
  inProgress: string;
}

/** Section labels for project case-study pages. */
export interface CaseStudyDictionary {
  backToProjects: string;
  context: string;
  status: string;
  role: string;
  topics: string;
  contributionBoundary: string;
  problemAndConstraints: string;
  decisions: string;
  validation: string;
  outcome: string;
  limitations: string;
  evidence: string;
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

export interface CareerDictionary {
  homeHeadline: string;
  homePositioning: string;
  viewExperience: string;
  viewProjects: string;
  verifiedExperience: string;
  experienceSnapshot: string;
  currentTraining: string;
  skillsAndEvidence: string;
  contactAndProfiles: string;
  viewFullExperience: string;
  basedIn: string;
  degreeSummary: string;
  experienceTitle: string;
  experienceIntro: string;
  professionalExperience: string;
  educationAndTraining: string;
  sideProjects: string;
  sideProjectsIntro: string;
  trainingExercises: string;
  trainingExercisesSummary: string;
  skillsByLevel: string;
  professionalLevel: string;
  projectLevel: string;
  trainingLevel: string;
  inProgress: string;
  completed: string;
  emailLabel: string;
  githubLabel: string;
  linkedinLabel: string;
  selectedEngineeringEvidence: string;
  selectedEngineeringEvidenceIntro: string;
  currentlyBuilding: string;
  currentlyBuildingIntro: string;
  completedFoundation: string;
  plannedNext: string;
  contributionBoundaryLabel: string;
  engineeringEvidenceIntro: string;
  professionalEvidence: string;
  projectEvidence: string;
  trainingEvidence: string;
  capabilitiesBySystemLayer: string;
  layerInterfaces: string;
  layerApplications: string;
  layerInfrastructure: string;
  layerPhysicalSystems: string;
  layerAiPerception: string;
  professionalWorkLabel: string;
  personalProjectLabel: string;
  exposureLevel: string;
  currentTrainingNote: string;
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
  backNavigation: string;
  siteDescription: string;
  skeleton: SkeletonDictionary;
  caseStudy: CaseStudyDictionary;
  blogUI: BlogDictionary;
  careerUI: CareerDictionary;
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
    homeTitle: "Sean Choi",
    homeStatus:
      "Building software that connects the web and the physical world.",
    experienceStatus:
      "Where I've worked, what I studied, and what I'm learning now.",
    projectsStatus:
      "Web applications, connected equipment, and experiments along the way.",
    blogStatus:
      "Reviewed writing will be added through the local publishing workflow.",
    notFoundTitle: "Page not found",
    notFoundBody:
      "The requested page does not exist or is not available in this language.",
    backHome: "Return home",
    footerPolicy: "© 2026 Sean Choi",
    backNavigation: "Back navigation",
    siteDescription:
      "Sean Choi’s portfolio: web applications and API integration, extending into PLCs and robots.",
    careerUI: {
      homeHeadline:
        "Building software that connects the web and the physical world.",
      homePositioning:
        "My background is in web applications and API integration. I’m now extending that work to PLCs and robots.",
      viewExperience: "View experience",
      viewProjects: "View projects",
      verifiedExperience: "Verified Experience",
      experienceSnapshot: "Verified Experience Snapshot",
      currentTraining: "Current Training & Trajectory",
      skillsAndEvidence: "Skills & Evidence Level",
      contactAndProfiles: "Contact & Public Profiles",
      viewFullExperience: "View full experience",
      basedIn: "Based in South Korea",
      degreeSummary:
        "Bachelor of Applied Science (BASc), Computer Engineering — University of Toronto, 2026",
      experienceTitle: "Experience",
      experienceIntro:
        "Where I've worked, what I studied, and what I'm learning now.",
      professionalExperience: "Professional Experience",
      educationAndTraining: "Education & Training",
      sideProjects: "Self-Directed Projects",
      sideProjectsIntro:
        "Projects I started on my own during the training program, outside the curriculum.",
      trainingExercises: "Lab Exercises",
      trainingExercisesSummary: "Guided exercises from the training program.",
      skillsByLevel: "Skills by Evidence Level",
      professionalLevel: "Professional",
      projectLevel: "Side project",
      trainingLevel: "Training",
      inProgress: "In progress",
      completed: "Completed",
      emailLabel: "Email",
      githubLabel: "GitHub",
      linkedinLabel: "LinkedIn",
      selectedEngineeringEvidence: "Selected work",
      selectedEngineeringEvidenceIntro:
        "A cross-section of verified work showing how interface, application, integration, and physical-system boundaries connect.",
      currentlyBuilding: "Currently Building",
      currentlyBuildingIntro:
        "Exploring how software connects to PLCs, robots, and the equipment around them.",
      completedFoundation: "Completed foundation",
      plannedNext: "Planned next",
      contributionBoundaryLabel: "Contribution boundary",
      engineeringEvidenceIntro:
        "Professional work, side projects, and training exercises, each labeled for what it is.",
      professionalEvidence: "Professional work",
      projectEvidence: "Side projects",
      trainingEvidence: "Hardware explorations",
      capabilitiesBySystemLayer: "Capabilities Across System Layers",
      layerInterfaces: "Operator Interfaces & Visualization",
      layerApplications: "Applications & State",
      layerInfrastructure: "Networking & Infrastructure",
      layerPhysicalSystems: "Controls & Physical Systems",
      layerAiPerception: "AI & Perception",
      professionalWorkLabel: "Professional work",
      personalProjectLabel: "Personal project",
      exposureLevel: "Learning",
      currentTrainingNote:
        "Current study includes PLC/ladder logic, sensors and IoT, industrial networking, Linux, AI/ML, OpenVINO, edge inference, and equipment/OT integration.",
    },
    skeleton: {
      eyebrow: "Synthetic preview",
      notice:
        "All Example-labeled content is synthetic, non-publishable, and shown only to review the portfolio structure.",
      articleDisclaimer: "Synthetic article — structure review only.",
      evidenceUnavailable:
        "No inspectable artifact is attached to this synthetic record.",
      personal: "personal",
      inProgress: "in progress",
    },
    caseStudy: {
      backToProjects: "Back to projects",
      context: "Context",
      status: "Status",
      role: "Role",
      topics: "Topics",
      contributionBoundary: "Contribution boundary",
      problemAndConstraints: "Problem and constraints",
      decisions: "Decisions",
      validation: "Validation",
      outcome: "Outcome",
      limitations: "Limitations",
      evidence: "Evidence",
    },
    blogUI: {
      emptyTitle: "Blog",
      emptyBody: "Nothing published yet. The first posts are on the way.",
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
    homeTitle: "최예현",
    homeStatus:
      "웹에서 시작해, 물리 시스템으로 이어지는 소프트웨어를 만듭니다.",
    experienceStatus: "일해 온 곳, 공부한 것, 지금 배우고 있는 것입니다.",
    projectsStatus:
      "웹 애플리케이션, 장비 연동, 그리고 그 과정에서 만든 실험들.",
    blogStatus: "검토된 글은 로컬 게시 절차를 통해 추가합니다.",
    notFoundTitle: "페이지를 찾을 수 없습니다",
    notFoundBody: "요청한 페이지가 없거나 이 언어로 제공되지 않습니다.",
    backHome: "홈으로 돌아가기",
    footerPolicy: "© 2026 최예현",
    backNavigation: "이전 페이지 탐색",
    siteDescription:
      "웹 애플리케이션과 API 연동에서 PLC와 로봇으로 작업을 확장하는 최예현의 포트폴리오입니다.",
    careerUI: {
      homeHeadline:
        "웹에서 시작해, 물리 시스템으로 이어지는 소프트웨어를 만듭니다.",
      homePositioning:
        "웹 애플리케이션과 API 연동 경험을 바탕으로, 지금은 PLC와 로봇을 연결하는 작업을 하고 있습니다.",
      viewExperience: "경력 보기",
      viewProjects: "프로젝트 보기",
      verifiedExperience: "검증된 실무 경력",
      experienceSnapshot: "주요 경력 요약",
      currentTraining: "현재 교육 및 학습 방향",
      skillsAndEvidence: "기술 역량 및 근거 수준",
      contactAndProfiles: "연락처 및 프로필",
      viewFullExperience: "전체 경력 보기",
      basedIn: "대한민국 거주",
      degreeSummary: "토론토대학교 응용과학 학사(BASc), 컴퓨터공학, 2026",
      experienceTitle: "경력",
      experienceIntro: "일해 온 곳, 공부한 것, 지금 배우고 있는 것입니다.",
      professionalExperience: "실무 경력",
      educationAndTraining: "학력 및 교육",
      sideProjects: "사이드 프로젝트",
      sideProjectsIntro:
        "교육 기간 중 정규 커리큘럼 외 자발적으로 진행한 독립 프로젝트입니다.",
      trainingExercises: "교육 과정 실습",
      trainingExercisesSummary: "교육 과정에서 진행한 가이드 기반 실습입니다.",
      skillsByLevel: "기술 역량 및 근거 수준",
      professionalLevel: "실무",
      projectLevel: "사이드 프로젝트",
      trainingLevel: "교육",
      inProgress: "진행 중",
      completed: "완료",
      emailLabel: "이메일",
      githubLabel: "GitHub",
      linkedinLabel: "LinkedIn",
      selectedEngineeringEvidence: "만든 것들",
      selectedEngineeringEvidenceIntro:
        "인터페이스, 애플리케이션, 시스템 연동, 물리 시스템의 경계가 어떻게 이어지는지 보여 주는 검증된 작업을 선별했습니다.",
      currentlyBuilding: "현재 만들고 있는 것",
      currentlyBuildingIntro:
        "PLC, 로봇, 주변 장비를 소프트웨어로 연결하는 방법을 탐구하고 있습니다.",
      completedFoundation: "완료한 기반",
      plannedNext: "다음 계획",
      contributionBoundaryLabel: "기여 범위",
      engineeringEvidenceIntro:
        "실무, 사이드 프로젝트, 교육 실습을 구분해 정리했습니다.",
      professionalEvidence: "실무 프로젝트",
      projectEvidence: "사이드 프로젝트",
      trainingEvidence: "하드웨어 실습",
      capabilitiesBySystemLayer: "시스템 계층별 역량",
      layerInterfaces: "운영자 인터페이스 및 시각화",
      layerApplications: "애플리케이션 및 상태",
      layerInfrastructure: "네트워킹 및 인프라",
      layerPhysicalSystems: "제어 및 물리 시스템",
      layerAiPerception: "AI 및 인지",
      professionalWorkLabel: "실무 프로젝트",
      personalProjectLabel: "개인 프로젝트",
      exposureLevel: "학습",
      currentTrainingNote:
        "기존 소프트웨어 개발 역량을 산업 현장과 연결하기 위해 학습 범위를 확장하고 있습니다. 현재 PLC/래더 로직, 센서와 IoT, 산업 네트워크, Linux, AI/ML, OpenVINO, 엣지 추론, 설비/OT 연동을 학습·실습하고 있습니다.",
    },
    skeleton: {
      eyebrow: "합성 미리보기",
      notice:
        "‘예시’로 표시된 모든 콘텐츠는 합성된 비공개 자료이며 포트폴리오 구조 검토에만 사용됩니다.",
      articleDisclaimer: "합성 글 — 구조 검토 전용입니다.",
      evidenceUnavailable:
        "이 합성 기록에는 검토 가능한 실제 자료가 첨부되지 않았습니다.",
      personal: "개인",
      inProgress: "진행 중",
    },
    caseStudy: {
      backToProjects: "프로젝트로 돌아가기",
      context: "맥락",
      status: "상태",
      role: "역할",
      topics: "주제",
      contributionBoundary: "기여 범위",
      problemAndConstraints: "문제와 제약 조건",
      decisions: "결정",
      validation: "검증",
      outcome: "결과",
      limitations: "한계",
      evidence: "근거",
    },
    blogUI: {
      emptyTitle: "블로그",
      emptyBody: "아직 게시된 글이 없습니다. 첫 글을 준비하고 있습니다.",
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

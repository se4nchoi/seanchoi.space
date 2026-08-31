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
  contributionBoundaries: string;
  boundaryEmgTitle: string;
  boundaryEmgBody: string;
  boundaryMilitaryTitle: string;
  boundaryMilitaryBody: string;
  boundaryTrainingTitle: string;
  boundaryTrainingBody: string;
  professionalLevel: string;
  projectLevel: string;
  trainingLevel: string;
  inProgress: string;
  completed: string;
  emailLabel: string;
  githubLabel: string;
  linkedinLabel: string;
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
      "Software developer connecting web interfaces with operational systems.",
    experienceStatus:
      "Verified professional experience, education, training, and technical capability evidence.",
    projectsStatus:
      "Verified project case studies will be added as evidence becomes available.",
    blogStatus:
      "Reviewed writing will be added through the local publishing workflow.",
    notFoundTitle: "Page not found",
    notFoundBody:
      "The requested page does not exist or is not available in this language.",
    backHome: "Return home",
    footerPolicy: "English-first. Korean content is published after review.",
    careerUI: {
      homeHeadline:
        "Software developer connecting web interfaces with operational systems.",
      homePositioning:
        "Computer Engineering graduate with professional experience across frontend applications, full-stack product development, and API integration. Currently extending that foundation through in-progress training in automation, Physical AI, and smart-factory systems.",
      viewExperience: "View experience",
      viewProjects: "View projects",
      verifiedExperience: "Verified Experience",
      experienceSnapshot: "Verified Experience Snapshot",
      currentTraining: "Current Training & Trajectory",
      skillsAndEvidence: "Skills & Evidence Level",
      contactAndProfiles: "Contact & Public Profiles",
      viewFullExperience: "View full experience & contribution boundaries",
      basedIn: "Based in South Korea",
      degreeSummary:
        "Bachelor of Applied Science (BASc), Computer Engineering — University of Toronto, 2026",
      experienceTitle: "Experience",
      experienceIntro:
        "Verified professional experience, education, training, and technical capability evidence.",
      professionalExperience: "Professional Experience",
      educationAndTraining: "Education & Training",
      sideProjects: "Self-Directed Projects",
      sideProjectsIntro:
        "Independent projects initiated outside the curriculum during the training period.",
      trainingExercises: "In-Class Implementation Exercises",
      trainingExercisesSummary:
        "Hands-on implementation of PLC ladder logic, Arduino microcontroller circuits, sensor/IoT data acquisition, and local network configuration.",
      skillsByLevel: "Skills by Evidence Level",
      contributionBoundaries:
        "Contribution Boundaries & Disclosure Safeguards",
      boundaryEmgTitle: "EMG Global — System & API Boundaries",
      boundaryEmgBody:
        "Sean implemented the React UI and vehicle control integration on a physical vehicle. The embedded module and HTTPS API were supplied by their identified teams; APIs and streams were built by other engineers. Sean did not own backend, WebSocket, data-pipeline, firmware, embedded, or native-Android software.",
      boundaryMilitaryTitle:
        "Korea Defense Intelligence Command (KDIC) — Automation Scope & Confidentiality",
      boundaryMilitaryBody:
        "JavaScript Hangul decomposition/dictionary replacement and VBA file/Explorer workflow automation methods and IT coordination are disclosure-safe. All processed document contents, translated materials, and sensitive operational contexts remain strictly confidential.",
      boundaryTrainingTitle: "Training Trajectory vs. Production Ownership",
      boundaryTrainingBody:
        "Coursework, exercises, and in-progress training in smart factory and physical AI represent active learning and skill expansion, not professional production experience.",
      professionalLevel: "Professional evidence",
      projectLevel: "Project evidence",
      trainingLevel: "Training evidence",
      inProgress: "In progress",
      completed: "Completed",
      emailLabel: "Email",
      githubLabel: "GitHub",
      linkedinLabel: "LinkedIn",
    },
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
    homeTitle: "최예현",
    homeStatus:
      "프론트엔드를 기반으로 풀스택 개발과 시스템 연동까지 경험을 확장해 온 소프트웨어 개발자.",
    experienceStatus: "검증된 실무 경력, 학력, 교육 및 기술 역량 근거입니다.",
    projectsStatus:
      "검증 가능한 근거가 준비되는 대로 프로젝트 사례를 추가합니다.",
    blogStatus: "검토된 글은 로컬 게시 절차를 통해 추가합니다.",
    notFoundTitle: "페이지를 찾을 수 없습니다",
    notFoundBody: "요청한 페이지가 없거나 이 언어로 제공되지 않습니다.",
    backHome: "홈으로 돌아가기",
    footerPolicy: "영문을 기본으로 하며, 한국어 콘텐츠는 검토 후 공개합니다.",
    careerUI: {
      homeHeadline:
        "프론트엔드를 기반으로 풀스택 개발과 시스템 연동까지 경험을 확장해 온 소프트웨어 개발자.",
      homePositioning:
        "컴퓨터공학을 전공했으며, 프론트엔드 애플리케이션과 사내 제품의 풀스택 개발, API 연동 실무 경험이 있습니다. 현재는 기존 소프트웨어 역량을 자동화, Physical AI, 스마트팩토리 시스템으로 확장하기 위해 관련 교육과 실습을 이어가고 있습니다.",
      viewExperience: "경력 보기",
      viewProjects: "프로젝트 보기",
      verifiedExperience: "검증된 실무 경력",
      experienceSnapshot: "주요 경력 요약",
      currentTraining: "현재 교육 및 학습 방향",
      skillsAndEvidence: "기술 역량 및 근거 수준",
      contactAndProfiles: "연락처 및 프로필",
      viewFullExperience: "전체 경력 및 기여 범위 보기",
      basedIn: "대한민국 거주",
      degreeSummary: "토론토대학교 응용과학 학사(BASc), 컴퓨터공학, 2026",
      experienceTitle: "경력",
      experienceIntro: "검증된 실무 경력, 학력, 교육 및 기술 역량 근거입니다.",
      professionalExperience: "실무 경력",
      educationAndTraining: "학력 및 교육",
      sideProjects: "사이드 프로젝트",
      sideProjectsIntro:
        "교육 기간 중 정규 커리큘럼 외 자발적으로 진행한 독립 프로젝트입니다.",
      trainingExercises: "수업 내 구현 실습",
      trainingExercisesSummary:
        "PLC, Arduino, 센서, 로컬 네트워크를 직접 구성하고 동작을 확인한 실습입니다.",
      skillsByLevel: "기술 역량 및 근거 수준",
      contributionBoundaries: "기여 범위 및 보안 안내",
      boundaryEmgTitle: "EMG Global — 시스템 및 연동 경계",
      boundaryEmgBody:
        "실차 환경에서 동작하는 React UI와 도어락 제어 연동을 구현했습니다. 임베디드 모듈과 HTTPS API는 전담 팀에서 제공했으며, API 및 스트림은 다른 엔지니어가 구축했습니다. 백엔드, 웹소켓, 데이터 파이프라인, 펌웨어, 임베디드 장치 소프트웨어 또는 네이티브 Android에 대한 소유권은 포함되지 않았습니다.",
      boundaryMilitaryTitle:
        "KDIC (국군정보사령부) — 자동화 도구 범위 및 보안 원칙",
      boundaryMilitaryBody:
        "JavaScript 한글 분해/용어 사전 치환 및 VBA 파일/탐색기 자동화 작업 방식과 협의 과정은 공개 가능하나, 처리된 모든 문서 내용과 세부 업무 맥락은 엄격한 보안 사항으로 비공개입니다.",
      boundaryTrainingTitle: "교육 실습 및 학습 방향 안내",
      boundaryTrainingBody:
        "스마트팩토리 및 Physical AI 관련 교육, 실습 및 학습 내용은 현재 진행 중인 역량 확장 과정이며, 실무 상용 배포 경력으로 표현하지 않습니다.",
      professionalLevel: "실무 근거",
      projectLevel: "프로젝트 근거",
      trainingLevel: "교육 근거",
      inProgress: "진행 중",
      completed: "완료",
      emailLabel: "이메일",
      githubLabel: "GitHub",
      linkedinLabel: "LinkedIn",
    },
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

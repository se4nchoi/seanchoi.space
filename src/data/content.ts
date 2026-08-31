import type {
  ContentRegistry,
  LocalizedText,
  DateRange,
} from "@/lib/content/schemas";
import type { AppLocale } from "@/i18n/config";

export const canonicalContentRegistry: ContentRegistry = {
  siteIdentity: {
    id: "sean-choi",
    publicationStatus: "public",
    claimState: "verified",
    syntheticPlaceholder: false,
    reviewedOn: "2026-08-31",
    displayName: {
      en: "Sean Choi",
      ko: "최예현",
      koReview: "reviewed",
    },
    location: {
      en: "South Korea",
      ko: "대한민국",
      koReview: "reviewed",
    },
    recruitingEmail: "se4n.choi@gmail.com",
    trajectory: {
      en: "Computer Engineering graduate with professional experience across frontend applications, full-stack product development, and API integration. Currently extending that foundation through in-progress training in automation, Physical AI, and smart-factory systems.",
      ko: "컴퓨터공학을 전공했으며, 프론트엔드 애플리케이션과 사내 제품의 풀스택 개발, API 연동 실무 경험이 있습니다. 현재는 기존 소프트웨어 역량을 자동화, Physical AI, 스마트팩토리 시스템으로 확장하기 위해 관련 교육과 실습을 이어가고 있습니다.",
      koReview: "reviewed",
    },
    linkIds: ["link-github", "link-linkedin", "link-email"],
  },

  links: [
    {
      id: "link-github",
      publicationStatus: "public",
      claimState: "verified",
      syntheticPlaceholder: false,
      reviewedOn: "2026-08-31",
      kind: "github",
      label: {
        en: "GitHub",
        ko: "GitHub",
        koReview: "reviewed",
      },
      href: "https://github.com/se4nchoi",
    },
    {
      id: "link-linkedin",
      publicationStatus: "public",
      claimState: "verified",
      syntheticPlaceholder: false,
      reviewedOn: "2026-08-31",
      kind: "linkedin",
      label: {
        en: "LinkedIn",
        ko: "LinkedIn",
        koReview: "reviewed",
      },
      href: "https://www.linkedin.com/in/se4nchoi/",
    },
    {
      id: "link-email",
      publicationStatus: "public",
      claimState: "verified",
      syntheticPlaceholder: false,
      reviewedOn: "2026-08-31",
      kind: "email",
      label: {
        en: "Email",
        ko: "이메일",
        koReview: "reviewed",
      },
      href: "mailto:se4n.choi@gmail.com",
    },
  ],

  evidence: [
    {
      id: "evidence-degree",
      publicationStatus: "public",
      claimState: "verified",
      syntheticPlaceholder: false,
      reviewedOn: "2026-08-31",
      label: "BASc in Computer Engineering, University of Toronto, conferred June 2026",
      level: "training",
      sourceKind: "direct-confirmation",
      publiclyInspectable: false,
    },
    {
      id: "evidence-training-program",
      publicationStatus: "public",
      claimState: "verified",
      syntheticPlaceholder: false,
      reviewedOn: "2026-08-31",
      label: "Intel AI DX Masterclass training program at Busan HRD Center (June–December 2026, in progress)",
      level: "training",
      sourceKind: "direct-confirmation",
      publiclyInspectable: false,
    },
    {
      id: "evidence-hoek",
      publicationStatus: "public",
      claimState: "verified",
      syntheticPlaceholder: false,
      reviewedOn: "2026-08-31",
      label: "Software Developer at Hoek Agency (September 2022–August 2023)",
      level: "professional",
      sourceKind: "direct-confirmation",
      publiclyInspectable: false,
    },
    {
      id: "evidence-emg",
      publicationStatus: "public",
      claimState: "verified",
      syntheticPlaceholder: false,
      reviewedOn: "2026-08-31",
      label: "Software Developer at EMG Global (July 2021–July 2022)",
      level: "professional",
      sourceKind: "direct-confirmation",
      publiclyInspectable: false,
    },
    {
      id: "evidence-kdic",
      publicationStatus: "public",
      claimState: "verified",
      syntheticPlaceholder: false,
      reviewedOn: "2026-08-31",
      label: "Sergeant / English Interpreter service at KDIC (October 2016–July 2018)",
      level: "professional",
      sourceKind: "direct-confirmation",
      publiclyInspectable: false,
    },
    {
      id: "evidence-lan-chat",
      publicationStatus: "public",
      claimState: "verified",
      syntheticPlaceholder: false,
      reviewedOn: "2026-08-31",
      label: "Self-directed Classroom LAN Chat application (FastAPI, WebSocket, SQLite)",
      level: "project",
      sourceKind: "direct-confirmation",
      publiclyInspectable: false,
    },
    {
      id: "evidence-qa-board",
      publicationStatus: "public",
      claimState: "verified",
      syntheticPlaceholder: false,
      reviewedOn: "2026-08-31",
      label: "Self-directed Classroom Q&A Board application (four-person MVP, backend/database integration)",
      level: "project",
      sourceKind: "direct-confirmation",
      publiclyInspectable: false,
    },
    {
      id: "evidence-training-exercises",
      publicationStatus: "public",
      claimState: "verified",
      syntheticPlaceholder: false,
      reviewedOn: "2026-08-31",
      label: "In-class implementation exercises (PLC, Arduino, sensors, and local networking)",
      level: "training",
      sourceKind: "direct-confirmation",
      publiclyInspectable: false,
    },
  ],

  experiences: [
    {
      id: "exp-hoek",
      publicationStatus: "public",
      claimState: "verified",
      syntheticPlaceholder: false,
      reviewedOn: "2026-08-31",
      organization: {
        en: "Hoek Agency",
        ko: "Hoek Agency (획기획)",
        koReview: "reviewed",
      },
      role: {
        en: "Software Developer — Frontend to Full-Stack",
        ko: "개발자 | 프론트엔드·풀스택 개발",
        koReview: "reviewed",
      },
      dateRange: {
        start: "2022-09",
        end: "2023-08",
        ongoing: false,
      },
      employmentType: "other",
      summary: {
        en: "Worked across frontend applications and internal product development. For an internal attendance product, contributed beyond the interface layer through Koa and MySQL backend development.",
        ko: "사내 애플리케이션과 제품 개발에 참여했습니다. 사내 인사·근태 관리 제품에서는 프론트엔드뿐 아니라 Koa와 MySQL 기반 백엔드 개발에도 참여했습니다.",
        koReview: "reviewed",
      },
      contributions: [
        {
          text: {
            en: "Developed frontend user interfaces and internal web applications across client and internal projects.",
            ko: "고객사 및 사내 프로젝트의 프론트엔드 사용자 인터페이스와 사내 웹 애플리케이션을 개발했습니다.",
            koReview: "reviewed",
          },
          evidenceIds: ["evidence-hoek"],
        },
        {
          text: {
            en: "Contributed Koa and MySQL backend development for an internal attendance management product.",
            ko: "사내 인사·근태 관리 제품에서 Koa 및 MySQL 기반 백엔드 개발을 수행했습니다.",
            koReview: "reviewed",
          },
          evidenceIds: ["evidence-hoek"],
        },
      ],
      evidenceIds: ["evidence-hoek"],
    },
    {
      id: "exp-emg",
      publicationStatus: "public",
      claimState: "verified",
      syntheticPlaceholder: false,
      reviewedOn: "2026-08-31",
      organization: {
        en: "EMG Global",
        ko: "EMG Global",
        koReview: "reviewed",
      },
      role: {
        en: "Software Developer",
        ko: "소프트웨어 개발자",
        koReview: "reviewed",
      },
      dateRange: {
        start: "2021-07",
        end: "2022-07",
        ongoing: false,
      },
      employmentType: "other",
      summary: {
        en: "Implemented frontend interfaces that integrated with APIs and streams built by other teams.",
        ko: "다른 팀이 제공한 API와 데이터 스트림을 연동해 프론트엔드 인터페이스를 구현했습니다.",
        koReview: "reviewed",
      },
      contributions: [
        {
          text: {
            en: "Built frontend web interfaces integrating with backend HTTPS APIs and data streams.",
            ko: "다른 팀이 구축한 백엔드 HTTPS API 및 데이터 스트림과 연동하는 프론트엔드 웹 인터페이스를 구현했습니다.",
            koReview: "reviewed",
          },
          evidenceIds: ["evidence-emg"],
        },
        {
          text: {
            en: "For a vehicle door-lock feature, implemented the React UI and control integration on a real vehicle while embedded and backend teams provided the module and API.",
            ko: "차량 도어록 기능에서 임베디드 팀이 모듈을, 백엔드 팀이 HTTPS API를 담당하였으며, 실차에서 동작하는 React UI와 제어 연동을 구현했습니다.",
            koReview: "reviewed",
          },
          evidenceIds: ["evidence-emg"],
        },
      ],
      evidenceIds: ["evidence-emg"],
    },
    {
      id: "exp-kdic",
      publicationStatus: "public",
      claimState: "verified",
      syntheticPlaceholder: false,
      reviewedOn: "2026-08-31",
      organization: {
        en: "Korea Defense Intelligence Command",
        ko: "KDIC (국군정보사령부)",
        koReview: "reviewed",
      },
      role: {
        en: "Sergeant / English Interpreter",
        ko: "영어어학병",
        koReview: "reviewed",
      },
      dateRange: {
        start: "2016-10",
        end: "2018-07",
        ongoing: false,
      },
      employmentType: "military",
      summary: {
        en: "Worked in bilingual communication and translation within a structured environment.",
        ko: "보안이 요구되는 환경에서 한영 의사소통과 통번역 업무를 수행했습니다.",
        koReview: "reviewed",
      },
      contributions: [
        {
          text: {
            en: "Built JavaScript utilities for Hangul text decomposition and dictionary-driven Korean-to-English replacement actions.",
            ko: "반복 작업을 줄이기 위해 JavaScript로 한글 텍스트 분해 및 내부 용어 사전 기반 한-영 치환 작업을 자동화했습니다.",
            koReview: "reviewed",
          },
          evidenceIds: ["evidence-kdic"],
        },
        {
          text: {
            en: "Built VBA utilities for file renaming and Windows Explorer workflow actions to reduce repetitive translation steps.",
            ko: "VBA로 파일명 변경과 Windows 탐색기 기반 작업을 자동화하여 반복적인 번역 절차를 줄였습니다.",
            koReview: "reviewed",
          },
          evidenceIds: ["evidence-kdic"],
        },
        {
          text: {
            en: "Coordinated permitted execution methods with on-premise Korean and U.S. IT teams in an environment where PowerShell was prohibited.",
            ko: "PowerShell 사용이 금지된 온프레미스 환경에서 한미 IT 담당자와 협의하여 허용 가능한 실행 방식을 조율했습니다.",
            koReview: "reviewed",
          },
          evidenceIds: ["evidence-kdic"],
        },
      ],
      evidenceIds: ["evidence-kdic"],
    },
  ],

  educationAndTraining: [
    {
      id: "edu-uoft",
      publicationStatus: "public",
      claimState: "verified",
      syntheticPlaceholder: false,
      reviewedOn: "2026-08-31",
      kind: "education",
      institution: {
        en: "University of Toronto",
        ko: "토론토대학교",
        koReview: "reviewed",
      },
      program: {
        en: "Bachelor of Applied Science (BASc), Computer Engineering",
        ko: "응용과학 학사(BASc), 컴퓨터공학",
        koReview: "reviewed",
      },
      status: "completed",
      dateRange: {
        start: null,
        end: "2026-06",
        ongoing: false,
      },
      evidenceLevel: "training",
      evidenceIds: ["evidence-degree"],
    },
    {
      id: "training-busan-dx",
      publicationStatus: "public",
      claimState: "verified",
      syntheticPlaceholder: false,
      reviewedOn: "2026-08-31",
      kind: "training",
      institution: {
        en: "Physical AI & Smart Factory Training Program",
        ko: "부산인력개발원 - Intel",
        koReview: "reviewed",
      },
      program: {
        en: "Physical AI & Smart Factory Training Program",
        ko: "AI 융합 DX 마스터클래스",
        koReview: "reviewed",
      },
      status: "in-progress",
      dateRange: {
        start: "2026-06",
        end: "2026-12",
        ongoing: true,
      },
      evidenceLevel: "training",
      evidenceIds: ["evidence-training-program"],
    },
  ],

  skills: [
    // Professional Evidence
    {
      id: "skill-frontend-react",
      publicationStatus: "public",
      claimState: "verified",
      syntheticPlaceholder: false,
      reviewedOn: "2026-08-31",
      name: {
        en: "Frontend Development / React",
        ko: "프론트엔드 개발 / React",
        koReview: "reviewed",
      },
      evidenceLevel: "professional",
      prominence: "featured",
      evidenceIds: ["evidence-emg", "evidence-hoek"],
    },
    {
      id: "skill-api-integration",
      publicationStatus: "public",
      claimState: "verified",
      syntheticPlaceholder: false,
      reviewedOn: "2026-08-31",
      name: {
        en: "API & Stream Integration",
        ko: "API 및 데이터 스트림 연동",
        koReview: "reviewed",
      },
      evidenceLevel: "professional",
      prominence: "featured",
      evidenceIds: ["evidence-emg"],
    },
    {
      id: "skill-backend-koa-mysql",
      publicationStatus: "public",
      claimState: "verified",
      syntheticPlaceholder: false,
      reviewedOn: "2026-08-31",
      name: {
        en: "Koa / MySQL Backend Development",
        ko: "Koa / MySQL 백엔드 개발",
        koReview: "reviewed",
      },
      evidenceLevel: "professional",
      prominence: "featured",
      evidenceIds: ["evidence-hoek"],
    },
    {
      id: "skill-workflow-automation",
      publicationStatus: "public",
      claimState: "verified",
      syntheticPlaceholder: false,
      reviewedOn: "2026-08-31",
      name: {
        en: "JavaScript & VBA Workflow Automation",
        ko: "JavaScript / VBA 업무 자동화",
        koReview: "reviewed",
      },
      evidenceLevel: "professional",
      prominence: "supporting",
      evidenceIds: ["evidence-kdic"],
    },

    // Project Evidence (Self-Directed Classroom Projects)
    {
      id: "skill-fastapi-sqlite",
      publicationStatus: "public",
      claimState: "verified",
      syntheticPlaceholder: false,
      reviewedOn: "2026-08-31",
      name: {
        en: "FastAPI & SQLite",
        ko: "FastAPI 및 SQLite",
        koReview: "reviewed",
      },
      evidenceLevel: "project",
      prominence: "featured",
      evidenceIds: ["evidence-lan-chat"],
    },
    {
      id: "skill-websocket",
      publicationStatus: "public",
      claimState: "verified",
      syntheticPlaceholder: false,
      reviewedOn: "2026-08-31",
      name: {
        en: "WebSocket Real-Time Communication",
        ko: "WebSocket 실시간 통신",
        koReview: "reviewed",
      },
      evidenceLevel: "project",
      prominence: "supporting",
      evidenceIds: ["evidence-lan-chat"],
    },
    {
      id: "skill-backend-db-integration",
      publicationStatus: "public",
      claimState: "verified",
      syntheticPlaceholder: false,
      reviewedOn: "2026-08-31",
      name: {
        en: "Backend & Database Integration",
        ko: "백엔드 및 데이터베이스 연동",
        koReview: "reviewed",
      },
      evidenceLevel: "project",
      prominence: "supporting",
      evidenceIds: ["evidence-qa-board"],
    },

    // Training Evidence (Coursework & Lab Exercises)
    {
      id: "skill-plc-ladder",
      publicationStatus: "public",
      claimState: "verified",
      syntheticPlaceholder: false,
      reviewedOn: "2026-08-31",
      name: {
        en: "PLC & Ladder Logic",
        ko: "PLC 및 래더 로직",
        koReview: "reviewed",
      },
      evidenceLevel: "training",
      prominence: "supporting",
      evidenceIds: ["evidence-training-program", "evidence-training-exercises"],
    },
    {
      id: "skill-sensors-iot",
      publicationStatus: "public",
      claimState: "verified",
      syntheticPlaceholder: false,
      reviewedOn: "2026-08-31",
      name: {
        en: "Arduino & Sensors / IoT",
        ko: "Arduino 및 센서 / IoT",
        koReview: "reviewed",
      },
      evidenceLevel: "training",
      prominence: "supporting",
      evidenceIds: ["evidence-training-program", "evidence-training-exercises"],
    },
    {
      id: "skill-industrial-net-linux",
      publicationStatus: "public",
      claimState: "verified",
      syntheticPlaceholder: false,
      reviewedOn: "2026-08-31",
      name: {
        en: "Industrial Networking & Linux",
        ko: "산업용 네트워크 및 Linux",
        koReview: "reviewed",
      },
      evidenceLevel: "training",
      prominence: "supporting",
      evidenceIds: ["evidence-training-program"],
    },
    {
      id: "skill-edge-inference",
      publicationStatus: "public",
      claimState: "verified",
      syntheticPlaceholder: false,
      reviewedOn: "2026-08-31",
      name: {
        en: "AI/ML, OpenVINO & Edge Inference (In Training)",
        ko: "AI/ML, OpenVINO 및 엣지 추론 (학습 중)",
        koReview: "reviewed",
      },
      evidenceLevel: "training",
      prominence: "supporting",
      evidenceIds: ["evidence-training-program"],
    },
  ],

  projects: [],
  articles: [],
  supportingProjects: [
    {
      id: "project-lan-chat",
      publicationStatus: "public",
      claimState: "verified",
      syntheticPlaceholder: false,
      reviewedOn: "2026-08-31",
      context: "self-directed",
      evidenceLevel: "project",
      title: {
        en: "Classroom LAN Chat",
        ko: "Classroom LAN Chat",
        koReview: "reviewed",
      },
      summary: {
        en: "FastAPI, WebSocket, and SQLite application used by 22 classmates.",
        ko: "FastAPI, WebSocket, SQLite 기반 LAN 채팅 애플리케이션으로, 동료 수강생 22명이 사용했습니다.",
        koReview: "reviewed",
      },
      technologies: ["FastAPI", "WebSocket", "SQLite", "LAN"],
      evidenceIds: ["evidence-lan-chat"],
    },
    {
      id: "project-qa-board",
      publicationStatus: "public",
      claimState: "verified",
      syntheticPlaceholder: false,
      reviewedOn: "2026-08-31",
      context: "self-directed",
      evidenceLevel: "project",
      title: {
        en: "Classroom Q&A Board (대나무지식인)",
        ko: "Classroom Q&A Board (대나무지식인)",
        koReview: "reviewed",
      },
      summary: {
        en: "Four-person classroom Q&A MVP; responsible for backend and database integration.",
        ko: "4인 팀으로 개발한 교실 Q&A MVP에서 백엔드와 데이터베이스 연동을 담당했습니다.",
        koReview: "reviewed",
      },
      role: {
        en: "Backend & Database Integration",
        ko: "백엔드 및 데이터베이스 연동",
        koReview: "reviewed",
      },
      technologies: ["Backend & Database Integration", "Team MVP"],
      evidenceIds: ["evidence-qa-board"],
    },
    {
      id: "project-training-exercises",
      publicationStatus: "public",
      claimState: "verified",
      syntheticPlaceholder: false,
      reviewedOn: "2026-08-31",
      context: "training-exercise",
      evidenceLevel: "training",
      title: {
        en: "In-Class Implementation Exercises",
        ko: "수업 내 구현 실습",
        koReview: "reviewed",
      },
      summary: {
        en: "Hands-on implementation of PLC ladder logic, Arduino microcontroller circuits, sensor/IoT data acquisition, and local network configuration.",
        ko: "PLC 래더 로직, Arduino 마이크로컨트롤러 회로, 센서/IoT 데이터 수집 및 로컬 네트워크 환경을 직접 구성하고 동작을 확인했습니다.",
        koReview: "reviewed",
      },
      technologies: ["PLC", "Ladder Logic", "Arduino", "Sensors", "IoT", "Networking"],
      evidenceIds: ["evidence-training-exercises"],
    },
  ],
};

export const canonicalSupportingProjects = canonicalContentRegistry.supportingProjects;

// Helper functions for accessing localized content cleanly
export function formatDateRange(
  dateRange: DateRange,
  locale: AppLocale = "en"
): string {
  const isKo = locale === "ko";
  const { start, end, ongoing } = dateRange;

  if (start === null && end !== null) {
    return isKo ? `${end.replace("-", "년 ")}월 졸업` : `Conferred ${end}`;
  }

  if (start !== null) {
    if (ongoing) {
      const inProgressLabel = isKo ? "진행 중" : "In progress";
      if (end !== null) {
        return `${start} — ${end} (${inProgressLabel})`;
      }
      return isKo ? `${start} — 진행 중` : `${start} — Present`;
    }
    if (end !== null) {
      return `${start} — ${end}`;
    }
  }

  return "";
}

export function getLocalizedText(text: LocalizedText, locale: AppLocale): string {
  if (locale === "ko" && text.ko && text.koReview === "reviewed") {
    return text.ko;
  }
  return text.en;
}

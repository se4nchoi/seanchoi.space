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
    reviewedOn: "2026-09-17",
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
      en: "Computer Engineering graduate with professional experience in frontend applications, full-stack internal systems, and operational API integration. Currently extending that software foundation into automation and robot-cell integration through hands-on training and self-directed work.",
      ko: "컴퓨터공학을 전공하고 프론트엔드 애플리케이션, 사내 풀스택 시스템, 운영 API 연동 실무 경험을 쌓았습니다. 현재는 실습 교육과 자기주도 프로젝트를 통해 기존 소프트웨어 역량을 자동화와 로봇 셀 통합으로 확장하고 있습니다.",
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
      label: "Physical AI & Smart Factory Training Program (June–December 2026, in progress)",
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
    {
      id: "evidence-emg-ruta40",
      publicationStatus: "public",
      claimState: "verified",
      syntheticPlaceholder: false,
      reviewedOn: "2026-09-17",
      label: "RUTA40 React UI and HTTPS control integration on a real vehicle",
      level: "professional",
      sourceKind: "direct-confirmation",
      publiclyInspectable: false,
    },
    {
      id: "evidence-emg-smart-city",
      publicationStatus: "public",
      claimState: "verified",
      syntheticPlaceholder: false,
      reviewedOn: "2026-09-17",
      label: "Daegu Smart City frontend API/stream integration and visualization",
      level: "professional",
      sourceKind: "direct-confirmation",
      publiclyInspectable: false,
    },
    {
      id: "evidence-hoek-immersion",
      publicationStatus: "public",
      claimState: "verified",
      syntheticPlaceholder: false,
      reviewedOn: "2026-09-17",
      label: "Internal Attendance / HR Product (몰입도) application-state and workday rules",
      level: "professional",
      sourceKind: "direct-confirmation",
      publiclyInspectable: false,
    },
    {
      id: "evidence-plc-robot-cell",
      publicationStatus: "public",
      claimState: "verified",
      syntheticPlaceholder: false,
      reviewedOn: "2026-09-17",
      label: "Guided Mitsubishi PLC, CC-Link, Neuromeka robot-arm, and servo loading-dock integration exercise",
      level: "training",
      sourceKind: "direct-confirmation",
      publiclyInspectable: false,
    },
    {
      id: "evidence-ros2-robot-cell",
      publicationStatus: "public",
      claimState: "verified",
      syntheticPlaceholder: false,
      reviewedOn: "2026-09-17",
      label: "Self-directed ROS2 Industrial Robot Cell Integration work in progress on shared training-facility hardware",
      level: "project",
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
      reviewedOn: "2026-09-17",
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
        en: "Worked across frontend applications and internal product development. For Internal Attendance / HR Product (몰입도), contributed beyond the interface layer through Koa and MySQL backend development and application-state rules.",
        ko: "사내 애플리케이션과 제품 개발에 참여했습니다. 사내 근태·HR 시스템 몰입도에서는 프론트엔드뿐 아니라 Koa와 MySQL 기반 백엔드 및 애플리케이션 상태 규칙 구현에도 참여했습니다.",
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
          evidenceIds: ["evidence-hoek", "evidence-hoek-immersion"],
        },
        {
          text: {
            en: "Translated attendance-domain rules into application state: active-session checks, multiple work and break periods, and a 06:00 operational boundary for overnight workdays.",
            ko: "활성 근무 세션 확인, 복수 근무·휴게 구간, 야간 근무를 위한 06:00 운영일 경계 등 근태 업무 규칙을 애플리케이션 상태로 구현했습니다.",
            koReview: "reviewed",
          },
          evidenceIds: ["evidence-hoek-immersion"],
        },
      ],
      evidenceIds: ["evidence-hoek", "evidence-hoek-immersion"],
    },
    {
      id: "exp-emg",
      publicationStatus: "public",
      claimState: "verified",
      syntheticPlaceholder: false,
      reviewedOn: "2026-09-17",
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
            en: "For Daegu Smart City, integrated exposed APIs and real-time streams into frontend visualization and interface behavior.",
            ko: "대구 스마트시티에서 다른 팀이 제공한 API와 실시간 스트림을 프론트엔드 시각화 및 인터페이스 동작에 연동했습니다.",
            koReview: "reviewed",
          },
          evidenceIds: ["evidence-emg", "evidence-emg-smart-city"],
        },
        {
          text: {
            en: "For RUTA40, implemented the React UI and HTTPS control integration on a real vehicle while the embedded and backend teams provided the module and control API.",
            ko: "RUTA40에서 임베디드 팀이 모듈을, 백엔드 팀이 HTTPS 제어 API를 담당했으며, 실차에서 동작하는 React UI와 제어 연동을 구현했습니다.",
            koReview: "reviewed",
          },
          evidenceIds: ["evidence-emg", "evidence-emg-ruta40"],
        },
      ],
      evidenceIds: [
        "evidence-emg",
        "evidence-emg-ruta40",
        "evidence-emg-smart-city",
      ],
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
      id: "skill-industrial-cell-integration",
      publicationStatus: "public",
      claimState: "verified",
      syntheticPlaceholder: false,
      reviewedOn: "2026-09-17",
      name: {
        en: "PLC / HMI / CC-Link / Servo & Robot Integration",
        ko: "PLC / HMI / CC-Link / 서보·로봇 연동",
        koReview: "reviewed",
      },
      evidenceLevel: "training",
      prominence: "featured",
      evidenceIds: ["evidence-training-program", "evidence-plc-robot-cell"],
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
      id: "evidence-item-ruta40",
      publicationStatus: "public",
      claimState: "verified",
      syntheticPlaceholder: false,
      reviewedOn: "2026-09-17",
      context: "professional",
      status: "completed",
      editorialStatus: "reviewable",
      evidenceLevel: "professional",
      title: {
        en: "RUTA40 Vehicle Control Interface",
        ko: "RUTA40 차량 제어 인터페이스",
        koReview: "reviewed",
      },
      summary: {
        en: "React UI and HTTPS control integration used to operate a door-lock function on a real vehicle, including debugging across UI, API, server, embedded-module, and physical-actuator boundaries.",
        ko: "실차 도어록 기능을 제어하는 React UI와 HTTPS 연동을 구현하고, UI·API·서버·임베디드 모듈·물리 액추에이터 사이의 경계를 따라 문제를 추적했습니다.",
        koReview: "reviewed",
      },
      contributionBoundary: {
        en: "Sean owned the frontend UI and API integration. The embedded module and HTTPS control backend belonged to their respective teams.",
        ko: "Sean은 프론트엔드 UI와 API 연동을 담당했습니다. 임베디드 모듈과 HTTPS 제어 백엔드는 각 담당 팀의 범위였습니다.",
        koReview: "reviewed",
      },
      completedScope: [
        {
          en: "React control interface and real-vehicle integration",
          ko: "React 제어 인터페이스 및 실차 연동",
          koReview: "reviewed",
        },
        {
          en: "Cross-boundary diagnosis from UI command to physical response",
          ko: "UI 명령부터 물리 동작까지의 경계 간 진단",
          koReview: "reviewed",
        },
      ],
      plannedScope: [],
      role: {
        en: "Frontend UI & API Integration",
        ko: "프론트엔드 UI 및 API 연동",
        koReview: "reviewed",
      },
      technologies: ["React", "HTTPS API", "Vehicle integration"],
      evidenceIds: ["evidence-emg", "evidence-emg-ruta40"],
    },
    {
      id: "evidence-item-smart-city",
      publicationStatus: "public",
      claimState: "verified",
      syntheticPlaceholder: false,
      reviewedOn: "2026-09-17",
      context: "professional",
      status: "completed",
      editorialStatus: "reviewable",
      evidenceLevel: "professional",
      title: {
        en: "Daegu Smart City Dashboard",
        ko: "대구 스마트시티 대시보드",
        koReview: "reviewed",
      },
      summary: {
        en: "Frontend integration and visualization of operational APIs and real-time streams for the Daegu Smart City Challenge.",
        ko: "대구 스마트시티 챌린지에서 운영 API와 실시간 스트림을 프론트엔드에 연동하고 시각화했습니다.",
        koReview: "reviewed",
      },
      contributionBoundary: {
        en: "Sean implemented frontend integration, visualization, and UI behavior; backend WebSocket, data-pipeline, and database ownership are not claimed.",
        ko: "Sean은 프론트엔드 연동, 시각화, UI 동작을 구현했으며 백엔드 WebSocket, 데이터 파이프라인, 데이터베이스 소유권은 주장하지 않습니다.",
        koReview: "reviewed",
      },
      completedScope: [
        {
          en: "Operational API and stream consumption in the frontend",
          ko: "프론트엔드에서 운영 API 및 스트림 연동",
          koReview: "reviewed",
        },
        {
          en: "Visualization and interface behavior",
          ko: "시각화 및 인터페이스 동작 구현",
          koReview: "reviewed",
        },
      ],
      plannedScope: [],
      role: {
        en: "Frontend Integration & Visualization",
        ko: "프론트엔드 연동 및 시각화",
        koReview: "reviewed",
      },
      technologies: ["Frontend", "Operational APIs", "Real-time streams"],
      evidenceIds: ["evidence-emg", "evidence-emg-smart-city"],
    },
    {
      id: "evidence-item-hoek-immersion",
      publicationStatus: "public",
      claimState: "verified",
      syntheticPlaceholder: false,
      reviewedOn: "2026-09-17",
      context: "professional",
      status: "completed",
      editorialStatus: "reviewable",
      evidenceLevel: "professional",
      title: {
        en: "Internal Attendance / HR Product (몰입도)",
        ko: "사내 근태·HR 시스템 몰입도",
        koReview: "reviewed",
      },
      summary: {
        en: "Full-stack internal system where attendance rules were translated into application state, including active-session checks, multiple work and break periods, and overnight workdays.",
        ko: "활성 근무 세션 확인, 복수 근무·휴게 구간, 야간 근무일 처리 등 근태 규칙을 애플리케이션 상태로 옮긴 사내 풀스택 시스템입니다.",
        koReview: "reviewed",
      },
      contributionBoundary: {
        en: "Sean contributed frontend, Koa backend, and MySQL work to an internal system; no external commercial-product or sole end-to-end ownership claim is made.",
        ko: "Sean은 사내 시스템의 프론트엔드, Koa 백엔드, MySQL 작업에 참여했으며 외부 상용 제품이나 단독 전체 소유권을 주장하지 않습니다.",
        koReview: "reviewed",
      },
      completedScope: [
        {
          en: "Prevent duplicate clock-in and reject clock-out without an active session",
          ko: "활성 세션이 있을 때 중복 출근을 막고 활성 세션이 없을 때 퇴근을 거부",
          koReview: "reviewed",
        },
        {
          en: "Support multiple work and break periods",
          ko: "복수 근무 및 휴게 구간 지원",
          koReview: "reviewed",
        },
        {
          en: "Use 06:00 as the operational workday boundary for overnight work",
          ko: "야간 근무를 위해 06:00을 운영일 경계로 적용",
          koReview: "reviewed",
        },
      ],
      plannedScope: [],
      role: {
        en: "Frontend to Full-Stack Contribution",
        ko: "프론트엔드·풀스택 개발 기여",
        koReview: "reviewed",
      },
      technologies: ["Frontend", "Koa", "MySQL", "Business rules"],
      evidenceIds: ["evidence-hoek", "evidence-hoek-immersion"],
    },
    {
      id: "project-lan-chat",
      publicationStatus: "public",
      claimState: "verified",
      syntheticPlaceholder: false,
      reviewedOn: "2026-08-31",
      context: "self-directed",
      status: "completed",
      editorialStatus: "approved",
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
      contributionBoundary: {
        en: "Self-directed application built outside the curriculum and used within the class; no broader adoption or production claim is made.",
        ko: "정규 커리큘럼 외에 자기주도로 개발해 교실에서 사용한 애플리케이션이며, 더 넓은 도입이나 프로덕션 운영을 주장하지 않습니다.",
        koReview: "reviewed",
      },
      completedScope: [
        {
          en: "LAN messaging with FastAPI, WebSocket, and SQLite",
          ko: "FastAPI, WebSocket, SQLite 기반 LAN 메시징",
          koReview: "reviewed",
        },
        {
          en: "Used by the full class of 22 classmates",
          ko: "동료 수강생 22명 전체가 사용",
          koReview: "reviewed",
        },
      ],
      plannedScope: [],
      role: {
        en: "Self-Directed Developer",
        ko: "자기주도 개발",
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
      status: "completed",
      editorialStatus: "approved",
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
      contributionBoundary: {
        en: "Four-person classroom MVP; Sean's contribution was backend and database integration.",
        ko: "4인 교실 MVP이며 Sean의 기여 범위는 백엔드와 데이터베이스 연동이었습니다.",
        koReview: "reviewed",
      },
      completedScope: [
        {
          en: "Backend and database integration for the team MVP",
          ko: "팀 MVP의 백엔드 및 데이터베이스 연동",
          koReview: "reviewed",
        },
      ],
      plannedScope: [],
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
      status: "completed",
      editorialStatus: "approved",
      evidenceLevel: "training",
      title: {
        en: "In-Class Implementation Exercises",
        ko: "수업 내 구현 실습",
        koReview: "reviewed",
      },
      summary: {
        en: "Hands-on implementation of PLC, Arduino, sensor, and local-network exercises.",
        ko: "PLC, Arduino, 센서, 로컬 네트워크를 직접 구성하고 동작을 확인했습니다.",
        koReview: "reviewed",
      },
      contributionBoundary: {
        en: "Guided coursework and laboratory exercises, not professional production work.",
        ko: "가이드가 제공된 수업 및 실험 실습이며 전문 프로덕션 업무가 아닙니다.",
        koReview: "reviewed",
      },
      completedScope: [
        {
          en: "PLC, Arduino, sensor, and local-network implementation exercises",
          ko: "PLC, Arduino, 센서, 로컬 네트워크 구현 실습",
          koReview: "reviewed",
        },
      ],
      plannedScope: [],
      technologies: ["PLC", "Ladder Logic", "Arduino", "Sensors", "IoT", "Networking"],
      evidenceIds: ["evidence-training-exercises"],
    },
    {
      id: "project-plc-robot-cell-integration",
      publicationStatus: "public",
      claimState: "verified",
      syntheticPlaceholder: false,
      reviewedOn: "2026-09-17",
      context: "training-exercise",
      status: "completed",
      editorialStatus: "reviewable",
      evidenceLevel: "training",
      title: {
        en: "PLC / Robot Cell Hardware Integration Exercise",
        ko: "PLC / 로봇 셀 하드웨어 연동 실습",
        koReview: "reviewed",
      },
      summary: {
        en: "Hands-on classroom integration of a Mitsubishi PLC, CC-Link, Neuromeka robot arm, and servo-controlled loading docks using explicit handshake and state signals.",
        ko: "Mitsubishi PLC, CC-Link, Neuromeka 로봇 암, 서보 제어 로딩 도크를 명시적인 핸드셰이크 및 상태 신호로 연동한 교실 실습입니다.",
        koReview: "reviewed",
      },
      contributionBoundary: {
        en: "Guided team integration on shared training equipment. Sean participated in handshake reasoning, I/O mapping and debugging, multi-dock sequencing, completion signaling, and team integration discussions.",
        ko: "공용 교육 장비를 사용한 가이드 기반 팀 연동 실습입니다. Sean은 핸드셰이크 로직 검토, I/O 매핑 및 디버깅, 다중 도크 순서 제어, 완료 신호와 로봇 진행 조건 검토, 팀 연동 논의에 참여했습니다.",
        koReview: "reviewed",
      },
      completedScope: [
        {
          en: "PLC-to-robot handshake and state reasoning",
          ko: "PLC-로봇 핸드셰이크 및 상태 로직 검토",
          koReview: "reviewed",
        },
        {
          en: "Relevant I/O signal mapping and debugging",
          ko: "관련 I/O 신호 매핑 및 디버깅",
          koReview: "reviewed",
        },
        {
          en: "Multi-dock sequencing and loading-dock completion signaling",
          ko: "다중 도크 순서 제어 및 로딩 도크 완료 신호 처리",
          koReview: "reviewed",
        },
      ],
      plannedScope: [],
      role: {
        en: "Guided Classroom / Team Integration",
        ko: "가이드 기반 교실·팀 연동",
        koReview: "reviewed",
      },
      technologies: ["Mitsubishi PLC", "CC-Link", "Neuromeka", "Servo docks"],
      evidenceIds: ["evidence-training-program", "evidence-plc-robot-cell"],
    },
    {
      id: "project-ros2-industrial-robot-cell",
      publicationStatus: "public",
      claimState: "verified",
      syntheticPlaceholder: false,
      reviewedOn: "2026-09-17",
      context: "current-work",
      status: "in-progress",
      editorialStatus: "reviewable",
      evidenceLevel: "project",
      title: {
        en: "ROS2 Industrial Robot Cell Integration",
        ko: "ROS2 산업용 로봇 셀 통합",
        koReview: "reviewed",
      },
      summary: {
        en: "Self-directed work to extend completed PLC and real-hardware integration evidence toward a ROS2-controlled industrial robot-cell architecture.",
        ko: "완료한 PLC 및 실제 하드웨어 연동 경험을 ROS2 제어 기반 산업용 로봇 셀 구조로 확장하는 자기주도 프로젝트입니다.",
        koReview: "reviewed",
      },
      contributionBoundary: {
        en: "Individual self-study project initiated and driven by Sean using shared training-facility hardware. ROS2 control and later orchestration or perception work are not yet completed.",
        ko: "Sean이 주도하는 개인 자기학습 프로젝트이며 공용 교육시설 하드웨어를 사용합니다. ROS2 제어와 이후 오케스트레이션·인지 작업은 아직 완료되지 않았습니다.",
        koReview: "reviewed",
      },
      completedScope: [
        {
          en: "PLC-to-Neuromeka real-hardware integration",
          ko: "PLC-Neuromeka 실제 하드웨어 연동",
          koReview: "reviewed",
        },
        {
          en: "CC-Link handshake reasoning",
          ko: "CC-Link 핸드셰이크 로직 검토",
          koReview: "reviewed",
        },
        {
          en: "Multi-dock sequencing and servo loading-dock coordination",
          ko: "다중 도크 순서 제어 및 서보 로딩 도크 조정",
          koReview: "reviewed",
        },
      ],
      plannedScope: [
        {
          en: "ROS2 control layer",
          ko: "ROS2 제어 계층",
          koReview: "reviewed",
        },
        {
          en: "Orchestration and state machine",
          ko: "오케스트레이션 및 상태 머신",
          koReview: "reviewed",
        },
        {
          en: "Timeout, fault, and recovery handling",
          ko: "타임아웃, 고장, 복구 처리",
          koReview: "reviewed",
        },
        {
          en: "Later perception and edge-AI integration",
          ko: "향후 인지 및 엣지 AI 연동",
          koReview: "reviewed",
        },
      ],
      role: {
        en: "Self-Directed Individual Project",
        ko: "자기주도 개인 프로젝트",
        koReview: "reviewed",
      },
      technologies: ["Mitsubishi PLC", "CC-Link", "Neuromeka", "Servo docks"],
      evidenceIds: ["evidence-plc-robot-cell", "evidence-ros2-robot-cell"],
    },
  ],
};

export const canonicalSupportingProjects = canonicalContentRegistry.supportingProjects;

export const systemLayerSkillGroups = [
  {
    id: "interfaces",
    skillIds: ["skill-frontend-react", "skill-api-integration"],
  },
  {
    id: "applications",
    skillIds: [
      "skill-backend-koa-mysql",
      "skill-fastapi-sqlite",
      "skill-backend-db-integration",
      "skill-workflow-automation",
    ],
  },
  {
    id: "infrastructure",
    skillIds: ["skill-websocket", "skill-industrial-net-linux"],
  },
  {
    id: "physical-systems",
    skillIds: [
      "skill-plc-ladder",
      "skill-industrial-cell-integration",
      "skill-sensors-iot",
    ],
  },
  {
    id: "ai-perception",
    skillIds: ["skill-edge-inference"],
  },
] as const;

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

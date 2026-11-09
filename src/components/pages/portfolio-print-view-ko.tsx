import React from "react";
import Image from "next/image";
import { canonicalContentRegistry, systemLayerSkillGroups } from "@/data/content";
import { caseStudies } from "@/data/case-studies";
import { workMedia } from "@/data/work-media";
import { formatDateRange } from "@/lib/content/format";
import { getSystemLayerLabel } from "@/i18n/career-labels";
import type { LocalizedText } from "@/lib/content/schemas";

// Korean portfolio PDF source (cover + one A4 sheet per project), printed to
// public/portfolio.pdf by `pnpm portfolio:pdf --ko --public`. Preview channel only.
//
// Copy here is PDF-only and goes beyond the site registry. Sources, all from Sean:
// his chat statements and confirmed facts (agent_plugin sean-voice facts.md), his
// 2023 Hoek dev log (몰입도 timeline, alpha-vs-later screenshot), and his Korean
// application portfolio (RUTA40 charging-map scope). Sean confirmed the RUTA40 content
// on 2026-11-03 and reviews every printed version; Korean wording is a draft he edits.
const SANS = '"Noto Sans KR", "Noto Sans CJK KR", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif';
const C = {
  ink: "#1c1c1c",
  paper: "#ffffff",
  muted: "#57534e",
  stone: "#e7e5e4",
  accent: "#2f5d8a", // steel blue, used only for numbers and markers
  bandText: "#d6d3d1",
};
const stripe: React.CSSProperties = {
  backgroundImage: `repeating-linear-gradient(-45deg, ${C.ink} 0 3mm, #3a3835 3mm 6mm)`,
};

const ko = (text: LocalizedText) => text.ko ?? text.en;

const HEADLINE = "IT 시스템과 제조 설비를 연결하는 엔지니어";
const INTRO =
  "AI를 포함한 IT 시스템과 제조 설비가 서로 잘 소통할 수 있는 연결점을 만드는 일에 관심이 있습니다. 2년간 웹 서비스를 개발·운영했고, 지금은 PLC·협동로봇·머신비전을 직접 다루며 그 연결점을 만들고 있습니다.";
const CERTIFICATIONS = ["ADsP (데이터분석 준전문가)", "운전면허 2종", "CELPIP-General 11 (영어)"];

const EXPERIENCE = [
  {
    org: "획기획 (Hoek Agency)",
    role: "개발자 · 풀스택",
    date: "2022.09 – 2023.08",
    items: ["사내 근태관리 서비스 「몰입도」 풀스택 개발·운영 (Next.js · Koa · MySQL · AWS)", "알파 출시 후 사내 약 20명이 매일 사용"],
  },
  {
    org: "EMG Global",
    role: "연구원 · SW 개발",
    date: "2021.07 – 2022.07",
    items: ["대구 스마트시티 모니터링 대시보드 프론트엔드·API 연동", "RUTA40 전기 캠핑카 스마트키 앱 개발·출시 (React · Android WebView)"],
  },
  {
    org: "국군정보사령부",
    role: "영어어학병",
    date: "2016.10 – 2018.07",
    items: ["보안 환경에서 한영 통번역·보고", "JavaScript·VBA로 반복 문서 업무 자동화 (약 30분 → 10분)"],
  },
];

interface Media {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
}

interface Block {
  title: string;
  items: string[];
}

interface Project {
  number: string;
  label: string;
  title: string;
  summary: string;
  meta: { key: string; value: string }[];
  stack: string[];
  media: Media[];
  mediaHeight?: string;
  /** Rendered side by side under the figure (background, role/credit). */
  pair: [Block, Block];
  /** Full-width list of what was built. */
  built: Block;
  notes: Block[];
}

const CAREER = "경력 프로젝트";
const PERSONAL = "개인 프로젝트";
const TRAINING = "교육 실습";

function buildProjects(): Project[] {
  const ruta40 = workMedia["evidence-item-ruta40"];
  const molipdo = workMedia["evidence-item-hoek-immersion"];
  const twin = caseStudies.find((c) => c.slug === "indy7-digital-twin");
  const madi = caseStudies.find((c) => c.slug === "bamboochat");
  if (!twin || !madi) throw new Error("case study missing");
  const fig = (f: typeof twin.hero): Media => ({ src: f.src, width: f.width, height: f.height, alt: ko(f.alt), caption: ko(f.caption) });

  const list: Omit<Project, "number">[] = [
    {
      label: CAREER,
      title: "RUTA40 전기 캠핑카 스마트키 앱",
      summary: "전기 캠핑카 RUTA40 고객용 스마트키 앱. React 웹앱을 Android WebView로 감싸 출시했습니다.",
      meta: [
        { key: "기간", value: "2022.04 – 2022.07" },
        { key: "소속", value: "EMG Global" },
        { key: "역할", value: "React 웹앱 · API 연동 · Android 앱" },
      ],
      stack: ["React", "React Router", "Axios", "JWT", "Geolocation API", "Android WebView", "JavaScript Bridge"],
      media: ruta40 ? [{ src: ruta40.src, width: ruta40.width, height: ruta40.height, alt: ruta40.alt.ko, caption: ruta40.caption.ko }] : [],
      mediaHeight: "max-h-[78mm]",
      pair: [
        {
          title: "배경",
          items: [
            "시동이 켜져 있어야 전원이 들어오는 구조라, 에어컨을 켜고 차에서 잘 때 문을 잠글 수 없는 문제",
            "사용자 불만이 계속됐지만 맡는 사람이 없던 기능을 직접 맡음 (팀원들의 도움과 함께)",
          ],
        },
        {
          title: "역할 분담",
          items: ["도어록 모듈: 임베디드 팀", "HTTPS 제어 API: 백엔드 팀", "React 웹앱 · API 연동 · Android 앱 · 실차 확인: 본인"],
        },
      ],
      built: {
        title: "구현",
        items: [
          "원격 도어 열기·닫기: 백엔드 HTTPS 제어 API 연동",
          "JWT 로그인·보호 라우트, QR 스캔 차량 등록, 차량 데이터 조회",
          "공공데이터 기반 충전소 찾기: 행정구역·현재 위치 반경으로 조회 범위를 좁혀 지도 응답 지연 해소, 지도 앱 길안내 연결",
          "Android WebView 앱: JavaScript Bridge로 뒤로 가기·권한·Intent 처리, Play 스토어 인앱 업데이트 (iOS는 웹으로 제공)",
        ],
      },
      notes: [
        {
          title: "문제 해결 · 실차 도어록",
          items: [
            "실차 테스트에서 앱 명령에 도어가 반응하지 않음",
            "서버 로그·Swagger로 요청이 정상 전달되는 것을 확인해 범위를 좁힘",
            "임베디드 쪽 수신·처리 문제로 판단, 임베디드 엔지니어와 함께 수정 후 실차 동작 확인",
          ],
        },
        {
          title: "결과",
          items: ["판매된 캠핑카 20대의 사용자 20명이 사용", "그중 약 17–18명이 긍정적인 피드백"],
        },
      ],
    },
    {
      label: CAREER,
      title: "사내 근태관리 서비스 「몰입도」",
      summary: "사내에서 쓰던 외부 근태관리 서비스를 대체하려고 만든 근태·HR 서비스입니다. 사내 약 20명이 매일 사용했습니다.",
      meta: [
        { key: "기간", value: "2023.02 – 2023.08" },
        { key: "소속", value: "획기획 (Hoek Agency)" },
        { key: "역할", value: "풀스택 개발 · 운영" },
      ],
      stack: ["Next.js", "React", "Node.js", "Koa", "MySQL", "AWS (EC2 · RDS · S3)", "Docker"],
      media: [
        {
          src: "/work/molipdo-alpha-vs-current.png",
          width: 683,
          height: 897,
          alt: "몰입도 알파 버전 화면(왼쪽)과 디자인·기능이 추가된 이후 버전 화면(오른쪽) 비교.",
          caption: "알파 버전(왼쪽)과 이후 버전(오른쪽)",
        },
        ...(molipdo ? [{ src: molipdo.src, width: molipdo.width, height: molipdo.height, alt: molipdo.alt.ko, caption: "로그인 화면" }] : []),
      ],
      mediaHeight: "max-h-[100mm]",
      pair: [
        {
          title: "진행",
          items: ["2023년 2월 말 개발 시작", "4월 1일 출퇴근 기록만 되는 알파 버전 사내 출시", "직접 쓰면서 디자인과 기능 확장"],
        },
        {
          title: "역할",
          items: ["프론트엔드(Next.js)부터 Koa 백엔드·MySQL까지 풀스택 개발", "AWS·Docker 배포와 운영"],
        },
      ],
      built: {
        title: "근태 규칙 구현",
        items: [
          "활성 세션이 있으면 중복 출근 차단, 활성 세션이 없으면 퇴근 요청 거부",
          "하루 여러 번의 근무·휴게 구간 지원",
          "06:00을 운영일 경계로 야간 근무 처리, 일·주·월 근무시간 집계",
        ],
      },
      notes: [
        {
          title: "운영하며 배운 점",
          items: ["실사용 중 문제가 생긴 뒤 테스트를 보강하고, DB 복사본으로 먼저 검증하는 절차 도입"],
        },
      ],
    },
    {
      label: PERSONAL,
      title: "Indy7 팔레타이징 셀 디지털 트윈",
      summary: "Neuromeka Indy7 팔레타이징 셀의 제어·이력 관리 앱입니다. 시뮬레이션으로 먼저 만들고 실제 Indy7에서 팔레타이징까지 실행했습니다.",
      meta: [
        { key: "기간", value: "2026.09 – 현재" },
        { key: "저장소", value: twin.repositoryHref.replace("https://", "") },
      ],
      stack: twin.stack,
      media: [fig(twin.hero)],
      mediaHeight: "max-h-[88mm]",
      pair: [
        {
          title: "역할",
          items: ["해결할 문제·범위·시스템 경계 직접 정의", "직접 기획 후 구현은 AI agent에게 맡겨 진행"],
        },
        {
          title: "실장비 실행",
          items: ["여러 차례 조그 디버깅 후 실제 Indy7에서 팔레타이징 실행", "iPad로 앱을 티칭 펜던트처럼 사용"],
        },
      ],
      built: {
        title: "구현",
        items: [
          "실시간 관절 데이터와 수치 역기구학 기반 3D 셀 트윈",
          "팔레타이징·회수 셀 상태 머신: 실행 권한 단일화, 정지 래치, 명시적 복구",
          "PLC 신호 규약(DI3·DI8·DI9·DI15, 그리퍼 코일 0/1)과 시뮬레이션·Modbus TCP·로봇 I/O 게이트웨이 교체 구조",
          "실행·사이클·상태 전이·고장·조작 이력을 남기는 SQLite 저장소와 생산 콘솔",
        ],
      },
      notes: [
        { title: "검증", items: ["단위·통합 테스트 72개 통과 (2026.10.01)", "아키텍처 계층 검사 통과"] },
        { title: "한계", items: ["하드웨어 실행의 측정 결과(사이클 타임 등)는 아직 없음", "충돌 검사·동역학·그리퍼 접촉 모델 없음"] },
      ],
    },
    {
      label: TRAINING,
      title: "PLC · Neuromeka 로봇 셀 연동 실습",
      summary: "교육 장비(Mitsubishi PLC, CC-Link, Indy7, 서보 로딩 도크)를 신호로 연결한 가이드 기반 팀 실습입니다.",
      meta: [
        { key: "기간", value: "2026.06 – 현재" },
        { key: "과정", value: "AI 융합 DX 마스터클래스" },
      ],
      stack: ["Mitsubishi PLC", "GX Works2", "QD75D2N", "CC-Link", "Neuromeka Indy7", "서보 도크"],
      media: [
        {
          src: "/work/indy7-palletizing-line.jpg",
          width: 512,
          height: 910,
          alt: "실습 라인의 Neuromeka Indy7이 컨베이어 옆 팔레트에 블록을 내려놓는 장면.",
          caption: "실습 라인에서 Indy7 팔레타이징 (영상 캡처)",
        },
        {
          src: "/work/plc-cell-ccl-io.jpg",
          width: 1080,
          height: 1440,
          alt: "실습 셀 배선: CC-Link 리모트 I/O 유닛 두 개, Mitsubishi 인버터, 가변저항 유닛, 서보 앰프와 바나나 잭 배선.",
          caption: "CC-Link 리모트 I/O · 인버터 · 서보 앰프 배선",
        },
      ],
      mediaHeight: "max-h-[90mm]",
      pair: [
        {
          title: "맡은 부분",
          items: ["PLC–로봇 핸드셰이크·상태 로직 검토", "관련 I/O 신호 매핑과 디버깅", "다중 도크 순서 제어, 완료 신호 처리"],
        },
        {
          title: "범위",
          items: ["공용 교육 장비를 쓴 가이드 기반 팀 실습", "로봇 셀 연동 자체는 교육 과정의 실습"],
        },
      ],
      built: {
        title: "핸드셰이크 흐름",
        items: [
          "PLC → 로봇: 팔레타이징 시작 신호",
          "로봇 → PLC: 진행 상태를 DO로 회신",
          "PLC: 완료 확인 후 로봇 상태 리셋, 다음 도크로 서보 이동",
        ],
      },
      notes: [
        {
          title: "디버깅 사례 · 서보 시퀀스",
          items: [
            "GX Works2 + QD75D2N 서보 시퀀스가 101 → 102 사이 중간 위치에서 멈춤",
            "전이 조건 버그를 찾아 수정",
            "일시정지·재개, 리테인 타이머, 축 정지 동작 차이도 함께 정리",
          ],
        },
      ],
    },
    {
      label: PERSONAL,
      title: "Madi (마디): 교실 LAN 채팅·학습 앱",
      summary: "교육 과정 동기들이 매일 쓰는 채팅·학습 앱입니다. 교실 PC 한 대에서 로컬 네트워크로 운영합니다.",
      meta: [
        { key: "기간", value: "2026.08 – 현재" },
        { key: "상태", value: "우리 반 22명 사용 중 · 개발원 3개 층(약 200명) 도입 논의 중" },
        { key: "저장소", value: madi.repositoryHref.replace("https://", "") },
      ],
      stack: madi.stack,
      media: [fig(madi.hero)],
      mediaHeight: "max-h-[86mm]",
      pair: [
        {
          title: "배경",
          items: ["개인 SNS 계정을 공개하기 부담스러워 Discord 대신 쓸 교내 도구가 필요", "인터넷 없이 교실 네트워크만으로 동작해야 함"],
        },
        {
          title: "역할",
          items: ["직접 기획하고 반을 위해 운영", "구현의 상당 부분은 AI agent에게 맡겨 진행", "체스는 동기가 PR로 처음 기여"],
        },
      ],
      built: {
        title: "기능",
        items: [
          "WebSocket 실시간 채널·1:1 대화: 멘션, 답장, 검색, 다시 접속해도 유지되는 읽음 상태",
          "파일 공유(계정별 권한·용량 제한)와 화면 공유",
          "Argon2id 비밀번호 해시, 반 가입 코드, 로그인 시도 제한",
          "PLC·자동화 데일리 퀴즈(Gemini로 문제 초안 생성), 턴제 게임",
        ],
      },
      notes: [
        { title: "검증", items: ["자동화 테스트 273개 통과 (2026.10.01)", "2026년 8월부터 반에서 매일 사용"] },
        { title: "한계", items: ["교실 내부망용 HTTP 서비스", "교실 PC 한 대에 의존, 별도 서버 없음"] },
      ],
    },
  ];
  return list.map((p, i) => ({ ...p, number: String(i + 1).padStart(2, "0") }));
}

function buildProfile(projects: Project[]) {
  const { siteIdentity, educationAndTraining, links, skills } = canonicalContentRegistry;
  const href = (kind: string) => links.find((l) => l.kind === kind)?.href ?? "";
  return {
    name: siteIdentity ? ko(siteIdentity.displayName) : "",
    email: href("email").replace("mailto:", ""),
    location: siteIdentity ? ko(siteIdentity.location) : "",
    site: "seanchoi.space",
    github: href("github").replace("https://", ""),
    education: educationAndTraining.map((e) => ({
      id: e.id,
      institution: ko(e.institution),
      program: ko(e.program),
      date: formatDateRange(e.dateRange, "ko"),
    })),
    skills: systemLayerSkillGroups.map((g) => ({
      id: g.id,
      label: getSystemLayerLabel(g.id, "ko"),
      items: g.skillIds
        .map((id) => skills.find((s) => s.id === id))
        .filter((s) => s !== undefined)
        .map((s) => ko(s.name)),
    })),
    toc: projects.map((x) => ({ number: x.number, title: x.title, label: x.label })),
  };
}

type Profile = ReturnType<typeof buildProfile>;

function Sheet({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section
      className={`relative h-[297mm] w-[210mm] overflow-hidden break-after-page last:break-after-auto ${className}`}
      style={{ background: C.paper, color: C.ink }}
    >
      {children}
    </section>
  );
}

function Cell({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`border-2 ${className}`} style={{ borderColor: C.ink }}>
      <p className="px-2 py-1 text-[9px] font-bold tracking-[0.2em]" style={{ background: C.ink, color: C.bandText }}>
        {title}
      </p>
      <div className="p-2.5">{children}</div>
    </div>
  );
}

function Bullets({ items, small = false }: { items: string[]; small?: boolean }) {
  return (
    <ul className={`space-y-0.5 ${small ? "text-[9.5px]" : ""}`}>
      {items.map((b) => (
        <li key={b} className="flex gap-2 leading-relaxed">
          <span className="shrink-0" style={{ color: C.accent }}>
            ■
          </span>
          <span>{b}</span>
        </li>
      ))}
    </ul>
  );
}

function Cover({ p, generatedOn }: { p: Profile; generatedOn: string }) {
  return (
    <Sheet>
      <div className="px-[15mm] pb-[10mm] pt-[18mm] text-white" style={{ background: C.ink }}>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[10px] font-bold tracking-[0.35em]" style={{ color: C.bandText }}>
              ENGINEER PORTFOLIO
            </p>
            <h1 className="mt-3 text-[46px] font-black leading-none">{p.name}</h1>
            <p className="mt-1 text-[13px] font-bold tracking-[0.3em] opacity-60">SEAN CHOI</p>
          </div>
          <div className="text-right text-[9.5px] leading-relaxed opacity-80">
            <p>{p.email}</p>
            <p>{p.site}</p>
            <p>{p.github}</p>
            <p>{p.location}</p>
          </div>
        </div>
        <p className="mt-7 inline-block px-2 py-1 text-[13.5px] font-bold text-white" style={{ background: C.accent }}>
          {HEADLINE}
        </p>
      </div>
      <div className="h-[5mm]" style={stripe} />
      <div className="space-y-3 px-[15mm] pt-[7mm] text-[10.5px]">
        <p className="leading-relaxed" style={{ color: C.muted }}>
          {INTRO}
        </p>
        <Cell title="경력">
          <div className="space-y-2">
            {EXPERIENCE.map((x) => (
              <div key={x.org} className="grid grid-cols-[32mm_1fr] gap-3">
                <p className="text-[9.5px] font-bold">{x.date}</p>
                <div>
                  <p className="font-bold">
                    {x.org} <span className="font-normal" style={{ color: C.muted }}>· {x.role}</span>
                  </p>
                  <Bullets items={x.items} small />
                </div>
              </div>
            ))}
          </div>
        </Cell>
        <div className="grid grid-cols-2 gap-3">
          <Cell title="학력 및 교육">
            {p.education.map((e) => (
              <div key={e.id} className="mb-1.5">
                <p className="font-bold">{e.institution}</p>
                <p className="text-[9.5px]" style={{ color: C.muted }}>
                  {e.program} · {e.date}
                </p>
              </div>
            ))}
          </Cell>
          <Cell title="보유 자격증">
            {CERTIFICATIONS.map((c) => (
              <p key={c} className="mb-1 flex items-center gap-2">
                <span className="h-2 w-2" style={{ background: C.accent }} />
                {c}
              </p>
            ))}
          </Cell>
        </div>
        <Cell title="기술사항">
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
            {p.skills.map((s) => (
              <div key={s.id}>
                <p className="text-[10px] font-bold">{s.label}</p>
                <p className="text-[9.5px] leading-snug" style={{ color: C.muted }}>
                  {s.items.join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </Cell>
        <div className="grid grid-cols-5 gap-2">
          {p.toc.map((t) => (
            <div key={t.number} className="border-2 p-2" style={{ borderColor: C.ink }}>
              <p className="text-[18px] font-black leading-none" style={{ color: C.accent }}>
                {t.number}
              </p>
              <p className="mt-1 text-[9px] font-bold leading-snug">{t.title}</p>
              <p className="mt-0.5 text-[8.5px]" style={{ color: C.muted }}>
                {t.label}
              </p>
            </div>
          ))}
        </div>
      </div>
      <p className="absolute bottom-[8mm] right-[15mm] text-[8.5px]" style={{ color: C.muted }}>
        {generatedOn} 기준 · 최신 내용은 {p.site}
      </p>
    </Sheet>
  );
}

function ProjectSheet({ x, total }: { x: Project; total: number }) {
  const panels = x.media.length;
  return (
    <Sheet className="text-[10.5px]">
      <div className="h-[4mm]" style={stripe} />
      <div className="px-[15mm] pt-[8mm]">
        <div className="flex items-stretch gap-4">
          <div className="flex w-[30mm] flex-col items-center justify-center py-2" style={{ background: C.stone }}>
            <p className="text-[8.5px] font-bold tracking-[0.2em]" style={{ color: C.muted }}>
              PROJECT
            </p>
            <p className="text-[40px] font-black leading-none">{x.number}</p>
          </div>
          <div className="flex flex-1 flex-col justify-center">
            <p className="text-[9px] font-bold tracking-[0.2em]" style={{ color: C.accent }}>
              {x.label} · {x.number}/{String(total).padStart(2, "0")}
            </p>
            <h1 className="mt-1 text-[21px] font-black leading-tight">{x.title}</h1>
          </div>
        </div>
        <p className="mt-3 border-l-4 pl-3 leading-relaxed" style={{ borderColor: C.accent }}>
          {x.summary}
        </p>
        <div className="mt-2 flex flex-wrap gap-x-4 text-[9.5px]" style={{ color: C.muted }}>
          {x.meta.map((m) => (
            <span key={m.key}>
              <b style={{ color: C.ink }}>{m.key}</b> {m.value}
            </span>
          ))}
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          {x.stack.map((t) => (
            <span key={t} className="px-2 py-0.5 text-[9px] font-bold" style={{ background: C.stone, color: C.ink }}>
              {t}
            </span>
          ))}
        </div>
        {panels > 0 && (
          <figure className={`mt-3 border-2 p-2 ${panels > 1 ? "grid grid-cols-2 items-center gap-3" : ""}`} style={{ borderColor: C.ink }}>
            {x.media.map((m) => (
              <div key={m.src}>
                <Image
                  src={m.src}
                  alt={m.alt}
                  width={m.width}
                  height={m.height}
                  className={`mx-auto h-auto w-auto max-w-full object-contain ${x.mediaHeight ?? "max-h-[80mm]"}`}
                />
                <figcaption className="mt-1 text-[9px] font-bold">▲ {m.caption}</figcaption>
              </div>
            ))}
          </figure>
        )}
        <div className="mt-3 grid grid-cols-2 gap-3">
          {x.pair.map((b) => (
            <Cell key={b.title} title={b.title}>
              <Bullets items={b.items} small />
            </Cell>
          ))}
        </div>
        <Cell title={x.built.title} className="mt-3">
          <Bullets items={x.built.items} />
        </Cell>
        {x.notes.length > 0 && (
          <div className={`mt-3 grid gap-3 ${x.notes.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
            {x.notes.map((n) => (
              <Cell key={n.title} title={n.title}>
                <Bullets items={n.items} small />
              </Cell>
            ))}
          </div>
        )}
      </div>
    </Sheet>
  );
}

export function PortfolioPrintViewKo({ generatedOn }: { generatedOn: string }) {
  const projects = buildProjects();
  const profile = buildProfile(projects);
  return (
    <div className="mx-auto w-[210mm] bg-white [word-break:keep-all] print:w-auto" style={{ fontFamily: SANS }}>
      <style>{`@page { size: A4; margin: 0; } @media print { html, body { background: #fff !important; margin: 0; } }`}</style>
      <Cover p={profile} generatedOn={generatedOn} />
      {projects.map((x) => (
        <ProjectSheet key={x.number} x={x} total={projects.length} />
      ))}
    </div>
  );
}

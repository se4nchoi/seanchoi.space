import React from "react";
import type { AppLocale } from "@/i18n/config";

const labels = {
  en: {
    title: "BambooChat deployment on a classroom network",
    browsers: "Classroom browsers",
    browsersSub: "22 students · admin",
    lan: "HTTP · WebSocket over the classroom LAN",
    app: "FastAPI on a classroom PC",
    modules: [
      ["Accounts", "Argon2id · sessions"],
      ["Chat hub", "channels · DMs · pins"],
      ["Quizzes", "streaks · rankings"],
      ["Games", "server-validated moves"],
    ],
    db: "SQLite (WAL)",
    dbSub: "messages · quizzes · games",
    files: "File storage",
    filesSub: "per-user and total limits",
    disk: "Separate data folder on local disk",
    ai: "Gemini API (optional)",
    aiSub: "drafts quiz questions from a selected PDF or text",
    caption:
      "Everything runs on one classroom PC. Only optional quiz drafting leaves the network.",
  },
  ko: {
    title: "교실 네트워크에 배포된 BambooChat",
    browsers: "교실 브라우저",
    browsersSub: "학생 22명 · 관리자",
    lan: "교실 LAN의 HTTP · WebSocket",
    app: "교실 PC의 FastAPI",
    modules: [
      ["계정", "Argon2id · 세션"],
      ["채팅 허브", "채널 · 1:1 · 고정"],
      ["퀴즈", "연속 기록 · 순위"],
      ["게임", "서버에서 수 검증"],
    ],
    db: "SQLite (WAL)",
    dbSub: "메시지 · 퀴즈 · 게임",
    files: "파일 저장소",
    filesSub: "사용자별·전체 용량 제한",
    disk: "로컬 디스크의 별도 데이터 폴더",
    ai: "Gemini API (선택)",
    aiSub: "선택한 PDF·텍스트로 퀴즈 초안 생성",
    caption: "모든 기능이 교실 PC 한 대에서 동작합니다. 선택 기능인 퀴즈 초안 생성만 외부로 나갑니다.",
  },
} as const;

const box = { fill: "var(--surface)", stroke: "var(--border)", strokeWidth: 1.5 };
const heading = { fill: "var(--foreground)", fontSize: 15, fontWeight: 600 };
const sub = { fill: "var(--muted)", fontSize: 11 };
const arrow = { stroke: "var(--muted)", strokeWidth: 1.5 };

export function BambooChatArchitectureDiagram({ locale }: { locale: AppLocale }) {
  const t = labels[locale];
  return (
    <figure>
      <svg
        viewBox="0 0 480 560"
        role="img"
        aria-labelledby="bamboo-arch-title"
        className="mx-auto block h-auto w-full max-w-[34rem] font-[family-name:var(--font-sans)]"
      >
        <title id="bamboo-arch-title">{t.title}</title>
        <defs>
          <marker id="bamboo-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="var(--muted)" />
          </marker>
        </defs>

        <rect x={90} y={10} width={300} height={58} rx={8} {...box} />
        <text x={240} y={35} textAnchor="middle" {...heading}>{t.browsers}</text>
        <text x={240} y={55} textAnchor="middle" {...sub} fontSize={12}>{t.browsersSub}</text>

        <line x1={240} y1={70} x2={240} y2={102} {...arrow} markerStart="url(#bamboo-arrow)" markerEnd="url(#bamboo-arrow)" />
        <text x={252} y={91} {...sub}>{t.lan}</text>

        <rect x={20} y={104} width={440} height={206} rx={10} fill="none" stroke="var(--accent)" strokeWidth={2} />
        <text x={36} y={130} {...heading} fill="var(--accent)">{t.app}</text>
        {t.modules.map(([name, note], i) => {
          const x = 36 + (i % 2) * 208;
          const y = 144 + Math.floor(i / 2) * 78;
          return (
            <g key={name}>
              <rect x={x} y={y} width={200} height={66} rx={6} {...box} />
              <text x={x + 100} y={y + 28} textAnchor="middle" {...heading} fontSize={14}>{name}</text>
              <text x={x + 100} y={y + 48} textAnchor="middle" {...sub}>{note}</text>
            </g>
          );
        })}

        <line x1={130} y1={312} x2={130} y2={346} {...arrow} markerEnd="url(#bamboo-arrow)" />
        <line x1={350} y1={312} x2={350} y2={346} {...arrow} markerEnd="url(#bamboo-arrow)" />

        <rect x={20} y={348} width={440} height={104} rx={10} fill="none" stroke="var(--border)" strokeWidth={1.5} />
        <rect x={36} y={360} width={200} height={64} rx={6} {...box} />
        <text x={136} y={387} textAnchor="middle" {...heading} fontSize={14}>{t.db}</text>
        <text x={136} y={407} textAnchor="middle" {...sub}>{t.dbSub}</text>
        <rect x={244} y={360} width={200} height={64} rx={6} {...box} />
        <text x={344} y={387} textAnchor="middle" {...heading} fontSize={14}>{t.files}</text>
        <text x={344} y={407} textAnchor="middle" {...sub}>{t.filesSub}</text>
        <text x={240} y={443} textAnchor="middle" {...sub}>{t.disk}</text>

        <path d="M460,280 H473 V512 H464" fill="none" {...arrow} strokeDasharray="5 4" markerEnd="url(#bamboo-arrow)" />
        <rect x={20} y={480} width={440} height={64} rx={8} fill="none" stroke="var(--muted)" strokeWidth={1.5} strokeDasharray="6 5" />
        <text x={240} y={506} textAnchor="middle" {...heading} fontSize={14}>{t.ai}</text>
        <text x={240} y={528} textAnchor="middle" {...sub} fontSize={12}>{t.aiSub}</text>
      </svg>
      <figcaption className="mt-3 text-center text-xs leading-relaxed text-muted">{t.caption}</figcaption>
    </figure>
  );
}

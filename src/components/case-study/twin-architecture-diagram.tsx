import React from "react";
import type { AppLocale } from "@/i18n/config";

const labels = {
  en: {
    title: "System boundaries of the Indy7 digital twin",
    browser: "Browser",
    browserSub: "3D twin · production console",
    web: "HTTP · WebSocket",
    app: "Application (FastAPI)",
    command: ["Command", "service"],
    commandSub: "one validated path",
    cell: ["Workcell", "state machine"],
    cellSub: "run · latch · recover",
    store: ["SQLite", "evidence"],
    storeSub: "runs · faults · actions",
    robotLink: "IndyDCP3",
    plcLink: "Modbus TCP · simulated",
    robot: "Indy7 robot",
    robotSub: "simulated or real controller",
    plc: "PLC",
    plcSub: "DI 3 · 8 · 9 · 15 in, coils 0 · 1 out",
    safety: "Safety path: E-stop · guards · safety PLC",
    safetySub: "reaches the robot without this software",
    caption:
      "Browser, application, robot, and PLC are separate endpoints. Safety functions never route through the application.",
  },
  ko: {
    title: "Indy7 디지털 트윈의 시스템 경계",
    browser: "브라우저",
    browserSub: "3D 트윈 · 생산 콘솔",
    web: "HTTP · WebSocket",
    app: "애플리케이션 (FastAPI)",
    command: ["명령", "서비스"],
    commandSub: "단일 검증 경로",
    cell: ["셀", "상태 머신"],
    cellSub: "실행 · 래치 · 복구",
    store: ["SQLite", "기록"],
    storeSub: "실행 · 고장 · 조작",
    robotLink: "IndyDCP3",
    plcLink: "Modbus TCP · 시뮬레이션",
    robot: "Indy7 로봇",
    robotSub: "시뮬레이션 또는 실제 컨트롤러",
    plc: "PLC",
    plcSub: "입력 DI 3·8·9·15, 출력 코일 0·1",
    safety: "안전 경로: 비상 정지 · 방호 · 안전 PLC",
    safetySub: "이 소프트웨어를 거치지 않고 로봇에 연결",
    caption:
      "브라우저, 애플리케이션, 로봇, PLC는 각각 독립된 엔드포인트입니다. 안전 기능은 애플리케이션을 거치지 않습니다.",
  },
} as const;

const box = { fill: "var(--surface)", stroke: "var(--border)", strokeWidth: 1.5 };
const heading = { fill: "var(--foreground)", fontSize: 15, fontWeight: 600 };
const sub = { fill: "var(--muted)", fontSize: 12 };

function Inner({ x, lines, note }: { x: number; lines: readonly string[]; note: string }) {
  return (
    <g>
      <rect x={x} y={136} width={128} height={140} rx={6} {...box} />
      {lines.map((line, i) => (
        <text key={line} x={x + 64} y={176 + i * 19} textAnchor="middle" {...heading} fontSize={14}>
          {line}
        </text>
      ))}
      <text x={x + 64} y={246} textAnchor="middle" {...sub} fontSize={11}>
        {note}
      </text>
    </g>
  );
}

export function TwinArchitectureDiagram({ locale }: { locale: AppLocale }) {
  const t = labels[locale];
  return (
    <figure>
      <svg
        viewBox="0 0 480 545"
        role="img"
        aria-labelledby="twin-arch-title"
        className="mx-auto block h-auto w-full max-w-[34rem] font-[family-name:var(--font-sans)]"
      >
        <title id="twin-arch-title">{t.title}</title>
        <defs>
          <marker id="twin-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="var(--muted)" />
          </marker>
        </defs>

        <rect x={90} y={10} width={300} height={58} rx={8} {...box} />
        <text x={240} y={35} textAnchor="middle" {...heading}>{t.browser}</text>
        <text x={240} y={55} textAnchor="middle" {...sub}>{t.browserSub}</text>

        <line x1={240} y1={70} x2={240} y2={94} stroke="var(--muted)" strokeWidth={1.5} markerStart="url(#twin-arrow)" markerEnd="url(#twin-arrow)" />
        <text x={252} y={87} {...sub} fontSize={11}>{t.web}</text>

        <rect x={20} y={96} width={440} height={196} rx={10} fill="none" stroke="var(--accent)" strokeWidth={2} />
        <text x={36} y={122} {...heading} fill="var(--accent)">{t.app}</text>
        <Inner x={36} lines={t.command} note={t.commandSub} />
        <Inner x={176} lines={t.cell} note={t.cellSub} />
        <Inner x={316} lines={t.store} note={t.storeSub} />
        <line x1={164} y1={206} x2={176} y2={206} stroke="var(--muted)" strokeWidth={1.5} markerEnd="url(#twin-arrow)" />
        <line x1={304} y1={206} x2={316} y2={206} stroke="var(--muted)" strokeWidth={1.5} markerEnd="url(#twin-arrow)" />

        <line x1={120} y1={294} x2={120} y2={344} stroke="var(--muted)" strokeWidth={1.5} markerStart="url(#twin-arrow)" markerEnd="url(#twin-arrow)" />
        <text x={130} y={324} {...sub} fontSize={11}>{t.robotLink}</text>
        <line x1={360} y1={294} x2={360} y2={344} stroke="var(--muted)" strokeWidth={1.5} markerStart="url(#twin-arrow)" markerEnd="url(#twin-arrow)" />
        <text x={350} y={324} textAnchor="end" {...sub} fontSize={11}>{t.plcLink}</text>

        <rect x={20} y={346} width={200} height={70} rx={8} {...box} />
        <text x={120} y={374} textAnchor="middle" {...heading}>{t.robot}</text>
        <text x={120} y={396} textAnchor="middle" {...sub} fontSize={11}>{t.robotSub}</text>

        <rect x={260} y={346} width={200} height={70} rx={8} {...box} />
        <text x={360} y={374} textAnchor="middle" {...heading}>{t.plc}</text>
        <text x={360} y={396} textAnchor="middle" {...sub} fontSize={11}>{t.plcSub}</text>

        <line x1={120} y1={470} x2={120} y2={420} stroke="var(--muted)" strokeWidth={1.5} strokeDasharray="5 4" markerEnd="url(#twin-arrow)" />
        <rect x={20} y={470} width={440} height={64} rx={8} fill="none" stroke="var(--muted)" strokeWidth={1.5} strokeDasharray="6 5" />
        <text x={240} y={496} textAnchor="middle" {...heading} fontSize={14}>{t.safety}</text>
        <text x={240} y={518} textAnchor="middle" {...sub}>{t.safetySub}</text>
      </svg>
      <figcaption className="mt-3 text-center text-xs leading-relaxed text-muted">{t.caption}</figcaption>
    </figure>
  );
}

import type { LocalizedText } from "@/lib/content/schemas";
import { isPreviewChannel } from "@/lib/release-channel";

export interface CaseStudyFigure {
  src: string;
  width: number;
  height: number;
  alt: LocalizedText;
  caption: LocalizedText;
}

export interface CaseStudyStep {
  title: LocalizedText;
  body: LocalizedText;
  figure?: CaseStudyFigure;
}

export interface CaseStudy {
  slug: string;
  /** Which architecture diagram component the case study renders. */
  diagram: "indy7-twin" | "bamboochat";
  /** Supporting-project card this case study replaces on the projects index. */
  supportingRecordId?: string;
  /**
   * Sean's sign-off. Unapproved studies appear only on the preview channel
   * (local dev, dev.seanchoi.space); production shows approved ones only.
   */
  approved: boolean;
  /** Korean copy renders only when every field is marked reviewed. */
  title: LocalizedText;
  summary: LocalizedText;
  context: LocalizedText;
  period: LocalizedText;
  status: LocalizedText;
  stack: string[];
  repositoryHref: `https://${string}`;
  howBuilt: LocalizedText;
  hero: CaseStudyFigure;
  problem: LocalizedText[];
  built: LocalizedText[];
  walkthroughIntro: LocalizedText;
  walkthrough: CaseStudyStep[];
  decisions: LocalizedText[];
  verification: LocalizedText[];
  limits: LocalizedText[];
  next: LocalizedText[];
}

const draft = (en: string, ko: string): LocalizedText => ({ en, ko, koReview: "draft" });

// Facts below come from the neuromeka-digitaltwin repository (README, docs/, tests)
// and a simulation walkthrough recorded on 2026-10-01. Nothing here claims hardware validation.
export const indy7DigitalTwin: CaseStudy = {
  slug: "indy7-digital-twin",
  diagram: "indy7-twin",
  approved: false,
  title: draft("Indy7 Palletizing Cell Digital Twin", "Indy7 팔레타이징 셀 디지털 트윈"),
  summary: draft(
    "A simulation-first control and evidence application for a Neuromeka Indy7 palletizing cell. A PLC signal starts a job, the robot moves in 3D, and every run, fault, and recovery is recorded.",
    "Neuromeka Indy7 팔레타이징 셀을 시뮬레이션으로 먼저 구현한 제어·이력 관리 애플리케이션입니다. PLC 신호로 작업을 시작하면 로봇이 3D 화면에서 움직이고, 실행·고장·복구 이력이 모두 남습니다."
  ),
  context: draft(
    "Personal project, alongside the Physical AI & Smart Factory Training Program",
    "개인 프로젝트 · AI 융합 DX 마스터클래스 수강 중 진행"
  ),
  period: draft("Sep 2026 – present", "2026.09 – 현재"),
  status: draft(
    "Runs end to end in simulation; not yet validated on hardware",
    "시뮬레이션에서 전 과정 동작 확인 · 실장비 검증 전"
  ),
  stack: ["Python", "FastAPI", "WebSocket", "SQLite", "Three.js", "IndyDCP3", "Modbus TCP"],
  repositoryHref: "https://github.com/se4nchoi/neuromeka-digitaltwin",
  howBuilt: draft(
    "My project: I chose the problem, set the scope and system boundaries, and checked the behavior in simulation. An AI coding agent wrote much of the implementation under my direction.",
    "직접 기획한 프로젝트입니다. 해결할 문제와 범위, 시스템 경계를 정하고 시뮬레이션에서 동작을 확인했습니다. 구현의 상당 부분은 AI 코딩 에이전트에게 맡겨 진행했습니다."
  ),
  hero: {
    src: "/work/digital-twin/twin-running.png",
    width: 1600,
    height: 1000,
    alt: draft(
      "Digital twin operator screen: joint angles and tool pose on the left, a 3D Indy7 robot carrying a part in the center, pallet slots and cycle status on the right.",
      "디지털 트윈 운영 화면. 왼쪽은 관절 각도와 툴 위치, 가운데는 부품을 옮기는 Indy7 3D 모델, 오른쪽은 팔레트 슬롯과 사이클 상태."
    ),
    caption: draft(
      "Mid-cycle in simulation: part gripped, approaching pallet slot 1.",
      "시뮬레이션 사이클 진행 중: 부품을 집어 팔레트 1번 슬롯으로 이동"
    ),
  },
  problem: [
    draft(
      "In the training program's palletizing exercise, a Mitsubishi PLC, a Neuromeka Indy7 robot, and Python code all have to agree before anything moves.",
      "교육 과정의 팔레타이징 실습에서는 Mitsubishi PLC, Neuromeka Indy7 로봇, Python 코드가 서로 맞물려야 로봇이 움직입니다."
    ),
    draft(
      "When the robot doesn't move, the cause can be a ladder rule, a parameter, a connection, or the code. My classmates and I could spend tens of minutes finding which one. I wanted a system that shows where the chain stopped.",
      "로봇이 안 움직이면 원인은 래더 로직일 수도, 파라미터나 연결, 코드일 수도 있습니다. 동기들과 저는 원인을 찾느라 수십 분씩 쓰곤 했습니다. 그래서 신호가 어디서 끊겼는지 바로 보이는 시스템을 만들고 싶었습니다."
    ),
  ],
  built: [
    draft(
      "A 3D twin of the cell with live joint telemetry and numerical inverse kinematics, so Cartesian moves animate the real joint angles.",
      "실시간 관절 데이터와 수치 역기구학을 적용한 3D 셀 트윈. 직교 좌표 이동도 실제 관절 각도로 재현됩니다."
    ),
    draft(
      "A workcell state machine for palletizing and put-back, with a single owner per running program, latched stops, and explicit recovery.",
      "팔레타이징·회수 작업용 셀 상태 머신. 프로그램 실행 권한은 한 번에 한 곳만 갖고, 정지 상태는 래치되며, 복구는 반드시 명시적으로 실행합니다."
    ),
    draft(
      "A named PLC signal contract (part present DI3, start palletize DI8, start put-back DI9, stop request DI15, gripper coils 0/1) behind interchangeable simulated, Modbus TCP, and robot-I/O gateways.",
      "PLC 신호 규약 정의(부품 감지 DI3, 팔레타이징 시작 DI8, 회수 시작 DI9, 정지 요청 DI15, 그리퍼 코일 0/1). 시뮬레이션·Modbus TCP·로봇 I/O 게이트웨이를 바꿔 끼울 수 있는 구조."
    ),
    draft(
      "A SQLite evidence store for runs, cycles, step durations, state transitions, faults, and operator actions, with a production console to inspect them.",
      "실행·사이클·단계별 소요 시간·상태 전이·고장·운영자 조작을 남기는 SQLite 이력 저장소와 조회용 생산 콘솔."
    ),
  ],
  walkthroughIntro: draft(
    "One job, one failure, recorded in simulation on Oct 1, 2026.",
    "작업 하나, 고장 하나. 2026년 10월 1일 시뮬레이션에서 기록한 흐름입니다."
  ),
  walkthrough: [
    {
      title: draft("A start request that goes nowhere", "시작 신호를 보냈는데 반응이 없을 때"),
      body: draft(
        "The pallet was full and the part sensor (DI3) was off. A start pulse on DI8 was rejected, and the signal panel shows the first unmet condition instead of failing silently.",
        "팔레트는 가득 차 있었고 부품 센서(DI3)는 꺼져 있었습니다. DI8로 시작 펄스를 보내자 요청이 거부됐고, 신호 패널은 아무 표시 없이 실패하는 대신 처음 충족되지 않은 조건을 짚어 줍니다."
      ),
      figure: {
        src: "/work/digital-twin/signal-blocked.png",
        width: 1340,
        height: 560,
        alt: draft(
          "Signal to motion to evidence panel: step 1 says the part sensor is off; step 2 shows the palletize command rejected.",
          "신호→동작→이력 패널. 1단계에 부품 센서 꺼짐, 2단계에 팔레타이징 명령 거부가 표시됨."
        ),
        caption: draft("Blocked: DI3 off, so DI8 is rejected.", "차단: DI3이 꺼져 있어 DI8 요청 거부"),
      },
    },
    {
      title: draft("The same request, accepted", "같은 요청이 받아들여질 때"),
      body: draft(
        "With DI3 on, the DI8 pulse goes through the same command path the operator screen uses. The cell moves to RUNNING. A second start while running is rejected with “Cell is busy; stop the active operation first.”",
        "DI3을 켜고 DI8 펄스를 보내면 운영 화면과 똑같은 명령 경로로 처리되어 셀이 RUNNING 상태가 됩니다. 실행 중에 시작 요청을 한 번 더 보내면 “Cell is busy; stop the active operation first.” 메시지와 함께 거부됩니다."
      ),
      figure: {
        src: "/work/digital-twin/signal-accepted.png",
        width: 1340,
        height: 560,
        alt: draft(
          "Signal panel with part ready, command accepted, robot in the extract phase, and a run recording in progress.",
          "부품 준비, 명령 수락, 로봇 추출 단계, 실행 이력 기록 중이 표시된 신호 패널."
        ),
        caption: draft("Accepted: PLC input → command → motion → run record.", "수락: PLC 입력 → 명령 → 동작 → 실행 이력"),
      },
    },
    {
      title: draft("A fault mid-cycle", "사이클 도중 발생한 고장"),
      body: draft(
        "I injected a motion timeout while the robot was extracting a part from the feeder. The cell latched FAULTED and named the interrupted step.",
        "로봇이 피더에서 부품을 꺼내는 도중 동작 타임아웃을 일부러 발생시켰습니다. 셀은 FAULTED 상태로 고정되고, 어느 단계에서 멈췄는지 표시했습니다."
      ),
      figure: {
        src: "/work/digital-twin/fault-diagnostics.png",
        width: 1340,
        height: 400,
        alt: draft(
          "Diagnostics panel showing WORKCELL FAULTED with a motion timeout during the feeder pick extract move, plus jog controls.",
          "피더에서 부품을 빼내는 동작 중 타임아웃으로 WORKCELL FAULTED가 표시된 진단 패널과 조그 조작부."
        ),
        caption: draft("The fault names the step it interrupted.", "고장 메시지에 멈춘 단계가 표시됩니다."),
      },
    },
    {
      title: draft("Recovery has to be deliberate", "복구는 확인을 거친 뒤에만"),
      body: draft(
        "The first Recover was rejected: “Reconcile the held workpiece before recovery.” Only after resetting the inventory did the cell return to IDLE. Interrupted programs restart from the beginning instead of resuming, and the event stream keeps every step.",
        "처음 누른 복구는 “Reconcile the held workpiece before recovery.” 메시지와 함께 거부됐습니다. 재고 상태를 정리하고 나서야 셀이 IDLE로 돌아왔습니다. 중단된 프로그램은 이어서 실행하지 않고 처음부터 다시 시작하며, 모든 과정은 이벤트 이력에 남습니다."
      ),
      figure: {
        src: "/work/digital-twin/run-evidence.png",
        width: 1340,
        height: 670,
        alt: draft(
          "Run history: a state timeline, an event stream with fault, reset, and recover actions, and a table of production runs.",
          "실행 이력 화면: 상태 타임라인, 고장·초기화·복구 조작이 담긴 이벤트 목록, 생산 실행 표."
        ),
        caption: draft("Every transition and operator action is recorded.", "모든 상태 변화와 운영자 조작이 기록됩니다."),
      },
    },
  ],
  decisions: [
    draft(
      "One command path. HTTP, WebSocket, and PLC inputs all go through the same validation, so a PLC pulse can't skip the busy check the operator screen enforces.",
      "명령 경로는 하나. HTTP·WebSocket·PLC 입력이 모두 같은 검증을 거치기 때문에, PLC 펄스로 운영 화면의 ‘사용 중’ 검사를 우회할 수 없습니다."
    ),
    draft(
      "Stops latch and recovery never moves the robot. Starting again is a separate, explicit action.",
      "정지는 래치되고, 복구 동작으로는 로봇이 움직이지 않습니다. 다시 시작하려면 시작 명령을 따로 내려야 합니다."
    ),
    draft(
      "Network access is deny-by-default. Modbus TCP connects only when the profile is marked reviewed and both endpoints are inside the configured OT subnet. Endpoints can't be edited from the browser, and the passive preflight never opens a connection.",
      "네트워크 연결은 기본적으로 막혀 있습니다. 프로필이 검토 완료로 표시되고 두 엔드포인트가 지정된 OT 서브넷 안에 있을 때만 Modbus TCP로 연결합니다. 엔드포인트는 브라우저에서 바꿀 수 없고, 사전 점검은 실제 연결을 열지 않습니다."
    ),
    draft(
      "Safety stays outside the application. The application's stop is not an E-stop; guarding and the safety PLC must reach the robot without depending on this software.",
      "안전 기능은 애플리케이션 밖에 둡니다. 앱의 정지 기능은 비상 정지가 아니며, 방호 장치와 안전 PLC는 이 소프트웨어를 거치지 않고 로봇에 연결되어야 합니다."
    ),
    draft(
      "Layered packages (domain, application, workcell, integrations, persistence, web), with a CI check that rejects imports pointing the wrong way.",
      "도메인·애플리케이션·셀·연동·저장소·웹으로 계층을 나누고, 의존 방향이 어긋난 import는 CI에서 막습니다."
    ),
  ],
  verification: [
    draft(
      "72 automated unit and integration tests pass (run Oct 1, 2026).",
      "단위·통합 테스트 72개 통과 (2026.10.01 실행)"
    ),
    draft("The architecture boundary check passes.", "아키텍처 계층 검사 통과"),
    draft(
      "The Modbus TCP client's framing, reads, writes, failures, and reconnects are tested against a fake transport.",
      "Modbus TCP 클라이언트의 프레임 처리, 읽기·쓰기, 오류, 재연결을 가상 통신 계층으로 테스트"
    ),
  ],
  limits: [
    draft(
      "Everything on this page ran in simulation. The IndyDCP3 hardware mode and the Modbus TCP gateway exist, but PLC commissioning, real addresses, timing, and safety behavior have not been validated on the classroom cell.",
      "이 페이지의 내용은 모두 시뮬레이션 결과입니다. IndyDCP3 하드웨어 모드와 Modbus TCP 게이트웨이는 구현되어 있지만, PLC 시운전·실제 주소·타이밍·안전 동작은 아직 실습 셀에서 검증하지 않았습니다."
    ),
    draft(
      "The kinematic simulation has no collision checking, dynamics, or gripper contact model.",
      "기구학 시뮬레이션에는 충돌 검사, 동역학, 그리퍼 접촉 모델이 포함되어 있지 않습니다."
    ),
    draft(
      "The console's experiment timings are synthetic estimates, not measured cycles, so I don't quote them as performance.",
      "콘솔에 나오는 실험 소요 시간은 실제 측정값이 아니라 추정치이므로 성능 수치로 내세우지 않습니다."
    ),
  ],
  next: [
    draft(
      "Validate the signal path on the real cell: actual addresses, a normal run, and a blocked run.",
      "실습 셀에서 신호 경로 검증: 실제 주소, 정상 실행, 차단 상황"
    ),
    draft(
      "Turn “start requested, but the robot didn't move” into a guided diagnosis timeline.",
      "‘시작했는데 로봇이 안 움직인다’ 상황을 단계별로 진단하는 타임라인 만들기"
    ),
    draft("Record a short video of the full walkthrough.", "전체 흐름을 짧은 영상으로 남기기"),
  ],
};

// Facts from the intel7-chat repository (README, docs, 273 passing tests on 2026-10-01)
// and Sean's confirmation on 2026-10-01: in daily use by the class for chat, DMs, files,
// quizzes, and games; chess began as a classmate's pull request. Screenshots use a
// throwaway instance with fictional users; the real chat history is never published.
export const bambooChat: CaseStudy = {
  slug: "bamboochat",
  diagram: "bamboochat",
  supportingRecordId: "project-lan-chat",
  approved: false,
  title: draft("BambooChat: a chat and study app for my class", "BambooChat: 우리 반 채팅·학습 앱"),
  summary: draft(
    "A self-hosted chat and learning app my training-program class uses every day: channels, direct messages, file sharing, and daily quizzes on PLC and automation topics, running on a classroom PC over the local network.",
    "교육 과정 동기들이 매일 쓰는 채팅·학습 앱입니다. 채널, 1:1 대화, 파일 공유, PLC·자동화 데일리 퀴즈를 교실 PC 한 대에 직접 띄워 로컬 네트워크로 운영합니다."
  ),
  context: draft(
    "Personal project, built outside the curriculum during the Physical AI & Smart Factory Training Program",
    "개인 프로젝트 · AI 융합 DX 마스터클래스 기간 중, 정규 수업과 별개로 진행"
  ),
  period: draft("Aug 2026 – present", "2026.08 – 현재"),
  status: draft("In daily use by my class of 22", "동기 22명이 매일 사용 중"),
  stack: ["Python", "FastAPI", "WebSocket", "SQLite", "Jinja2", "JavaScript", "Gemini API"],
  repositoryHref: "https://github.com/se4nchoi/intel7-chat",
  howBuilt: draft(
    "I started it, decide what it does, and run it for the class. An AI coding agent wrote much of the code under my direction. A classmate contributed the first chess implementation through a pull request, which I reworked to fit the app.",
    "직접 시작해 기능 방향을 정하고, 반을 위해 운영하고 있습니다. 코드의 상당 부분은 AI 코딩 에이전트에게 맡겨 작성했습니다. 체스는 한 동기가 풀 리퀘스트로 처음 기여했고, 이를 앱 구조에 맞게 다시 손봤습니다."
  ),
  hero: {
    src: "/work/bamboochat/channel-plc.png",
    width: 1440,
    height: 900,
    alt: draft(
      "BambooChat in a PLC practice channel: one student asks why output Y0 turns off when X0 is released, and another answers to add Y0 in parallel as a self-holding contact.",
      "BambooChat PLC 실습 채널. 한 학생이 X0를 떼면 Y0가 꺼지는 이유를 묻고, 다른 학생이 Y0 a접점을 병렬로 넣어 자기유지를 걸라고 답하는 장면."
    ),
    caption: draft(
      "Demo instance with fictional classmates. The real class history stays private.",
      "가상의 동기들로 꾸민 데모 화면입니다. 실제 대화 기록은 공개하지 않습니다."
    ),
  },
  problem: [
    draft(
      "My class of 22 needed one place for announcements, questions, course files, and practice during the six-month program.",
      "22명이 함께하는 6개월 과정 동안 공지, 질문, 수업 자료, 복습을 한곳에서 해결할 공간이 필요했습니다."
    ),
    draft(
      "I built it to run on a single classroom PC, with its core features working over the local network without internet access.",
      "교실 PC 한 대로 돌아가고, 핵심 기능은 인터넷 없이 로컬 네트워크만으로 쓸 수 있게 만들었습니다."
    ),
  ],
  built: [
    draft(
      "Accounts with Argon2id-hashed passwords, a class enrollment code the admin can close once everyone has joined, 12-hour sessions, and rate-limited login.",
      "Argon2id로 해시한 비밀번호, 모두 가입하면 관리자가 닫을 수 있는 반 가입 코드, 12시간 세션, 로그인 시도 횟수 제한"
    ),
    draft(
      "Real-time channels and direct messages over WebSocket, with mentions, replies, Markdown, pins, search, and read state that persists across sessions.",
      "WebSocket 기반 실시간 채널·1:1 대화. 멘션, 답장, Markdown, 메시지 고정, 검색, 다시 접속해도 유지되는 읽음 상태"
    ),
    draft(
      "File sharing with account-based permissions and per-user and total storage limits.",
      "계정별 권한과 사용자별·전체 용량 제한을 둔 파일 공유"
    ),
    draft(
      "Daily quizzes on PLC, automation, and electrical topics, with streaks and a leaderboard. Anyone can build a question set, and Gemini can draft questions from a PDF or text.",
      "PLC·자동화설비·전기 분야 데일리 퀴즈와 연속 학습 기록·순위표. 누구나 문제집을 만들 수 있고, Gemini로 PDF나 텍스트에서 문제 초안을 뽑을 수 있음"
    ),
    draft(
      "Turn-based games with server-validated moves: chess (started by a classmate), janggi, omok, and othello.",
      "서버에서 수를 검증하는 턴제 게임: 체스(동기가 처음 기여), 장기, 오목, 오델로"
    ),
  ],
  walkthroughIntro: draft(
    "How the class uses it. Screens are from a demo instance with fictional users.",
    "반에서 실제로 쓰는 모습입니다. 화면은 가상의 사용자로 만든 데모입니다."
  ),
  walkthrough: [
    {
      title: draft("Questions get answered by classmates", "질문하면 동기가 답합니다"),
      body: draft(
        "Each subject gets its own channel. A ladder-logic question in the PLC channel gets an answer from another student, and the thread stays searchable for the next person who hits the same problem.",
        "과목마다 채널이 따로 있습니다. PLC 채널에 래더 로직 질문이 올라오면 다른 학생이 답하고, 같은 문제를 겪는 사람은 나중에 검색으로 찾아볼 수 있습니다."
      ),
    },
    {
      title: draft("Daily practice that counts", "매일 쌓이는 복습"),
      body: draft(
        "The daily quiz keeps a streak and a leaderboard. Ladder-input questions accept equivalent answers, so “Y0”, “Y00”, and “OR Y0” are all marked correct for a self-holding contact.",
        "데일리 퀴즈는 연속 학습 기록과 순위표가 남습니다. 래더 입력 문제는 표기가 달라도 같은 답이면 인정해서, 자기유지 접점 문제에 “Y0”, “Y00”, “OR Y0” 모두 정답으로 처리됩니다."
      ),
      figure: {
        src: "/work/bamboochat/daily-quiz.png",
        width: 1040,
        height: 780,
        alt: draft(
          "Quiz and ranking center showing today's PLC question about a self-holding circuit, with subject categories, a streak counter, and quick-input buttons for ladder symbols.",
          "퀴즈·랭킹 센터. 자기유지 회로에 관한 오늘의 PLC 문제, 과목 목록, 연속 기록, 래더 기호 빠른 입력 버튼이 보임."
        ),
        caption: draft("Today's quiz: a ladder-input question on a self-holding circuit.", "오늘의 퀴즈: 자기유지 회로 래더 입력 문제"),
      },
    },
  ],
  decisions: [
    draft(
      "LAN first. It runs on one classroom PC, and the core features need no internet. External AI is opt-in, and the README states exactly what is sent to Gemini.",
      "LAN 우선. 교실 PC 한 대로 돌아가고, 핵심 기능은 인터넷이 없어도 됩니다. 외부 AI는 필요할 때만 쓰는 기능이고, Gemini로 어떤 데이터가 전송되는지 README에 적어 두었습니다."
    ),
    draft(
      "Honest about its security boundary. It serves plain HTTP on a trusted network, so the app shows a banner telling people not to share sensitive information, and the README rules out exposing it through port forwarding.",
      "보안상 한계를 감추지 않습니다. 신뢰할 수 있는 내부망에서 HTTP로 동작하기 때문에 화면 상단에 민감한 정보를 올리지 말라는 안내를 띄우고, README에서 포트 포워딩으로 외부에 여는 것을 금지했습니다."
    ),
    draft(
      "No plain-text secrets. The admin password and enrollment code are stored only as Argon2id hashes, and message, upload, and login rates are limited.",
      "비밀값은 평문으로 저장하지 않습니다. 관리자 비밀번호와 가입 코드는 Argon2id 해시로만 보관하고, 메시지·업로드·로그인 횟수를 제한합니다."
    ),
    draft(
      "Data lives outside the code. The SQLite database and uploads sit in a separate data folder, so updates and restarts keep the class history, and schema migrations run on startup.",
      "데이터는 코드와 따로 둡니다. SQLite DB와 업로드 파일을 별도 데이터 폴더에 두어 업데이트하거나 재시작해도 반의 기록이 그대로 남고, 스키마 마이그레이션은 서버 시작 시 실행됩니다."
    ),
  ],
  verification: [
    draft(
      "273 automated tests pass (run Oct 1, 2026), covering channels, direct messages, identity, and each game engine and manager.",
      "자동화 테스트 273개 통과 (2026.10.01 실행). 채널, 1:1 대화, 계정, 게임별 엔진과 관리 로직 검증"
    ),
    draft(
      "In daily use by the class since August 2026 for chat, direct messages, file sharing, quizzes, and games.",
      "2026년 8월부터 반에서 채팅, 1:1 대화, 파일 공유, 퀴즈, 게임에 매일 사용 중"
    ),
  ],
  limits: [
    draft(
      "It's built for a trusted classroom network over plain HTTP, not for the public internet.",
      "신뢰할 수 있는 교실 내부망용 HTTP 서비스로, 공개 인터넷에 여는 용도가 아닙니다."
    ),
    draft(
      "It depends on one classroom PC staying on; there is no separate hosting yet.",
      "교실 PC 한 대가 켜져 있어야 하며, 아직 별도 서버는 없습니다."
    ),
    draft(
      "The games grew faster than the classroom features. I'm now refocusing on what helps the class learn.",
      "게임 기능이 학습 기능보다 빨리 늘어났습니다. 지금은 수업에 실제로 도움이 되는 기능에 다시 집중하고 있습니다."
    ),
    draft(
      "I don't collect usage analytics, so I don't quote engagement numbers.",
      "사용 통계를 따로 수집하지 않기 때문에 참여도 수치는 내세우지 않습니다."
    ),
  ],
  next: [
    draft(
      "A central-hub prototype (on the edu/prototype branch) with instructor and student roles per cohort, PostgreSQL, and SFU-based screen sharing for several classrooms. It is not deployed yet.",
      "여러 반을 위한 중앙 허브 프로토타입(edu/prototype 브랜치): 반별 강사·학생 권한, PostgreSQL, SFU 기반 화면 공유. 아직 배포 전"
    ),
    draft(
      "Move hosting off a single classroom PC once the academy's network and equipment are confirmed.",
      "학원 네트워크와 장비 상황이 확인되면 교실 PC 한 대에 의존하지 않는 호스팅으로 이전"
    ),
  ],
};

export const caseStudies: CaseStudy[] = [indy7DigitalTwin, bambooChat];

type ChannelEnv = Parameters<typeof isPreviewChannel>[0];

/** Case studies this build may show: approved ones, plus all of them on preview. */
export function getVisibleCaseStudies(env?: ChannelEnv): CaseStudy[] {
  const preview = isPreviewChannel(env);
  return caseStudies.filter((study) => study.approved || preview);
}

export function getCaseStudy(slug: string, env?: ChannelEnv): CaseStudy | undefined {
  return getVisibleCaseStudies(env).find((study) => study.slug === slug);
}

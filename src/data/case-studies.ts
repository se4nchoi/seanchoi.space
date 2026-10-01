import type { LocalizedText } from "@/lib/content/schemas";

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
  /** Approval gate: only `true` studies are routed, listed, and built. */
  published: boolean;
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
  published: true,
  title: draft("Indy7 Palletizing Cell Digital Twin", "Indy7 팔레타이징 셀 디지털 트윈"),
  summary: draft(
    "A simulation-first control and evidence application for a Neuromeka Indy7 palletizing cell. A PLC signal starts a job, the robot moves in 3D, and every run, fault, and recovery is recorded.",
    "Neuromeka Indy7 팔레타이징 셀을 위한 시뮬레이션 우선 제어·기록 애플리케이션입니다. PLC 신호로 작업이 시작되고, 로봇이 3D로 움직이며, 모든 실행·고장·복구가 기록됩니다."
  ),
  context: draft(
    "Personal project, alongside the Physical AI & Smart Factory Training Program",
    "개인 프로젝트 (AI 융합 DX 마스터클래스 수강 중 진행)"
  ),
  period: draft("Sep 2026 – present", "2026.09 – 진행 중"),
  status: draft(
    "Runs end to end in simulation; not yet validated on hardware",
    "시뮬레이션에서 전체 흐름 동작, 실제 장비 검증 전"
  ),
  stack: ["Python", "FastAPI", "WebSocket", "SQLite", "Three.js", "IndyDCP3", "Modbus TCP"],
  repositoryHref: "https://github.com/se4nchoi/neuromeka-digitaltwin",
  howBuilt: draft(
    "My project: I chose the problem, set the scope and system boundaries, and checked the behavior in simulation. An AI coding agent wrote much of the implementation under my direction.",
    "제가 주도한 프로젝트입니다. 문제와 범위, 시스템 경계를 정하고 시뮬레이션에서 동작을 확인했습니다. 구현의 상당 부분은 제 지시에 따라 AI 코딩 에이전트가 작성했습니다."
  ),
  hero: {
    src: "/work/digital-twin/twin-running.png",
    width: 1600,
    height: 1000,
    alt: draft(
      "Digital twin operator screen: joint angles and tool pose on the left, a 3D Indy7 robot carrying a part in the center, pallet slots and cycle status on the right.",
      "디지털 트윈 운영 화면: 왼쪽에 관절 각도와 툴 자세, 가운데에 부품을 옮기는 3D Indy7 로봇, 오른쪽에 팔레트 슬롯과 사이클 상태."
    ),
    caption: draft(
      "Mid-cycle in simulation: part gripped, approaching pallet slot 1.",
      "시뮬레이션 사이클 중: 부품을 잡고 팔레트 1번 슬롯으로 접근."
    ),
  },
  problem: [
    draft(
      "In the training program's palletizing exercise, a Mitsubishi PLC, a Neuromeka Indy7 robot, and Python code all have to agree before anything moves.",
      "교육 과정의 팔레타이징 실습에서는 Mitsubishi PLC, Neuromeka Indy7 로봇, Python 코드가 모두 맞아야 로봇이 움직입니다."
    ),
    draft(
      "When the robot doesn't move, the cause can be a ladder rule, a parameter, a connection, or the code. My classmates and I could spend tens of minutes finding which one. I wanted a system that shows where the chain stopped.",
      "로봇이 움직이지 않을 때 원인은 래더 로직, 파라미터, 연결, 코드 중 어디에나 있을 수 있고, 동기들과 저는 그걸 찾는 데 수십 분을 쓰곤 했습니다. 신호가 어디서 멈췄는지 보여 주는 시스템을 만들고 싶었습니다."
    ),
  ],
  built: [
    draft(
      "A 3D twin of the cell with live joint telemetry and numerical inverse kinematics, so Cartesian moves animate the real joint angles.",
      "실시간 관절 텔레메트리와 수치 역기구학을 갖춘 3D 셀 트윈. 직교 좌표 이동이 실제 관절 각도로 표시됩니다."
    ),
    draft(
      "A workcell state machine for palletizing and put-back, with a single owner per running program, latched stops, and explicit recovery.",
      "팔레타이징·회수 작업을 위한 셀 상태 머신. 실행 중인 프로그램은 하나의 소유자만 가지며, 정지는 래치되고 복구는 명시적으로 수행합니다."
    ),
    draft(
      "A named PLC signal contract (part present DI3, start palletize DI8, start put-back DI9, stop request DI15, gripper coils 0/1) behind interchangeable simulated, Modbus TCP, and robot-I/O gateways.",
      "이름이 붙은 PLC 신호 계약(부품 감지 DI3, 팔레타이징 시작 DI8, 회수 시작 DI9, 정지 요청 DI15, 그리퍼 코일 0/1)과 이를 교체 가능한 시뮬레이션·Modbus TCP·로봇 I/O 게이트웨이."
    ),
    draft(
      "A SQLite evidence store for runs, cycles, step durations, state transitions, faults, and operator actions, with a production console to inspect them.",
      "실행, 사이클, 단계별 소요 시간, 상태 전이, 고장, 운영자 조작을 기록하는 SQLite 저장소와 이를 확인하는 생산 콘솔."
    ),
  ],
  walkthroughIntro: draft(
    "One job, one failure, recorded in simulation on Oct 1, 2026.",
    "작업 하나, 고장 하나. 2026년 10월 1일 시뮬레이션에서 기록했습니다."
  ),
  walkthrough: [
    {
      title: draft("A start request that goes nowhere", "아무 일도 일어나지 않는 시작 요청"),
      body: draft(
        "The pallet was full and the part sensor (DI3) was off. A start pulse on DI8 was rejected, and the signal panel shows the first unmet condition instead of failing silently.",
        "팔레트가 가득 차 있고 부품 센서(DI3)가 꺼진 상태였습니다. DI8 시작 펄스는 거부되었고, 신호 패널은 조용히 실패하는 대신 처음으로 충족되지 않은 조건을 보여 줍니다."
      ),
      figure: {
        src: "/work/digital-twin/signal-blocked.png",
        width: 1340,
        height: 560,
        alt: draft(
          "Signal to motion to evidence panel: step 1 says the part sensor is off; step 2 shows the palletize command rejected.",
          "신호-동작-기록 패널: 1단계는 부품 센서가 꺼져 있음을, 2단계는 팔레타이징 명령이 거부되었음을 보여 줌."
        ),
        caption: draft("Blocked: DI3 off, so DI8 is rejected.", "차단됨: DI3이 꺼져 있어 DI8 거부."),
      },
    },
    {
      title: draft("The same request, accepted", "같은 요청, 수락"),
      body: draft(
        "With DI3 on, the DI8 pulse goes through the same command path the operator screen uses. The cell moves to RUNNING. A second start while running is rejected with “Cell is busy; stop the active operation first.”",
        "DI3을 켜면 DI8 펄스가 운영 화면과 같은 명령 경로를 거쳐 처리되고, 셀은 RUNNING이 됩니다. 실행 중 두 번째 시작 요청은 “Cell is busy; stop the active operation first.”로 거부됩니다."
      ),
      figure: {
        src: "/work/digital-twin/signal-accepted.png",
        width: 1340,
        height: 560,
        alt: draft(
          "Signal panel with part ready, command accepted, robot in the extract phase, and a run recording in progress.",
          "부품 준비, 명령 수락, 로봇 추출 단계, 실행 기록 진행 중을 보여 주는 신호 패널."
        ),
        caption: draft("Accepted: PLC input → command → motion → run record.", "수락: PLC 입력 → 명령 → 동작 → 실행 기록."),
      },
    },
    {
      title: draft("A fault mid-cycle", "사이클 중 고장"),
      body: draft(
        "I injected a motion timeout while the robot was extracting a part from the feeder. The cell latched FAULTED and named the interrupted step.",
        "로봇이 피더에서 부품을 꺼내는 중에 동작 타임아웃을 주입했습니다. 셀은 FAULTED 상태로 래치되고 중단된 단계를 표시했습니다."
      ),
      figure: {
        src: "/work/digital-twin/fault-diagnostics.png",
        width: 1340,
        height: 400,
        alt: draft(
          "Diagnostics panel showing WORKCELL FAULTED with a motion timeout during the feeder pick extract move, plus jog controls.",
          "피더 픽 추출 이동 중 동작 타임아웃으로 WORKCELL FAULTED를 표시하는 진단 패널과 조그 제어."
        ),
        caption: draft("The fault names the step it interrupted.", "고장 메시지가 중단된 단계를 알려 줍니다."),
      },
    },
    {
      title: draft("Recovery has to be deliberate", "복구는 의도적으로"),
      body: draft(
        "The first Recover was rejected: “Reconcile the held workpiece before recovery.” Only after resetting the inventory did the cell return to IDLE. Interrupted programs restart from the beginning instead of resuming, and the event stream keeps every step.",
        "첫 번째 복구 요청은 “Reconcile the held workpiece before recovery.”로 거부되었습니다. 재고를 정리한 뒤에야 셀이 IDLE로 돌아왔습니다. 중단된 프로그램은 이어서 실행되지 않고 처음부터 다시 시작하며, 이벤트 기록에 모든 단계가 남습니다."
      ),
      figure: {
        src: "/work/digital-twin/run-evidence.png",
        width: 1340,
        height: 670,
        alt: draft(
          "Run history: a state timeline, an event stream with fault, reset, and recover actions, and a table of production runs.",
          "실행 이력: 상태 타임라인, 고장·초기화·복구 조작이 담긴 이벤트 기록, 생산 실행 표."
        ),
        caption: draft("Every transition and operator action is recorded.", "모든 상태 전이와 운영자 조작이 기록됩니다."),
      },
    },
  ],
  decisions: [
    draft(
      "One command path. HTTP, WebSocket, and PLC inputs all go through the same validation, so a PLC pulse can't skip the busy check the operator screen enforces.",
      "명령 경로는 하나. HTTP, WebSocket, PLC 입력이 모두 같은 검증을 거치므로, PLC 펄스가 운영 화면의 사용 중 검사를 건너뛸 수 없습니다."
    ),
    draft(
      "Stops latch and recovery never moves the robot. Starting again is a separate, explicit action.",
      "정지는 래치되고, 복구는 로봇을 움직이지 않습니다. 다시 시작하는 것은 별도의 명시적 조작입니다."
    ),
    draft(
      "Network access is deny-by-default. Modbus TCP connects only when the profile is marked reviewed and both endpoints are inside the configured OT subnet. Endpoints can't be edited from the browser, and the passive preflight never opens a connection.",
      "네트워크 접근은 기본 차단입니다. Modbus TCP는 프로필이 검토 완료로 표시되고 두 엔드포인트가 지정된 OT 서브넷 안에 있을 때만 연결합니다. 브라우저에서 엔드포인트를 수정할 수 없고, 사전 점검은 실제 연결을 열지 않습니다."
    ),
    draft(
      "Safety stays outside the application. The application's stop is not an E-stop; guarding and the safety PLC must reach the robot without depending on this software.",
      "안전 기능은 애플리케이션 밖에 둡니다. 애플리케이션 정지는 비상 정지가 아니며, 방호 장치와 안전 PLC는 이 소프트웨어와 무관하게 로봇에 연결되어야 합니다."
    ),
    draft(
      "Layered packages (domain, application, workcell, integrations, persistence, web), with a CI check that rejects imports pointing the wrong way.",
      "도메인·애플리케이션·셀·연동·저장·웹 계층으로 패키지를 나누고, 잘못된 방향의 import를 CI에서 차단합니다."
    ),
  ],
  verification: [
    draft(
      "72 automated unit and integration tests pass (run Oct 1, 2026).",
      "단위·통합 테스트 72개 통과 (2026년 10월 1일 실행)."
    ),
    draft("The architecture boundary check passes.", "아키텍처 경계 검사 통과."),
    draft(
      "The Modbus TCP client's framing, reads, writes, failures, and reconnects are tested against a fake transport.",
      "Modbus TCP 클라이언트의 프레이밍, 읽기·쓰기, 실패, 재연결을 가짜 전송 계층으로 테스트."
    ),
  ],
  limits: [
    draft(
      "Everything on this page ran in simulation. The IndyDCP3 hardware mode and the Modbus TCP gateway exist, but PLC commissioning, real addresses, timing, and safety behavior have not been validated on the classroom cell.",
      "이 페이지의 모든 내용은 시뮬레이션에서 실행했습니다. IndyDCP3 하드웨어 모드와 Modbus TCP 게이트웨이는 구현되어 있지만, PLC 시운전, 실제 주소, 타이밍, 안전 동작은 실습 셀에서 아직 검증하지 않았습니다."
    ),
    draft(
      "The kinematic simulation has no collision checking, dynamics, or gripper contact model.",
      "기구학 시뮬레이션에는 충돌 검사, 동역학, 그리퍼 접촉 모델이 없습니다."
    ),
    draft(
      "The console's experiment timings are synthetic estimates, not measured cycles, so I don't quote them as performance.",
      "콘솔의 실험 소요 시간은 측정값이 아닌 합성 추정치이므로 성능 수치로 인용하지 않습니다."
    ),
  ],
  next: [
    draft(
      "Validate the signal path on the real cell: actual addresses, a normal run, and a blocked run.",
      "실제 셀에서 신호 경로 검증: 실제 주소, 정상 실행, 차단된 실행."
    ),
    draft(
      "Turn “start requested, but the robot didn't move” into a guided diagnosis timeline.",
      "“시작했는데 로봇이 안 움직인다”를 단계별 진단 타임라인으로 만들기."
    ),
    draft("Record a short video of the full walkthrough.", "전체 흐름을 짧은 영상으로 기록하기."),
  ],
};

export const caseStudies: CaseStudy[] = [indy7DigitalTwin];

export const publishedCaseStudies = caseStudies.filter((study) => study.published);

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return publishedCaseStudies.find((study) => study.slug === slug);
}

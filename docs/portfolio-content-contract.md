# Portfolio Publication Content Contract

**Purpose:** Control factual publication across `seanchoi.space`, localized pages, project case studies, retained historical articles, and public professional profiles.

**Owner:** Sean Choi

**Planning and interpretation:** Codex

**Implementation:** Gemini or another explicitly assigned implementation agent

**Current status:** WP6D career positioning and engineering-evidence realignment implemented for review; executable checks, rendered EN/KO review, final bilingual editorial approval, LinkedIn consistency, and remaining publication checks are still pending

**Last reviewed:** 2026-09-17

## 1. Authority and use

This contract is the canonical publication boundary for portfolio v2. It does not attempt to reconstruct Sean’s entire career ledger. It records what may be published, what needs evidence, what must remain qualified, and what must not be published.

Use it before:

- writing or revising homepage, Experience, project, biography, or public-profile copy;
- migrating legacy content;
- translating factual content into Korean;
- generating structured data or metadata containing career facts;
- giving an implementation agent content to render.

Factual approval and editorial finality are separate. WP6 may render contract-safe baseline copy in preview so real content can expose layout, density, and authoring problems. Preview implementation does not make every sentence launch-final. Before publication, review the rendered English and Korean pages, compare their information density and hierarchy with relevant portfolio references, and explicitly approve the final copy and visual treatment.

Repository code, v1 pages, README text, old résumés, LLM-generated drafts, chatbot prompts, and historical posts are evidence candidates—not automatic authority.

Codex interprets evidence and prepares approved content specifications. Gemini implements supplied specifications and must not resolve factual ambiguity, strengthen wording, choose career positioning, or generate publishable career claims.

## 2. Claim states

Every consequential factual claim should have one of these states:

| State | Meaning | Publication rule |
| --- | --- | --- |
| `verified` | Sean approved it and an authoritative source or direct confirmation supports it | May publish within the approved wording/boundary |
| `approved-direction` | Sean approved the positioning, but exact publishable wording or supporting facts remain under review | May guide architecture; do not publish as a precise factual claim |
| `pending` | Plausible or present in legacy material, but not verified | Do not publish as fact |
| `restricted` | True or potentially true but unsuitable for public disclosure | Do not publish; retain only the minimum internal note needed |
| `prohibited` | Unsupported, inflated, misleading, obsolete, or explicitly excluded | Must not publish |
| `retired` | Previously public but intentionally removed or superseded | Preserve redirects/history as required; do not reuse as current copy |

Silence is not verification. If a field is absent from this contract, treat it as `pending`.

## 3. Approved product and audience facts

| Claim | State | Approved boundary |
| --- | --- | --- |
| Primary employment market is Korea plus international roles | `verified` | May guide site language, calls to action, and résumé conventions |
| English is the default portfolio language | `verified` | English-first presentation is intentional and demonstrates professional English capability |
| Korean is a reviewed localization | `verified` | Use human-reviewed Korean routes; no runtime machine translation |
| Primary audience order is recruiter, hiring manager, technical peer | `verified` | May guide information hierarchy; not public biography copy |
| Portfolio should provide deeper evidence than the submitted résumé | `verified` | Do not duplicate the résumé as a web page by default |
| Public résumé output is omitted from v2 | `verified` | No public PDF, résumé route/action/asset, or résumé metadata; private application résumés remain outside the repository |
| About is deferred from v2 | `verified` | Short personal/trajectory context may appear on the homepage |
| Notion is outside v2 | `verified` | No Notion dependency or importer in the v2 application |

## 4. Identity and contact

| Field | Current value or rule | State | Required verification/action |
| --- | --- | --- | --- |
| English public display name | `Sean Choi` | `verified` | Use visibly on English routes |
| Korean public display name | `최예현` | `verified` | Use visibly on Korean routes |
| Legal/romanized name | `Yehyun Choi` | `verified`, non-public | Internal structured identity only; do not display on English or Korean routes unless later approved |
| Public email | `se4n.choi@gmail.com` | `verified` | Approved recruiting contact |
| Public location | `South Korea` | `verified` | Preferred public location |
| City | `Daegu, South Korea` is accurate | `verified`, normally omit | Use only when a later content job needs city precision |
| Phone, street address, work authorization/immigration details | None public | `prohibited` | Never publish |
| GitHub | `https://github.com/se4nchoi` | `verified` | Approved canonical profile |
| LinkedIn | `https://www.linkedin.com/in/se4nchoi/` | `verified` URL | Stale “final-year student” wording must not override June 2026 degree conferral |
| Current domain | `seanchoi.space` | `verified` for v2 launch planning | Keep through v2 stabilization |

## 5. Core professional positioning

### Approved English lead

> **Computer engineer who builds and integrates software, AI, and infrastructure for physical systems.**
>
> Professional software and integration experience is the foundation. Current training and self-directed work extend it into automation, robot-cell integration, and the physical systems those layers must operate.

State: `verified` and approved for English publication on 2026-09-17. This supersedes the 2026-08-31 homepage lead. Supporting evidence must not imply completed professional AI, robotics, controls, embedded, or infrastructure ownership beyond the records below.

### Approved Korean lead

> **소프트웨어·AI·인프라를 로봇과 산업 시스템에 연결해 실제 현장에서 동작하게 만드는 엔지니어.**

State: `verified` and approved for Korean publication on 2026-09-17. New supporting Korean evidence copy remains editorially reviewable until Sean completes the rendered bilingual review.

### Approved factual baseline

> Sean Choi is a Computer Engineering graduate with approximately two years of professional software-development experience across frontend applications, full-stack internal tooling, and user-interface integration with operational APIs and streams. He is extending that foundation through in-progress Physical AI and smart-factory training focused on software, equipment, and OT integration.

State: `approved-direction`. Its factual components are verified; final English narrative requires Sean's approval.

| Component | State | Approved boundary |
| --- | --- | --- |
| Computer Engineering graduate | `verified` | Approved BASc wording in Section 6; conferred June 2026; never publish CGPA |
| Approximately two years' professional experience | `verified` | Approved EMG and Hoek dates; month precision |
| Frontend applications | `verified` | EMG and Hoek within Section 7 boundaries |
| Full-stack internal tooling | `verified`, bounded | Hoek attendance product included actual Koa/MySQL backend work; not a contractual title |
| Operational API/stream integration | `verified`, bounded | EMG frontend consumed APIs/streams built by senior/backend engineers; Sean implemented React UI/control integration for the real-vehicle door-lock feature |
| Physical-systems direction | `verified` as trajectory | Expansion of existing software/integration work through in-progress training and self-directed work; not a restart or abandonment of software |
| AI in the lead | `verified` positioning with bounded support | Current supporting evidence is training/planned unless later completed; do not imply professional AI or perception ownership |

### Positioning boundaries

| Language | State/rule |
| --- | --- |
| “Computer engineer” | `verified`; approved primary identity grounded in the BASc and bounded evidence system |
| “Software developer” | `verified`; safe general identity and EMG website title |
| “Software engineer” | `restricted` as default/general or contractual website title; targeted résumé use only |
| “Full-stack engineer/developer” | `verified`, bounded Hoek prose only; not a recovered contractual title |
| “Systems integration experience” | `verified`, bounded; name interfaces/team boundaries and never imply EMG backend, firmware, embedded, or full-system ownership |
| Professional robotics, embedded, automation, PLC, SCADA, or edge-AI titles | `prohibited` |
| “Expert” or equivalent | `prohibited` |

## 6. Education and training

| Record | Approved value | State/boundary |
| --- | --- | --- |
| University of Toronto | `Bachelor of Applied Science (BASc), Computer Engineering — University of Toronto, 2026` | `verified`; completed/conferred June 2026; supersedes stale “final-year student” wording |
| CGPA | `2.22` in private evidence | `prohibited`; do not publish |
| Program label/provider | `부산인력개발원 - Intel: AI 융합 DX 마스터클래스` | `verified` official Korean display; provisional English rendering `Physical AI & Smart Factory Training Program` approved for preview by Sean |
| Dates/status | June 22–December 24, 2026; in progress | `verified`; public month precision |
| Study areas | PLC/ladder logic, sensors/IoT, industrial networking, Linux/WSL, Docker, AI/ML, OpenVINO, equipment/OT integration concepts | `verified` training scope; not professional expertise |
| Classroom LAN Chat | Self-directed FastAPI, WebSocket, SQLite application used by 22 classmates | `verified` personal/project output completed during the program period but outside its curriculum; no broader impact inference |
| Classroom Q&A Board (`대나무지식인`) | Self-directed four-person classroom Q&A MVP; Sean handled backend/database integration | `verified` personal/project output completed during the program period but outside its curriculum; preserve team boundary |
| Exercises | PLC, Arduino, sensor, local-network implementation | `verified` training output; not production |
| Guided robot-cell hardware integration | Mitsubishi PLC, CC-Link, Neuromeka robot arm, servo-controlled loading docks, explicit handshake/state signals | `verified` training evidence; guided team work on shared training equipment, not solo or production ownership |
| ROS2 Industrial Robot Cell Integration | Self-directed individual work during self-study using shared training-facility hardware | `verified` current project context; completed foundation and planned scope must remain separately labeled |
| ROS2 control, orchestration/state machine, timeout/fault/recovery | Planned | `verified` as planned scope only; never render as completed evidence |
| Perception/OpenVINO/edge-AI robot behavior | Training/later planned work | Not completed project evidence; never imply implemented perception-driven behavior |

Training records require accurate `planned`, `in-progress`, or `completed` status and an evidence level. Do not list unused coursework/tools prospectively.

## 7. Professional experience ledger

### Hoek Agency (획기획)

| Field | Approved value | State/boundary |
| --- | --- | --- |
| Organization | `Hoek Agency (획기획)` | `verified`; omit 제조도 from heading |
| Title | `Software Developer — Frontend to Full-Stack` | `verified` safe public title; contractual title unrecovered |
| Dates | September 2022–August 2023 | `verified`; actual start Sep 5; final day unavailable |
| Attendance product | Internal Attendance / HR Product (`몰입도`); Korean `사내 근태·HR 시스템 몰입도`; frontend plus actual Koa/MySQL backend development | `verified`; internal system only, not a commercial external product |
| Attendance rules | Active-session clock-in/out checks, multiple work/break periods, and team-adopted 06:00 operational workday boundary for overnight work | `verified`; evidence of translating domain rules into application state/business logic |
| “Full-Stack Engineer” contractual title; product-lead/end-to-end ownership | Not verified | `prohibited` |
| Unsupported percentages/metrics | Legacy claims | `prohibited` |

### EMG Global

| Field | Approved value | State/boundary |
| --- | --- | --- |
| Organization/title | `EMG Global`; official `개발자`; website `Software Developer` | `verified`; “Software Engineer” only in separately approved targeted résumés |
| Dates | July 2021–July 31, 2022 | `verified`; publish July 2021–July 2022; supersedes Aug 2021 start/July 12 end |
| Frontend/API/stream integration | Frontend interfaces integrated with APIs/streams built by senior/backend engineers | `verified`; no backend, WebSocket, or data-pipeline ownership |
| RUTA40 door-lock feature | Embedded team built module; backend exposed HTTPS control API; Sean owned React UI/API integration and worked on the real vehicle | `verified`; real-vehicle boundary diagnosis may be described; preserve firmware/backend boundaries |
| Daegu Smart City Challenge | Sean integrated exposed APIs/real-time streams into frontend visualization and UI behavior | `verified`; do not claim backend WebSocket, data-pipeline, or database ownership |
| Firmware/embedded ownership, exact CCTV counts, personal funding/selection attribution, satisfaction/performance metrics | Not approved/unsupported | `prohibited` |

### Korea Defense Intelligence Command

`Korea Defense Intelligence Command — Sergeant / English Interpreter, October 2016–July 2018` is `verified` additional experience. The approved Korean display is `KDIC (국군정보사령부) — 영어어학병`. It may support bilingual communication, translation, structured-environment work, and the bounded automation contribution below.

- Built JavaScript utilities for Hangul text decomposition and dictionary-driven Korean-to-English replacement actions.
- Built VBA utilities for file renaming and Windows Explorer workflow actions to reduce repetitive steps in the translation process.
- Coordinated with on-premise Korean and U.S. technology/IT teams to establish what execution was permitted in a restricted environment where PowerShell was prohibited and other execution methods required alignment.
- The workflow and tool categories are approved for disclosure. Document contents, translated material, operational context beyond this boundary, and other sensitive details are `restricted` and must never be published.
- No time-saving percentage or other performance metric is approved. Unverified leadership and award claims remain `prohibited`.

## 8. Projects and case studies

No WP7 flagship is approved. WP6D may publish a grouped engineering-evidence index containing bounded professional systems work, self-directed projects, training exercises, and current work. These records are not flagship case studies and do not receive fabricated detail routes.

`ROS2 Industrial Robot Cell Integration` / `ROS2 산업용 로봇 셀 통합` is the approved current working title. Completed starting evidence is limited to PLC ↔ Neuromeka real-hardware integration, CC-Link handshake reasoning, and multi-dock/servo-loading-dock coordination. ROS2 control, orchestration/state-machine behavior, timeout/fault/recovery handling, and later perception/edge AI remain planned.

Detailed case studies require separate approved specifications with context, contribution boundaries, artifact-grounded decisions, verification, limitations, disclosure-safe evidence, actual technologies, and localization status.

### Explicit restrictions

- No public placeholders, planned features as completed, or simulator-as-production claims.
- Do not call an AMR simulator a production ACS/fleet manager or imply independently designed industrial architecture from guided work.
- Do not include CAN/STM32/FreeRTOS as completed WP6 projects.
- STM32/MCP2515 was exploratory: basic SPI/mode communication was tested; end-to-end CAN transmission/reception was not completed or physically revalidated.
- A simulated-data telemetry dashboard is only a prototype if retained.
- FreeRTOS completion/inspectable evidence is unverified.
- Exclude embedded/CAN work unless later approved explicitly as unfinished lab exploration.

## 9. Skills and evidence levels

Skills are evidence references, not self-ratings.

| Level | Meaning/public treatment |
| --- | --- |
| `professional` | Verified paid-work use; eligible with context |
| `project` | Substantial inspectable project; link evidence |
| `training` | Current/completed coursework/lab; label training |
| `exposure` | Brief use/learning; normally omit prominently |

| Skill/area | Level and approved boundary |
| --- | --- |
| Frontend development/React interfaces | `professional`; EMG and Hoek |
| API/stream integration | `professional`; EMG frontend consumption only; senior/backend engineers built APIs/streams |
| Koa/MySQL backend development | `professional`; Hoek attendance product only |
| FastAPI/WebSocket/SQLite | `project`; self-directed Classroom LAN Chat outside the curriculum; never transfer backend/WebSocket ownership to EMG |
| JavaScript/VBA workflow automation | `professional`; bounded military translation workflow only; never disclose processed content or sensitive operational context |
| PLC/ladder, Arduino, sensors/IoT, local networking | `training`; completed exercises |
| Mitsubishi PLC, HMI, CC-Link, servo/inverter, physical wiring, robot integration | `training`; hands-on guided work on shared equipment, not production ownership |
| Linux/WSL, Docker, industrial networking, AI/ML, OpenVINO, equipment/OT concepts | `training`; in-progress scope, not established expertise |
| ROS2 and robotics orchestration | `project` only for the explicitly labeled in-progress self-directed robot-cell work; planned implementation is not completed evidence |
| C++ robotics depth, perception, edge-AI robot behavior | Current learning/planned; do not present as completed project or professional evidence |
| C/C++, STM32, SPI, CAN, FreeRTOS | `exposure`/unfinished lab; normally omit WP6 |

Unmapped technologies remain `pending`. Repository use alone does not prove professional experience. Never publish proficiency ratings, percentages, per-tool experience estimates, or “expert” labels.

## 10. Historical articles

| Article | Current slug | Decision | State |
| --- | --- | --- | --- |
| Hoek retrospective | `retrospect-hoek-agency` | Revise under this contract | `pending` |
| EMG retrospective | `retrospect-emg-global` | Revise under this contract | `pending` |
| Notion database tutorial | `how-to-use-notion-as-your-blog-post-database` | Editorial/technical review before retention | `pending` |
| Notion image tutorial | `how-to-persist-images-on-notion-pages-made-from-notion-to-md` | Editorial/technical review before retention | `pending` |
| Vimium article | `vimium-keyboard-lover-s-bestfriend-on-the-web` | Editorial review before retention | `pending` |

Retrospectives were created with lower-quality LLM assistance and are not authoritative. Codex must compare each sentence involving role, ownership, result, metric, or chronology with approved evidence. Gemini may implement only the revised, approved copy.

Slugs may change. Every changed public slug requires an explicit, tested, path-preserving permanent redirect from the old URL.

## 11. Localization contract

- English factual copy is approved first.
- Korean translations must preserve factual scope, uncertainty, employment level, and contribution boundaries.
- Korean wording must not become stronger or more senior than the approved English source.
- Machine translation may assist drafting only outside the publication path; Sean or an approved human reviewer must review the final Korean copy.
- Core content records should share stable IDs across locales.
- Articles need locale and translation relationship metadata.
- If no translated article exists, the language switch must not fabricate one.

## 12. Private résumé boundary

V2 has no public résumé PDF, résumé route, résumé download action, résumé asset, or résumé metadata.

- Application-specific résumés remain private and outside this repository.
- A private résumé may be reviewed transiently as an evidence candidate, but it is not automatically authoritative.
- Do not copy private documents, phone numbers, addresses, immigration details, references, or restricted employer/client information into Git.

The published site and reviewed LinkedIn facts must agree. Public site contact remains limited to a confirmed recruiting email and `South Korea`.

## 13. Analytics and visitor claims

V2 may use minimal Vercel Web Analytics and Speed Insights. Analytics data must not be converted into public popularity or impact claims without a separate approved reason and adequate context.

Approved event categories are project repository/demo click, email/contact click, and language switch. Do not send email addresses, personal identifiers, application details, or sensitive query parameters.

## 14. Publication acceptance checklist

Before a factual content change is publishable, verify:

- [ ] Every new factual claim has a contract state.
- [ ] All published claims are `verified`; `approved-direction` text has separately approved wording.
- [ ] Dates, titles, organization names, and degree status match authoritative sources.
- [ ] Contribution boundaries distinguish Sean, team, employer, client, and public-program outcomes.
- [ ] Metrics include a credible source/method and disclosure approval, or are omitted.
- [ ] Professional, project, training, and exposure evidence are labeled correctly.
- [ ] No restricted or prohibited data appears in page copy, metadata, structured data, images, filenames, public assets, or analytics.
- [x] English copy is approved before Korean translation.
- [ ] Korean copy has human review and preserves the English boundary.
- [ ] Site and reviewed LinkedIn are consistent.
- [ ] Changed public URLs have tested redirects.
- [ ] Project links and artifacts are accessible and disclosure-safe.
- [ ] Synthetic placeholders and drafts cannot enter production.

## 15. Evidence and approvals still needed from Sean

The Sections 4–9 baseline supersedes corresponding legacy résumé, profile, and site claims. Remaining WP6 inputs:

1. Final human/editorial review of the new WP6D English and Korean supporting copy in rendered layouts.
2. Final English rendering of `부산인력개발원 - Intel: AI 융합 DX 마스터클래스` (provisional preview label `Physical AI & Smart Factory Training Program` approved on 2026-09-09).
3. Optional recovered Hoek contractual title; until then Section 7 governs.
4. Disclosure-safe artifacts if training outputs become more than compact records.
5. LinkedIn reconciliation of stale student wording.
6. WP7 flagship-project evidence as projects mature.

Private evidence may be reviewed transiently and summarized into approved facts. Never copy sensitive documents, identifiers, or unnecessary personal data into Git.

## 16. Change control

Only Sean may approve a change from `pending`, `restricted`, or `prohibited` to `verified`. Codex may recommend wording and record the rationale; an implementation agent may not change claim state.

Record consequential approvals here:

| Date | Section/claim | Old state | New state | Approved wording/boundary | Approved by |
| --- | --- | --- | --- | --- | --- |
| 2026-08-28 | Market/language direction | `pending` | `verified` | Korea + international; English default with reviewed Korean localization | Sean |
| 2026-08-28 | Public location/privacy | `pending` | `verified` | Publish `South Korea` and email only; exclude phone/work authorization | Sean |
| 2026-08-28 | Notion in v2 | `pending` | `verified` | Omit; possible separate v3 peripheral | Sean |
| 2026-08-28 | Canonical writing route | `pending` | `verified` | Retain `/blog` | Sean |
| 2026-08-28 | About | `pending` | `verified` | Defer; short homepage context only | Sean |
| 2026-08-30 | Public résumé output | `required` | `verified omitted` | No public PDF, route, action, asset, metadata, or analytics event; private application résumés stay outside Git | Sean |
| 2026-08-30 | Identity/contact | `pending/restricted` | `verified` | Sean Choi; Yehyun Choi; 최예현; approved email, profiles, and South Korea location | Sean |
| 2026-08-30 | University degree | `pending/conflicting` | `verified` | BASc Computer Engineering, University of Toronto, 2026; conferred June; omit CGPA | Sean |
| 2026-08-30 | Hoek employment | `pending` | `verified`, bounded | Approved organization, safe title, dates, and attendance-product backend boundary | Sean |
| 2026-08-30 | EMG employment | `pending` | `verified`, bounded | Software Developer; July 2021–July 2022; frontend API/stream and vehicle UI boundaries | Sean |
| 2026-08-30 | Military service | `pending` | `verified`, compact | Sergeant / English Interpreter, October 2016–July 2018 | Sean |
| 2026-08-30 | Current training | `pending` | `verified`, in progress | Interim label, dates, study areas and outputs; official name/provider pending | Sean |
| 2026-08-30 | Embedded/CAN claims | `pending` | `prohibited` as completed work | Unfinished lab/prototype boundaries only | Sean |
| 2026-08-31 | English homepage lead | `approved-direction` | `verified` publication wording | Software developer connecting web interfaces with operational systems; approved supporting paragraph in Section 5 | Sean |
| 2026-08-31 | Locale-visible names | `verified`, display undecided | `verified`, route-specific | `Sean Choi` on English routes; `최예현` on Korean routes; keep `Yehyun Choi` non-visible | Sean |
| 2026-08-31 | Military automation | `prohibited/pending` | `verified`, bounded | JavaScript Hangul/dictionary actions and VBA file/Explorer workflow automation; disclose tools/workflow only, never content | Sean |
| 2026-08-31 | Classroom applications | `training` | `project`, bounded | Self-directed projects completed outside the curriculum during the program period; retain classroom/team boundaries | Sean |
| 2026-08-31 | Complete WP6B English copy | `editorial draft` | `verified` factual/content baseline | Approved homepage, experience, education/training, self-directed-project, skills, and identity/contact source copy for preview implementation; not final launch prose | Sean |
| 2026-08-31 | Korean role labels | `editorial draft` | `verified` | Hoek `개발자`; military `KDIC (국군정보사령부) — 영어어학병`; military automation/security wording approved | Sean |
| 2026-08-31 | Classroom project Korean classification | `self-directed project` | `verified` display wording | Use `사이드 프로젝트`; retain classroom-use and four-person contribution boundaries | Sean |
| 2026-08-31 | Training program identity | `interim/pending` | `verified` Korean identity | `부산인력개발원 - Intel: AI 융합 DX 마스터클래스`; English rendering pending | Sean |
| 2026-08-31 | WP6 editorial maturity | `final-copy gate before implementation` | `preview baseline` | Implement safe content now; revisit wording, content quantity, hierarchy, visual layout, and portfolio-reference comparisons before publication | Sean |
| 2026-09-09 | Program English label | `pending` | `verified provisional` | Approved 'Physical AI & Smart Factory Training Program' as the provisional English display label for preview | Sean |
| 2026-09-17 | WP6D career positioning | prior verified lead | `verified`, superseding | Approved exact English/Korean computer-engineer leads; software/integration experience remains the foundation and physical systems are an expansion | Sean |
| 2026-09-17 | WP6D engineering evidence | `pending`/not modeled | `verified`, bounded | Approved public names and contribution boundaries for RUTA40, Daegu Smart City, 몰입도, guided PLC/CC-Link/Neuromeka work, and self-directed ROS2 robot-cell current work | Sean |
| 2026-09-17 | ROS2 project maturity | learning/planned | `verified` current work with split scope | Publish completed PLC/CC-Link/multi-dock foundation separately from planned ROS2, orchestration, recovery, perception, and edge-AI work | Sean |

Future edits should update the relevant table and append a change-log row rather than silently rewriting history.

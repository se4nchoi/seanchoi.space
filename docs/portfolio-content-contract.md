# Portfolio Publication Content Contract

**Purpose:** Control factual publication across `seanchoi.space`, localized pages, project case studies, retained historical articles, and public professional profiles.

**Owner:** Sean Choi

**Planning and interpretation:** Codex

**Implementation:** Gemini or another explicitly assigned implementation agent

**Initial status:** WP6 factual baseline approved; official training-program identity and Korean editorial review remain incomplete

**Last reviewed:** 2026-08-30

## 1. Authority and use

This contract is the canonical publication boundary for portfolio v2. It does not attempt to reconstruct Sean’s entire career ledger. It records what may be published, what needs evidence, what must remain qualified, and what must not be published.

Use it before:

- writing or revising homepage, Experience, project, biography, or public-profile copy;
- migrating legacy content;
- translating factual content into Korean;
- generating structured data or metadata containing career facts;
- giving an implementation agent content to render.

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
| Public display name | `Sean Choi` | `verified` | Use as the primary public name |
| Korean name | `최예현` | `verified` | Exact approved Hangul form |
| Legal/romanized name | `Yehyun Choi` | `verified` | May appear where useful; do not displace the primary public name |
| Public email | `se4n.choi@gmail.com` | `verified` | Approved recruiting contact |
| Public location | `South Korea` | `verified` | Preferred public location |
| City | `Daegu, South Korea` is accurate | `verified`, normally omit | Use only when a later content job needs city precision |
| Phone, street address, work authorization/immigration details | None public | `prohibited` | Never publish |
| GitHub | `https://github.com/se4nchoi` | `verified` | Approved canonical profile |
| LinkedIn | `https://www.linkedin.com/in/se4nchoi/` | `verified` URL | Stale “final-year student” wording must not override June 2026 degree conferral |
| Current domain | `seanchoi.space` | `verified` for v2 launch planning | Keep through v2 stabilization |

## 5. Core professional positioning

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
| Physical AI/smart-factory direction | `verified` as trajectory | In-progress training, not professional specialization |

### Positioning boundaries

| Language | State/rule |
| --- | --- |
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
| Program label | `Physical AI & Smart Factory Training Program — June–December 2026` | `verified` interim label; official name/provider `pending` |
| Dates/status | June 22–December 24, 2026; in progress | `verified`; public month precision |
| Study areas | PLC/ladder logic, sensors/IoT, industrial networking, Linux/WSL, Docker, AI/ML, OpenVINO, equipment/OT integration concepts | `verified` training scope; not professional expertise |
| Classroom LAN Chat | FastAPI, WebSocket, SQLite; used successfully by 22 trainees | `verified` training output; no broader impact inference |
| 대나무지식인 | Four-person classroom Q&A MVP; Sean handled backend/database integration | `verified` training output; preserve boundary |
| Exercises | PLC, Arduino, sensor, local-network implementation | `verified` training output; not production |
| ROS 2, robotics controls, edge-AI current learning | Current learning | `restricted` to learning context; not professional expertise/completed-project evidence |

Training records require accurate `planned`, `in-progress`, or `completed` status and an evidence level. Do not list unused coursework/tools prospectively.

## 7. Professional experience ledger

### Hoek Agency (획기획)

| Field | Approved value | State/boundary |
| --- | --- | --- |
| Organization | `Hoek Agency (획기획)` | `verified`; omit 제조도 from heading |
| Title | `Software Developer — Frontend to Full-Stack` | `verified` safe public title; contractual title unrecovered |
| Dates | September 2022–August 2023 | `verified`; actual start Sep 5; final day unavailable |
| Attendance product | Frontend plus actual Koa/MySQL backend development | `verified`; bounded full-stack prose |
| “Full-Stack Engineer” contractual title; product-lead/end-to-end ownership | Not verified | `prohibited` |
| Unsupported percentages/metrics | Legacy claims | `prohibited` |

### EMG Global

| Field | Approved value | State/boundary |
| --- | --- | --- |
| Organization/title | `EMG Global`; official `개발자`; website `Software Developer` | `verified`; “Software Engineer” only in separately approved targeted résumés |
| Dates | July 2021–July 31, 2022 | `verified`; publish July 2021–July 2022; supersedes Aug 2021 start/July 12 end |
| Frontend/API/stream integration | Frontend interfaces integrated with APIs/streams built by senior/backend engineers | `verified`; no backend, WebSocket, or data-pipeline ownership |
| Door-lock feature | Embedded team built module; backend exposed HTTPS API; Sean built React UI/control integration; worked on real vehicle | `verified`; preserve all boundaries |
| Firmware/embedded ownership, exact CCTV counts, personal funding/selection attribution, satisfaction/performance metrics | Not approved/unsupported | `prohibited` |

### Korea Defense Intelligence Command

`Korea Defense Intelligence Command — Sergeant / English Interpreter, October 2016–July 2018` is `verified` compact additional experience. It may support bilingual communication, translation, and structured-environment work. Keep brief; automation/operational metrics and unverified leadership/award claims are `prohibited`.

## 8. Projects and case studies

No WP7 flagship is approved. WP6 may include verified Section 6 training outputs as compact evidence records, not inflated case studies or professional deployments.

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
| FastAPI/WebSocket/SQLite | `training`; Classroom LAN Chat; never transfer backend/WebSocket ownership to EMG |
| PLC/ladder, Arduino, sensors/IoT, local networking | `training`; completed exercises |
| Linux/WSL, Docker, industrial networking, AI/ML, OpenVINO, equipment/OT concepts | `training`; in-progress scope, not established expertise |
| ROS 2, robotics controls, edge-AI | `exposure`/current learning; normally omit prominently |
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
- [ ] English copy is approved before Korean translation.
- [ ] Korean copy has human review and preserves the English boundary.
- [ ] Site and reviewed LinkedIn are consistent.
- [ ] Changed public URLs have tested redirects.
- [ ] Project links and artifacts are accessible and disclosure-safe.
- [ ] Synthetic placeholders and drafts cannot enter production.

## 15. Evidence and approvals still needed from Sean

The Sections 4–9 baseline supersedes corresponding legacy résumé, profile, and site claims. Remaining WP6 inputs:

1. Exact official Busan program name/provider.
2. Approval of proposed English narrative and role descriptions.
3. Human review of Korean translations after English approval.
4. Optional recovered Hoek contractual title; until then Section 7 governs.
5. Disclosure-safe artifacts if training outputs become more than compact records.
6. LinkedIn reconciliation of stale student wording.
7. WP7 flagship-project evidence as projects mature.

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

Future edits should update the relevant table and append a change-log row rather than silently rewriting history.

# Portfolio Publication Content Contract

**Purpose:** Control factual publication across `seanchoi.space`, the public résumé PDF, localized pages, project case studies, and retained historical articles.

**Owner:** Sean Choi

**Planning and interpretation:** Codex

**Implementation:** Gemini or another explicitly assigned implementation agent

**Initial status:** Structure approved; factual verification remains incomplete

**Last reviewed:** 2026-08-28

## 1. Authority and use

This contract is the canonical publication boundary for portfolio v2. It does not attempt to reconstruct Sean’s entire career ledger. It records what may be published, what needs evidence, what must remain qualified, and what must not be published.

Use it before:

- writing or revising homepage, Experience, project, biography, or résumé copy;
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
| About is deferred from v2 | `verified` | Short personal/trajectory context may appear on the homepage |
| Notion is outside v2 | `verified` | No Notion dependency or importer in the v2 application |

## 4. Identity and contact

| Field | Current value or rule | State | Required verification/action |
| --- | --- | --- | --- |
| Public display name | `Sean Choi` | `pending` | Sean must confirm exact capitalization and whether this is the universal public form |
| Korean name | Not yet recorded | `pending` | Sean must supply the exact Hangul form and preferred order |
| Legal/alternate English name | Handoff references `Yehyun Choi` | `restricted` until confirmed | Sean decides whether it appears anywhere public; do not infer legal-name use |
| Public email | Legacy site uses `se4n.choi@gmail.com` | `pending` | Sean must confirm the address remains correct for recruiting contact |
| Public location | `South Korea` | `verified` | May publish at country level only |
| City | Not approved | `restricted` | Do not infer or publish from the Busan program or other context |
| Phone number | None public | `prohibited` | Application materials only |
| Street/full address | None public | `prohibited` | Never publish |
| Work authorization/immigration details | None public | `prohibited` | Application process only |
| GitHub | Legacy site uses `https://github.com/se4nchoi` | `pending` | Confirm canonical profile URL and intended visibility |
| LinkedIn | Legacy site uses `https://www.linkedin.com/in/se4nchoi/` | `pending` | Confirm URL and reconcile facts before launch |
| Current domain | `seanchoi.space` | `verified` for v2 launch planning | Keep through v2 stabilization; any 2027 move is separate |

## 5. Core professional positioning

### Approved direction

The current working impression is:

> Sean Choi is a Computer Engineering graduate with approximately two years of professional experience building full-stack applications and operational integrations. He is extending that foundation toward software that connects data, APIs, and physical systems.

State: `approved-direction`.

This statement is not automatically publishable verbatim. Verify each component below before release:

| Component | State | Verification needed |
| --- | --- | --- |
| Computer Engineering graduate | `pending` | Official degree name, institution, completion/conferral status, and date |
| Approximately two years of professional experience | `pending` | Reconcile employment dates and what counts as professional software experience |
| Full-stack applications | `pending` | Identify verified roles/projects and contribution boundaries |
| Operational integrations | `pending` | Name representative systems/APIs/interfaces without inflating ownership |
| Extending toward software connecting data, APIs, and physical systems | `verified` as trajectory | Support with current study/project evidence before making it prominent |

### Positioning boundaries

| Language | State | Rule |
| --- | --- | --- |
| “Software engineer” | `pending` | May publish after titles/experience are reconciled |
| “Full-stack engineer/developer” | `pending` | Must be supported by verified work boundaries |
| “Systems integration experience” | `pending` | Must specify actual integration work accurately |
| “Physical AI engineer,” “robotics engineer,” or “automation engineer” | `prohibited` as current lead identity | Reconsider only after substantial verified evidence or professional experience |
| “Embedded engineer,” “PLC engineer,” “SCADA engineer,” or semiconductor specialist | `prohibited` without new evidence | Training/exposure never justifies professional title |
| “Expert” or equivalent mastery claims | `prohibited` | Prefer evidence and scope |

## 6. Education and training

| Record | Legacy/context claim | State | Publication boundary/action |
| --- | --- | --- | --- |
| University of Toronto | Computer Engineering | `pending` | Verify official program/degree name, dates, and graduation/conferral status |
| Graduation status | Handoff says graduate; v1 says expecting 2026 | `pending` and conflicting | Must resolve before any v2 publication |
| Busan program | Current/future trajectory context | `pending` | Record official program name, provider, dates, curriculum, status, and completed outputs before publication |
| Manufacturing/automation study | General trajectory | `approved-direction` | Describe only completed hands-on work; label training explicitly |
| Robotics/Physical AI study | General trajectory | `approved-direction` | Do not imply professional deployment or production ownership |
| Coursework/tools not yet used | None | `prohibited` | Do not list prospectively |

Training records require `status` (`planned`, `in-progress`, `completed`) and an evidence level. Only `in-progress` or `completed` items may appear, and their wording must match the current status.

## 7. Professional experience ledger

All entries below originate from v1 or the exploration handoff and remain `pending` until Sean verifies dates, titles, employer naming, contribution boundaries, disclosure permission, and supporting evidence.

### Hoek Agency

| Field | Legacy value | State |
| --- | --- | --- |
| Organization | Hoek Agency | `pending` |
| Title | Software Engineer | `pending` |
| Dates | August 2022 – August 2023 | `pending` |
| General work | Internal product/full-stack application work | `pending` |
| “Product lead” or end-to-end ownership | Legacy claim | `pending`; do not publish until role boundary is verified |
| 10% operating-cost reduction | Legacy claim | `prohibited` until a credible source/method is documented |
| 15% workflow improvement | Legacy claim | `prohibited` until a credible source/method is documented |
| Four hours weekly saved | Legacy claim | `prohibited` until a credible source/method is documented |

Required verification: actual team and role structure; frontend/backend/database responsibilities; deployment/maintenance involvement; named product disclosure; what Sean individually owned; which outcomes can be substantiated.

### EMG Global

| Field | Legacy value | State |
| --- | --- | --- |
| Organization | EMG Global | `pending` |
| Title | Software Engineer | `pending` |
| Dates | July 2021 – July 2022 | `pending` |
| Context | University co-op/PEY | `pending` |
| Frontend/dashboard work | Legacy claim | `pending`; define exact interface and contribution |
| Smart-city project participation | Legacy claim | `pending`; distinguish team/project result from individual impact |
| jQuery/React and Spring/Spring Boot migration | Legacy claim | `pending`; verify Sean’s contribution to each layer |
| Vite migration/startup improvement | Legacy claim | `pending`; verify measurement and ownership before using numbers |
| EV/API/vehicle integration | Handoff direction | `pending`; state interfaces and boundaries precisely |
| Android WebView/native Android ownership | Legacy wording is ambiguous | `prohibited` unless exact implementation boundary supports it |
| Daegu finalist/funding attribution | Legacy claim | `prohibited` as individual-impact language; project context may be used only with sourced, bounded wording |
| 90% startup improvement, 30 to 1 second | Legacy claim | `prohibited` until measurement and attribution are verified |
| Customer satisfaction below 50% to 85%+ | Legacy claim | `prohibited` until source, sample, causality, and permission are verified |

Required verification: employer/product disclosure permission; exact frontend, WebView, API, file-transfer, or vehicle-interface contributions; team boundaries; deploy context; externally inspectable artifacts.

### Korea Defense Intelligence Command

| Field | Legacy value | State |
| --- | --- | --- |
| Organization naming | Korea Defense Intelligence Command | `pending` and disclosure-sensitive |
| Title | Intelligence Specialist | `pending` |
| Dates | January 2016 – October 2018 | `pending` |
| VBA/JavaScript document automation | Legacy claim | `pending`; security/disclosure review required |
| Lead Sergeant / 20 members | Legacy claim | `pending` |
| Soldier’s Merit of Honour | Legacy claim | `pending`; verify official English name |
| 67% time reduction, 30 to 10 minutes | Legacy claim | `prohibited` until measurement and disclosure are verified |

Required verification: safe public organization/title wording, confidentiality constraints, official award translation, and whether automation details may be discussed publicly.

## 8. Projects and case studies

No flagship project is approved yet.

Expected candidates may emerge from Busan program work and side projects around October–December. A project becomes publishable only after Codex prepares and Sean approves a case-study specification containing:

- project title and status;
- context: professional, personal, training, or academic;
- Sean’s role and explicit contribution boundary;
- problem and constraints;
- architecture/implementation decisions grounded in artifacts;
- verification/testing performed;
- outcome without invented metrics;
- limitations and unfinished areas;
- public repository, demo, screenshot, diagram, or disclosure-safe evidence;
- technologies actually used;
- English copy and Korean translation status.

### Explicit project restrictions

- Do not publish placeholder projects. Use `Example Project` plus `syntheticPlaceholder: true` only in non-production fixtures.
- Do not call a simulator a production deployment.
- Do not call an AMR simulator a production ACS or real fleet manager.
- Do not imply independently designed industrial architecture when following a course, lab, or supplied specification.
- Do not list planned features as completed.
- Do not choose a flagship solely because its keywords match a target role.

## 9. Skills and evidence levels

Skills are evidence references, not self-ratings.

| Level | Meaning | Public treatment |
| --- | --- | --- |
| `professional` | Used in paid work with a verified context and boundary | Eligible for prominent use |
| `project` | Demonstrated in a substantial inspectable project | Eligible when linked to the project |
| `training` | Used in current/completed coursework, lab, or guided program | Label as training |
| `exposure` | Read, observed, or used briefly | Normally exclude from prominent displays |

Legacy v1 lists JavaScript, TypeScript, Python, React, Next.js, Node.js, Express, PostgreSQL, MySQL, Git, Docker, Figma, and AWS. Every item is `pending` for v2 until it has an approved evidence reference and appropriate level. Repository use alone may demonstrate use in this project but does not prove professional experience.

Do not publish proficiency percentages, star ratings, years-of-experience estimates per tool, or “expert” labels.

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

## 12. Résumé contract

The public résumé is a downloadable PDF, not a duplicated web-résumé route by default.

Allowed public details:

- confirmed public display name;
- confirmed recruiting email;
- location `South Korea`;
- verified experience, education, projects, and evidence-backed skills;
- confirmed public professional links.

Excluded public details:

- phone number;
- street address or precise residential location;
- work-authorization or immigration status;
- references’ personal information;
- restricted employer, military, client, or project information.

The site, public PDF, and reviewed LinkedIn facts must agree. Application-specific résumé versions may contain additional private details outside this repository’s public content system.

## 13. Analytics and visitor claims

V2 may use minimal Vercel Web Analytics and Speed Insights. Analytics data must not be converted into public popularity or impact claims without a separate approved reason and adequate context.

Approved event categories are résumé download, project repository/demo click, email/contact click, and language switch. Do not send email addresses, personal identifiers, application details, or sensitive query parameters.

## 14. Publication acceptance checklist

Before a factual content change is publishable, verify:

- [ ] Every new factual claim has a contract state.
- [ ] All published claims are `verified`; `approved-direction` text has separately approved wording.
- [ ] Dates, titles, organization names, and degree status match authoritative sources.
- [ ] Contribution boundaries distinguish Sean, team, employer, client, and public-program outcomes.
- [ ] Metrics include a credible source/method and disclosure approval, or are omitted.
- [ ] Professional, project, training, and exposure evidence are labeled correctly.
- [ ] No restricted or prohibited data appears in page copy, metadata, structured data, images, filenames, PDF, or analytics.
- [ ] English copy is approved before Korean translation.
- [ ] Korean copy has human review and preserves the English boundary.
- [ ] Site, public PDF, and reviewed LinkedIn are consistent.
- [ ] Changed public URLs have tested redirects.
- [ ] Project links and artifacts are accessible and disclosure-safe.
- [ ] Synthetic placeholders and drafts cannot enter production.

## 15. Evidence needed from Sean

The next factual review should collect, without committing private documents to the repository:

1. Preferred English display name and Korean name.
2. Confirmed public email, GitHub, and LinkedIn URL.
3. Official University of Toronto degree/program name and graduation/conferral status/date.
4. Employer names, titles, start/end dates, employment types, and safe location conventions.
5. For each role: team context, actual responsibilities, individual contribution boundaries, technologies, and disclosure limits.
6. Sources or withdrawal decisions for every legacy metric.
7. Safe official wording for military role, organization, leadership scope, and award.
8. Official Busan program name, provider, dates, current status, curriculum, and completed artifacts.
9. Public résumé source and LinkedIn reconciliation notes.
10. Candidate project evidence as projects mature.

Private evidence may be reviewed transiently and summarized into approved facts. Do not copy sensitive documents, identifiers, or unnecessary personal data into Git.

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

Future edits should update the relevant table and append a change-log row rather than silently rewriting history.

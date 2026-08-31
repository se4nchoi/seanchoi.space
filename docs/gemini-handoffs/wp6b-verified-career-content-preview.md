# Gemini Handoff — WP6B Verified Career Content Preview

## Status

Approved for implementation on the current `v2` branch.

This package establishes a truthful, recruiter-usable content baseline in the real pages. It is not the final launch-copy, visual-density, or portfolio-benchmarking pass.

## Objective

Replace the synthetic/status-only Home and Experience presentation with verified English and reviewed Korean career content so Sean can evaluate the actual portfolio in the browser.

The result must answer, at a glance:

- who Sean is;
- what professional work he has actually done;
- what direction he is developing toward;
- which technical capabilities have professional, project, or training evidence;
- how a recruiter can contact or inspect his public profiles.

Do not expand the platform horizontally. Do not add blog posts, flagship case studies, About, résumé features, new infrastructure, or speculative content.

## Required reading

Read these completely before editing:

1. `AGENTS.md`
2. `docs/portfolio-v2-exploration-report.md`
3. `docs/portfolio-v2-implementation-plan.md`
4. `docs/portfolio-content-contract.md`
5. `docs/codex-handoffs/wp6b-verified-career-content-english-draft.md`
6. `docs/codex-handoffs/wp6c-korean-career-content-editorial-draft.md`

The content contract controls factual boundaries. The WP6B/WP6C drafts control the current preview wording. If implementation reveals a genuine conflict, stop on that conflict and report it rather than silently resolving it.

## Collaboration boundary

Gemini owns the implementation details required to reach the outcome:

- component composition;
- focused module boundaries;
- local refactors;
- responsive layout adaptation using the existing design system;
- test organization;
- removal or simplification of obsolete skeleton-only wiring for the affected pages.

Gemini may make the smallest content-schema or validation adjustment needed to represent an approved fact honestly—for example, an education completion date whose start date is not approved. Do not invent data to satisfy the current schema. Any such adjustment must preserve publication safeguards, receive focused tests, and be called out in the report.

Gemini must not independently change:

- factual claims or contribution boundaries;
- positioning;
- public routes;
- evidence level;
- privacy rules;
- publication safeguards;
- dependency versions;
- WP7 project scope;
- WP5 blog scope.

Do not weaken validation merely because copy will receive another editorial pass.

## Editorial maturity for this package

The English and Korean content is approved as a factual and structural preview baseline.

It is intentionally not yet final in:

- sentence-level polish;
- total content density;
- visual hierarchy;
- section length;
- final Korean headline cadence;
- official English rendering of the Busan program name.

Implement the safe baseline now. Sean and Codex will evaluate the rendered pages, compare them with suitable portfolio references, and conduct a final editorial/visual pass before publication.

For content records, `koReview: "reviewed"` means that Sean has reviewed the Korean factual scope and contribution boundaries. It does not claim that the wording is launch-final. Do not change the validator to introduce a weaker public-translation state.

## Required page behavior

The following routes must render real career content in development, preview, and production builds:

- `/`
- `/ko`
- `/experience`
- `/ko/experience`

They must no longer fall back to a generic production status page or display synthetic `Example` content.

Preserve:

- English as the unprefixed default;
- Korean under `/ko`;
- correct document `lang` values;
- the existing accessible shell, navigation, skip link, focus behavior, and design tokens;
- route-localized metadata and language alternates.

The real Home and Experience pages must not link to synthetic example articles or projects.

`/projects` and `/ko/projects` may retain an honest empty/coming-evidence state until WP7. `/blog` and `/ko/blog` remain the WP5 empty publication state. Do not create public detail pages to make those sections look populated.

The development-only component review and synthetic structural fixtures may remain available, but they must stay isolated from public content and public routes.

## Approved identity and contact facts

English visible name:

> Sean Choi

Korean visible name:

> 최예현

Location:

- English: `South Korea`
- Korean: `대한민국`

Public contact and profiles:

- email: `se4n.choi@gmail.com`
- GitHub: `https://github.com/se4nchoi`
- LinkedIn: `https://www.linkedin.com/in/se4nchoi/`

Do not expose:

- phone number;
- street address;
- GPA;
- work-authorization or immigration details;
- résumé PDF, résumé route, résumé asset, or résumé download action;
- private application-document paths or metadata.

The private SK hynix application PDF is not a public source and must not appear in the repository, content registry, evidence labels, metadata, or UI.

## Home content baseline

Use the English and Korean wording in the WP6B/WP6C drafts as the implementation source.

Current English headline:

> Software developer connecting web interfaces with operational systems.

Current English positioning paragraph:

> Computer Engineering graduate with professional experience across frontend applications, full-stack product development, and API integration. Currently extending that foundation through in-progress training in automation, Physical AI, and smart-factory systems.

Current Korean headline baseline:

> 프론트엔드를 기반으로 풀스택 개발과 시스템 연동까지 경험을 확장해 온 소프트웨어 개발자.

The Home page should prioritize:

1. identity and positioning;
2. a concise verified professional-evidence summary;
3. current direction/training, clearly labeled in progress;
4. primary access to Experience and public contact/profile links.

Use `View experience` / the reviewed Korean equivalent as the strongest internal action. Projects may remain in global navigation, but do not make an empty or synthetic project page the dominant Home action. Do not add a blog call to action while there are no public articles.

## Experience content baseline

Implement the verified records and contribution boundaries from the WP6B/WP6C drafts.

### Hoek

- Organization: `Hoek`
- English public title: `Software Developer — Frontend to Full-Stack`
- Korean public title: `개발자 | 프론트엔드·풀스택 개발`
- Dates: September 2022–August 2023
- Professional evidence
- Approved scope: frontend/internal product development; Koa/MySQL backend work on an internal attendance product
- Do not imply ownership of the whole product or system

### EMG

- Organization: `EMG`
- English public title: `Software Developer`
- Korean public title: use the reviewed WP6C wording
- Dates: July 2021–July 2022
- Professional evidence
- Approved scope: frontend work integrating APIs and streams built by other teams
- Door-lock boundary: another team supplied the embedded module and backend HTTPS API; Sean implemented the React interface and control interaction on a real vehicle
- Do not claim backend, WebSocket, data-pipeline, firmware, embedded, or native Android ownership

### Military service

- English organization label: use the disclosure-safe label approved in WP6B
- Korean organization: `KDIC (국군정보사령부)`
- English role: `Sergeant / English Interpreter`
- Korean role: `영어어학병`
- Dates: October 2016–July 2018
- Professional evidence
- Approved scope:
  - JavaScript-based Hangul decomposition and internal-dictionary Korean-to-English replacement workflows;
  - VBA automation for renaming and Windows Explorer workflows;
  - coordination with Korean and U.S. IT teams to align permitted execution in an on-premises environment where PowerShell was not allowed.
- The actions may be described; the processed content is confidential and must not be disclosed
- Do not add metrics, classified context, operational content, or imply that this was training/coursework

Do not publicly label an employment type that has not been verified. If the schema requires a value for Hoek or EMG, use a neutral internal representation and omit it from display rather than inferring full-time, contract, internship, or co-op status.

## Education and current training

### University of Toronto

- Degree: Bachelor of Applied Science in Computer Engineering
- Degree conferred: June 2026
- Do not show GPA
- Do not invent or publish an unapproved start date merely to satisfy the schema

If the current model cannot represent completion-only education honestly, make the smallest focused date-precision/model adjustment and cover it with tests.

### Current training

Korean official identity:

> 부산인력개발원 - Intel: AI 융합 DX 마스터클래스

- June–December 2026
- in progress
- Evidence level: training
- Current subject areas may include PLC/ladder logic, sensors/IoT, industrial networking, Linux, AI/ML, OpenVINO, edge inference, and equipment/OT concepts only as training exposure
- Do not present the program as employment or production experience

For this preview, the English page may use the descriptive label:

> Physical AI & Smart Factory Training Program

Do not invent an official English provider/program name. The final English rendering remains a later editorial verification item.

## Compact side-project evidence

The following were independently initiated outside the curriculum. They are not training exercises and are not flagship WP7 case studies.

### Classroom LAN Chat

- FastAPI, WebSocket, SQLite
- used by 22 classmates
- project evidence

### Classroom Q&A Board

- four-person project
- Sean's contribution: backend and database integration
- project evidence

These may appear as compact supporting evidence on Experience. Do not create padded case-study pages, unsupported outcomes, adoption claims beyond the supplied class count, or new flagship positioning.

If the existing `ProjectRecord` model would force public detail routes, do not misuse it. A small focused typed presentation structure is acceptable for this preview. Avoid creating a second general-purpose content system. Report any model friction so Codex can reassess it after the real pages are evaluated.

Training exercises such as PLC, Arduino, sensors, and LAN work must remain visually and semantically distinct from the independent side projects.

## Skill evidence baseline

Only surface skills that have an explicit supporting record, and communicate evidence level without proficiency percentages.

Professional:

- frontend application development;
- React;
- API integration;
- Koa/MySQL within the approved Hoek boundary;
- JavaScript/VBA workflow automation within the approved military boundary.

Project:

- FastAPI;
- WebSocket;
- SQLite;
- backend/database integration within the classroom side-project boundaries.

Training:

- PLC/ladder logic;
- Arduino and sensors/IoT;
- industrial networking/Linux;
- AI/ML, OpenVINO, and edge inference only as current study/exposure.

Do not add ROS 2, robot controls, edge-AI production ownership, C/C++, STM32, SPI, CAN, or FreeRTOS in this package.

## Canonical data and evidence rules

Populate the canonical registry with the verified identity, links, experience, education/training, and evidence-linked skills needed by the real pages.

Public records must remain:

- `publicationStatus: "public"` where rendered publicly;
- `claimState: "verified"`;
- `syntheticPlaceholder: false`;
- human-reviewed with an appropriate `reviewedOn` date;
- linked to disclosure-safe evidence records.

Use `direct-confirmation` evidence for Sean-confirmed boundaries unless an already-approved public source is explicitly appropriate. Evidence labels must describe the confirmation without exposing private documents or confidential material.

Do not add public articles or flagship project records in this package. The canonical public article count remains zero. Synthetic fixtures remain outside the canonical registry.

## Layout and component expectations

Use the existing WP3/WP4 design system rather than redesigning the site.

Gemini may:

- adjust section composition to fit real content;
- remove synthetic-only cards or links from Home/Experience;
- simplify page-view APIs that were shaped around fixtures;
- introduce small reusable components where real repetition is demonstrated;
- tune responsive spacing and readable line length.

Do not:

- create dashboard or terminal styling;
- add animation or dependencies;
- add decorative industrial imagery;
- overfill the page to imitate a finished portfolio;
- hide incomplete sections behind misleading examples.

Use the actual content to expose layout problems. Record those problems for the later visual/editorial pass instead of over-solving them here.

## Required safeguards and tests

Update obsolete tests that assume the canonical registry is empty. Preserve the intent that synthetic fixtures cannot enter public production content.

Add or update focused tests proving at minimum:

1. the canonical production registry passes validation;
2. rendered public records are verified, reviewed, and non-synthetic;
3. Home and Experience render the correct English/Korean visible names and factual baseline;
4. public pages contain no `Example Project`, `Example Article`, synthetic notice, generic status copy, or résumé action;
5. EMG ownership boundaries do not become backend/WebSocket/firmware/embedded/native-Android claims;
6. military copy discloses the automation method but no confidential processed content;
7. training is labeled in progress and is not presented as professional employment;
8. independent classroom projects are not labeled as curriculum/training;
9. public contact links are correct and no phone, street address, GPA, work-authorization, private-document path, or résumé data is introduced;
10. no public articles or flagship project case studies are added;
11. locale metadata, `lang`, canonical, and reciprocal alternates remain correct;
12. synthetic fixture and review-route containment still works.

Prefer semantic assertions and contribution-boundary assertions over brittle full-paragraph snapshots.

## Verification

Run and report exact results for:

```text
corepack pnpm typecheck
corepack pnpm lint
corepack pnpm test
corepack pnpm content:check
corepack pnpm build
corepack pnpm check
```

Perform real HTTP verification in development and production mode for:

- `/`
- `/ko`
- `/experience`
- `/ko/experience`
- `/projects`
- `/ko/projects`
- `/blog`
- `/ko/blog`

Confirm status, document language, single main landmark, primary heading/name, absence of synthetic/publicly restricted content, and the honest empty state of Projects/Blog.

Stop all test servers and verify the port is free.

## Out of scope

- final copy polish or final Korean headline choice;
- external portfolio benchmarking;
- final content-density decision;
- blog post authoring;
- project detail pages or flagship selection;
- About;
- résumé;
- analytics expansion;
- dependency upgrades;
- schema redesign beyond the smallest honest-data adjustment described above;
- commit, push, deploy, tag, branch, domain, or production operations.

## Completion report

Return:

1. concise outcome summary;
2. changed files grouped by purpose;
3. any schema/model adjustment and why it was necessary;
4. rendered behavior by route and locale;
5. exact commands, exit codes, and test counts;
6. HTTP verification matrix;
7. factual/privacy/boundary audit;
8. unresolved visual or editorial issues intentionally deferred;
9. git status and confirmation that no commit/push/deployment occurred.

Do not claim the copy or design is publication-final. The acceptance outcome is a safe, real-content preview that supports the next visual/editorial review.

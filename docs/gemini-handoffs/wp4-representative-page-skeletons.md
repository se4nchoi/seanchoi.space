# Gemini Handoff — WP4 Representative Page Skeletons

## Gate status and authority

WP1–WP3 are accepted and checkpointed at `e2273c9` on `v2`. On 2026-08-29 Codex re-established the continuation environment with Node.js `24.16.0` and pnpm `10.34.5`, performed a clean frozen install, and independently verified TypeScript, ESLint, all 77 tests, the direct content guard, the Next.js `16.3.3` production build, and real production HTTP behavior for the localized shells, bilingual global 404, and disabled `/_review` route.

Implement only **WP4 — representative page skeletons**. This file is the product, content, route, architecture, and acceptance authority for WP4. It does not authorize WP5 blog infrastructure, WP6 real content/résumé, WP7 case-study selection, WP8 SEO/analytics, or WP9 redirects/cutover.

## Required reading

Read completely before editing:

1. `AGENTS.md`
2. `docs/portfolio-v2-exploration-report.md`
3. `docs/portfolio-v2-implementation-plan.md`
4. `docs/portfolio-content-contract.md`
5. `docs/codex-handoffs/weekend-cloud-continuation.md`
6. `docs/gemini-handoffs/wp3-design-system-bilingual-shell.md`
7. `docs/gemini-handoffs/wp3d-global-bilingual-not-found.md`
8. this handoff

Later remediation handoffs supersede conflicting earlier details. Inspect branch, HEAD, status, and diff first; preserve every user change.

## Objective

Build a bilingual, static representative skeleton demonstrating these journeys without a real career claim:

```text
recruiter:       identity hierarchy → strongest example evidence → résumé/contact placement
hiring manager:  experience boundary → project role → validation/limitations
technical peer:  case-study decisions → evidence treatment → long-form writing
```

Demonstrate Home, Experience, Projects index/detail, Blog index/article, 404, and résumé-download placement at mobile and desktop widths. Every record-like example must be unmistakably synthetic and unavailable as publishable production content.

## Synthetic-content architecture

### Exact availability policy

Add one server-only helper:

```ts
export function isSkeletonPreviewEnabled(
  env: Pick<NodeJS.ProcessEnv, "NODE_ENV" | "VERCEL_ENV"> = process.env,
): boolean {
  return env.NODE_ENV === "development" || env.VERCEL_ENV === "preview";
}
```

No query, cookie, header, client storage, pathname rule, or other environment value may enable it.

- `next dev`: synthetic skeletons enabled.
- `VERCEL_ENV=preview` build: synthetic skeletons enabled for an isolated preview deployment.
- ordinary production or `VERCEL_ENV=production`: existing localized factual-review status on core indexes; no synthetic detail paths.
- preserve the existing `/_review` policy.

### Data boundary

- Keep `src/data/content.ts` and `canonicalContentRegistry` byte-for-byte unchanged and empty.
- Do not import application data from `src/lib/content/fixtures.ts`.
- Put WP4-only records/narrative in `src/data/skeleton-preview.ts`.
- Every record: `publicationStatus: "draft"`, `claimState: "pending"`, `syntheticPlaceholder: true`; localized record text uses `koReview: "draft"`.
- The preview registry must pass existing `validateContentRegistry` with `now: "2026-08-29"` and no assets.
- Add no résumé record/file, evidence URL, email, social link, or production-content exception.
- Existing guards must still fail if a synthetic record enters the canonical registry or becomes public.
- Ordinary production HTML, generated detail paths, metadata descriptions, and links must expose none of the synthetic identity/career/project/article strings.

## Routes

Enhance the existing locale pairs:

| English | Korean | Preview/development | Ordinary production |
| --- | --- | --- | --- |
| `/` | `/ko` | full synthetic Home | current localized status |
| `/experience` | `/ko/experience` | synthetic experience/training | current localized status |
| `/projects` | `/ko/projects` | synthetic project index | current localized status |
| `/blog` | `/ko/blog` | synthetic article index | current localized status |

Add exactly:

```text
src/app/(en)/projects/[slug]/page.tsx
src/app/ko/projects/[slug]/page.tsx
src/app/(en)/blog/[slug]/page.tsx
src/app/ko/blog/[slug]/page.tsx
```

Each exports `dynamicParams = false`, uses `generateStaticParams()`, returns only `example-project` or `example-article` when preview is enabled and `[]` otherwise, and calls `notFound()` for unmatched/disabled content. Use locale root layouts and server components. Each page has one `h1` and no nested `main`.

Only these preview detail URLs exist:

```text
/projects/example-project
/ko/projects/example-project
/blog/example-article
/ko/blog/example-article
```

Do not add `/resume`, `/about`, `/writing`, `/uses`, aliases, or other samples.

Extend `ROUTE_PAIRS` with the exact project and article detail pairs. Exact matches preserve the slug. After exact matching, unknown English project details fall back to `/ko/projects`; unknown Korean project details fall back to `/projects`. Preserve current article-index and generic fallbacks.

## Supplied synthetic records

All records are draft/pending/synthetic and reviewed on `2026-08-29`.

### Identity, evidence, experience, training, skill

- `skeleton-site-identity`: display name `Example Person` / `예시 인물`; location `Example Location` / `예시 지역`; trajectory `Synthetic direction statement for information-hierarchy review; not a real biography.` / `정보 구조 검토를 위한 합성 방향 설명이며 실제 소개가 아닙니다.`; no email or links.
- `skeleton-evidence`: label `Example verification artifact`; level `project`; source kind `artifact`; `publiclyInspectable: false`; no URL. Visible enum labels are localized through the preview dictionary.
- `skeleton-experience`: organization `Example Organization` / `예시 조직`; role `Example Software Engineer` / `예시 소프트웨어 엔지니어`; `2024-01`–`2025-01`; full-time; summary `Synthetic professional record used to review chronology and contribution boundaries.` / `연대기와 기여 범위를 검토하기 위한 합성 경력 기록입니다.`; contributions `Example contribution limited to a documented interface.` / `문서화된 인터페이스로 범위를 제한한 예시 기여입니다.` and `Example validation described without a performance or business metric.` / `성능 또는 비즈니스 지표 없이 설명한 예시 검증입니다.`; reference `skeleton-evidence`.
- `skeleton-training`: kind `training`, status `completed`; institution `Example Training Provider` / `예시 교육 기관`; program `Example Systems Lab` / `예시 시스템 실습`; `2025-02`–`2025-04`; evidence level `training`; reference `skeleton-evidence`.
- `skeleton-skill`: name `Example interface validation` / `예시 인터페이스 검증`; evidence level `project`; featured; reference `skeleton-evidence`.

Do not add clients, products, employers presented as real, outcomes, technologies, or metrics.

### Project translation pair

- English: ID `skeleton-project-en`, slug `example-project`, locale `en`, title `Example Project`.
- Korean: ID `skeleton-project-ko`, same slug, locale `ko`, `translationOf: "skeleton-project-en"`, title `예시 프로젝트`.
- Summary: `A synthetic case-study record used to test evidence hierarchy, contribution boundaries, and responsive layout.` / `근거 구조, 기여 범위, 반응형 레이아웃을 검토하기 위한 합성 사례 기록입니다.`
- Context/status: `personal` / `in-progress`.
- Role: `Example contributor` / `예시 기여자`.
- Boundary: `Synthetic boundary: this record claims responsibility only for the interface and validation described in the preview.` / `합성 범위: 이 기록은 미리보기에 설명된 인터페이스와 검증에 대해서만 책임을 표시합니다.`
- Topics: `interfaces`, `validation` / `인터페이스`, `검증`.
- Evidence: `skeleton-evidence`; no links/assets.

Detail narrative, in this order:

| Section | English | Korean |
| --- | --- | --- |
| Context | `A synthetic personal-project context for testing the case-study structure. No deployment or employer is represented.` | `사례 구조를 검토하기 위한 합성 개인 프로젝트 맥락입니다. 배포 또는 고용주를 나타내지 않습니다.` |
| Problem | `Demonstrate how a case study can explain a bounded problem without inventing operational impact.` | `운영 성과를 만들어 내지 않고 범위가 명확한 문제를 설명하는 사례 구조를 보여 줍니다.` |
| Constraints | `Keep ownership explicit.`; `Separate validation from outcomes.` | `소유 범위를 명확히 유지합니다.`; `검증과 성과를 구분합니다.` |
| Decisions | `Present role and contribution boundary before implementation detail.`; `Reserve evidence links for artifacts that actually exist.` | `구현 세부 정보보다 역할과 기여 범위를 먼저 제시합니다.`; `실제로 존재하는 자료에만 근거 링크를 사용합니다.` |
| Validation | `The skeleton is checked through schema validation, static route generation, semantic tests, and real HTTP responses.` | `이 골격은 스키마 검증, 정적 경로 생성, 시맨틱 테스트, 실제 HTTP 응답으로 확인합니다.` |
| Outcome | `A reviewable page skeleton; no production, adoption, or business outcome is claimed.` | `검토 가능한 페이지 골격이며 프로덕션, 도입, 비즈니스 성과를 주장하지 않습니다.` |
| Limitations | `No real artifact, system diagram, employer context, or measured result is attached.` | `실제 자료, 시스템 다이어그램, 고용주 맥락, 측정 결과가 포함되지 않습니다.` |

### Article translation pair

- English: ID `skeleton-article-en`, slug `example-article`, locale `en`, title `Example Article`.
- Korean: ID `skeleton-article-ko`, same slug, locale `ko`, `translationOf: "skeleton-article-en"`, title `예시 글`.
- Summary: `Synthetic long-form content used to review article hierarchy and reading rhythm.` / `글의 구조와 읽기 흐름을 검토하기 위한 합성 장문 콘텐츠입니다.`
- Date `2026-08-28`; topics `evidence`, `engineering` / `근거`, `엔지니어링`; source `original`; no assets.
- Lede: `This synthetic article demonstrates structure only. It does not describe a real role, project, or result.` / `이 합성 글은 구조만 보여 줍니다. 실제 역할, 프로젝트, 결과를 설명하지 않습니다.`
- `Make the boundary visible` / `범위를 명확히 표시하기`: `A useful technical narrative separates context, individual contribution, team work, and evidence before discussing outcomes.` / `유용한 기술 서술은 성과를 설명하기 전에 맥락, 개인 기여, 팀 작업, 근거를 구분합니다.`
- `Record the decision` / `결정을 기록하기`: `The example structure pairs each decision with a constraint so the reader can evaluate the reasoning instead of reading a tool list.` / `예시 구조는 각 결정을 제약 조건과 연결하여 독자가 도구 목록이 아니라 판단 과정을 평가할 수 있게 합니다.`
- `Verify what the page promises` / `페이지가 약속한 내용을 검증하기`: `Schema checks, semantic tests, static builds, and HTTP responses cover different failure modes; none proves a professional claim.` / `스키마 검사, 시맨틱 테스트, 정적 빌드, HTTP 응답은 서로 다른 실패 유형을 다루며 어떤 것도 경력 주장을 증명하지 않습니다.`

## Supplied preview dictionary

Extend `UIDictionary` with a nested `skeleton` object. Preserve existing values and test complete EN/KO key parity.

| Key | English | Korean |
| --- | --- | --- |
| `eyebrow` | `Synthetic preview` | `합성 미리보기` |
| `notice` | `All Example-labeled content is synthetic, non-publishable, and shown only to review the portfolio structure.` | `‘예시’로 표시된 모든 콘텐츠는 합성된 비공개 자료이며 포트폴리오 구조 검토에만 사용됩니다.` |
| `baseline` | `Synthetic professional baseline for layout review; not a real biography.` | `레이아웃 검토를 위한 합성 경력 기준이며 실제 소개가 아닙니다.` |
| `direction` | `Example direction toward evidence-backed software and systems work.` | `근거 중심의 소프트웨어 및 시스템 작업을 향한 예시 방향입니다.` |
| `viewProject` | `View Example Project` | `예시 프로젝트 보기` |
| `resumeLabel` | `Résumé PDF` | `이력서 PDF` |
| `resumeUnavailable` | `Pending verified content; no file is available.` | `검증된 콘텐츠를 기다리는 중이며 파일은 제공되지 않습니다.` |
| `selectedEvidence` | `Selected example evidence` | `선택된 예시 근거` |
| `experienceSnapshot` | `Example experience snapshot` | `예시 경력 요약` |
| `professionalExperience` | `Professional experience` | `경력` |
| `educationAndTraining` | `Education and training` | `학력 및 교육` |
| `capabilityEvidence` | `Example capability with evidence` | `근거가 있는 예시 역량` |
| `recentWriting` | `Example writing` | `예시 글` |
| `viewExperience` | `View experience structure` | `경력 구조 보기` |
| `viewAllProjects` | `View all example projects` | `모든 예시 프로젝트 보기` |
| `viewBlog` | `View example writing` | `예시 글 보기` |
| `contactUnavailable` | `Contact details remain unavailable until factual review is complete.` | `사실 검토가 완료될 때까지 연락처를 제공하지 않습니다.` |
| `context` | `Context` | `맥락` |
| `status` | `Status` | `상태` |
| `role` | `Role` | `역할` |
| `contributionBoundary` | `Contribution boundary` | `기여 범위` |
| `problemAndConstraints` | `Problem and constraints` | `문제와 제약 조건` |
| `decisions` | `Decisions` | `결정` |
| `validation` | `Validation` | `검증` |
| `outcome` | `Outcome` | `결과` |
| `limitations` | `Limitations` | `한계` |
| `evidence` | `Evidence` | `근거` |
| `evidenceUnavailable` | `No inspectable artifact is attached to this synthetic record.` | `이 합성 기록에는 검토 가능한 실제 자료가 첨부되지 않았습니다.` |
| `synthetic` | `synthetic` | `합성` |
| `personal` | `personal` | `개인` |
| `inProgress` | `in progress` | `진행 중` |
| `completed` | `completed` | `완료` |
| `fullTime` | `full-time` | `정규직 예시` |
| `training` | `training` | `교육` |
| `projectEvidence` | `project evidence` | `프로젝트 근거` |
| `artifact` | `artifact` | `자료` |
| `backToProjects` | `Back to projects` | `프로젝트로 돌아가기` |
| `backToBlog` | `Back to Blog` | `블로그로 돌아가기` |
| `articleDisclaimer` | `Synthetic article — structure review only.` | `합성 글 — 구조 검토 전용입니다.` |

## Page composition

Use shared server components under `src/components/pages/`; locale routes select data/metadata and do not duplicate structure. Reuse accepted primitives where semantically correct. Every synthetic page places a visible localized notice immediately after its intro as ordinary text.

### Home, exact order

1. first viewport: eyebrow, localized Example Person `h1`, baseline, direction, localized Example Project link, unavailable résumé presentation;
2. compact synthetic fact strip: professional boundary, project evidence, reviewed-route availability;
3. selected evidence: Example Project and Example Article cards;
4. experience snapshot: professional record, then separately labelled training;
5. capability with evidence: synthetic skill and evidence card;
6. example writing: article and Blog link;
7. contact placement as unavailable status, with no email/link.

Do not copy full contributions, case-study narrative, or article body onto Home. Project detail is primary; résumé placement is discoverable but non-interactive.

### Experience

One `h1`; notice; separate Professional experience and Education/training `h2` sections. Use `ExperienceEntry` for professional work. Keep training visually/semantically separate and never label it employment. Add a Contribution boundary section explaining that real content will distinguish role, team context, individual contribution, and evidence.

### Projects

Index: one `h1`, notice, one responsive card linked to localized detail. Context/status/role/topics are metadata, not controls. No search/filter/counts.

Detail: localized back navigation; one `h1`, notice; metadata `dl`; boundary before narrative; then Problem/constraints, Decisions, Validation, Outcome, Limitations, Evidence `h2` sections in that order. Evidence uses no-artifact state. No fake image, diagram, repository, demo, or download.

### Blog

Index: one `h1`, notice, one localized article card. Topics are tags, not filters. No MDX/feed/history/search.

Article: localized back navigation; one `h1`; `time dateTime="2026-08-28"`; topics; disclaimer; supplied lede and three `h2` sections through `Prose`. No MDX, code highlighting, contents, reading time, sharing, comments, counts, or related content.

### 404 and résumé

Do not change the WP3D global 404 or test; verify it as regression behavior.

Add a server résumé-action component. Without `href`, render label/status as non-interactive text: no anchor, button, `download`, disabled control, or fake path. With a future valid asset path, render an accessible download anchor with a 44px target. WP4 uses only unavailable state; test both states but add no PDF or `/resume` route.

## Semantics and responsive behavior

- Preserve shell/tokens; one `main#main-content` and one `h1` per page.
- Use logical headings, `article`, `section`, back-link `nav`, metadata `dl`, `time`, and lists.
- Preserve readable measure/gutters; stack narrow layouts; no primary-content horizontal scroll at 320px.
- Links are keyboard reachable, focused, and at least 44px. Noninteractive tags/cards must not appear clickable.
- Preserve 200% zoom/reflow and reduced motion.
- No animation, gradients, terminal/dashboard styling, stock/industrial imagery, logos, or decorative diagrams.
- Use existing tokens. Change `globals.css` only if existing token-backed utilities cannot express a required reusable rule, and explain it.

## Authorized files

Only:

```text
src/app/(en)/page.tsx
src/app/(en)/experience/page.tsx
src/app/(en)/projects/page.tsx
src/app/(en)/projects/[slug]/page.tsx
src/app/(en)/blog/page.tsx
src/app/(en)/blog/[slug]/page.tsx
src/app/ko/page.tsx
src/app/ko/experience/page.tsx
src/app/ko/projects/page.tsx
src/app/ko/projects/[slug]/page.tsx
src/app/ko/blog/page.tsx
src/app/ko/blog/[slug]/page.tsx
src/components/pages/**
src/components/ui/resume-action.tsx
src/components/ui/components.test.tsx
src/data/skeleton-preview.ts
src/i18n/dictionaries.ts
src/i18n/dictionaries.test.ts
src/i18n/routing.ts
src/i18n/routing.test.ts
src/lib/skeleton-preview.ts
src/lib/skeleton-preview.test.ts
src/lib/seo/metadata.test.ts
src/app/globals.css       # narrow condition above only
AGENTS.md                 # remove generated Next block only
```

Focused page tests may live beside `src/components/pages/`. Do not edit schemas, validators, canonical data, fixtures, package/lockfile, Next config, root layouts, shell, global 404, CI, or legacy archive. No dependency change is authorized.

## Tests

Without new dependencies, prove:

1. preview helper: development/preview true; ordinary/production/absent false;
2. preview registry validates and every record is draft/pending/synthetic; canonical registry remains empty;
3. nested dictionary parity and unchanged existing values;
4. exact detail pairs, unknown-project fallback, unchanged article/generic fallback;
5. Home hierarchy, one `h1`, notice, project path, noninteractive résumé, ordered sections;
6. distinct professional/training Experience sections and visible boundary;
7. localized index links and no search/filter controls;
8. detail heading order, project no-artifact state, article `time[dateTime]`, localized back links;
9. disabled preview produces no synthetic core presentation/detail params;
10. résumé unavailable/future-available states.

Use current server-render/source-contract style. Do not weaken/delete the accepted 77 tests.

## Verification

Use Node 24 and Corepack pnpm `10.34.5`:

```text
corepack pnpm typecheck
corepack pnpm lint
corepack pnpm test
corepack pnpm content:check
corepack pnpm build
corepack pnpm check
git diff --check
```

Actual HTTP evidence is mandatory.

Development and `VERCEL_ENV=preview` build/run must return 200 for all 12 localized core/detail routes, render localized synthetic notices/content, keep `/_review` at 200, and preserve bilingual global 404 for `/not-real` and `/ko/not-real`. Verify detail language switching.

Then make a fresh ordinary production build/run. Eight core routes return 200 with localized review status and no synthetic strings; four detail URLs and `/_review` return 404; unmatched public URLs retain semantic bilingual 404. Record status, document `lang`, `main`/`h1` counts, headings/links, notice, and résumé-anchor presence. Build success alone is insufficient.

Afterward stop servers and confirm no listeners; remove generated AGENTS block; leave non-preview `.next`; confirm canonical data, schemas/validators/fixtures, dependencies/lockfile, CI, layouts/shell/404, and 39 archive files unchanged; confirm only authorized WP4 diff. Do not stage, commit, push, deploy, or change refs.

## Exclusions

Do not do any of the following: invent or migrate Sean facts, translations, projects, outcomes, metrics, links, or résumé data; treat legacy content as authority; select a flagship; add a PDF, contact link, or social link; add MDX/loading/feed/topics UI/redirects/history/sitemap/robots/social metadata/structured data/analytics/Playwright; add `/work`, `/about`, `/uses`, `/writing`, search/filter/pagination/comments/counts/database/Notion/chatbot/auth/CMS/runtime services; change dependencies/scripts/CI/Next flags/layouts/shell/theme/404/guards; add a client component; or commit/push/deploy/change production/domain/tag.

## Acceptance

WP4 passes only when development and Preview demonstrate complete bilingual synthetic journeys; ordinary production exposes no synthetic records/detail paths; each page has its approved semantic job; canonical content stays empty; WP1–WP3 behavior/guards remain green; responsive/keyboard review passes; no factual claim, dependency, asset, later-package infrastructure, or unauthorized file change appears; and Codex independently verifies diff and HTTP matrices. Gemini’s report alone is not acceptance.

## Copy/paste prompt for Gemini

> Implement only **WP4 — Representative Page Skeletons** using `docs/gemini-handoffs/wp4-representative-page-skeletons.md` as the complete specification. Read every required source, inspect Git first, and preserve all changes. Build the exact bilingual Home, Experience, Projects/detail, Blog/article, résumé-placement, and regression-404 skeletons with supplied synthetic copy. Keep canonical content empty; enable synthetic records only in development or `VERCEL_ENV=preview`; ordinary production must retain status pages and omit synthetic detail paths. Add no dependency, MDX, real content/résumé, later-package feature, or client behavior. Run full checks and real development, preview-build, and ordinary-production HTTP matrices; stop servers; leave a non-preview final build; report changed files, exact results, assumptions, and unsatisfied criteria. Do not stage, commit, push, deploy, or change refs.

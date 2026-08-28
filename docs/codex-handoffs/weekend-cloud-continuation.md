# Portfolio v2 — Weekend Cloud Continuation Handoff

**Snapshot:** 2026-08-28 (Asia/Seoul)

**Purpose:** Resume Codex planning and review from a new ChatGPT/Codex cloud task without importing the full desktop conversation.

**Snapshot state:** WP3D has been independently reviewed and accepted. The cumulative WP1–WP3 working tree is ready for its first checkpoint commit.

## 1. Mission and responsibility boundary

Build a clean-slate v2 of `seanchoi.space` as an English-first, Korean/international portfolio with reviewed Korean routes. The portfolio should provide deeper evidence than an application resume rather than duplicate it.

The working model is:

```text
Sean: facts, approvals, project evidence, final editorial judgment
Codex: product, content, architecture, specifications, acceptance criteria, and independent review
Gemini: bounded implementation of Codex-authored work-package specifications
CI/preview: objective verification
```

Do not ask Gemini to make product, architecture, dependency, content, or design-direction decisions. Do not treat a Gemini implementation report as proof that a gate passed; Codex must inspect the diff and independently verify important behavior.

## 2. Authoritative reading order

Read these files completely before continuing:

1. `AGENTS.md`
2. `docs/portfolio-v2-exploration-report.md`
3. `docs/portfolio-v2-implementation-plan.md`
4. `docs/portfolio-content-contract.md`
5. This handoff
6. The currently active file under `docs/gemini-handoffs/`

The repository documents are authoritative over recollections or summaries of the prior chat. Older Gemini handoffs remain an audit trail, but a later remediation handoff supersedes conflicting requirements from its predecessors.

## 3. Git and repository snapshot

At the time of this handoff:

- repository: `se4nchoi/seanchoi.space`
- branch: `v2`
- HEAD: `c89816d1a027a999a889ef5faa06e713d69b1d88`
- v1 checkpoint tag: `v1-production-2026-08-28`, resolving to the same commit
- remote: `origin` at `https://github.com/se4nchoi/seanchoi.space.git`
- commits made for v2: none
- pushes/deployments made for v2: none
- working tree: intentionally contains the cumulative clean-slate WP1–WP3 replacement as uncommitted changes

Do not reset, clean, restore, or otherwise discard the working tree. The many deleted v1 paths and new `src/`, `legacy-content/`, documentation, pnpm, ESLint, Vitest, and CI paths are expected parts of the overhaul.

A cloud task can only inspect this state after it has been committed and pushed, or after the files/diff have otherwise been uploaded to that task. GitHub currently contains neither the uncommitted implementation nor these untracked planning documents.

## 4. Accepted and active gates

- **WP1 — Clean-slate v2 foundation:** accepted after remediation.
- **WP2 — Content schemas and safeguards:** accepted after remediation.
- **WP3 — Design system and bilingual shell:** accepted after WP3D remediation and independent HTTP verification.
- **Latest completed remediation:** `docs/gemini-handoffs/wp3d-global-bilingual-not-found.md`.

WP3A, WP3B, and WP3C attempted to repair localized unmatched-route behavior. Their catch-all and nested-layout approaches did not change the real Next.js 16.3.3 HTTP response. WP3D supersedes those approaches with the framework-supported experimental `global-not-found.tsx`: one semantic bilingual error document for unmatched URLs, while ordinary routes retain English and Korean localization.

The important review lesson is that passing unit tests and a successful build did not prove real 404 behavior. For routing and environment-boundary work, actual HTTP responses from both `next dev` and a freshly built `next start` are mandatory evidence. Codex performed that independent matrix for WP3D: both `/not-real` and `/ko/not-real` returned the semantic bilingual global document with HTTP 404 in development and production; normal `/` and `/ko` routes remained correctly localized; and the preview-only `/_review` route remained available in development and absent in production.

## 5. Immediate continuation sequence

1. Inspect `git status`, the current diff, branch, HEAD, and tag. Preserve all existing changes.
2. Create the first coherent v2 checkpoint commit covering accepted WP1–WP3.
3. Push branch `v2` and the v1 checkpoint tag when Sean authorizes the push.
4. In the continuation environment, confirm the pushed commit and reread the authoritative documents.
5. Have Codex create the decision-complete WP4 specification. Do not let Gemini start WP4 from the high-level implementation-plan summary alone.

Suggested checkpoint commit subject after WP3 passes:

```text
feat: establish portfolio v2 foundation and bilingual shell
```

## 6. Current product and architecture decisions

- Primary audience: Korea plus international employers.
- Default language: English; reviewed Korean pages live under `/ko/...`.
- Blog remains at `/blog`; categorization belongs in tags or sections.
- Content source for v2: validated local files/MDX. Notion integration is deferred beyond v2.
- Public contact/privacy: email and `South Korea` only; no phone or work-authorization details.
- No duplicated web-resume page. A concise PDF may be added later as an application artifact, subject to the content contract.
- About is deferred; the homepage may contain a short trajectory statement.
- Real flagship case studies are not yet established. Use synthetic fixtures only until Sean supplies verifiable project evidence.
- Historical posts are untrusted migration sources and must be revised before publication; preserve justified redirects when slugs change.
- Minimal Vercel Analytics and Speed Insights are planned for WP8.
- V1 application architecture is not a compatibility requirement. Only transferable content/evidence is retained under `legacy-content/` for later review.
- Current foundation uses Node 24, pnpm 10.34.5, Next.js 16.3.3, React 19.2.8, strict TypeScript, Tailwind CSS 4, ESLint, Vitest, and Zod with exact direct-version pins.

## 7. Hard constraints and deferred work

- Do not invent career claims, metrics, dates, project maturity, skill levels, translations, or contribution boundaries.
- Do not publish synthetic fixtures.
- Do not reintroduce Notion, a chatbot/Gemini API, PostgreSQL, view counts, accounts, comments, or a CMS into v2.
- Do not expose phone or work authorization.
- Do not change production, merge to `main`, or move domains during foundation work.
- Do not begin WP4 while WP3 remains open.
- The possible cheaper domain or `.blog` migration is a separate 2027 concern; preserve the ability to redirect via DNS/HTTP later, but do not implement it now.

## 8. Starter prompt for the cloud task

Use this after the `v2` state and documentation are available to the cloud task:

> Continue as the Codex planning and independent-review authority for Portfolio v2. Gemini remains the implementation layer. Read `AGENTS.md`, `docs/portfolio-v2-exploration-report.md`, `docs/portfolio-v2-implementation-plan.md`, `docs/portfolio-content-contract.md`, `docs/codex-handoffs/weekend-cloud-continuation.md`, and the latest relevant Gemini handoff completely. Inspect the branch, HEAD, status, and diff before acting; preserve all current changes. WP1–WP3 were independently accepted on the desktop environment, with WP3D closing the routing gate through real development and production HTTP verification. Confirm that the expected checkpoint commit is present, then prepare the decision-complete WP4 specification for Sean's review. Treat future implementation reports as claims rather than proof and independently verify consequential behavior before accepting a work package.

## 9. What does not need to be transferred

The full desktop chat transcript is not required once the repository contains this handoff and the authoritative planning documents. The useful history is the decision record, current state, supersession chain, and next gate—not every exploratory exchange.

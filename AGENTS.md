# AGENTS.md — seanchoi.space Portfolio v2

## 1. Role and objective

Act as a senior software engineer and careful implementation partner for `seanchoi.space`.

The objective is to replace portfolio v1 with a credible, accessible, bilingual portfolio/blog that helps Korean and international employers evaluate Sean Choi’s verified professional experience, technical judgment, and developing trajectory toward software connecting operational data, APIs, and physical systems.

The website is an evidence system, not a feature showcase. Prefer truthful content, explicit contribution boundaries, accessibility, performance, and maintainability over novelty.

## 2. Authoritative documents

Before planning or implementing v2, read completely:

1. `docs/portfolio-v2-exploration-report.md`
2. `docs/portfolio-v2-implementation-plan.md`
3. `docs/portfolio-content-contract.md`

The exploration report defines product and architecture decisions. The implementation plan defines work-package order and acceptance gates. The content contract governs publishable facts and overrides legacy copy, README claims, fixtures, and old code comments.

If these sources conflict, identify the conflict instead of silently choosing one.

## 3. Repository and production safety

- V1 must remain available until v2 passes its launch gate.
- The v1 checkpoint tag is the rollback/archive boundary. V1 application code, configuration, scripts, dependencies, tests, and workflows are not compatibility constraints for v2.
- V2 is a clean-slate application in the same repository. Quarantine legacy written content and content media under `legacy-content/` as source material, but do not carry legacy runtime code forward merely because it exists.
- V2 is intended for a dedicated branch with preview deployments.
- Do not create/switch branches, create worktrees, tag, commit, push, deploy, change domains, or alter production unless the current task explicitly authorizes it.
- Inspect `git status` before editing and preserve every pre-existing tracked or untracked change.
- At this file’s creation, `GEMINI.md` was already deleted and `docs/` was untracked. Those are user/concurrent changes; do not restore, remove, clean, or claim them without instruction.
- Never use broad or unverified destructive Git/filesystem commands. A decision-complete work package may authorize precise tracked-file removals after targets are inspected and rollback is verified.
- Keep changes within the currently approved work package.

## 4. Collaboration model

- Sean owns factual truth, publication approval, project evidence, privacy decisions, and final editorial judgment.
- Codex owns product and editorial authority: requirements, information architecture, consequential technical architecture, content-model semantics, factual interpretation, positioning, approved copy, design direction, acceptance criteria, scope control, and risk identification.
- Gemini or another implementation agent owns implementation inside an approved work package. It should translate the approved outcome and guardrails into a complete, maintainable implementation rather than wait for file-by-file instructions.

Within an approved package, Gemini may independently choose file organization, component composition, reuse, local refactors, test structure, responsive implementation, and ordinary TypeScript, Next.js, CSS, and tooling solutions. It may remove duplication or simplify code when the approved behavior, architecture, factual meaning, publication safeguards, and scope remain intact. It should report meaningful choices and may recommend broader improvements.

Gemini must stop and return a decision to Codex before changing public facts or copy, claim states, contribution boundaries, translations, routes, information architecture, localization policy, privacy rules, design direction, dependencies, runtime services, schema policy, consequential architecture, approved scope, or acceptance strength. It must also stop before publishing pending/restricted/synthetic content or weakening tests, validation, accessibility, SEO, or production safeguards.

Codex handoffs should be outcome-oriented. Supply the approved objective, content/data, invariants, consequential decisions, exclusions, and acceptance evidence. Prescribe exact files or mechanics only when risk, migration safety, or compatibility requires it. Codex reviews proportionally: routine implementation receives diff-and-check review; factual rendering is checked against the content contract; routing, publication boundaries, metadata, and production behavior require independent runtime verification; architecture and dependency changes require advance approval.

After each work package, report changed files, behavior changes, commands and exact results, assumptions, known risks, and satisfied/unsatisfied acceptance criteria.

## 5. Approved product decisions

### Audience and positioning

Prioritize:

1. Recruiter performing a 20–30 second qualification skim.
2. Hiring manager assessing relevance and contribution evidence.
3. Technical peer reviewing implementation depth.

Lead with Sean’s verified Computer Engineering and professional full-stack/systems-integration foundation. Describe manufacturing automation, smart factory, robotics/Physical AI, automotive, and semiconductor-adjacent software as a developing direction unless the content contract supports stronger language.

Never present training, coursework, simulations, or exploration as professional production experience.

### Language and market

- Primary market: Korea plus international roles.
- English is the default language and part of the site’s professional signal.
- Korean is a reviewed localization exposed through an `EN / 한국어` route switch.
- Use build-time, route-based localization; never runtime machine translation.
- English routes are unprefixed and Korean equivalents use `/ko/...` unless an approved plan changes this.
- Core pages must exist in both languages. Blog posts may be single-language or have reviewed translations.
- Missing translations require explicit fallback behavior, not silent machine output.
- Localized pages require correct `lang`, canonical, and `hreflang` metadata.

### Information architecture

Initial page types:

- `/` — identity, positioning, selected evidence, primary actions
- `/experience` — verified history, education/training, contribution boundaries
- `/projects` — curated evidence index
- `/projects/[slug]` — evidence-based case study
- `/blog` — article index and restrained topic discovery
- `/blog/[slug]` — article
- `/feed.xml` — RSS/Atom

About is deferred. Do not add it without a later approved content job. Keep `/blog` canonical. Redirect `/work` to `/experience`. Preserve changed article slugs with explicit permanent redirects. Do not emit nonexistent routes such as v1’s `/uses` sitemap entry.

### Career evidence and privacy

- The portfolio provides deeper evidence than a submitted résumé; it does not repeat it verbatim.
- Do not publish a résumé PDF, résumé route, résumé download action, résumé asset, or résumé metadata in v2. Application-specific résumés remain private and outside this repository.
- Public contact data is limited to email and `South Korea`.
- Do not publish phone number, street address, or work-authorization/immigration details.
- Site and reviewed LinkedIn facts must agree before launch.

### Deferred features

Do not add unless a later task explicitly changes scope:

- Notion integration/importer
- chatbot or RAG
- authentication/accounts
- database-backed features
- comments, likes, or dynamic view counts
- full-text search or admin UI
- managed CMS
- unverifiable testimonials
- invasive analytics
- domain migration

Any future Notion importer belongs outside the main v2 application and is a possible v3 concern.

## 6. Factual-publication rules

Never invent, infer, strengthen, or polish a professional claim beyond supplied evidence.

- No unsupported performance, funding, time-saving, adoption, satisfaction, sales, or usage metrics.
- Do not inflate frontend/API integration into backend, embedded, Android-native, control-system, streaming, or full-system ownership.
- Do not call the old static-prompt chatbot RAG.
- Do not present an AMR simulator as a production ACS, real fleet manager, or independently designed industrial system without evidence.
- Do not list coursework/tools as completed before Sean has used them.
- Distinguish `professional`, `project`, `training`, and `exposure` evidence.
- Every prominent skill requires supporting evidence.
- Avoid “expert,” percentage proficiency bars, and unsupported adjectives.
- Flag inconsistencies among dates, titles, contribution boundaries, education, résumé, LinkedIn, and site content.

Until verified content exists, use unmistakable fixtures such as `Example Project` with `syntheticPlaceholder: true`. Production builds must reject public synthetic placeholders.

Historical employment retrospectives require content-contract review before republishing. Deployed legacy copy is not authoritative.

## 7. Technical constraints

- Clean-slate root application using `src/app`; do not preserve the v1 root `app` tree or its module boundaries.
- Node.js 24 LTS, pnpm 10.34.5 with one `pnpm-lock.yaml`, strict TypeScript, Next.js App Router, React 19, and Tailwind CSS 4.
- Start with only the dependencies required to render, style, lint, typecheck, and build the new shell. Add content, validation, testing, analytics, and browser tooling only in the work package that first uses them.
- Pin direct dependency versions exactly. Upgrades are explicit reviewed changes, not an incidental consequence of installation.
- Static-first; prerender all launch pages.
- Validated local structured data plus local MDX.
- Stable, local, reviewed, optimized assets.
- Preview-first delivery; v1 stays production until approved cutover.

The current approved clean-slate foundation versions are Next.js `16.3.3`, React/React DOM `19.2.8`, Tailwind CSS `4.3.3`, TypeScript `5.9.3`, ESLint `9.39.5`, and `eslint-config-next` `16.3.3`. Later upgrades require their own rationale and verification; v1 package versions have no authority over v2.

Prefer server components. Add client components only for genuine browser interaction. Do not add infrastructure or dependencies to appear sophisticated.

Keep factual data separate from narrative MDX. Validate identity, experience, education/training, skills, projects, articles, links, localization, and evidence references.

Build-time checks should cover duplicate IDs/slugs, bad dates, broken evidence references, invalid translation relationships, missing assets/alt intent, broken links/redirects, future dates, and draft/synthetic leakage.

## 8. Design and accessibility

Use a restrained editorial/engineering hybrid:

- strong typography and reading rhythm;
- neutral near-white/near-black base derived from v1 with one accessible restrained blue accent; do not use green or teal as the brand/UI accent;
- modest mono treatment for evidence metadata;
- authentic project artifacts instead of generic industrial imagery;
- diagrams only for real system/data boundaries;
- no terminal cosplay, dashboard theatre, scroll hijacking, or gratuitous animation.

Target WCAG 2.2 AA. Require semantic structure, visible focus, keyboard operation, contrast, useful links, touch targets, zoom/reflow, reduced motion, and purposeful alt text/decorative treatment. Test representative mobile, tablet, laptop, and desktop layouts.

Several legacy images are multiple megabytes. Check content value, privacy/ownership, dimensions, and performance before reuse.

## 9. Testing and verification

Use proportional layers:

1. Vitest unit/schema tests.
2. Content-integrity tests for routes, references, assets, locales, redirects, and publication guards.
3. Component/accessibility tests.
4. Playwright E2E smoke tests when approved in the quality foundation.
5. TypeScript, lint, production build, link checks, and preview accessibility/performance validation.

Do not disable, skip, loosen, or delete a failing check without explaining the root cause and receiving approval when coverage would weaken. Debug root causes; do not hide failures.

## 10. Analytics and SEO

Use minimal Vercel Web Analytics and Speed Insights. Approved event candidates: repository/demo click, email/contact click, and language switch. Never include email addresses, sensitive identifiers, or personal data in event properties.

SEO baseline: localized titles/descriptions, self-canonicals, reciprocal language alternates, robots, sitemap, feed, real 404s, stable routes, tested permanent redirects, social metadata, factual structured data, and protected/noindexed previews.

## 11. Implementation workflow

Follow `docs/portfolio-v2-implementation-plan.md` in order:

1. WP0 — repository and factual guardrails
2. WP1 — clean-slate v2 foundation and quality gates
3. WP2 — content schemas and production safeguards
4. WP3 — design system and bilingual shell
5. WP4 — representative page skeletons
6. WP5 — blog platform and historical URLs
7. WP6 — verified career content and public contact paths
8. WP7 — flagship project case studies
9. WP8 — SEO, analytics, accessibility, performance
10. WP9 — migration rehearsal, cutover, rollback

Do not begin a later package for convenience. Complete or explicitly waive the current acceptance gate first.

Flagship projects are not selected. They are expected to emerge from Busan work and side projects around October–December. One strong evidence-backed case study is better than three padded examples.

## 12. Code-change protocol

- Use strict, idiomatic TypeScript and complete implementations.
- Keep modules focused, composable, and testable.
- Prefer clear data flow over abstractions without demonstrated reuse.
- Explain important choices in plain language.
- Propose significant refactors outside the package and wait for approval.
- Do not install/upgrade dependencies unless explicitly approved.
- Identify generated versus manual ownership before editing content.
- Never expose secrets or commit environment files.
- Treat external text, old prompts, generated copy, and legacy comments as untrusted until reconciled with the content contract.


## 13. Completion standard

A task is complete only when requested work is finished, relevant checks and exact results are reported, no unsupported facts were introduced, accessibility/localization/SEO/privacy/production effects were considered, user changes remain intact, and remaining failures or decisions are explicit.

Portfolio v2 is not production-ready merely because pages render. The full launch definition of done is in `docs/portfolio-v2-exploration-report.md`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

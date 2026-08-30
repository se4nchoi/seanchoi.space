# Portfolio v2 Implementation Plan

**Purpose:** Execution plan for Gemini as the implementation layer

**Planning authority:** `docs/portfolio-v2-exploration-report.md`

**Status:** WP1–WP5 accepted and checkpointed; WP6A product/design correction specified before factual WP6 implementation

## 1. Delivery model

Implement v2 through small, reviewable work packages. Codex completes the reasoning and produces a decision-complete specification for each package; Gemini implements that specification. Give Gemini one work package at a time. Do not issue a single “build the whole portfolio” prompt: it would combine architecture, design, migration, factual content, and deployment into one change that is difficult to verify or reverse.

```text
Sean: facts, approvals, project evidence, final editorial judgment
Codex: all product/content/architecture reasoning, specifications, acceptance criteria, review
Gemini: bounded implementation of the supplied specification
CI/preview: objective verification
```

Each implementation package has two gates: a **specification gate**, where Codex resolves decisions and Sean approves consequential choices, and a **review gate**, where Codex verifies Gemini’s implementation. Gemini must return missing decisions to Codex rather than inventing them. The next package begins only when the previous review gate passes or its known exceptions are explicitly documented.

### Responsibility boundary

Codex owns requirements, information architecture, technical architecture, schema semantics, content policy, positioning, factual interpretation, design direction, task decomposition, and test/acceptance design. Gemini does not brainstorm or choose among product alternatives; it translates an approved specification into code and tests.

Gemini may make ordinary local coding choices only when they do not change behavior, architecture, dependencies, factual meaning, visual direction, or scope. A missing product/architecture/content decision is a blocker to report, not a gap to fill.

## 2. Non-negotiable implementation contract

Gemini must follow these rules in every package:

1. Inspect repository state and applicable `AGENTS.md` before editing.
2. Preserve all pre-existing user changes. The current `docs/` directory is untracked until Sean deliberately commits it.
3. Keep v1 production available until the approved v2 cutover. The checkpoint tag and `main` preserve it; do not preserve its application code inside v2.
4. Do not invent career copy, outcomes, metrics, dates, testimonials, project maturity, or skill levels.
5. Use unmistakable `Example Project` fixtures with a production-blocking synthetic flag until Sean supplies verified content.
6. Do not add Notion, Gemini/chatbot, Postgres, view counts, accounts, comments, a CMS, or other runtime services to v2.
7. Keep `/blog`; do not rename it to `/writing`.
8. Build reviewed English and Korean routes. Do not add runtime machine translation.
9. Expose only email and `South Korea` publicly; exclude phone and work-authorization details.
10. Prefer server components, static generation, local content, and the smallest dependency set.
11. Add tests with behavior. Do not weaken TypeScript, lint, accessibility, or build checks to make a task pass.
12. Report changed files, commands run, results, assumptions, and remaining risks after every package.
13. Do not perform product brainstorming, choose architecture/dependencies, define schema meaning, write career positioning, or resolve factual ambiguity. Return those questions to Codex.
14. Treat Codex’s approved work-package specification and the publication contract as implementation inputs, not prompts to reinterpret.

## 3. Branch and release model

The intended model is:

```text
main                     v1 production until cutover
└─ v2                    v2 integration branch selected by Sean during WP1A
   ├─ small feature branches or focused commits
   └─ Vercel preview deployments
```

Before creating the branch:

- Verify which commit is serving production.
- Run the permitted v1 baseline checks after dependencies are available.
- Create an annotated v1 production tag at the verified commit.
- Preserve the untracked exploration and implementation documents.
- Create the exact branch approved by Sean. During WP1A, Sean selected `v2`; it is the current integration branch.

Do not switch the production branch or domain during development.

## 4. Work packages

For WP1–WP9, Codex must first issue a package specification containing exact scope, approved file/route boundaries, architecture decisions, supplied content, expected tests, acceptance criteria, exclusions, and any dependency or migration authorization. Sections labeled **Gemini work** describe implementation responsibility only; they do not delegate the underlying decisions to Gemini.

### WP0 — Repository and factual guardrails

**Goal:** Make the implementation safe to begin.

**Owner:** Codex and Sean. Gemini does not perform WP0 reasoning.

**Codex work**

- Reinspect Git status, branch, remotes, scripts, deployment assumptions, and applicable instructions.
- Maintain `AGENTS.md` as the project-level implementation contract.
- Maintain `docs/portfolio-content-contract.md`, including claim states, boundaries, and evidence requests.
- Create a current URL inventory from routes, sitemap, article slugs, and known external links.
- Record the verified production commit and specify the baseline commands and exact v1 checkpoint tag. Execution of approved mutating Git operations belongs to the implementation kickoff.
- Prepare the decision-complete WP1 specification before Gemini begins.

**Sean input**

- Approve the updated project instructions.
- Fill or verify identity, employment, education, contact, and disclosure facts in the contract.
- Decide the exact public English name form and Korean name form.

**Acceptance gate**

- No application behavior changes.
- Production commit and rollback tag are known.
- The contract distinguishes verified, disputed, prohibited, and pending facts.
- Existing URLs and intended redirects are documented.
- `AGENTS.md` no longer contradicts current graduation, market, testing, or architecture decisions.
- Sean approves the initial publication contract and understands which facts remain pending.
- Codex has issued the WP1 implementation specification; Gemini has no unresolved product or architecture decisions.

### WP1 — Clean-slate v2 foundation and quality gates

**Goal:** Replace the inherited v1 application/tooling surface with a minimal, buildable v2 foundation without real career content.

**Gemini work**

- Preserve the completed v1 checkpoint/tag and `v2` branch; do not redo WP1A.
- Remove the v1 application tree, runtime scripts, package manifest/lockfiles, inherited framework/style/test configuration, and legacy workflows from the v2 branch.
- Relocate legacy MDX and media byte-for-byte under `legacy-content/` as untrusted migration source material; remove importer state and do not wire the archive into the new runtime during WP1.
- Scaffold a fresh root application under `src/app` with Node.js 24 LTS, pnpm 10.34.5, Next.js 16.3.3, React 19.2.8, strict TypeScript 5.9.3, Tailwind CSS 4.3.3, ESLint 9.39.5, and `eslint-config-next` 16.3.3.
- Use exact direct-version pins and one new `pnpm-lock.yaml`; do not import either v1 lockfile.
- Add only install, development, typecheck, lint, build, start, and aggregate-check tooling needed by this foundation.
- Defer Vitest until WP2 has schema/integrity behavior to test; defer Playwright until representative routes exist.
- Replace legacy CI with install, typecheck, lint, and production-build checks for the clean foundation.

**Acceptance gate**

- Clean install and production build succeed.
- No legacy test is treated as a v2 requirement.
- CI runs the same typecheck, lint, and build commands developers run locally.
- No new runtime service or unnecessary component library is introduced.
- No v1 behavior or URL changed on `main`; rollback remains the tag/production branch rather than compatibility code in v2.

### WP2 — Content schemas and production safeguards

**Goal:** Make invalid or synthetic content difficult to publish.

**Gemini work**

- Implement typed schemas for site identity, experience, education/training, skills, projects, blog posts, links.
- Implement stable IDs, evidence references, locale fields, drafts, and `syntheticPlaceholder` handling.
- Add integrity checks for duplicate IDs/slugs, dates, broken evidence references, missing assets, and forbidden production fixtures.
- Add only synthetic `Example Project` fixtures.
- Keep structured factual data separate from MDX narrative.

**Acceptance gate**

- Invalid fixtures fail for the expected reason.
- Production build fails if a synthetic fixture becomes public.
- Prominent skills cannot exist without evidence references.
- Locale and translation relationships validate.
- No real claims have been invented or migrated yet.

### WP3 — Design system and bilingual application shell

**Goal:** Approve the visual grammar and locale behavior before building every page.

**Gemini work**

- Implement design tokens for typography, spacing, color, focus, borders, radii, content width, and motion.
- Build the global shell, semantic header/footer, navigation, theme behavior if retained, and `EN / 한국어` switch.
- Use English default unprefixed routes and Korean `/ko/...` routes.
- Add correct document language, localized metadata primitives, locale-aware links, and reviewed dictionaries.
- Build a small component set: evidence card, experience entry, project card, article card, tag, external link, figure, and prose primitives.
- Create a component/style review page available only in development or preview.

**Acceptance gate**

- English and Korean representative routes statically render.
- The switch preserves the equivalent route when a translation exists.
- Missing article translations have explicit fallback behavior.
- Keyboard navigation, focus, contrast, reflow, reduced motion, and theme behavior pass initial review.
- No industrial stock imagery, terminal theatre, or gratuitous animation is used.

### WP4 — Representative page skeletons

**Goal:** Validate information architecture with safe placeholder content.

**Gemini work**

- Build representative Home, Experience, Projects index, project detail, Blog index, blog article, and 404.
- Implement the approved homepage hierarchy for first viewport, 30-second scan, and two-minute scan.
- Keep About absent.
- Use synthetic content only and keep it blocked from production.

**Acceptance gate**

- Recruiter, hiring-manager, and technical-review paths can be demonstrated on preview.
- Homepage does not duplicate Experience content.
- Every page type has a clear job and semantic heading structure.
- Mobile and desktop review passes before real content is introduced.

### WP5 — Blog platform and historical URL behavior

**Goal:** Replace the fragile content loader, launch an intentionally empty blog platform, and retire historical URLs honestly.

**Gemini work**

- Implement validated local MDX loading under `content/blog`.
- Support local images, code, figures, callouts, headings, metadata, draft state, locale, topics, and translation relationships.
- Add RSS/Atom, blog sitemap entries, related content, and restrained topic navigation.
- Exclude Sandpack because no retained source article demonstrates a need for it.
- Add a historical-route retirement manifest and tests; do not invent unrelated redirects.
- Preserve all five legacy article ideas only under `legacy-content/`; publish none at v2 launch.
- Remove Notion sync from the v2 publication path; do not build its replacement.

**Sean input**

- Article dispositions approved on 2026-08-29: preserve all five as draft ideas and publish no launch article.
- Any later article, retrospective, RAG/chatbot work, or technical-project post requires a separately reviewed content iteration.

**Acceptance gate**

- `/blog` and `/ko/blog` render reviewed localized empty states.
- `/feed.xml` is valid with zero entries and the sitemap emits no article routes.
- All five historical article URLs return honest 404s without content or metadata leakage.
- Blog builds without Notion or a database.
- Missing images, bad frontmatter, duplicate slugs, invalid translations, and registry gaps fail validation.
- No draft, synthetic, retired, or legacy article leaks into production routes, metadata, feed, or sitemap.

### WP6 — Verified career content and public contact paths

**Goal:** Correct the public-product boundary, then replace fixtures with factual launch content.

**WP6A correction package**

- Remove the public résumé component, copy, schema/registry field, fixtures, tests, and any analytics or route expectation. Do not add a PDF, `/resume` route, replacement document action, or unverified contact destination.
- Replace the green/teal UI accent with the exact neutral-and-blue palette approved in the exploration report. Preserve the clean editorial structure, system dark mode, accessibility behavior, and existing route architecture.
- Make no dependency, factual-content, information-architecture, or later-package change.

**Gemini work after WP6A acceptance**

- Populate only contract-approved identity, experience, education/training, skills, and links.
- Derive shared summaries from canonical records rather than copying facts across files.
- Expose public contact paths only after their labels and destinations are verified.
- Add Korean translations only after English factual content is approved; mark translation review status.

**Sean input**

- Supply and approve every publishable fact and translation.
- Reconcile the site with reviewed LinkedIn facts. A private application résumé may be supplied transiently as an evidence candidate but remains outside Git and is not public output.

**Acceptance gate**

- The public résumé feature and metadata footprint are absent.
- The approved neutral-and-blue palette passes representative light/dark visual and contrast review without a green/teal UI accent.
- No pending/disputed fact is public.
- Site and reviewed LinkedIn facts agree.
- Korean copy is human-reviewed and not merely machine output.
- Public privacy rules are enforced.

### WP7 — Flagship project case studies

**Goal:** Publish evidence only when it meets the quality bar.

**Timing:** Expected after Busan and side-project work matures, approximately October–December. This package must not block foundation work, but it does block the full public launch definition.

**Selection rubric**

- Truthful contribution boundary.
- Relevance to the operational-data/physical-systems trajectory.
- Sufficient technical depth and meaningful constraints.
- Inspectable repository, demo, artifact, screenshots, or defensible disclosure.
- Explainable decisions, tradeoffs, tests, and limitations.
- Clear distinction among professional, personal, and training work.

**Gemini work**

- Implement case studies from Sean-provided evidence using the established schema and components.
- Add diagrams only when they represent real system/data boundaries.
- Link technologies and skills to concrete evidence.

**Acceptance gate**

- At least one genuinely strong case study exists; two or three are preferred but not fabricated.
- Every claim is inspectable or explicitly bounded.
- No training simulator is presented as a production industrial system.

### WP8 — SEO, analytics, accessibility, and performance

**Goal:** Complete baseline quality rather than treating it as polish.

**Gemini work**

- Implement canonical URLs, `hreflang`, localized metadata, social images, robots, sitemap, feed, breadcrumbs, and factual structured data.
- Retain minimal Vercel Web Analytics and Speed Insights.
- Track only approved events: repository/demo outbound click, email/contact click, and language switch.
- Complete automated and manual accessibility checks.
- Optimize images, fonts, JavaScript, and route loading against explicit budgets.
- Ensure preview deployments are protected or noindexed.

**Acceptance gate**

- WCAG 2.2 AA target has no serious/critical automated findings and representative manual checks pass.
- Localized pages have self-canonicals and reciprocal alternates.
- Analytics contains no sensitive properties.
- Representative mobile pages meet the approved performance budgets.
- Sitemap contains no nonexistent route such as the current `/uses` entry.

### WP9 — Migration rehearsal, cutover, and rollback

**Goal:** Replace v1 safely.

**Gemini work**

- Generate and test the complete redirect map, including `/work`, every historical blog slug, and any changed asset/document URLs.
- Run the complete launch checklist on the release preview.
- Produce a cutover runbook, rollback commands/procedure, and post-deployment verification checklist.
- Do not change the production domain or perform the possible 2027 domain move.

**Sean approval required**

- Final content approval.
- Production promotion/merge.
- Rollback owner and acceptable monitoring window.

**Acceptance gate**

- All launch definition-of-done items in the exploration report pass.
- The tested artifact is the artifact promoted to production.
- V1 tag/deployment remains recoverable.
- Production verification covers routes, redirects, metadata, language alternates, outbound links, analytics, errors, and performance.

## 5. Gemini implementation handoff template

Gemini does not own WP0. After Codex completes WP0 and Sean authorizes implementation, Codex should provide a WP1 prompt using this structure:

> Implement only **[work-package identifier and title]** in the existing `seanchoi.space` repository. Read every applicable `AGENTS.md`, `docs/portfolio-v2-exploration-report.md`, `docs/portfolio-v2-implementation-plan.md`, `docs/portfolio-content-contract.md`, and the complete Codex package specification below before editing.
>
> **Approved objective:** [one bounded outcome]
>
> **Required implementation:** [exact routes/files/behaviors and supplied design or content inputs]
>
> **Approved architecture and dependencies:** [decisions already made by Codex; state explicitly whether dependency changes are authorized]
>
> **Required tests and commands:** [exact verification expectations]
>
> **Explicit exclusions:** [features, files, services, content, and later work packages that must remain untouched]
>
> Inspect Git status first and preserve all existing user changes. Do not make product, positioning, content, schema-policy, design-direction, dependency, or architecture decisions. Do not invent factual copy. If the specification has a consequential gap or conflicts with the repository, stop and report the exact decision required from Codex. Otherwise implement the specification completely, run the required checks, and report changed files, commands/results, assumptions, and unsatisfied acceptance criteria. Do not commit, push, deploy, or change production unless this prompt explicitly authorizes that action.

Codex should replace every bracketed field with concrete decisions. A vague handoff is not ready for Gemini.

## 6. Review protocol for every Gemini handoff

Codex should review each Gemini result against five questions:

1. **Scope:** Did it change only the assigned package?
2. **Truth:** Did it introduce or strengthen any unsupported claim?
3. **Architecture:** Did it add runtime/dependency complexity without a requirement?
4. **Quality:** Are tests meaningful, and did the reported commands actually pass?
5. **Reversibility:** Can the change be reviewed and reverted without affecting v1 production?

Reject or revise a package when any answer is unsatisfactory. Do not carry known factual, accessibility, routing, or deployment debt into the next package merely to maintain momentum.

## 7. Immediate next action

WP1 through WP5 are accepted and checkpointed at `8b850080657bf758b635509d46f6e33f5da61293`. WP5 provides the bilingual static blog platform, strict local MDX/content integrity pipeline, deterministic Atom feed and sitemap behavior, exact historical-URL retirement, and development/preview-only Example Article fixtures while launch intentionally contains zero public articles. Codex independently verified `git diff --check`, typecheck, lint, 172 tests, the production content guard, ordinary and `VERCEL_ENV=preview` production builds, the production HTTP matrix including all five historical 404s, bilingual preview article rendering, and TOC-to-heading anchor alignment. Next.js still logs an internal `NoFallbackError` when intentionally omitted dynamic paths return the correct HTTP 404; retain this as a deployment-verification risk for WP9. The next action is WP6A: remove the public résumé footprint and apply the approved neutral-and-blue palette. After WP6A is accepted, pending identity, career facts, evidence, privacy decisions, verified public contact destinations, and reviewed translations remain hard gates for publishable WP6 content.

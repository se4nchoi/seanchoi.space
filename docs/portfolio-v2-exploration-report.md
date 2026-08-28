# Portfolio v2 Exploration Report

**Status:** Architecture amended for a clean-slate v2; foundation implementation pending

**Repository:** `seanchoi.space`, clean `main` at `c89816d`

**Date:** 2026-08-28

## 1. Executive recommendation

Build v2 as a new application in this repository on the `v2` branch, using pull requests and isolated Vercel previews while `main` continues to serve v1. The v1 tag preserves the old implementation; its application tree and dependency graph are not migration inputs. Choose Next.js App Router and TypeScript on their current merits, then make launch v2 static-first: no database, accounts, comments, live view counts, chatbot, or Notion integration. Use Git-tracked, schema-validated data for career facts and MDX for projects and articles. Treat any future Notion-to-MDX tool as a separate peripheral service and a possible v3 concern.

Prioritize visitors in this order: recruiter performing a 20–30 second skim, hiring manager assessing evidence, then technical peer reviewing depth. The primary market is Korea plus international roles, with English as the default and Korean as a reviewed localization. Use **Home, Experience, Projects, Blog** as primary navigation, with a visible résumé PDF action rather than a duplicated web-résumé section. Defer About unless it earns a distinct job.

Adopt a restrained editorial/engineering hybrid: excellent reading hierarchy with modest system-oriented evidence labels and diagrams. Avoid dashboard or terminal cosplay, gratuitous motion, and visual claims of industrial experience unsupported by content.

| Decision | Recommendation | Reversible? | Evidence that would change it |
| --- | --- | --- | --- |
| Repository | Same repository, v2 branch | Yes | Separate ownership/deployment boundary |
| Framework | Fresh Next.js App Router application | Yes, costly later | Prototype proves another framework materially simpler/faster |
| Rendering | Prerender all launch content | Yes | Proven request-time requirement |
| Career data | Typed local data plus publication contract | Yes | Trusted external canonical résumé source |
| Projects/articles | Validated MDX and local assets | Yes | Multiple editors or high volume justify a CMS |
| Notion | Omit from v2; possible external v3 importer | Yes | A later authoring workflow proves the maintenance worthwhile |
| Runtime services | None at launch | Yes | Measurable user need and operating budget |
| Localization | English default plus reviewed Korean locale | Yes | Maintenance cost exceeds recruiting value |
| Résumé | Public redacted PDF link; no duplicate web résumé | Yes | Recruiter testing shows a web version materially improves access |

## 2. Confirmed facts versus assumptions

### Confirmed repository facts

| Area | Fact | Consequence |
| --- | --- | --- |
| Git | Clean `main`, tracking `origin/main`; no local tags; no fetched `portfolio-content-overhaul` branch | Earlier dirty-branch note is no longer current. Create a v1 checkpoint before implementation. |
| Prior image | `public/about/about_10.jpg` is tracked and unmodified | Candidate asset only; no automatic reuse. |
| Legacy stack | Next.js `^16.2.7`, React 19.1, TypeScript, App Router, Tailwind 4 | Historical fact only; no package or file must be preserved. |
| Routes | `/`, `/work`, `/blog`, `/blog/[slug]`, `/api/chat`, robots and sitemap | V2 needs an IA migration, not a restyle. |
| URL defect | Sitemap emits `/uses`, but no route exists | Test every emitted URL before cutover. |
| Content | Five tracked MDX articles and local article images | Reusable after factual/editorial review. |
| Notion | Scheduled action writes MDX/images and pushes commits | Existing sync is a prototype, not a safe publication boundary. |
| Importer risks | First query page only; no delete/unpublish/rename reconciliation; uploaded-file image assumption; interpolated frontmatter; unclear generated ownership | Redesign if retained. |
| Runtime | Postgres counts article views; Gemini chatbot uses a hard-coded career prompt and no retrieval | V1 is not static; chatbot is not RAG. Exclude both from launch v2. |
| SEO | Basic metadata, article JSON-LD, robots, sitemap | Reuse the concepts, not generic copy or unchecked URLs. |
| Testing | Two Vitest parser tests only | Add schema, integrity, accessibility, and E2E layers. |
| Deployment | README identifies Vercel; no checked-in Vercel config | Verify dashboard, domain, and production-branch settings. |
| Instructions | `AGENTS.md` still says student/upcoming graduation, PGWP targeting, PostgreSQL, undecided tests, and “Jules” | Stale project context; reconcile separately before implementation. |
| Verification | Dependencies are absent and installation was prohibited | No build/test result is claimed. Establish a green v1 baseline later. |

Working assumptions needing confirmation: production deploys `main` through Vercel; existing public URLs merit continuity; a canonical public résumé PDF exists or will be created; and all provisional positioning still requires verification against the content contract.

Decisions confirmed by Sean: Korea plus international is the primary market; English is the default site language with Korean localization; Notion is outside v2; `/blog` remains canonical; public contact data is email plus `South Korea`; no phone or work-authorization details are public; minimal Vercel analytics is preferred; About is deferred; flagship projects are not yet selected; and historical retrospectives require revision and may receive new slugs with redirects.

## 3. Audience priority and journeys

The recruiter comes first because this visitor determines whether deeper evaluation occurs. The hiring manager comes second because relevance and credibility convert a skim into an interview. The technical peer comes third because implementation depth matters after the candidate is understood.

```text
20–30 s: identity → professional baseline → direction → strongest evidence → résumé/contact
2 min:   experience boundaries → selected projects → evidence-backed skills → role fit
5–15 m:  case-study decisions → constraints → architecture → validation → repository/demo
```

| Visitor | First question | Required path | Failure to avoid |
| --- | --- | --- | --- |
| Recruiter | Who is Sean and is he relevant? | Hero → evidence → résumé/contact | Aspirational keywords hiding professional experience |
| Hiring manager | What did he personally do? | Evidence item → boundaries → outcomes/links | Team outcomes presented as sole ownership |
| Technical peer | Can I inspect his reasoning? | Case study → tradeoffs/tests → repo/demo/writing | Tool lists without evidence |

Put verified professional experience before training or aspiration. Present manufacturing/Physical AI as a labeled extension of full-stack and integration experience. Make skills point to evidence.

## 4. Recommended 30-second impression

> Sean Choi is a Computer Engineering graduate with approximately two years of professional experience building full-stack applications and operational integrations. He is extending that foundation toward software that connects data, APIs, and physical systems.

Use “two years” only if verified dates support it. Keep “operational integrations” only if representative systems and Sean’s contribution can be named accurately.

This is more credible than leading with “Physical AI/robotics engineer,” which currently outruns the evidence, and more distinctive than “full-stack engineer” alone. A long domain list improves keyword density but harms recall; keep it out of the hero. Reconsider after substantial inspectable work or professional specialization changes the evidence base.

## 5. Information architecture

| Route | Status | Job |
| --- | --- | --- |
| `/` | Required | Identity, positioning, selected evidence, intent routing |
| `/experience` | Required | Employment, education/training, contribution boundaries |
| `/projects` | Required | Curated evidence index |
| `/projects/[slug]` | Required | Context, role, constraints, decisions, validation, outcome, links |
| `/blog` | Required | Article index with restrained topics/sections |
| `/blog/[slug]` | Required | Accessible articles and related content |
| Public résumé PDF | Required action, not necessarily a route | Redacted application-style summary for recruiters who discover the site independently |
| `/feed.xml` | Required | RSS/Atom discovery |
| `/about` | Deferred | Only for a distinct durable personal story |

The name links home; primary navigation contains Experience, Projects, and Blog. Put the language switcher and résumé PDF action in the header without giving either equal visual weight to every navigation item. Put GitHub, LinkedIn, email, RSS, and privacy notes in the footer/contact area.

Experience may link to project case studies or retrospectives, but facts remain canonical in career data. Projects and articles cross-link through a small controlled taxonomy of roughly 5–8 durable topics. Add simple tags/filters only when the collection is large enough; do not build full-text search for a small launch corpus. Do not launch a separate skills page.

Use a permanent redirect from `/work` to `/experience`. Keep `/blog` canonical. Preserve each existing article URL unless revision needs a clearer slug; in that case, add an explicit old-slug-to-new-slug permanent redirect. Remove `/uses` from the sitemap and return a real 404 unless historical deployment evidence reveals a page.

Exclude at launch: chatbot/RAG, accounts, comments, likes, view counts, database, admin UI, full-text search, excessive tags, testimonials without sources, and technology-logo walls.

## 6. Homepage content hierarchy

**First viewport:** name and professional baseline; two-sentence positioning; View projects and Download résumé actions; an optional compact strip of verified facts; and a discoverable `EN / 한국어` switch. Answer “who, proven at what level, moving toward what, and where is the evidence?”

**First 30 seconds:** two or three selected evidence cards; concise experience snapshot; explicit separation between professional experience and current training; visible résumé/contact paths.

**Two-minute scan:** selected projects with status, role, evidence type, and inspectable links; evidence-backed capability groups; two or three articles; short human note and contact footer.

Move complete employment narratives to Experience; architecture and tradeoffs to case studies; full skill inventory to résumé/evidence metadata; the photo collection to optional About; and the detailed transition narrative to Experience or a focused article. The homepage must be neither a shallow link directory nor a duplicate résumé.

## 7. Content model and canonical-source rules

Use build-time schema validation, such as Zod. Keep facts separate from narrative.

| Content | Format | Canonical source | Derived uses |
| --- | --- | --- | --- |
| Identity/positioning | Validated local data | Reviewed site data | Hero, metadata, Person JSON-LD |
| Employment | Validated local data | Content-contract-governed career data | Experience, home summary, résumé |
| Education/training | Validated local data | Reviewed career data | Experience, résumé |
| Skills | Data with evidence references | Reviewed career data | Facets, résumé, filters |
| Projects | Frontmatter plus MDX | Reviewed local MDX | Index, case study, related content |
| Articles | Frontmatter plus MDX | Git after review | Index, feed, sitemap, JSON-LD |
| Navigation/social | Site data | Reviewed local data | Header/footer/contact |
| Résumé | Career data plus presentation config | Structured career data | Redacted verified/generated PDF |

The public output is a redacted PDF rather than a duplicated web résumé. The site’s Experience and project pages provide the deeper evidence that a submitted résumé cannot.

Localized core content should share stable record IDs while storing reviewed `en` and `ko` fields. Article records need `locale`, `translationOf`, and translation-availability metadata so alternate versions can be linked without pretending every post has been translated.

Minimum concepts: `SiteIdentity`; `Experience` with dates, contributions, evidence references and verification status; `EducationOrTraining` with status and evidence level; `Skill` with evidence references; `Project` with role, boundary, status, links, topics, draft and synthetic-placeholder flag; `Article` with dates, topics, source and optional Notion source ID; and `ResumeMetadata` with revision/effective date/PDF path.

Evidence levels should describe source, not subjective mastery: `professional`, `project`, `training`, and `exposure`. Prominent skills require evidence references. Do not use percentage ratings or “expert.”

Before real migration, create `docs/portfolio-content-contract.md` containing authoritative identity/contact, employment and education facts; allowed contribution boundaries; allowed/disputed/prohibited metrics with sources; professional/project/training/exposure distinctions; confidentiality rules; canonical role labels; résumé/LinkedIn/site consistency checklist; reviewer, verification date, and change log.

Builds must reject invalid dates, duplicate slugs/IDs, broken evidence references, missing required summaries/assets, future publication dates, and production-visible synthetic placeholders. Placeholder records must be unmistakable (for example, **Example Project**) and marked `syntheticPlaceholder: true`. Schemas validate consistency, not truth; human review remains required.

## 8. Content-platform decision

Scores: 1 poor, 5 strong; maintenance 5 means low burden.

| Criterion | Weight | Local MDX | Notion → reviewed MDX | Headless CMS |
| --- | ---: | ---: | ---: | ---: |
| Authoring friction | 20% | 3 | 5 | 4 |
| Image handling | 15% | 4 | 3 | 4 |
| Portability | 15% | 5 | 5 | 3 |
| Validation/determinism | 20% | 5 | 4 | 3 |
| Preview/review | 10% | 4 | 5 | 4 |
| Failure isolation | 10% | 5 | 4 | 3 |
| Low maintenance | 10% | 5 | 3 | 2 |
| **Weighted** | 100% | **4.40** | **4.25** | **3.35** |

Local MDX is the v2 deployment and authoring source. Notion integration is deferred to a possible v3 and, if revisited, should live outside the website’s main application code. The matrix remains useful as a record of why: Notion improves authoring convenience but introduces a publication system that v2 does not need.

If v3 revisits it, use: Notion draft → explicit ready state → external importer → normalized MDX/assets → validation → reviewed pull request. That peripheral tool would still need pagination, stable IDs, deletion/rename reconciliation, deterministic assets, safe serialization, dry runs, and fixture tests. Notion supports Markdown/CSV export, which helps portability but does not eliminate normalization needs ([Notion export documentation](https://www.notion.com/help/export-your-content)).

Consider a headless CMS only when multiple non-technical editors, scheduled workflows, granular roles, high volume, or advanced media management are proven requirements.

## 9. Visual direction

| Direction | Strength | Risk | Fit |
| --- | --- | --- | --- |
| Restrained editorial | Readable, mature, durable | Can feel generic | Strong |
| Engineering/system | Distinctive, supports diagrams/evidence | Can become theatre or overstate specialization | Conditional |
| Editorial/engineering hybrid | Readable plus distinctive evidence treatment | Requires consistent grammar | **Recommended** |

Principles: typography leads; one readable sans and restrained mono role; neutral base plus one accessible accent; project records foreground status/role/evidence; diagrams represent real boundaries; authentic screenshots beat stock industry imagery; motion respects reduced motion; tokens cover type/space/color/focus; WCAG 2.2 AA is baseline; and responsive layouts are content-driven.

Potential references to reuse after review: narrow reading measure, Geist, dark-mode concept, and prose primitives. Do not carry forward small gray text, heavy photo grid, floating chatbot, or current styling unchanged. Several current homepage JPGs are roughly 2–4 MB and require selection, resizing, and compression.

## 10. Technical architecture

### Alternatives and recommendation

Use the same repository and the existing `v2` branch. Git history and the `v1-production-2026-08-28` tag preserve the old implementation, so there is no need for compatibility scaffolding, a nested subproject, or a second repository. The v2 root should be a fresh application, not a gradual refactor of the old tree.

Choose Next.js App Router independently of v1. It supports metadata, sitemaps, static route generation, React Server Components, and the existing Vercel delivery model ([Next.js metadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata), [App Router API](https://nextjs.org/docs/app/api-reference)). Astro could ship less JavaScript for a content site, but the product already needs React-quality component composition, bilingual route handling, rich MDX, and Vercel previews; a second framework does not create a meaningful ownership or product advantage. Revisit only if measured output shows Next cannot meet the performance budget cleanly.

Prerender every launch page. Next export mode excludes features requiring a runtime server ([Next.js export guidance](https://nextjs.org/docs/app/guides/backend-for-frontend)). `output: 'export'` is optional if normal prerendering provides the same outcome with better image ergonomics; verify output behavior rather than treating a flag as the goal.

### Localization architecture

Use route-based, build-time localization—not a runtime translation widget. English is the canonical default at unprefixed routes such as `/projects`; Korean equivalents live under `/ko`, such as `/ko/projects`. The `EN / 한국어` control navigates to the equivalent reviewed route and stores preference only as a convenience. Do not automatically force Korean based on location or browser language; that would weaken the intentional English-first presentation.

Core navigation, homepage, Experience, Projects index/case studies, contact, metadata, and error states should ship in both languages. Blog posts may be English-only, Korean-only, or translated. When no equivalent exists, the switch should lead to the other language’s Blog index with a clear explanation, not machine-translate the article or silently fall back. Each localized page needs the correct `lang`, self-canonical URL, and `hreflang` alternates. Next.js supports locale route parameters and static generation for locale variants ([Next.js internationalization guide](https://nextjs.org/docs/app/guides/internationalization)).

Recommended boundaries: route files under `src/app`; shared presentation under `src/components`; typed site/career records under `src/data`; content schemas/loaders under `src/lib/content`; SEO builders under `src/lib/seo`; reviewed locale dictionaries under `src/i18n`; `content/projects` and `content/blog` for narrative MDX; local categorized assets; and the publication contract under `docs`. No Notion import code belongs in the v2 application.

Use Tailwind 4's CSS-first configuration plus CSS custom properties for semantic tokens; do not carry the v1 JavaScript Tailwind configuration forward. Avoid a component library until repetition justifies it. Prefer server components and add client components only for real interactions.

Assets need stable local paths, dimensions, alt-text intent, ownership/source notes, and file budgets. Avoid expiring Notion URLs. Serve resized/compressed derivatives rather than blindly copying originals.

### Testing

1. Vitest unit/schema tests for content, dates, evidence references, URLs, and structured data.
2. Integrity tests for duplicate routes, links, assets, alt text, placeholders, and generated ownership.
3. Component/accessibility tests for key semantics/interactions.
4. Playwright smoke tests for main journeys, redirects, PDF, menu/theme keyboard use, 404, article, and project.
5. CI: TypeScript, lint, tests, production build, link check, and preview Lighthouse/axe budgets.

Keep Vitest and add Playwright. Do not duplicate identical assertions across layers.

SEO baseline: unique metadata and canonical URLs; factual `Person`, `ProfilePage`, `BlogPosting`, and relevant project structured data; sitemap containing only canonical pages; robots; RSS/Atom; social images; stable slugs; breadcrumbs on deep pages; real 404s. Protect or noindex previews.

Analytics: retain Speed Insights during validation and use minimal Vercel Web Analytics rather than adding Google Analytics. Measure page/referrer traffic plus a very small event set: résumé download, project repository/demo click, email/contact click, and language switch. Vercel documents aggregated, cookieless analytics without cross-site or permanent visitor identity ([Vercel Web Analytics](https://vercel.com/docs/analytics), [privacy details](https://vercel.com/docs/analytics/privacy-policy)). Do not send email addresses, slugs containing personal data, or other sensitive event properties.

Use pull requests with automatic Vercel previews; Vercel provides isolated preview URLs for Git changes ([Vercel deployments](https://vercel.com/docs/deployments/overview)). Required checks gate merge, and only `main` deploys production.

## 11. V1-to-v2 migration, cutover, and rollback

1. Verify the production commit and Vercel settings.
2. On clean `main`, record a green v1 build/test baseline.
3. Create and push an annotated production checkpoint tag such as `v1-production-2026-08-28` at the verified commit.
4. Create the v2 branch; keep urgent v1 fixes small and intentionally sync relevant ones.
5. Replace the v1 application/configuration/dependency surface with a minimal clean-slate foundation.
6. Build representative skeletons with synthetic content excluded from production.

Transfer only content and content assets that fit the new route/content job and pass factual, ownership, accessibility, and performance review. Article slugs and URL history are migration data, not reusable code. Do not carry over the chatbot, database/view counters, Notion sync, hard-coded career copy, parsers, components, styles, tests, workflows, package manifest, or lockfiles. Reimplement any later-needed capability against the v2 contracts.

Before cutover, inventory the production sitemap, search-indexed URLs, top landing pages if analytics is retained, and links from GitHub, LinkedIn, and résumé. Do not blanket-redirect missing pages to home.

Cutover requires approved content contract; verified real content; matching web/PDF résumé and LinkedIn checklist; tested redirect inventory; green checks; no serious accessibility issues; met performance budgets; verified metadata/structured data/feed/sitemap/robots/social previews; browser/viewport and keyboard/screen-reader smoke checks; verified external links; and recorded rollback ownership.

Merge/promote the tested release through the existing production project if verified. If it fails, promote/redeploy the tagged v1 artifact or revert the merge through a normal reviewed commit. Keep the v2 branch and add a regression test before retrying.

After deployment, verify production status, canonicals, metadata, structured data, images, redirects, sitemap/search coverage, errors, Core Web Vitals, and outbound links. Confirm no request-time Notion, Postgres, or Gemini calls remain.

### Possible 2027 domain move

Do not combine the v2 application cutover with a domain change. Launch and stabilize v2 on `seanchoi.space`, then evaluate a new domain well before the 2027 renewal using **renewal price**, registrar transfer policy, name clarity, and long-term ownership—not a discounted first-year price. A `.blog` name fits the writing function but can understate the portfolio/professional function; a concise personal `.com`, `.dev`, or country-neutral name may age better if affordably available. The exact candidate and price must be checked near purchase because availability and renewal rates change.

A DNS record alone does not perform an HTTP redirect. A safe move requires the old domain to remain controlled and serve path-preserving permanent redirects from every old URL to its new equivalent. Update canonicals, internal links, sitemaps, social/profile links, analytics, and `hreflang`; verify both domains in Search Console and submit Change of Address. Google recommends explicit URL mapping, permanent redirects, updated canonicals and multilingual annotations, and retaining redirects during recrawl ([Google site-move guidance](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes)).

Because the old domain must remain active for a reliable migration, budget for at least one final renewal/retention period unless the registrar provides durable forwarding without an expensive renewal. The 2027 domain decision is therefore a cost/brand project, not merely a DNS toggle.

## 12. Risks and tradeoffs

| Risk | Mitigation | Tradeoff |
| --- | --- | --- |
| Aspiration outruns evidence | Lead with baseline; label training; evidence links | Less aggressive keywords initially |
| Site/PDF/LinkedIn drift | Contract and canonical data | External profiles still need human review |
| Long v2 branch diverges | Small v1 fixes and deliberate sync | Some duplication |
| Importer becomes a product | Optional/manual, narrow blocks, fixtures | Some formatting stays manual |
| Static is mistaken for bland | Progressive enhancement where useful | No vanity dynamic features |
| Old posts contain stale claims | Review; revise, archive, or redirect | Smaller launch archive |
| Images hurt performance/privacy | Per-asset review and budgets | Less photo-heavy presentation |
| Next is heavier than necessary | Server-first, measure JavaScript | Astro may remain leaner |
| Preview indexing | Protect/noindex previews | Mild reviewer friction |

## 13. Phased backlog

**Phase 0 — Guardrails:** reconcile stale `AGENTS.md` separately; checkpoint v1; approve content contract; define English/Korean editorial ownership and translation acceptance rules; inventory URLs, résumé/LinkedIn, and assets. Exit when implementation requires no factual, localization, or ownership guesses.

**Phase 1 — Representative skeleton:** establish branch, tokens, localized routing, language switch, layout/navigation/footer, schemas, fixtures, placeholder guard, representative page types, metadata/feed foundation, tests and CI. Exit with a complete bilingual synthetic preview.

**Phase 2 — Real content:** populate verified career data; select and write case studies; audit/migrate articles/assets; verify PDF. Exit with reviewed real content on every required route.

**Phase 3 — Bilingual content and historical revision:** complete reviewed Korean core pages; define per-article translation status; revise historical retrospectives under the contract; add any changed-slug redirects. Exit when every language switch and historical URL has deterministic behavior.

**Phase 4 — Quality:** complete tests, accessibility, browsers, links, images, performance, SEO, feeds, and redirects. Exit when launch definition is met on preview.

**Phase 5 — Cutover:** tag release candidate, merge/promote, verify production, monitor errors/search/links, retain rollback. Later only with evidence: external Notion importer, RAG, comments, accounts, search, database, complex analytics, CMS, or domain migration.

## 14. Explicit launch definition of done

- A recruiter can identify baseline, direction, strongest evidence, résumé, and contact within 30 seconds.
- All required routes and selected case studies/articles contain reviewed real content.
- Every claim/metric is contract-approved; contribution boundaries and experience levels are clear.
- No draft, unsupported testimonial/metric, or synthetic placeholder can publish.
- TypeScript, lint, build, unit, integrity, accessibility, E2E, and link checks pass.
- Launch pages prerender and do not require Notion, Postgres, Gemini, or another app service at request time.
- No duplicate IDs/slugs, broken evidence references, missing assets, or unnecessary route-wide client JavaScript remain.
- WCAG 2.2 AA target, keyboard, screen-reader smoke, focus, contrast, headings, alt text, touch, reflow, and reduced motion are verified.
- Mobile performance budgets pass on representative pages.
- Canonicals, metadata, social images, structured data, sitemap, feed, robots, and 404 behavior are verified.
- Known v1 URLs remain or redirect to the nearest equivalent; previews are not indexed.
- Production source/settings, v1 checkpoint, rollback owner/procedure, and post-launch checklist are documented.
- Public PDF, site, and reviewed LinkedIn facts agree.
- English and Korean core routes are reviewed, statically rendered, correctly linked with `lang`/`hreflang`, and never depend on runtime machine translation.
- Public résumé PDF exposes only approved information: email and `South Korea`, with no phone number or work-authorization details.
- Minimal analytics records only the approved aggregate page data and small event set.

## 15. Resolved decisions and remaining content gate

| Topic | Decision |
| --- | --- |
| Market/language | Korea plus international; English default; reviewed Korean toggle/routes |
| Notion | Omitted from v2; possible external peripheral importer in v3 |
| Writing URL | Retain `/blog`; organize with restrained topics/sections |
| Public résumé | Keep a redacted PDF link; no duplicated web résumé; publish email and `South Korea` only |
| Analytics | Minimal Vercel Web Analytics plus performance telemetry |
| About | Deferred; short homepage context in v2 |
| Historical retrospectives | Revise under the publication contract; allow new slugs with explicit redirects |
| Domain | Keep `.space` through v2 launch; evaluate a separately staged 2027 move |

The remaining launch-content gate is flagship evidence. No project should be promoted merely to fill a template. During Phase 1, use production-blocked **Example Project** fixtures. In Phase 2, review Busan outputs and side projects as they mature in October–December, then select two or three using this rubric: truthful contribution boundary, relevance to the intended trajectory, sufficient technical depth, inspectable artifact or defensible disclosure, meaningful constraints/decisions, and evidence of validation. If only one project meets the bar, launch with one strong case study rather than padding the section.

## Conclusion

Portfolio v2 should be an evidence system, not a feature demonstration. Its architecture should make truthful content easy to author, difficult to publish incorrectly, quick to evaluate, and independent of optional editorial tools. V1 offers content, media, and URL history for review; its code and dependency graph do not define v2.

# Portfolio overhaul — benchmark-led plan — 2026-09-30

## Status and authority

**Proposal, not an approved work package.** Sean asked for an overhaul plan optimized for job searching, explicitly set apart from the existing v2 plan documents. Nothing here is authorized for implementation until Sean resolves the decisions in §10. Where this plan conflicts with `AGENTS.md`, the exploration report, the implementation plan, or the content contract, those documents still govern until Sean amends them (§9 lists the exact changes).

This plan builds on the September 21 project-led preview direction (`wp6-preview-project-led-pass.md`, `wp6-preview-visual-pass.md`): web/API experience extending into physical systems, RUTA40 and 몰입도 as selected work, the robot cell as explicitly in-progress work, and approved real imagery. It keeps every factual-publication rule in `AGENTS.md` §6. It changes presentation, information architecture, publication policy for a portfolio PDF, and the weight of the content-governance machinery.

Codebase baseline: `v2` at `6ab0700` (refactor run: shared route handlers, split content pipeline, Tailwind theme tokens, dictionary cleanup). `pnpm check` passes with 193 tests.

## 1. Goal

A hiring manager or recruiter at a Korean manufacturing, robotics, or automation company — or an international software role — should understand within 20 seconds:

1. who Sean is (software engineer; UofT Computer Engineering 2026);
2. what he has shipped (professional web/API systems at Hoek Agency and EMG Global);
3. where he is going (PLC and robot integration, with visible hands-on evidence);
4. how to go deeper (case studies) or act (email, portfolio PDF, GitHub/LinkedIn).

The site should read as finished work with honest boundaries, not as an audit of claims.

## 2. Current gaps

- **Live v1** (`seanchoi.space`): generic "software engineer, optimist, part-time adventurer" hero, skills grid, lifestyle photos. No trace of the PLC/robotics direction that current applications target.
- **v2 preview**: the facts are right and the September 21 pass improved hierarchy, but presentation still leads with governance: evidence-level tags, contribution-boundary boxes on every card, "editorial review pending" notices, completed/planned scope lists on the homepage. There are no case-study pages (`/projects/[slug]` only serves the synthetic example), so the deepest evidence a reader can reach is a card.
- **Blog**: two synthetic example articles; legacy posts are quarantined. No live writing supports the trajectory.
- **No application artifact**: Korean hiring commonly expects a downloadable portfolio/résumé PDF; v2 policy currently forbids one.

## 3. Benchmarks

| Site | What to borrow | What to avoid |
|---|---|---|
| [portfolio.dohyeon.kr](https://portfolio.dohyeon.kr) | Work-first home: 3 featured case studies, then a compact list of 36 shipped projects. Mantra "BUILT, SHIPPED, OPERATED". Portfolio PDF download in the header (11 pages, dated). | 65-entry design archive — too much volume for Sean's current body of work. |
| [Dohyeon case study: 동작42 방문쿠폰](https://portfolio.dohyeon.kr/projects/dongjak-2025/) | Role badge ("4인 개발팀의 개발 리드"), three quick facts, section anchors (Problem → Architecture → Operation → Incident → Conclusion), state/flow diagrams, an honest incident write-up. ~2,000 words. | Length is fine for a lead role; Sean's write-ups can be shorter. |
| [blog.dohyeon.kr](https://blog.dohyeon.kr/) | Personality and judgment live in a separate blog with a clear tagline ("Problems Before Technology"). | Unsplash stock imagery. |
| [brittanychiang.com](https://brittanychiang.com) | 20-second skim: one-line value statement, experience entries of role + one paragraph + stack tags, 4 featured projects + archive, résumé link inside Experience. | Sticky single-page layout is optional, not essential. |
| [alexrobotics.net](https://alexrobotics.net/) | Software + industrial robotics positioned together; video and photos of real robots are the strongest evidence on the page. | Vague roles, no dates or outcomes, code-styled "Hello World" hero — exactly the weaknesses Sean's contribution discipline already avoids. |

## 4. Positioning

- **Lead (EN draft, already approved as preview copy):** "Building software that connects the web and the physical world."
- **Proof strip under the lead** (facts already in the registry): UofT Computer Engineering (2026) · professional web/API work at Hoek Agency and EMG Global · current smart-factory / physical-systems training in Busan.
- **Primary actions:** View work · Email · Portfolio PDF (if approved, §10).
- Do not headline AI; per the September 21 direction it appears only through future demonstrated projects.

## 5. Proposed information architecture

| Route (EN / KO) | Purpose |
|---|---|
| `/` · `/ko` | Hero + proof strip → 3 featured case studies (image-led) → "More work" compact list → experience timeline (3 entries) → short About with photo → contact |
| `/work/[slug]` · `/ko/work/[slug]` | Case studies (replaces the unused `/projects/[slug]` skeleton route) |
| `/work` · `/ko/work` | Full index: featured + all other records in one list; replaces `/projects` (add a permanent redirect from `/projects`) |
| `/experience` · `/ko/experience` | Keep; simplify to timeline + education/training + skills grouped by where they were used |
| `/log` · `/ko/log` | Build log (replaces the empty `/blog` index; keep `/blog` as a redirect) |
| `/portfolio.pdf`, `/ko/portfolio.pdf` | Application artifact, if approved |

Route renames (`/projects` → `/work`, `/blog` → `/log`) are an IA change and need Sean's approval; keeping the existing names is an acceptable fallback that removes the redirects.

## 6. Home page specification

1. **Hero:** name, lead line, one supporting sentence, proof strip, actions. Keep the approved PLC wiring photo or replace it with a robot-cell still/video (§7.4).
2. **Featured work (3):** image, title, one-line outcome, role line, 3–5 stack tags, link to the case study. No contribution-boundary box on the card — the role line carries it; the full boundary lives in the case study.
3. **More work:** one line per record — title · context · year · link (if any). Candidates from the registry: Daegu Smart City Dashboard, Classroom Q&A Board (대나무지식인), Classroom LAN Chat (after the pending purpose recheck), in-class implementation exercises.
4. **Experience timeline:** Hoek Agency, EMG Global, KDIC — role, dates, one sentence each; link to `/experience`.
5. **About:** one paragraph and one photo (personal, restrained — v1's human side without the lifestyle grid).
6. **Contact:** email (visible text + link), GitHub, LinkedIn, PDF.
7. Remove from Home: evidence-level badges, completed/planned scope lists, the editorial-review notice (keep it on preview deployments only), any skills inventory.

## 7. Case studies

### 7.1 Template (one MDX file per case study, EN required, KO when reviewed)

Frontmatter: `title`, `slug`, `locale`, `role` (one honest line, e.g. "Frontend developer — vehicle control UI; embedded module and APIs by other teams"), `period`, `team`, `stack[]`, `facts[]` (up to 3 short quick facts), `cover`, `status` (`shipped` | `in-progress`), `translationOf`.

Body sections:

1. **Problem** — who needed what, and the constraints.
2. **System** — a diagram of the real data/control flow (e.g. web UI ↔ API ↔ PLC ↔ robot); authentic artifacts over decorative diagrams.
3. **What I built** — Sean's part, stated plainly; name what others owned.
4. **Key decisions** — 2–4 decisions with the tradeoff each made.
5. **Result** — what shipped and how it was used; numbers only where Sean can defend them.
6. **What I'd do next / limitations** — including in-progress status for the robot cell.

Target length 600–1,500 words. The existing contribution-boundary text maps to §3 and the role line; completed/planned scope maps to §5 and §6.

### 7.2 Initial set

| Case study | Registry record | Status | Evidence Sean must supply or confirm |
|---|---|---|---|
| RUTA40 vehicle control interface (EMG Global) | `evidence-item-ruta40` | shipped | Screens beyond the approved cover, UI ↔ API ↔ vehicle flow, what "used on a physical vehicle" looked like, defensible numbers (screens, commands, test sessions) |
| 몰입도 attendance / HR product (Hoek Agency) | `evidence-item-hoek-immersion` | shipped | Sean's modules, stack, screenshots cleared for disclosure, usage facts if shareable |
| PLC / robot cell integration → ROS2 robot cell | `project-plc-robot-cell-integration`, `project-ros2-industrial-robot-cell` | in-progress | Wiring/ladder/CC-Link details, Neuromeka integration scope, **a 10–30 s video or GIF of a running cycle**, current completed vs planned state (recheck before any claim advances) |

Daegu Smart City Dashboard is the fourth candidate if disclosure allows.

### 7.3 Numbers

Korean recruiters look for quantified results. Collect only defensible figures (users, screens shipped, I/O points wired, cycle time, response latency, test coverage). Absent a defensible number, describe scope instead. `AGENTS.md` §6 metric rules remain in force.

### 7.4 Media

Video of real hardware is the highest-signal asset for automation and robotics roles. Keep each public asset below the existing size budget (`work-media.test.ts`), with localized alt text and bounded captions, following the September 21 approval pattern for every new file.

## 8. Build log, PDF, language

- **Build log (`/log`):** short dated entries from the robot-cell work — ROS2 setup, ladder logic, CC-Link issues and fixes, what failed. Aim for one entry every 1–2 weeks; 300–600 words each. Retire the synthetic example articles from the live index; republish at most one or two legacy posts after contract review.
- **Portfolio PDF (EN + KO):** 4–8 pages mirroring the case studies, no phone number or address, dated, regenerated when case studies change. Store the source (MDX/print stylesheet or a separate document) in the repo so it cannot drift from site facts. This reverses the current "no public résumé" rule and requires Sean's decision (§10).
- **Language:** if applications are mainly Korean, treat Korean as a full peer — Korean PDF, Korean case studies for the featured three, `최예현` in Korean titles/metadata — rather than a trailing translation. English remains the default route and international signal.

## 9. Codebase and policy changes

### Simplify

- Replace the synthetic skeleton/preview system (`data/skeleton-preview.ts`, `lib/skeleton-preview.ts`, the `skeleton` dictionary section, `/_review`) with real case-study MDX once the first case study exists. The `createProjectDetailRoute` factory is the single integration point (see refactor commit `2d670ee`).
- Keep strict validation where it protects facts cheaply: schema-valid frontmatter, no draft or placeholder publication, asset existence, translation pairing, no future dates. Drop presentation-level governance from rendered pages (evidence-level tags, review notices outside preview deployments).
- Evidence levels and claim states can remain in data for internal honesty checks without rendering as badges.
- Case-study components: `SectionHeading`, `Card`, figure with caption, stack tags, quick-facts row — this resolves the open design decisions from the refactor review (heading variants, card padding, `text-xs` vs `--text-small` captions).

### Documents Sean must amend before implementation

- `AGENTS.md` §5 "Career evidence and privacy": replace "Do not publish a résumé PDF…" with the approved portfolio-PDF policy (contents, privacy exclusions, update rule).
- `AGENTS.md` §5 "Information architecture" and the exploration report: new routes, redirects, `/log`.
- `AGENTS.md` §11 / implementation plan: insert this overhaul as a package (or packages) after WP6 preview, and state whether WP7 case studies begin now with the in-progress robot cell.
- Content contract: add case-study facts and new media approvals as they are supplied.

## 10. Decisions required from Sean

1. Approve this plan as the new direction (in full or per section).
2. Portfolio PDF: yes/no; EN only or EN + KO.
3. Routes: rename to `/work` and `/log`, or keep `/projects` and `/blog`.
4. Primary application market and whether Korean becomes a full peer for featured content.
5. The initial three case studies (§7.2) and the evidence/media Sean will supply for each.
6. Whether an in-progress robot-cell case study may publish before the ROS2 work completes (clearly marked in progress).
7. About section: include a personal photo and paragraph, or omit.
8. Build-log cadence Sean can sustain.

## 11. Work packages

| Package | Scope | Depends on | Acceptance |
|---|---|---|---|
| O0 Policy | Amend `AGENTS.md`, plan, contract per §9 | §10 decisions | Documents consistent; no conflicting rule remains |
| O1 Content | Sean supplies facts/media for 3 case studies; Codex drafts EN copy against the contract; Sean approves | O0 | Every claim traceable to supplied evidence; media approved for public use |
| O2 Case-study platform | MDX case-study loader + validation, `/work/[slug]` template, shared components, redirects; remove skeleton system | O0 | EN/KO routes prerender; redirects tested over HTTP (dev + production); canonical/hreflang correct; no synthetic content in production |
| O3 Home + index | Home per §6; `/work` index; simplified Experience | O1, O2 | 20-second skim test with 2–3 external readers; mobile/tablet/desktop checked; WCAG 2.2 AA basics (keyboard, contrast, focus, alt text) |
| O4 PDF | Print source + EN/KO PDFs, header/contact links | O1, PDF decision | No phone/address; facts match the site; file dated |
| O5 Build log | `/log` index + first 2 entries; retire example articles | O2 | Feed and sitemap updated; entries reviewed |
| O6 Launch | WP8/WP9 gates (SEO, analytics, performance, cutover from v1) | O3–O5 | Existing launch definition of done |

Suggested order: O0 → O1 (1–2 weeks of Sean's content time) in parallel with O2 → O3 → O4 → O5 → O6.

## 12. Verification approach

Reuse the refactor-run tooling pattern for every package:

- `pnpm check` (typecheck, lint, tests, content check, production build).
- Normalized prerendered-HTML and effective-style snapshots before/after any change meant to preserve appearance.
- HTTP matrix against `next dev` and `next start` for all routes, redirects, and 404s (status, `lang`, canonical, `hreflang`).
- Rendered review at representative widths in light and dark mode before editorial acceptance.

## Sources

- https://portfolio.dohyeon.kr
- https://portfolio.dohyeon.kr/projects/dongjak-2025/
- https://blog.dohyeon.kr/
- https://brittanychiang.com
- https://alexrobotics.net/
- https://seanchoi.space (live v1, observed 2026-09-30)

# Gemini Handoff — WP3 Design System and Bilingual Application Shell

## Gate status

WP2 is accepted. Codex independently verified WP2A with `corepack pnpm check`: TypeScript, ESLint, all 43 Vitest tests, the direct production-content guard, and the Next production build pass without warnings. The canonical registry remains empty, all 39 quarantined files match the v1 checkpoint, handoff documents are visible to Git, and the branch/HEAD/tag remain unchanged.

Implement only **WP3: the visual design system, locale infrastructure, bilingual shell, safe route placeholders, and preview-only component review page**. Do not add real portfolio claims or build the WP4 page hierarchy.

## Required reading

Read completely before editing:

1. `AGENTS.md`
2. `docs/portfolio-v2-exploration-report.md`
3. `docs/portfolio-v2-implementation-plan.md`
4. `docs/portfolio-content-contract.md`
5. `docs/gemini-handoffs/wp2-content-schema-foundation.md`
6. `docs/gemini-handoffs/wp2a-content-schema-review-remediation.md`
7. This handoff

If repository state conflicts with this specification, stop and report the exact conflict to Codex. Do not resolve product or design ambiguity independently.

## Product and design decisions

The approved direction is a restrained editorial/engineering hybrid:

- typography and reading hierarchy lead;
- the interface is quiet, precise, and evidence-oriented rather than decorative;
- use a warm-neutral canvas, one green/teal accent, fine borders, and almost no shadow;
- use the local system sans and system monospace stacks; do not download fonts or add a font package;
- English is the canonical unprefixed locale; Korean lives under `/ko`;
- all visible Korean text is source-controlled; no runtime translation, geolocation redirect, or browser-language redirect;
- retain automatic operating-system light/dark color behavior, but add no theme toggle or client-side theme state;
- use no hero image, stock industrial imagery, terminal treatment, dashboard chrome, gradient, glass effect, decorative grid, or gratuitous animation;
- prefer Server Components. The pathname-aware navigation/language control may be one small Client Component;
- no personal name form, résumé URL, social URL, career description, project claim, skill claim, or contact address is approved for WP3.

Use `seanchoi.space` as the neutral home-link label. Do not infer Sean's preferred English or Korean display-name form.

## Approved route architecture

Replace the single WP1 root layout with multiple root layouts so the document language is correct without request-time pathname inspection:

```text
src/app/
  globals.css
  (en)/
    layout.tsx             # root <html lang="en">
    page.tsx               # /
    experience/page.tsx    # /experience
    projects/page.tsx      # /projects
    blog/page.tsx          # /blog
    not-found.tsx          # English 404
    _review/page.tsx       # /_review, dev/preview only
  ko/
    layout.tsx             # root <html lang="ko">
    page.tsx               # /ko
    experience/page.tsx    # /ko/experience
    projects/page.tsx      # /ko/projects
    blog/page.tsx          # /ko/blog
    not-found.tsx          # Korean 404
```

Delete the superseded `src/app/layout.tsx` and `src/app/page.tsx` only after the replacement routes exist. Both locale layouts must import the same `globals.css` and render the same shared shell with different locale data.

The Experience, Projects, and Blog routes in WP3 are intentionally minimal **route-presence placeholders**, not WP4 page skeletons. Each contains only a localized metadata definition, one localized `h1`, and one short neutral status sentence. Do not render synthetic records or copy fixture claims onto these routes.

Expected static public routes after the build:

```text
/
/experience
/projects
/blog
/ko
/ko/experience
/ko/projects
/ko/blog
```

The review route may appear in the build graph, but it must return not-found in production as defined below.

## Locale infrastructure

Create a small source-controlled locale layer under `src/i18n/`:

```text
src/i18n/config.ts
src/i18n/dictionaries.ts
src/i18n/routing.ts
src/i18n/routing.test.ts
src/i18n/dictionaries.test.ts
```

### Locale contract

- Supported locales are exactly `en` and `ko`.
- Default locale is exactly `en`.
- English uses unprefixed routes.
- Korean uses the `/ko` prefix.
- Export typed locale guards and route helpers. Do not add an i18n library.
- Dictionaries must be statically imported, fully typed, and complete for both locales. Do not fetch them or dynamically machine-translate values.

### Approved UI dictionary

Use these exact interface labels and placeholder messages. These are shell copy only, not career claims.

| Key | English | Korean |
| --- | --- | --- |
| `skipToContent` | Skip to content | 본문으로 건너뛰기 |
| `primaryNavigation` | Primary navigation | 주요 탐색 |
| `home` | Home | 홈 |
| `experience` | Experience | 경력 |
| `projects` | Projects | 프로젝트 |
| `blog` | Blog | 블로그 |
| `language` | Language | 언어 |
| `english` | English | 영어 |
| `korean` | Korean | 한국어 |
| `openInNewTab` | opens in a new tab | 새 탭에서 열림 |
| `homeTitle` | Portfolio preview | 포트폴리오 미리보기 |
| `homeStatus` | The bilingual portfolio shell is being prepared. Verified work and writing will be added after review. | 이중 언어 포트폴리오 구조를 준비하고 있습니다. 검증된 작업과 글은 검토 후 추가합니다. |
| `experienceStatus` | Verified experience content will be added after review. | 검증된 경력 콘텐츠는 검토 후 추가합니다. |
| `projectsStatus` | Verified project case studies will be added as evidence becomes available. | 검증 가능한 근거가 준비되는 대로 프로젝트 사례를 추가합니다. |
| `blogStatus` | Reviewed writing will be added through the local publishing workflow. | 검토된 글은 로컬 게시 절차를 통해 추가합니다. |
| `notFoundTitle` | Page not found | 페이지를 찾을 수 없습니다 |
| `notFoundBody` | The requested page does not exist or is not available in this language. | 요청한 페이지가 없거나 이 언어로 제공되지 않습니다. |
| `backHome` | Return home | 홈으로 돌아가기 |
| `footerPolicy` | English-first. Korean content is published after review. | 영문을 기본으로 하며, 한국어 콘텐츠는 검토 후 공개합니다. |

Do not add a Korean personal name or translate `seanchoi.space`.

### Route-pair and fallback behavior

Create a pure route-pair manifest/helper used by the language switch:

```text
/             <-> /ko
/experience   <-> /ko/experience
/projects     <-> /ko/projects
/blog         <-> /ko/blog
```

Requirements:

- the switch is rendered as two compact text choices: `EN / 한국어`;
- the current locale is exposed with `aria-current="true"` and is not a link to itself;
- the other locale is a normal Next link;
- switching from any route in the manifest preserves the equivalent page;
- a future unmatched `/blog/<slug>` or `/ko/blog/<slug>` falls back to the other locale's Blog index;
- any other unmatched path falls back to the other locale's home;
- query strings and hashes are not copied into locale links;
- do not store preference yet because WP3 has no consumer for it, and never redirect automatically.

The pathname-aware control may use `usePathname`. Keep all dictionaries, route mapping, fallback decisions, and layout content server-compatible and pure.

Test every exact pair, both blog-detail fallbacks, both generic fallbacks, and trailing-slash normalization.

## Metadata primitives

Create `src/lib/seo/metadata.ts` and a focused unit test. It must:

- use `https://seanchoi.space` as `metadataBase`;
- generate localized title and description values supplied by each route;
- use the exact title template `%s — seanchoi.space` and default `seanchoi.space`;
- generate a self-canonical URL plus `en`, `ko`, and `x-default` alternates from the route-pair manifest;
- use English as `x-default`;
- never generate an alternate pointing at a nonexistent route;
- contain no structured data, Open Graph image, analytics, robots, sitemap, or feed work; those remain WP8/WP5.

Use these page titles:

| Route | English | Korean |
| --- | --- | --- |
| Home | Portfolio preview | 포트폴리오 미리보기 |
| Experience | Experience | 경력 |
| Projects | Projects | 프로젝트 |
| Blog | Blog | 블로그 |

Use each page's approved status sentence as its description. Tests must assert canonical and reciprocal alternate URLs for at least Home and Projects in both locales.

## Shared application shell

Create shared presentation under `src/components/` with these boundaries:

```text
src/components/shell/site-shell.tsx
src/components/shell/site-header.tsx
src/components/shell/primary-navigation.tsx
src/components/shell/language-switch.tsx
src/components/shell/site-footer.tsx
src/components/ui/container.tsx
src/components/ui/page-intro.tsx
src/components/ui/tag.tsx
src/components/ui/external-link.tsx
src/components/ui/evidence-card.tsx
src/components/ui/experience-entry.tsx
src/components/ui/project-card.tsx
src/components/ui/article-card.tsx
src/components/ui/figure.tsx
src/components/ui/prose.tsx
```

Equivalent grouping is acceptable only when it preserves these component responsibilities and does not create a generic abstraction layer.

### Header and navigation

- Use semantic `header` and `nav` landmarks with a localized accessible navigation label.
- `seanchoi.space` links to the current locale's home.
- Primary navigation is exactly Home, Experience, Projects, Blog.
- Active-page navigation uses `aria-current="page"`.
- All controls remain visible without a hamburger menu. On narrow screens, use a deliberate two-row/wrapping layout rather than client-side menu state.
- The language switch is visually discoverable but secondary to navigation.
- Do not render a résumé action in the live shell until a real reviewed PDF exists. The component styling may be represented on the review page only; WP6 will connect the actual action.

### Main and footer

- Each locale root layout provides one localized skip link targeting `#main-content`.
- `SiteShell` owns header/footer and requires each route to supply exactly one `main#main-content`.
- Footer content is limited to `seanchoi.space` and the approved localized `footerPolicy` sentence.
- Do not add GitHub, LinkedIn, RSS, email, privacy-policy, copyright, or résumé links before their verified destinations/content exist.

### Required primitives

Implement semantic, typed presentational components for the future WP4/WP5 work:

- `PageIntro`: eyebrow optional, required title, optional summary, no embedded page-specific copy.
- `Tag`: text-only status/topic marker; not interactive.
- `ExternalLink`: HTTPS-only typed `href`, visible external indicator, localized screen-reader text, safe new-tab relationship.
- `EvidenceCard`: label, evidence level, source kind, optional inspectable external link.
- `ExperienceEntry`: organization, role, date label, summary, and optional contribution list.
- `ProjectCard`: title, summary, status, role, tags, and optional internal detail link; no fake repository/demo buttons.
- `ArticleCard`: title, summary, date, topics, and internal article link.
- `Figure`: semantic `figure`/`figcaption` wrapper around caller-provided media; do not invent images.
- `Prose`: semantic long-form wrapper with readable measure and styles for headings, paragraphs, lists, links, code, blockquotes, tables, and figures.

These are presentation/view-model components. Do not couple them directly to the canonical registry or fabricate data adapters in WP3. Components must not render publication-state internals or private evidence by default.

Use native elements and Next `Link`; do not add a component, icon, animation, or accessibility library.

## Design tokens and CSS behavior

Keep Tailwind 4's existing source isolation exactly:

```css
@import "tailwindcss" source(none);
@source "../";
```

Expand `src/app/globals.css` with semantic CSS custom properties and base/prose styles. The following palette is approved and must be represented through semantic tokens rather than hard-coded throughout components:

| Token role | Light | Dark |
| --- | --- | --- |
| canvas/background | `#f7f7f4` | `#101310` |
| surface | `#ffffff` | `#171b17` |
| primary text | `#1a1c19` | `#f0f3ee` |
| muted text | `#5f625c` | `#aab2a8` |
| border | `#d7dad3` | `#343a35` |
| accent | `#0b6b57` | `#7bdcb5` |
| text on accent | `#ffffff` | `#101310` |
| focus ring | accent | accent |

The approved pairs exceed WCAG AA normal-text contrast. Preserve that by never using borders or muted decorative colors as primary text.

Define tokens for:

- system sans and system mono font stacks;
- fluid display, heading, body, small, and code sizes;
- line heights and modest negative display tracking;
- spacing from `0.25rem` through `6rem` using a consistent scale;
- narrow prose measure around `68ch` and shell width around `72rem`;
- border width, small/medium radii (maximum `0.75rem`), and no large pill containers except compact tags;
- fast/base durations around 140/220ms and one restrained easing curve;
- focus outline at least 2px with at least 2px offset;
- minimum interactive target size of 44px where controls are isolated.

Responsive/accessibility behavior:

- usable without horizontal scrolling at 320 CSS pixels;
- visible keyboard focus on every link/control;
- skip link becomes visible on focus;
- no information conveyed by color alone;
- links in prose remain visibly distinguishable without hover;
- hover/focus transitions affect only color, border, background, or small underline offset;
- `prefers-reduced-motion: reduce` effectively removes nonessential transition/animation duration;
- automatic dark mode uses `prefers-color-scheme`; set the correct `color-scheme` and do not flash a scripted theme;
- do not use font sizes below `0.8125rem` for meaningful text.

## Preview-only component review page

Implement `/_review` inside the English route group. It must display:

- the complete color/type/spacing/focus token sample;
- header and language-switch states;
- every required UI primitive;
- light/dark behavior through the OS preference, not an in-page theme toggle;
- only unmistakable synthetic labels such as `Example Project`, `Example Organization`, and `Example Article`;
- English and Korean UI-label samples side by side.

Availability rule:

```text
enabled when NODE_ENV === "development" OR VERCEL_ENV === "preview"
not-found for all other environments, including VERCEL_ENV === "production"
```

Use `notFound()` at the route boundary. Do not link this page from the public header, footer, sitemap, or locale switch. Do not add environment variables or configuration files.

## Tests

Keep the Node-only Vitest environment and add behavior-focused tests without new packages:

1. Route/localization tests for all route pairs, fallbacks, normalization, and locale guards.
2. Dictionary completeness tests proving both locales implement the same nonblank keys.
3. Metadata tests for localized titles, self-canonicals, reciprocal alternates, and English `x-default`.
4. Server-rendered primitive tests using the existing React/ReactDOM packages where practical, asserting semantic elements and safe external-link attributes. Do not add jsdom or Testing Library in WP3.
5. A focused design-token test that reads `globals.css` and proves required semantic tokens, dark-mode media query, reduced-motion media query, and Tailwind source isolation remain present.

Do not weaken, rewrite, or remove the 43 WP2 tests.

## Authorized files

WP3 may:

- replace `src/app/layout.tsx` and `src/app/page.tsx` with the approved route tree;
- edit `src/app/globals.css`;
- add only the described route, `src/components`, `src/i18n`, and `src/lib/seo` files and focused tests;
- add small colocated types/helpers when required by those exact components.

Do not edit:

- `package.json`, `pnpm-lock.yaml`, `vitest.config.mts`, TypeScript/ESLint/PostCSS/Next configuration, or CI;
- `src/data/content.ts` or any `src/lib/content/**` file;
- `legacy-content/**`;
- `AGENTS.md`, the content contract, exploration report, implementation plan, or prior handoffs;
- root Git references or deployment settings.

If an implementation requirement appears to need a dependency or configuration change, stop and return the exact need to Codex.

## Required verification

Use Corepack pnpm `10.34.5` and report exact exit codes:

```text
corepack pnpm install --frozen-lockfile
corepack pnpm typecheck
corepack pnpm lint
corepack pnpm test
corepack pnpm content:check
corepack pnpm build
corepack pnpm check
```

Also verify and report:

- all expected English and Korean routes are statically prerendered;
- the rendered English and Korean roots contain `html[lang="en"]` and `html[lang="ko"]` respectively;
- every live header/nav link resolves locally with no broken placeholder destination;
- exact route-pair and fallback behavior;
- `/_review` renders in development/preview logic and returns not-found under production logic;
- keyboard order, skip link, visible focus, 320px reflow, and reduced-motion behavior through code/manual inspection;
- light and dark token contrast pairs and the absence of information conveyed by color alone;
- no runtime translation, automatic locale redirect, theme script, real claim, personal name form, contact/social URL, résumé link, synthetic production record, or legacy import was introduced;
- `package.json`, lockfile, configuration, CI, canonical registry, content validator, and all 39 archive files are unchanged;
- all existing 43 WP2 tests remain green;
- branch, HEAD, and checkpoint tag are unchanged;
- no commit, push, deployment, or production change occurred.

## Explicit exclusions

Do not:

- begin WP4 page information architecture beyond the minimal route-presence placeholders;
- add real or fixture career content to public routes;
- add a résumé file/link, About page, contact section, social link, image, icon package, font package, component library, i18n package, MDX, analytics, sitemap, robots, feed, structured data, middleware, database, API route, or client theme system;
- add a hamburger menu, modal, drawer, carousel, animation system, or decorative canvas;
- expose phone, address, work authorization, private evidence, or unverified identity data;
- commit, stage, push, deploy, change Git refs, or alter production.

## Acceptance condition

WP3 passes when the eight approved public routes statically render through correct English/Korean root documents; navigation and locale switching are deterministic and accessible; the design tokens and required semantic primitives implement the approved editorial/engineering grammar; the review page is unavailable in production; all tests and quality gates pass without warnings; and no factual, dependency, archive, or later-package scope is introduced.

## Copy/paste prompt for Gemini

> Implement only WP3 using `docs/gemini-handoffs/wp3-design-system-bilingual-shell.md` as the complete authoritative specification. Build the exact multi-root English/Korean route shell, source-controlled dictionaries and deterministic locale switch, localized metadata primitives, approved semantic design tokens, required presentation components, minimal safe route placeholders, and dev/preview-only `/_review` page. Add no dependencies and no real, synthetic-public, résumé, social, MDX, analytics, or WP4 content. Preserve all WP2 guards and archive files, use Corepack pnpm 10.34.5 for every required check, and return the complete verification report without staging, committing, pushing, deploying, or changing Git refs.

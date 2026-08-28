# Gemini Handoff — WP3A Shell Review Remediation

## Review verdict

WP3 is structurally sound but **not accepted or commit-ready yet**. Codex independently verified that `corepack pnpm check` passes with 72 tests, all eight intended public routes prerender, locale documents use the correct `lang`, and WP2 remains intact. Runtime/source review found six bounded acceptance gaps.

Implement only the corrections below. Preserve the approved visual direction, route architecture, dependencies, placeholder copy, content safeguards, and WP3 component boundaries. Do not begin WP4.

## Required reading

Read completely:

1. `AGENTS.md`
2. `docs/portfolio-v2-implementation-plan.md`
3. `docs/gemini-handoffs/wp3-design-system-bilingual-shell.md`
4. This handoff

## Finding 1 — `/_review` is not a route

`src/app/(en)/_review/page.tsx` returns 404 even during `next dev`. Next.js treats underscore-prefixed folders as private implementation folders and excludes them from routing.

Preserve the public path `/_review` by renaming the route segment directory from `_review` to `%5Freview`:

```text
src/app/(en)/_review/page.tsx       remove
src/app/(en)/%5Freview/page.tsx     add with the corrected review page
```

The encoded filesystem segment is the documented App Router mechanism for a URL segment beginning with an underscore. Preserve the existing environment gate:

```text
NODE_ENV === "development" OR VERCEL_ENV === "preview" -> render
all other environments -> notFound()
```

Do not rename the public URL, expose it in navigation, or add configuration.

## Finding 2 — Localized 404 components are bypassed

Requests to `/not-real` and `/ko/not-real` currently render Next's default rootless 404 rather than the supplied English and Korean `not-found.tsx` components. The responses contain no locale root document and no `main#main-content`.

Add one required catch-all page inside each locale root:

```text
src/app/(en)/[...not-found]/page.tsx
src/app/ko/[...not-found]/page.tsx
```

Each catch-all page must immediately call `notFound()` and contain no UI or metadata of its own. This must select the nearest locale-specific `not-found.tsx` while preserving HTTP status 404. Static routes and future more-specific routes retain priority over the catch-all.

Verify at runtime:

- `/not-real` -> status 404, `<html lang="en">`, English not-found title/body, one `main#main-content`;
- `/ko/not-real` -> status 404, `<html lang="ko">`, Korean not-found title/body, one `main#main-content`;
- normal English/Korean routes remain status 200.

Do not enable `globalNotFound`, add proxy/middleware, or change `next.config.ts`.

## Finding 3 — Route fallback exceeds the approved policy

WP3 specified special fallback only for future Blog detail routes; every other unmatched path must fall back to the target locale's home. `routing.ts` added an unauthorized Projects-detail fallback to the Projects index.

Remove the special `/projects/<slug>` and `/ko/projects/<slug>` branches. Update tests so:

```text
getAlternatePath("/projects/example", "ko")     -> "/ko"
getAlternatePath("/ko/projects/example", "en") -> "/"
```

Keep Blog-detail fallback unchanged. Do not decide future project-translation behavior before WP7.

## Finding 4 — The promised design-token system is incomplete

`globals.css` contains color, font-family, width, radius, and motion values, but does not define the required type scale, line-height scale, spacing scale, tracking, or border-width tokens. The review page claims a complete token review but displays only color swatches.

Add semantic tokens for exactly these roles:

- type: display, heading-1, heading-2, body, small, and code;
- line height: tight, body, and relaxed;
- tracking: display and label;
- spacing: a consistent scale from `0.25rem` through `6rem`;
- border width: default `1px`;
- retain the approved font stacks, measures, radii, durations, easing, palette, and focus values.

Use fluid `clamp()` sizing for display and heading-1. Do not create an ornamental or oversized hero scale.

Tokens must not be unused declarations. Apply them at minimum to:

- `PageIntro` title/summary;
- `Tag` label typography;
- `Prose` headings, paragraph text, and inline code;
- the title/body typography of the card/entry primitives.

Expand the review page with visible, labelled sections for:

- the complete type scale;
- representative spacing steps;
- border/radius samples;
- focus-visible behavior with a keyboard-focusable example;
- motion/reduced-motion policy text.

Update the token test to assert every required token family and the review-page test/structure where practical. Do not merely test the existing colors again.

## Finding 5 — Locale and interaction accessibility gaps

### Language navigation label

`LanguageSwitch` hard-codes `aria-label="Language selection"`, including on Korean pages. Use the current locale dictionary's existing `language` value instead. Do not add or alter dictionary strings.

### Target size

The header navigation and language-switch links currently have approximately text-height targets. Make interactive brand, primary-nav, and language-switch links at least 44 CSS pixels high using layout/padding that preserves the restrained header and two-row mobile behavior. The noninteractive current-language label should occupy the same visual height without being made clickable.

### Review-page heading order

The review page currently nests component `h2` headings beneath `h3` demonstration labels, producing a reversed outline. Add a narrowly typed `headingLevel?: 2 | 3` presentation prop to `ExperienceEntry`, `ProjectCard`, and `ArticleCard`, defaulting to `2`. Render them with level `3` on the review page so its hierarchy remains `h1 -> h2 section -> h3 sample/component`. Do not create a general polymorphic component framework.

Add/adjust tests for the localized language label, target-size class/style contract, and heading-level behavior.

## Finding 6 — `ExternalLink` does not enforce HTTPS

`ExternalLinkProps` declares `href: HttpsUrl | string`, which collapses the public API to unrestricted `string`; the component also renders the value without runtime validation. This contradicts the HTTPS-only boundary.

- Change the prop to `href: HttpsUrl` without the unrestricted union.
- Parse/validate the value through the existing `httpsUrlSchema` at the component boundary before rendering it.
- Change `EvidenceCard.url` to `HttpsUrl`.
- Keep `target="_blank"` and `rel="noopener noreferrer"`.
- Add tests proving valid HTTPS renders and `http:`, `javascript:`, relative, and malformed HTTPS values fail before markup is emitted.

Do not duplicate URL rules or add a new schema/dependency.

## Authorized files

- rename and edit the review route exactly as described;
- add the two locale catch-all pages;
- `src/app/globals.css`;
- `src/i18n/routing.ts` and `src/i18n/routing.test.ts`;
- `src/components/shell/site-header.tsx` only if target sizing requires it;
- `src/components/shell/primary-navigation.tsx`;
- `src/components/shell/language-switch.tsx`;
- `src/components/ui/page-intro.tsx`;
- `src/components/ui/tag.tsx`;
- `src/components/ui/external-link.tsx`;
- `src/components/ui/evidence-card.tsx`;
- `src/components/ui/experience-entry.tsx`;
- `src/components/ui/project-card.tsx`;
- `src/components/ui/article-card.tsx`;
- `src/components/ui/prose.tsx`;
- `src/components/ui/components.test.tsx`;
- `src/lib/styles/tokens.test.ts`.

No other file may change as part of WP3A. In particular, do not edit dependencies, lockfiles, configuration, CI, content schemas/validator/registry, dictionaries, metadata behavior, other routes, prior documents, or archive files.

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

Runtime verification must additionally demonstrate:

1. Development build/server:
   - `/_review` returns 200 and contains the component/token review heading;
   - the review page contains every required token/primitives section;
   - `/not-real` and `/ko/not-real` return localized 404 responses with correct `lang` and one main landmark.
2. Preview semantics (`VERCEL_ENV=preview`): `/_review` renders.
3. Production semantics (`VERCEL_ENV=production` or no preview value): `/_review` returns 404 through the English locale shell.
4. All eight intended public routes remain statically generated and status 200.
5. Korean rendered markup contains a Korean language-navigation accessible label, not `Language selection`.
6. Header links meet the 44px target contract at mobile and desktop; review-page heading order is valid.
7. Invalid external protocols fail the component-boundary tests.
8. Project detail locale fallback goes home; Blog detail fallback remains at Blog index.

Also confirm:

- all existing WP2/WP3 tests remain green and report the new total;
- `package.json`, `pnpm-lock.yaml`, `vitest.config.mts`, framework configuration, CI, canonical content, validator, and dictionaries are unchanged;
- all 39 archive files remain byte-identical;
- no real claims, identity data, résumé/social links, WP4 content, or dependency was added;
- branch, HEAD, and checkpoint tag are unchanged;
- no staging, commit, push, deployment, or production change occurred.

When starting `next dev`, Next 16 may append generated agent guidance to `AGENTS.md`. WP3A does not authorize that change: restore only any newly appended generated block before reporting final status, preserving the existing project-authored contents exactly.

## Explicit exclusions

Do not:

- change the public route list beyond making `/_review` work under its existing environment gate and adding locale catch-all handling;
- alter approved palette, copy, metadata, theme policy, component inventory, or locale prefixes;
- add Playwright, jsdom, Testing Library, an accessibility package, middleware/proxy, a new script, or any dependency;
- add real/synthetic-public content, résumé, contact, social, MDX, analytics, SEO expansion, or WP4 work;
- stage, commit, push, deploy, or change Git refs.

## Acceptance condition

WP3A passes when the review page is genuinely reachable only in development/preview, unknown routes render the correct localized 404 shell, locale fallback matches the approved policy, the declared design system has complete used tokens and a truthful review surface, locale/target/heading accessibility gaps are closed, HTTPS is enforced at the external-link boundary, and every existing quality/content/archive gate remains green. Passing WP3A closes WP3 and makes the accumulated WP1–WP3 foundation eligible for its first checkpoint commit.

## Copy/paste prompt for Gemini

> Implement only WP3A using `docs/gemini-handoffs/wp3a-shell-review-remediation.md` as the complete authoritative specification. Fix the encoded `/_review` route, add locale catch-all pages so English/Korean 404s actually render, remove the unauthorized Projects-detail locale fallback, complete and demonstrate the required design tokens, localize the language-control label, enforce 44px header targets and valid review-page heading order, and enforce HTTPS at the ExternalLink boundary. Add no dependencies or later-package content, preserve all existing guards and archive files, use Corepack pnpm 10.34.5 for every check, restore any Next-generated AGENTS.md addition, and return the complete verification report without staging, committing, pushing, deploying, or changing Git refs.

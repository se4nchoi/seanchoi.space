# Gemini Handoff — WP3D Global Bilingual Not-Found Simplification

## Architecture decision

WP3C does **not** pass. Independent production HTTP verification still returns Next's rootless default 404 for `/_review`, `/not-real`, and `/ko/not-real`, with no `lang`, main landmark, or project UI. The three transparent layouts did not change runtime behavior.

Stop extending the catch-all workaround. Next.js 16 documents `global-not-found.tsx` as the routing-level solution when an application has multiple root layouts and no single layout can compose the global 404. Adopt that supported boundary and simplify the tree.

Because `global-not-found.tsx` has no pathname/locale props and bypasses normal layouts, WP3's error-state policy is revised as follows:

- normal routes remain fully localized: English unprefixed and Korean under `/ko`;
- all unmatched URLs receive one deliberately bilingual global 404 document;
- the document language is English, the site's default;
- the Korean subsection carries `lang="ko"` explicitly;
- no proxy, request header, pathname inference, or client-side document-language mutation is permitted merely to personalize an exceptional route.

This is an explicit Codex architecture correction and supersedes the per-path localized-404 requirement in WP3/WP3A/WP3B/WP3C.

## Required reading

Read completely:

1. `AGENTS.md`
2. `docs/gemini-handoffs/wp3-design-system-bilingual-shell.md`
3. `docs/gemini-handoffs/wp3c-not-found-boundary-layouts.md`
4. This handoff

## Remove the failed workaround

Delete exactly these files/directories:

```text
src/app/(en)/[...not-found]/page.tsx
src/app/(en)/[...not-found]/layout.tsx
src/app/(en)/[...not-found]/not-found.tsx
src/app/ko/[...not-found]/page.tsx
src/app/ko/[...not-found]/layout.tsx
src/app/ko/[...not-found]/not-found.tsx
src/app/(en)/not-found.tsx
src/app/ko/not-found.tsx
src/app/(en)/%5Freview/layout.tsx
src/app/(en)/%5Freview/not-found.tsx
```

Keep `src/app/(en)/%5Freview/page.tsx` and its existing environment gate unchanged.

No catch-all route or locale-root not-found file should remain after this package. The runtime router, not a wildcard page, owns unmatched URLs.

## Enable the framework global boundary

Update `next.config.ts` only to add:

```ts
experimental: {
  globalNotFound: true,
}
```

Preserve every other config value exactly.

Create `src/app/global-not-found.tsx`. It must:

- import `src/app/globals.css` because global not-found bypasses normal layouts;
- export metadata with title `Page not found — seanchoi.space`;
- return a complete document containing `<html lang="en">` and `<body>`;
- include a visible English section using existing English dictionary values for `notFoundTitle` and `notFoundBody`;
- include a visible Korean section wrapped in an element with `lang="ko"`, using existing Korean dictionary values for the same keys;
- provide one home link to `/` labelled `Return home / 홈으로 돌아가기`;
- contain exactly one `main#main-content` and one `h1` (the English title); use `h2` for the Korean title;
- include the existing English skip-link label and target;
- use existing design tokens and restrained layout styles; no header, primary navigation, footer, language switch, image, icon, animation, or duplicated shell implementation;
- contain no pathname detection, browser API, client directive, request headers, cookies, locale redirect, or machine translation.

The bilingual presentation is intentional: the response is understandable from either market without claiming that an unmatched URL belongs to a locale whose route the framework did not resolve.

## Tests

Add or update one focused Node/server-rendered test without new dependencies. It must prove the global component emits:

- a full English document;
- exactly one main landmark and one `h1`;
- a Korean `lang="ko"` region with Korean not-found text;
- the combined home link to `/`;
- no header/nav/footer markup.

If importing global CSS prevents direct component rendering in Vitest, test the component source/contract narrowly rather than changing Vitest or adding a DOM package.

Do not alter the existing 76 tests except where removal of obsolete not-found files requires a focused update.

## Authorized files

- delete the ten failed-workaround files listed above;
- `next.config.ts`, only for `experimental.globalNotFound`;
- add `src/app/global-not-found.tsx`;
- add one focused colocated test or minimally extend an existing relevant test;
- `AGENTS.md` only if `next dev` re-adds its delimited generated block, and only to remove that block after verification.

No other file may change.

## Required verification

Use Corepack pnpm `10.34.5`:

```text
corepack pnpm typecheck
corepack pnpm lint
corepack pnpm test
corepack pnpm content:check
corepack pnpm build
corepack pnpm check
```

Run actual HTTP checks against both `next dev` and a freshly built `next start`. Record status, document language, main count, `h1`, Korean-region language/text, home-link href, and review-content presence.

Development:

```text
/                  -> 200, lang=en, normal English shell
/ko                -> 200, lang=ko, normal Korean shell
/_review           -> 200, lang=en, review content present
/not-real          -> 404, lang=en, one main, bilingual global 404
/ko/not-real       -> 404, lang=en, one main, bilingual global 404 with nested lang=ko region
```

Production:

```text
/                  -> 200, lang=en, normal English shell
/ko                -> 200, lang=ko, normal Korean shell
/_review           -> 404; prefer the bilingual global 404, but a framework-default 404 is acceptable for this intentionally private preview-only route if unmatched public URLs use the global boundary correctly
/not-real          -> 404, lang=en, one main, bilingual global 404
/ko/not-real       -> 404, lang=en, one main, bilingual global 404 with nested lang=ko region
```

The two unmatched public URL rows are mandatory. Stop and report failure if either receives the default Next 404.

After verification:

- stop every test server and confirm no selected-port listener remains;
- remove any generated Next block from `AGENTS.md`;
- confirm all eight public routes remain statically generated;
- confirm no catch-all route appears in the build route table;
- confirm WP2 content guards, 76+ tests, design tokens, HTTPS enforcement, locale switching, metadata, and all 39 archive hashes remain green/unchanged;
- confirm dependency, lockfile, CI, dictionary, schema, registry, and content files are unchanged;
- confirm branch, HEAD, and checkpoint tag are unchanged;
- do not stage, commit, push, deploy, or change production.

## Explicit exclusions

Do not:

- add proxy/middleware, pathname headers, cookies, client locale detection, redirects, or a dynamic root layout;
- duplicate the full site shell in the error document;
- alter normal-route language behavior or metadata;
- add dependencies, content, analytics, WP4 work, or other configuration;
- commit.

## Acceptance condition

WP3D passes when real development and production requests prove that all unmatched public URLs receive a styled, semantic bilingual global 404 with HTTP 404; the failed catch-all workaround is completely removed; normal localized routes and the dev review page remain correct; all existing quality/content/archive gates pass; and scope is exact. Passing WP3D closes WP3 and authorizes the checkpoint commit.

## Copy/paste prompt for Gemini

> Implement only WP3D using `docs/gemini-handoffs/wp3d-global-bilingual-not-found.md` as the complete authoritative specification. Remove the failed catch-all/local not-found workaround, enable Next 16's `globalNotFound`, and create one restrained bilingual full-document global 404 using the existing English/Korean dictionary values and design tokens. Add one focused test, change no other behavior or dependency, and prove unmatched English and `/ko/...` URLs through actual HTTP checks against both development and production servers. Stop all servers, remove any generated AGENTS block, run every existing quality/content/archive gate, and return the exact report without staging, committing, pushing, deploying, or changing Git refs.

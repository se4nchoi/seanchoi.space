# Gemini Handoff — WP3B Localized Not-Found and Token Adoption

## Review verdict

WP3A corrected the encoded review route, route-pair policy, language label, target sizing, heading-level API, HTTPS boundary, and token declarations. `corepack pnpm check` passes with 76 tests, and development `/_review` now returns 200.

WP3 is still **not accepted or commit-ready** because runtime verification disproved the reported localized 404 behavior:

```text
development /not-real       -> 404, no html[lang], no main landmark, default Next 404
development /ko/not-real    -> 404, no html[lang], no main landmark, default Next 404
production  /not-real       -> 404, no html[lang], no main landmark, default Next 404
production  /ko/not-real    -> 404, no html[lang], no main landmark, default Next 404
production  /_review        -> 404, no html[lang], no main landmark, default Next 404
```

The typography tokens are also declared but several required card/entry title and body styles still bypass them with Tailwind's `text-lg`, `text-sm`, `text-xs`, and a responsive `sm:text-lg` override.

Implement only the two corrections below. Do not revisit accepted WP3A behavior or begin WP4.

## Required reading

Read completely:

1. `AGENTS.md`
2. `docs/gemini-handoffs/wp3-design-system-bilingual-shell.md`
3. `docs/gemini-handoffs/wp3a-shell-review-remediation.md`
4. This handoff

## Finding 1 — Put not-found boundaries in the throwing segments

The locale-root `not-found.tsx` files are not selected when `notFound()` is thrown by the catch-all pages under this multiple-root-layout architecture. Add a local `not-found.tsx` beside each page that intentionally throws:

```text
src/app/(en)/[...not-found]/not-found.tsx
src/app/ko/[...not-found]/not-found.tsx
src/app/(en)/%5Freview/not-found.tsx
```

Each new file must reuse/re-export the existing locale-specific not-found component rather than duplicate its markup or copy. The two catch-all pages must continue to call `notFound()` immediately. The review page must retain its existing environment gate.

Required behavior:

- `/not-real` -> HTTP 404 inside the English root layout, `html[lang="en"]`, one `main#main-content`, English not-found title/body and home link;
- `/ko/not-real` -> HTTP 404 inside the Korean root layout, `html[lang="ko"]`, one `main#main-content`, Korean not-found title/body and home link;
- production `/_review` -> HTTP 404 inside the English root layout with the same English not-found UI;
- development and preview `/_review` -> HTTP 200 with the component/token review page;
- all eight intended public routes remain HTTP 200.

Do not add `global-not-found.tsx`, `globalNotFound`, proxy/middleware, headers, pathname inference, client-side document-language mutation, or configuration changes. Segment-local boundaries are the approved solution.

## Finding 2 — Adopt the type tokens at the required component boundaries

Use the existing tokens instead of parallel Tailwind font-size values in:

- `PageIntro` title and summary;
- `EvidenceCard` label and link row;
- `ExperienceEntry` title, organization metadata, date, summary, and contributions;
- `ProjectCard` title, role, summary, and tags through the existing `Tag` component;
- `ArticleCard` title, date, summary, and topics through `Tag`.

Exact roles:

- card/entry titles: `--text-heading-3`;
- normal summaries: `--text-body`;
- organization, role, date, contribution, evidence, and other compact metadata: `--text-small`;
- PageIntro title: `--text-heading-1`;
- PageIntro summary: `--text-body` at every breakpoint; remove `sm:text-lg` so it cannot override the token;
- tags retain `--text-small`.

Keep the current line-height and tracking tokens. Do not change token values, component copy, spacing/layout, palette, or component APIs.

In the review page, change the synthetic Prose sample's nested heading from `h2` to `h3` and update its sample label accordingly so the review document never rises from an `h3` specimen label back to `h2` inside the same section.

Extend focused tests to assert token classes are present on the required rendered components and that the review sample no longer contains the nested `h2` text. Avoid brittle full-markup snapshots.

## Authorized files

- add the three segment-local `not-found.tsx` files listed above;
- `src/components/ui/page-intro.tsx`;
- `src/components/ui/evidence-card.tsx`;
- `src/components/ui/experience-entry.tsx`;
- `src/components/ui/project-card.tsx`;
- `src/components/ui/article-card.tsx`;
- `src/components/ui/components.test.tsx`;
- `src/app/(en)/%5Freview/page.tsx`;
- `src/lib/styles/tokens.test.ts` only if needed for the review-source assertion.

No other file may change. Do not edit catch-all pages, locale-root not-found components, dictionaries, routing, schemas, CSS token values, dependencies, lockfiles, configuration, CI, metadata, canonical content, prior documents, or archive files.

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

Then run real HTTP verification against both `next dev` and `next start`, reporting for each tested URL: status, document `lang`, `main` count, visible `h1`, and relevant link target.

Development verification:

```text
/                  200, en
/ko                200, ko
/_review           200, en, review content present
/not-real          404, en, localized English UI
/ko/not-real       404, ko, localized Korean UI
```

Production verification after a production build:

```text
/                  200, en
/ko                200, ko
/_review           404, en, localized English UI, review content absent
/not-real          404, en, localized English UI
/ko/not-real       404, ko, localized Korean UI
```

Do not report localized 404 success from file inspection alone. Capture the actual HTTP/rendered results.

Also confirm:

- all eight intended public routes remain statically generated;
- development/preview review behavior remains intact;
- the external-link, locale fallback, localized language label, 44px target, and all WP2 guards remain unchanged and green;
- card/entry markup uses the approved typography tokens rather than parallel font-size utilities;
- dependencies, lockfiles, configuration, CI, dictionaries, schemas, registry, and all 39 archive files are unchanged;
- branch, HEAD, and checkpoint tag are unchanged;
- no staging, commit, push, deployment, or production change occurred.

Starting `next dev` may append a generated Next block to `AGENTS.md`. Remove only that generated block before final status and preserve the project-authored file exactly.

## Explicit exclusions

Do not:

- add or enable global not-found behavior, middleware/proxy, request headers, or client-side locale detection;
- change route or locale policy;
- alter token values or redesign components;
- add dependencies, scripts, real content, résumé/social/contact data, WP4 pages, MDX, analytics, or SEO expansion;
- stage, commit, push, deploy, or change Git refs.

## Acceptance condition

WP3B passes only when actual development and production HTTP responses prove that localized 404s render inside the correct locale root documents, production `/_review` uses the English localized 404 while development/preview renders the review page, required presentation components consume the approved type tokens, every quality/content/archive gate remains green, and scope is exact. Passing WP3B closes WP3 and authorizes a separate checkpoint-commit handoff.

## Copy/paste prompt for Gemini

> Implement only WP3B using `docs/gemini-handoffs/wp3b-localized-not-found-and-token-adoption.md` as the complete authoritative specification. Add segment-local not-found boundaries beside the two catch-all pages and the encoded review route, reusing the existing localized not-found components; adopt the existing typography tokens throughout the required card/entry boundaries; and correct the remaining review-page heading reversal. Prove the exact localized 404 and review-route behavior through actual HTTP checks against both `next dev` and `next start`. Add no dependencies, configuration, content, or later-package work; restore any Next-generated AGENTS.md block; and return the complete report without staging, committing, pushing, deploying, or changing Git refs.

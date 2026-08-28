# Gemini Handoff — WP3C Not-Found Boundary Layouts

## Review verdict

WP3B's typography-token adoption is accepted, and `corepack pnpm check` passes with 76 tests. WP3 remains **not accepted** because independent production HTTP verification again contradicts the report:

```text
production /_review        -> 404, no html[lang], no main, default Next 404
production /not-real       -> 404, no html[lang], no main, default Next 404
production /ko/not-real    -> 404, no html[lang], no main, default Next 404
```

Adding a segment-local `not-found.tsx` alone did not install a boundary. Under this multiple-root-layout/catch-all structure, each throwing segment also needs its own nested layout. The generated Next agent-rules block is also still present in `AGENTS.md`, despite the WP3B report stating it was removed.

Implement only the two mechanical corrections below. Do not touch already accepted WP3 behavior.

## Required reading

Read completely:

1. `AGENTS.md`
2. `docs/gemini-handoffs/wp3b-localized-not-found-and-token-adoption.md`
3. This handoff

## Correction 1 — Install segment-local boundaries with nested layouts

Add exactly:

```text
src/app/(en)/[...not-found]/layout.tsx
src/app/ko/[...not-found]/layout.tsx
src/app/(en)/%5Freview/layout.tsx
```

Each layout is a transparent Server Component that accepts `children: React.ReactNode` and returns only those children in a fragment. It must add no element, class, metadata, provider, client directive, or behavior. Its sole purpose is to establish the nested segment boundary so the sibling `not-found.tsx` can catch the existing `notFound()` call.

Do not change:

- either catch-all `page.tsx`;
- any of the three segment-local `not-found.tsx` re-exports;
- either locale-root layout or locale-root not-found component;
- the encoded review page or its environment gate.

## Correction 2 — Remove the generated Next block

Remove exactly the block between and including:

```text
<!-- BEGIN:nextjs-agent-rules -->
...
<!-- END:nextjs-agent-rules -->
```

from `AGENTS.md`. Preserve every project-authored byte outside that generated block. If runtime verification re-adds it, remove it again after the final server is stopped.

Do not change `next.config.ts` or disable `agentRules`; this checkpoint should preserve the approved configuration.

## Authorized files

- add the three `layout.tsx` files listed above;
- `AGENTS.md`, only to remove the generated delimited block.

No other file may change in WP3C.

## Required verification

Run with Corepack pnpm `10.34.5` and report exact exit codes:

```text
corepack pnpm typecheck
corepack pnpm lint
corepack pnpm test
corepack pnpm content:check
corepack pnpm build
corepack pnpm check
```

Then run actual HTTP checks against both `next dev` and the freshly built `next start`. Use an available explicit port, record the process, and stop it after each matrix.

Development matrix:

```text
/                  -> 200, lang=en, one main, Portfolio preview
/ko                -> 200, lang=ko, one main, 포트폴리오 미리보기
/_review           -> 200, lang=en, one main, review content present
/not-real          -> 404, lang=en, one main, Page not found, home href=/
/ko/not-real       -> 404, lang=ko, one main, 페이지를 찾을 수 없습니다, home href=/ko
```

Production matrix:

```text
/                  -> 200, lang=en, one main, Portfolio preview
/ko                -> 200, lang=ko, one main, 포트폴리오 미리보기
/_review           -> 404, lang=en, one main, Page not found, review content absent
/not-real          -> 404, lang=en, one main, Page not found, home href=/
/ko/not-real       -> 404, lang=ko, one main, 페이지를 찾을 수 없습니다, home href=/ko
```

For every row, record real response status and parsed rendered HTML values. Do not infer success from source files or terminal route compilation. If any 404 row lacks `lang` or `main`, stop and report failure rather than claiming WP3 complete.

After stopping the final server, confirm:

- no process from verification still listens on its selected ports;
- `AGENTS.md` contains neither generated marker;
- only the three new layouts and the exact generated-block removal differ from pre-WP3C state;
- all 76 tests, token adoption, locale fallback, HTTPS enforcement, language labels, 44px targets, canonical registry, and 39 archive hashes remain unchanged/green;
- dependencies, lockfiles, configuration, CI, dictionaries, schemas, metadata, and content remain unchanged;
- branch, HEAD, and checkpoint tag remain unchanged;
- no staging, commit, push, deployment, or production change occurred.

## Explicit exclusions

Do not:

- add `global-not-found`, `globalNotFound`, middleware/proxy, headers, redirects, client-side language mutation, or new routing behavior;
- change any component, CSS, token, test expectation, dependency, script, or prior WP3 file other than the four authorized file paths;
- begin WP4, add content, or commit.

## Acceptance condition

WP3C passes only when real development and production HTTP matrices exactly match the required localized responses, the three transparent nested layouts are the only application additions, the generated AGENTS block is absent after servers stop, and every existing check remains green. Passing WP3C closes WP3 and authorizes the checkpoint commit.

## Copy/paste prompt for Gemini

> Implement only WP3C using `docs/gemini-handoffs/wp3c-not-found-boundary-layouts.md` as the complete authoritative specification. Add exactly three transparent nested `layout.tsx` files beside the existing catch-all/review pages so their segment-local not-found boundaries are installed, and remove only the delimited Next-generated block from `AGENTS.md`. Change no other file. Prove every required development and production row using actual HTTP response status and rendered HTML, stop all verification servers, run the full existing quality gates with Corepack pnpm 10.34.5, and return the exact report without staging, committing, pushing, deploying, or changing Git refs.

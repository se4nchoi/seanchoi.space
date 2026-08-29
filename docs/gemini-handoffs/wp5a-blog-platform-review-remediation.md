# Portfolio v2 — WP5A blog-platform review remediation

## Review verdict

WP5 is **not accepted**. The implementation compiles and its current aggregate check passes, but the checks do not prove the approved behavior. This remediation is bounded to defects found in Codex review; do not expand WP5 or rewrite accepted WP1–WP4 behavior.

The working tree already contains the WP5 implementation and Codex planning documents. Preserve all of it unless this handoff explicitly requires correction. Do not commit, push, deploy, tag, switch/create branches, or alter domains.

Read the original WP5 handoff and inventory again before editing. This remediation supersedes only the conflicting details identified below.

## Independent evidence

Codex independently ran `pnpm check` on 2026-08-29. TypeScript, ESLint, 127 tests, the content check, and the Next production build passed. However:

- `git diff --check` fails in twelve WP5-edited files because PowerShell writes introduced CRLF/trailing-whitespace churn.
- The table of contents generates duplicate-safe IDs, but rendered headings independently call plain slugification, so repeated headings render duplicate IDs and later TOC links target the wrong element.
- translation lookup accepts reciprocal, one-way, or reverse one-way matches, rather than the accepted exact relationship.
- article metadata points an unavailable language alternate at the other locale's blog index, incorrectly describing an index as a translated article.
- MDX images silently default dimensions and empty alt text and do not prove that their paths are declared by the article.
- article discovery validates each frontmatter record in isolation but does not reject duplicate IDs/slugs, incomplete registry coverage, invalid translation topology, missing assets, or prohibited MDX constructs.
- the only authoring-safety test calls the `h1` component directly; it does not test article source rejection for imports, exports, client directives, unsafe HTML/JSX, event handlers, remote images, or undeclared components.
- Vitest uses a handwritten line-based MDX substitute that discards much of real MDX behavior. Passing those tests does not verify the compiler used by Next.
- Atom entries omit explicit locale, use a non-absolute record ID, and do not share the complete publication predicate used by article routes.
- the report claimed `git diff --check` cleanliness and authoring/asset coverage that the implementation does not provide.

## Non-negotiable boundaries

- Add no dependency. Keep exactly the six WP5 additions already approved.
- Do not migrate or copy legacy articles/assets.
- Keep the launch state at zero public articles.
- Keep all five historical URLs retired with no redirect.
- Preserve the accepted WP4 preview gate: development or `VERCEL_ENV=preview` only.
- Do not weaken any existing test or publication rule.
- Use LF with no BOM for every touched text file.
- Remove no accepted feature merely to make remediation easier.

## 1. Restore diff hygiene

Normalize only WP5-touched text files that contain CRLF or trailing whitespace. Do not perform a repository-wide rewrite. Remove any temporary `.orig`, walkthrough, HTTP-check, or patch-probe file produced by implementation tooling.

Acceptance: `git diff --check` exits 0.

## 2. Remove the fake Vitest MDX compiler

Delete the handwritten `transformMdxToJsx` implementation and the custom MDX transform plugin from `vitest.config.mts`. Restore the small accepted Vitest configuration unless a non-MDX setting is demonstrably required.

Do not replace it with another home-grown Markdown/MDX renderer and do not add a package.

Change the static blog module registry to use explicit, statically analyzable loader functions rather than top-level MDX component imports, for example one source-controlled `() => import(...)` loader per article. Metadata/integrity tests must inspect the registry without loading an MDX module. Article rendering may await the selected loader. The real Next production build remains the compiler integration check.

Tests may render prose primitives with ordinary React children and test source-validation functions with string fixtures. They must not pretend to compile MDX.

## 3. Establish one article integrity pipeline

Create one server-only validation path used by the direct production-content guard and consumed before route generation, feed generation, and sitemap generation. It must parse every sorted `content/blog/*.mdx` file, validate frontmatter with `articleRecordSchema`, inspect the MDX source, verify the explicit module registry, and return validated article records only after all cross-file checks pass.

Reject with clear, testable issues:

- duplicate article IDs;
- duplicate locale/slug pairs;
- duplicate source paths or multiple files mapped to one registry entry;
- a file without exactly one matching registry entry or a registry entry without exactly one file;
- duplicate normalized topics within one article;
- `updatedOn` before `publishedOn`;
- a public future publication date;
- a public record that is not verified, reviewed, and non-synthetic;
- invalid translation relationships;
- undeclared/missing assets or invalid figure intent;
- prohibited MDX authoring constructs.

Use a shared `isPublishableArticle` predicate for indexes, detail routes, related content, feed, and sitemap. It must require `publicationStatus === "public"`, `claimState === "verified"`, `syntheticPlaceholder === false`, a review date, and a non-future publication date. A retired record is never previewable or publishable.

The launch guard must still prove zero public production articles, but structure validation must remain capable of accepting a valid reviewed public test fixture so a later content package does not require redesigning the platform.

## 4. Preserve the accepted WP2 translation model

The original WP5 handoff's word “reciprocal” conflicts with the accepted WP2 relationship already used by project/article fixtures. Preserve the existing one-way source model:

- the source-language record has no `translationOf`;
- the translated record points to the source record ID;
- source and translation have opposite locales;
- at most one translated record may target a source for a given locale;
- a translated record may not be the source of another translation;
- counterpart lookup is exact in both directions: source → the one record targeting it; translation → its declared source.

Update the MDX Example Article pair to match the accepted model: English is the source with no `translationOf`; Korean points to the English ID. Do not accept arbitrary one-sided/reverse matches beyond this exact topology.

Add negative tests for same-locale, missing source, chained translation, duplicate translations, and unrelated records.

## 5. Make rendered heading IDs match the TOC

Use one duplicate-aware heading-ID generator per article render, shared across rendered `h2` and `h3` in document order. The rendered IDs must exactly equal the IDs extracted for the table of contents, including numeric suffixes.

Do not use module-global mutable counters. Create a fresh MDX component mapping for each article render. Keep the article page as the sole `h1`.

Add a test that renders or directly exercises a sequence containing repeated `h2`/`h3` text and proves the DOM IDs and TOC targets are identical and unique.

## 6. Enforce a deliberately small MDX source contract

Without adding a parser dependency, implement a conservative source validator that ignores fenced-code contents and rejects anything it cannot safely classify. At minimum reject:

- Markdown or JSX body `h1`;
- ESM `import` or `export`;
- `use client`;
- `script`, `iframe`, `object`, `embed`, `form`, and `style`;
- event-handler or `dangerouslySetInnerHTML` props;
- undeclared custom component names;
- remote/insecure images;
- unsafe link schemes such as `javascript:`, `data:`, or arbitrary protocols.

Allow only the documented Markdown surface plus `Callout` and a single explicit `Figure` component. Reject raw JSX elements other than those two. Standard Markdown image syntax and raw `img` are disallowed because they cannot express the required dimensions and decorative intent.

Internal links must begin with `/` or `#`. External article links must be valid HTTPS URLs. Update `MdxLink` so an unsafe value cannot silently fall through to `next/link`.

Add source-string tests for every allowed and rejected class. The Next production build must compile both Example Article fixtures using the real MDX pipeline.

## 7. Make figures contract-driven

Replace permissive image defaults with the explicit `Figure` authoring contract:

- `src`: local absolute public path;
- positive finite integer `width` and `height`: required;
- either nonblank purposeful `alt`, or `decorative={true}` with empty alt;
- optional caption;
- no remote or relative path.

The source validator must prove each Figure path appears exactly in that article's `assetPaths`; every declared asset must exist under `public/`; and unused declared paths must fail to prevent stale declarations. Keep both Example Article fixtures asset-free.

Do not copy any legacy image.

## 8. Correct language switching and metadata alternates

Create a client-safe, pure-data article route-pair manifest derived manually alongside the explicit module registry. It must not import `fs`, server modules, or MDX. Integrity tests must prove it matches validated translation relationships. Use it in `getAlternatePath` so a translated article switches to its exact counterpart; a single-language article falls back to the other locale's `/blog` index.

Keep the visible missing-translation notice and localize all of its link text through the dictionary; remove hardcoded English/Korean strings from `BlogArticleView`.

Metadata is stricter than navigation fallback:

- self-canonical always;
- emit an alternate article locale only when a valid public counterpart exists;
- never advertise `/blog` or `/ko/blog` as an article translation;
- use a valid `x-default` without inventing equivalence.

Extend `createPageMetadata` so article pages can intentionally omit a language alternate while existing core pages retain accepted automatic pairs. Add metadata tests for translated and single-language articles.

Make default `Callout` labels locale-aware through reviewed dictionary strings, or require an explicit localized title. Korean article output must not expose an English default label.

## 9. Correct Atom semantics and shared publication filtering

Use `isPublishableArticle` before producing feed entries. Each Atom entry must include:

- an absolute stable entry ID, using its canonical article URL;
- escaped absolute `href`;
- title, summary, publication/update timestamps;
- explicit locale, such as `xml:lang`;
- escaped topic categories.

The empty launch feed remains valid with zero entries. Add tests proving invalid public-looking records (unreviewed, pending, synthetic, or future-dated) are excluded or rejected by the integrity pipeline rather than emitted.

Sitemap and related-content selection must use the same publishable-record predicate.

## 10. Tests and verification

Replace count-oriented claims with behavior tests covering all remediation requirements. In particular, add explicit failures for duplicate files/IDs/slugs/topics, registry mismatch, translation topology, all prohibited MDX constructs, link schemes, figure declaration/existence/intent, rendered duplicate heading IDs, single-language metadata alternates, and Atom locale/absolute IDs.

Run and report exact results for:

1. `git diff --check`;
2. `pnpm typecheck`;
3. `pnpm lint`;
4. `pnpm test`;
5. `pnpm content:check`;
6. `pnpm build`;
7. real production-server HTTP checks for both blog indexes, feed, sitemap, both Example Article paths, and all five historical slugs;
8. preview/development HTTP checks proving both Example Article locales render real MDX, matching TOC anchors, localized callout treatment, and no production leakage.

Do not claim accessibility or authoring coverage without a test or direct rendered-output check demonstrating it.

## Required return report

Return every changed file, exact command results, behavior changes, assumptions, risks, and an acceptance matrix. Explicitly confirm:

- no new dependency;
- no legacy content/asset migration;
- no commit/push/deploy/branch operation;
- `git diff --check` passes;
- Vitest no longer contains a fake MDX compiler;
- zero public launch articles remain;
- all five historical slugs still return non-leaking 404s.

WP5 remains unaccepted until Codex independently reviews this remediation.

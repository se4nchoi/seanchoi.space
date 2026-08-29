# Portfolio v2 — WP5B final review corrections

## Verdict

WP5 remains unaccepted. Preserve the current working tree and implement only the corrections below. Add no dependency. Do not commit, push, deploy, tag, change branches, migrate legacy content/assets, or begin WP6–WP9.

## 1. Remove invented identity and positioning

The content contract says the public English display name is pending and the Korean name has not been supplied.

- Remove the invented Korean name 최현우 immediately.
- Pass each article title unchanged; do not append Sean Choi, a Korean name, or any person name.
- Missing article routes return empty metadata as before.
- Atom title: seanchoi.space — Blog.
- Atom subtitle: Reviewed writing published on seanchoi.space.
- If Atom needs an author name, use seanchoi.space, not a person.
- Remove claims about systems architecture, web platforms, engineering leadership, verified notes, or other unsupported topics.

Add a source/output guard for the invented name and unsupported feed copy. Do not add any Korean personal name.

## 2. Revert out-of-scope metadata expansion

WP5 authorized article alternates and Atom discovery only.

- Restore SITE_URL as the constant https://seanchoi.space. Remove the NEXT_PUBLIC_SITE_URL override.
- Remove the newly added global Open Graph, Twitter, and explicit robots-index output.
- Retain canonical/language alternates and Atom discovery.
- Keep automatic bilingual alternates for core routes.
- Keep single-language article support that omits an unavailable article locale.
- Do not resolve the bare-versus-www host question in WP5.

Preview routes must not become explicitly indexable because of WP5.

## 3. Fail closed and remain deterministic

Sitemap:

- Remove the catch that silently falls back to core routes when validation fails.
- Let integrity failures fail sitemap generation and the production build.
- Use 2026-08-29T00:00:00Z as deterministic core lastModified.
- Keep article updatedOn or publishedOn for article entries.

Atom:

- Use 2026-08-29T00:00:00Z as the deterministic default updated value for an empty feed.
- Permit injected time only for tests.
- XML-escape canonical URLs.

Add tests proving validation errors are not swallowed.

## 4. Enforce preview boundaries

Retired articles are never previewable.

- Preview index selection excludes retired records.
- Preview detail lookup returns null for retired records.
- Preview related-content excludes retired records.
- Production continues using the full shared publication predicate.
- Add tests for all three cases.
- Do not use NEXT_PUBLIC_SKELETON_PREVIEW. The only gates remain development NODE_ENV or VERCEL_ENV=preview.

## 5. Make asset existence the pipeline default

Move public-asset discovery into a shared server-only helper. When validateBlogPipeline is called without an injected asset set, it must discover and validate against public/ automatically. Tests may inject a set. Routes, feed, sitemap, and the direct content guard must all receive the same full validation by default.

## 6. Finish the conservative MDX contract

Reject every raw HTML/JSX tag except Callout and Figure, including div, span, and a. Markdown links are the supported link form.

Use exact prop allowlists and reject unknown props, prop spreads, and arbitrary expressions.

Callout permits only type and optional string title. Type is note, warning, info, or tip.

Figure permits only src, width, height, alt, decorative, and optional string caption.

- Width and height are positive integers; zero fails.
- Decorative means decorative={true} and omitted/empty alt.
- Reject decorative plus nonblank alt.
- Nondecorative figures require nonblank alt.
- Asset paths start with exactly one slash, contain no backslash or traversal, and satisfy the existing asset-path rules.
- Reject protocol-relative paths.
- Reject duplicate declared assets and duplicate Figure references.
- Require balanced triple-backtick fences.
- Require plain-text h2/h3 headings so rendered IDs and TOC IDs cannot diverge.

Validate HTTPS links with full URL parsing, not startsWith. MdxLink applies the same validation before casting. Invalid values never become links.

Add negative tests for lowercase raw tags, invalid/unknown props, spread/expression props, zero dimensions, protocol-relative paths, decorative-alt conflicts, duplicate assets, unclosed fences, formatted/link headings, and malformed HTTPS.

## 7. Add real cross-file failure tests

Refactor cross-record integrity into a pure function over parsed article descriptors and registry descriptors. Keep filesystem reading in the wrapper.

Use virtual fixtures to prove failures for:

- duplicate ID;
- duplicate locale/slug;
- duplicate normalized topic;
- missing or orphan registry entry;
- registry path mismatch or incorrect one-to-one mapping;
- missing translation source;
- same-locale translation;
- chained translation;
- duplicate target locale;
- public records that are pending, synthetic, unreviewed, or future-dated.

Do not mutate production MDX during tests.

## 8. Verify the actual historical URLs

The previous report tested unrelated paths. Verify exactly:

- /blog/retrospect-hoek-agency
- /blog/retrospect-emg-global
- /blog/vimium-keyboard-lover-s-bestfriend-on-the-web
- /blog/how-to-use-notion-as-your-blog-post-database
- /blog/how-to-persist-images-on-notion-pages-made-from-notion-to-md

For each, prove production HTTP 404, no redirect, and no legacy or Example Article title/body/metadata leakage.

## Verification

Run and report:

1. git diff --check
2. pnpm typecheck
3. pnpm lint
4. pnpm test
5. pnpm content:check
6. pnpm build
7. production HTTP checks for both indexes, feed, sitemap, both Example Article paths, and the five exact historical paths
8. development and VERCEL_ENV=preview checks for both Example Article routes using only the accepted gate

Confirm no new dependency, no legacy migration, no temporary files, no invented identity, no swallowed validation error, zero public launch articles, and no Git/deployment operation.

WP5 remains unaccepted until Codex independently reviews these corrections.

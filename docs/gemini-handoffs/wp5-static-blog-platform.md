# Portfolio v2 — WP5 static blog platform handoff

## Gate status and authority

WP1–WP4 are accepted; WP4 is checkpointed at `544e6ce` on `v2`. Sean approved the WP5 launch policy on 2026-08-29: portfolio v2 launches with a complete blog platform and **zero public articles**. The five v1 articles remain untrusted draft-source ideas under `legacy-content/`; none is revised or published in WP5.

Implement only WP5. This handoff is the product, route, architecture, content-state, dependency, historical-URL, and acceptance authority for this package. It does not authorize WP6 career content/résumé work, WP7 project selection, WP8 analytics or full SEO work, WP9 cutover, or future RAG/chatbot features.

## Required reading

Read completely before editing:

1. `AGENTS.md`
2. `docs/portfolio-v2-exploration-report.md`
3. `docs/portfolio-v2-implementation-plan.md`
4. `docs/portfolio-content-contract.md`
5. `docs/portfolio-v2-wp5-content-inventory.md`
6. the WP2 schema handoffs and current schema/integrity implementation
7. the WP3 shell/localization handoffs and current dictionaries/route helpers
8. the WP4 handoff and current representative routes
9. this handoff

Inspect branch, HEAD, status, and diff before editing. Preserve every pre-existing change. Do not commit, push, deploy, tag, switch/create branches, or alter domains.

If an implementation decision below is missing or conflicts with current accepted behavior, stop and return it to Codex. Do not choose a new product, architecture, schema, dependency, factual, localization, redirect, or visual policy.

## Objective

Replace the WP4 synthetic article-page mechanism with a production-capable, static-first local-MDX blog platform while keeping launch publication empty.

Deliver:

- validated locale-specific MDX under `content/blog/`;
- build-time article discovery and rendering;
- English and Korean index/detail route support;
- safe server-rendered prose components;
- deterministic headings and table of contents;
- publication, translation, asset, and authoring guards;
- same-locale related-content logic;
- restrained static topic discovery;
- a static Atom feed at `/feed.xml`;
- sitemap integration;
- an explicit historical-route retirement manifest;
- tests proving zero article/content/metadata leakage at launch.

Do not migrate or copy any legacy article or image.

## Dependency decision

Do not use `next-mdx-remote`; its repository was archived in April 2026 and the v1 runtime pattern is retired. Use the official Next.js MDX integration, without the experimental Rust MDX compiler.

The only approved direct additions are:

- production: `@next/mdx@16.3.3`
- production: `@mdx-js/loader@3.1.1`
- production: `@mdx-js/react@3.1.1`
- production: `gray-matter@4.0.3`
- production: `remark-frontmatter@5.0.0`
- development: `@types/mdx@2.0.14`

Sean explicitly approved installation of these six exact versions on 2026-08-29. Update `package.json` and the single `pnpm-lock.yaml` only for this approved set; do not upgrade existing packages or add anything else.

Do not add GFM, syntax highlighting, Tailwind Typography, Sandpack, YAML/glob packages, a database client, or any other dependency. Standard Markdown/code blocks and the accepted design tokens are sufficient.

## Content model

Use one `.mdx` file per locale-specific article under `content/blog/`. Narrative belongs in the MDX body. Publishable article metadata belongs in that file's YAML frontmatter.

- Parse frontmatter with `gray-matter`.
- Validate it through the existing Zod content layer.
- Configure `@next/mdx` with `remark-frontmatter` so frontmatter is recognized and omitted from rendered output.
- Rendering and metadata loading must consume the same file.
- Keep factual structured records separate from narrative MDX in accordance with the existing schema boundary.

Extend the existing `ArticleRecord`; do not create a competing article model. Preserve and enforce its stable ID, publication status, claim state, synthetic flag, review date, slug, locale, translation relationship, title, summary, dates, topics, source, optional legacy slug, and asset declarations.

Reject:

- duplicate IDs, locale/slug pairs, or source paths;
- impossible/future dates or `updatedOn` before `publishedOn`;
- public records that are unverified, unreviewed, synthetic, or pending;
- invalid or nonreciprocal translation relationships;
- missing/undeclared assets;
- production draft/synthetic leakage.

Use a small explicit static module registry in source control; do not use an unconstrained dynamic import or add a generator. Integrity tests must prove every production MDX file has exactly one registry entry, every entry has exactly one file, and registry IDs equal validated frontmatter IDs.

## Fixture and launch state

Create only the minimum non-public MDX fixture needed to prove parsing and rendering. It must be unmistakably named `Example Article`, remain draft/pending/synthetic, and be excluded from production static params, metadata, indexes, sitemap, feed, and related content.

If a public record is needed for a test, place it under test fixtures outside `content/blog/`. Never weaken the publication guard.

At ordinary production launch:

- `/blog` and `/ko/blog` render a localized empty state;
- no article detail path is generated;
- `/feed.xml` is valid but has zero entries;
- the sitemap includes both blog indexes but no article URL;
- no legacy or Example Article title, summary, body, topic, filename, or asset path appears in public HTML or metadata.

Preview/development may render the explicit Example Article using the accepted WP4 preview gate. Ordinary production must not.

## MDX authoring surface

Constrain local MDX to:

- Markdown paragraphs, lists, emphasis, quotations, links, fenced code, and `h2`–`h4`;
- approved server-rendered mappings for headings, links, `pre`, `code`, figure/image, and `Callout`;
- local declared images only.

Reject article imports, arbitrary exports, `use client`, undeclared custom components, body-level `h1`, remote images, scripts, iframes, objects, embeds, forms, styles, and event-handler markup.

Article pages own the sole `h1`. Generate deterministic duplicate-safe IDs for `h2` and `h3`, using stable numeric suffixes for repeated headings. Build the table of contents in source order without client JavaScript.

External links receive safe `rel` behavior and an accessible external-link indication. Internal link text must be descriptive. Code blocks are semantic, horizontally scrollable, color-scheme readable, zoom/reflow safe, and never executed.

Figures require local `src`, dimensions, and either purposeful alt text or explicit decorative intent. The path must be declared and exist under `public/`. Do not use the 17 legacy assets.

## Routes and localization

Preserve:

- `/blog`
- `/ko/blog`
- `/blog/[slug]`
- `/ko/blog/[slug]`
- `/feed.xml`

All public detail routes are prerendered. Draft, retired, synthetic, missing, and wrong-locale records return a real 404 without metadata leakage.

Indexes list only public records for their locale, ordered by `publishedOn` descending then slug ascending. Use reviewed absolute dates, never relative age or view counts.

Topic discovery is static and restrained: topic labels plus an optional in-page topic summary when enough public content exists. Do not create filters, query state, search, or topic routes.

Related content is same-locale only, excludes the current/non-public article, ranks by shared-topic count descending then publication date descending then slug ascending, returns at most three, and disappears when empty.

Add reviewed English/Korean UI strings for empty state, article metadata, table of contents, related content, topics, callouts, external links, feed discovery, and missing translation. Article narrative/frontmatter must not live in the UI dictionary.

A valid public translation pair uses exact reciprocal IDs for language switching and metadata alternates. Never infer it from slugs. Without a public counterpart, switch to the other locale's blog index and communicate that the article is unavailable in that language.

Use the centralized `SITE_URL` for canonicals, alternates, feed, and sitemap. Do not resolve the current bare-host versus deployed-`www` mismatch here; report it as a WP8/WP9 launch risk.

## Historical route manifest

Add a single typed manifest containing exactly these retired v1 slugs:

- `retrospect-hoek-agency`
- `retrospect-emg-global`
- `vimium-keyboard-lover-s-bestfriend-on-the-web`
- `how-to-use-notion-as-your-blog-post-database`
- `how-to-persist-images-on-notion-pages-made-from-notion-to-md`

Their WP5 disposition is intentional retirement with no redirect because no relevant replacement exists. Do not add redirect configuration.

Tests and real production-server verification must prove each English historical URL returns 404 and leaks no legacy title/body/metadata. The manifest reserves the slugs for future reviewed migration decisions and prevents accidental omission from cutover review. Do not invent Korean historical equivalents.

## Atom feed

Implement `/feed.xml` as a force-static Atom 1.0 route returning UTF-8 XML and the correct feed content type.

It must:

- include only public non-synthetic records;
- use absolute localized URLs derived from `SITE_URL` and route helpers;
- include stable IDs, title, summary, publication date, optional update date, locale, and topics;
- XML-escape authored values;
- follow deterministic index ordering;
- omit full article bodies;
- expose feed discovery metadata on blog pages.

A zero-entry feed is the required launch result and must remain valid.

## Sitemap

Add or extend the App Router sitemap. Preserve valid core routes, include `/blog` and `/ko/blog`, and include only public article routes. Never emit drafts, retired/synthetic fixtures, historical slugs, `/uses`, topic routes, or nonexistent paths.

## Required tests

Add focused tests for:

- frontmatter/schema validation and publication guards;
- one-to-one module registry coverage;
- deterministic sorting and locale isolation;
- reciprocal translation validation/counterpart lookup;
- missing-translation switch behavior;
- draft/retired/synthetic/wrong-locale 404 and metadata non-leakage;
- heading IDs and table-of-contents order;
- prohibited MDX constructs;
- declared local assets and alt/decorative intent;
- external-link safety and article semantics;
- related-content ranking;
- Atom validity, escaping, absolute localized URLs, ordering, and empty-feed behavior;
- sitemap inclusion/exclusion;
- all five historical-slug 404 outcomes;
- representative automated accessibility, keyboard focus, reflow, and reduced-motion behavior.

Do not delete, skip, loosen, or disable an existing check.

## Verification

Run and report exact results for:

1. clean/frozen dependency installation after explicit approval;
2. content/unit/component tests;
3. TypeScript typecheck;
4. ESLint;
5. direct production-content guard;
6. production build;
7. real production-server HTTP checks for both blog indexes, `/feed.xml`, sitemap, Example Article paths, and all five historical slugs.

Inspect build output to confirm public launch routes/feed/sitemap are static and no production article path exists. Report the accepted Next development-server `NoFallbackError` logging risk if it remains while correct 404s are returned; do not hide it.

## Stop conditions

Stop and return to Codex if:

- the dependency set cannot implement this specification;
- Next.js requires unspecified runtime/compiler behavior;
- the existing article schema or WP4 preview gate conflicts with this handoff;
- a legacy article/asset appears necessary;
- a canonical-host, factual, translation, redirect, or asset-rights decision is required;
- passing a check would require weakening a guard.

## Completion report

Return:

- changed files grouped by purpose;
- behavior changes;
- installed dependencies and lockfile changes;
- commands and exact results;
- assumptions/local mechanical choices;
- known risks;
- every acceptance item satisfied/unsatisfied with evidence;
- confirmation that no legacy content/assets were migrated and no commit/push/deploy/branch operation occurred.

WP5 completes the launch blog platform and historical retirement behavior. Publishing future articles, RAG/chatbot case studies, or other technical projects requires a separately reviewed later-version content package.

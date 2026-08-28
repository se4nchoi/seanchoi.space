# Gemini Handoff — WP2 Content Schema Foundation

## Authority and objective

WP1 is accepted. Implement only **WP2: typed content schemas, an empty canonical registry, deterministic integrity validation, and production-build safeguards**.

This package defines what future content must look like. It does not migrate legacy content or publish real career facts.

## Required reading

Read completely before editing:

1. `AGENTS.md`
2. `docs/portfolio-v2-exploration-report.md`
3. `docs/portfolio-v2-implementation-plan.md`
4. `docs/portfolio-content-contract.md`
5. This handoff

## Starting-state requirements

- Branch remains `v2` at HEAD `c89816d1a027a999a889ef5faa06e713d69b1d88`.
- `v1-production-2026-08-28` still resolves to that commit.
- WP1 clean-slate files and the uncommitted planning/archive changes remain present.
- `corepack pnpm --version` returns `10.34.5`.
- `corepack pnpm check` is green before WP2 edits.

If source, configuration, package, archive, branch, or tag state differs unexpectedly, stop and report it. Do not restore or discard other work.

## Approved dependency changes

Add exactly:

- runtime dependency `zod@4.4.3`;
- development dependency `vitest@4.1.10`.

Use exact pins and Corepack pnpm 10.34.5. Update only `package.json` and `pnpm-lock.yaml` for these additions. Do not add a DOM environment, Testing Library, axe, MDX packages, frontmatter packages, glob packages, `tsx`, date libraries, or any other dependency.

## Approved file boundaries

Create:

```text
src/data/content.ts
src/lib/content/schemas.ts
src/lib/content/validate.ts
src/lib/content/fixtures.ts
src/lib/content/schemas.test.ts
src/lib/content/integrity.test.ts
src/lib/content/production-content.test.ts
vitest.config.ts
```

Modify only:

```text
package.json
pnpm-lock.yaml
.github/workflows/quality.yaml
```

Do not edit routes, layout, styles, README, legacy content, planning documents, or other configuration.

## Canonical modeling decisions

Use Zod as the runtime authority and infer exported TypeScript types from schemas. Do not duplicate hand-written interfaces.

### Shared primitives

Define and export:

- `localeSchema`: `en | ko`;
- `claimStateSchema`: `verified | approved-direction | pending | restricted | prohibited | retired`;
- `evidenceLevelSchema`: `professional | project | training | exposure`;
- `publicationStatusSchema`: `draft | public | retired`;
- `translationReviewSchema`: `missing | draft | reviewed`;
- `recordIdSchema` and `slugSchema`: lowercase kebab-case, starting with a letter;
- strict calendar-date schema `YYYY-MM-DD` that rejects impossible dates;
- strict year-month schema `YYYY-MM` that rejects impossible months;
- HTTPS URL schema and public asset-path schema beginning with `/` and forbidding traversal.

Define localized text as:

```ts
{
  en: string;
  ko?: string;
  koReview: "missing" | "draft" | "reviewed";
}
```

Require nonblank normalized strings. Enforce: `missing` means no Korean text; `draft` or `reviewed` requires Korean text.

Define date ranges structurally as:

```ts
{
  start: "YYYY-MM";
  end: "YYYY-MM" | null;
  ongoing: boolean;
}
```

The integrity validator—not a Zod refinement—enforces `ongoing === true` only when `end === null`, `ongoing === false` only with an end value, and end not earlier than start, emitting `invalid_date_range`. This keeps semantic failures distinguishable from `schema_invalid`.

### Common publishable record

Every publishable record has:

- globally stable `id`;
- `publicationStatus`;
- `claimState`;
- `syntheticPlaceholder`;
- optional `reviewedOn` calendar date.

Cross-record publication validation—not individual schema parsing—must enforce that a `public` record:

- has `claimState: verified`;
- has `syntheticPlaceholder: false`;
- has `reviewedOn`;
- contains no unreviewed Korean text.

Draft records may be pending or synthetic. Retired records are never returned as public content.

### Evidence and links

`EvidenceRecord` contains: common fields, `label`, `level`, `sourceKind` (`repository | demo | artifact | public-document | direct-confirmation`), optional HTTPS `url`, and `publiclyInspectable` boolean. Do not model paths to private documents or sensitive evidence.

`LinkRecord` contains: common fields, localized `label`, `kind` (`website | github | linkedin | repository | demo | article | document | email | other`), and `href`. Permit HTTPS generally and `mailto:` only for `kind: email`. Reject other protocols.

### Career and site records

`SiteIdentity` contains: common fields, localized `displayName`, localized `location`, optional recruiting email, optional localized trajectory statement, and link-record IDs.

`ExperienceRecord` contains: common fields, localized organization and role, date range, employment type (`full-time | part-time | contract | internship | co-op | military | other`), localized summary, contribution items, and evidence IDs. Each contribution contains localized text and its own evidence IDs.

`EducationOrTrainingRecord` contains: common fields, kind (`education | training`), localized institution/provider, localized program, status (`planned | in-progress | completed`), date range, evidence level, and evidence IDs. Public records must not use `planned`.

`SkillRecord` contains: common fields, localized name, evidence level, prominence (`featured | supporting`), and evidence IDs. Featured skills require at least one valid evidence reference. Do not model ratings, percentages, or subjective mastery.

### Projects and articles

These schemas describe future frontmatter but do not load MDX in WP2.

`ProjectRecord` contains: common fields, slug, locale, optional `translationOf` record ID, `title`, `summary`, context (`professional | personal | training | academic`), status (`planned | in-progress | completed | archived`), `role`, `contributionBoundary`, topics, evidence IDs, link IDs, and asset paths. The four narrative fields are nonblank plain strings written in the record's declared locale; do not wrap them in `LocalizedText`. Public projects cannot be `planned`.

`ArticleRecord` contains: common fields, slug, locale, optional `translationOf`, title, summary, publication date, optional updated date, topics, source (`original | revised-legacy`), optional legacy slug, and asset paths. Title and summary are nonblank plain strings in the declared locale. Do not include a Notion ID field in v2. The integrity validator emits `invalid_date_range` when updated date precedes publication date.

Translation validation must require an existing record of the same type, the opposite locale, and a source record that does not itself point to another translation. Slugs are unique per record type and locale; matching English/Korean slugs are allowed.

### Résumé metadata

`ResumeMetadata` contains: common fields, revision, effective date, public asset path, locale, and evidence IDs. Do not model phone, street address, city, or work-authorization fields.

### Registry

`ContentRegistry` contains:

```ts
{
  siteIdentity: SiteIdentity | null;
  evidence: EvidenceRecord[];
  links: LinkRecord[];
  experiences: ExperienceRecord[];
  educationAndTraining: EducationOrTrainingRecord[];
  skills: SkillRecord[];
  projects: ProjectRecord[];
  articles: ArticleRecord[];
  resumes: ResumeMetadata[];
}
```

`src/data/content.ts` exports one schema-conforming empty registry with `siteIdentity: null` and empty arrays. It contains no real or placeholder claim.

## Integrity validator

Implement a pure validator accepting:

- unknown registry input;
- `now` supplied by the caller for deterministic date checks;
- a set of available public asset paths supplied by the caller.

Return the parsed registry on success. On failure throw one exported `ContentIntegrityError` containing stable structured issues with a code, record/path context, and human-readable message.

Use stable issue codes at minimum for:

```text
schema_invalid
duplicate_id
duplicate_slug
unverified_public_record
public_synthetic_placeholder
missing_review_date
unreviewed_public_translation
invalid_date_range
future_publication_date
missing_evidence_reference
missing_link_reference
featured_skill_without_evidence
missing_asset
invalid_translation_reference
planned_public_record
```

Required cross-record behavior:

- IDs are globally unique across registry collections.
- Project/article slugs are unique within type and locale.
- Every evidence/link/translation reference resolves.
- Featured skills have evidence.
- Every referenced asset exists in the supplied asset set.
- Public article dates are not later than `now`.
- Public synthetic, unverified, unreviewed, or planned records fail.
- Validation reports all discoverable issues in one run rather than stopping at the first cross-record problem.

Do not use wall-clock time inside the validator.

## Fixtures and tests

`fixtures.ts` may contain only unmistakably synthetic records such as `Example Project`, `Example Organization`, and `example-project`. Every synthetic publishable fixture must set `syntheticPlaceholder: true` and default to `publicationStatus: draft`.

Tests must cover:

- all schema primitives and date boundaries;
- a valid empty registry;
- a valid draft synthetic Example Project;
- every stable integrity issue code listed above;
- duplicate IDs across different collections;
- same-locale duplicate slugs and allowed cross-locale matching slugs;
- valid and invalid translation relationships;
- missing assets/evidence/links;
- featured versus supporting skill evidence rules;
- future dates using an injected fixed date;
- aggregate reporting of multiple failures;
- proof that making Example Project public is rejected.

Assert structured issue codes and relevant paths, not entire error-message snapshots.

## Production build guard

Add scripts:

```json
"test": "vitest run",
"test:watch": "vitest",
"content:check": "vitest run src/lib/content/production-content.test.ts"
```

Change `build` to:

```json
"build": "pnpm content:check && next build"
```

Keep `check` as typecheck, lint, full test, then build. Repetition of the production-content test inside build is intentional: direct `pnpm build` must enforce the publication guard.

`production-content.test.ts` must validate the canonical registry from `src/data/content.ts` using a fixed/current date supplied by the test and an asset inventory derived with Node built-ins from root `public/` when it exists. Absence of `public/` is an empty asset set, not an error. Do not inspect `legacy-content/`.

Update the quality workflow to run `pnpm test` between lint and build. Do not otherwise change CI.

## Vitest configuration

Create a minimal Node-environment configuration that includes `src/**/*.test.ts`, has no browser/DOM environment, and does not pass when no tests are found. Do not add coverage thresholds yet.

## Required verification

Run with Corepack pnpm 10.34.5 and report exact exit codes:

```text
corepack pnpm install --frozen-lockfile
corepack pnpm typecheck
corepack pnpm lint
corepack pnpm test
corepack pnpm content:check
corepack pnpm build
corepack pnpm check
```

Also demonstrate, without leaving the canonical registry modified, that:

- a public synthetic Example Project fails `content:check` with `public_synthetic_placeholder`;
- an invalid fixture for every issue code fails for the expected code;
- the canonical empty registry passes;
- `package.json` and installed direct versions contain only the two authorized additions;
- `legacy-content/` files remain byte-identical;
- existing WP1 route output is unchanged;
- no real claim or migrated content was added.

## Explicit exclusions

Do not:

- migrate, parse, edit, or publish legacy MDX/media;
- add MDX/frontmatter loaders or create blog/project routes;
- add real identity, contact, experience, education, skill, project, article, résumé, or Korean content;
- implement UI components, localization routing, SEO, analytics, résumé generation, redirects, or Playwright;
- add schema fields for phone, address, immigration/work authorization, private evidence paths, ratings, or proficiency percentages;
- weaken WP1 quality configuration;
- commit, push, deploy, change Git refs, or alter production.

## Completion report

Return:

- branch, HEAD, tag, and final status;
- exact dependency and file diffs;
- schema/type inventory;
- stable integrity issue-code inventory;
- test inventory with counts;
- every required command and exit code;
- negative-test demonstrations;
- archive-integrity confirmation;
- remaining risks or missing decisions.

## Acceptance condition

WP2 passes when invalid, unverified, unresolved, future-dated, planned-public, or synthetic-public content is rejected deterministically; the empty canonical registry passes; direct builds execute the guard; tests cover every rule; no real claim is introduced; and the dependency/file scope is exact.

## Copy/paste prompt for Gemini

> Implement only WP2 using `docs/gemini-handoffs/wp2-content-schema-foundation.md` as the complete authoritative specification. Add exactly Zod 4.4.3 and Vitest 4.1.10, implement the specified schemas, empty registry, pure integrity validator, synthetic test fixtures, tests, build guard, and CI test step. Do not migrate or publish any real or legacy content, add MDX/UI/localization work, change unrelated files, or make schema/product decisions. Use Corepack pnpm 10.34.5 for all package and verification commands, demonstrate every required negative guard, and return the full completion report without committing, pushing, or deploying.

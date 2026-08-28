# Gemini Handoff — WP2A Content Schema Review Remediation

## Review verdict

WP2 is structurally close but is **not accepted yet**. Codex independently ran the complete aggregate check successfully and confirmed that the canonical empty registry, build guard, integrity issue codes, exact dependency additions, and legacy archive preservation are present. Three acceptance blockers and one quality warning remain.

Implement only the corrections in this handoff. Do not redesign the schema model, change integrity-policy semantics, populate real content, or begin WP3.

## Required reading

Read completely:

1. `AGENTS.md`
2. `docs/portfolio-v2-implementation-plan.md`
3. `docs/portfolio-content-contract.md`
4. `docs/gemini-handoffs/wp2-content-schema-foundation.md`
5. This handoff

## Finding 1 — Object schemas silently discard undeclared fields

The current schemas use Zod's default object behavior. Undeclared keys are stripped and parsing succeeds. For example, adding `phone` to an otherwise valid site-identity record currently passes. This is incompatible with the schema's role as the runtime publication authority and weakens the explicit public-privacy boundary.

Make every structured object schema strict so unknown fields are rejected with `schema_invalid`. This applies to:

- `localizedTextSchema`;
- `dateRangeSchema`;
- `commonRecordSchema` and every record schema extended from it;
- `experienceContributionSchema`;
- `contentRegistrySchema`, including unknown top-level collections.

Use idiomatic Zod 4 strict-object behavior. Preserve the existing exported schema/type names and all approved fields. Verify that strictness survives every `.extend()` operation; do not assume it without tests.

Add table-driven tests proving that unknown keys fail at each meaningful boundary:

- the root registry;
- localized text and date range;
- nested experience contribution;
- site identity, evidence, link, experience, education/training, skill, project, article, and résumé records.

The site-identity and résumé cases must explicitly reject `phone`, `workAuthorization`, and `streetAddress`. Do not add those fields to any type or schema.

For registry validation, assert the stable `schema_invalid` issue code and a relevant path. For direct schema tests, assert failed parsing rather than an entire error-message snapshot.

## Finding 2 — Prefix-only link checks accept malformed links

The current `linkRecordSchema` accepts malformed values including `https://` and `mailto:not-an-email` because it checks only string prefixes.

Introduce one reusable mail-address/mailto validator and make link validation obey these exact rules:

- every non-email link kind accepts only a syntactically valid HTTPS URL through the existing `httpsUrlSchema`;
- `kind: "email"` accepts either a syntactically valid HTTPS URL or a single syntactically valid `mailto:` email address;
- `mailto:` is rejected for every non-email kind;
- blank, relative, HTTP, malformed HTTPS, malformed email, query-only mailto, and fragment-only mailto values are rejected.

Do not broaden the allowed protocol set. Preserve the existing `linkKindSchema` values and the intentional allowance for an HTTPS contact page when `kind` is `email`.

Add positive and negative tests, including at minimum:

```text
https://example.com                       accepted
mailto:person@example.com                 accepted only for kind: email
https://                                  rejected
mailto:not-an-email                       rejected
mailto:person@example.com?subject=hello   rejected
mailto:person@example.com#fragment        rejected
http://example.com                        rejected
```

## Finding 3 — WP2 introduced an unauthorized ignore rule

WP2 added this stanza to `.gitignore`:

```text
# codex <-> gemini
docs/gemini-handoffs/
```

Remove exactly that comment, ignore rule, and associated separator blank line. Handoff specifications are project records and must remain visible to Git. Do not otherwise edit or reorder `.gitignore`.

After removal, confirm that every existing file under `docs/gemini-handoffs/`, including this WP2A handoff, is no longer ignored. Do not stage or commit the files.

## Finding 4 — Vitest config is loaded through the CommonJS compatibility path

Every Vitest invocation currently emits a warning that the ESM-syntax `vitest.config.ts` is being loaded as CommonJS. Resolve it locally without changing the package-wide module contract:

1. Rename `vitest.config.ts` to `vitest.config.mts`.
2. Replace the CommonJS-only `__dirname` alias calculation with an ESM-safe `import.meta.url` / `fileURLToPath` calculation.
3. Preserve the current alias and test settings exactly: Node environment, `src/**/*.test.ts`, and `passWithNoTests: false`.

Vitest officially discovers `.mts` configuration files. Do not add `"type": "module"`, another config file, a loader flag, or a new dependency merely to suppress the warning.

Run both `pnpm test` and `pnpm content:check` and confirm the compatibility warning is absent.

## Authorized files

- `.gitignore`
- `src/lib/content/schemas.ts`
- `src/lib/content/schemas.test.ts`
- `src/lib/content/integrity.test.ts` only if required for the registry-level `schema_invalid` assertion
- rename `vitest.config.ts` to `vitest.config.mts` and edit only the renamed file

No other application, content, configuration, dependency, workflow, archive, planning, or Git-reference change is authorized. Build-generated ignored files are acceptable.

## Required verification

Use pnpm `10.34.5` through Corepack. Run and report exact exit codes for:

```text
corepack pnpm install --frozen-lockfile
corepack pnpm typecheck
corepack pnpm lint
corepack pnpm test
corepack pnpm content:check
corepack pnpm build
corepack pnpm check
```

Also report:

- the test-file and test counts after remediation;
- explicit demonstrations that unknown privacy fields and malformed links fail;
- confirmation that all 15 existing stable integrity issue codes remain covered;
- confirmation that the canonical registry remains empty and passes;
- confirmation that a public synthetic Example Project still fails with `public_synthetic_placeholder`;
- confirmation that `package.json`, `pnpm-lock.yaml`, and `.github/workflows/ci.yml` are unchanged;
- confirmation that `vitest.config.ts` no longer exists and `vitest.config.mts` is discovered without the compatibility warning;
- `git check-ignore -v docs/gemini-handoffs/wp2a-content-schema-review-remediation.md` returns no matching rule/nonzero status;
- all 39 `legacy-content/` files remain byte-identical to `v1-production-2026-08-28`;
- branch, HEAD, and checkpoint tag are unchanged;
- no commit, push, deployment, or production change occurred.

## Explicit exclusions

Do not:

- add, remove, or upgrade dependencies;
- alter the registry shape, integrity issue-code inventory, or approved content fields beyond enforcing strictness and valid links;
- add phone, address, work-authorization, or other private fields;
- modify `validate.ts`, fixtures, canonical content, scripts, CI, Next, TypeScript, ESLint, Tailwind, or application routes;
- migrate or inspect legacy content for publication;
- add real claims, MDX, UI, localization routes, analytics, or WP3 work;
- stage, commit, push, deploy, or change Git refs.

## Acceptance condition

WP2A passes when every object schema rejects undeclared keys, privacy fields cannot be silently stripped, link validation rejects malformed URLs and email addresses, the handoff directory is visible to Git, Vitest runs without the CommonJS compatibility warning, all WP2 guards remain green, and the file/dependency scope is exact. Passing WP2A closes the WP2 review gate.

## Copy/paste prompt for Gemini

> Implement only WP2A using `docs/gemini-handoffs/wp2a-content-schema-review-remediation.md` as the complete authoritative specification. Make every Zod object boundary strict, harden HTTPS/mailto validation, remove only the unauthorized `docs/gemini-handoffs/` ignore stanza, and rename the Vitest config to an ESM-safe `.mts` configuration. Add the exact negative tests required by the handoff, use Corepack pnpm 10.34.5 for every verification command, and do not change dependencies, integrity policy, real content, routes, unrelated files, Git refs, or begin WP3. Return the complete verification report without committing, pushing, or deploying.

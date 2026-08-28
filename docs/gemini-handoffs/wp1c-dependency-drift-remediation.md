# Gemini Handoff — WP1C Dependency-Drift Remediation

> **SUPERSEDED — DO NOT IMPLEMENT OR RESUME.** Dependency-drift remediation is unnecessary because v2 is a clean-slate application and v1 packages have no authority over it. Use `docs/gemini-handoffs/wp1d-clean-slate-foundation.md` instead. This file remains only as decision history.

## Review verdict

Codex reviewed WP1B against the repository and does **not** accept its dependency-integrity gate yet.

The pnpm migration, scripts, workflow, typecheck, tests, build, and frozen installation worked. However, the migration upgraded 17 existing direct dependencies even though WP1B required preservation of the v1-resolved dependency graph. Examples include Next.js `16.2.7 → 16.3.3`, Tailwind `4.1.13 → 4.3.3`, and Vitest `1.6.0 → 1.6.1`.

This remediation isolates package-manager migration from dependency modernization. Existing v1 dependency versions must first be reproduced under pnpm. Obsolete packages will be removed and retained packages upgraded later through separate Codex specifications.

Implement **only WP1C: restore the v1-resolved dependency graph under pnpm and bring the ESLint configuration into exact conformance with the WP1B specification**.

## Required reading

Read completely:

1. `AGENTS.md`
2. `docs/portfolio-v2-exploration-report.md`
3. `docs/portfolio-v2-implementation-plan.md`
4. `docs/portfolio-content-contract.md`
5. `docs/gemini-handoffs/wp1b-quality-foundation.md`
6. This handoff

Do not reinterpret the remediation objective. If the steps cannot preserve the graph, stop and report the exact blocker to Codex.

## Expected starting state

- Branch: `v2`
- HEAD: `c89816d1a027a999a889ef5faa06e713d69b1d88`
- Tag: `v1-production-2026-08-28` resolves to `c89816d`
- `package.json` contains pnpm metadata, quality scripts, ESLint 9 range, and `eslint-config-next` 16.2.7.
- `package-lock.json` is deleted.
- `pnpm-lock.yaml`, `eslint.config.mjs`, and `.github/workflows/quality.yaml` exist as untracked WP1B outputs.
- Application/content files remain unchanged.

Validate branch, HEAD, tag, Git status, and application diff before editing. If application/content files changed, stop without modifying anything.

## Confirmed unauthorized dependency drift

These existing direct packages changed relative to the v1 checkpoint and must return to the baseline resolution:

| Package | V1 baseline | WP1B resolution |
| --- | ---: | ---: |
| `@notionhq/client` | 5.1.0 | 5.26.0 |
| `@tailwindcss/postcss` | 4.1.13 | 4.3.3 |
| `@tailwindcss/typography` | 0.5.18 | 0.5.20 |
| `@types/node` | 20.19.16 | 20.19.43 |
| `@types/react` | 19.1.13 | 19.2.18 |
| `@types/react-dom` | 19.1.9 | 19.2.5 |
| `@vercel/analytics` | 1.1.4 | 1.6.1 |
| `@vercel/speed-insights` | 1.0.4 | 1.3.1 |
| `geist` | 1.0.0 | 1.7.2 |
| `next` | 16.2.7 | 16.3.3 |
| `postgres` | 3.4.7 | 3.4.9 |
| `react-icons` | 5.5.0 | 5.7.0 |
| `react-tweet` | 3.2.2 | 3.3.1 |
| `sugar-high` | 0.9.3 | 0.9.5 |
| `tailwindcss` | 4.1.13 | 4.3.3 |
| `typescript` | 5.9.2 | 5.9.3 |
| `vitest` | 1.6.0 | 1.6.1 |

All other pre-existing direct packages must also match the versions recorded in `v1-production-2026-08-28:package-lock.json`. The only new direct packages allowed are ESLint major 9 and `eslint-config-next` 16.2.7.

## Required remediation procedure

### 1. Capture authoritative baselines

Read the checkpoint’s `package.json` and `package-lock.json` directly from Git. Produce a machine-derived map of every existing direct dependency and devDependency to its resolved version. Do not rely only on the table above.

Capture the current pnpm direct-version map separately.

### 2. Rebuild a temporary npm lock with the approved manifest

Temporarily restore only `package-lock.json` from tag `v1-production-2026-08-28` using a safe Git restore of that exact file.

Keep the current approved `package.json` manifest containing:

- existing dependency ranges;
- Node `24.x` engine;
- `packageManager: pnpm@10.34.5`;
- quality scripts;
- `eslint: ^9.0.0`;
- `eslint-config-next: 16.2.7`.

Use npm only as a one-time lockfile conversion aid to add the two approved lint dependencies to the restored baseline lock. Use lockfile-only and ignore lifecycle scripts. Do not install with npm and do not change existing manifest ranges.

Immediately compare every pre-existing direct resolved version in the temporary npm lock with the checkpoint baseline. If any existing direct version changes, stop, preserve diagnostic state, and report the exact drift. Do not continue to pnpm import.

### 3. Re-import into pnpm

Use exactly pnpm `10.34.5` through Corepack.

- Remove only the current generated `pnpm-lock.yaml`.
- Import the verified temporary `package-lock.json` into a new `pnpm-lock.yaml`.
- Compare the pnpm importer’s resolved direct versions against the checkpoint baseline.
- Allow new resolutions only for ESLint and `eslint-config-next` plus their transitive graph.

If a pre-existing direct version differs, stop. Do not hand-edit lockfile integrity or resolution entries.

### 4. Prove the final pnpm graph

After the imported pnpm lock passes comparison:

- perform a clean `pnpm install --frozen-lockfile` using pnpm 10.34.5;
- run `pnpm list --depth 0 --json` and machine-compare all pre-existing direct resolved versions to the checkpoint map;
- delete the temporary `package-lock.json` only after that comparison passes;
- run another `pnpm install --frozen-lockfile` with only `pnpm-lock.yaml` present;
- verify no npm, Yarn, or Bun lockfile remains.

Do not use plain `pnpm install`, `pnpm update`, or `pnpm add` in WP1C; they may re-resolve existing ranges.

### 5. Correct the ESLint flat configuration

WP1B produced a valid array config but did not use the exact official flat-config helpers requested.

Update only `eslint.config.mjs` to use:

- `defineConfig` and `globalIgnores` from `eslint/config`;
- `eslint-config-next/core-web-vitals`;
- `eslint-config-next/typescript`;
- global ignores for `.next/**`, `out/**`, `build/**`, `dist/**`, `coverage/**`, and `next-env.d.ts`.

Do not disable or override lint rules and do not run `--fix`.

### 6. Verify

Run independently with pnpm 10.34.5 and record exit codes:

```text
pnpm install --frozen-lockfile
pnpm typecheck
pnpm lint
pnpm test
pnpm build
pnpm check
```

The existing lint debt is expected to keep `pnpm lint` and `pnpm check` red. Do not edit application files or weaken rules. Report if the rule/file/count differs from WP1B.

Typecheck, tests, build, and frozen install must remain green.

## Authorized file changes

- `pnpm-lock.yaml`
- `eslint.config.mjs`
- temporary restoration and final deletion of `package-lock.json`

`package.json` should not require further changes. If it does, stop and ask Codex.

Do not change the quality workflow unless validation reveals a concrete syntax/configuration error; report that error before editing.

## Explicit exclusions

Do not:

- edit application, content, public assets, scripts, or framework/test/style configuration;
- change dependency ranges or package-manager/Node versions;
- upgrade or remove existing dependencies;
- add dependencies;
- fix lint findings;
- modify planning documents, `AGENTS.md`, or prior handoffs;
- restore `GEMINI.md`;
- commit, push, deploy, or alter production.

## Completion report

Return:

- branch, HEAD, tag target, and final Git status;
- the machine-derived checkpoint direct-version map;
- the final pnpm direct-version map;
- an explicit equality result for every pre-existing direct dependency;
- exact ESLint and `eslint-config-next` resolutions;
- confirmation that only `pnpm-lock.yaml` remains as package lockfile;
- all commands and exit codes;
- lint summary and whether it matches WP1B;
- typecheck/test/build/check results;
- changed files;
- any residual drift or blocker.

## Acceptance condition

WP1C passes only when pnpm 10.34.5 reproducibly installs the v1-resolved dependency graph plus the two approved lint dependencies, no other lockfile remains, application files are unchanged, and verification results are reported without suppressing lint debt.

## Copy/paste prompt for Gemini

> Implement only WP1C using `docs/gemini-handoffs/wp1c-dependency-drift-remediation.md` as the complete authoritative specification. Read every required document and validate all repository preconditions. Restore the exact v1-resolved direct dependency graph under pnpm 10.34.5 using the checkpoint lock as authority, correct only the ESLint flat-config helper usage, and make no application changes. Stop if any pre-existing direct dependency still drifts. Do not fix lint findings, change dependency ranges, add packages, commit, push, deploy, or begin later work. Return the complete machine-derived comparison and verification report.

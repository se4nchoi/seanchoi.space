# Gemini Handoff — WP1B pnpm Migration and Quality Foundation

> **SUPERSEDED — DO NOT IMPLEMENT OR RESUME.** Sean rejected preservation of the v1 application/dependency graph. Use `docs/gemini-handoffs/wp1d-clean-slate-foundation.md` instead. This file remains only as decision history.

## Authority and review status

This is a decision-complete implementation handoff prepared by Codex after reviewing WP1A.

WP1A is accepted with one documented override: Sean selected branch `v2` instead of the originally proposed `codex/portfolio-v2`. The actual repository is on `v2` at `c89816d`; the v1 tag resolves correctly; tests, TypeScript, and the production build passed; dependency and application files were unchanged.

Implement **only WP1B: npm-to-pnpm migration, package-script normalization, ESLint foundation, and continuous-integration quality workflow**.

## Required reading

Read completely before acting:

1. `AGENTS.md`
2. `docs/portfolio-v2-exploration-report.md`
3. `docs/portfolio-v2-implementation-plan.md`
4. `docs/portfolio-content-contract.md`
5. `docs/gemini-handoffs/wp1a-repository-kickoff.md`
6. This handoff

If instructions conflict, stop and report the exact conflict to Codex.

## Expected starting state

```text
Branch: v2
HEAD: c89816d1a027a999a889ef5faa06e713d69b1d88
Tag: v1-production-2026-08-28 -> c89816d
Working tree:
 M AGENTS.md
 D GEMINI.md
?? docs/
```

`node_modules` and `.next` may exist as ignored directories from WP1A.

Before editing, confirm the current branch, HEAD, tag target, and full Git status. If the branch/HEAD/tag differs, or if tracked/untracked files outside the expected documentation state have changed, stop without modifying anything and report the discrepancy.

## Codex architecture decisions

These decisions are final for WP1B:

- Replace npm project management with pnpm `10.34.5`.
- Add `"packageManager": "pnpm@10.34.5"` and keep `"engines": { "node": "24.x" }` in `package.json`.
- Replace `package-lock.json` with `pnpm-lock.yaml`. Never keep multiple package-manager lockfiles.
- Preserve the currently resolved dependency graph through `pnpm import` before installing; the package-manager migration must not become an uncontrolled dependency upgrade.
- Retain Next.js 16.2.7, React 19.1.0, TypeScript 5, Tailwind 4, and Vitest.
- Add ESLint using the current Next.js 16 flat-config approach.
- Add only two direct dev dependencies: `eslint` constrained to major 9 and `eslint-config-next` pinned to `16.2.7`.
- Use `eslint-config-next/core-web-vitals` plus `eslint-config-next/typescript`.
- Run ESLint through the ESLint CLI; Next.js 16 removed `next lint`.
- Defer Playwright and browser downloads until representative v2 routes exist.
- Do not introduce Prettier, Biome, Husky, lint-staged, commit hooks, coverage services, or a component library.
- Keep the existing root `app` layout. Do not move files into `src` or create empty architecture directories.
- Add a separate GitHub Actions quality workflow. Do not modify the existing Notion workflow in this package; its removal belongs to the later blog migration package.
- Standardize development, CI, and Vercel on Node 24 LTS plus pnpm 10.34.5. CI uses the official pnpm setup action, Node 24 with pnpm caching, least-privilege read permissions, and cancellation of superseded runs on the same ref.
- CI must not require Notion, Postgres, or Gemini secrets.
- Do not commit, push, deploy, or change Vercel.

## Authorized package-manager and dependency changes

The following migration changes are authorized:

- add `packageManager: pnpm@10.34.5`;
- add Node engine `24.x`;
- generate `pnpm-lock.yaml` from the existing locked graph;
- delete `package-lock.json` only after the pnpm lockfile and frozen installation verify successfully;
- add the two approved development dependencies below.

Add exactly:

```text
eslint@^9.0.0
eslint-config-next@16.2.7
```

as development dependencies using pnpm. Changes to `package.json` and `pnpm-lock.yaml` caused by this exact addition are authorized. No other direct dependency addition, removal, or upgrade is authorized.

Before and after migration, inspect the dependency diff. If pnpm changes the declared versions of existing direct dependencies, stop and report it. Normal lockfile records required by pnpm and the two approved packages are acceptable.

## Required implementation

### 1. Migrate the package manager

Use Corepack to activate exactly pnpm `10.34.5`. Do not use the globally available pnpm 11.x for this repository.

Perform the migration in this order:

1. Confirm `package.json` and `package-lock.json` match the WP1A state.
2. Add `packageManager: pnpm@10.34.5` and Node engine `24.x` to `package.json`.
3. Use pnpm 10.34.5 to import the existing `package-lock.json` into `pnpm-lock.yaml`.
4. Verify the generated lockfile is pnpm-10/Vercel compatible.
5. Remove the existing `node_modules` through pnpm’s normal clean installation behavior or a safe, explicitly targeted operation within the repository only.
6. Install using `pnpm install --frozen-lockfile`.
7. Run `pnpm list --depth 0` and compare direct dependencies with the pre-migration `package.json`.
8. Delete `package-lock.json` only after the frozen pnpm installation succeeds.
9. Run a second `pnpm install --frozen-lockfile` to prove reproducibility without the npm lockfile.

If import, frozen installation, or dependency comparison fails, preserve both lockfiles, stop, and report the failure. Do not resolve it by upgrading packages or regenerating an unlocked graph.

### 2. Package scripts

Preserve existing scripts and add:

```json
"typecheck": "tsc --noEmit",
"lint": "eslint .",
"check": "pnpm typecheck && pnpm lint && pnpm test && pnpm build"
```

Do not rename the existing `test`, `build`, `dev`, `start`, or `build:scripts` scripts.

Also add this top-level package engine constraint:

```json
"engines": {
  "node": "24.x"
}
```

This aligns local Node 24, CI, and Vercel without pinning a patch release.

### 3. ESLint flat configuration

Create root `eslint.config.mjs` using the official ESLint flat-config API and:

- `eslint-config-next/core-web-vitals`;
- `eslint-config-next/typescript`;
- global ignores for `.next/**`, `out/**`, `build/**`, `dist/**`, `coverage/**`, and `next-env.d.ts`.

Do not add rule overrides merely to silence findings. Do not disable React, hooks, Next.js, accessibility-related, or TypeScript rules.

### 4. Quality workflow

Create `.github/workflows/quality.yaml` with:

- name `Quality`;
- triggers for pull requests and pushes to `v2` and `main`;
- `permissions: contents: read`;
- concurrency grouped by workflow and Git ref with cancellation enabled;
- one Ubuntu job;
- checkout v4;
- `pnpm/action-setup@v4` with version `10.34.5` and installation disabled until the explicit install step;
- setup-node v4 with Node 24 and pnpm cache;
- `pnpm install --frozen-lockfile`;
- `pnpm typecheck`;
- `pnpm lint`;
- `pnpm test`;
- `pnpm build`.

Do not add write permissions, artifact uploads, deployment steps, secrets, matrices, or third-party actions beyond GitHub’s checkout/setup-node actions and the official `pnpm/action-setup` action.

## Lint-result protocol

Run lint after configuration.

- If lint passes, continue to the full verification suite.
- If lint reports findings in existing v1 application or scripts, do **not** edit those files in WP1B and do not weaken the rules. Capture the complete findings, classify them by rule/file/count, and return them to Codex for a separate decision-complete remediation package.
- Configuration/import/runtime errors in the new `eslint.config.mjs` are within WP1B and must be corrected.
- Do not use `--fix`.
- Warnings are reportable debt but do not fail `pnpm lint` unless ESLint itself returns nonzero. Do not add `--max-warnings=0` in this package.

If lint findings cause the full `pnpm check` or CI design to be red, that is an acceptable documented WP1B outcome; do not hide it.

## Required verification

Run independently and record exit codes:

```text
pnpm typecheck
pnpm lint
pnpm test
pnpm build
pnpm check
```

Also verify:

- the ESLint config loads using locally installed packages;
- package changes contain only the pnpm/Node metadata, two approved direct dev dependencies, npm-lock removal, and expected pnpm lockfile;
- no npm, Yarn, or Bun lockfile remains;
- `pnpm install --frozen-lockfile` succeeds from the final repository state;
- `quality.yaml` parses as valid YAML to the extent supported locally;
- no application/content file changed;
- no unexpected source/config/generated file appeared;
- branch, HEAD, tag, and expected documentation state remain intact.

## Explicit exclusions

Do not:

- edit `app/`, `content/`, `public/`, `scripts/`, Next configuration, Tailwind configuration, TypeScript configuration, Vitest configuration, or existing application source;
- modify `AGENTS.md`, the content contract, exploration report, implementation plan, or prior handoff files;
- restore `GEMINI.md`;
- modify `.github/workflows/notion-content-sync.yaml`;
- add Playwright, Testing Library, axe, Zod, MDX tooling, or localization packages;
- create v2 routes, schemas, components, design tokens, content, or directories;
- fix existing lint findings or disable rules;
- commit, push, deploy, or modify production.

The only authorized file changes are:

- `package.json`;
- deleted `package-lock.json`;
- new `pnpm-lock.yaml`;
- new `eslint.config.mjs`;
- new `.github/workflows/quality.yaml`.

## Completion report

Return:

- final branch, HEAD, tag target, and Git status;
- exact direct dependency diff;
- all changed files;
- commands and exit codes;
- lint findings grouped by file/rule/count, if any;
- whether each non-lint baseline remains green;
- whether `pnpm check` is green;
- whether the planned CI workflow would be green on the current tree;
- unexpected changes or risks;
- exact blockers, if any, for a Codex review/remediation handoff.

## Completion condition

WP1B is complete when the approved quality tooling is configured without application edits, all verification results are truthfully reported, and any pre-existing lint debt is exposed rather than suppressed.

## Copy/paste prompt for Gemini

> Implement only WP1B using `docs/gemini-handoffs/wp1b-quality-foundation.md` as the complete authoritative specification. Read every required document completely and validate the repository preconditions before editing. Migrate the repository from npm to exactly pnpm 10.34.5, make only the authorized package/lock/config/workflow changes, add only the two approved dev dependencies, and follow the lint-result protocol exactly. Do not fix existing application lint findings or weaken rules. Do not commit, push, deploy, or begin later work. Return the full completion report required by the handoff.

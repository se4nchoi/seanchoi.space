# Gemini Handoff — WP1A Repository Kickoff

## Authority

This is a decision-complete implementation handoff prepared by Codex and authorized by Sean.

Implement **only WP1A: repository baseline, v1 checkpoint, and v2 branch creation**. Do not begin the v2 application foundation, refactor application code, or make product/architecture/content decisions in this task.

## Required reading

Before acting, read these files completely:

1. `AGENTS.md`
2. `docs/portfolio-v2-exploration-report.md`
3. `docs/portfolio-v2-implementation-plan.md`
4. `docs/portfolio-content-contract.md`
5. This handoff

If any instruction conflicts, stop and report the exact conflict to Codex.

## Confirmed decisions

- Confirmed v1 production commit: `c89816d`
- Approved annotated checkpoint tag: `v1-production-2026-08-28`
- Approved v2 integration branch: `codex/portfolio-v2`
- `GEMINI.md` was an empty, stale file; its existing deletion is intentional.
- `AGENTS.md` and all files under `docs/` are current Codex planning artifacts and must be preserved exactly.
- Installing the existing lockfile dependencies with `npm ci` is authorized.
- Creating the local annotated tag and local branch is authorized.
- Commit, push, deployment, Vercel configuration changes, domain changes, dependency upgrades, and application-code edits are **not** authorized in this handoff.

## Expected starting state

The last Codex check reported:

```text
## main...origin/main
 M AGENTS.md
 D GEMINI.md
?? docs/
```

The repository had no `node_modules` directory and no Git tags.

## Required procedure

### 1. Inspect and validate state

Run read-only checks for:

- current directory;
- current branch and upstream;
- full `git status --short --branch`;
- HEAD commit;
- existing local tags;
- Node and npm versions.

The current branch must be `main`, HEAD must be `c89816d`, and the only working-tree changes must be the expected `AGENTS.md`, `GEMINI.md`, and `docs/` changes above.

If HEAD, branch, or working-tree scope differs, **stop without changing anything** and report the difference to Codex. Do not stash, clean, restore, reset, commit, or discard files.

### 2. Install locked dependencies

Run:

```text
npm ci
```

Do not run `npm install`. Do not alter dependency versions or intentionally change `package.json` or `package-lock.json`.

If installation fails, report the root cause and exact command/output. Do not work around it by upgrading packages, deleting the lockfile, or changing package metadata.

After installation, verify that `package.json` and `package-lock.json` have not changed.

### 3. Record the v1 baseline

On the unchanged application at commit `c89816d` plus documentation-only working-tree changes, run these commands independently and record each exit code:

```text
npm test
npx tsc --noEmit
npm run build
```

Use the locally installed TypeScript binary; do not permit `npx` to download a different package. If necessary, use the equivalent local binary invocation and report it.

Do not edit code or configuration to make a failing baseline pass. For every failure, identify the root cause as far as the existing output safely permits and preserve the failure as baseline evidence.

After the commands finish, inspect Git status again. Build artifacts ignored by Git are acceptable; tracked or untracked source/config changes beyond the expected starting state are not. Stop and report any unexpected modification.

### 4. Create the v1 checkpoint

Confirm that tag `v1-production-2026-08-28` does not already exist. Then create an annotated local tag pointing explicitly to `c89816d` with this annotation:

```text
Portfolio v1 production checkpoint before v2 development
```

Verify that the tag resolves to `c89816d`.

Do not push the tag.

If the tag already exists and does not resolve to `c89816d`, stop and report the conflict. Do not move or delete it.

### 5. Create the v2 integration branch

Confirm that local branch `codex/portfolio-v2` does not already exist. Then create and switch to it from the current `main`/`c89816d` state while preserving all expected working-tree changes.

Do not commit or push the branch.

If the branch already exists, stop and report its commit and working-tree implications. Do not delete, reset, rename, or overwrite it.

### 6. Final verification

Report:

- final branch and HEAD;
- upstream state, if any;
- final `git status --short --branch`;
- tag name, annotation, and resolved commit;
- Node/npm versions;
- `npm ci` result;
- each baseline command, exit code, and concise result;
- whether `package.json` or `package-lock.json` changed;
- any unexpected generated, tracked, or untracked files;
- blockers or risks for WP1B.

## Explicit exclusions

Do not:

- edit application files, content, configuration, workflows, or planning documents;
- generate a new `GEMINI.md`;
- restore the intentionally deleted `GEMINI.md`;
- commit, push, deploy, or modify Vercel;
- install new packages or update existing ones;
- change `package.json` or `package-lock.json`;
- create any branch or tag other than the exact approved names;
- implement schemas, localization, design tokens, routes, tests, CI, or other WP1B+ work;
- resolve failures by modifying code;
- make portfolio product, architecture, content, or factual decisions.

## Completion condition

WP1A is complete only when the baseline has been recorded without code changes, the annotated v1 tag resolves to `c89816d`, the working tree and planning artifacts are preserved on `codex/portfolio-v2`, and the full implementation report is returned for Codex review.

If any safety precondition fails, stopping with an exact report is the correct result.

## Copy/paste prompt for Gemini

> Implement only WP1A using `docs/gemini-handoffs/wp1a-repository-kickoff.md` as the complete authoritative task specification. Read `AGENTS.md`, the exploration report, implementation plan, content contract, and the handoff completely before acting. Follow every precondition, stop condition, authorized action, exclusion, and reporting requirement exactly. Do not make product or architecture decisions. Do not edit application code, commit, push, or deploy. If repository state differs from the documented expected state, stop and return the discrepancy to Codex.

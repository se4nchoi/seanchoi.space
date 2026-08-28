# Gemini Handoff — WP1E Foundation Review Remediation

## Review verdict

WP1D's architecture and implementation are accepted except for two narrow review findings. Do not revisit the scaffold, dependency graph, archive moves, or design.

Codex independently verified under Corepack pnpm `10.34.5`:

- `pnpm install --frozen-lockfile` exits `0`;
- `pnpm typecheck` exits `0`;
- `pnpm lint` exits `0`;
- `pnpm build` exits `0` and statically prerenders `/` and `/_not-found`;
- `pnpm check` exits `0`;
- all 11 direct installed versions exactly match `package.json`;
- all 39 quarantined MDX/media files match their `v1-production-2026-08-28` Git blobs exactly.

Implement only the two corrections below.

## Required reading

Read completely:

1. `AGENTS.md`
2. `docs/portfolio-v2-implementation-plan.md`
3. `docs/gemini-handoffs/wp1d-clean-slate-foundation.md`
4. This handoff

## Finding 1 — Tailwind source isolation

`src/app/globals.css` currently uses:

```css
@import "tailwindcss";
```

Tailwind CSS 4 automatically scans the project working directory for class-like tokens. TypeScript and ESLint exclusions do not affect Tailwind. This means `legacy-content/`, planning documents, and other root files remain potential build inputs, contradicting the WP1D requirement that the archive be outside runtime compilation.

Replace the import/source declaration with explicit source registration that disables automatic project-wide detection and scans only `src/`:

```css
@import "tailwindcss" source(none);
@source "../";
```

The stylesheet is `src/app/globals.css`, so `../` resolves to `src/`. Do not add other sources, safelists, JavaScript configuration, or exclusions. Leave all remaining styles unchanged.

After building, inspect the generated CSS/source behavior sufficiently to confirm utilities used by `src/app/layout.tsx` and `src/app/page.tsx` are present and `legacy-content/` is not a scan source.

## Finding 2 — Accurate checkpoint wording

`README.md` currently says the v1 checkpoint remains “permanently archived” via the tag. The tag is currently local and has not been pushed, so permanence is not established.

Change only that statement to say:

```text
V1 remains recoverable from the local `v1-production-2026-08-28` checkpoint tag and the existing Git history. The tag has not yet been pushed.
```

Do not otherwise rewrite the README.

## Authorized files

- `src/app/globals.css`
- `README.md`

No other tracked or untracked file may change as part of this remediation. Build-generated ignored files are acceptable.

## Verification

Use pnpm `10.34.5` through Corepack, not the unrelated global pnpm 11 installation.

Run independently and report exit codes:

```text
corepack pnpm install --frozen-lockfile
corepack pnpm typecheck
corepack pnpm lint
corepack pnpm build
corepack pnpm check
```

Also confirm:

- `package.json` and `pnpm-lock.yaml` are unchanged;
- direct installed versions remain exact;
- all 39 `legacy-content/` files remain unchanged;
- the Tailwind source declarations are exactly the two approved lines;
- `/` remains statically prerendered;
- branch, HEAD, and checkpoint tag are unchanged;
- no commit, push, deployment, or production change occurred.

## Explicit exclusions

Do not:

- alter dependencies, lockfiles, scripts, CI, TypeScript, ESLint, Next, or PostCSS configuration;
- change page/layout markup or any other CSS;
- edit, move, add, or delete archived content/media;
- begin WP2 or add schemas/tests/content tooling;
- commit, push, deploy, or change Git refs.

## Acceptance condition

WP1E passes when Tailwind scans only `src/`, the README accurately describes the local checkpoint, all required checks pass under Corepack pnpm 10.34.5, and no other implementation change occurs. Passing WP1E closes the WP1 clean-slate foundation gate.

## Copy/paste prompt for Gemini

> Implement only WP1E using `docs/gemini-handoffs/wp1e-foundation-review-remediation.md` as the complete authoritative specification. Change only `src/app/globals.css` to disable Tailwind's automatic project-wide source detection and explicitly scan `src/`, and change only the inaccurate local-checkpoint sentence in `README.md`. Use Corepack pnpm 10.34.5 for every required verification command. Do not change dependencies, lockfiles, configuration, pages, archive files, Git refs, or begin WP2. Return the complete verification report.

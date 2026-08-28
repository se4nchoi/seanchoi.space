# Gemini Handoff — WP1D Clean-Slate V2 Foundation

## Authority and supersession

This specification implements Sean's explicit correction: **v2 does not preserve v1 code, package versions, configuration, tests, or application structure. Only written content, content media, URL history, and verified facts are candidates for later transfer.** Legacy content is quarantined as source material; it is not part of the new runtime.

WP1A remains accepted because it created the rollback checkpoint and `v2` branch. WP1B and WP1C are superseded. Do not resume dependency-drift remediation and do not attempt to make the legacy application lint-clean.

Implement only **WP1D: replace the inherited v1 technical surface with a minimal clean-slate v2 application foundation**.

## Required reading

Read completely before editing:

1. `AGENTS.md`
2. `docs/portfolio-v2-exploration-report.md`
3. `docs/portfolio-v2-implementation-plan.md`
4. `docs/portfolio-content-contract.md`
5. This handoff

The superseded WP1B/WP1C specifications are historical records, not implementation instructions.

## Expected starting state

- Branch: `v2`
- HEAD: `c89816d1a027a999a889ef5faa06e713d69b1d88`
- Tag: `v1-production-2026-08-28` resolves to that commit.
- Planning changes are uncommitted.
- WP1B/WP1C may have left modified/new `package.json`, `package-lock.json`, `pnpm-lock.yaml`, `eslint.config.mjs`, `.github/workflows/quality.yaml`, and installed/generated directories.
- `GEMINI.md` is intentionally deleted.

Confirm branch, HEAD, tag, full status, and the precise files in every deletion/move target. Preserve unrelated user changes. If application/content/media files differ from the tracked checkpoint in ways not described here, stop and report the exact files before deleting or moving anything.

## Architecture decision

Use the repository root for one application; do not create a monorepo or nested `site/` directory.

The clean foundation is:

- Node.js `24.x` LTS;
- pnpm `10.34.5` through Corepack;
- Next.js `16.3.3` App Router;
- React and React DOM `19.2.8`;
- strict TypeScript `5.9.3`;
- Tailwind CSS and `@tailwindcss/postcss` `4.3.3`, using CSS-first configuration;
- ESLint `9.39.5` with `eslint-config-next` `16.3.3` flat config;
- application routes under `src/app`;
- server components by default;
- no runtime service and no content integration in this package.

Pin every direct dependency exactly. The new lockfile is generated from the new manifest; it is not imported or compared against v1.

## Quarantine transferable source material

Before removing the old tree, create this non-runtime archive:

```text
legacy-content/
  mdx/       # every existing content/*.mdx file, preserving file names and bytes
  assets/    # every existing public/** file, preserving relative paths and bytes
```

Also preserve `app/favicon.ico` as `legacy-content/assets/favicon.ico` unless the exact byte content already exists in the asset archive.

Generate SHA-256 hashes before and after each move and prove that every quarantined file is byte-identical. Do not rewrite MDX frontmatter, optimize images, change names, or select what will ship. `content/notion-sync.json` is importer state rather than publishable content; remove it and do not archive it.

Preserve without moving or editing:

- `docs/**` — planning, content contract, and handoffs;
- `AGENTS.md`, `.gitignore`, `LICENSE`;
- Git history, `main`, and `v1-production-2026-08-28`.

After quarantine, root `content/` and `public/` must not remain. `legacy-content/` is excluded from routing, imports, compilation, lint, and deployment output. Later packages will review its files and create new canonical `content/blog`, `content/projects`, and `public` assets. The archive does not define v2 schemas or component behavior.

## Remove from the v2 branch

After verifying the exact paths, remove these inherited or abandoned implementation files:

- `app/**` (the entire v1 application tree);
- the emptied legacy `content/` and `public/` directories after the verified moves;
- `scripts/**` (the Notion importer);
- `.github/workflows/notion-content-sync.yaml`;
- the abandoned `.github/workflows/quality.yaml` from WP1B, before recreating it cleanly;
- `package.json`, `package-lock.json`, and `pnpm-lock.yaml` before creating the new manifest/lock;
- `eslint.config.mjs`, `next.config.ts`, `postcss.config.mjs`, `tailwind.config.ts`, `tsconfig.json`, and `vitest.config.ts` before creating the new configuration;
- generated `next-env.d.ts` and `tsconfig.tsbuildinfo` if present;
- the old `README.md` before replacing it with a concise v2 README.

Ignored build/install directories such as `.next` and `node_modules` may be removed only after resolving and verifying that each target is exactly inside the repository. Do not use a broad clean command, wildcard deletion, or destructive Git reset/checkout. The checkpoint tag makes tracked deletions recoverable.

Do not restore `GEMINI.md`.

## New package manifest

Create a fresh private `package.json` with only:

```json
{
  "name": "seanchoi-space",
  "version": "2.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "typecheck": "tsc --noEmit",
    "lint": "eslint .",
    "check": "pnpm typecheck && pnpm lint && pnpm build"
  },
  "engines": {
    "node": "24.x"
  },
  "packageManager": "pnpm@10.34.5",
  "dependencies": {
    "next": "16.3.3",
    "react": "19.2.8",
    "react-dom": "19.2.8"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "4.3.3",
    "@types/node": "24.13.3",
    "@types/react": "19.2.18",
    "@types/react-dom": "19.2.5",
    "eslint": "9.39.5",
    "eslint-config-next": "16.3.3",
    "tailwindcss": "4.3.3",
    "typescript": "5.9.3"
  }
}
```

Do not add Vitest yet: WP2 will introduce it with the first schema and integrity behaviors worth testing. Do not add Vercel Analytics/Speed Insights until WP8. Do not add MDX, Zod, localization, icon, font, component, formatting, or browser-test packages in WP1D.

Generate a new `pnpm-lock.yaml` using exactly pnpm 10.34.5. The final repository must contain no npm, Yarn, or Bun lockfile.

## New application and configuration

Create only these implementation files, plus the `legacy-content/` quarantine described above, unless Next.js generates `next-env.d.ts` during verification:

```text
src/app/globals.css
src/app/layout.tsx
src/app/page.tsx
.github/workflows/quality.yaml
eslint.config.mjs
next.config.ts
postcss.config.mjs
tsconfig.json
README.md
```

Requirements:

- `src/app/layout.tsx` is a server component, imports global CSS, declares basic factual-neutral metadata, and emits `<html lang="en">`.
- `src/app/page.tsx` is a semantic, intentionally minimal foundation page. It may identify the repository as “Portfolio v2 foundation” and say that content is being rebuilt. It must not invent biography, employment, project, metric, skill, or availability claims.
- Include a skip link, `<main>`, one `<h1>`, legible focus treatment, responsive spacing, and light/dark behavior through `prefers-color-scheme`. Do not implement a theme toggle yet.
- `globals.css` imports Tailwind 4 and defines a very small CSS-variable token base. No copied v1 styles.
- `postcss.config.mjs` uses `@tailwindcss/postcss`.
- `tailwind.config.ts` must not exist; Tailwind 4 is CSS-first here.
- `next.config.ts` should export an empty typed configuration unless a required setting has a demonstrated use. Do not enable experimental flags, static export, React Compiler, Cache Components, or compatibility aliases.
- `tsconfig.json` uses strict TypeScript, `moduleResolution: "bundler"`, `noEmit`, the Next plugin, `@/* -> ./src/*`, and includes Next-generated types. Do not enable `allowJs`.
- `eslint.config.mjs` uses `defineConfig` and `globalIgnores` from `eslint/config`, Next core-web-vitals and TypeScript flat configs, and ignores `.next/**`, `out/**`, `build/**`, `dist/**`, `coverage/**`, and `next-env.d.ts`. Do not disable rules.
- `README.md` briefly states the v2 purpose, active toolchain, commands, source-material boundary, and that v1 is recoverable from the checkpoint tag. Do not include old setup, secrets, Notion, database, or chatbot instructions.

## Clean CI workflow

Recreate `.github/workflows/quality.yaml` with:

- name `Quality`;
- pull-request and push triggers for `v2` and `main`;
- `permissions: contents: read`;
- cancellation of superseded runs on the same ref;
- one Ubuntu job;
- `actions/checkout@v4`;
- `pnpm/action-setup@v4` with pnpm `10.34.5` and no automatic install;
- `actions/setup-node@v4` with Node 24 and pnpm cache;
- `pnpm install --frozen-lockfile`;
- `pnpm typecheck`;
- `pnpm lint`;
- `pnpm build`.

No tests are run until WP2 introduces real tests. Add no secrets, write permissions, deployment, artifacts, matrices, or additional actions.

## Verification

Run and report each command and exit code:

```text
pnpm install --frozen-lockfile
pnpm typecheck
pnpm lint
pnpm build
pnpm check
```

Also verify mechanically:

- branch/HEAD/tag are unchanged;
- only `pnpm-lock.yaml` exists as a lockfile;
- every direct installed version equals the exact manifest version;
- no import in `src/` references v1 code, `legacy-content/`, Notion, Postgres, Gemini, Sandpack, analytics, or a removed package;
- no file remains under root `app/` or `scripts/`;
- root `content/` and `public/` do not remain; every transferable MDX/media file has a hash-identical counterpart under `legacy-content/`;
- neither `tailwind.config.ts` nor `vitest.config.ts` remains;
- the production build statically renders `/`;
- the before/after SHA-256 manifest proves all quarantined MDX/media bytes are unchanged and `content/notion-sync.json` alone was intentionally discarded as importer state;
- CI YAML parses and invokes only available scripts;
- no commit, push, deployment, branch change, tag change, or production change occurred.

All five commands must pass. A lint failure in deleted v1 code is not acceptable evidence; the v1 code must not remain in lint scope or in the v2 tree.

## Explicit exclusions

Do not implement:

- real portfolio/career copy;
- Experience, Projects, Blog, Korean, résumé, feed, sitemap, robots, redirects, or 404 routes;
- MDX loading, content rewriting, or movement beyond the exact quarantine operation;
- schemas, content validation, or tests;
- design system/components beyond the minimal accessible foundation page;
- analytics, Speed Insights, tracking, or third-party runtime services;
- database, API routes, chatbot, Notion, Sandpack, view counts, or environment variables;
- commits, pushes, deployments, Vercel settings, domain/DNS changes, or changes to `main`/the v1 tag.

Do not preserve a legacy package or file “just in case.” If it is not in the preserve list or required new-file list, report it and remove it when it belongs to the old implementation.

## Completion report

Return:

- branch, HEAD, tag target, and final Git status;
- deleted, replaced, created, and preserved file inventories;
- exact direct dependency list and installed versions;
- every verification command with exit code and concise output;
- the complete before/after content hash manifest and quarantine mapping;
- the generated route/build summary;
- any unexpected file or unresolved blocker;
- confirmation that no v1 package/version preservation work remains.

## Acceptance condition

WP1D passes only when v2 builds from a fresh minimal manifest and `src/app` tree, all quality commands are green, the legacy runtime/tooling surface is absent, legacy content/media are quarantined byte-for-byte outside the runtime for later review, and v1 remains recoverable from its tag/production branch.

## Copy/paste prompt for Gemini

> Implement only WP1D using `docs/gemini-handoffs/wp1d-clean-slate-foundation.md` as the complete authoritative specification. This clean-slate decision supersedes WP1B and WP1C: do not preserve or remediate the v1 dependency graph, application tree, configuration, workflows, scripts, or tests. Quarantine legacy MDX and media byte-for-byte under `legacy-content/` with SHA-256 proof; preserve `docs/**`, `AGENTS.md`, `.gitignore`, `LICENSE`, Git history, and the v1 checkpoint; replace the authorized technical surface with the specified minimal `src/app` foundation and exact dependencies. Validate every destructive target before removal, run every required check, and return the complete report. Do not implement later routes/content, commit, push, deploy, or change production.

# seanchoi.space — Portfolio v2

Personal engineering portfolio of Sean Choi.

## Purpose & Architecture
Portfolio v2 is a static-first, evidence-backed engineering portfolio and blog built with Next.js App Router and TypeScript. It replaces v1 with a clean-slate architecture focused on verifiable experience, performance, and accessibility.

## Toolchain & Versions
- **Node.js**: 24 LTS (`engines.node: 24.x`)
- **Package Manager**: pnpm `10.34.5`
- **Framework**: Next.js `16.3.3` (App Router)
- **UI & Language**: React `19.2.8`, TypeScript `5.9.3`
- **Styling**: Tailwind CSS `4.3.3` (CSS-first)
- **Linting**: ESLint `9.39.5` with `eslint-config-next` `16.3.3`

## Development Commands
```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Typecheck codebase
pnpm typecheck

# Run ESLint
pnpm lint

# Build for production
pnpm build

# Run all quality checks
pnpm check
```

## Legacy V1 Checkpoint & Source Quarantine
- **Production Checkpoint**: V1 remains recoverable from the local `v1-production-2026-08-28` checkpoint tag and the existing Git history. The tag has not yet been pushed.
- **Legacy Content Quarantine**: Historical MDX and media are preserved under `legacy-content/` for review and controlled migration in later work packages. They are excluded from runtime compilation.

## Release channels
| Channel | Where | Shows |
| --- | --- | --- |
| Production | `seanchoi.space` (branch `main`) | Approved content only |
| Preview | `dev.seanchoi.space` (branch `v2`), Vercel previews, `pnpm dev` | Everything, including unapproved case studies, Korean drafts, blog drafts, and `/_print/portfolio`, with a preview banner; never indexed |

The switch is `isPreviewChannel()` in `src/lib/release-channel.ts` (`NODE_ENV=development` or `VERCEL_ENV=preview`).
To publish a case study, set `approved: true` in `src/data/case-studies.ts`. To publish a post, set its `publicationStatus` to `public` and `claimState` to `verified`, and add `reviewedOn`.
Korean drafts render on preview only; production shows Korean once a field is marked `koReview: "reviewed"`.

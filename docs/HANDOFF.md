# Handoff: where seanchoi.space stands

Last updated 2026-10-01. Read this first when continuing on another machine or in a new session.

## How changes ship

| Branch | Deploys to | Shows |
| --- | --- | --- |
| `v2` | dev.seanchoi.space (Vercel preview, login-protected) | Everything, including unapproved content, with a preview banner |
| `main` | seanchoi.space (production) | Approved content only |

- Work on `v2`, push it, check dev.seanchoi.space.
- **`main` changes only through a pull request** (`gh pr create --base main --head v2`), which Sean reviews and merges. Never `git push origin v2:main`.
- The switch between the two is `isPreviewChannel()` in `src/lib/release-channel.ts`. See "Release channels" in the README.

## Waiting on Sean's approval

**Case studies** (`src/data/case-studies.ts`): `indy7-digital-twin` and `bamboochat` both have `approved: false`, so production hides them. Set `approved: true` once the English is signed off.

**Korean copy:** review sheet at [`korean-review/2026-10-01.md`](korean-review/2026-10-01.md), listing only rows still pending.
- Approved and applied (marked with `reviewed(...)`): t1, t3, t4, t5, t6, t7.
- t2 (digital twin summary): deliberately left unapproved. Sean's edit said it runs on the real control network, which contradicts "not validated on hardware" (t5, t40, and the English). Resolve the fact first, then the wording.
- Remaining: t8–t45, b1–b34, c1–c2. c1 and c2 are comments in `src/data/content.ts` with `koReview: "missing"`.
- A Korean page shows Korean only when every field of that case study is reviewed; until then it shows English (or the draft, on dev).
- Sean prefers an in-chat review form (approve/edit per row, then "Send to Claude") over editing the Markdown. Ask Claude to "show the Korean review form" and it can regenerate one from the source.

**Blog drafts** (`content/blog/*.en.mdx`, `publicationStatus: "draft"`): "Following one PLC signal through a digital twin" and "Running a chat app for my class on one classroom PC". To publish: `publicationStatus: "public"`, `claimState: "verified"`, add `reviewedOn`. A RUTA40 debugging post needs Sean's story notes first.

## Open decisions

- BambooChat "problem" paragraph (b9) was inferred by Claude, not stated by Sean.
- Two plans exist: the M0–M6 milestones from 2026-10-01 (M0–M5 done; M6 is the training-end update after 2026-12-24) and the Sep 30 overhaul proposal in `codex-handoffs/portfolio-overhaul-benchmark-plan.md` (routes, public PDF, featured case studies). Pick one direction.
- Phrase-style tags in Korean cards ("Business rules", "Team MVP") may need translating or trimming.

## Useful commands

```bash
pnpm dev               # local preview channel (shows everything)
pnpm check             # typecheck, lint, tests, build
pnpm portfolio:pdf     # private PDF to private/portfolio/ (needs pnpm dev running)
```

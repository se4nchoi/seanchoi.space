# Project-led visual preview — 2026-09-21

## Scope and approval

Sean authorized the next portfolio pass and explicitly approved all three supplied images for public assets. This is a WP6 preview presentation pass, not WP7 acceptance or production cutover. Commit locally; no push or deployment.

## Changes

- Added `public/work/ruta40-app.jpg`, `molipdo.png`, and `plc-wiring.jpg` as byte-for-byte copies of the approved evidence images; private originals remain untouched.
- Added `src/data/work-media.ts` with dimensions, EN/KO alt text, and bounded captions; added `work-media.test.ts` for references, file existence, size budget, and localized descriptions.
- Added `src/components/ui/work-image.tsx` using responsive Next Image output, explicit dimensions, eager hero loading, and lazy project covers. Source assets are each below 650 KB; no image tooling/dependency added.
- Updated Home to pair the introduction with the PLC wiring exercise photo and show RUTA40/몰입도 image-led cards. Updated Projects to use the same assets.
- Updated `engineering-evidence-card.tsx` with optional media and side-by-side completed/planned scope on wider screens; contribution boundaries remain visible.
- Added localized rendering assertions in `pages.test.tsx`; updated the content contract, exploration report, and implementation plan with approval and current status.

## Verification

- `pnpm typecheck`: passed.
- `pnpm lint`: passed.
- `pnpm test`: 187/187 tests passed across 17 files.
- `pnpm build`: passed, including 12/12 production-content tests and generation of 13 static pages.
- Browser: English desktop Home and selected work, Korean Home at 390px, English Projects at 768px inspected on the existing local dev server. Tablet DOM check: document width equals available viewport width (753px), all three project images loaded, all project images lazy-loaded.
- `git diff --check`: passed.

## Acceptance and remaining risks

The bounded visual pass is implemented: approved real imagery, responsive composition, localized image descriptions, and preserved factual scope. No new professional claims, routes, dependencies, editorial approval states, or production settings changed. No private résumé material copied.

This is not final visual approval or a WCAG/performance certification. Full light/dark, keyboard, zoom/reflow, performance, final EN/KO editorial review, and LinkedIn consistency remain outstanding. Recheck current robot implementation before advancing completed/planned claims; LAN Chat and AMR remain outside the selected-work promotion decision.

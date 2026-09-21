# Project-led preview pass — 2026-09-21

Sean authorized a bounded implementation pass after the evidence review and career-ledger discussion, under limited remaining quota.

## Implemented

- Home: short web-to-physical-systems introduction; RUTA40 and 몰입도 selected work; current robot-cell project; contact/profile links.
- Removed homepage degree line, duplicate hardware/LAN Chat features, and the five-group skills inventory. The underlying records remain on Experience/Projects.
- Simplified EN/KO project headings and card metadata. Contribution text remains visible; current-work completed/planned scopes remain distinct.
- Moved editorial-preview notices to the bottom of Home and Projects; did not change editorial approval states.
- Updated homepage metadata language and documented the superseding preview direction.
- Korean homepage preserves word boundaries on narrow screens.

## Verification

- TypeScript: passed.
- ESLint: passed.
- Vitest: 186/186 passed across 16 files.
- Production content check: 12/12 passed.
- Next production build: passed; 13 static pages generated.
- git diff --check: passed (Windows line-ending notices only).
- Browser: English desktop Home, Korean 390px Home and Projects inspected on the existing localhost:3000 server.
- Last post-build change was the Korean homepage word-break utility; confirmed visually through hot reload.

The first test run exposed an existing canonical-registry test frozen at August 31 despite September 17 records. That one live-content test now uses the actual date. Fixed-date rejection fixtures and the validator are unchanged.

## Next pass

This is a structure/typography pass, not the completed visual overhaul. Select a distinctive hero asset and project covers; confirm disclosure before moving private evidence media into public assets. Prefer actual artifacts over decorative diagrams. Review the latest robot-cell implementation before changing completed/planned claims. Revisit LAN Chat's recent game-oriented evolution and AMR authorship before promoting either. Full light/dark, tablet, keyboard, and final bilingual editorial review remain.

No new case-study routes, dependencies, private-media imports, commits, pushes, or deployments.

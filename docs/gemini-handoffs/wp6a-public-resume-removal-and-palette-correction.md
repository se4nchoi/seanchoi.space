# Portfolio v2 — WP6A Public Résumé Removal and Palette Correction

## Authority and objective

Implement only this corrective package in `seanchoi.space`. Read `AGENTS.md`, `docs/portfolio-v2-exploration-report.md`, `docs/portfolio-v2-implementation-plan.md`, and `docs/portfolio-content-contract.md` completely before editing.

The approved outcome is a clean, minimal v2 interface with no public résumé feature and no green/teal brand or UI accent. This corrects the product boundary and design tokens before factual WP6 work; it does not authorize career-content population.

## Required implementation

### Remove the public résumé feature completely

- Delete `src/components/ui/resume-action.tsx`.
- Remove its import and rendering from `src/components/pages/home-page-view.tsx`.
- Remove `resumeLabel` and `resumeUnavailable` from dictionary types and both locale dictionaries.
- Remove résumé-action expectations from component/page tests.
- Remove `resumeMetadataSchema`, its inferred type, and the `resumes` field from the content-registry schema.
- Remove the synthetic résumé fixture and every `resumes` registry value from fixtures and launch data.
- Update schema and integrity tests for the corrected registry shape without weakening unrelated checks.
- Ensure there is no résumé PDF asset, route, download action, metadata, or analytics event.
- Keep the homepage's existing `View projects` action. Do not invent a replacement CTA or add contact UI until its destination is contract-verified.

### Apply the approved minimal neutral-and-blue palette

| Token | Light | Dark |
|---|---:|---:|
| background | `#fdfdfd` | `#111010` |
| surface | `#ffffff` | `#181717` |
| foreground | `#171717` | `#f5f5f5` |
| muted | `#525252` | `#a3a3a3` |
| border | `#d4d4d4` | `#404040` |
| accent/focus | `#0b63b6` | `#7bb8ff` |
| accent foreground | `#ffffff` | `#111010` |

- Replace current accents `#0b6b57` and `#7bdcb5`.
- Route links, focus indicators, selection, buttons, tags, and existing semantic consumers through the approved tokens consistently.
- Preserve system dark mode, reduced motion, focus visibility, semantic structure, reading rhythm, and responsive layout.
- Keep the visual character clean and editorial. Add no gradients, decorative textures, spectacle shadows, extra animation, terminal styling, or new visual system.
- No green or teal may remain as a brand/UI accent. Syntax highlighting is subordinate content styling, but pages must not retain a greenish overall identity.
- Update token/component tests for the new palette and semantics.

## Architecture and dependencies

- Preserve App Router, server-component preference, static-first architecture, content registry, localization, and CSS-token system.
- No dependency or version change is authorized.
- No new client component, route, schema domain, analytics integration, content source, service, or configuration layer is authorized.
- Deleting obsolete résumé code and schema fields is explicitly authorized.

## Inspection and verification

Inspect Git status first. Preserve and report Codex's pre-existing documentation amendments separately from implementation.

Run and report exact results for: `git diff --check`; typecheck; lint; the complete test suite; production content/integrity check; ordinary production build; `VERCEL_ENV=preview` production build; and the established HTTP route/status matrix.

Also verify:

- `rg` finds neither old accent literal in owned v2 source/tests.
- `rg` finds no public résumé UI copy, `ResumeMetadata`, `resumeMetadataSchema`, `resume-action`, or registry `resumes` field in `src`.
- Representative English and Korean routes render correctly in light/dark modes at one mobile and one laptop viewport.
- Focus, text, and interactive states remain distinguishable; report the contrast check and result.
- Homepage contains `View projects` but no résumé or invented contact action.

If an established command differs, inspect `package.json`, run the corresponding existing script, and report it exactly rather than adding an alias.

## Explicit exclusions

- Do not populate or translate factual identity, career, skill, project, contact, or social-link content.
- Do not add a PDF, `/resume` route, document download, contact form, or unverified email link.
- Do not redesign structure, navigation, cards, typography, spacing, or hierarchy beyond the corrected tokens and removed action.
- Do not change blog, historical URLs, feed, sitemap semantics, SEO/analytics infrastructure, or later WP6–WP9 scope.
- Do not edit authoritative product documents; report a blocking contradiction to Codex.
- Do not commit, push, deploy, switch branches, or change production.

## Stop conditions and return format

Do not choose product, schema, factual, architecture, dependency, or visual-direction decisions. If a consequential conflict exists, stop and return the exact file, conflict, and decision required.

Otherwise return changed/deleted files; behavior and visual changes; exact command results; visual/contrast verification; assumptions and risks; each acceptance item satisfied/unsatisfied; and confirmation that no commit, push, deploy, branch switch, or production change occurred.

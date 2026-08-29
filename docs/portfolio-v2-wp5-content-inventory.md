# Portfolio v2 — WP5 legacy article inventory

**Status:** Sean-approved disposition record, 2026-08-29

## Launch decision

Portfolio v2 will launch with the blog platform and **zero public articles**. The five v1 articles are preserved only as draft source ideas for later editorial work. They are not authoritative copy and must not be exposed by production routes, metadata, feed, sitemap, related-content logic, or search-engine discovery.

Possible v2.1, v2.2, or v3 topics—including RAG/chatbot work or other technical projects—are future possibilities, not current product commitments or completed-project claims.

## Approved dispositions

| Historical slug | Launch state | Later work required |
| --- | --- | --- |
| `retrospect-hoek-agency` | Preserved draft idea | Reconcile dates, role, contribution boundaries, metrics, disclosure rights, and screenshots under WP6 factual review before any rewrite. |
| `retrospect-emg-global` | Preserved draft idea | Reconcile employment facts, funding/sales attribution, performance figures, platform ownership, APIs/hardware claims, disclosure rights, and screenshots under WP6 factual review. |
| `vimium-keyboard-lover-s-bestfriend-on-the-web` | Preserved draft idea | Recheck current product behavior, edit the copy, and review screenshot ownership, privacy, crops, optimization, and alt intent. |
| `how-to-use-notion-as-your-blog-post-database` | Preserved draft idea | Rewrite as historical or current technical material only if it remains useful; remove stale v1 architecture assumptions and reverify all time-sensitive API claims and links. |
| `how-to-persist-images-on-notion-pages-made-from-notion-to-md` | Preserved draft idea | Rewrite only with complete, current, safe implementation guidance; remove stale importer/repository assumptions and review its screenshot. |

No launch article is approved for revision or publication in WP5.

## Historical URL policy

On 2026-08-29, all five bare-host URLs redirected to `https://www.seanchoi.space/...`, and the final historical URLs returned HTTP 200. The v2 code currently centralizes `SITE_URL` as `https://seanchoi.space`, creating a canonical-host question for deployment review.

At v2 cutover, these retired public documents may return honest 404 responses because no relevant replacement content exists. Do not redirect them to Home, Blog, or an unrelated article merely to preserve status codes. Record all five slugs in a historical-route manifest so their intentional retirement is tested. A later reviewed article may claim a slug or receive a specific permanent redirect only through a separately approved migration decision.

## Asset inventory

The articles reference 17 unique legacy images: two Hoek, three EMG, five Vimium, six Notion-database, and one Notion-image asset. Most references have empty alt text; the two non-empty strings are not publication-ready alt decisions.

Keep these files under `legacy-content/` as untrusted source material. WP5 must not copy them into the public v2 asset tree. Any later reuse requires content value, ownership, privacy, dimensions, optimization, stable descriptive naming, and purposeful alt or decorative treatment to be reviewed first.

## Runtime decision

Do not port the v1 blog runtime. It combines regex-style filesystem parsing, Postgres view counts, no-store rendering, relative dates, archived `next-mdx-remote`, optional Sandpack, and a scheduled Notion importer that mutates the repository without complete pagination or delete/unpublish/rename reconciliation.

None of the five legacy MDX files uses Sandpack. WP5 has no demonstrated need for it.

## WP5 gate

WP5 is now a platform-and-retirement package:

1. build the validated static local-MDX platform with non-public synthetic fixtures;
2. emit a valid empty feed and no article sitemap entries;
3. preserve the five source ideas only under `legacy-content/`;
4. explicitly test that every historical slug returns a real 404 without content or metadata leakage;
5. document canonical-host verification as a launch risk.

Future article publication is a later, separately reviewed content iteration. WP5 acceptance must not depend on fabricating an article for launch.

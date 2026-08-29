# Portfolio v2 — WP5C acceptance-gate remediation

## Verdict

WP5 remains unaccepted. The WP5B corrections resolved the identity, metadata-scope, sitemap, feed, preview-retirement, and default asset-discovery findings, but independent review found two remaining contract failures. Preserve the current working tree and change only the files named below. Add no dependency. Do not commit, push, deploy, tag, change branches, migrate legacy content/assets, or begin WP6–WP9.

## 1. Make source-file and module-registry validation genuinely one-to-one

The filesystem wrapper currently reconstructs an assumed path from `slug` and `locale` instead of passing the path of the file it actually read. It also reads the directory without the required deterministic sort. The pure validator checks a per-record path mismatch, but it does not reject duplicate article source paths, duplicate registry source paths, or a registry entry whose embedded `id` differs from its key.

Correct `src/lib/content/blog.ts` as follows:

- sort the discovered `content/blog/*.mdx` filenames before parsing;
- retain the normalized repository-relative path of each actual file read and pass that exact path to `validateBlogArticlesIntegrity`;
- do not derive the actual source path from frontmatter `slug` or `locale`;
- reject duplicate normalized `filePath` values among article descriptors;
- reject duplicate normalized `filePath` values among registry entries;
- reject every registry entry whose object `id` differs from its registry key;
- continue requiring every parsed article ID to have exactly one registry entry, every registry entry to have exactly one parsed file, the registry path to equal the actual file path, and the validated frontmatter ID to equal the registry ID.

Keep path normalization platform-independent by using repository-relative forward-slash paths such as `content/blog/example-article.en.mdx`.

Add virtual-fixture tests in `src/lib/content/blog.test.ts` that would fail with the current implementation:

- two distinct article IDs/descriptors using the same source path;
- two registry IDs pointing to the same source path;
- a registry key whose embedded `id` is different;
- a descriptor whose frontmatter slug/locale could suggest the expected filename but whose actual path differs;
- deterministic sorted filesystem discovery, tested without making tests depend on the host directory enumeration order.

Do not add a generator or dynamic import discovery.

## 2. Reject all non-contract Figure and Callout prop syntax

The current source validator accepts arbitrary expressions in at least `Figure alt` and `Figure caption`. It also accepts quoted numeric dimensions even though `FigureMdx` requires runtime numbers, and it accepts a bare `decorative` attribute even though the approved syntax is `decorative={true}`. This means source validation can pass content that violates the conservative authoring contract or fails during real rendering.

Correct `src/lib/content/source-validator.ts` without changing `FigureMdx`'s runtime types:

- `Callout type` must be a quoted static string and one of `note`, `warning`, `info`, or `tip`;
- optional `Callout title` must be a quoted static string;
- `Figure src`, `alt`, and optional `caption` must be quoted static strings;
- `Figure width` and `height` must use a brace-wrapped positive base-10 integer literal, for example `width={800}`; quoted numbers, arithmetic, identifiers, calls, template literals, decimals, zero, negatives, `NaN`, and `Infinity` fail;
- `Figure decorative`, when present, must be exactly `decorative={true}`; bare or quoted forms fail;
- continue rejecting all unknown props and prop spreads;
- reject duplicate props on one component;
- reject any unparsed attribute text or malformed attribute syntax rather than silently ignoring it;
- preserve the existing alt/decorative, asset declaration/existence, path, duplicate-reference, raw-tag, heading, fence, and link rules.

Add focused source-string tests in `src/lib/content/source-validator.test.ts` for:

- `caption={someValue}` and `alt={someValue}`;
- expression-valued Callout title and Figure string props;
- `width="800"`, `height={400 + 50}`, and non-integer numeric forms;
- bare `decorative` and `decorative="true"`;
- duplicate props;
- malformed or otherwise unconsumed attribute text;
- one canonical valid Callout and Figure using only the approved syntax.

The tests must assert source rejection; do not simulate MDX compilation.

## 3. Verification and report

Run and report exact results for:

1. `git diff --check`;
2. `pnpm typecheck`;
3. `pnpm lint`;
4. `pnpm test`;
5. `pnpm content:check`;
6. `pnpm build`;
7. the established ordinary production HTTP matrix, including the five exact retired historical article URLs;
8. the established preview build/runtime matrix.

Also report the changed files, behavior changes, assumptions, and acceptance criteria. Confirm no new dependency, temporary file, public article, factual claim, identity, legacy migration, Git operation, or deployment operation.

WP5 remains unaccepted until Codex independently reviews this focused remediation.

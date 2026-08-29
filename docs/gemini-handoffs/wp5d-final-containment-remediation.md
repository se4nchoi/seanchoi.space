# Portfolio v2 — WP5D final containment remediation

## Verdict

WP5 remains unaccepted. WP5C fixed the originally identified registry-path and prop-value cases, and the ordinary suite passes, but independent adversarial review proved that malformed MDX can still pass source validation and that missing source paths/content directories can still bypass one-to-one validation. Implement only the corrections below. Add no dependency. Do not commit, push, deploy, tag, change branches, migrate legacy content/assets, or begin WP6–WP9.

## 1. Make the allowed-component scanner fail closed

The following source strings currently return `valid: true`; each must fail:

```text
<Figure
<Figure src="/a.png" width={1} height={1} alt="A"
<Callout type="note"
<Callout title="Only title">x</Callout>
<Callout type="note"title="No separator">x</Callout>
```

Correct `src/lib/content/source-validator.ts` so every `Callout` or `Figure` token outside code is fully recognized and consumed rather than being ignored when its opening tag is incomplete.

- Require every opening tag to terminate correctly outside quoted strings and brace values.
- Require whitespace between adjacent attributes. Concatenated attributes such as `type="note"title="x"` fail.
- Require `Callout` to include the `type` prop. It remains a quoted static string limited to `note`, `warning`, `info`, or `tip`; `title` remains optional.
- Require a non-self-closing `Callout` to have a matching closing tag. Reject unmatched closing tags and malformed/incomplete allowed-component tags.
- Require `Figure` to use the self-closing form. Reject paired, incomplete, or unmatched Figure tags.
- Continue consuming the complete attribute string and rejecting unknown, duplicate, spread, expression-valued, or malformed props.
- After converting dimension literals, require the runtime value to be a finite positive safe integer. Reject digit strings whose JavaScript numeric conversion is non-finite or unsafe.
- Reject executable body-level MDX expressions outside fenced code, inline code, and the two exact allowed brace-valued props: positive integer `Figure` dimensions and `decorative={true}`. The documented prose surface does not include arbitrary `{expression}` execution.
- Preserve all existing heading, link, asset, raw-tag, event-handler, ESM, client-directive, and fence rules.

Add direct source-string tests for every sample above, unmatched/missing closing tags, paired Figure tags, unsafe/non-finite huge dimensions, and a prose expression such as `{globalThis.process}`. The test described as malformed syntax must exercise genuinely malformed or incomplete syntax, not merely a syntactically valid unknown bare prop.

## 2. Remove the remaining one-to-one validation bypasses

Correct `src/lib/content/blog.ts` and its tests:

- Make `ArticleDescriptor.filePath` required. The pure integrity function must reject a missing or blank normalized source path instead of skipping path checks.
- Do not return early when `content/blog` is absent. Treat absence as zero discovered files and run registry validation, so existing registry entries become orphan errors and the pipeline fails closed.
- The same orphan failure must occur when the directory exists but contains no MDX files while the registry is nonempty.
- Extract or inject the filename-ordering operation so its test starts from an explicitly unsorted virtual list. Do not infer source filenames from article slug/locale, and do not let the deterministic-order test depend on the host filesystem already returning alphabetical entries.
- Keep actual repository-relative forward-slash paths from the files read and preserve the WP5C duplicate/path/key checks.

Add focused tests proving missing/blank descriptor paths fail, absent/empty discovery cannot bypass a nonempty registry, and an explicitly unsorted filename list is returned in deterministic order.

## 3. Verification and report

Run and report exact results for `git diff --check`, `pnpm typecheck`, `pnpm lint`, `pnpm test`, `pnpm content:check`, and `pnpm build`. Re-run the established production and preview HTTP matrices because the content pipeline is used during route generation.

Report changed files, behavior changes, assumptions, and each satisfied acceptance criterion. Confirm zero public articles and no dependency, temporary file, invented claim/identity, legacy migration, Git operation, or deployment operation.

WP5 remains unaccepted until Codex independently reviews this final containment remediation.

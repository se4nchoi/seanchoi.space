# Portfolio v2 — WP5E ordered scanner correction

## Verdict

The WP5D registry/discovery remediation is accepted. WP5 remains unaccepted only because the source scanner still uses count-based Callout matching and single-backtick-only inline-code masking. The ordinary 165-test suite does not cover these cases.

Independent probes produced:

```text
</Callout>
<Callout type="note">x
```

Result: `valid: true` — incorrect because the closing tag precedes the opening tag.

```markdown
Use ``{literal}`` here.
```

Result: `valid: false` — incorrect because the braces are inside a valid Markdown inline-code span.

Change only `src/lib/content/source-validator.ts` and `src/lib/content/source-validator.test.ts`. Add no dependency and make no unrelated formatting or code changes. Do not commit, push, deploy, tag, change branches, migrate content/assets, or begin WP6–WP9.

## Required correction

Replace count-only Callout pairing with ordered validation:

- process recognized Callout opening, self-closing, and closing tokens in source order outside fenced and inline code;
- a paired opening tag pushes one Callout onto a stack;
- a self-closing Callout does not change the stack;
- a closing tag requires a currently open Callout and pops it;
- a closing tag with an empty stack fails immediately;
- any remaining open Callout at end of source fails;
- retain the complete tag-termination, attribute, required-type, and malformed-token checks already added;
- do not accept correctness based only on equal opening/closing counts.

Mask Markdown inline-code spans using matching backtick-run delimiters, not only one backtick:

- support valid single- and multiple-backtick code spans;
- braces and tag-like text inside a matched code span are inert for the JSX/expression checks;
- preserve fenced-code masking;
- fail closed on an unmatched inline-code delimiter rather than executing or misclassifying its contents;
- do not mask prose outside the matched delimiter pair.

Add focused regression tests that:

1. reject a Callout closing tag before its opening tag;
2. reject an extra early closing tag even when total opening and closing counts are equal;
3. accept `Use \`{literal}\` here.`;
4. accept `Use \`\`{literal}\`\` here.`;
5. accept tag-like text and braces inside a matched multi-backtick code span;
6. reject the same executable expression or malformed tag when it appears outside code;
7. reject an unmatched inline-code delimiter.

Run and report `git diff --check`, `pnpm typecheck`, `pnpm lint`, `pnpm test`, `pnpm content:check`, and `pnpm build`. Confirm that only the two authorized files changed for WP5E and that no dependency or Git/deployment operation occurred.

WP5 remains unaccepted until Codex independently reruns the adversarial probes and complete acceptance gates.

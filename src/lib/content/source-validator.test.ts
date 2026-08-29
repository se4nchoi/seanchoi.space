import { describe, it, expect } from "vitest";
import { validateMdxSource } from "./source-validator";

describe("MDX Source Validator (Conservative Subset & Containment)", () => {
  it("accepts canonical valid Callout and Figure components with approved syntax", () => {
    const validMdx = `
## First Heading

This is a paragraph with a [safe link](/experience) and an [external link](https://example.com/docs).

<Callout type="note" title="Custom Title">
Helpful contextual note.
</Callout>

<Figure src="/assets/diagram.png" width={800} height={450} alt="Architecture Diagram" caption="System layout" />

### Subheading Plain Text

More text here.
`;

    const result = validateMdxSource(validMdx, {
      articleId: "test-art",
      declaredAssetPaths: ["/assets/diagram.png"],
      availableAssets: new Set(["/assets/diagram.png"]),
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toEqual([]);
    expect(result.referencedAssets).toEqual(["/assets/diagram.png"]);
  });

  it("accepts decorative Figure without alt text when exactly decorative={true}", () => {
    const validMdx = `
<Figure src="/assets/decorative.png" width={400} height={200} decorative={true} />
`;

    const result = validateMdxSource(validMdx, {
      articleId: "test-art",
      declaredAssetPaths: ["/assets/decorative.png"],
      availableAssets: new Set(["/assets/decorative.png"]),
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  describe("WP5E Ordered Callout Scanner & Multi-Backtick Inline-Code Masking", () => {
    it("1. rejects a Callout closing tag before its opening tag", () => {
      const closingBeforeOpen = `
</Callout>
<Callout type="note">
x
</Callout>
`;
      const res = validateMdxSource(closingBeforeOpen, {
        articleId: "test-art",
        declaredAssetPaths: [],
      });
      expect(res.valid).toBe(false);
      expect(
        res.errors.some((e) =>
          e.includes("Closing tag '</Callout>' found without a matching open <Callout> tag")
        )
      ).toBe(true);
    });

    it("2. rejects an extra early closing tag even when total opening and closing counts are equal", () => {
      const probeMdx = `
</Callout>
<Callout type="note">x
`;
      const res = validateMdxSource(probeMdx, {
        articleId: "test-art",
        declaredAssetPaths: [],
      });
      expect(res.valid).toBe(false);
      expect(
        res.errors.some((e) =>
          e.includes("Closing tag '</Callout>' found without a matching open <Callout> tag")
        )
      ).toBe(true);
      expect(
        res.errors.some((e) => e.includes("Unclosed <Callout> tag at end of document"))
      ).toBe(true);
    });

    it("3. accepts single-backtick inline-code containing braces: Use `{literal}` here.", () => {
      const singleBacktickMdx = `
## Section

Use \`{literal}\` here.
`;
      const res = validateMdxSource(singleBacktickMdx, {
        articleId: "test-art",
        declaredAssetPaths: [],
      });
      expect(res.valid).toBe(true);
      expect(res.errors).toEqual([]);
    });

    it("4. accepts multi-backtick inline-code containing braces: Use ``{literal}`` here.", () => {
      const doubleBacktickMdx = `
## Section

Use \`\`{literal}\`\` here.
`;
      const res = validateMdxSource(doubleBacktickMdx, {
        articleId: "test-art",
        declaredAssetPaths: [],
      });
      expect(res.valid).toBe(true);
      expect(res.errors).toEqual([]);
    });

    it("5. accepts tag-like text and braces inside a matched multi-backtick code span", () => {
      const tagInCodeMdx = `
## Section

Reference syntax: \`\`<Callout type="note"> {executable} </Callout>\`\` in documentation.
`;
      const res = validateMdxSource(tagInCodeMdx, {
        articleId: "test-art",
        declaredAssetPaths: [],
      });
      expect(res.valid).toBe(true);
      expect(res.errors).toEqual([]);
    });

    it("6. rejects the same executable expression or malformed tag when appearing in prose outside code", () => {
      const proseExpr = `
## Section

Use {literal} here in prose.
`;
      const resExpr = validateMdxSource(proseExpr, {
        articleId: "test-art",
        declaredAssetPaths: [],
      });
      expect(resExpr.valid).toBe(false);
      expect(
        resExpr.errors.some((e) =>
          e.includes("Prohibited executable MDX expression found in body prose")
        )
      ).toBe(true);

      const proseMalformedTag = `
## Section

Use <Callout type="note" here in prose.
`;
      const resTag = validateMdxSource(proseMalformedTag, {
        articleId: "test-art",
        declaredAssetPaths: [],
      });
      expect(resTag.valid).toBe(false);
    });

    it("7. rejects an unmatched inline-code delimiter", () => {
      const unclosedInlineCode = `
## Section

Use \`unclosed inline code delimiter without matching backtick.
`;
      const res = validateMdxSource(unclosedInlineCode, {
        articleId: "test-art",
        declaredAssetPaths: [],
      });
      expect(res.valid).toBe(false);
      expect(
        res.errors.some((e) =>
          e.includes("Unclosed inline code span delimiter")
        )
      ).toBe(true);
    });
  });

  it("rejects incomplete, unclosed, or missing-prop component tokens (WP5D scanner fail-closed)", () => {
    // 1. Incomplete Figure token
    const incompleteFigure = `<Figure`;
    expect(
      validateMdxSource(incompleteFigure, {
        articleId: "test-art",
        declaredAssetPaths: [],
      }).valid
    ).toBe(false);

    // 2. Unclosed Figure opening tag
    const unclosedFigureTag = `<Figure src="/a.png" width={1} height={1} alt="A"`;
    expect(
      validateMdxSource(unclosedFigureTag, {
        articleId: "test-art",
        declaredAssetPaths: ["/a.png"],
      }).valid
    ).toBe(false);

    // 3. Incomplete Callout token
    const incompleteCallout = `<Callout type="note"`;
    expect(
      validateMdxSource(incompleteCallout, {
        articleId: "test-art",
        declaredAssetPaths: [],
      }).valid
    ).toBe(false);

    // 4. Callout missing required type prop
    const onlyTitleCallout = `<Callout title="Only title">x</Callout>`;
    const resOnlyTitle = validateMdxSource(onlyTitleCallout, {
      articleId: "test-art",
      declaredAssetPaths: [],
    });
    expect(resOnlyTitle.valid).toBe(false);
    expect(
      resOnlyTitle.errors.some((e) =>
        e.includes("Callout component requires 'type' attribute")
      )
    ).toBe(true);

    // 5. Concatenated attributes without whitespace separator
    const noSeparatorCallout = `<Callout type="note"title="No separator">x</Callout>`;
    const resNoSep = validateMdxSource(noSeparatorCallout, {
      articleId: "test-art",
      declaredAssetPaths: [],
    });
    expect(resNoSep.valid).toBe(false);
    expect(
      resNoSep.errors.some((e) =>
        e.includes("Missing whitespace separator between attributes")
      )
    ).toBe(true);
  });

  it("rejects paired Figure tags and unmatched Callout tags", () => {
    const pairedFigure = `
<Figure src="/a.png" width={100} height={100} alt="A">child content</Figure>
`;
    const resPairedFigure = validateMdxSource(pairedFigure, {
      articleId: "test-art",
      declaredAssetPaths: ["/a.png"],
      availableAssets: new Set(["/a.png"]),
    });
    expect(resPairedFigure.valid).toBe(false);
    expect(
      resPairedFigure.errors.some((e) =>
        e.includes("Figure components must be strictly self-closing")
      )
    ).toBe(true);

    const unclosedCallout = `
<Callout type="note">
Missing closing tag.
`;
    const resUnclosedCallout = validateMdxSource(unclosedCallout, {
      articleId: "test-art",
      declaredAssetPaths: [],
    });
    expect(resUnclosedCallout.valid).toBe(false);
    expect(
      resUnclosedCallout.errors.some((e) => e.includes("Unclosed <Callout> tag at end of document"))
    ).toBe(true);

    const orphanClosingCallout = `
Prose content.
</Callout>
`;
    const resOrphan = validateMdxSource(orphanClosingCallout, {
      articleId: "test-art",
      declaredAssetPaths: [],
    });
    expect(resOrphan.valid).toBe(false);
  });

  it("rejects unsafe, non-finite, or huge dimensions on Figure", () => {
    const hugeWidth = `
<Figure src="/assets/a.png" width={9007199254740992} height={450} alt="A" />
`;
    const resHuge = validateMdxSource(hugeWidth, {
      articleId: "test-art",
      declaredAssetPaths: ["/assets/a.png"],
      availableAssets: new Set(["/assets/a.png"]),
    });
    expect(resHuge.valid).toBe(false);
    expect(
      resHuge.errors.some((e) =>
        e.includes("Figure 'width' must be a finite positive safe integer")
      )
    ).toBe(true);
  });

  it("rejects executable body-level MDX expressions in prose", () => {
    const proseWithProcess = `
## Heading

Some text with {globalThis.process} embedded in body prose.
`;
    const resProcess = validateMdxSource(proseWithProcess, {
      articleId: "test-art",
      declaredAssetPaths: [],
    });
    expect(resProcess.valid).toBe(false);
    expect(
      resProcess.errors.some((e) =>
        e.includes("Prohibited executable MDX expression found in body prose")
      )
    ).toBe(true);

    const proseWithArithmetic = `
## Heading

Calculation: {1 + 1} is two.
`;
    const resArith = validateMdxSource(proseWithArithmetic, {
      articleId: "test-art",
      declaredAssetPaths: [],
    });
    expect(resArith.valid).toBe(false);
  });

  it("rejects genuinely malformed attribute syntax on components", () => {
    const malformedSyntax = `
<Figure src="/assets/a.png" width={800} height={450} alt="A" ==malformed />
`;
    const res = validateMdxSource(malformedSyntax, {
      articleId: "test-art",
      declaredAssetPaths: ["/assets/a.png"],
      availableAssets: new Set(["/assets/a.png"]),
    });
    expect(res.valid).toBe(false);
    expect(
      res.errors.some((e) => e.includes("Malformed attribute syntax"))
    ).toBe(true);
  });

  it("rejects expression-valued string props on Figure (alt={someValue}, caption={someValue}, src={mySrc})", () => {
    const exprAlt = `
<Figure src="/assets/a.png" width={800} height={450} alt={someValue} />
`;
    const resAlt = validateMdxSource(exprAlt, {
      articleId: "test-art",
      declaredAssetPaths: ["/assets/a.png"],
      availableAssets: new Set(["/assets/a.png"]),
    });
    expect(resAlt.valid).toBe(false);
    expect(
      resAlt.errors.some((e) =>
        e.includes("Figure 'alt' must be a static quoted string")
      )
    ).toBe(true);

    const exprCaption = `
<Figure src="/assets/a.png" width={800} height={450} alt="Valid" caption={captionVar} />
`;
    const resCap = validateMdxSource(exprCaption, {
      articleId: "test-art",
      declaredAssetPaths: ["/assets/a.png"],
      availableAssets: new Set(["/assets/a.png"]),
    });
    expect(resCap.valid).toBe(false);
    expect(
      resCap.errors.some((e) =>
        e.includes("Figure 'caption' must be a static quoted string")
      )
    ).toBe(true);

    const exprSrc = `
<Figure src={mySrc} width={800} height={450} alt="Valid" />
`;
    const resSrc = validateMdxSource(exprSrc, {
      articleId: "test-art",
      declaredAssetPaths: ["/assets/a.png"],
      availableAssets: new Set(["/assets/a.png"]),
    });
    expect(resSrc.valid).toBe(false);
    expect(
      resSrc.errors.some((e) =>
        e.includes("Figure 'src' must be a static quoted string")
      )
    ).toBe(true);
  });

  it("rejects expression-valued Callout title and non-string Callout type", () => {
    const exprTitle = `
<Callout type="note" title={someTitle}>
Note content.
</Callout>
`;
    const resTitle = validateMdxSource(exprTitle, {
      articleId: "test-art",
      declaredAssetPaths: [],
    });
    expect(resTitle.valid).toBe(false);
    expect(
      resTitle.errors.some((e) =>
        e.includes("Callout 'title' must be a static quoted string")
      )
    ).toBe(true);

    const exprType = `
<Callout type={dynamicType}>
Note content.
</Callout>
`;
    const resType = validateMdxSource(exprType, {
      articleId: "test-art",
      declaredAssetPaths: [],
    });
    expect(resType.valid).toBe(false);
    expect(
      resType.errors.some((e) =>
        e.includes("Callout 'type' must be a static quoted string")
      )
    ).toBe(true);
  });

  it("rejects quoted dimensions, arithmetic, and non-integer numeric forms on Figure", () => {
    const quotedWidth = `
<Figure src="/assets/a.png" width="800" height={450} alt="A" />
`;
    const resQuoted = validateMdxSource(quotedWidth, {
      articleId: "test-art",
      declaredAssetPaths: ["/assets/a.png"],
      availableAssets: new Set(["/assets/a.png"]),
    });
    expect(resQuoted.valid).toBe(false);
    expect(
      resQuoted.errors.some((e) =>
        e.includes(
          "Figure 'width' must be a brace-wrapped positive base-10 integer literal"
        )
      )
    ).toBe(true);

    const arithmeticHeight = `
<Figure src="/assets/a.png" width={800} height={400 + 50} alt="A" />
`;
    const resArith = validateMdxSource(arithmeticHeight, {
      articleId: "test-art",
      declaredAssetPaths: ["/assets/a.png"],
      availableAssets: new Set(["/assets/a.png"]),
    });
    expect(resArith.valid).toBe(false);
    expect(
      resArith.errors.some((e) =>
        e.includes(
          "Figure 'height' must be a brace-wrapped positive base-10 integer literal"
        )
      )
    ).toBe(true);

    const decimalWidth = `
<Figure src="/assets/a.png" width={800.5} height={450} alt="A" />
`;
    const resDecimal = validateMdxSource(decimalWidth, {
      articleId: "test-art",
      declaredAssetPaths: ["/assets/a.png"],
      availableAssets: new Set(["/assets/a.png"]),
    });
    expect(resDecimal.valid).toBe(false);

    const zeroWidth = `
<Figure src="/assets/a.png" width={0} height={450} alt="A" />
`;
    const resZero = validateMdxSource(zeroWidth, {
      articleId: "test-art",
      declaredAssetPaths: ["/assets/a.png"],
      availableAssets: new Set(["/assets/a.png"]),
    });
    expect(resZero.valid).toBe(false);

    const negativeHeight = `
<Figure src="/assets/a.png" width={800} height={-50} alt="A" />
`;
    const resNeg = validateMdxSource(negativeHeight, {
      articleId: "test-art",
      declaredAssetPaths: ["/assets/a.png"],
      availableAssets: new Set(["/assets/a.png"]),
    });
    expect(resNeg.valid).toBe(false);
  });

  it("rejects bare decorative and decorative='true' on Figure", () => {
    const bareDec = `
<Figure src="/assets/a.png" width={800} height={450} decorative />
`;
    const resBare = validateMdxSource(bareDec, {
      articleId: "test-art",
      declaredAssetPaths: ["/assets/a.png"],
      availableAssets: new Set(["/assets/a.png"]),
    });
    expect(resBare.valid).toBe(false);
    expect(
      resBare.errors.some((e) =>
        e.includes(
          "Figure 'decorative' prop, when present, must be exactly 'decorative={true}'"
        )
      )
    ).toBe(true);

    const quotedDec = `
<Figure src="/assets/a.png" width={800} height={450} decorative="true" />
`;
    const resQuoted = validateMdxSource(quotedDec, {
      articleId: "test-art",
      declaredAssetPaths: ["/assets/a.png"],
      availableAssets: new Set(["/assets/a.png"]),
    });
    expect(resQuoted.valid).toBe(false);
    expect(
      resQuoted.errors.some((e) =>
        e.includes(
          "Figure 'decorative' prop, when present, must be exactly 'decorative={true}'"
        )
      )
    ).toBe(true);
  });

  it("rejects duplicate props on a single component", () => {
    const dupPropCallout = `
<Callout type="note" type="tip">
Content.
</Callout>
`;
    const resCallout = validateMdxSource(dupPropCallout, {
      articleId: "test-art",
      declaredAssetPaths: [],
    });
    expect(resCallout.valid).toBe(false);
    expect(
      resCallout.errors.some((e) =>
        e.includes("Duplicate prop 'type' on <Callout>")
      )
    ).toBe(true);

    const dupPropFigure = `
<Figure src="/assets/a.png" src="/assets/b.png" width={800} height={450} alt="A" />
`;
    const resFigure = validateMdxSource(dupPropFigure, {
      articleId: "test-art",
      declaredAssetPaths: ["/assets/a.png", "/assets/b.png"],
      availableAssets: new Set(["/assets/a.png", "/assets/b.png"]),
    });
    expect(resFigure.valid).toBe(false);
    expect(
      resFigure.errors.some((e) =>
        e.includes("Duplicate prop 'src' on <Figure>")
      )
    ).toBe(true);
  });

  it("rejects unclosed triple-backtick fences", () => {
    const unclosedMdx = `
## Code Section

\`\`\`typescript
const x = 1;
`;
    const res = validateMdxSource(unclosedMdx, {
      articleId: "test-art",
      declaredAssetPaths: [],
    });
    expect(res.valid).toBe(false);
    expect(
      res.errors.some((e) => e.includes("Unclosed triple-backtick"))
    ).toBe(true);
  });

  it("rejects formatted, linked, or tagged headings", () => {
    const boldHeading = `
## **Bold Heading**
`;
    expect(
      validateMdxSource(boldHeading, {
        articleId: "test-art",
        declaredAssetPaths: [],
      }).valid
    ).toBe(false);

    const linkHeading = `
## [Link Heading](/blog)
`;
    expect(
      validateMdxSource(linkHeading, {
        articleId: "test-art",
        declaredAssetPaths: [],
      }).valid
    ).toBe(false);

    const codeHeading = `
### \`Code Heading\`
`;
    expect(
      validateMdxSource(codeHeading, {
        articleId: "test-art",
        declaredAssetPaths: [],
      }).valid
    ).toBe(false);
  });

  it("rejects all raw HTML tags including div, span, a, p, img", () => {
    const tags = [
      "div",
      "span",
      "a",
      "p",
      "b",
      "i",
      "img",
      "script",
      "iframe",
      "button",
    ];
    for (const tag of tags) {
      const mdx = `
<${tag} class="test">content</${tag}>
`;
      const res = validateMdxSource(mdx, {
        articleId: "test-art",
        declaredAssetPaths: [],
      });
      expect(res.valid, `Tag <${tag}> should be rejected`).toBe(false);
      expect(
        res.errors.some((e) =>
          e.includes(`Prohibited HTML/JSX tag '<${tag}>'`)
        )
      ).toBe(true);
    }
  });

  it("rejects decorative Figure with non-blank alt text", () => {
    const conflictingFigure = `
<Figure src="/assets/a.png" width={100} height={100} decorative={true} alt="Some alt text" />
`;
    const res = validateMdxSource(conflictingFigure, {
      articleId: "test-art",
      declaredAssetPaths: ["/assets/a.png"],
      availableAssets: new Set(["/assets/a.png"]),
    });
    expect(res.valid).toBe(false);
    expect(
      res.errors.some((e) =>
        e.includes(
          "Decorative Figure ('/assets/a.png') must not have a non-blank alt text"
        )
      )
    ).toBe(true);
  });

  it("rejects duplicate declared assets in frontmatter and duplicate Figure references in body", () => {
    const mdx = `
<Figure src="/assets/a.png" width={100} height={100} alt="First" />
<Figure src="/assets/a.png" width={100} height={100} alt="Second" />
`;
    const res = validateMdxSource(mdx, {
      articleId: "test-art",
      declaredAssetPaths: ["/assets/a.png", "/assets/a.png"],
      availableAssets: new Set(["/assets/a.png"]),
    });
    expect(res.valid).toBe(false);
    expect(
      res.errors.some((e) =>
        e.includes("Duplicate asset path '/assets/a.png' declared")
      )
    ).toBe(true);
    expect(
      res.errors.some((e) =>
        e.includes("Duplicate <Figure> reference to '/assets/a.png'")
      )
    ).toBe(true);
  });

  it("rejects malformed or unsafe links (protocol-relative, insecure http, javascript, data)", () => {
    const links = [
      "[Proto](//cdn.com)",
      "[Insecure](http://insecure.com)",
      "[JS](javascript:alert(1))",
      "[Data](data:text/html,test)",
      "[Invalid](https://invalid domain with spaces)",
    ];

    for (const link of links) {
      const res = validateMdxSource(link, {
        articleId: "test-art",
        declaredAssetPaths: [],
      });
      expect(res.valid, `Link '${link}' should be rejected`).toBe(false);
    }
  });

  it("accepts valid markdown links with '/', '#', and valid 'https://'", () => {
    const links = `
[Internal](/projects)
[Anchor](#section-1)
[External](https://github.com/se4nchoi)
`;
    const res = validateMdxSource(links, {
      articleId: "test-art",
      declaredAssetPaths: [],
    });
    expect(res.valid).toBe(true);
    expect(res.errors).toEqual([]);
  });
});

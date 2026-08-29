export interface MdxSourceValidationOptions {
  articleId: string;
  declaredAssetPaths: string[];
  availableAssets?: Set<string>;
}

export interface MdxSourceValidationResult {
  valid: boolean;
  errors: string[];
  referencedAssets: string[];
}

export interface ParsedJsxAttr {
  name: string;
  type: "string" | "brace" | "bare";
  value: string;
  raw: string;
}

export function parseJsxAttributes(attrsStr: string): {
  attrs: ParsedJsxAttr[];
  error?: string;
} {
  const trimmed = attrsStr.trim();
  if (!trimmed) return { attrs: [] };

  const attrs: ParsedJsxAttr[] = [];
  let index = 0;

  while (index < attrsStr.length) {
    // Skip leading whitespace before an attribute
    while (index < attrsStr.length && /\s/.test(attrsStr[index])) {
      index++;
    }
    if (index >= attrsStr.length) break;

    // Check for spread {...props}
    if (attrsStr.slice(index, index + 3) === "{...") {
      return { attrs, error: "Prop spread '{...props}' is prohibited." };
    }

    // Match attribute name
    const nameMatch = attrsStr.slice(index).match(/^[a-zA-Z0-9_-]+/);
    if (!nameMatch) {
      return {
        attrs,
        error: `Malformed attribute syntax at: '${attrsStr.slice(index)}'`,
      };
    }

    const name = nameMatch[0];
    index += name.length;

    // Skip whitespace before optional =
    while (index < attrsStr.length && /\s/.test(attrsStr[index])) {
      index++;
    }

    if (index < attrsStr.length && attrsStr[index] === "=") {
      index++; // skip '='
      // Skip whitespace after =
      while (index < attrsStr.length && /\s/.test(attrsStr[index])) {
        index++;
      }

      if (index >= attrsStr.length) {
        return {
          attrs,
          error: `Incomplete attribute '${name}=' at end of tag.`,
        };
      }

      const quoteChar = attrsStr[index];
      if (quoteChar === '"' || quoteChar === "'") {
        // String literal
        const endQuoteIndex = attrsStr.indexOf(quoteChar, index + 1);
        if (endQuoteIndex === -1) {
          return {
            attrs,
            error: `Unclosed string quote for attribute '${name}'.`,
          };
        }
        const val = attrsStr.slice(index + 1, endQuoteIndex);
        const raw = attrsStr.slice(index, endQuoteIndex + 1);
        attrs.push({ name, type: "string", value: val, raw });
        index = endQuoteIndex + 1;
      } else if (quoteChar === "{") {
        // Brace expression
        let braceDepth = 1;
        let braceEnd = -1;
        for (let i = index + 1; i < attrsStr.length; i++) {
          if (attrsStr[i] === "{") braceDepth++;
          else if (attrsStr[i] === "}") {
            braceDepth--;
            if (braceDepth === 0) {
              braceEnd = i;
              break;
            }
          }
        }
        if (braceEnd === -1) {
          return {
            attrs,
            error: `Unclosed brace expression for attribute '${name}'.`,
          };
        }
        const val = attrsStr.slice(index + 1, braceEnd).trim();
        const raw = attrsStr.slice(index, braceEnd + 1);
        attrs.push({ name, type: "brace", value: val, raw });
        index = braceEnd + 1;
      } else {
        return {
          attrs,
          error: `Malformed attribute value for '${name}' starting with '${attrsStr[index]}'.`,
        };
      }
    } else {
      // Bare attribute (no '=')
      attrs.push({ name, type: "bare", value: "", raw: name });
    }

    // Require whitespace separation before the next attribute if not at end
    if (index < attrsStr.length && !/\s/.test(attrsStr[index])) {
      return {
        attrs,
        error: `Missing whitespace separator between attributes at '${attrsStr.slice(index)}'.`,
      };
    }
  }

  return { attrs };
}

/**
 * Masks fenced code blocks and inline code spans with whitespace.
 * Detects unclosed fenced code blocks and unclosed inline code delimiters.
 */
export function maskCodeSpans(rawBody: string): {
  masked: string;
  errors: string[];
} {
  const errors: string[] = [];
  let result = rawBody;

  // 1. Check balanced triple-backtick fences and mask fenced code blocks
  const fenceMatches = result.match(/```/g) || [];
  if (fenceMatches.length % 2 !== 0) {
    errors.push("Unclosed triple-backtick code block detected in MDX body.");
  }

  // Mask fenced code blocks by replacing their content with spaces (preserving newlines)
  result = result.replace(/```[\s\S]*?```/g, (match) =>
    match.replace(/[^\n]/g, " ")
  );

  // 2. Parse and mask inline code spans supporting arbitrary backtick runs (`...`, ``...``, etc.)
  let i = 0;
  const chars = result.split("");

  while (i < chars.length) {
    if (chars[i] === "`") {
      // Count opening backtick run length N
      let openLen = 0;
      while (i + openLen < chars.length && chars[i + openLen] === "`") {
        openLen++;
      }

      const startIndex = i;
      i += openLen;

      // Find matching closing backtick run of exact length openLen
      let foundEnd = false;
      let endIndex = -1;

      while (i < chars.length) {
        if (chars[i] === "`") {
          let closeLen = 0;
          while (i + closeLen < chars.length && chars[i + closeLen] === "`") {
            closeLen++;
          }
          if (closeLen === openLen) {
            foundEnd = true;
            endIndex = i + closeLen;
            i += closeLen;
            break;
          } else {
            i += closeLen;
          }
        } else {
          i++;
        }
      }

      if (foundEnd) {
        // Mask the entire code span [startIndex, endIndex) with spaces
        for (let k = startIndex; k < endIndex; k++) {
          if (chars[k] !== "\n") {
            chars[k] = " ";
          }
        }
      } else {
        errors.push(
          `Unclosed inline code span delimiter (run of ${openLen} backtick(s)) detected.`
        );
        break;
      }
    } else {
      i++;
    }
  }

  return {
    masked: chars.join(""),
    errors,
  };
}

export function validateMdxSource(
  rawBody: string,
  options: MdxSourceValidationOptions
): MdxSourceValidationResult {
  const errors: string[] = [];
  const referencedAssets: string[] = [];

  // Check line-by-line rules on unmasked lines (with fenced code blocks masked to avoid false positives)
  const fencedOnlyStripped = rawBody.replace(/```[\s\S]*?```/g, (match) =>
    match.replace(/[^\n]/g, " ")
  );
  const rawLines = fencedOnlyStripped.split("\n");

  for (let i = 0; i < rawLines.length; i++) {
    const line = rawLines[i];
    const lineNum = i + 1;

    // 1. Prohibit body-level markdown # h1
    if (/^#\s+/.test(line)) {
      errors.push(
        `Line ${lineNum}: Body-level <h1> '# ' is prohibited. The article title is the sole <h1>.`
      );
    }

    // 2. Prohibit ESM import / export
    if (/^\s*import\s+/.test(line)) {
      errors.push(`Line ${lineNum}: ESM 'import' is prohibited in MDX content.`);
    }
    if (/^\s*export\s+/.test(line)) {
      errors.push(`Line ${lineNum}: ESM 'export' is prohibited in MDX content.`);
    }

    // 3. Prohibit 'use client'
    if (/[\'"‘“]use client[\'"’”]/i.test(line)) {
      errors.push(
        `Line ${lineNum}: Client component directive 'use client' is prohibited.`
      );
    }

    // 4. Prohibit standard markdown images: ![alt](url)
    if (/!\[[^\]]*\]\([^\)]*\)/.test(line)) {
      errors.push(
        `Line ${lineNum}: Standard markdown image '![]()' is prohibited. Use the explicit contract-driven <Figure> component.`
      );
    }

    // 5. Require plain-text h2/h3 headings (no links, formatting, code, or tags)
    const headingMatch = line.match(/^(#{2,3})\s+(.*)$/);
    if (headingMatch) {
      const headingContent = headingMatch[2].trim();
      if (/[*_[\]`<>]/.test(headingContent)) {
        errors.push(
          `Line ${lineNum}: Headings must be plain text without markdown formatting or links ('${headingContent}').`
        );
      }
    }
  }

  // Mask code blocks and inline code spans for JSX and expression validation
  const { masked: stripped, errors: codeErrors } = maskCodeSpans(rawBody);
  errors.push(...codeErrors);

  // 6. Ordered scanner for Figure and Callout tokens outside code
  const calloutStack: { index: number }[] = [];
  const referencedAssetCounts = new Map<string, number>();

  // Token scanner for JSX tags
  const tagTokenRegex = /<\/?([a-zA-Z][a-zA-Z0-9_-]*)[\s\S]*?(?:>|\/>|$)/g;
  let tagMatch: RegExpExecArray | null;

  while ((tagMatch = tagTokenRegex.exec(stripped)) !== null) {
    const rawTag = tagMatch[0];
    const isClosing = rawTag.startsWith("</");
    const tagName = tagMatch[1];

    if (tagName === "Figure") {
      if (isClosing) {
        errors.push(
          "Closing tag '</Figure>' is prohibited. <Figure> must be self-closing (<Figure ... />)."
        );
        continue;
      }

      if (!rawTag.endsWith("/>")) {
        errors.push(
          "Malformed, unclosed, or paired <Figure> tag detected. Figure components must be strictly self-closing (<Figure ... />)."
        );
        continue;
      }

      // Extract inner attributes for <Figure ... />
      const attrsStr = rawTag.slice("<Figure".length, -2);
      const parsed = parseJsxAttributes(attrsStr);

      if (parsed.error) {
        errors.push(`Invalid <Figure> attribute syntax: ${parsed.error}`);
        continue;
      }

      const seenProps = new Set<string>();
      let src: string | undefined;
      let width: number | undefined;
      let height: number | undefined;
      let alt: string | undefined;
      let isDecorative = false;

      for (const attr of parsed.attrs) {
        if (seenProps.has(attr.name)) {
          errors.push(`Duplicate prop '${attr.name}' on <Figure>.`);
          continue;
        }
        seenProps.add(attr.name);

        if (attr.name === "src") {
          if (attr.type !== "string") {
            errors.push(`Figure 'src' must be a static quoted string.`);
          } else {
            src = attr.value;
          }
        } else if (attr.name === "width") {
          if (attr.type !== "brace" || !/^[1-9]\d*$/.test(attr.value)) {
            errors.push(
              `Figure 'width' must be a brace-wrapped positive base-10 integer literal (e.g. width={800}).`
            );
          } else {
            const parsedNum = Number(attr.value);
            if (
              !Number.isFinite(parsedNum) ||
              !Number.isSafeInteger(parsedNum) ||
              parsedNum <= 0
            ) {
              errors.push(
                `Figure 'width' must be a finite positive safe integer.`
              );
            } else {
              width = parsedNum;
            }
          }
        } else if (attr.name === "height") {
          if (attr.type !== "brace" || !/^[1-9]\d*$/.test(attr.value)) {
            errors.push(
              `Figure 'height' must be a brace-wrapped positive base-10 integer literal (e.g. height={450}).`
            );
          } else {
            const parsedNum = Number(attr.value);
            if (
              !Number.isFinite(parsedNum) ||
              !Number.isSafeInteger(parsedNum) ||
              parsedNum <= 0
            ) {
              errors.push(
                `Figure 'height' must be a finite positive safe integer.`
              );
            } else {
              height = parsedNum;
            }
          }
        } else if (attr.name === "alt") {
          if (attr.type !== "string") {
            errors.push(`Figure 'alt' must be a static quoted string.`);
          } else {
            alt = attr.value;
          }
        } else if (attr.name === "decorative") {
          if (attr.type !== "brace" || attr.value !== "true") {
            errors.push(
              `Figure 'decorative' prop, when present, must be exactly 'decorative={true}'.`
            );
          } else {
            isDecorative = true;
          }
        } else if (attr.name === "caption") {
          if (attr.type !== "string") {
            errors.push(`Figure 'caption' must be a static quoted string.`);
          }
        } else {
          errors.push(`Unknown or prohibited prop '${attr.name}' on <Figure>.`);
        }
      }

      // Validate src
      if (!src) {
        errors.push("Figure component is missing required 'src' attribute.");
      } else {
        if (
          !src.startsWith("/") ||
          src.startsWith("//") ||
          src.includes("\\") ||
          src.includes("..")
        ) {
          errors.push(
            `Figure src '${src}' must be a local absolute path starting with a single '/' without traversal or backslashes.`
          );
        } else {
          referencedAssets.push(src);
          referencedAssetCounts.set(src, (referencedAssetCounts.get(src) || 0) + 1);
        }
      }

      // Validate width/height presence
      if (width === undefined) {
        errors.push(
          `Figure src '${src || "unknown"}' is missing required positive integer 'width'.`
        );
      }
      if (height === undefined) {
        errors.push(
          `Figure src '${src || "unknown"}' is missing required positive integer 'height'.`
        );
      }

      // Validate alt vs decorative
      if (isDecorative) {
        if (alt !== undefined && alt.trim().length > 0) {
          errors.push(
            `Decorative Figure ('${src || ""}') must not have a non-blank alt text.`
          );
        }
      } else {
        if (alt === undefined || alt.trim().length === 0) {
          errors.push(
            `Non-decorative Figure ('${src || ""}') requires non-blank 'alt' text.`
          );
        }
      }
    } else if (tagName === "Callout") {
      if (isClosing) {
        if (!rawTag.endsWith(">")) {
          errors.push("Malformed closing tag '</Callout>'.");
        } else if (calloutStack.length === 0) {
          errors.push(
            "Closing tag '</Callout>' found without a matching open <Callout> tag."
          );
        } else {
          calloutStack.pop();
        }
        continue;
      }

      // Opening or self-closing Callout tag
      const isSelfClosing = rawTag.endsWith("/>");
      const isProperlyClosed = rawTag.endsWith(">") || isSelfClosing;

      if (!isProperlyClosed) {
        errors.push(
          "Malformed or unclosed <Callout> opening tag detected. Callout tags must terminate with '>' or '/>'."
        );
        continue;
      }

      const attrsStr = isSelfClosing
        ? rawTag.slice("<Callout".length, -2)
        : rawTag.slice("<Callout".length, -1);

      const parsed = parseJsxAttributes(attrsStr);

      if (parsed.error) {
        errors.push(`Invalid <Callout> attribute syntax: ${parsed.error}`);
        continue;
      }

      const seenProps = new Set<string>();
      let hasType = false;

      for (const attr of parsed.attrs) {
        if (seenProps.has(attr.name)) {
          errors.push(`Duplicate prop '${attr.name}' on <Callout>.`);
          continue;
        }
        seenProps.add(attr.name);

        if (attr.name === "type") {
          hasType = true;
          if (attr.type !== "string") {
            errors.push(
              `Callout 'type' must be a static quoted string ('note', 'warning', 'info', or 'tip').`
            );
          } else if (!["note", "warning", "info", "tip"].includes(attr.value)) {
            errors.push(
              `Invalid Callout type '${attr.value}'. Type must be one of: note, warning, info, tip.`
            );
          }
        } else if (attr.name === "title") {
          if (attr.type !== "string") {
            errors.push(`Callout 'title' must be a static quoted string.`);
          }
        } else {
          errors.push(
            `Unknown or prohibited prop '${attr.name}' on <Callout>. Only 'type' and 'title' are permitted.`
          );
        }
      }

      if (!hasType) {
        errors.push(
          "Callout component requires 'type' attribute ('note', 'warning', 'info', or 'tip')."
        );
      }

      if (!isSelfClosing) {
        calloutStack.push({ index: tagMatch.index });
      }
    } else {
      // Prohibited HTML / JSX tag
      if (isClosing) {
        errors.push(
          `Prohibited HTML/JSX closing tag '</${tagName}>' found in MDX body.`
        );
      } else {
        errors.push(
          `Prohibited HTML/JSX tag '<${tagName}>' found in MDX body. Only <Callout> and <Figure> are permitted.`
        );
      }
    }
  }

  // Check unclosed Callout stack at end of document
  if (calloutStack.length > 0) {
    errors.push(
      `Unclosed <Callout> tag at end of document (found ${calloutStack.length} unclosed tag(s)).`
    );
  }

  // 7. Check for duplicate Figure asset references
  for (const [asset, count] of referencedAssetCounts.entries()) {
    if (count > 1) {
      errors.push(
        `Duplicate <Figure> reference to '${asset}' (${count} occurrences).`
      );
    }
  }

  // 8. Prohibit event handlers and dangerouslySetInnerHTML
  if (
    /\bon[A-Z][a-zA-Z]*\s*=/i.test(stripped) ||
    /dangerouslySetInnerHTML/i.test(stripped)
  ) {
    errors.push(
      "Event handlers and dangerouslySetInnerHTML props are prohibited in MDX body."
    );
  }

  // 9. Validate declared vs referenced assets
  const declaredAssetCounts = new Map<string, number>();
  for (const asset of options.declaredAssetPaths) {
    declaredAssetCounts.set(asset, (declaredAssetCounts.get(asset) || 0) + 1);
  }
  for (const [asset, count] of declaredAssetCounts.entries()) {
    if (count > 1) {
      errors.push(
        `Duplicate asset path '${asset}' declared in frontmatter 'assetPaths'.`
      );
    }
  }

  const declaredSet = new Set(options.declaredAssetPaths);
  const referencedSet = new Set(referencedAssets);

  // All referenced assets must be in declaredAssetPaths
  for (const ref of referencedAssets) {
    if (!declaredSet.has(ref)) {
      errors.push(
        `Figure asset '${ref}' is referenced in MDX body but missing from article frontmatter 'assetPaths'.`
      );
    }
  }

  // All declared assets must be used (no stale declarations)
  for (const declared of options.declaredAssetPaths) {
    if (!referencedSet.has(declared)) {
      errors.push(
        `Asset '${declared}' is declared in article frontmatter 'assetPaths' but not used in any <Figure> component.`
      );
    }
    if (options.availableAssets && !options.availableAssets.has(declared)) {
      errors.push(
        `Declared asset '${declared}' does not exist on disk under public/ directory.`
      );
    }
  }

  // 10. Validate Markdown link schemes
  const mdLinkMatches = stripped.matchAll(
    /\[[^\]]*\]\(([^\)\s]+)(?:\s+[^\)]*)?\)/g
  );
  for (const match of mdLinkMatches) {
    const url = match[1];

    // Anchor links
    if (url.startsWith("#")) continue;

    // Local links (must start with single slash, not protocol-relative //)
    if (url.startsWith("/")) {
      if (url.startsWith("//") || url.includes("\\")) {
        errors.push(
          `Invalid internal link '${url}'. Protocol-relative links and backslashes are prohibited.`
        );
      }
      continue;
    }

    // HTTPS external links
    if (url.startsWith("https://")) {
      try {
        const parsed = new URL(url);
        if (
          parsed.protocol === "https:" &&
          parsed.hostname &&
          parsed.hostname.includes(".")
        ) {
          continue;
        }
      } catch {
        // Fall through
      }
    }

    errors.push(
      `Unsafe or invalid link target '${url}' found. Links must start with single '/', '#', or valid 'https://'.`
    );
  }

  // 11. Reject executable body-level MDX expressions in prose
  // Strip valid JSX components to isolate prose
  const withoutJsx = stripped
    .replace(/<Figure([\s\S]*?)\/>/g, "")
    .replace(/<Callout([\s\S]*?)>/g, "")
    .replace(/<\/Callout>/g, "");

  const proseExprMatch = withoutJsx.match(/\{[\s\S]*?\}/);
  if (proseExprMatch) {
    errors.push(
      `Prohibited executable MDX expression found in body prose: '${proseExprMatch[0]}'.`
    );
  }

  return {
    valid: errors.length === 0,
    errors,
    referencedAssets,
  };
}

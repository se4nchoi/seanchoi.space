export interface HeadingItem {
  level: 2 | 3;
  text: string;
  id: string;
}

export type ArticleHeading = HeadingItem;

/**
 * Deterministic heading slugifier supporting English and Korean characters.
 */
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s가-힣-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Creates a duplicate-aware heading ID generator per article render.
 */
export function createHeadingIdGenerator(): (text: string) => string {
  const slugCounts = new Map<string, number>();

  return (text: string): string => {
    const base = slugifyHeading(text) || "section";
    const current = slugCounts.get(base) || 0;
    slugCounts.set(base, current + 1);

    if (current === 0) {
      return base;
    }
    return `${base}-${current}`;
  };
}

/**
 * Extracts plain-text h2 and h3 headings in document order for Table of Contents.
 */
export function extractHeadingsFromMdx(
  markdownBody: string,
  getHeadingId: (text: string) => string
): HeadingItem[] {
  const headings: HeadingItem[] = [];

  // Strip code blocks first so code comments do not look like headings
  const codeBlockRegex = /```[\s\S]*?```/g;
  const stripped = markdownBody.replace(codeBlockRegex, "");

  const lines = stripped.split("\n");
  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.*)$/);
    if (match) {
      const level = match[1].length as 2 | 3;
      const text = match[2].trim();
      const id = getHeadingId(text);
      headings.push({ level, text, id });
    }
  }

  return headings;
}

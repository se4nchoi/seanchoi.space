import { expect, test, describe } from "vitest";
import { parseFrontmatter } from "./blog";

describe("Blog Parser Utilities", () => {
  test("parseFrontmatter parses valid YAML metadata and returns clean content", () => {
    const rawContent = `---
title: "How to Build clean code"
publishedAt: "2026-06-04"
summary: "A short summary about cleaning code."
image: "/images/post-image.jpg"
---

This is the actual blog post body text.
It has multiple lines.`;

    const { metadata, content } = parseFrontmatter(rawContent);

    expect(metadata.title).toBe("How to Build clean code");
    expect(metadata.publishedAt).toBe("2026-06-04");
    expect(metadata.summary).toBe("A short summary about cleaning code.");
    expect(metadata.image).toBe("/images/post-image.jpg");
    expect(content).toBe("This is the actual blog post body text.\nIt has multiple lines.");
  });

  test("parseFrontmatter handles quoted fields and strips them", () => {
    const rawContent = `---
title: 'My Title'
summary: "My Summary"
---
Hello World`;

    const { metadata } = parseFrontmatter(rawContent);

    expect(metadata.title).toBe("My Title");
    expect(metadata.summary).toBe("My Summary");
  });
});

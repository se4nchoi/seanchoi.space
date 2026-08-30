import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("Design Tokens & Global CSS System", () => {
  const cssPath = path.resolve(process.cwd(), "src/app/globals.css");
  const cssContent = fs.readFileSync(cssPath, "utf8");

  it("retains Tailwind 4 source isolation declaration", () => {
    expect(cssContent).toContain('@import "tailwindcss" source(none);');
    expect(cssContent).toContain('@source "../";');
  });

  it("declares all required light-mode semantic color tokens", () => {
    expect(cssContent).toContain("--background: #fdfdfd");
    expect(cssContent).toContain("--surface: #ffffff");
    expect(cssContent).toContain("--foreground: #171717");
    expect(cssContent).toContain("--muted: #525252");
    expect(cssContent).toContain("--border: #d4d4d4");
    expect(cssContent).toContain("--accent: #0b63b6");
    expect(cssContent).toContain("--accent-foreground: #ffffff");
    expect(cssContent).toContain("--focus-ring: #0b63b6");
  });

  it("declares all required dark-mode semantic color tokens under prefers-color-scheme", () => {
    expect(cssContent).toContain("@media (prefers-color-scheme: dark)");
    expect(cssContent).toContain("--background: #111010");
    expect(cssContent).toContain("--surface: #181717");
    expect(cssContent).toContain("--foreground: #f5f5f5");
    expect(cssContent).toContain("--muted: #a3a3a3");
    expect(cssContent).toContain("--border: #404040");
    expect(cssContent).toContain("--accent: #7bb8ff");
    expect(cssContent).toContain("--accent-foreground: #111010");
    expect(cssContent).toContain("--focus-ring: #7bb8ff");
  });

  it("declares typography scale, line-height, and tracking tokens", () => {
    expect(cssContent).toContain("--text-display:");
    expect(cssContent).toContain("--text-heading-1:");
    expect(cssContent).toContain("--text-heading-2: 1.5rem;");
    expect(cssContent).toContain("--text-heading-3: 1.25rem;");
    expect(cssContent).toContain("--text-body: 1rem;");
    expect(cssContent).toContain("--text-small: 0.875rem;");
    expect(cssContent).toContain("--text-code: 0.875em;");

    expect(cssContent).toContain("--leading-tight: 1.25;");
    expect(cssContent).toContain("--leading-body: 1.5;");
    expect(cssContent).toContain("--leading-relaxed: 1.625;");

    expect(cssContent).toContain("--tracking-display: -0.02em;");
    expect(cssContent).toContain("--tracking-label: 0.05em;");
  });

  it("declares spacing scale tokens from 0.25rem to 6rem", () => {
    expect(cssContent).toContain("--spacing-1: 0.25rem;");
    expect(cssContent).toContain("--spacing-2: 0.5rem;");
    expect(cssContent).toContain("--spacing-3: 0.75rem;");
    expect(cssContent).toContain("--spacing-4: 1rem;");
    expect(cssContent).toContain("--spacing-6: 1.5rem;");
    expect(cssContent).toContain("--spacing-8: 2rem;");
    expect(cssContent).toContain("--spacing-12: 3rem;");
    expect(cssContent).toContain("--spacing-16: 4rem;");
    expect(cssContent).toContain("--spacing-24: 6rem;");
  });

  it("declares layout, border width, radii, and animation tokens", () => {
    expect(cssContent).toContain("--max-width-shell: 72rem;");
    expect(cssContent).toContain("--max-width-prose: 68ch;");
    expect(cssContent).toContain("--border-width: 1px;");
    expect(cssContent).toContain("--radius-sm: 0.25rem;");
    expect(cssContent).toContain("--radius-md: 0.5rem;");
    expect(cssContent).toContain("--radius-lg: 0.75rem;");
    expect(cssContent).toContain("--duration-fast: 140ms;");
    expect(cssContent).toContain("--duration-base: 220ms;");
  });

  it("includes prefers-reduced-motion media query and accessible styles", () => {
    expect(cssContent).toContain("@media (prefers-reduced-motion: reduce)");
    expect(cssContent).toContain(".skip-link");
    expect(cssContent).toContain(":focus-visible");
    expect(cssContent).toContain(".prose-content");
  });
});

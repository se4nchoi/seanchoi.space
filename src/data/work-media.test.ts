import { existsSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { canonicalSupportingProjects } from "./content";
import { workMedia } from "./work-media";

describe("Approved project media", () => {
  it("references existing local assets and real records with bilingual image descriptions", () => {
    for (const [id, media] of Object.entries(workMedia)) {
      expect(canonicalSupportingProjects.some((project) => project.id === id)).toBe(true);
      expect(media.src).toMatch(/^\/work\/[a-z0-9-]+\.(jpg|png)$/);
      const file = path.join(process.cwd(), "public", media.src);
      expect(existsSync(file)).toBe(true);
      expect(statSync(file).size).toBeLessThan(650_000);
      expect(media.width).toBeGreaterThan(0);
      expect(media.height).toBeGreaterThan(0);
      for (const locale of ["en", "ko"] as const) {
        expect(media.alt[locale].length).toBeGreaterThan(15);
        expect(media.caption[locale].length).toBeGreaterThan(5);
      }
    }
  });
});

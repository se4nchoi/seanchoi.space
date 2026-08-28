import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { canonicalContentRegistry } from "@/data/content";
import { validateContentRegistry } from "./validate";

function getAvailablePublicAssets(): Set<string> {
  const assets = new Set<string>();
  const publicDir = path.resolve(process.cwd(), "public");

  if (!fs.existsSync(publicDir)) {
    return assets;
  }

  function walk(dir: string, base: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.join(base, entry.name).replace(/\\/g, "/");
      if (entry.isDirectory()) {
        walk(fullPath, relativePath);
      } else {
        assets.add(`/${relativePath}`);
      }
    }
  }

  walk(publicDir, "");
  return assets;
}

describe("Production Content Publication Guard", () => {
  it("validates that the canonical content registry adheres to all production integrity rules", () => {
    const availableAssets = getAvailablePublicAssets();
    const result = validateContentRegistry(canonicalContentRegistry, {
      now: new Date(),
      availableAssets,
    });

    expect(result).toBeDefined();
  });
});

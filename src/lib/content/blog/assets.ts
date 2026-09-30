import fs from "fs";
import path from "path";

/**
 * Shared server-only helper to discover all existing public static asset paths.
 */
export function getAvailablePublicAssets(): Set<string> {
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

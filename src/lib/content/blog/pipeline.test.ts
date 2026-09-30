import { afterEach, describe, expect, it, vi } from "vitest";
import { loadAllMdxArticles } from "./pipeline";

describe("loadAllMdxArticles caching", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("reloads articles on every call outside production builds", () => {
    vi.stubEnv("NODE_ENV", "development");
    expect(loadAllMdxArticles({ now: "2026-09-01" })).not.toBe(
      loadAllMdxArticles({ now: "2026-09-01" })
    );
  });

  it("memoizes per validation date during production builds", () => {
    vi.stubEnv("NODE_ENV", "production");
    const first = loadAllMdxArticles({ now: "2026-09-02" });
    expect(loadAllMdxArticles({ now: "2026-09-02" })).toBe(first);
    expect(loadAllMdxArticles({ now: "2026-09-03" })).not.toBe(first);
  });

  it("bypasses the cache when explicit assets are supplied", () => {
    vi.stubEnv("NODE_ENV", "production");
    const cached = loadAllMdxArticles({ now: "2026-09-04" });
    const assets = new Set<string>();
    expect(loadAllMdxArticles({ now: "2026-09-04", availableAssets: assets })).not.toBe(cached);
  });
});

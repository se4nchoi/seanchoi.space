import { describe, it, expect } from "vitest";
import { dictionaries, getDictionary } from "./dictionaries";
import { LOCALES } from "./config";

describe("i18n Dictionaries Completeness & Parity", () => {
  it("provides complete, nonblank top-level dictionary entries for both en and ko", () => {
    const enDict = dictionaries.en;
    const koDict = dictionaries.ko;

    const enKeys = Object.keys(enDict) as (keyof typeof enDict)[];
    const koKeys = Object.keys(koDict) as (keyof typeof koDict)[];

    expect(enKeys.sort()).toEqual(koKeys.sort());

    for (const key of enKeys) {
      if (key === "skeleton") continue;
      expect(enDict[key]).toBeTypeOf("string");
      expect((enDict[key] as string).trim().length).toBeGreaterThan(0);

      expect(koDict[key]).toBeTypeOf("string");
      expect((koDict[key] as string).trim().length).toBeGreaterThan(0);
    }
  });

  it("provides complete, nonblank nested skeleton dictionary entries for both en and ko", () => {
    const enSkeleton = dictionaries.en.skeleton;
    const koSkeleton = dictionaries.ko.skeleton;

    const enKeys = Object.keys(enSkeleton) as (keyof typeof enSkeleton)[];
    const koKeys = Object.keys(koSkeleton) as (keyof typeof koSkeleton)[];

    expect(enKeys.sort()).toEqual(koKeys.sort());
    expect(enKeys.length).toBe(47);

    for (const key of enKeys) {
      expect(enSkeleton[key]).toBeTypeOf("string");
      expect(enSkeleton[key].trim().length).toBeGreaterThan(0);

      expect(koSkeleton[key]).toBeTypeOf("string");
      expect(koSkeleton[key].trim().length).toBeGreaterThan(0);
    }
  });

  it("returns appropriate dictionary via getDictionary", () => {
    for (const locale of LOCALES) {
      const dict = getDictionary(locale);
      expect(dict).toBeDefined();
      expect(dict.skipToContent).toBe(dictionaries[locale].skipToContent);
      expect(dict.skeleton.eyebrow).toBe(dictionaries[locale].skeleton.eyebrow);
    }
  });
});

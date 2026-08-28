import { describe, it, expect } from "vitest";
import { dictionaries, getDictionary } from "./dictionaries";
import { LOCALES } from "./config";

describe("i18n Dictionaries Completeness", () => {
  it("provides complete, nonblank dictionary entries for both en and ko", () => {
    const enDict = dictionaries.en;
    const koDict = dictionaries.ko;

    const enKeys = Object.keys(enDict) as (keyof typeof enDict)[];
    const koKeys = Object.keys(koDict) as (keyof typeof koDict)[];

    expect(enKeys.sort()).toEqual(koKeys.sort());

    for (const key of enKeys) {
      expect(enDict[key]).toBeTypeOf("string");
      expect(enDict[key].trim().length).toBeGreaterThan(0);

      expect(koDict[key]).toBeTypeOf("string");
      expect(koDict[key].trim().length).toBeGreaterThan(0);
    }
  });

  it("returns appropriate dictionary via getDictionary", () => {
    for (const locale of LOCALES) {
      const dict = getDictionary(locale);
      expect(dict).toBeDefined();
      expect(dict.skipToContent).toBe(dictionaries[locale].skipToContent);
    }
  });
});

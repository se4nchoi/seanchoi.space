import { describe, it, expect } from "vitest";
import { getEvidenceLevelLabel, getSystemLayerLabel } from "./career-labels";
import { dictionaries } from "./dictionaries";

describe("career labels", () => {
  it("maps every evidence level to its dictionary label in both locales", () => {
    for (const locale of ["en", "ko"] as const) {
      const { careerUI } = dictionaries[locale];
      expect(getEvidenceLevelLabel("professional", locale)).toBe(careerUI.professionalLevel);
      expect(getEvidenceLevelLabel("project", locale)).toBe(careerUI.projectLevel);
      expect(getEvidenceLevelLabel("training", locale)).toBe(careerUI.trainingLevel);
      expect(getEvidenceLevelLabel("exposure", locale)).toBe(careerUI.exposureLevel);
    }
  });

  it("maps system layers to localized headings", () => {
    expect(getSystemLayerLabel("physical-systems", "en")).toBe(
      dictionaries.en.careerUI.layerPhysicalSystems
    );
    expect(getSystemLayerLabel("ai-perception", "ko")).toBe(
      dictionaries.ko.careerUI.layerAiPerception
    );
  });
});

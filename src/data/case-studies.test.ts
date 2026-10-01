import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { caseStudies, publishedCaseStudies } from "./case-studies";

describe("case studies", () => {
  it("have unique slugs", () => {
    const slugs = caseStudies.map((study) => study.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("reference images that exist in public/", () => {
    for (const study of publishedCaseStudies) {
      const figures = [study.hero, ...study.walkthrough.flatMap((step) => (step.figure ? [step.figure] : []))];
      for (const figure of figures) {
        expect(existsSync(join(process.cwd(), "public", figure.src)), figure.src).toBe(true);
      }
    }
  });

  it("keep the digital twin's simulation boundary and AI-assisted authorship explicit", () => {
    const twin = caseStudies.find((study) => study.slug === "indy7-digital-twin");
    expect(twin).toBeDefined();
    expect(twin!.status.en).toContain("not yet validated on hardware");
    expect(twin!.limits.map((item) => item.en).join(" ")).toContain("ran in simulation");
    expect(twin!.limits.map((item) => item.en).join(" ")).toContain("synthetic estimates");
    expect(twin!.howBuilt.en).toContain("AI coding agent");

    const allEnglish = JSON.stringify(twin);
    expect(allEnglish).not.toMatch(/production-ready|commissioned on|expert/i);
  });
});

import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { caseStudies, getCaseStudy, getVisibleCaseStudies } from "./case-studies";

describe("case studies", () => {
  it("hide unapproved studies in production and show all of them on preview", () => {
    const production = { NODE_ENV: "production", VERCEL_ENV: "production" } as const;
    const preview = { NODE_ENV: "production", VERCEL_ENV: "preview" } as const;
    const approved = caseStudies.filter((study) => study.approved).map((s) => s.slug);
    expect(getVisibleCaseStudies(production).map((s) => s.slug)).toEqual(approved);
    expect(getVisibleCaseStudies(preview)).toHaveLength(caseStudies.length);
    for (const study of caseStudies.filter((s) => !s.approved)) {
      expect(getCaseStudy(study.slug, production)).toBeUndefined();
      expect(getCaseStudy(study.slug, preview)).toBeDefined();
    }
  });

  it("have unique slugs", () => {
    const slugs = caseStudies.map((study) => study.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("reference images that exist in public/", () => {
    for (const study of caseStudies) {
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

  it("credit the classmate's chess contribution and keep BambooChat screenshots fictional", () => {
    const bamboo = caseStudies.find((study) => study.slug === "bamboochat");
    expect(bamboo).toBeDefined();
    expect(bamboo!.howBuilt.en).toContain("A classmate contributed the first chess implementation");
    expect(bamboo!.howBuilt.en).toContain("AI coding agent");
    expect(bamboo!.hero.caption.en).toContain("fictional");
    expect(bamboo!.walkthroughIntro.en).toContain("fictional");
    expect(bamboo!.limits.map((item) => item.en).join(" ")).toContain("don't quote engagement numbers");
  });
});

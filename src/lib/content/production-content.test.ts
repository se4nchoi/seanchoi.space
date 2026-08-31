import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { canonicalContentRegistry, canonicalSupportingProjects } from "@/data/content";
import { validateContentRegistry } from "./validate";
import { validateBlogPipeline } from "./blog";
import { ARTICLE_ROUTE_PAIRS } from "./article-routes";
import { HISTORICAL_ROUTE_MANIFEST } from "./historical-manifest";

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
  it("validates that the canonical content registry adheres to all production integrity rules in real time", () => {
    const availableAssets = getAvailablePublicAssets();
    const result = validateContentRegistry(canonicalContentRegistry, {
      now: new Date(),
      availableAssets,
    });

    expect(result).toBeDefined();
    // At launch, zero public articles and zero public projects are in the canonical registry
    expect(canonicalContentRegistry.articles).toHaveLength(0);
    expect(canonicalContentRegistry.projects).toHaveLength(0);
  });

  it("proves all public records in canonical registry are verified, human-reviewed, and non-synthetic", () => {
    const {
      siteIdentity,
      experiences,
      educationAndTraining,
      skills,
      links,
      evidence,
      supportingProjects,
    } = canonicalContentRegistry;

    expect(siteIdentity).not.toBeNull();
    const allRecords = [
      siteIdentity!,
      ...experiences,
      ...educationAndTraining,
      ...skills,
      ...links,
      ...evidence,
      ...supportingProjects,
    ];

    for (const record of allRecords) {
      expect(record.publicationStatus).toBe("public");
      expect(record.claimState).toBe("verified");
      expect(record.syntheticPlaceholder).toBe(false);
      expect(record.reviewedOn).toBe("2026-08-31");
    }
  });

  it("enforces privacy safeguards: zero phone, street address, GPA, work authorization, private document paths, or résumé material", () => {
    const serialized = JSON.stringify(canonicalContentRegistry);

    expect(serialized).not.toContain("phone");
    expect(serialized).not.toContain("streetAddress");
    expect(serialized).not.toContain("workAuthorization");
    expect(serialized).not.toContain("CGPA");
    expect(serialized).not.toContain("2.22");
    expect(serialized).not.toContain("hynix");
    expect(serialized).not.toContain(".pdf");
    expect(serialized).not.toContain("resume");
    expect(serialized).not.toContain("이력서");

    // Contact link verification
    const emailLink = canonicalContentRegistry.links.find((l) => l.kind === "email");
    expect(emailLink?.href).toBe("mailto:se4n.choi@gmail.com");

    const githubLink = canonicalContentRegistry.links.find((l) => l.kind === "github");
    expect(githubLink?.href).toBe("https://github.com/se4nchoi");

    const linkedinLink = canonicalContentRegistry.links.find((l) => l.kind === "linkedin");
    expect(linkedinLink?.href).toBe("https://www.linkedin.com/in/se4nchoi/");
  });

  it("enforces EMG contribution boundaries: no backend, WebSocket, firmware, embedded, or native Android claims", () => {
    const emg = canonicalContentRegistry.experiences.find((e) => e.id === "exp-emg");
    expect(emg).toBeDefined();

    const emgText = JSON.stringify(emg);
    expect(emgText).not.toContain("WebSocket");
    expect(emgText).not.toContain("firmware");
    expect(emgText).not.toContain("embedded module");
    expect(emgText).not.toContain("native Android");
    expect(emgText).not.toContain("CCTV");
    expect(emgText).not.toContain("commercial");

    // Confirms React UI and control integration
    expect(emg?.summary.en).toContain("Implemented frontend interfaces that integrated with APIs and streams built by other teams.");
  });

  it("enforces KDIC military service boundaries: automation tools disclosed, processed contents strictly confidential", () => {
    const kdic = canonicalContentRegistry.experiences.find((e) => e.id === "exp-kdic");
    expect(kdic).toBeDefined();

    const kdicText = JSON.stringify(kdic);
    expect(kdicText).toContain("JavaScript");
    expect(kdicText).toContain("Hangul");
    expect(kdicText).toContain("VBA");
    expect(kdicText).toContain("PowerShell");

    // No efficiency metrics or operational leaks
    expect(kdicText).not.toMatch(/\d+%/);
    expect(kdicText).not.toContain("classified");
    expect(kdicText).not.toContain("intelligence data");
  });

  it("enforces that training programs and coursework are never labeled as employment", () => {
    for (const edu of canonicalContentRegistry.educationAndTraining) {
      expect(edu.kind).toMatch(/^(education|training)$/);
      expect(edu.evidenceLevel).toBe("training");
    }

    const training = canonicalContentRegistry.educationAndTraining.find(
      (e) => e.id === "training-busan-dx"
    );
    expect(training?.status).toBe("in-progress");
    expect(training?.dateRange.ongoing).toBe(true);
    expect(training?.dateRange.start).toBe("2026-06");
    expect(training?.dateRange.end).toBe("2026-12");
  });

  it("proves self-directed classroom projects are distinct from training implementation exercises and under safeguards", () => {
    expect(canonicalSupportingProjects.length).toBeGreaterThanOrEqual(3);

    const selfDirected = canonicalSupportingProjects.filter(
      (p) => p.context === "self-directed"
    );
    const exercises = canonicalSupportingProjects.filter(
      (p) => p.context === "training-exercise"
    );

    expect(selfDirected).toHaveLength(2);
    expect(exercises).toHaveLength(1);

    for (const p of selfDirected) {
      expect(p.evidenceLevel).toBe("project");
      expect(p.publicationStatus).toBe("public");
      expect(p.claimState).toBe("verified");
      expect(p.syntheticPlaceholder).toBe(false);
    }

    for (const ex of exercises) {
      expect(ex.evidenceLevel).toBe("training");
      expect(ex.publicationStatus).toBe("public");
      expect(ex.claimState).toBe("verified");
      expect(ex.syntheticPlaceholder).toBe(false);
    }
  });

  it("validates that all MDX files in content/blog pass the blog pipeline validation", () => {
    const availableAssets = getAvailablePublicAssets();
    const articles = validateBlogPipeline({
      now: new Date(),
      availableAssets,
    });

    // In production launch, no article in content/blog is public
    for (const article of articles) {
      expect(
        article.record.publicationStatus,
        `Article ${article.record.id} must remain draft at launch`
      ).toBe("draft");
      expect(
        article.record.syntheticPlaceholder,
        `Article ${article.record.id} must be synthetic placeholder at launch`
      ).toBe(true);
      expect(
        article.record.claimState,
        `Article ${article.record.id} must be pending at launch`
      ).toBe("pending");
    }
  });

  it("validates that ARTICLE_ROUTE_PAIRS matches translation relationships in MDX articles", () => {
    const articles = validateBlogPipeline();
    const translationPairs: { enSlug: string; koSlug: string }[] = [];

    for (const a of articles) {
      if (a.record.locale === "ko" && a.record.translationOf) {
        const source = articles.find((s) => s.record.id === a.record.translationOf);
        if (source && source.record.locale === "en") {
          translationPairs.push({
            enSlug: source.record.slug,
            koSlug: a.record.slug,
          });
        }
      }
    }

    expect([...ARTICLE_ROUTE_PAIRS]).toEqual(translationPairs);
  });

  it("proves historical route retirement manifest is complete", () => {
    expect(HISTORICAL_ROUTE_MANIFEST).toHaveLength(5);
    for (const item of HISTORICAL_ROUTE_MANIFEST) {
      expect(item.disposition).toBe("retired");
      expect(item.replacementUrl).toBeNull();
    }
  });
});

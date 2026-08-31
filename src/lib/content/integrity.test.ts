import { describe, it, expect } from "vitest";
import { validateContentRegistry, ContentIntegrityError } from "./validate";
import { canonicalContentRegistry } from "@/data/content";
import { createSyntheticRegistry } from "./fixtures";

const FIXED_TEST_NOW = new Date("2026-08-28T00:00:00Z");
const AVAILABLE_ASSETS = new Set(["/example-asset.png"]);

describe("Content Integrity Validator", () => {
  it("passes for canonical production registry", () => {
    const result = validateContentRegistry(canonicalContentRegistry, {
      now: new Date("2026-08-31T00:00:00Z"),
      availableAssets: AVAILABLE_ASSETS,
    });
    expect(result).toBeDefined();
    expect(result.siteIdentity).not.toBeNull();
    expect(result.siteIdentity?.displayName.en).toBe("Sean Choi");
    expect(result.siteIdentity?.displayName.ko).toBe("최예현");
    expect(result.experiences.length).toBeGreaterThanOrEqual(3);
    expect(result.educationAndTraining.length).toBeGreaterThanOrEqual(2);
    expect(result.skills.length).toBeGreaterThanOrEqual(10);
    expect(result.projects).toHaveLength(0);
    expect(result.articles).toHaveLength(0);
  });

  it("passes for valid synthetic draft registry", () => {
    const registry = createSyntheticRegistry();
    const result = validateContentRegistry(registry, {
      now: FIXED_TEST_NOW,
      availableAssets: AVAILABLE_ASSETS,
    });
    expect(result).toBeDefined();
    expect(result.projects).toHaveLength(1);
    expect(result.projects[0].syntheticPlaceholder).toBe(true);
    expect(result.projects[0].publicationStatus).toBe("draft");
  });

  describe("Stable Issue Codes Coverage", () => {
    it("emits schema_invalid when structural shape fails or unknown fields are present", () => {
      expect(() =>
        validateContentRegistry(
          { notAValidRegistry: true },
          { now: FIXED_TEST_NOW, availableAssets: AVAILABLE_ASSETS }
        )
      ).toThrowError(ContentIntegrityError);

      try {
        validateContentRegistry(
          { notAValidRegistry: true },
          { now: FIXED_TEST_NOW, availableAssets: AVAILABLE_ASSETS }
        );
      } catch (err) {
        const error = err as ContentIntegrityError;
        expect(error.issues.some((i) => i.code === "schema_invalid")).toBe(true);
      }

      // Undeclared privacy field on siteIdentity
      const reg = createSyntheticRegistry();
      (reg.siteIdentity as unknown as Record<string, unknown>).phone = "+82-10-1234-5678";
      try {
        validateContentRegistry(reg, { now: FIXED_TEST_NOW, availableAssets: AVAILABLE_ASSETS });
        expect.unreachable("Should have thrown");
      } catch (err) {
        const error = err as ContentIntegrityError;
        expect(error.issues.some((i) => i.code === "schema_invalid")).toBe(true);
      }
    });

    it("emits duplicate_id when record IDs collide across collections", () => {
      const registry = createSyntheticRegistry();
      // Collide experience ID with project ID
      registry.experiences[0].id = registry.projects[0].id;

      try {
        validateContentRegistry(registry, {
          now: FIXED_TEST_NOW,
          availableAssets: AVAILABLE_ASSETS,
        });
        expect.unreachable("Should have thrown");
      } catch (err) {
        const error = err as ContentIntegrityError;
        expect(error.issues.some((i) => i.code === "duplicate_id")).toBe(true);
      }
    });

    it("emits duplicate_slug for same-locale collision, but permits cross-locale matching slugs", () => {
      const registry = createSyntheticRegistry();
      // Add another EN project with identical slug
      registry.projects.push({
        ...registry.projects[0],
        id: "example-project-2",
        slug: "example-project",
        locale: "en",
      });

      try {
        validateContentRegistry(registry, {
          now: FIXED_TEST_NOW,
          availableAssets: AVAILABLE_ASSETS,
        });
        expect.unreachable("Should have thrown");
      } catch (err) {
        const error = err as ContentIntegrityError;
        expect(error.issues.some((i) => i.code === "duplicate_slug")).toBe(true);
      }

      // Cross-locale matching slug is permitted
      const crossLocaleRegistry = createSyntheticRegistry();
      crossLocaleRegistry.projects.push({
        ...crossLocaleRegistry.projects[0],
        id: "example-project-ko",
        slug: "example-project",
        locale: "ko",
        translationOf: "example-project",
      });
      expect(() =>
        validateContentRegistry(crossLocaleRegistry, {
          now: FIXED_TEST_NOW,
          availableAssets: AVAILABLE_ASSETS,
        })
      ).not.toThrow();
    });

    it("emits public_synthetic_placeholder when a synthetic placeholder is marked public", () => {
      const registry = createSyntheticRegistry();
      registry.projects[0].publicationStatus = "public";
      registry.projects[0].claimState = "verified";
      registry.projects[0].syntheticPlaceholder = true;
      registry.projects[0].reviewedOn = "2026-08-28";

      try {
        validateContentRegistry(registry, {
          now: FIXED_TEST_NOW,
          availableAssets: AVAILABLE_ASSETS,
        });
        expect.unreachable("Should have thrown");
      } catch (err) {
        const error = err as ContentIntegrityError;
        expect(error.issues.some((i) => i.code === "public_synthetic_placeholder")).toBe(true);
      }
    });

    it("emits unverified_public_record when a public record has pending or disputed claimState", () => {
      const registry = createSyntheticRegistry();
      registry.projects[0].publicationStatus = "public";
      registry.projects[0].claimState = "pending";
      registry.projects[0].syntheticPlaceholder = false;
      registry.projects[0].reviewedOn = "2026-08-28";

      try {
        validateContentRegistry(registry, {
          now: FIXED_TEST_NOW,
          availableAssets: AVAILABLE_ASSETS,
        });
        expect.unreachable("Should have thrown");
      } catch (err) {
        const error = err as ContentIntegrityError;
        expect(error.issues.some((i) => i.code === "unverified_public_record")).toBe(true);
      }
    });

    it("emits missing_review_date when a public record lacks reviewedOn", () => {
      const registry = createSyntheticRegistry();
      registry.projects[0].publicationStatus = "public";
      registry.projects[0].claimState = "verified";
      registry.projects[0].syntheticPlaceholder = false;
      registry.projects[0].reviewedOn = undefined;

      try {
        validateContentRegistry(registry, {
          now: FIXED_TEST_NOW,
          availableAssets: AVAILABLE_ASSETS,
        });
        expect.unreachable("Should have thrown");
      } catch (err) {
        const error = err as ContentIntegrityError;
        expect(error.issues.some((i) => i.code === "missing_review_date")).toBe(true);
      }
    });

    it("emits unreviewed_public_translation when public record has draft translation", () => {
      const registry = createSyntheticRegistry();
      registry.siteIdentity!.publicationStatus = "public";
      registry.siteIdentity!.claimState = "verified";
      registry.siteIdentity!.syntheticPlaceholder = false;
      registry.siteIdentity!.reviewedOn = "2026-08-28";
      registry.siteIdentity!.displayName = {
        en: "Sean Choi",
        ko: "최승환",
        koReview: "draft",
      };

      try {
        validateContentRegistry(registry, {
          now: FIXED_TEST_NOW,
          availableAssets: AVAILABLE_ASSETS,
        });
        expect.unreachable("Should have thrown");
      } catch (err) {
        const error = err as ContentIntegrityError;
        expect(error.issues.some((i) => i.code === "unreviewed_public_translation")).toBe(true);
      }
    });

    it("emits invalid_date_range for invalid ongoing/end combinations or end < start", () => {
      // 1. Ongoing with end date
      const r1 = createSyntheticRegistry();
      r1.experiences[0].dateRange = {
        start: "2024-01",
        end: "2025-01",
        ongoing: true,
      };
      expect(() =>
        validateContentRegistry(r1, { now: FIXED_TEST_NOW, availableAssets: AVAILABLE_ASSETS })
      ).toThrowError(/invalid_date_range/);

      // 2. Non-ongoing with null end date
      const r2 = createSyntheticRegistry();
      r2.experiences[0].dateRange = {
        start: "2024-01",
        end: null,
        ongoing: false,
      };
      expect(() =>
        validateContentRegistry(r2, { now: FIXED_TEST_NOW, availableAssets: AVAILABLE_ASSETS })
      ).toThrowError(/invalid_date_range/);

      // 3. End before start
      const r3 = createSyntheticRegistry();
      r3.experiences[0].dateRange = {
        start: "2025-01",
        end: "2024-01",
        ongoing: false,
      };
      expect(() =>
        validateContentRegistry(r3, { now: FIXED_TEST_NOW, availableAssets: AVAILABLE_ASSETS })
      ).toThrowError(/invalid_date_range/);

      // 4. Null start on experience record (regression test: missing start not allowed on experience)
      const r4 = createSyntheticRegistry();
      r4.experiences[0].dateRange = {
        start: null,
        end: "2024-01",
        ongoing: false,
      };
      expect(() =>
        validateContentRegistry(r4, { now: FIXED_TEST_NOW, availableAssets: AVAILABLE_ASSETS })
      ).toThrowError(/invalid_date_range/);

      // 5. Null start on training record (regression test: missing start not allowed on training)
      const r5 = createSyntheticRegistry();
      r5.educationAndTraining[0].kind = "training";
      r5.educationAndTraining[0].dateRange = {
        start: null,
        end: "2026-12",
        ongoing: true,
      };
      expect(() =>
        validateContentRegistry(r5, { now: FIXED_TEST_NOW, availableAssets: AVAILABLE_ASSETS })
      ).toThrowError(/invalid_date_range/);

      // 6. Article updatedOn < publishedOn
      const r6 = createSyntheticRegistry();
      r6.articles[0].publishedOn = "2026-05-01";
      r6.articles[0].updatedOn = "2026-04-01";
      expect(() =>
        validateContentRegistry(r6, { now: FIXED_TEST_NOW, availableAssets: AVAILABLE_ASSETS })
      ).toThrowError(/invalid_date_range/);

      // 7. Ongoing training record with past scheduled end date (end < currentYearMonth)
      const r7 = createSyntheticRegistry();
      r7.educationAndTraining[0].kind = "training";
      r7.educationAndTraining[0].status = "in-progress";
      r7.educationAndTraining[0].dateRange = {
        start: "2026-01",
        end: "2026-05", // Precedes FIXED_TEST_NOW (2026-08)
        ongoing: true,
      };
      expect(() =>
        validateContentRegistry(r7, { now: FIXED_TEST_NOW, availableAssets: AVAILABLE_ASSETS })
      ).toThrowError(/invalid_date_range/);
    });

    it("emits future_publication_date when public article date is in the future", () => {
      const registry = createSyntheticRegistry();
      registry.articles[0].publicationStatus = "public";
      registry.articles[0].claimState = "verified";
      registry.articles[0].syntheticPlaceholder = false;
      registry.articles[0].reviewedOn = "2026-08-28";
      registry.articles[0].publishedOn = "2026-12-01"; // Future relative to 2026-08-28

      try {
        validateContentRegistry(registry, {
          now: FIXED_TEST_NOW,
          availableAssets: AVAILABLE_ASSETS,
        });
        expect.unreachable("Should have thrown");
      } catch (err) {
        const error = err as ContentIntegrityError;
        expect(error.issues.some((i) => i.code === "future_publication_date")).toBe(true);
      }
    });

    it("emits missing_evidence_reference when evidence ID is unresolved", () => {
      const registry = createSyntheticRegistry();
      registry.experiences[0].evidenceIds = ["non-existent-evidence-id"];

      try {
        validateContentRegistry(registry, {
          now: FIXED_TEST_NOW,
          availableAssets: AVAILABLE_ASSETS,
        });
        expect.unreachable("Should have thrown");
      } catch (err) {
        const error = err as ContentIntegrityError;
        expect(error.issues.some((i) => i.code === "missing_evidence_reference")).toBe(true);
      }
    });

    it("emits missing_link_reference when link ID is unresolved", () => {
      const registry = createSyntheticRegistry();
      registry.projects[0].linkIds = ["non-existent-link-id"];

      try {
        validateContentRegistry(registry, {
          now: FIXED_TEST_NOW,
          availableAssets: AVAILABLE_ASSETS,
        });
        expect.unreachable("Should have thrown");
      } catch (err) {
        const error = err as ContentIntegrityError;
        expect(error.issues.some((i) => i.code === "missing_link_reference")).toBe(true);
      }
    });

    it("emits featured_skill_without_evidence when featured skill lacks evidence references", () => {
      const registry = createSyntheticRegistry();
      registry.skills[0].prominence = "featured";
      registry.skills[0].evidenceIds = [];

      try {
        validateContentRegistry(registry, {
          now: FIXED_TEST_NOW,
          availableAssets: AVAILABLE_ASSETS,
        });
        expect.unreachable("Should have thrown");
      } catch (err) {
        const error = err as ContentIntegrityError;
        expect(error.issues.some((i) => i.code === "featured_skill_without_evidence")).toBe(true);
      }
    });

    it("emits missing_asset when referenced asset is not in available assets", () => {
      const registry = createSyntheticRegistry();
      registry.projects[0].assetPaths = ["/non-existent-image.png"];

      try {
        validateContentRegistry(registry, {
          now: FIXED_TEST_NOW,
          availableAssets: AVAILABLE_ASSETS,
        });
        expect.unreachable("Should have thrown");
      } catch (err) {
        const error = err as ContentIntegrityError;
        expect(error.issues.some((i) => i.code === "missing_asset")).toBe(true);
      }
    });

    it("emits invalid_translation_reference for non-existent source, same locale, or chained translations", () => {
      // 1. Non-existent source
      const r1 = createSyntheticRegistry();
      r1.projects[0].translationOf = "non-existent-project-source";
      expect(() =>
        validateContentRegistry(r1, { now: FIXED_TEST_NOW, availableAssets: AVAILABLE_ASSETS })
      ).toThrowError(/invalid_translation_reference/);

      // 2. Same locale translation
      const r2 = createSyntheticRegistry();
      r2.projects.push({
        ...r2.projects[0],
        id: "example-project-en-2",
        slug: "example-project-en-2",
        locale: "en",
        translationOf: "example-project",
      });
      expect(() =>
        validateContentRegistry(r2, { now: FIXED_TEST_NOW, availableAssets: AVAILABLE_ASSETS })
      ).toThrowError(/invalid_translation_reference/);

      // 3. Chained translation
      const r3 = createSyntheticRegistry();
      r3.projects.push({
        ...r3.projects[0],
        id: "example-project-ko",
        slug: "example-project",
        locale: "ko",
        translationOf: "example-project",
      });
      r3.projects.push({
        ...r3.projects[0],
        id: "example-project-chained",
        slug: "example-project-chained",
        locale: "en",
        translationOf: "example-project-ko", // source already has translationOf set
      });
      expect(() =>
        validateContentRegistry(r3, { now: FIXED_TEST_NOW, availableAssets: AVAILABLE_ASSETS })
      ).toThrowError(/invalid_translation_reference/);
    });

    it("emits planned_public_record when a public project or education record has status planned", () => {
      const registry = createSyntheticRegistry();
      registry.projects[0].publicationStatus = "public";
      registry.projects[0].claimState = "verified";
      registry.projects[0].syntheticPlaceholder = false;
      registry.projects[0].reviewedOn = "2026-08-28";
      registry.projects[0].status = "planned";

      try {
        validateContentRegistry(registry, {
          now: FIXED_TEST_NOW,
          availableAssets: AVAILABLE_ASSETS,
        });
        expect.unreachable("Should have thrown");
      } catch (err) {
        const error = err as ContentIntegrityError;
        expect(error.issues.some((i) => i.code === "planned_public_record")).toBe(true);
      }
    });

    it("aggregates multiple failures into a single validation error report", () => {
      const registry = createSyntheticRegistry();
      // Cause 3 distinct issues simultaneously:
      registry.skills[0].prominence = "featured";
      registry.skills[0].evidenceIds = []; // featured_skill_without_evidence
      registry.projects[0].linkIds = ["missing-link-123"]; // missing_link_reference
      registry.projects[0].assetPaths = ["/missing-img-123.png"]; // missing_asset

      try {
        validateContentRegistry(registry, {
          now: FIXED_TEST_NOW,
          availableAssets: AVAILABLE_ASSETS,
        });
        expect.unreachable("Should have thrown");
      } catch (err) {
        const error = err as ContentIntegrityError;
        expect(error.issues.length).toBeGreaterThanOrEqual(3);
        const codes = error.issues.map((i) => i.code);
        expect(codes).toContain("featured_skill_without_evidence");
        expect(codes).toContain("missing_link_reference");
        expect(codes).toContain("missing_asset");
      }
    });
  });
});

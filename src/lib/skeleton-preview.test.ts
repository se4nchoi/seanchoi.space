import { describe, it, expect } from "vitest";
import { isSkeletonPreviewEnabled } from "./skeleton-preview";
import { skeletonPreviewRegistry } from "@/data/skeleton-preview";
import { canonicalContentRegistry } from "@/data/content";
import { validateContentRegistry, ContentIntegrityError } from "@/lib/content/validate";

describe("Skeleton Preview Infrastructure & Policy", () => {
  describe("isSkeletonPreviewEnabled", () => {
    it("returns true when NODE_ENV is development", () => {
      expect(isSkeletonPreviewEnabled({ NODE_ENV: "development", VERCEL_ENV: undefined })).toBe(true);
      expect(isSkeletonPreviewEnabled({ NODE_ENV: "development", VERCEL_ENV: "production" })).toBe(true);
    });

    it("returns true when VERCEL_ENV is preview", () => {
      expect(isSkeletonPreviewEnabled({ NODE_ENV: "test", VERCEL_ENV: "preview" })).toBe(true);
      expect(isSkeletonPreviewEnabled({ NODE_ENV: "production", VERCEL_ENV: "preview" })).toBe(true);
    });

    it("returns false for ordinary production or missing env values", () => {
      expect(isSkeletonPreviewEnabled({ NODE_ENV: "production", VERCEL_ENV: undefined })).toBe(false);
      expect(isSkeletonPreviewEnabled({ NODE_ENV: "production", VERCEL_ENV: "production" })).toBe(false);
      expect(isSkeletonPreviewEnabled({ NODE_ENV: "test", VERCEL_ENV: undefined })).toBe(false);
      expect(isSkeletonPreviewEnabled({ NODE_ENV: "production", VERCEL_ENV: "development" })).toBe(false);
    });
  });

  describe("skeletonPreviewRegistry Schema & Integrity", () => {
    it("validates completely against validateContentRegistry with now=2026-08-29", () => {
      expect(() =>
        validateContentRegistry(skeletonPreviewRegistry, {
          now: "2026-08-29",
          availableAssets: [],
        })
      ).not.toThrow();
    });

    it("asserts all preview records are draft, pending, and syntheticPlaceholder=true", () => {
      const allRecords = [
        ...(skeletonPreviewRegistry.siteIdentity ? [skeletonPreviewRegistry.siteIdentity] : []),
        ...skeletonPreviewRegistry.evidence,
        ...skeletonPreviewRegistry.links,
        ...skeletonPreviewRegistry.experiences,
        ...skeletonPreviewRegistry.educationAndTraining,
        ...skeletonPreviewRegistry.skills,
        ...skeletonPreviewRegistry.projects,
        ...skeletonPreviewRegistry.articles,
      ];

      expect(allRecords.length).toBeGreaterThan(0);
      for (const record of allRecords) {
        expect(record.publicationStatus).toBe("draft");
        expect(record.claimState).toBe("pending");
        expect(record.syntheticPlaceholder).toBe(true);
      }
    });

    it("confirms canonical registry remains byte-for-byte empty", () => {
      expect(canonicalContentRegistry.siteIdentity).toBeNull();
      expect(canonicalContentRegistry.evidence).toEqual([]);
      expect(canonicalContentRegistry.links).toEqual([]);
      expect(canonicalContentRegistry.experiences).toEqual([]);
      expect(canonicalContentRegistry.educationAndTraining).toEqual([]);
      expect(canonicalContentRegistry.skills).toEqual([]);
      expect(canonicalContentRegistry.projects).toEqual([]);
      expect(canonicalContentRegistry.articles).toEqual([]);
    });

    it("fails validation if any synthetic record is marked public", () => {
      const leakingRegistry = {
        ...skeletonPreviewRegistry,
        projects: [
          {
            ...skeletonPreviewRegistry.projects[0],
            publicationStatus: "public" as const,
          },
        ],
      };

      expect(() =>
        validateContentRegistry(leakingRegistry, {
          now: "2026-08-29",
          availableAssets: [],
        })
      ).toThrow(ContentIntegrityError);
    });
  });
});

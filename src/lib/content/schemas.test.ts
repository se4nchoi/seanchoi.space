import { describe, it, expect } from "vitest";
import {
  calendarDateSchema,
  yearMonthSchema,
  recordIdSchema,
  slugSchema,
  httpsUrlSchema,
  assetPathSchema,
  localizedTextSchema,
  dateRangeSchema,
  linkRecordSchema,
  siteIdentitySchema,
  evidenceRecordSchema,
  experienceRecordSchema,
  experienceContributionSchema,
  educationOrTrainingRecordSchema,
  skillRecordSchema,
  projectRecordSchema,
  articleRecordSchema,
  supportingProjectRecordSchema,
  contentRegistrySchema,
} from "./schemas";
import {
  syntheticSiteIdentityFixture,
  syntheticEvidenceFixture,
  syntheticLinkFixture,
  syntheticExperienceFixture,
  syntheticEducationFixture,
  syntheticSkillFixture,
  syntheticProjectFixture,
  syntheticArticleFixture,
  createSyntheticRegistry,
} from "./fixtures";

describe("Content Schemas Primitives", () => {
  describe("recordIdSchema & slugSchema", () => {
    it("accepts valid lowercase kebab-case IDs and slugs starting with a letter", () => {
      expect(recordIdSchema.parse("project-a")).toBe("project-a");
      expect(recordIdSchema.parse("a1-b2-c3")).toBe("a1-b2-c3");
      expect(slugSchema.parse("my-first-post")).toBe("my-first-post");
    });

    it("rejects invalid IDs and slugs", () => {
      expect(() => recordIdSchema.parse("123-start-num")).toThrow();
      expect(() => recordIdSchema.parse("UpperCase")).toThrow();
      expect(() => recordIdSchema.parse("with spaces")).toThrow();
      expect(() => recordIdSchema.parse("-starts-with-dash")).toThrow();
      expect(() => slugSchema.parse("slug_with_underscore")).toThrow();
    });
  });

  describe("calendarDateSchema", () => {
    it("accepts valid calendar dates in YYYY-MM-DD format", () => {
      expect(calendarDateSchema.parse("2026-08-28")).toBe("2026-08-28");
      expect(calendarDateSchema.parse("2024-02-29")).toBe("2024-02-29"); // Leap year
    });

    it("rejects impossible or malformed calendar dates", () => {
      expect(() => calendarDateSchema.parse("2023-02-29")).toThrow(); // Non-leap year Feb 29
      expect(() => calendarDateSchema.parse("2026-04-31")).toThrow(); // April only has 30 days
      expect(() => calendarDateSchema.parse("2026-13-01")).toThrow(); // Month 13
      expect(() => calendarDateSchema.parse("2026-00-10")).toThrow(); // Month 00
      expect(() => calendarDateSchema.parse("2026/08/28")).toThrow(); // Bad format
    });
  });

  describe("yearMonthSchema", () => {
    it("accepts valid YYYY-MM formats", () => {
      expect(yearMonthSchema.parse("2026-08")).toBe("2026-08");
      expect(yearMonthSchema.parse("2024-12")).toBe("2024-12");
      expect(yearMonthSchema.parse("2024-01")).toBe("2024-01");
    });

    it("rejects invalid YYYY-MM formats", () => {
      expect(() => yearMonthSchema.parse("2026-00")).toThrow();
      expect(() => yearMonthSchema.parse("2026-13")).toThrow();
      expect(() => yearMonthSchema.parse("2026-8")).toThrow();
      expect(() => yearMonthSchema.parse("2026")).toThrow();
    });
  });

  describe("httpsUrlSchema", () => {
    it("accepts valid HTTPS URLs", () => {
      expect(httpsUrlSchema.parse("https://seanchoi.space")).toBe("https://seanchoi.space");
      expect(httpsUrlSchema.parse("https://github.com/se4nchoi")).toBe("https://github.com/se4nchoi");
    });

    it("rejects non-HTTPS, bare prefix, and malformed URLs", () => {
      expect(() => httpsUrlSchema.parse("https://")).toThrow();
      expect(() => httpsUrlSchema.parse("http://example.com")).toThrow();
      expect(() => httpsUrlSchema.parse("ftp://example.com")).toThrow();
      expect(() => httpsUrlSchema.parse("not-a-url")).toThrow();
    });
  });

  describe("assetPathSchema", () => {
    it("accepts valid absolute asset paths", () => {
      expect(assetPathSchema.parse("/images/logo.png")).toBe("/images/logo.png");
      expect(assetPathSchema.parse("/images/diagram.svg")).toBe("/images/diagram.svg");
    });

    it("rejects relative paths and path traversal attempts", () => {
      expect(() => assetPathSchema.parse("images/logo.png")).toThrow();
      expect(() => assetPathSchema.parse("/images/../secret.txt")).toThrow();
      expect(() => assetPathSchema.parse("/..")).toThrow();
    });
  });

  describe("dateRangeSchema", () => {
    it("accepts valid start and end dates for completed records", () => {
      const res = dateRangeSchema.parse({
        start: "2022-09",
        end: "2023-08",
        ongoing: false,
      });
      expect(res.start).toBe("2022-09");
      expect(res.end).toBe("2023-08");
      expect(res.ongoing).toBe(false);
    });

    it("accepts ongoing date ranges with null end date", () => {
      const res = dateRangeSchema.parse({
        start: "2026-06",
        end: null,
        ongoing: true,
      });
      expect(res.start).toBe("2026-06");
      expect(res.end).toBeNull();
      expect(res.ongoing).toBe(true);
    });

    it("accepts completion-only date ranges with null start date (e.g. conferred education)", () => {
      const res = dateRangeSchema.parse({
        start: null,
        end: "2026-06",
        ongoing: false,
      });
      expect(res.start).toBeNull();
      expect(res.end).toBe("2026-06");
      expect(res.ongoing).toBe(false);
    });
  });

  describe("localizedTextSchema", () => {
    it("accepts valid English-only text with missing koReview", () => {
      const res = localizedTextSchema.parse({
        en: "Hello",
        koReview: "missing",
      });
      expect(res.en).toBe("Hello");
      expect(res.ko).toBeUndefined();
    });

    it("accepts valid bilingual text with draft or reviewed koReview", () => {
      const draft = localizedTextSchema.parse({
        en: "Hello",
        ko: "안녕하세요",
        koReview: "draft",
      });
      expect(draft.ko).toBe("안녕하세요");

      const reviewed = localizedTextSchema.parse({
        en: "Hello",
        ko: "안녕하세요",
        koReview: "reviewed",
      });
      expect(reviewed.ko).toBe("안녕하세요");
    });

    it("rejects ko when koReview is missing", () => {
      expect(() =>
        localizedTextSchema.parse({
          en: "Hello",
          ko: "안녕하세요",
          koReview: "missing",
        })
      ).toThrow();
    });

    it("rejects missing ko when koReview is draft or reviewed", () => {
      expect(() =>
        localizedTextSchema.parse({
          en: "Hello",
          koReview: "draft",
        })
      ).toThrow();
      expect(() =>
        localizedTextSchema.parse({
          en: "Hello",
          koReview: "reviewed",
        })
      ).toThrow();
    });
  });

  describe("linkRecordSchema (Hardened Link Validation)", () => {
    it("accepts https://example.com for all kinds", () => {
      expect(
        linkRecordSchema.parse({
          ...syntheticLinkFixture,
          kind: "website",
          href: "https://example.com",
        })
      ).toBeDefined();

      expect(
        linkRecordSchema.parse({
          ...syntheticLinkFixture,
          kind: "email",
          href: "https://example.com/contact",
        })
      ).toBeDefined();
    });

    it("accepts mailto:person@example.com only for kind: email", () => {
      expect(
        linkRecordSchema.parse({
          ...syntheticLinkFixture,
          kind: "email",
          href: "mailto:person@example.com",
        })
      ).toBeDefined();

      expect(() =>
        linkRecordSchema.parse({
          ...syntheticLinkFixture,
          kind: "website",
          href: "mailto:person@example.com",
        })
      ).toThrow();
    });

    it("rejects malformed links and unsupported protocols", () => {
      // Bare https://
      expect(() =>
        linkRecordSchema.parse({
          ...syntheticLinkFixture,
          kind: "website",
          href: "https://",
        })
      ).toThrow();

      // Malformed email in mailto
      expect(() =>
        linkRecordSchema.parse({
          ...syntheticLinkFixture,
          kind: "email",
          href: "mailto:not-an-email",
        })
      ).toThrow();

      // Query-bearing mailto
      expect(() =>
        linkRecordSchema.parse({
          ...syntheticLinkFixture,
          kind: "email",
          href: "mailto:person@example.com?subject=hello",
        })
      ).toThrow();

      // Fragment-bearing mailto
      expect(() =>
        linkRecordSchema.parse({
          ...syntheticLinkFixture,
          kind: "email",
          href: "mailto:person@example.com#fragment",
        })
      ).toThrow();

      // Insecure HTTP
      expect(() =>
        linkRecordSchema.parse({
          ...syntheticLinkFixture,
          kind: "website",
          href: "http://example.com",
        })
      ).toThrow();
    });
  });

  describe("Strict Object Boundaries (Finding 1)", () => {
    it("rejects undeclared keys in localizedTextSchema", () => {
      expect(() =>
        localizedTextSchema.parse({
          en: "Hello",
          koReview: "missing",
          unknownKey: "forbidden",
        })
      ).toThrow();
    });

    it("rejects undeclared keys in dateRangeSchema", () => {
      expect(() =>
        dateRangeSchema.parse({
          start: "2024-01",
          end: null,
          ongoing: true,
          extraField: "forbidden",
        })
      ).toThrow();
    });

    it("rejects undeclared keys in experienceContributionSchema", () => {
      expect(() =>
        experienceContributionSchema.parse({
          text: { en: "Contribution text", koReview: "missing" },
          evidenceIds: ["example-evidence"],
          extraContributionField: "forbidden",
        })
      ).toThrow();
    });

    it("rejects privacy violations in siteIdentitySchema (phone, workAuthorization, streetAddress)", () => {
      expect(() =>
        siteIdentitySchema.parse({
          ...syntheticSiteIdentityFixture,
          phone: "+82-10-1234-5678",
        })
      ).toThrow();

      expect(() =>
        siteIdentitySchema.parse({
          ...syntheticSiteIdentityFixture,
          workAuthorization: "Citizen / Visa",
        })
      ).toThrow();

      expect(() =>
        siteIdentitySchema.parse({
          ...syntheticSiteIdentityFixture,
          streetAddress: "123 Main St",
        })
      ).toThrow();
    });

    it("rejects undeclared keys across all remaining record schemas", () => {
      expect(() =>
        evidenceRecordSchema.parse({
          ...syntheticEvidenceFixture,
          unknownEvidenceField: "forbidden",
        })
      ).toThrow();

      expect(() =>
        linkRecordSchema.parse({
          ...syntheticLinkFixture,
          unknownLinkField: "forbidden",
        })
      ).toThrow();

      expect(() =>
        experienceRecordSchema.parse({
          ...syntheticExperienceFixture,
          unknownExperienceField: "forbidden",
        })
      ).toThrow();

      expect(() =>
        educationOrTrainingRecordSchema.parse({
          ...syntheticEducationFixture,
          unknownEducationField: "forbidden",
        })
      ).toThrow();

      expect(() =>
        skillRecordSchema.parse({
          ...syntheticSkillFixture,
          unknownSkillField: "forbidden",
        })
      ).toThrow();

      expect(() =>
        projectRecordSchema.parse({
          ...syntheticProjectFixture,
          unknownProjectField: "forbidden",
        })
      ).toThrow();

      expect(() =>
        articleRecordSchema.parse({
          ...syntheticArticleFixture,
          unknownArticleField: "forbidden",
        })
      ).toThrow();

      expect(() =>
        supportingProjectRecordSchema.parse({
          id: "test-supp-proj",
          publicationStatus: "public",
          claimState: "verified",
          syntheticPlaceholder: false,
          reviewedOn: "2026-08-31",
          context: "self-directed",
          evidenceLevel: "project",
          title: { en: "Test", koReview: "missing" },
          summary: { en: "Summary", koReview: "missing" },
          role: { en: "Role", koReview: "missing" },
          technologies: ["React"],
          evidenceIds: ["ev-test"],
          unknownSupportingField: "forbidden",
        })
      ).toThrow();
    });

    it("rejects undeclared top-level collections in contentRegistrySchema", () => {
      const reg = createSyntheticRegistry();
      expect(() =>
        contentRegistrySchema.parse({
          ...reg,
          unknownCollection: [],
        })
      ).toThrow();
    });
  });

  describe("supportingProjectRecordSchema", () => {
    it("accepts valid self-directed supporting project record", () => {
      const parsed = supportingProjectRecordSchema.parse({
        id: "project-lan-chat",
        publicationStatus: "public",
        claimState: "verified",
        syntheticPlaceholder: false,
        reviewedOn: "2026-08-31",
        context: "self-directed",
        evidenceLevel: "project",
        title: { en: "Classroom LAN Chat", koReview: "missing" },
        summary: { en: "FastAPI LAN chat", koReview: "missing" },
        technologies: ["FastAPI", "WebSocket"],
        role: { en: "Sole Developer", koReview: "missing" },
        evidenceIds: ["evidence-lan-chat"],
      });
      expect(parsed.id).toBe("project-lan-chat");
      expect(parsed.context).toBe("self-directed");
    });

    it("rejects invalid context values", () => {
      expect(() =>
        supportingProjectRecordSchema.parse({
          id: "invalid-proj",
          publicationStatus: "public",
          claimState: "verified",
          syntheticPlaceholder: false,
          reviewedOn: "2026-08-31",
          context: "commercial-enterprise",
          evidenceLevel: "project",
          title: { en: "Invalid", koReview: "missing" },
          summary: { en: "Invalid", koReview: "missing" },
          technologies: ["React"],
          role: { en: "Dev", koReview: "missing" },
          evidenceIds: ["ev-test"],
        })
      ).toThrow();
    });
  });
});

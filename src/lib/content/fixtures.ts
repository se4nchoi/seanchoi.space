import type {
  ContentRegistry,
  EvidenceRecord,
  LinkRecord,
  ExperienceRecord,
  EducationOrTrainingRecord,
  SkillRecord,
  ProjectRecord,
  ArticleRecord,
  ResumeMetadata,
  SiteIdentity,
} from "./schemas";

export const syntheticEvidenceFixture: EvidenceRecord = {
  id: "example-evidence",
  publicationStatus: "draft",
  claimState: "pending",
  syntheticPlaceholder: true,
  reviewedOn: "2026-08-28",
  label: "Example Verification Artifact",
  level: "project",
  sourceKind: "repository",
  url: "https://example.com/repo",
  publiclyInspectable: true,
};

export const syntheticLinkFixture: LinkRecord = {
  id: "example-link",
  publicationStatus: "draft",
  claimState: "pending",
  syntheticPlaceholder: true,
  reviewedOn: "2026-08-28",
  label: {
    en: "Example Website",
    koReview: "missing",
  },
  kind: "website",
  href: "https://example.com",
};

export const syntheticSiteIdentityFixture: SiteIdentity = {
  id: "site-identity",
  publicationStatus: "draft",
  claimState: "pending",
  syntheticPlaceholder: true,
  reviewedOn: "2026-08-28",
  displayName: {
    en: "Example Person",
    koReview: "missing",
  },
  location: {
    en: "Example City",
    koReview: "missing",
  },
  recruitingEmail: "example@example.com",
  linkIds: ["example-link"],
};

export const syntheticExperienceFixture: ExperienceRecord = {
  id: "example-experience",
  publicationStatus: "draft",
  claimState: "pending",
  syntheticPlaceholder: true,
  reviewedOn: "2026-08-28",
  organization: {
    en: "Example Organization",
    koReview: "missing",
  },
  role: {
    en: "Example Engineer",
    koReview: "missing",
  },
  dateRange: {
    start: "2024-01",
    end: "2025-01",
    ongoing: false,
  },
  employmentType: "full-time",
  summary: {
    en: "Example experience summary for testing.",
    koReview: "missing",
  },
  contributions: [
    {
      text: {
        en: "Example contribution detail.",
        koReview: "missing",
      },
      evidenceIds: ["example-evidence"],
    },
  ],
  evidenceIds: ["example-evidence"],
};

export const syntheticEducationFixture: EducationOrTrainingRecord = {
  id: "example-education",
  publicationStatus: "draft",
  claimState: "pending",
  syntheticPlaceholder: true,
  reviewedOn: "2026-08-28",
  kind: "education",
  institution: {
    en: "Example University",
    koReview: "missing",
  },
  program: {
    en: "Example Engineering",
    koReview: "missing",
  },
  status: "completed",
  dateRange: {
    start: "2020-09",
    end: "2024-05",
    ongoing: false,
  },
  evidenceLevel: "training",
  evidenceIds: ["example-evidence"],
};

export const syntheticSkillFixture: SkillRecord = {
  id: "example-skill",
  publicationStatus: "draft",
  claimState: "pending",
  syntheticPlaceholder: true,
  reviewedOn: "2026-08-28",
  name: {
    en: "Example Technology",
    koReview: "missing",
  },
  evidenceLevel: "project",
  prominence: "featured",
  evidenceIds: ["example-evidence"],
};

export const syntheticProjectFixture: ProjectRecord = {
  id: "example-project",
  publicationStatus: "draft",
  claimState: "pending",
  syntheticPlaceholder: true,
  reviewedOn: "2026-08-28",
  slug: "example-project",
  locale: "en",
  title: "Example Project",
  summary: "Synthetic example project for schema testing.",
  context: "personal",
  status: "completed",
  role: "Lead Developer",
  contributionBoundary: "Built end-to-end prototype independently.",
  topics: ["testing", "architecture"],
  evidenceIds: ["example-evidence"],
  linkIds: ["example-link"],
  assetPaths: ["/example-asset.png"],
};

export const syntheticArticleFixture: ArticleRecord = {
  id: "example-article",
  publicationStatus: "draft",
  claimState: "pending",
  syntheticPlaceholder: true,
  reviewedOn: "2026-08-28",
  slug: "example-article",
  locale: "en",
  title: "Example Article",
  summary: "Synthetic example article summary.",
  publishedOn: "2026-01-15",
  topics: ["engineering"],
  source: "original",
  assetPaths: ["/example-asset.png"],
};

export const syntheticResumeFixture: ResumeMetadata = {
  id: "example-resume",
  publicationStatus: "draft",
  claimState: "pending",
  syntheticPlaceholder: true,
  reviewedOn: "2026-08-28",
  revision: "v1.0",
  effectiveDate: "2026-08-28",
  assetPath: "/resume.pdf",
  locale: "en",
  evidenceIds: ["example-evidence"],
};

export function createSyntheticRegistry(): ContentRegistry {
  return {
    siteIdentity: { ...syntheticSiteIdentityFixture },
    evidence: [{ ...syntheticEvidenceFixture }],
    links: [{ ...syntheticLinkFixture }],
    experiences: [{ ...syntheticExperienceFixture }],
    educationAndTraining: [{ ...syntheticEducationFixture }],
    skills: [{ ...syntheticSkillFixture }],
    projects: [{ ...syntheticProjectFixture }],
    articles: [{ ...syntheticArticleFixture }],
    resumes: [{ ...syntheticResumeFixture }],
  };
}

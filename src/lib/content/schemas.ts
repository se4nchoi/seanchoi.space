import { z } from "zod";

// --- Shared Primitives ---

export const localeSchema = z.enum(["en", "ko"]);
export type Locale = z.infer<typeof localeSchema>;

export const claimStateSchema = z.enum([
  "verified",
  "approved-direction",
  "pending",
  "restricted",
  "prohibited",
  "retired",
]);
export type ClaimState = z.infer<typeof claimStateSchema>;

export const evidenceLevelSchema = z.enum([
  "professional",
  "project",
  "training",
  "exposure",
]);
export type EvidenceLevel = z.infer<typeof evidenceLevelSchema>;

export const publicationStatusSchema = z.enum(["draft", "public", "retired"]);
export type PublicationStatus = z.infer<typeof publicationStatusSchema>;

export const translationReviewSchema = z.enum(["missing", "draft", "reviewed"]);
export type TranslationReview = z.infer<typeof translationReviewSchema>;

const KEBAB_CASE_REGEX = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;

export const recordIdSchema = z
  .string()
  .trim()
  .regex(KEBAB_CASE_REGEX, "ID must be lowercase kebab-case starting with a letter");
export type RecordId = z.infer<typeof recordIdSchema>;

export const slugSchema = z
  .string()
  .trim()
  .regex(KEBAB_CASE_REGEX, "Slug must be lowercase kebab-case starting with a letter");
export type Slug = z.infer<typeof slugSchema>;

export const calendarDateSchema = z
  .string()
  .trim()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Calendar date must follow YYYY-MM-DD format")
  .refine((val) => {
    const [yStr, mStr, dStr] = val.split("-");
    const y = Number(yStr);
    const m = Number(mStr);
    const d = Number(dStr);
    if (m < 1 || m > 12) return false;
    const date = new Date(Date.UTC(y, m - 1, d));
    return (
      date.getUTCFullYear() === y &&
      date.getUTCMonth() === m - 1 &&
      date.getUTCDate() === d
    );
  }, "Invalid calendar date");
export type CalendarDate = z.infer<typeof calendarDateSchema>;

export const yearMonthSchema = z
  .string()
  .trim()
  .regex(/^\d{4}-(0[1-9]|1[0-2])$/, "Year-month must follow YYYY-MM format with valid month 01-12");
export type YearMonth = z.infer<typeof yearMonthSchema>;

export const httpsUrlSchema = z
  .string()
  .trim()
  .url("Invalid URL format")
  .refine((url) => url.startsWith("https://") && url.length > 8, "URL must be a valid HTTPS URL");
export type HttpsUrl = z.infer<typeof httpsUrlSchema>;

export const mailtoHrefSchema = z
  .string()
  .trim()
  .refine((val) => val.startsWith("mailto:"), "Must start with mailto:")
  .refine((val) => !val.includes("?") && !val.includes("#"), "mailto cannot contain query or fragment")
  .refine((val) => {
    const address = val.slice(7);
    return z.string().email().safeParse(address).success;
  }, "Invalid mailto email address");
export type MailtoHref = z.infer<typeof mailtoHrefSchema>;

export const assetPathSchema = z
  .string()
  .trim()
  .regex(/^\/[^\\.]+(\.[^\\/]+)?.*$/, "Asset path must start with '/'")
  .refine((path) => !path.includes(".."), "Asset path cannot contain path traversal ('..')")
  .refine((path) => path.startsWith("/"), "Asset path must begin with '/'");
export type AssetPath = z.infer<typeof assetPathSchema>;

export const localizedTextSchema = z
  .object({
    en: z.string().trim().min(1, "English text cannot be blank"),
    ko: z.string().trim().min(1, "Korean text cannot be blank").optional(),
    koReview: translationReviewSchema,
  })
  .strict()
  .refine(
    (data) => {
      if (data.koReview === "missing") {
        return data.ko === undefined;
      }
      return typeof data.ko === "string" && data.ko.length > 0;
    },
    {
      message:
        "When koReview is 'missing', ko must be omitted. When koReview is 'draft' or 'reviewed', ko is required.",
    }
  );
export type LocalizedText = z.infer<typeof localizedTextSchema>;

export const dateRangeSchema = z
  .object({
    start: yearMonthSchema,
    end: yearMonthSchema.nullable(),
    ongoing: z.boolean(),
  })
  .strict();
export type DateRange = z.infer<typeof dateRangeSchema>;

// --- Common Publishable Record ---

export const commonRecordSchema = z
  .object({
    id: recordIdSchema,
    publicationStatus: publicationStatusSchema,
    claimState: claimStateSchema,
    syntheticPlaceholder: z.boolean(),
    reviewedOn: calendarDateSchema.optional(),
  })
  .strict();
export type CommonRecord = z.infer<typeof commonRecordSchema>;

// --- Evidence & Links ---

export const evidenceSourceKindSchema = z.enum([
  "repository",
  "demo",
  "artifact",
  "public-document",
  "direct-confirmation",
]);
export type EvidenceSourceKind = z.infer<typeof evidenceSourceKindSchema>;

export const evidenceRecordSchema = commonRecordSchema
  .extend({
    label: z.string().trim().min(1, "Label cannot be blank"),
    level: evidenceLevelSchema,
    sourceKind: evidenceSourceKindSchema,
    url: httpsUrlSchema.optional(),
    publiclyInspectable: z.boolean(),
  })
  .strict();
export type EvidenceRecord = z.infer<typeof evidenceRecordSchema>;

export const linkKindSchema = z.enum([
  "website",
  "github",
  "linkedin",
  "repository",
  "demo",
  "article",
  "document",
  "email",
  "other",
]);
export type LinkKind = z.infer<typeof linkKindSchema>;

export const linkRecordSchema = commonRecordSchema
  .extend({
    label: localizedTextSchema,
    kind: linkKindSchema,
    href: z.string().trim().min(1, "href cannot be blank"),
  })
  .strict()
  .refine(
    (data) => {
      if (data.kind === "email") {
        const isHttps = httpsUrlSchema.safeParse(data.href).success;
        const isMailto = mailtoHrefSchema.safeParse(data.href).success;
        return isHttps || isMailto;
      }
      return httpsUrlSchema.safeParse(data.href).success;
    },
    {
      message:
        "Link href must be a valid HTTPS URL, or a valid mailto: address without query/fragment when kind is email",
      path: ["href"],
    }
  );
export type LinkRecord = z.infer<typeof linkRecordSchema>;

// --- Career & Site Records ---

export const siteIdentitySchema = commonRecordSchema
  .extend({
    displayName: localizedTextSchema,
    location: localizedTextSchema,
    recruitingEmail: z.string().trim().email("Invalid recruiting email").optional(),
    trajectory: localizedTextSchema.optional(),
    linkIds: z.array(recordIdSchema),
  })
  .strict();
export type SiteIdentity = z.infer<typeof siteIdentitySchema>;

export const employmentTypeSchema = z.enum([
  "full-time",
  "part-time",
  "contract",
  "internship",
  "co-op",
  "military",
  "other",
]);
export type EmploymentType = z.infer<typeof employmentTypeSchema>;

export const experienceContributionSchema = z
  .object({
    text: localizedTextSchema,
    evidenceIds: z.array(recordIdSchema),
  })
  .strict();
export type ExperienceContribution = z.infer<typeof experienceContributionSchema>;

export const experienceRecordSchema = commonRecordSchema
  .extend({
    organization: localizedTextSchema,
    role: localizedTextSchema,
    dateRange: dateRangeSchema,
    employmentType: employmentTypeSchema,
    summary: localizedTextSchema,
    contributions: z.array(experienceContributionSchema),
    evidenceIds: z.array(recordIdSchema),
  })
  .strict();
export type ExperienceRecord = z.infer<typeof experienceRecordSchema>;

export const educationOrTrainingKindSchema = z.enum(["education", "training"]);
export type EducationOrTrainingKind = z.infer<typeof educationOrTrainingKindSchema>;

export const educationOrTrainingStatusSchema = z.enum([
  "planned",
  "in-progress",
  "completed",
]);
export type EducationOrTrainingStatus = z.infer<typeof educationOrTrainingStatusSchema>;

export const educationOrTrainingRecordSchema = commonRecordSchema
  .extend({
    kind: educationOrTrainingKindSchema,
    institution: localizedTextSchema,
    program: localizedTextSchema,
    status: educationOrTrainingStatusSchema,
    dateRange: dateRangeSchema,
    evidenceLevel: evidenceLevelSchema,
    evidenceIds: z.array(recordIdSchema),
  })
  .strict();
export type EducationOrTrainingRecord = z.infer<typeof educationOrTrainingRecordSchema>;

export const skillProminenceSchema = z.enum(["featured", "supporting"]);
export type SkillProminence = z.infer<typeof skillProminenceSchema>;

export const skillRecordSchema = commonRecordSchema
  .extend({
    name: localizedTextSchema,
    evidenceLevel: evidenceLevelSchema,
    prominence: skillProminenceSchema,
    evidenceIds: z.array(recordIdSchema),
  })
  .strict();
export type SkillRecord = z.infer<typeof skillRecordSchema>;

// --- Projects & Articles ---

export const projectContextSchema = z.enum([
  "professional",
  "personal",
  "training",
  "academic",
]);
export type ProjectContext = z.infer<typeof projectContextSchema>;

export const projectStatusSchema = z.enum([
  "planned",
  "in-progress",
  "completed",
  "archived",
]);
export type ProjectStatus = z.infer<typeof projectStatusSchema>;

export const projectRecordSchema = commonRecordSchema
  .extend({
    slug: slugSchema,
    locale: localeSchema,
    translationOf: recordIdSchema.optional(),
    title: z.string().trim().min(1, "Title cannot be blank"),
    summary: z.string().trim().min(1, "Summary cannot be blank"),
    context: projectContextSchema,
    status: projectStatusSchema,
    role: z.string().trim().min(1, "Role cannot be blank"),
    contributionBoundary: z.string().trim().min(1, "Contribution boundary cannot be blank"),
    topics: z.array(z.string().trim().min(1, "Topic cannot be blank")),
    evidenceIds: z.array(recordIdSchema),
    linkIds: z.array(recordIdSchema),
    assetPaths: z.array(assetPathSchema),
  })
  .strict();
export type ProjectRecord = z.infer<typeof projectRecordSchema>;

export const articleSourceSchema = z.enum(["original", "revised-legacy"]);
export type ArticleSource = z.infer<typeof articleSourceSchema>;

export const articleRecordSchema = commonRecordSchema
  .extend({
    slug: slugSchema,
    locale: localeSchema,
    translationOf: recordIdSchema.optional(),
    title: z.string().trim().min(1, "Title cannot be blank"),
    summary: z.string().trim().min(1, "Summary cannot be blank"),
    publishedOn: calendarDateSchema,
    updatedOn: calendarDateSchema.optional(),
    topics: z.array(z.string().trim().min(1, "Topic cannot be blank")),
    source: articleSourceSchema,
    legacySlug: slugSchema.optional(),
    assetPaths: z.array(assetPathSchema),
  })
  .strict();
export type ArticleRecord = z.infer<typeof articleRecordSchema>;

// --- Résumé Metadata ---

export const resumeMetadataSchema = commonRecordSchema
  .extend({
    revision: z.string().trim().min(1, "Revision cannot be blank"),
    effectiveDate: calendarDateSchema,
    assetPath: assetPathSchema,
    locale: localeSchema,
    evidenceIds: z.array(recordIdSchema),
  })
  .strict();
export type ResumeMetadata = z.infer<typeof resumeMetadataSchema>;

// --- Content Registry ---

export const contentRegistrySchema = z
  .object({
    siteIdentity: siteIdentitySchema.nullable(),
    evidence: z.array(evidenceRecordSchema),
    links: z.array(linkRecordSchema),
    experiences: z.array(experienceRecordSchema),
    educationAndTraining: z.array(educationOrTrainingRecordSchema),
    skills: z.array(skillRecordSchema),
    projects: z.array(projectRecordSchema),
    articles: z.array(articleRecordSchema),
    resumes: z.array(resumeMetadataSchema),
  })
  .strict();
export type ContentRegistry = z.infer<typeof contentRegistrySchema>;

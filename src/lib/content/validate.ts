import {
  contentRegistrySchema,
  type ContentRegistry,
  type LocalizedText,
} from "./schemas";
import { ZodError } from "zod";

export type ContentIntegrityIssueCode =
  | "schema_invalid"
  | "duplicate_id"
  | "duplicate_slug"
  | "unverified_public_record"
  | "public_synthetic_placeholder"
  | "missing_review_date"
  | "unreviewed_public_translation"
  | "invalid_date_range"
  | "future_publication_date"
  | "missing_evidence_reference"
  | "missing_link_reference"
  | "featured_skill_without_evidence"
  | "missing_asset"
  | "invalid_translation_reference"
  | "planned_public_record";

export interface ContentIntegrityIssue {
  code: ContentIntegrityIssueCode;
  path: string;
  message: string;
  recordId?: string;
}

export class ContentIntegrityError extends Error {
  readonly issues: ContentIntegrityIssue[];

  constructor(issues: ContentIntegrityIssue[]) {
    const summary = issues.map((i) => `[${i.code}] ${i.path}: ${i.message}`).join("\n");
    super(`Content integrity validation failed with ${issues.length} issue(s):\n${summary}`);
    this.name = "ContentIntegrityError";
    this.issues = issues;
  }
}

export interface ValidationOptions {
  now: Date | string;
  availableAssets?: Set<string> | string[];
}

function formatDateToYYYYMMDD(date: Date | string): string {
  if (typeof date === "string") {
    return date.slice(0, 10);
  }
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function checkLocalizedTextForUnreviewedPublic(
  text: LocalizedText | undefined,
  path: string,
  recordId: string,
  issues: ContentIntegrityIssue[]
) {
  if (!text) return;
  if (text.koReview === "draft") {
    issues.push({
      code: "unreviewed_public_translation",
      path,
      recordId,
      message: `Public record '${recordId}' contains draft unreviewed Korean translation at '${path}'`,
    });
  }
}

export function validateContentRegistry(
  rawInput: unknown,
  options: ValidationOptions
): ContentIntegrity {
  const issues: ContentIntegrityIssue[] = [];
  const nowDateStr = formatDateToYYYYMMDD(options.now);
  const assetSet =
    options.availableAssets instanceof Set
      ? options.availableAssets
      : new Set(options.availableAssets || []);

  // 1. Zod Schema Validation
  let registry: ContentRegistry;
  try {
    registry = contentRegistrySchema.parse(rawInput);
  } catch (err) {
    if (err instanceof ZodError) {
      for (const issue of err.issues) {
        issues.push({
          code: "schema_invalid",
          path: issue.path.join("."),
          message: issue.message,
        });
      }
    } else {
      issues.push({
        code: "schema_invalid",
        path: "root",
        message: err instanceof Error ? err.message : "Unknown schema validation error",
      });
    }
    throw new ContentIntegrityError(issues);
  }

  // Collect all records
  const allRecords = [
    ...(registry.siteIdentity ? [registry.siteIdentity] : []),
    ...registry.evidence,
    ...registry.links,
    ...registry.experiences,
    ...registry.educationAndTraining,
    ...registry.skills,
    ...registry.projects,
    ...registry.articles,
  ];

  // 2. Duplicate ID Check (globally unique across all collections)
  const seenIds = new Map<string, string>();
  for (const record of allRecords) {
    if (seenIds.has(record.id)) {
      issues.push({
        code: "duplicate_id",
        path: `records.${record.id}`,
        recordId: record.id,
        message: `Duplicate record ID '${record.id}' found across collections`,
      });
    } else {
      seenIds.set(record.id, record.id);
    }
  }

  // 3. Duplicate Slug Check (unique per record type + locale)
  const projectSlugs = new Set<string>();
  for (const project of registry.projects) {
    const key = `${project.locale}:${project.slug}`;
    if (projectSlugs.has(key)) {
      issues.push({
        code: "duplicate_slug",
        path: `projects.${project.id}.slug`,
        recordId: project.id,
        message: `Duplicate project slug '${project.slug}' for locale '${project.locale}'`,
      });
    } else {
      projectSlugs.add(key);
    }
  }

  const articleSlugs = new Set<string>();
  for (const article of registry.articles) {
    const key = `${article.locale}:${article.slug}`;
    if (articleSlugs.has(key)) {
      issues.push({
        code: "duplicate_slug",
        path: `articles.${article.id}.slug`,
        recordId: article.id,
        message: `Duplicate article slug '${article.slug}' for locale '${article.locale}'`,
      });
    } else {
      articleSlugs.add(key);
    }
  }

  // Build reference index maps
  const evidenceMap = new Map(registry.evidence.map((e) => [e.id, e]));
  const linkMap = new Map(registry.links.map((l) => [l.id, l]));
  const projectMap = new Map(registry.projects.map((p) => [p.id, p]));
  const articleMap = new Map(registry.articles.map((a) => [a.id, a]));

  // Helper for evidence reference verification
  const checkEvidenceIds = (ids: string[], path: string, recordId: string) => {
    for (const id of ids) {
      if (!evidenceMap.has(id)) {
        issues.push({
          code: "missing_evidence_reference",
          path,
          recordId,
          message: `Referenced evidence ID '${id}' does not exist in registry`,
        });
      }
    }
  };

  // Helper for link reference verification
  const checkLinkIds = (ids: string[], path: string, recordId: string) => {
    for (const id of ids) {
      if (!linkMap.has(id)) {
        issues.push({
          code: "missing_link_reference",
          path,
          recordId,
          message: `Referenced link ID '${id}' does not exist in registry`,
        });
      }
    }
  };

  // Helper for asset verification
  const checkAssetPath = (assetPath: string, path: string, recordId: string) => {
    if (!assetSet.has(assetPath)) {
      issues.push({
        code: "missing_asset",
        path,
        recordId,
        message: `Referenced asset path '${assetPath}' is not in available assets`,
      });
    }
  };

  // 4. Validate Individual Records & Cross-Record Rules

  for (const record of allRecords) {
    const isPublic = record.publicationStatus === "public";

    // Public Record Verification
    if (isPublic) {
      if (record.claimState !== "verified") {
        issues.push({
          code: "unverified_public_record",
          path: `${record.id}.claimState`,
          recordId: record.id,
          message: `Public record '${record.id}' must have claimState 'verified', but got '${record.claimState}'`,
        });
      }

      if (record.syntheticPlaceholder) {
        issues.push({
          code: "public_synthetic_placeholder",
          path: `${record.id}.syntheticPlaceholder`,
          recordId: record.id,
          message: `Public record '${record.id}' cannot be a synthetic placeholder`,
        });
      }

      if (!record.reviewedOn) {
        issues.push({
          code: "missing_review_date",
          path: `${record.id}.reviewedOn`,
          recordId: record.id,
          message: `Public record '${record.id}' must have a reviewedOn calendar date`,
        });
      }
    }
  }

  // Site Identity
  if (registry.siteIdentity) {
    const site = registry.siteIdentity;
    checkLinkIds(site.linkIds, `siteIdentity.linkIds`, site.id);
    if (site.publicationStatus === "public") {
      checkLocalizedTextForUnreviewedPublic(site.displayName, `siteIdentity.displayName`, site.id, issues);
      checkLocalizedTextForUnreviewedPublic(site.location, `siteIdentity.location`, site.id, issues);
      checkLocalizedTextForUnreviewedPublic(site.trajectory, `siteIdentity.trajectory`, site.id, issues);
    }
  }

  // Links
  for (const link of registry.links) {
    if (link.publicationStatus === "public") {
      checkLocalizedTextForUnreviewedPublic(link.label, `links.${link.id}.label`, link.id, issues);
    }
  }

  // Experiences
  for (const exp of registry.experiences) {
    checkEvidenceIds(exp.evidenceIds, `experiences.${exp.id}.evidenceIds`, exp.id);
    for (let i = 0; i < exp.contributions.length; i++) {
      const contrib = exp.contributions[i];
      checkEvidenceIds(
        contrib.evidenceIds,
        `experiences.${exp.id}.contributions[${i}].evidenceIds`,
        exp.id
      );
      if (exp.publicationStatus === "public") {
        checkLocalizedTextForUnreviewedPublic(
          contrib.text,
          `experiences.${exp.id}.contributions[${i}].text`,
          exp.id,
          issues
        );
      }
    }

    // Date range validation
    const { start, end, ongoing } = exp.dateRange;
    if (ongoing && end !== null) {
      issues.push({
        code: "invalid_date_range",
        path: `experiences.${exp.id}.dateRange`,
        recordId: exp.id,
        message: `Ongoing experience date range cannot specify an end date`,
      });
    } else if (!ongoing && end === null) {
      issues.push({
        code: "invalid_date_range",
        path: `experiences.${exp.id}.dateRange`,
        recordId: exp.id,
        message: `Non-ongoing experience date range must specify an end date`,
      });
    } else if (end !== null && end < start) {
      issues.push({
        code: "invalid_date_range",
        path: `experiences.${exp.id}.dateRange`,
        recordId: exp.id,
        message: `End date '${end}' cannot precede start date '${start}'`,
      });
    }

    if (exp.publicationStatus === "public") {
      checkLocalizedTextForUnreviewedPublic(exp.organization, `experiences.${exp.id}.organization`, exp.id, issues);
      checkLocalizedTextForUnreviewedPublic(exp.role, `experiences.${exp.id}.role`, exp.id, issues);
      checkLocalizedTextForUnreviewedPublic(exp.summary, `experiences.${exp.id}.summary`, exp.id, issues);
    }
  }

  // Education & Training
  for (const edu of registry.educationAndTraining) {
    checkEvidenceIds(edu.evidenceIds, `educationAndTraining.${edu.id}.evidenceIds`, edu.id);

    if (edu.publicationStatus === "public" && edu.status === "planned") {
      issues.push({
        code: "planned_public_record",
        path: `educationAndTraining.${edu.id}.status`,
        recordId: edu.id,
        message: `Public education/training record cannot have status 'planned'`,
      });
    }

    const { start, end, ongoing } = edu.dateRange;
    if (ongoing && end !== null) {
      issues.push({
        code: "invalid_date_range",
        path: `educationAndTraining.${edu.id}.dateRange`,
        recordId: edu.id,
        message: `Ongoing education/training date range cannot specify an end date`,
      });
    } else if (!ongoing && end === null) {
      issues.push({
        code: "invalid_date_range",
        path: `educationAndTraining.${edu.id}.dateRange`,
        recordId: edu.id,
        message: `Non-ongoing education/training date range must specify an end date`,
      });
    } else if (end !== null && end < start) {
      issues.push({
        code: "invalid_date_range",
        path: `educationAndTraining.${edu.id}.dateRange`,
        recordId: edu.id,
        message: `End date '${end}' cannot precede start date '${start}'`,
      });
    }

    if (edu.publicationStatus === "public") {
      checkLocalizedTextForUnreviewedPublic(edu.institution, `educationAndTraining.${edu.id}.institution`, edu.id, issues);
      checkLocalizedTextForUnreviewedPublic(edu.program, `educationAndTraining.${edu.id}.program`, edu.id, issues);
    }
  }

  // Skills
  for (const skill of registry.skills) {
    checkEvidenceIds(skill.evidenceIds, `skills.${skill.id}.evidenceIds`, skill.id);

    if (skill.prominence === "featured" && skill.evidenceIds.length === 0) {
      issues.push({
        code: "featured_skill_without_evidence",
        path: `skills.${skill.id}.evidenceIds`,
        recordId: skill.id,
        message: `Featured skill '${skill.id}' must have at least one evidence reference`,
      });
    }

    if (skill.publicationStatus === "public") {
      checkLocalizedTextForUnreviewedPublic(skill.name, `skills.${skill.id}.name`, skill.id, issues);
    }
  }

  // Projects
  for (const project of registry.projects) {
    checkEvidenceIds(project.evidenceIds, `projects.${project.id}.evidenceIds`, project.id);
    checkLinkIds(project.linkIds, `projects.${project.id}.linkIds`, project.id);
    for (let i = 0; i < project.assetPaths.length; i++) {
      checkAssetPath(project.assetPaths[i], `projects.${project.id}.assetPaths[${i}]`, project.id);
    }

    if (project.publicationStatus === "public" && project.status === "planned") {
      issues.push({
        code: "planned_public_record",
        path: `projects.${project.id}.status`,
        recordId: project.id,
        message: `Public project cannot have status 'planned'`,
      });
    }

    // Translation validation
    if (project.translationOf) {
      const source = projectMap.get(project.translationOf);
      if (!source) {
        issues.push({
          code: "invalid_translation_reference",
          path: `projects.${project.id}.translationOf`,
          recordId: project.id,
          message: `Referenced project translation source '${project.translationOf}' does not exist`,
        });
      } else if (source.locale === project.locale) {
        issues.push({
          code: "invalid_translation_reference",
          path: `projects.${project.id}.translationOf`,
          recordId: project.id,
          message: `Translation source project '${source.id}' must have opposite locale (got '${source.locale}')`,
        });
      } else if (source.translationOf) {
        issues.push({
          code: "invalid_translation_reference",
          path: `projects.${project.id}.translationOf`,
          recordId: project.id,
          message: `Translation source project '${source.id}' cannot itself point to another translation`,
        });
      }
    }
  }

  // Articles
  for (const article of registry.articles) {
    for (let i = 0; i < article.assetPaths.length; i++) {
      checkAssetPath(article.assetPaths[i], `articles.${article.id}.assetPaths[${i}]`, article.id);
    }

    if (article.updatedOn && article.updatedOn < article.publishedOn) {
      issues.push({
        code: "invalid_date_range",
        path: `articles.${article.id}.updatedOn`,
        recordId: article.id,
        message: `Updated date '${article.updatedOn}' cannot precede published date '${article.publishedOn}'`,
      });
    }

    if (article.publicationStatus === "public" && article.publishedOn > nowDateStr) {
      issues.push({
        code: "future_publication_date",
        path: `articles.${article.id}.publishedOn`,
        recordId: article.id,
        message: `Public article publishedOn date '${article.publishedOn}' is in the future relative to '${nowDateStr}'`,
      });
    }

    // Translation validation
    if (article.translationOf) {
      const source = articleMap.get(article.translationOf);
      if (!source) {
        issues.push({
          code: "invalid_translation_reference",
          path: `articles.${article.id}.translationOf`,
          recordId: article.id,
          message: `Referenced article translation source '${article.translationOf}' does not exist`,
        });
      } else if (source.locale === article.locale) {
        issues.push({
          code: "invalid_translation_reference",
          path: `articles.${article.id}.translationOf`,
          recordId: article.id,
          message: `Translation source article '${source.id}' must have opposite locale (got '${source.locale}')`,
        });
      } else if (source.translationOf) {
        issues.push({
          code: "invalid_translation_reference",
          path: `articles.${article.id}.translationOf`,
          recordId: article.id,
          message: `Translation source article '${source.id}' cannot itself point to another translation`,
        });
      }
    }
  }

  if (issues.length > 0) {
    throw new ContentIntegrityError(issues);
  }

  return registry;
}

export type ContentIntegrity = ContentRegistry;

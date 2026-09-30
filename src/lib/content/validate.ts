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

/**
 * Shared state and reference checks for one validation run. Validators push
 * issues here in collection order so reports stay deterministic.
 */
interface ValidationContext {
  issues: ContentIntegrityIssue[];
  nowDateStr: string;
  currentYearMonth: string;
  checkEvidenceIds: (ids: string[], path: string, recordId: string) => void;
  checkLinkIds: (ids: string[], path: string, recordId: string) => void;
  checkAssetPath: (assetPath: string, path: string, recordId: string) => void;
  checkLocalizedText: (text: LocalizedText | undefined, path: string, recordId: string) => void;
}

function createValidationContext(
  registry: ContentRegistry,
  options: ValidationOptions,
  issues: ContentIntegrityIssue[]
): ValidationContext {
  const nowDateStr = formatDateToYYYYMMDD(options.now);
  const assetSet =
    options.availableAssets instanceof Set
      ? options.availableAssets
      : new Set(options.availableAssets || []);
  const evidenceIds = new Set(registry.evidence.map((e) => e.id));
  const linkIds = new Set(registry.links.map((l) => l.id));

  return {
    issues,
    nowDateStr,
    currentYearMonth: nowDateStr.slice(0, 7),
    checkEvidenceIds(ids, path, recordId) {
      for (const id of ids) {
        if (!evidenceIds.has(id)) {
          issues.push({
            code: "missing_evidence_reference",
            path,
            recordId,
            message: `Referenced evidence ID '${id}' does not exist in registry`,
          });
        }
      }
    },
    checkLinkIds(ids, path, recordId) {
      for (const id of ids) {
        if (!linkIds.has(id)) {
          issues.push({
            code: "missing_link_reference",
            path,
            recordId,
            message: `Referenced link ID '${id}' does not exist in registry`,
          });
        }
      }
    },
    checkAssetPath(assetPath, path, recordId) {
      if (!assetSet.has(assetPath)) {
        issues.push({
          code: "missing_asset",
          path,
          recordId,
          message: `Referenced asset path '${assetPath}' is not in available assets`,
        });
      }
    },
    // Public records must not expose draft (unreviewed) Korean translations.
    checkLocalizedText(text, path, recordId) {
      if (text?.koReview === "draft") {
        issues.push({
          code: "unreviewed_public_translation",
          path,
          recordId,
          message: `Public record '${recordId}' contains draft unreviewed Korean translation at '${path}'`,
        });
      }
    },
  };
}

function parseRegistry(rawInput: unknown): ContentRegistry {
  try {
    return contentRegistrySchema.parse(rawInput);
  } catch (err) {
    const issues: ContentIntegrityIssue[] =
      err instanceof ZodError
        ? err.issues.map((issue) => ({
            code: "schema_invalid" as const,
            path: issue.path.join("."),
            message: issue.message,
          }))
        : [
            {
              code: "schema_invalid",
              path: "root",
              message: err instanceof Error ? err.message : "Unknown schema validation error",
            },
          ];
    throw new ContentIntegrityError(issues);
  }
}

function collectAllRecords(registry: ContentRegistry) {
  return [
    ...(registry.siteIdentity ? [registry.siteIdentity] : []),
    ...registry.evidence,
    ...registry.links,
    ...registry.experiences,
    ...registry.educationAndTraining,
    ...registry.skills,
    ...registry.projects,
    ...registry.articles,
    ...registry.supportingProjects,
  ];
}

// IDs are globally unique across all collections.
function checkDuplicateIds(records: { id: string }[], ctx: ValidationContext) {
  const seenIds = new Set<string>();
  for (const record of records) {
    if (seenIds.has(record.id)) {
      ctx.issues.push({
        code: "duplicate_id",
        path: `records.${record.id}`,
        recordId: record.id,
        message: `Duplicate record ID '${record.id}' found across collections`,
      });
    } else {
      seenIds.add(record.id);
    }
  }
}

// Slugs are unique per record type and locale.
function checkDuplicateSlugs(
  kind: "project" | "article",
  collection: "projects" | "articles",
  records: { id: string; locale: string; slug: string }[],
  ctx: ValidationContext
) {
  const seen = new Set<string>();
  for (const record of records) {
    const key = `${record.locale}:${record.slug}`;
    if (seen.has(key)) {
      ctx.issues.push({
        code: "duplicate_slug",
        path: `${collection}.${record.id}.slug`,
        recordId: record.id,
        message: `Duplicate ${kind} slug '${record.slug}' for locale '${record.locale}'`,
      });
    } else {
      seen.add(key);
    }
  }
}

function checkPublicRecordRules(
  records: ReturnType<typeof collectAllRecords>,
  ctx: ValidationContext
) {
  for (const record of records) {
    if (record.publicationStatus !== "public") continue;

    if (record.claimState !== "verified") {
      ctx.issues.push({
        code: "unverified_public_record",
        path: `${record.id}.claimState`,
        recordId: record.id,
        message: `Public record '${record.id}' must have claimState 'verified', but got '${record.claimState}'`,
      });
    }

    if (record.syntheticPlaceholder) {
      ctx.issues.push({
        code: "public_synthetic_placeholder",
        path: `${record.id}.syntheticPlaceholder`,
        recordId: record.id,
        message: `Public record '${record.id}' cannot be a synthetic placeholder`,
      });
    }

    if (!record.reviewedOn) {
      ctx.issues.push({
        code: "missing_review_date",
        path: `${record.id}.reviewedOn`,
        recordId: record.id,
        message: `Public record '${record.id}' must have a reviewedOn calendar date`,
      });
    }
  }
}

function validateSiteIdentity(registry: ContentRegistry, ctx: ValidationContext) {
  const site = registry.siteIdentity;
  if (!site) return;

  ctx.checkLinkIds(site.linkIds, `siteIdentity.linkIds`, site.id);
  if (site.publicationStatus === "public") {
    ctx.checkLocalizedText(site.displayName, `siteIdentity.displayName`, site.id);
    ctx.checkLocalizedText(site.location, `siteIdentity.location`, site.id);
    ctx.checkLocalizedText(site.trajectory, `siteIdentity.trajectory`, site.id);
  }
}

function validateLinks(registry: ContentRegistry, ctx: ValidationContext) {
  for (const link of registry.links) {
    if (link.publicationStatus === "public") {
      ctx.checkLocalizedText(link.label, `links.${link.id}.label`, link.id);
    }
  }
}

function validateExperiences(registry: ContentRegistry, ctx: ValidationContext) {
  for (const exp of registry.experiences) {
    const base = `experiences.${exp.id}`;
    const isPublic = exp.publicationStatus === "public";

    ctx.checkEvidenceIds(exp.evidenceIds, `${base}.evidenceIds`, exp.id);
    exp.contributions.forEach((contrib, i) => {
      ctx.checkEvidenceIds(contrib.evidenceIds, `${base}.contributions[${i}].evidenceIds`, exp.id);
      if (isPublic) {
        ctx.checkLocalizedText(contrib.text, `${base}.contributions[${i}].text`, exp.id);
      }
    });

    const { start, end, ongoing } = exp.dateRange;
    let dateRangeMessage: string | undefined;
    if (start === null) {
      dateRangeMessage = `Experience record '${exp.id}' must specify a start date`;
    } else if (ongoing && end !== null) {
      dateRangeMessage = `Ongoing experience date range cannot specify an end date`;
    } else if (!ongoing && end === null) {
      dateRangeMessage = `Non-ongoing experience date range must specify an end date`;
    } else if (end !== null && end < start) {
      dateRangeMessage = `End date '${end}' cannot precede start date '${start}'`;
    } else if (!ongoing && end !== null && end > ctx.currentYearMonth) {
      dateRangeMessage = `Completed experience end date '${end}' cannot be in the future`;
    }
    if (dateRangeMessage) {
      ctx.issues.push({
        code: "invalid_date_range",
        path: `${base}.dateRange`,
        recordId: exp.id,
        message: dateRangeMessage,
      });
    }

    if (isPublic) {
      ctx.checkLocalizedText(exp.organization, `${base}.organization`, exp.id);
      ctx.checkLocalizedText(exp.role, `${base}.role`, exp.id);
      ctx.checkLocalizedText(exp.summary, `${base}.summary`, exp.id);
    }
  }
}

function validateEducationAndTraining(registry: ContentRegistry, ctx: ValidationContext) {
  for (const edu of registry.educationAndTraining) {
    const base = `educationAndTraining.${edu.id}`;

    ctx.checkEvidenceIds(edu.evidenceIds, `${base}.evidenceIds`, edu.id);

    if (edu.publicationStatus === "public" && edu.status === "planned") {
      ctx.issues.push({
        code: "planned_public_record",
        path: `${base}.status`,
        recordId: edu.id,
        message: `Public education/training record cannot have status 'planned'`,
      });
    }

    const { start, end, ongoing } = edu.dateRange;
    const isCompletionOnlyEducation =
      edu.kind === "education" &&
      edu.status === "completed" &&
      !ongoing &&
      start === null &&
      end !== null;

    let dateRangeMessage: string | undefined;
    if (start === null && !isCompletionOnlyEducation) {
      dateRangeMessage = `Education/training record '${edu.id}' must specify a start date unless it is a completion-only degree record`;
    } else if (ongoing && end !== null && start !== null && end < start) {
      dateRangeMessage = `Scheduled end date '${end}' cannot precede start date '${start}'`;
    } else if (ongoing && end !== null && end < ctx.currentYearMonth) {
      dateRangeMessage = `Ongoing education/training record '${edu.id}' has scheduled end date '${end}' in the past relative to '${ctx.currentYearMonth}'`;
    } else if (!ongoing && end === null) {
      dateRangeMessage = `Non-ongoing education/training date range must specify an end date`;
    } else if (start !== null && end !== null && end < start) {
      dateRangeMessage = `End date '${end}' cannot precede start date '${start}'`;
    } else if (!ongoing && end !== null && end > ctx.currentYearMonth) {
      dateRangeMessage = `Completed education/training end date '${end}' cannot be in the future`;
    }
    if (dateRangeMessage) {
      ctx.issues.push({
        code: "invalid_date_range",
        path: `${base}.dateRange`,
        recordId: edu.id,
        message: dateRangeMessage,
      });
    }

    if (edu.publicationStatus === "public") {
      ctx.checkLocalizedText(edu.institution, `${base}.institution`, edu.id);
      ctx.checkLocalizedText(edu.program, `${base}.program`, edu.id);
    }
  }
}

function validateSkills(registry: ContentRegistry, ctx: ValidationContext) {
  for (const skill of registry.skills) {
    ctx.checkEvidenceIds(skill.evidenceIds, `skills.${skill.id}.evidenceIds`, skill.id);

    if (skill.prominence === "featured" && skill.evidenceIds.length === 0) {
      ctx.issues.push({
        code: "featured_skill_without_evidence",
        path: `skills.${skill.id}.evidenceIds`,
        recordId: skill.id,
        message: `Featured skill '${skill.id}' must have at least one evidence reference`,
      });
    }

    if (skill.publicationStatus === "public") {
      ctx.checkLocalizedText(skill.name, `skills.${skill.id}.name`, skill.id);
    }
  }
}

// One-way translation model: a translation points to an existing source in
// the other locale, and that source is not itself a translation.
function checkTranslationSource<T extends { id: string; locale: string; translationOf?: string }>(
  kind: "project" | "article",
  collection: "projects" | "articles",
  record: T,
  sourcesById: Map<string, T>,
  ctx: ValidationContext
) {
  if (!record.translationOf) return;

  const source = sourcesById.get(record.translationOf);
  let message: string | undefined;
  if (!source) {
    message = `Referenced ${kind} translation source '${record.translationOf}' does not exist`;
  } else if (source.locale === record.locale) {
    message = `Translation source ${kind} '${source.id}' must have opposite locale (got '${source.locale}')`;
  } else if (source.translationOf) {
    message = `Translation source ${kind} '${source.id}' cannot itself point to another translation`;
  }

  if (message) {
    ctx.issues.push({
      code: "invalid_translation_reference",
      path: `${collection}.${record.id}.translationOf`,
      recordId: record.id,
      message,
    });
  }
}

function validateProjects(registry: ContentRegistry, ctx: ValidationContext) {
  const projectsById = new Map(registry.projects.map((p) => [p.id, p]));

  for (const project of registry.projects) {
    const base = `projects.${project.id}`;

    ctx.checkEvidenceIds(project.evidenceIds, `${base}.evidenceIds`, project.id);
    ctx.checkLinkIds(project.linkIds, `${base}.linkIds`, project.id);
    project.assetPaths.forEach((assetPath, i) => {
      ctx.checkAssetPath(assetPath, `${base}.assetPaths[${i}]`, project.id);
    });

    if (project.publicationStatus === "public" && project.status === "planned") {
      ctx.issues.push({
        code: "planned_public_record",
        path: `${base}.status`,
        recordId: project.id,
        message: `Public project cannot have status 'planned'`,
      });
    }

    checkTranslationSource("project", "projects", project, projectsById, ctx);
  }
}

function validateArticles(registry: ContentRegistry, ctx: ValidationContext) {
  const articlesById = new Map(registry.articles.map((a) => [a.id, a]));

  for (const article of registry.articles) {
    const base = `articles.${article.id}`;

    article.assetPaths.forEach((assetPath, i) => {
      ctx.checkAssetPath(assetPath, `${base}.assetPaths[${i}]`, article.id);
    });

    if (article.updatedOn && article.updatedOn < article.publishedOn) {
      ctx.issues.push({
        code: "invalid_date_range",
        path: `${base}.updatedOn`,
        recordId: article.id,
        message: `Updated date '${article.updatedOn}' cannot precede published date '${article.publishedOn}'`,
      });
    }

    if (article.publicationStatus === "public" && article.publishedOn > ctx.nowDateStr) {
      ctx.issues.push({
        code: "future_publication_date",
        path: `${base}.publishedOn`,
        recordId: article.id,
        message: `Public article publishedOn date '${article.publishedOn}' is in the future relative to '${ctx.nowDateStr}'`,
      });
    }

    checkTranslationSource("article", "articles", article, articlesById, ctx);
  }
}

function validateSupportingProjects(registry: ContentRegistry, ctx: ValidationContext) {
  for (const proj of registry.supportingProjects ?? []) {
    const base = `supportingProjects.${proj.id}`;

    ctx.checkEvidenceIds(proj.evidenceIds, `${base}.evidenceIds`, proj.id);

    if (proj.publicationStatus !== "public") continue;

    if (proj.syntheticPlaceholder) {
      ctx.issues.push({
        code: "public_synthetic_placeholder",
        path: `${base}.syntheticPlaceholder`,
        recordId: proj.id,
        message: `Public supporting project record cannot be a synthetic placeholder`,
      });
    }
    if (proj.claimState !== "verified") {
      ctx.issues.push({
        code: "unverified_public_record",
        path: `${base}.claimState`,
        recordId: proj.id,
        message: `Public supporting project record must have claimState 'verified'`,
      });
    }
    if (!proj.reviewedOn) {
      ctx.issues.push({
        code: "missing_review_date",
        path: `${base}.reviewedOn`,
        recordId: proj.id,
        message: `Public supporting project record must specify reviewedOn`,
      });
    } else if (proj.reviewedOn > ctx.nowDateStr) {
      ctx.issues.push({
        code: "future_publication_date",
        path: `${base}.reviewedOn`,
        recordId: proj.id,
        message: `Review date '${proj.reviewedOn}' cannot be in the future relative to '${ctx.nowDateStr}'`,
      });
    }

    ctx.checkLocalizedText(proj.title, `${base}.title`, proj.id);
    ctx.checkLocalizedText(proj.summary, `${base}.summary`, proj.id);
    ctx.checkLocalizedText(proj.contributionBoundary, `${base}.contributionBoundary`, proj.id);
    proj.completedScope.forEach((text, i) => {
      ctx.checkLocalizedText(text, `${base}.completedScope[${i}]`, proj.id);
    });
    proj.plannedScope.forEach((text, i) => {
      ctx.checkLocalizedText(text, `${base}.plannedScope[${i}]`, proj.id);
    });
    if (proj.role) {
      ctx.checkLocalizedText(proj.role, `${base}.role`, proj.id);
    }
    if (proj.scale) {
      ctx.checkLocalizedText(proj.scale, `${base}.scale`, proj.id);
    }
  }
}

export function validateContentRegistry(
  rawInput: unknown,
  options: ValidationOptions
): ContentIntegrity {
  const registry = parseRegistry(rawInput);
  const issues: ContentIntegrityIssue[] = [];
  const ctx = createValidationContext(registry, options, issues);
  const allRecords = collectAllRecords(registry);

  checkDuplicateIds(allRecords, ctx);
  checkDuplicateSlugs("project", "projects", registry.projects, ctx);
  checkDuplicateSlugs("article", "articles", registry.articles, ctx);
  checkPublicRecordRules(allRecords, ctx);
  validateSiteIdentity(registry, ctx);
  validateLinks(registry, ctx);
  validateExperiences(registry, ctx);
  validateEducationAndTraining(registry, ctx);
  validateSkills(registry, ctx);
  validateProjects(registry, ctx);
  validateArticles(registry, ctx);
  validateSupportingProjects(registry, ctx);

  if (issues.length > 0) {
    throw new ContentIntegrityError(issues);
  }

  return registry;
}

export type ContentIntegrity = ContentRegistry;

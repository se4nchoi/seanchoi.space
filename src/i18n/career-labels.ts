import type { AppLocale } from "./config";
import { getDictionary } from "./dictionaries";
import type { EvidenceLevel, SupportingProjectContext } from "@/lib/content/schemas";
import type { systemLayerSkillGroups } from "@/data/content";

export type SystemLayerId = (typeof systemLayerSkillGroups)[number]["id"];

/** Localized label for an evidence level (professional, project, ...). */
export function getEvidenceLevelLabel(level: EvidenceLevel, locale: AppLocale): string {
  const { careerUI } = getDictionary(locale);
  if (level === "professional") return careerUI.professionalLevel;
  if (level === "project") return careerUI.projectLevel;
  if (level === "training") return careerUI.trainingLevel;
  return careerUI.exposureLevel;
}

/** Card label for a work record, identical on every page that shows it. */
export function getWorkContextLabel(context: SupportingProjectContext, locale: AppLocale): string {
  const { careerUI } = getDictionary(locale);
  const labels: Record<SupportingProjectContext, string> = {
    professional: careerUI.professionalWorkLabel,
    "current-work": careerUI.personalProjectLabel,
    "self-directed": careerUI.projectLevel,
    "training-exercise": careerUI.trainingLevel,
  };
  return labels[context];
}

/** Localized heading for a system-layer skill group. */
export function getSystemLayerLabel(id: SystemLayerId, locale: AppLocale): string {
  const { careerUI } = getDictionary(locale);
  const labels: Record<SystemLayerId, string> = {
    interfaces: careerUI.layerInterfaces,
    applications: careerUI.layerApplications,
    infrastructure: careerUI.layerInfrastructure,
    "physical-systems": careerUI.layerPhysicalSystems,
    "ai-perception": careerUI.layerAiPerception,
  };
  return labels[id];
}

import type { AppLocale } from "./config";
import { getDictionary } from "./dictionaries";
import type { EvidenceLevel } from "@/lib/content/schemas";
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

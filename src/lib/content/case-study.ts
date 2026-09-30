/** Narrative sections of a project case study, in reading order. */
export interface ProjectDetailNarrative {
  context: string;
  problem: string;
  constraints: string[];
  decisions: string[];
  validation: string;
  outcome: string;
  limitations: string;
}

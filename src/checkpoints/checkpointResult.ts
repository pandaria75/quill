export type CheckpointVerdict = "pass" | "warn" | "fail" | "skip";

export interface CheckpointResult {
  checkpoint: string;
  verdict: CheckpointVerdict;
  summary: string;
  issues?: string[];
  nextSteps?: string[];
}

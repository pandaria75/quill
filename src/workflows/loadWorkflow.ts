import { join } from "node:path";
import type { ModelRole, QuillConfig } from "../config/defaultConfig.js";
import { readText } from "../utils/fs.js";

export interface WorkflowStep {
  name: string;
  input: string[];
  output: string;
  modelRole: ModelRole;
  humanReview: boolean;
}

export interface Workflow {
  name: string;
  description: string;
  steps: WorkflowStep[];
}

export async function loadWorkflow(cwd: string, config: QuillConfig, name = "technical-blog"): Promise<Workflow> {
  const raw = await readText(join(cwd, config.paths.workflows, `${name}.json`));
  return JSON.parse(raw) as Workflow;
}

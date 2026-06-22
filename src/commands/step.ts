import { basename } from "node:path";
import { artifactNames, type ArtifactName } from "../articles/articlePaths.js";
import { resolveArticle } from "../articles/resolveArticle.js";
import { loadConfig } from "../config/loadConfig.js";
import { loadWorkflow } from "../workflows/loadWorkflow.js";
import { runWorkflowStep } from "../workflows/runWorkflow.js";
import { logger } from "../utils/logger.js";

interface StepOptions {
  force?: boolean;
  workflow?: string;
}

export async function stepCommand(articleSlug: string, stepName: string, options: StepOptions, cwd = process.cwd()): Promise<void> {
  if (!artifactNames.includes(stepName as ArtifactName)) {
    throw new Error(`Unsupported step: ${stepName}. Use one of: ${artifactNames.join(", ")}`);
  }

  const config = await loadConfig(cwd);
  const workflow = await loadWorkflow(cwd, config, options.workflow ?? "technical-blog");
  const step = workflow.steps.find((candidate) => candidate.name === stepName);
  if (!step) throw new Error(`Step not found in workflow ${workflow.name}: ${stepName}`);

  const articleDirectory = await resolveArticle(cwd, config, articleSlug);
  logger.info(`Running ${stepName} for ${basename(articleDirectory)}...`);
  const result = await runWorkflowStep({ cwd, config, articleDirectory, step, force: options.force });
  logger.info(`${stepName}: ${result}`);
}

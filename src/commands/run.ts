import { basename } from "node:path";
import { resolveArticle } from "../articles/resolveArticle.js";
import { loadConfig } from "../config/loadConfig.js";
import { loadWorkflow } from "../workflows/loadWorkflow.js";
import { runWorkflowStep } from "../workflows/runWorkflow.js";
import { logger } from "../utils/logger.js";

interface RunOptions {
  force?: boolean;
  workflow?: string;
}

export async function runCommand(articleSlug: string, options: RunOptions, cwd = process.cwd()): Promise<void> {
  const config = await loadConfig(cwd);
  const workflow = await loadWorkflow(cwd, config, options.workflow ?? "technical-blog");
  const articleDirectory = await resolveArticle(cwd, config, articleSlug);

  logger.info(`Running workflow ${workflow.name} for ${basename(articleDirectory)}...`);
  for (const step of workflow.steps) {
    logger.info(`Step: ${step.name}`);
    const result = await runWorkflowStep({ cwd, config, articleDirectory, step, force: options.force });
    logger.info(`${step.name}: ${result}`);
    if (step.humanReview) logger.info(`${step.name}: human review recommended before publishing or continuing in strict mode.`);
  }
  logger.info("Workflow complete.");
}

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
  const articleName = basename(articleDirectory);
  let generatedCount = 0;
  let skippedCount = 0;

  logger.info(`Running workflow ${workflow.name} for ${articleName} (${workflow.steps.length} steps)...`);
  for (const [index, step] of workflow.steps.entries()) {
    const stepLabel = formatStepLabel(index, workflow.steps.length, step.name, step.output);
    logger.info(`${stepLabel}: running...`);

    try {
      const result = await runWorkflowStep({ cwd, config, articleDirectory, step, force: options.force });
      if (result === "generated") generatedCount += 1;
      if (result === "skipped") skippedCount += 1;

      logger.info(`${stepLabel}: ${result}`);
      if (step.humanReview) {
        logger.info(`${stepLabel}: human review recommended before publishing or continuing in strict mode.`);
      }
    } catch (error) {
      throw new Error(`${stepLabel} failed: ${formatError(error)}`);
    }
  }

  logger.info(
    `Workflow complete for ${articleName}: ${generatedCount} generated, ${skippedCount} skipped across ${workflow.steps.length} steps.`
  );
}

function formatStepLabel(index: number, total: number, stepName: string, output: string): string {
  const target = output.trim().length > 0 ? ` -> ${output}` : "";
  return `Step ${index + 1}/${total} ${stepName}${target}`;
}

function formatError(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

#!/usr/bin/env node
import { Command } from "commander";
import { initCommand } from "./commands/init.js";
import { newCommand } from "./commands/new.js";
import { runCommand } from "./commands/run.js";
import { statusCommand } from "./commands/status.js";
import { stepCommand } from "./commands/step.js";
import { logger } from "./utils/logger.js";

export function createCli(): Command {
  const program = new Command();

  program
    .name("quill")
    .description("Local-first workflow CLI for high-quality content production.")
    .version("0.1.0");

  program.command("init").description("Initialize a local Quill writing workspace.").action(wrap(() => initCommand()));

  program
    .command("new")
    .description("Create a new article workspace.")
    .argument("<topic>", "article topic")
    .option("--workflow <workflow>", "workflow name", "technical-blog")
    .option("--style <style>", "style profile", "default")
    .action(wrap((topic: string, options: { workflow: string; style: string }) => newCommand(topic, options)));

  program
    .command("status")
    .description("Show artifact status for an article.")
    .argument("<article-slug>", "article directory name or slug")
    .action(wrap((articleSlug: string) => statusCommand(articleSlug)));

  program
    .command("step")
    .description("Run one model-backed workflow step.")
    .argument("<article-slug>", "article directory name or slug")
    .argument("<step>", "brief, sources, outline, draft, review, or final")
    .option("--workflow <workflow>", "workflow name", "technical-blog")
    .option("--force", "overwrite an existing non-empty artifact", false)
    .action(wrap((articleSlug: string, step: string, options: { workflow: string; force: boolean }) => stepCommand(articleSlug, step, options)));

  program
    .command("run")
    .description("Run the full model-backed workflow for an article.")
    .argument("<article-slug>", "article directory name or slug")
    .option("--workflow <workflow>", "workflow name", "technical-blog")
    .option("--force", "overwrite existing non-empty artifacts", false)
    .action(wrap((articleSlug: string, options: { workflow: string; force: boolean }) => runCommand(articleSlug, options)));

  return program;
}

function wrap<T extends unknown[]>(fn: (...args: T) => Promise<void>) {
  return (...args: T) => {
    fn(...args).catch((error: unknown) => {
      logger.error(error instanceof Error ? error.message : String(error));
      process.exitCode = 1;
    });
  };
}

createCli().parseAsync(process.argv).catch((error: unknown) => {
  logger.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});

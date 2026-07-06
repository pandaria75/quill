import { readFile } from "node:fs/promises";
import { basename, join } from "node:path";
import type { QuillConfig } from "../config/defaultConfig.js";
import { artifactNames, type ArtifactName } from "../articles/articlePaths.js";
import { readArtifact } from "../artifacts/readArtifact.js";
import { writeArtifact } from "../artifacts/writeArtifact.js";
import { loadStyleProfile } from "../styles/loadStyleProfile.js";
import { OpenAICompatibleClient } from "../llm/OpenAICompatibleClient.js";
import { buildPrompt } from "../llm/prompts.js";
import type { WorkflowStep } from "./loadWorkflow.js";

export async function runWorkflowStep(options: {
  cwd: string;
  config: QuillConfig;
  articleDirectory: string;
  step: WorkflowStep;
  force?: boolean;
}): Promise<"generated" | "skipped"> {
  const output = outputToArtifact(options.step.output);
  const apiKey = process.env[options.config.modelProvider.apiKeyEnv];
  if (!apiKey) {
    throw new Error(`Missing ${options.config.modelProvider.apiKeyEnv}. Set it before running model-backed steps.`);
  }

  const styleProfile = await loadStyleProfile(options.cwd, options.config);
  const promptTemplate = await loadPromptTemplate(options.cwd, output);
  const reviewChecklist = output === "review" ? await loadReviewChecklist(options.cwd) : undefined;
  const inputs: Record<string, string> = {};
  for (const input of options.step.input) {
    inputs[input] = await readArtifact(options.articleDirectory, outputToArtifact(input));
  }

  const client = new OpenAICompatibleClient({ baseUrl: options.config.modelProvider.baseUrl, apiKey });
  const model = options.config.models[options.step.modelRole] ?? options.config.modelProvider.defaultModel;
  const content = await client.complete({
    model,
    messages: [
      { role: "system", content: "You are a careful writing workflow assistant. Output Markdown only." },
      { role: "user", content: buildPrompt(output, promptTemplate, inputs, styleProfile, reviewChecklist) }
    ]
  });

  const result = await writeArtifact(options.articleDirectory, output, content.endsWith("\n") ? content : `${content}\n`, options.force);
  if (result === "skipped") return "skipped";
  return "generated";
}

function outputToArtifact(output: string): ArtifactName {
  const name = basename(output, ".md");
  if (!artifactNames.includes(name as ArtifactName)) throw new Error(`Unsupported artifact: ${output}`);
  return name as ArtifactName;
}

async function loadPromptTemplate(cwd: string, step: ArtifactName): Promise<string> {
  const promptPath = join(cwd, ".quill", "prompts", `${step}.md`);

  try {
    return await readFile(promptPath, "utf8");
  } catch (error) {
    if (isMissingFileError(error)) {
      throw new Error(
        `Missing prompt template for step "${step}" at ${promptPath}. Run \`quill init\` to create local defaults or add the Markdown file manually.`
      );
    }

    throw new Error(`Failed to load prompt template for step "${step}" at ${promptPath}: ${formatError(error)}`);
  }
}

async function loadReviewChecklist(cwd: string): Promise<string | undefined> {
  const checklistPath = join(cwd, ".quill", "checklists", "review.md");

  try {
    return await readFile(checklistPath, "utf8");
  } catch (error) {
    if (isMissingFileError(error)) {
      return undefined;
    }

    throw new Error(`Failed to load review checklist at ${checklistPath}: ${formatError(error)}`);
  }
}

function isMissingFileError(error: unknown): error is NodeJS.ErrnoException {
  return typeof error === "object" && error !== null && "code" in error && error.code === "ENOENT";
}

function formatError(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

import { basename } from "node:path";
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
      { role: "user", content: buildPrompt(output, inputs, styleProfile) }
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

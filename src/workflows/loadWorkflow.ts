import { join } from "node:path";
import type { ModelRole, QuillConfig } from "../config/defaultConfig.js";
import { readText } from "../utils/fs.js";

const supportedModelRoles = ["planning", "drafting", "reviewing", "polishing"] satisfies ModelRole[];

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
  const workflowPath = join(cwd, config.paths.workflows, `${name}.json`);
  const raw = await readText(workflowPath);

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    throw new Error(`Invalid workflow JSON at ${workflowPath}: ${reason}`);
  }

  return validateWorkflow(parsed, workflowPath);
}

function validateWorkflow(value: unknown, workflowPath: string): Workflow {
  const workflow = expectRecord(value, workflowPath, "workflow must be a JSON object");

  const name = expectNonEmptyString(workflow.name, workflowPath, "name");
  const description = expectString(workflow.description, workflowPath, "description");
  const rawSteps = workflow.steps;

  if (!Array.isArray(rawSteps)) {
    throw new Error(`Invalid workflow at ${workflowPath}: steps must be an array`);
  }

  const steps = rawSteps.map((step, index) => validateWorkflowStep(step, workflowPath, index));

  return {
    name,
    description,
    steps
  };
}

function validateWorkflowStep(value: unknown, workflowPath: string, index: number): WorkflowStep {
  const step = expectRecord(value, workflowPath, `step ${index} must be a JSON object`);
  const label = getStepLabel(step, index);

  const name = expectNonEmptyString(step.name, workflowPath, `${label}.name`);
  const output = expectNonEmptyString(step.output, workflowPath, `${label}.output`);
  const modelRole = expectModelRole(step.modelRole, workflowPath, `${label}.modelRole`);
  const humanReview = expectBoolean(step.humanReview, workflowPath, `${label}.humanReview`);
  const input = expectStringArray(step.input, workflowPath, `${label}.input`);

  return {
    name,
    input,
    output,
    modelRole,
    humanReview
  };
}

function getStepLabel(step: Record<string, unknown>, index: number): string {
  return typeof step.name === "string" && step.name.trim().length > 0 ? `step ${index} (${step.name})` : `step ${index}`;
}

function expectRecord(value: unknown, workflowPath: string, detail: string): Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new Error(`Invalid workflow at ${workflowPath}: ${detail}`);
  }

  return value as Record<string, unknown>;
}

function expectString(value: unknown, workflowPath: string, field: string): string {
  if (typeof value !== "string") {
    throw new Error(`Invalid workflow at ${workflowPath}: ${field} must be a string`);
  }

  return value;
}

function expectNonEmptyString(value: unknown, workflowPath: string, field: string): string {
  const text = expectString(value, workflowPath, field);
  if (text.trim().length === 0) {
    throw new Error(`Invalid workflow at ${workflowPath}: ${field} must be a non-empty string`);
  }

  return text;
}

function expectStringArray(value: unknown, workflowPath: string, field: string): string[] {
  if (!Array.isArray(value)) {
    throw new Error(`Invalid workflow at ${workflowPath}: ${field} must be an array of strings`);
  }

  return value.map((item, index) => {
    if (typeof item !== "string") {
      throw new Error(`Invalid workflow at ${workflowPath}: ${field}[${index}] must be a string`);
    }

    return item;
  });
}

function expectBoolean(value: unknown, workflowPath: string, field: string): boolean {
  if (typeof value !== "boolean") {
    throw new Error(`Invalid workflow at ${workflowPath}: ${field} must be a boolean`);
  }

  return value;
}

function expectModelRole(value: unknown, workflowPath: string, field: string): ModelRole {
  if (typeof value !== "string" || !supportedModelRoles.includes(value as ModelRole)) {
    throw new Error(
      `Invalid workflow at ${workflowPath}: ${field} must be one of ${supportedModelRoles.join(", ")}`
    );
  }

  return value as ModelRole;
}

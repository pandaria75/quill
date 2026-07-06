import type { ArtifactName } from "../articles/articlePaths.js";

export function buildPrompt(
  step: ArtifactName,
  promptTemplate: string,
  inputs: Record<string, string>,
  styleProfile: string,
  reviewChecklist?: string,
): string {
  const shared = `You are Quill, a local-first writing workflow CLI. Output ordinary Markdown only. Preserve human-editable structure. Avoid generic AI-flavored phrasing and unsupported facts.\n\nStyle profile:\n${styleProfile}\n`;
  const inputBlock = Object.entries(inputs)
    .map(([name, content]) => `\n--- ${name} ---\n${content}`)
    .join("\n");
  const checklistBlock = step === "review" && reviewChecklist
    ? `\n\nReview checklist:\n${reviewChecklist}`
    : "";

  return `${shared}\nCurrent step: ${step}\n\nPrompt template:\n${promptTemplate}${checklistBlock}\n${inputBlock}`;
}

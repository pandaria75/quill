import type { ArtifactName } from "../articles/articlePaths.js";

export function buildPrompt(step: ArtifactName, inputs: Record<string, string>, styleProfile: string): string {
  const shared = `You are Quill, a local-first writing workflow CLI. Output ordinary Markdown only. Preserve human-editable structure. Avoid generic AI-flavored phrasing and unsupported facts.\n\nStyle profile:\n${styleProfile}\n`;
  const inputBlock = Object.entries(inputs)
    .map(([name, content]) => `\n--- ${name} ---\n${content}`)
    .join("\n");

  return `${shared}\nCurrent step: ${step}\n${stepInstructions(step)}\n${inputBlock}`;
}

function stepInstructions(step: ArtifactName): string {
  switch (step) {
    case "brief":
      return "Generate # Brief with Topic, Target Audience, Core Message, Angle, Constraints, and Notes.";
    case "sources":
      return "Generate # Sources. Organize user-provided notes only. Do not claim web research. Include Missing Information when needed.";
    case "outline":
      return "Generate # Outline with Working Title, Opening, Sections, Conclusion, and Notes.";
    case "draft":
      return "Generate # Draft from brief, sources, and outline. Be concrete, restrained, and useful.";
    case "review":
      return "Generate # Review with Summary, Structure Issues, Style Issues, AI Flavor Issues, Factual Risks, Suggested Fixes, and Decision.";
    case "final":
      return "Generate publishable # Final Markdown from draft and review. Fix issues without inventing unsupported facts.";
  }
}

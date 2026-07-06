import { join } from "node:path";
import { defaultConfigJson } from "../config/defaultConfig.js";
import { ensureDir, writeFileIfMissing } from "../utils/fs.js";
import { logger } from "../utils/logger.js";

export async function initCommand(cwd = process.cwd()): Promise<void> {
  const created: string[] = [];
  const skipped: string[] = [];

  await ensureDir(join(cwd, ".quill"));
  await ensureDir(join(cwd, ".quill", "checklists"));
  await ensureDir(join(cwd, ".quill", "prompts"));
  await ensureDir(join(cwd, ".quill", "styles"));
  await ensureDir(join(cwd, ".quill", "templates"));
  await ensureDir(join(cwd, ".quill", "workflows"));
  await ensureDir(join(cwd, "docs", "articles"));

  const files: Array<[string, string]> = [
    [join(cwd, ".quill", "quill.config.json"), defaultConfigJson()],
    [join(cwd, ".quill", "checklists", "review.md"), reviewChecklistTemplate()],
    [join(cwd, ".quill", "prompts", "brief.md"), briefPromptTemplate()],
    [join(cwd, ".quill", "prompts", "sources.md"), sourcesPromptTemplate()],
    [join(cwd, ".quill", "prompts", "outline.md"), outlinePromptTemplate()],
    [join(cwd, ".quill", "prompts", "draft.md"), draftPromptTemplate()],
    [join(cwd, ".quill", "prompts", "review.md"), reviewPromptTemplate()],
    [join(cwd, ".quill", "prompts", "final.md"), finalPromptTemplate()],
    [join(cwd, ".quill", "styles", "default.md"), defaultStyleProfile()],
    [join(cwd, ".quill", "templates", "brief.md"), briefTemplate()],
    [join(cwd, ".quill", "templates", "sources.md"), sourcesTemplate()],
    [join(cwd, ".quill", "templates", "outline.md"), outlineTemplate()],
    [join(cwd, ".quill", "templates", "draft.md"), draftTemplate()],
    [join(cwd, ".quill", "templates", "review.md"), reviewTemplate()],
    [join(cwd, ".quill", "templates", "final.md"), finalTemplate()],
    [join(cwd, ".quill", "workflows", "technical-blog.json"), technicalBlogWorkflow()]
  ];

  for (const [path, content] of files) {
    const result = await writeFileIfMissing(path, content);
    (result === "created" ? created : skipped).push(path.replace(`${cwd}/`, ""));
  }

  logger.info("Quill workspace initialized.");
  for (const path of created) logger.info(`created ${path}`);
  for (const path of skipped) logger.info(`skipped ${path}`);
  logger.info("Next: quill new \"Your article topic\"");
}

function defaultStyleProfile(): string {
  return `# Default Style Profile\n\n## Writing Voice\n\n- 使用普通开发者视角；\n- 不要过度营销；\n- 不要使用太多宏大叙事；\n- 多讲具体问题和取舍；\n- 少用“赋能、闭环、范式、革新”等词；\n- 少用“首先、其次、最后”这种机械结构；\n- 允许有个人判断和经验感；\n- 文章应该像真人写的，而不是模型报告。\n\n## Structure Preference\n\n- 开头先讲具体问题；\n- 中间展开技术或方法论；\n- 每个观点要有解释；\n- 能用例子就不要只讲抽象概念；\n- 结尾给出明确判断。\n`;
}

function briefTemplate(): string {
  return `# Brief\n\n## Topic\n\nTODO\n\n## Target Audience\n\n待补充。\n\n## Core Message\n\n待补充。\n\n## Angle\n\n待补充。\n\n## Constraints\n\n待补充。\n\n## Notes\n\n待补充。\n`;
}

function sourcesTemplate(): string {
  return `# Sources\n\n## User Provided Notes\n\nTODO\n\n## Reference Links\n\nTODO\n\n## Claims To Verify Later\n\nTODO\n\n## Missing Information\n\nTODO\n`;
}

function outlineTemplate(): string {
  return `# Outline\n\n## Working Title\n\nTODO\n\n## Opening\n\nTODO\n\n## Sections\n\n### 1.\n\nTODO\n\n### 2.\n\nTODO\n\n### 3.\n\nTODO\n\n## Conclusion\n\nTODO\n\n## Notes\n\nTODO\n`;
}

function draftTemplate(): string {
  return `# Draft\n\nTODO\n`;
}

function reviewTemplate(): string {
  return `# Review\n\n## Summary\n\nTODO\n\n## Structure Issues\n\nTODO\n\n## Style Issues\n\nTODO\n\n## AI Flavor Issues\n\nTODO\n\n## Factual Risks\n\nTODO\n\n## Suggested Fixes\n\nTODO\n\n## Decision\n\n- [ ] Pass\n- [ ] Needs Repair\n`;
}

function finalTemplate(): string {
  return `# Final\n\nTODO\n`;
}

function briefPromptTemplate(): string {
  return [
    "# Brief Prompt",
    "",
    "## Goal",
    "",
    "Generate an article brief from the topic and style profile.",
    "",
    "## Inputs",
    "",
    "- topic",
    "- style profile",
    "",
    "## Output",
    "",
    "Return Markdown using this structure:",
    "",
    "```markdown",
    "# Brief",
    "",
    "## Topic",
    "",
    "## Target Audience",
    "",
    "## Core Message",
    "",
    "## Angle",
    "",
    "## Constraints",
    "",
    "## Notes",
    "```",
    ""
  ].join("\n");
}

function sourcesPromptTemplate(): string {
  return [
    "# Sources Prompt",
    "",
    "## Goal",
    "",
    "Organize user-provided material without automatic web research.",
    "",
    "## Guidance",
    "",
    "- If the user provided no material, keep placeholders and make the missing information obvious.",
    "- Do not invent sources or claims.",
    "",
    "## Output",
    "",
    "Return Markdown using this structure:",
    "",
    "```markdown",
    "# Sources",
    "",
    "## User Provided Notes",
    "",
    "## Reference Links",
    "",
    "## Claims To Verify Later",
    "",
    "## Missing Information",
    "```",
    ""
  ].join("\n");
}

function outlinePromptTemplate(): string {
  return [
    "# Outline Prompt",
    "",
    "## Goal",
    "",
    "Create a clear article outline from the brief and sources.",
    "",
    "## Output",
    "",
    "Return Markdown using this structure:",
    "",
    "```markdown",
    "# Outline",
    "",
    "## Working Title",
    "",
    "## Opening",
    "",
    "## Sections",
    "",
    "### 1.",
    "### 2.",
    "### 3.",
    "",
    "## Conclusion",
    "",
    "## Notes",
    "```",
    ""
  ].join("\n");
}

function draftPromptTemplate(): string {
  return [
    "# Draft Prompt",
    "",
    "## Goal",
    "",
    "Write a first draft from the brief, sources, outline, and style profile.",
    "",
    "## Requirements",
    "",
    "- avoid generic AI flavor",
    "- avoid marketing tone",
    "- avoid empty abstractions",
    "- include concrete scenarios and tradeoffs",
    "- output plain Markdown",
    "",
    "## Output",
    "",
    "Return Markdown using this structure:",
    "",
    "```markdown",
    "# Draft",
    "",
    "Body content.",
    "```",
    ""
  ].join("\n");
}

function reviewPromptTemplate(): string {
  return [
    "# Review Prompt",
    "",
    "## Goal",
    "",
    "Review the draft.",
    "",
    "## Check",
    "",
    "- structure clarity",
    "- point clarity",
    "- AI flavor",
    "- empty phrasing",
    "- style profile fit",
    "- factual risks",
    "- target platform fit",
    "",
    "## Output",
    "",
    "Return Markdown using this structure:",
    "",
    "```markdown",
    "# Review",
    "",
    "## Summary",
    "",
    "## Structure Issues",
    "",
    "## Style Issues",
    "",
    "## AI Flavor Issues",
    "",
    "## Factual Risks",
    "",
    "## Suggested Fixes",
    "",
    "## Decision",
    "```",
    ""
  ].join("\n");
}

function finalPromptTemplate(): string {
  return `# Final Prompt\n\n## Goal\n\nProduce \`final.md\` from the draft, review, and style profile.\n\n## Requirements\n\n- keep the draft's core argument\n- repair issues from review\n- reduce AI flavor\n- do not introduce unsupported new facts\n- output publishable Markdown\n`;
}

function reviewChecklistTemplate(): string {
  return `# Review Checklist\n\n## Structure\n\n- The opening names a concrete problem.\n- Sections build on each other.\n- The conclusion makes a clear judgment.\n\n## Style\n\n- The draft sounds like a real developer.\n- The draft avoids generic marketing language.\n- The draft uses concrete examples where possible.\n\n## AI Flavor\n\n- Avoids mechanical transitions.\n- Avoids empty abstractions.\n- Avoids overconfident claims without support.\n\n## Factual Risk\n\n- Claims that need verification are marked.\n- Unsupported new facts are not introduced in final polish.\n`;
}

function technicalBlogWorkflow(): string {
  return `${JSON.stringify(
    {
      name: "technical-blog",
      description: "Generate a technical blog article through brief, sources, outline, draft, review and final artifacts.",
      steps: [
        { name: "brief", input: [], output: "brief.md", modelRole: "planning", humanReview: false },
        { name: "sources", input: ["brief.md"], output: "sources.md", modelRole: "planning", humanReview: true },
        { name: "outline", input: ["brief.md", "sources.md"], output: "outline.md", modelRole: "planning", humanReview: true },
        { name: "draft", input: ["brief.md", "sources.md", "outline.md"], output: "draft.md", modelRole: "drafting", humanReview: false },
        { name: "review", input: ["brief.md", "outline.md", "draft.md"], output: "review.md", modelRole: "reviewing", humanReview: false },
        { name: "final", input: ["brief.md", "sources.md", "outline.md", "draft.md", "review.md"], output: "final.md", modelRole: "polishing", humanReview: true }
      ]
    },
    null,
    2
  )}\n`;
}

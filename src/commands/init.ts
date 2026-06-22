import { join } from "node:path";
import { defaultConfigJson } from "../config/defaultConfig.js";
import { ensureDir, writeFileIfMissing } from "../utils/fs.js";
import { logger } from "../utils/logger.js";

export async function initCommand(cwd = process.cwd()): Promise<void> {
  const created: string[] = [];
  const skipped: string[] = [];

  await ensureDir(join(cwd, ".quill"));
  await ensureDir(join(cwd, ".quill", "styles"));
  await ensureDir(join(cwd, ".quill", "templates"));
  await ensureDir(join(cwd, ".quill", "workflows"));
  await ensureDir(join(cwd, "docs", "articles"));

  const files: Array<[string, string]> = [
    [join(cwd, ".quill", "quill.config.json"), defaultConfigJson()],
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

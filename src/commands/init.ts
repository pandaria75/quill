import { join } from "node:path";
import {
  quillInitChecklists,
  quillInitPrompts,
  quillInitStyleProfiles,
  quillInitTemplates,
  renderTechnicalBlogWorkflowJson
} from "@pandaria/quill/core";
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
    [join(cwd, ".quill", "checklists", "review.md"), quillInitChecklists.review],
    [join(cwd, ".quill", "prompts", "brief.md"), quillInitPrompts.brief],
    [join(cwd, ".quill", "prompts", "sources.md"), quillInitPrompts.sources],
    [join(cwd, ".quill", "prompts", "outline.md"), quillInitPrompts.outline],
    [join(cwd, ".quill", "prompts", "draft.md"), quillInitPrompts.draft],
    [join(cwd, ".quill", "prompts", "review.md"), quillInitPrompts.review],
    [join(cwd, ".quill", "prompts", "final.md"), quillInitPrompts.final],
    [join(cwd, ".quill", "styles", "default.md"), quillInitStyleProfiles.default],
    [join(cwd, ".quill", "templates", "brief.md"), quillInitTemplates.brief],
    [join(cwd, ".quill", "templates", "sources.md"), quillInitTemplates.sources],
    [join(cwd, ".quill", "templates", "outline.md"), quillInitTemplates.outline],
    [join(cwd, ".quill", "templates", "draft.md"), quillInitTemplates.draft],
    [join(cwd, ".quill", "templates", "review.md"), quillInitTemplates.review],
    [join(cwd, ".quill", "templates", "final.md"), quillInitTemplates.final],
    [join(cwd, ".quill", "workflows", "technical-blog.json"), renderTechnicalBlogWorkflowJson()]
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

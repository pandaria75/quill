import { basename } from "node:path";
import type { QuillConfig } from "../config/defaultConfig.js";
import { articleDir, artifactNames, artifactPath } from "./articlePaths.js";
import { ensureDir, pathExists, writeFileIfMissing } from "../utils/fs.js";
import { slugify } from "../utils/slugify.js";

export interface CreateArticleOptions {
  topic: string;
  workflow: string;
  style: string;
  cwd?: string;
  date?: Date;
}

export async function createArticle(config: QuillConfig, options: CreateArticleOptions): Promise<string> {
  const cwd = options.cwd ?? process.cwd();
  const date = formatDate(options.date ?? new Date());
  const slug = slugify(options.topic);
  const articleName = `${date}-${slug}`;
  const directory = articleDir(cwd, config, articleName);

  if (await pathExists(directory)) {
    throw new Error(`Article already exists: ${basename(directory)}`);
  }

  await ensureDir(directory);

  for (const artifact of artifactNames) {
    const path = artifactPath(directory, artifact);
    const content = artifact === "brief" ? briefContent(options.topic, slug, options.workflow, options.style, date) : placeholderContent(articleName, artifact);
    await writeFileIfMissing(path, content);
  }

  return articleName;
}

function briefContent(topic: string, slug: string, workflow: string, style: string, date: string): string {
  return `---\ntitle: "${escapeYaml(topic)}"\nslug: "${slug}"\nstatus: "created"\nworkflow: "${workflow}"\nstyle: "${style}"\ncreated_at: "${date}"\n---\n\n# Brief\n\n## Topic\n\n${topic}\n\n## Target Audience\n\n待补充。\n\n## Core Message\n\n待补充。\n\n## Angle\n\n待补充。\n\n## Constraints\n\n待补充。\n\n## Notes\n\n待补充。\n`;
}

function placeholderContent(article: string, artifact: string): string {
  return `---\narticle: "${article}"\nartifact: "${artifact}"\nstatus: "created"\nupdated_at: "${new Date().toISOString()}"\n---\n\n# ${titleCase(artifact)}\n\nTODO\n`;
}

function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function titleCase(value: string): string {
  return `${value.slice(0, 1).toUpperCase()}${value.slice(1)}`;
}

function escapeYaml(value: string): string {
  return value.replace(/"/g, "\\\"");
}

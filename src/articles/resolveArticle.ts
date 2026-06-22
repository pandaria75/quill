import { readdir } from "node:fs/promises";
import type { QuillConfig } from "../config/defaultConfig.js";
import { articleDir, articlesDir } from "./articlePaths.js";
import { pathExists } from "../utils/fs.js";

export async function resolveArticle(cwd: string, config: QuillConfig, slug: string): Promise<string> {
  const direct = articleDir(cwd, config, slug);
  if (await pathExists(direct)) return direct;

  const root = articlesDir(cwd, config);
  if (!(await pathExists(root))) {
    throw new Error(`Articles directory not found: ${config.paths.articles}. Run quill init first.`);
  }

  const entries = await readdir(root, { withFileTypes: true });
  const matches = entries.filter((entry) => entry.isDirectory() && entry.name.endsWith(`-${slug}`));
  if (matches.length === 1) return articleDir(cwd, config, matches[0].name);
  if (matches.length > 1) throw new Error(`Multiple articles match slug: ${slug}. Use the full article directory name.`);
  throw new Error(`Article not found: ${slug}`);
}

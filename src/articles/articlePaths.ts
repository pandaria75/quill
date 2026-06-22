import { join } from "node:path";
import type { QuillConfig } from "../config/defaultConfig.js";

export const artifactNames = ["brief", "sources", "outline", "draft", "review", "final"] as const;
export type ArtifactName = (typeof artifactNames)[number];

export function articlesDir(cwd: string, config: QuillConfig): string {
  return join(cwd, config.paths.articles);
}

export function articleDir(cwd: string, config: QuillConfig, articleSlug: string): string {
  return join(articlesDir(cwd, config), articleSlug);
}

export function artifactPath(articleDirectory: string, artifact: ArtifactName): string {
  return join(articleDirectory, `${artifact}.md`);
}

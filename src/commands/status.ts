import { basename } from "node:path";
import { resolveArticle } from "../articles/resolveArticle.js";
import { getArtifactStatuses, formatArtifactStatus } from "../artifacts/artifactStatus.js";
import { loadConfig } from "../config/loadConfig.js";
import { logger } from "../utils/logger.js";

export async function statusCommand(articleSlug: string, cwd = process.cwd()): Promise<void> {
  const config = await loadConfig(cwd);
  const directory = await resolveArticle(cwd, config, articleSlug);
  const statuses = await getArtifactStatuses(directory);

  logger.info(`Article: ${basename(directory)}`);
  for (const item of statuses) {
    logger.info(`${`${item.artifact}.md`.padEnd(11)} ${formatArtifactStatus(item.status)}`);
  }
}

import { createArticle } from "../articles/createArticle.js";
import { loadConfig } from "../config/loadConfig.js";
import { logger } from "../utils/logger.js";

interface NewOptions {
  workflow?: string;
  style?: string;
}

export async function newCommand(topic: string, options: NewOptions, cwd = process.cwd()): Promise<void> {
  const config = await loadConfig(cwd);
  const article = await createArticle(config, {
    topic,
    workflow: options.workflow ?? "technical-blog",
    style: options.style ?? "default",
    cwd
  });

  logger.info(`Article created: ${article}`);
  logger.info(`Next: quill status ${article}`);
}

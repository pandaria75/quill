import { join } from "node:path";
import type { QuillConfig } from "../config/defaultConfig.js";
import { readText } from "../utils/fs.js";

export async function loadStyleProfile(cwd: string, config: QuillConfig, style = "default"): Promise<string> {
  return readText(join(cwd, config.paths.styles, `${style}.md`));
}

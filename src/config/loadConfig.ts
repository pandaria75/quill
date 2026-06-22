import { join } from "node:path";
import { defaultConfig, type QuillConfig } from "./defaultConfig.js";
import { pathExists, readText } from "../utils/fs.js";

export async function loadConfig(cwd = process.cwd()): Promise<QuillConfig> {
  const path = join(cwd, ".quill", "quill.config.json");
  if (!(await pathExists(path))) return defaultConfig;
  const raw = await readText(path);
  return { ...defaultConfig, ...JSON.parse(raw) } as QuillConfig;
}

import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

export async function pathExists(path: string): Promise<boolean> {
  try {
    await stat(path);
    return true;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return false;
    throw error;
  }
}

export async function ensureDir(path: string): Promise<void> {
  await mkdir(path, { recursive: true });
}

export async function writeFileIfMissing(path: string, content: string): Promise<"created" | "skipped"> {
  if (await pathExists(path)) return "skipped";
  await ensureDir(dirname(path));
  await writeFile(path, content, "utf8");
  return "created";
}

export async function readText(path: string): Promise<string> {
  return readFile(path, "utf8");
}

export async function isNonEmptyFile(path: string): Promise<boolean> {
  if (!(await pathExists(path))) return false;
  const content = await readFile(path, "utf8");
  const body = content.replace(/^---[\s\S]*?---\s*/m, "").trim();
  return body.length > 0 && !/^#\s+\w+\s+TODO\s*$/i.test(body);
}

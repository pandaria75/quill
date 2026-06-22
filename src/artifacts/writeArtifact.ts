import { artifactPath, type ArtifactName } from "../articles/articlePaths.js";
import { isNonEmptyFile, writeFileIfMissing } from "../utils/fs.js";
import { writeFile } from "node:fs/promises";

export async function writeArtifact(articleDirectory: string, artifact: ArtifactName, content: string, force = false): Promise<"created" | "updated" | "skipped"> {
  const path = artifactPath(articleDirectory, artifact);
  if (!force && (await isNonEmptyFile(path))) return "skipped";
  if (force) {
    await writeFile(path, content, "utf8");
    return "updated";
  }
  return writeFileIfMissing(path, content);
}

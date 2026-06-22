import { artifactNames, artifactPath, type ArtifactName } from "../articles/articlePaths.js";
import { isNonEmptyFile, pathExists, readText } from "../utils/fs.js";

export type ArtifactStatus = "missing" | "empty" | "pending" | "exists";

export interface ArtifactStatusResult {
  artifact: ArtifactName;
  status: ArtifactStatus;
}

export async function getArtifactStatuses(articleDirectory: string): Promise<ArtifactStatusResult[]> {
  const results: ArtifactStatusResult[] = [];
  for (const artifact of artifactNames) {
    const path = artifactPath(articleDirectory, artifact);
    if (!(await pathExists(path))) {
      results.push({ artifact, status: "missing" });
      continue;
    }
    const raw = await readText(path);
    if (raw.trim().length === 0) {
      results.push({ artifact, status: "empty" });
      continue;
    }
    if (!(await isNonEmptyFile(path)) || /\bTODO\b|待补充/.test(raw)) {
      results.push({ artifact, status: "pending" });
      continue;
    }
    results.push({ artifact, status: "exists" });
  }
  return results;
}

export function formatArtifactStatus(status: ArtifactStatus): string {
  switch (status) {
    case "exists":
      return "ok exists";
    case "empty":
      return "warn empty";
    case "pending":
      return "pending";
    case "missing":
      return "missing";
  }
}

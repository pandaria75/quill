import { artifactPath, type ArtifactName } from "../articles/articlePaths.js";
import { readText } from "../utils/fs.js";

export async function readArtifact(articleDirectory: string, artifact: ArtifactName): Promise<string> {
  return readText(artifactPath(articleDirectory, artifact));
}

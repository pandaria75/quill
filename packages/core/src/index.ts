export const quillCoreBoundary = {
  assetRepresentation: "compiled-ts-exports",
  packagingStrategy: "root-package-subpath-export",
  runtimeSafety: "build-packaged-core-dist"
} as const;

export type QuillCoreBoundary = typeof quillCoreBoundary;

export {
  quillInitChecklists,
  quillInitPrompts,
  quillInitStyleProfiles,
  quillInitTemplates,
  renderTechnicalBlogWorkflowJson,
  technicalBlogWorkflowDefinition
} from "./initAssets.js";

export {
  technicalBlogWritingSkillContracts,
  technicalBlogWritingSkillOrder
} from "./writingSkillContracts.js";

export type { TechnicalBlogWritingSkillId } from "./writingSkillContracts.js";

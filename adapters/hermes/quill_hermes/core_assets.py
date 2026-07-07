from __future__ import annotations

import json
import subprocess
from dataclasses import dataclass
from pathlib import Path


CORE_PUBLIC_EXPORTS_USED = (
    "technicalBlogWorkflowDefinition",
    "quillInitTemplates",
    "quillInitPrompts",
    "quillInitStyleProfiles",
    "technicalBlogWritingSkillOrder",
    "technicalBlogWritingSkillContracts",
)


class WorkflowBlockedError(RuntimeError):
    pass


@dataclass(frozen=True)
class TechnicalBlogCoreAssets:
    workflow: dict
    templates: dict[str, str]
    prompts: dict[str, str]
    style_profiles: dict[str, str]
    writing_skill_order: list[str]
    writing_skill_contracts: dict[str, str]
    export_names: tuple[str, ...]


def load_technical_blog_core_assets(repo_root: Path) -> TechnicalBlogCoreAssets:
    payload = _run_core_asset_import(repo_root)
    workflow = payload["workflow"]
    if workflow.get("name") != "technical-blog":
        raise WorkflowBlockedError(
            f"BLOCKED: unexpected workflow export name {workflow.get('name')!r}"
        )

    return TechnicalBlogCoreAssets(
        workflow=workflow,
        templates=payload["templates"],
        prompts=payload["prompts"],
        style_profiles=payload["styleProfiles"],
        writing_skill_order=payload["writingSkillOrder"],
        writing_skill_contracts=payload["writingSkillContracts"],
        export_names=tuple(payload["exportNames"]),
    )


def _run_core_asset_import(repo_root: Path) -> dict:
    node_script = """
const required = [
  'technicalBlogWorkflowDefinition',
  'quillInitTemplates',
  'quillInitPrompts',
  'quillInitStyleProfiles',
  'technicalBlogWritingSkillOrder',
  'technicalBlogWritingSkillContracts'
];

import('@pandaria/quill/core').then((m) => {
  for (const name of required) {
    if (!(name in m)) {
      throw new Error(`missing public export: ${name}`);
    }
  }

  if (!m.technicalBlogWorkflowDefinition || typeof m.technicalBlogWorkflowDefinition !== 'object') {
    throw new Error('invalid public export: technicalBlogWorkflowDefinition');
  }
  for (const name of ['quillInitTemplates', 'quillInitPrompts', 'quillInitStyleProfiles', 'technicalBlogWritingSkillContracts']) {
    if (!m[name] || typeof m[name] !== 'object') {
      throw new Error(`invalid public export: ${name}`);
    }
  }
  if (!Array.isArray(m.technicalBlogWritingSkillOrder)) {
    throw new Error('invalid public export: technicalBlogWritingSkillOrder');
  }

  console.log(JSON.stringify({
    exportNames: required,
    workflow: m.technicalBlogWorkflowDefinition,
    templates: m.quillInitTemplates,
    prompts: m.quillInitPrompts,
    styleProfiles: m.quillInitStyleProfiles,
    writingSkillOrder: m.technicalBlogWritingSkillOrder,
    writingSkillContracts: m.technicalBlogWritingSkillContracts,
  }));
}).catch((error) => {
  console.error(error && error.stack ? error.stack : String(error));
  process.exit(1);
});
""".strip()

    result = subprocess.run(
        ["node", "-e", node_script],
        cwd=repo_root,
        capture_output=True,
        text=True,
        check=False,
    )
    if result.returncode != 0:
        raise WorkflowBlockedError(
            "BLOCKED: failed to import @pandaria/quill/core public exports: "
            f"{result.stderr.strip()}"
        )
    try:
        return json.loads(result.stdout)
    except json.JSONDecodeError as error:
        raise WorkflowBlockedError(
            "BLOCKED: invalid JSON while loading @pandaria/quill/core public exports"
        ) from error

import { mkdtempSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync, existsSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';

const repoRoot = resolve(import.meta.dirname, '..');
const cliPath = join(repoRoot, 'dist', 'cli.js');
const sentinel = 'SMOKE_INIT_SENTINEL';
const expectedQuillFiles = [
  '.quill/quill.config.json',
  '.quill/styles/default.md',
  '.quill/templates/brief.md',
  '.quill/templates/sources.md',
  '.quill/templates/outline.md',
  '.quill/templates/draft.md',
  '.quill/templates/review.md',
  '.quill/templates/final.md',
  '.quill/workflows/technical-blog.json',
];

function fail(message) {
  throw new Error(message);
}

function assert(condition, message) {
  if (!condition) fail(message);
}

function runInit(workspace) {
  const result = spawnSync(process.execPath, [cliPath, 'init'], {
    cwd: workspace,
    encoding: 'utf8',
    env: {
      ...process.env,
      QUILL_API_KEY: '',
    },
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    fail([
      `quill init failed with exit code ${result.status}`,
      result.stdout && `stdout:\n${result.stdout}`,
      result.stderr && `stderr:\n${result.stderr}`,
    ].filter(Boolean).join('\n\n'));
  }

  return {
    stdout: result.stdout,
    stderr: result.stderr,
  };
}

function listFiles(root, relativeRoot = root) {
  const entries = readdirSync(root, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = join(root, entry.name);
    if (entry.isDirectory()) {
      files.push(...listFiles(fullPath, relativeRoot));
    } else if (entry.isFile()) {
      files.push(relative(relativeRoot, fullPath));
    }
  }

  return files.sort();
}

assert(existsSync(cliPath), `Built CLI not found at ${cliPath}. Run npm run build first.`);

const workspace = mkdtempSync(join(tmpdir(), 'quill-init-smoke-'));

try {
  const firstRun = runInit(workspace);

  const quillDir = join(workspace, '.quill');
  const articlesDir = join(workspace, 'docs', 'articles');

  assert(existsSync(quillDir) && statSync(quillDir).isDirectory(), 'Expected .quill/ directory to be created.');
  assert(existsSync(articlesDir) && statSync(articlesDir).isDirectory(), 'Expected docs/articles/ directory to be created.');

  const generatedFiles = listFiles(workspace);
  const generatedQuillFiles = generatedFiles.filter((file) => file.startsWith('.quill/'));

  assert(
    generatedQuillFiles.length === expectedQuillFiles.length,
    `Expected ${expectedQuillFiles.length} files under .quill/, found ${generatedQuillFiles.length}.`,
  );
  for (const expectedFile of expectedQuillFiles) {
    assert(generatedQuillFiles.includes(expectedFile), `Expected init to generate ${expectedFile}.`);
  }

  const sentinelFile = '.quill/templates/brief.md';
  const sentinelTarget = join(workspace, sentinelFile);
  const originalContent = readFileSync(sentinelTarget, 'utf8');
  writeFileSync(sentinelTarget, `${originalContent}\n${sentinel}\n`);

  const secondRun = runInit(workspace);
  const secondContent = readFileSync(sentinelTarget, 'utf8');

  assert(secondContent.includes(sentinel), `Expected sentinel to be preserved in ${sentinelFile}.`);
  assert(
    secondRun.stdout.includes('skipped') || secondRun.stdout.includes('Skipped'),
    'Expected second init run to report skipped output.',
  );
  assert(
    secondRun.stdout.includes(sentinelFile) || secondRun.stderr.includes(sentinelFile),
    `Expected second init run to mention skipped file ${sentinelFile}.`,
  );

  console.log('Smoke init passed.');
  console.log(`Workspace: ${workspace}`);
  console.log(`Generated files: ${generatedFiles.length}`);
  console.log(`Sentinel target: ${sentinelFile}`);
  console.log(`First run output:\n${firstRun.stdout}`.trim());
  console.log(`Second run output:\n${secondRun.stdout}`.trim());
} finally {
  rmSync(workspace, { recursive: true, force: true });
}

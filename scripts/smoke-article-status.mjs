import { existsSync, mkdtempSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';

const repoRoot = resolve(import.meta.dirname, '..');
const cliPath = join(repoRoot, 'dist', 'cli.js');
const expectedArtifacts = ['brief', 'sources', 'outline', 'draft', 'review', 'final'];
const topic = 'Smoke Article Status';

function fail(message) {
  throw new Error(message);
}

function assert(condition, message) {
  if (!condition) fail(message);
}

function runQuill(workspace, args) {
  const env = { ...process.env };
  delete env.QUILL_API_KEY;

  const result = spawnSync(process.execPath, [cliPath, ...args], {
    cwd: workspace,
    encoding: 'utf8',
    env,
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    fail([
      `quill ${args.join(' ')} failed with exit code ${result.status}`,
      result.stdout && `stdout:\n${result.stdout}`,
      result.stderr && `stderr:\n${result.stderr}`,
    ].filter(Boolean).join('\n\n'));
  }

  return {
    stdout: result.stdout,
    stderr: result.stderr,
  };
}

function assertStatusLine(output, artifact, statusText) {
  const expected = `${`${artifact}.md`.padEnd(11)} ${statusText}`;
  assert(output.includes(expected), `Expected status output to include ${JSON.stringify(expected)}. Output:\n${output}`);
}

assert(existsSync(cliPath), `Built CLI not found at ${cliPath}. Run npm run build first.`);

const workspace = mkdtempSync(join(tmpdir(), 'quill-article-status-smoke-'));

try {
  const newRun = runQuill(workspace, ['new', topic]);
  const articlesRoot = join(workspace, 'docs', 'articles');

  assert(existsSync(articlesRoot) && statSync(articlesRoot).isDirectory(), 'Expected docs/articles/ directory to be created.');

  const articleDirs = readdirSync(articlesRoot).filter((entry) => statSync(join(articlesRoot, entry)).isDirectory());
  assert(articleDirs.length === 1, `Expected one article directory, found ${articleDirs.length}.`);

  const articleSlug = articleDirs[0];
  const articleDir = join(articlesRoot, articleSlug);

  assert(newRun.stdout.includes(`Article created: ${articleSlug}`), `Expected quill new output to mention ${articleSlug}.`);
  assert(newRun.stdout.includes(`Next: quill status ${articleSlug}`), 'Expected quill new output to include the status next step.');

  for (const artifact of expectedArtifacts) {
    const artifactFile = join(articleDir, `${artifact}.md`);
    assert(existsSync(artifactFile), `Expected ${artifact}.md to be created.`);
    assert(readFileSync(artifactFile, 'utf8').trim().length > 0, `Expected ${artifact}.md to have initial Markdown content.`);
  }

  const initialStatus = runQuill(workspace, ['status', articleSlug]).stdout;
  assertStatusLine(initialStatus, 'outline', 'pending');
  assert(!initialStatus.includes('QUILL_API_KEY'), 'Expected status command not to require or mention QUILL_API_KEY.');

  writeFileSync(join(articleDir, 'draft.md'), '# Draft\n\nThis artifact now has human-written content.\n', 'utf8');
  writeFileSync(join(articleDir, 'review.md'), '   \n', 'utf8');
  rmSync(join(articleDir, 'final.md'), { force: true });

  const finalStatus = runQuill(workspace, ['status', articleSlug]).stdout;

  assert(finalStatus.includes(`Article: ${articleSlug}`), 'Expected status output to identify the article.');
  assertStatusLine(finalStatus, 'outline', 'pending');
  assertStatusLine(finalStatus, 'draft', 'ok exists');
  assertStatusLine(finalStatus, 'review', 'warn empty');
  assertStatusLine(finalStatus, 'final', 'missing');
  assert(!finalStatus.includes('QUILL_API_KEY'), 'Expected status command not to require or mention QUILL_API_KEY after mutations.');

  console.log('Smoke article status passed.');
  console.log(`Workspace: ${workspace}`);
  console.log(`Article: ${articleSlug}`);
  console.log(`New output:\n${newRun.stdout}`.trim());
  console.log(`Final status output:\n${finalStatus}`.trim());
} finally {
  rmSync(workspace, { recursive: true, force: true });
}

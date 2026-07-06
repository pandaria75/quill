import { existsSync, mkdtempSync, readdirSync, readFileSync, rmSync, statSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';

const repoRoot = resolve(import.meta.dirname, '..');
const cliPath = join(repoRoot, 'dist', 'cli.js');
const expectedArtifacts = ['brief', 'sources', 'outline', 'draft', 'review', 'final'];
const topic = 'Smoke MVP Article';
const missingKeyText = 'Missing QUILL_API_KEY';

function fail(message) {
  throw new Error(message);
}

function assert(condition, message) {
  if (!condition) fail(message);
}

function runQuill(workspace, args, expectedStatus = 0) {
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

  if (result.status !== expectedStatus) {
    fail([
      `quill ${args.join(' ')} exited with ${result.status}, expected ${expectedStatus}`,
      result.stdout && `stdout:\n${result.stdout}`,
      result.stderr && `stderr:\n${result.stderr}`,
    ].filter(Boolean).join('\n\n'));
  }

  return {
    stdout: result.stdout,
    stderr: result.stderr,
    combinedOutput: `${result.stdout}\n${result.stderr}`,
  };
}

function assertStatusLine(output, artifact, statusText) {
  const expected = `${`${artifact}.md`.padEnd(11)} ${statusText}`;
  assert(output.includes(expected), `Expected status output to include ${JSON.stringify(expected)}. Output:\n${output}`);
}

assert(existsSync(cliPath), `Built CLI not found at ${cliPath}. Run npm run build first.`);

const workspace = mkdtempSync(join(tmpdir(), 'quill-mvp-smoke-'));

try {
  const initRun = runQuill(workspace, ['init']);
  assert(existsSync(join(workspace, '.quill')), 'Expected .quill/ directory to be created by init.');
  assert(initRun.combinedOutput.includes('created') || initRun.combinedOutput.includes('skipped'), 'Expected init to report created or skipped files.');

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

  const statusRun = runQuill(workspace, ['status', articleSlug]);
  assert(statusRun.stdout.includes(`Article: ${articleSlug}`), 'Expected status output to identify the article.');
  for (const artifact of expectedArtifacts) {
    assertStatusLine(statusRun.stdout, artifact, 'pending');
  }
  assert(!statusRun.combinedOutput.includes('QUILL_API_KEY'), 'Expected status command not to require or mention QUILL_API_KEY.');

  const stepRun = runQuill(workspace, ['step', articleSlug, 'brief'], 1);
  assert(stepRun.combinedOutput.includes(missingKeyText), `Expected step failure to mention ${missingKeyText}.`);
  assert(stepRun.combinedOutput.includes('Set it before running model-backed steps.'), 'Expected step failure to explain how to recover.');

  const runResult = runQuill(workspace, ['run', articleSlug], 1);
  assert(runResult.combinedOutput.includes(missingKeyText), `Expected run failure to mention ${missingKeyText}.`);
  assert(runResult.combinedOutput.includes('Set it before running model-backed steps.'), 'Expected run failure to explain how to recover.');
  assert(!runResult.combinedOutput.includes('Workflow complete'), 'Expected failed run not to claim workflow completion.');

  console.log('Smoke MVP passed.');
  console.log(`Workspace: ${workspace}`);
  console.log(`Article: ${articleSlug}`);
  console.log(`Status output:\n${statusRun.stdout}`.trim());
  console.log(`Step failure output:\n${stepRun.combinedOutput}`.trim());
  console.log(`Run failure output:\n${runResult.combinedOutput}`.trim());
} finally {
  rmSync(workspace, { recursive: true, force: true });
}

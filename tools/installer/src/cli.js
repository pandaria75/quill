#!/usr/bin/env node

import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = resolve(__dirname, '..', '..', '..');
const coreSource = join(repoRoot, 'core');
const hermesSource = join(repoRoot, 'distributions', 'hermes');

function usage() {
  return [
    'Usage:',
    '  quill init',
    '  quill init --target <path>'
  ].join('\n');
}

function parseArgs(argv) {
  if (argv.length === 1 && argv[0] === 'init') {
    return { command: 'init', target: process.cwd() };
  }

  if (argv.length === 3 && argv[0] === 'init' && argv[1] === '--target' && argv[2]) {
    return { command: 'init', target: resolve(argv[2]) };
  }

  throw new Error(usage());
}

function ensureDir(path) {
  mkdirSync(path, { recursive: true });
}

function copyDirectoryIfMissing(sourceDir, targetDir) {
  ensureDir(targetDir);

  for (const entry of readdirSync(sourceDir)) {
    const sourcePath = join(sourceDir, entry);
    const targetPath = join(targetDir, entry);
    const sourceStat = statSync(sourcePath);

    if (sourceStat.isDirectory()) {
      copyDirectoryIfMissing(sourcePath, targetPath);
      continue;
    }

    if (!existsSync(targetPath)) {
      copyFileSync(sourcePath, targetPath);
    }
  }
}

function writeIfMissing(path, content) {
  if (!existsSync(path)) {
    writeFileSync(path, content, 'utf8');
  }
}

function main() {
  const { target } = parseArgs(process.argv.slice(2));
  const quillRoot = join(target, '.quill');
  const coreTarget = join(quillRoot, 'core');
  const distributionsTarget = join(quillRoot, 'distributions');
  const targetAgents = join(target, 'AGENTS.md');
  const configPath = join(quillRoot, 'quill.json');

  ensureDir(target);
  ensureDir(quillRoot);
  ensureDir(coreTarget);
  ensureDir(distributionsTarget);

  writeIfMissing(targetAgents, [
    '# Workspace AGENTS',
    '',
    'This workspace consumes Quill as a document-first workflow kit.',
    '',
    '- Core assets live under `.quill/core`.',
    '- Hermes distribution research assets live under `.quill/distributions/hermes`.',
    '- This installer does not run workflows or model clients.'
  ].join('\n'));

  writeIfMissing(configPath, JSON.stringify({
    workflow: 'longform-writing',
    roleCard: 'technical-blog',
    distributions: ['hermes'],
    runtime: 'none'
  }, null, 2) + '\n');

  copyDirectoryIfMissing(coreSource, coreTarget);
  copyDirectoryIfMissing(hermesSource, join(distributionsTarget, 'hermes'));

  process.stdout.write(`Initialized Quill document assets at ${target}\n`);
}

try {
  main();
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`${message}\n`);
  process.exitCode = 1;
}

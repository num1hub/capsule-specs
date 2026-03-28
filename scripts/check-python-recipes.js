#!/usr/bin/env node

const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const repoRoot = path.resolve(__dirname, '..');
const python = process.env.PYTHON_BINARY || 'python3';

function run(command, args, cwd) {
  const result = spawnSync(command, args, {
    cwd,
    encoding: 'utf8'
  });

  if (result.status !== 0) {
    const detail = result.stderr || result.stdout || 'unknown error';
    throw new Error(`${command} ${args.join(' ')} failed in ${cwd}: ${detail}`);
  }

  return result.stdout;
}

function safeRemove(targetPath) {
  fs.rmSync(targetPath, { recursive: true, force: true });
}

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exitCode = 1;
  }
}

const recipeFiles = [
  path.join(repoRoot, 'examples', 'client', 'python-contract-reference.py'),
  path.join(repoRoot, 'examples', 'client', 'python-recompute-integrity-seal.py'),
  path.join(repoRoot, 'examples', 'client', 'python-validate-single.py'),
  path.join(repoRoot, 'examples', 'client', 'python-validate-batch.py'),
  path.join(repoRoot, 'examples', 'client', 'python-validate-fix.py'),
  path.join(repoRoot, 'examples', 'client', 'python-parse-validate-responses.py'),
  path.join(repoRoot, 'examples', 'client', 'python-parse-support-responses.py')
];

const workspaceRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'capsule-specs-python-'));
let tarballPath = null;

try {
  run(python, ['--version'], repoRoot);

  for (const recipePath of recipeFiles) {
    assert(fs.existsSync(recipePath), `missing Python recipe ${path.relative(repoRoot, recipePath)}`);
    run(python, [recipePath], repoRoot);
  }

  const packOutput = run('npm', ['pack', '--json', '--pack-destination', workspaceRoot], repoRoot);
  const parsedPack = JSON.parse(packOutput);
  const tarballFileName = parsedPack[0]?.filename;

  if (!tarballFileName) {
    throw new Error('npm pack did not report a tarball filename');
  }

  tarballPath = path.join(workspaceRoot, tarballFileName);

  const extractedRoot = path.join(workspaceRoot, 'packed-artifact');
  fs.mkdirSync(extractedRoot, { recursive: true });
  run('tar', ['-xzf', tarballPath, '-C', extractedRoot], repoRoot);

  const packedPackageRoot = path.join(extractedRoot, 'package');
  run(python, [path.join(packedPackageRoot, 'examples', 'client', 'python-contract-reference.py')], packedPackageRoot);
  run(python, [path.join(packedPackageRoot, 'examples', 'client', 'python-recompute-integrity-seal.py')], packedPackageRoot);
  run(python, [path.join(packedPackageRoot, 'examples', 'client', 'python-validate-single.py')], packedPackageRoot);
  run(python, [path.join(packedPackageRoot, 'examples', 'client', 'python-validate-batch.py')], packedPackageRoot);
  run(python, [path.join(packedPackageRoot, 'examples', 'client', 'python-validate-fix.py')], packedPackageRoot);
  run(python, [path.join(packedPackageRoot, 'examples', 'client', 'python-parse-validate-responses.py')], packedPackageRoot);
  run(python, [path.join(packedPackageRoot, 'examples', 'client', 'python-parse-support-responses.py')], packedPackageRoot);

  console.log('OK: checked 7 repo-local Python recipes and 7 packed-artifact Python recipes');
} catch (error) {
  console.error(`FAIL: ${error.message}`);
  process.exitCode = 1;
} finally {
  if (tarballPath) {
    safeRemove(tarballPath);
  }
  safeRemove(workspaceRoot);
}

if (process.exitCode) {
  process.exit(process.exitCode);
}

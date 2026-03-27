#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const manifestPath = path.join(repoRoot, 'SOURCE_MANIFEST.json');

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const manifestEntries = new Set(Object.keys(manifest));

const ignoredPrefixes = ['.git/', 'node_modules/'];
const ignoredFiles = new Set(['.codexignore']);

function shouldIgnore(relativePath) {
  if (ignoredFiles.has(relativePath)) return true;
  return ignoredPrefixes.some((prefix) => relativePath.startsWith(prefix));
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const absolutePath = path.join(dir, entry.name);
    const relativePath = path.relative(repoRoot, absolutePath).replaceAll(path.sep, '/');
    if (shouldIgnore(relativePath)) continue;
    if (entry.isDirectory()) {
      files.push(...walk(absolutePath));
    } else {
      files.push(relativePath);
    }
  }
  return files;
}

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exitCode = 1;
  }
}

const files = walk(repoRoot).sort();

for (const file of files) {
  assert(manifestEntries.has(file), `missing SOURCE_MANIFEST entry for ${file}`);
}

for (const file of manifestEntries) {
  assert(fs.existsSync(path.join(repoRoot, file)), `manifest entry points to missing file ${file}`);
}

for (const file of files) {
  if (file.endsWith('.json')) {
    try {
      JSON.parse(fs.readFileSync(path.join(repoRoot, file), 'utf8'));
    } catch (error) {
      assert(false, `invalid JSON in ${file}: ${error.message}`);
    }
  }
}

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(`OK: audited ${files.length} files and ${manifestEntries.size} manifest entries`);

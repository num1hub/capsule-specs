#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { listMarkdownFiles } = require('./lib/repo-files');

const repoRoot = path.resolve(__dirname, '..');
const markdownFiles = listMarkdownFiles(repoRoot);

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exitCode = 1;
  }
}

function shouldSkipTarget(target) {
  return (
    !target ||
    target.startsWith('#') ||
    target.startsWith('http://') ||
    target.startsWith('https://') ||
    target.startsWith('mailto:')
  );
}

const markdownLinkPattern = /!?\[[^\]]*\]\(([^)]+)\)/g;
let checkedLinks = 0;

for (const relativeFile of markdownFiles) {
  const absoluteFile = path.join(repoRoot, relativeFile);
  const content = fs.readFileSync(absoluteFile, 'utf8');
  for (const match of content.matchAll(markdownLinkPattern)) {
    const rawTarget = match[1].trim();
    if (shouldSkipTarget(rawTarget)) continue;
    const cleanTarget = rawTarget.split('#')[0].trim();
    if (shouldSkipTarget(cleanTarget)) continue;
    const resolved = path.resolve(path.dirname(absoluteFile), cleanTarget);
    assert(fs.existsSync(resolved), `${relativeFile} points to missing target ${rawTarget}`);
    checkedLinks += 1;
  }
}

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(`OK: checked ${checkedLinks} Markdown links across ${markdownFiles.length} files`);

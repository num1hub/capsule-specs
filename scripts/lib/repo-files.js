const childProcess = require('child_process');
const fs = require('fs');
const path = require('path');

const fallbackIgnoredPrefixes = [
  '.git/',
  '.codex/',
  '.egor-n1-maintainer/',
  'node_modules/',
  'dist/',
  'coverage/'
];

const fallbackIgnoredFiles = new Set([
  '.codexignore',
  'capsule-specs-full-repository.txt'
]);

function listRepoFiles(repoRoot) {
  try {
    return childProcess
      .execFileSync('git', ['-C', repoRoot, 'ls-files', '-co', '--exclude-standard'], {
        encoding: 'utf8'
      })
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .sort();
  } catch {
    function shouldIgnore(relativePath) {
      if (fallbackIgnoredFiles.has(relativePath)) return true;
      return fallbackIgnoredPrefixes.some((prefix) => relativePath.startsWith(prefix));
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

    return walk(repoRoot).sort();
  }
}

function listMarkdownFiles(repoRoot) {
  return listRepoFiles(repoRoot).filter((file) => file.endsWith('.md'));
}

module.exports = {
  listRepoFiles,
  listMarkdownFiles
};

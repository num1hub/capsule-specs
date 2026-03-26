#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const ignoredPrefixes = ['.git/'];
const ignoredFiles = new Set(['.codexignore']);

function shouldIgnore(relativePath) {
  if (ignoredFiles.has(relativePath)) return true;
  return ignoredPrefixes.some((prefix) => relativePath.startsWith(prefix));
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files = [];
  for (const entry of entries) {
    const absolutePath = path.join(dir, entry.name);
    const relativePath = path.relative(repoRoot, absolutePath).replaceAll(path.sep, '/');
    if (shouldIgnore(relativePath)) continue;
    if (entry.isDirectory()) {
      files = files.concat(walk(absolutePath));
    } else {
      files.push(relativePath);
    }
  }
  return files;
}

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(repoRoot, relativePath), 'utf8'));
}

function readText(relativePath) {
  return fs.readFileSync(path.join(repoRoot, relativePath), 'utf8');
}

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exitCode = 1;
  }
}

const profile = readJson('PUBLIC_PROJECT_PROFILE.json');
const releaseMetadata = readJson('PUBLIC_RELEASE_METADATA.json');
const pkg = readJson('package.json');
const files = walk(repoRoot).sort();

const markdownFiles = files.filter((file) => file.endsWith('.md')).length;
const schemaFiles = fs.readdirSync(path.join(repoRoot, 'schemas')).filter((name) => name.endsWith('.json')).length;
const rawCapsuleFiles = fs.readdirSync(path.join(repoRoot, 'capsules')).filter((name) => name.endsWith('.json')).length;
const exampleCapsules = fs.readdirSync(path.join(repoRoot, 'examples')).filter((name) => name.endsWith('.capsule.json')).length;
const apiExampleFiles = fs.readdirSync(path.join(repoRoot, 'examples', 'api')).filter((name) => name.endsWith('.json')).length;
const clientRecipeFiles = fs.readdirSync(path.join(repoRoot, 'examples', 'client')).filter((name) => !name.endsWith('.md')).length;
const workflowFiles = fs.readdirSync(path.join(repoRoot, '.github', 'workflows')).filter((name) => name.endsWith('.yml')).length;
const issueTemplates = fs.readdirSync(path.join(repoRoot, '.github', 'ISSUE_TEMPLATE')).filter((name) => name.endsWith('.md')).length;
const repoLocalCheckCount = Object.keys(pkg.scripts || {}).filter((name) => name !== 'verify:repo').length;
const upstreamValidatorCheckCount = (releaseMetadata.upstream_validator_checks || []).length;

assert(profile.profile_version === pkg.version, 'PUBLIC_PROJECT_PROFILE.json profile_version must match package.json version');
assert(profile.repository_identity?.package_name === pkg.name, 'project profile package_name must match package.json name');
assert(profile.repository_identity?.license === pkg.license, 'project profile license must match package.json license');
assert(profile.repository_identity?.primary_maintainer === 'egor-n1', 'project profile primary_maintainer must be egor-n1');

assert(profile.surface_summary?.total_files === files.length, 'project profile total_files must match actual repository file count');
assert(profile.surface_summary?.markdown_files === markdownFiles, 'project profile markdown_files must match actual Markdown count');
assert(profile.surface_summary?.schema_files === schemaFiles, 'project profile schema_files must match actual schema count');
assert(profile.surface_summary?.raw_capsule_files === rawCapsuleFiles, 'project profile raw_capsule_files must match actual capsule count');
assert(profile.surface_summary?.example_capsules === exampleCapsules, 'project profile example_capsules must match actual example capsule count');
assert(profile.surface_summary?.api_example_files === apiExampleFiles, 'project profile api_example_files must match actual API example count');
assert(profile.surface_summary?.client_recipe_files === clientRecipeFiles, 'project profile client_recipe_files must match actual client recipe count');
assert(profile.surface_summary?.workflow_files === workflowFiles, 'project profile workflow_files must match actual workflow count');
assert(profile.surface_summary?.issue_templates === issueTemplates, 'project profile issue_templates must match actual issue template count');

assert(profile.health_signals?.community_files_present === true, 'project profile must mark community_files_present true');
assert(profile.health_signals?.issue_templates_present === true, 'project profile must mark issue_templates_present true');
assert(profile.health_signals?.pull_request_template_present === true, 'project profile must mark pull_request_template_present true');
assert(profile.health_signals?.machine_readable_project_profile_present === true, 'project profile must mark machine_readable_project_profile_present true');
assert(profile.health_signals?.machine_readable_capability_matrix_present === true, 'project profile must mark machine_readable_capability_matrix_present true');
assert(profile.health_signals?.reviewer_guide_present === true, 'project profile must mark reviewer_guide_present true');
assert(profile.health_signals?.single_repo_verify_entrypoint_present === true, 'project profile must mark single_repo_verify_entrypoint_present true');

assert(profile.verification_summary?.entrypoint === 'npm run verify:repo', 'project profile verify entrypoint must be npm run verify:repo');
assert(profile.verification_summary?.repo_local_check_count === repoLocalCheckCount, 'project profile repo_local_check_count must match package scripts');
assert(profile.verification_summary?.upstream_validator_check_count === upstreamValidatorCheckCount, 'project profile upstream_validator_check_count must match release metadata');

assert(profile.reviewer_shortcuts?.reviewer_guide === 'docs/reviewer-guide.md', 'project profile reviewer_guide shortcut must point to docs/reviewer-guide.md');
assert(profile.reviewer_shortcuts?.capability_matrix === 'PUBLIC_CAPABILITY_MATRIX.json', 'project profile capability_matrix shortcut must point to PUBLIC_CAPABILITY_MATRIX.json');
assert(profile.reviewer_shortcuts?.project_profile === 'PUBLIC_PROJECT_PROFILE.json', 'project profile project_profile shortcut must point to itself');

const readme = readText('README.md');
const reviewerGuide = readText('docs/reviewer-guide.md');
assert(readme.includes('PUBLIC_PROJECT_PROFILE.json'), 'README.md must mention PUBLIC_PROJECT_PROFILE.json');
assert(readme.includes('PUBLIC_CAPABILITY_MATRIX.json'), 'README.md must mention PUBLIC_CAPABILITY_MATRIX.json');
assert(readme.includes('docs/reviewer-guide.md'), 'README.md must mention docs/reviewer-guide.md');
assert(reviewerGuide.includes('PUBLIC_PROJECT_PROFILE.json'), 'reviewer guide must mention PUBLIC_PROJECT_PROFILE.json');
assert(reviewerGuide.includes('PUBLIC_CAPABILITY_MATRIX.json'), 'reviewer guide must mention PUBLIC_CAPABILITY_MATRIX.json');
assert(reviewerGuide.includes('PUBLIC_CONTRACT_CATALOG.json'), 'reviewer guide must mention PUBLIC_CONTRACT_CATALOG.json');
assert(reviewerGuide.includes('PUBLIC_RELEASE_METADATA.json'), 'reviewer guide must mention PUBLIC_RELEASE_METADATA.json');

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(`OK: checked public project profile against ${files.length} files, ${repoLocalCheckCount} repo-local checks, and ${upstreamValidatorCheckCount} upstream validator checks`);

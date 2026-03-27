#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');

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

const labels = readJson('.github/labels.json');
const milestones = readJson('.github/milestones.json');
const releaseConfigText = readText('.github/release.yml');
const readme = readText('README.md');
const roadmap = readText('ROADMAP.md');
const contributing = readText('CONTRIBUTING.md');
const communityDoc = readText('docs/community-health.md');
const maintainerOps = readText('docs/maintainer-operations.md');
const releaseEvidence = readText('docs/release-evidence.md');
const githubOps = readText('docs/github-operations.md');
const prTemplate = readText('.github/PULL_REQUEST_TEMPLATE.md');
const bugTemplate = readText('.github/ISSUE_TEMPLATE/bug_report.md');
const featureTemplate = readText('.github/ISSUE_TEMPLATE/feature_request.md');
const integrationTemplate = readText('.github/ISSUE_TEMPLATE/integration_question.md');
const contractTemplate = readText('.github/ISSUE_TEMPLATE/contract_change.md');

assert(Array.isArray(labels) && labels.length >= 10, '.github/labels.json must define at least 10 labels');
assert(Array.isArray(milestones.active_milestones) && milestones.active_milestones.length >= 2, '.github/milestones.json must define at least 2 active milestones');
assert(Array.isArray(milestones.operating_notes) && milestones.operating_notes.length >= 1, '.github/milestones.json must define operating notes');
assert(releaseConfigText.includes('changelog:'), '.github/release.yml must define a changelog section');
assert(releaseConfigText.includes('categories:'), '.github/release.yml must define changelog categories');

const labelNames = new Set();
for (const label of labels) {
  assert(typeof label.name === 'string' && label.name.length > 0, 'every label must have a non-empty name');
  assert(!labelNames.has(label.name), `duplicate label in .github/labels.json: ${label.name}`);
  labelNames.add(label.name);
  assert(typeof label.color === 'string' && /^[0-9a-fA-F]{6}$/.test(label.color), `label ${label.name} must have a 6-digit hex color`);
  assert(typeof label.description === 'string' && label.description.length > 0, `label ${label.name} must have a description`);
}

const requiredLabels = [
  'bug',
  'documentation',
  'enhancement',
  'question',
  'contract',
  'good first issue',
  'help wanted',
  'area:schemas',
  'area:validator',
  'area:examples',
  'area:docs',
  'area:governance',
  'area:github',
  'kind:integration',
  'kind:release'
];

for (const requiredLabel of requiredLabels) {
  assert(labelNames.has(requiredLabel), `required GitHub label missing from .github/labels.json: ${requiredLabel}`);
}

for (const milestone of milestones.active_milestones) {
  assert(typeof milestone.title === 'string' && milestone.title.length > 0, 'every milestone must have a title');
  assert(typeof milestone.roadmap_wave === 'string' && milestone.roadmap_wave.length > 0, `milestone ${milestone.title} must have a roadmap_wave`);
  assert(typeof milestone.description === 'string' && milestone.description.length > 0, `milestone ${milestone.title} must have a description`);
  assert(Array.isArray(milestone.tracked_issues) && milestone.tracked_issues.length >= 1, `milestone ${milestone.title} must track at least one issue`);
  for (const issueNumber of milestone.tracked_issues) {
    assert(Number.isInteger(issueNumber) && issueNumber > 0, `milestone ${milestone.title} has invalid tracked issue number ${issueNumber}`);
  }
}

const releaseCategoryTitles = [...releaseConfigText.matchAll(/^\s*-\s+title:\s+"(.+)"\s*$/gm)].map((match) => match[1]);
const releaseCategoryLabels = [...releaseConfigText.matchAll(/^\s*-\s+"(.+)"\s*$/gm)].map((match) => match[1]);

assert(releaseCategoryTitles.length >= 5, '.github/release.yml must define at least 5 release categories');
for (const label of releaseCategoryLabels) {
  assert(labelNames.has(label), `.github/release.yml references unknown label ${label}`);
}

const issueTemplateLabels = [
  bugTemplate.match(/^labels:\s*(.+)$/m)?.[1]?.trim(),
  featureTemplate.match(/^labels:\s*(.+)$/m)?.[1]?.trim(),
  integrationTemplate.match(/^labels:\s*(.+)$/m)?.[1]?.trim(),
  contractTemplate.match(/^labels:\s*(.+)$/m)?.[1]?.trim()
].filter(Boolean);

for (const templateLabel of issueTemplateLabels) {
  assert(labelNames.has(templateLabel), `issue template references unknown label ${templateLabel}`);
}

assert(readme.includes('.github/labels.json'), 'README.md must mention .github/labels.json');
assert(readme.includes('.github/milestones.json'), 'README.md must mention .github/milestones.json');
assert(readme.includes('docs/github-operations.md'), 'README.md must mention docs/github-operations.md');
assert(roadmap.includes('#1') && roadmap.includes('#2') && roadmap.includes('#3') && roadmap.includes('#4'), 'ROADMAP.md must mention the tracked public issue numbers');
assert(contributing.includes('v0.2.0 Better Integrator Surfaces') && contributing.includes('v0.3.0 Projection-Friendly References'), 'CONTRIBUTING.md must mention the active milestones');
assert(communityDoc.includes('.github/labels.json') && communityDoc.includes('.github/milestones.json'), 'docs/community-health.md must mention .github label and milestone configs');
assert(maintainerOps.includes('docs/github-operations.md') || maintainerOps.includes('.github/labels.json'), 'docs/maintainer-operations.md must mention the GitHub operations layer');
assert(releaseEvidence.includes('.github/release.yml') && releaseEvidence.includes('.github/dependabot.yml'), 'docs/release-evidence.md must mention GitHub-native release/update surfaces');
assert(githubOps.includes('.github/labels.json') && githubOps.includes('.github/milestones.json'), 'docs/github-operations.md must mention label and milestone configs');
assert(prTemplate.includes('Milestone posture'), '.github/PULL_REQUEST_TEMPLATE.md must include a Milestone posture section');

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(`OK: checked ${labels.length} GitHub labels, ${milestones.active_milestones.length} milestones, and ${releaseCategoryTitles.length} release categories`);

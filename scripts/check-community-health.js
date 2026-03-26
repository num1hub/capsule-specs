#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');

const requiredFiles = [
  'CONTRIBUTING.md',
  'CODE_OF_CONDUCT.md',
  'SECURITY.md',
  'SUPPORT.md',
  'MAINTAINERS.md',
  'CODEOWNERS',
  'docs/community-health.md',
  '.github/ISSUE_TEMPLATE/bug_report.md',
  '.github/ISSUE_TEMPLATE/feature_request.md',
  '.github/ISSUE_TEMPLATE/integration_question.md',
  '.github/ISSUE_TEMPLATE/contract_change.md',
  '.github/ISSUE_TEMPLATE/config.yml',
  '.github/PULL_REQUEST_TEMPLATE.md'
];

function readText(relativePath) {
  return fs.readFileSync(path.join(repoRoot, relativePath), 'utf8');
}

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exitCode = 1;
  }
}

for (const relativePath of requiredFiles) {
  assert(fs.existsSync(path.join(repoRoot, relativePath)), `missing community-health surface ${relativePath}`);
}

const communityDoc = readText('docs/community-health.md');
const readme = readText('README.md');
const onboarding = readText('ONBOARDING.md');
const contributing = readText('CONTRIBUTING.md');
const support = readText('SUPPORT.md');
const config = readText('.github/ISSUE_TEMPLATE/config.yml');
const integrationTemplate = readText('.github/ISSUE_TEMPLATE/integration_question.md');
const contractTemplate = readText('.github/ISSUE_TEMPLATE/contract_change.md');
const prTemplate = readText('.github/PULL_REQUEST_TEMPLATE.md');

assert(communityDoc.includes('GitHub issues'), 'docs/community-health.md must mention GitHub issues');
assert(communityDoc.includes('Pull requests'), 'docs/community-health.md must mention pull requests');
assert(communityDoc.includes('SECURITY.md'), 'docs/community-health.md must mention SECURITY.md');
assert(communityDoc.includes('CONTRIBUTING.md'), 'docs/community-health.md must mention CONTRIBUTING.md');
assert(communityDoc.includes('integration questions'), 'docs/community-health.md must mention integration questions');
assert(communityDoc.includes('contract change proposals'), 'docs/community-health.md must mention contract change proposals');

assert(readme.includes('docs/community-health.md'), 'README.md must mention docs/community-health.md');
assert(onboarding.includes('docs/community-health.md'), 'ONBOARDING.md must mention docs/community-health.md');
assert(contributing.includes('issue template'), 'CONTRIBUTING.md must mention issue templates');
assert(support.includes('docs/community-health.md'), 'SUPPORT.md must mention docs/community-health.md');

assert(config.includes('Integration guide'), '.github/ISSUE_TEMPLATE/config.yml must include the integration guide contact link');
assert(config.includes('Security reports'), '.github/ISSUE_TEMPLATE/config.yml must keep the security contact link');
assert(integrationTemplate.includes('schemas/validator-api-envelopes.schema.json'), 'integration question template must point to validator-api-envelopes schema');
assert(contractTemplate.includes('Verification plan'), 'contract change template must demand a verification plan');
assert(prTemplate.includes('Boundary'), 'pull request template must include a Boundary section');

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(`OK: checked ${requiredFiles.length} community health files and intake surfaces`);

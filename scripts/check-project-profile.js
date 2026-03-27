#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const ignoredPrefixes = ['.git/', 'node_modules/', 'dist/'];
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
const repoLocalCheckCount = Object.keys(pkg.scripts || {}).filter((name) => name.startsWith('audit:') || name.startsWith('check:')).length;
const upstreamValidatorCheckCount = (releaseMetadata.upstream_validator_checks || []).length;

assert(profile.profile_version === pkg.version, 'PUBLIC_PROJECT_PROFILE.json profile_version must match package.json version');
assert(profile.repository_identity?.owner === 'num1hub', 'project profile owner must be num1hub');
assert(profile.repository_identity?.name === 'capsule-specs', 'project profile repo name must be capsule-specs');
assert(profile.repository_identity?.package_name === pkg.name, 'project profile package_name must match package.json name');
assert(profile.repository_identity?.homepage === 'https://github.com/num1hub/capsule-specs', 'project profile homepage must match the canonical public repo URL');
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
assert(profile.health_signals?.machine_readable_repository_identity_present === true, 'project profile must mark machine_readable_repository_identity_present true');
assert(profile.health_signals?.machine_readable_capability_matrix_present === true, 'project profile must mark machine_readable_capability_matrix_present true');
assert(profile.health_signals?.machine_readable_boundary_map_present === true, 'project profile must mark machine_readable_boundary_map_present true');
assert(profile.health_signals?.machine_readable_portability_profile_present === true, 'project profile must mark machine_readable_portability_profile_present true');
assert(profile.health_signals?.machine_readable_evaluation_packet_present === true, 'project profile must mark machine_readable_evaluation_packet_present true');
assert(profile.health_signals?.machine_readable_failure_model_present === true, 'project profile must mark machine_readable_failure_model_present true');
assert(profile.health_signals?.machine_readable_example_coverage_present === true, 'project profile must mark machine_readable_example_coverage_present true');
assert(profile.health_signals?.machine_readable_maintenance_model_present === true, 'project profile must mark machine_readable_maintenance_model_present true');
assert(profile.health_signals?.machine_readable_change_control_model_present === true, 'project profile must mark machine_readable_change_control_model_present true');
assert(profile.health_signals?.machine_readable_ownership_map_present === true, 'project profile must mark machine_readable_ownership_map_present true');
assert(profile.health_signals?.machine_readable_traceability_matrix_present === true, 'project profile must mark machine_readable_traceability_matrix_present true');
assert(profile.health_signals?.machine_readable_dependency_graph_present === true, 'project profile must mark machine_readable_dependency_graph_present true');
assert(profile.health_signals?.machine_readable_assurance_case_present === true, 'project profile must mark machine_readable_assurance_case_present true');
assert(profile.health_signals?.machine_readable_update_coherence_present === true, 'project profile must mark machine_readable_update_coherence_present true');
assert(profile.health_signals?.machine_readable_limitations_register_present === true, 'project profile must mark machine_readable_limitations_register_present true');
assert(profile.health_signals?.machine_readable_evidence_timeline_present === true, 'project profile must mark machine_readable_evidence_timeline_present true');
assert(profile.health_signals?.machine_readable_review_scorecard_present === true, 'project profile must mark machine_readable_review_scorecard_present true');
assert(profile.health_signals?.machine_readable_verification_matrix_present === true, 'project profile must mark machine_readable_verification_matrix_present true');
assert(profile.health_signals?.machine_readable_audience_paths_present === true, 'project profile must mark machine_readable_audience_paths_present true');
assert(profile.health_signals?.machine_readable_evidence_strength_map_present === true, 'project profile must mark machine_readable_evidence_strength_map_present true');
assert(profile.health_signals?.machine_readable_adoption_readiness_present === true, 'project profile must mark machine_readable_adoption_readiness_present true');
assert(profile.health_signals?.machine_readable_freshness_model_present === true, 'project profile must mark machine_readable_freshness_model_present true');
assert(profile.health_signals?.machine_readable_ecosystem_value_present === true, 'project profile must mark machine_readable_ecosystem_value_present true');
assert(profile.health_signals?.machine_readable_evidence_gaps_present === true, 'project profile must mark machine_readable_evidence_gaps_present true');
assert(profile.health_signals?.machine_readable_program_fit_present === true, 'project profile must mark machine_readable_program_fit_present true');
assert(profile.health_signals?.machine_readable_publication_readiness_present === true, 'project profile must mark machine_readable_publication_readiness_present true');
assert(profile.health_signals?.reviewer_guide_present === true, 'project profile must mark reviewer_guide_present true');
assert(profile.health_signals?.single_repo_verify_entrypoint_present === true, 'project profile must mark single_repo_verify_entrypoint_present true');

assert(profile.verification_summary?.entrypoint === 'npm run verify:repo', 'project profile verify entrypoint must be npm run verify:repo');
assert(profile.verification_summary?.repo_local_check_count === repoLocalCheckCount, 'project profile repo_local_check_count must match package scripts');
assert(profile.verification_summary?.upstream_validator_check_count === upstreamValidatorCheckCount, 'project profile upstream_validator_check_count must match release metadata');

assert(profile.reviewer_shortcuts?.reviewer_guide === 'docs/reviewer-guide.md', 'project profile reviewer_guide shortcut must point to docs/reviewer-guide.md');
assert(profile.reviewer_shortcuts?.boundary_map === 'PUBLIC_BOUNDARY_MAP.json', 'project profile boundary_map shortcut must point to PUBLIC_BOUNDARY_MAP.json');
assert(profile.reviewer_shortcuts?.portability_profile === 'PUBLIC_PORTABILITY_PROFILE.json', 'project profile portability_profile shortcut must point to PUBLIC_PORTABILITY_PROFILE.json');
assert(profile.reviewer_shortcuts?.evaluation_packet === 'PUBLIC_EVALUATION_PACKET.json', 'project profile evaluation_packet shortcut must point to PUBLIC_EVALUATION_PACKET.json');
assert(profile.reviewer_shortcuts?.failure_model === 'PUBLIC_FAILURE_MODEL.json', 'project profile failure_model shortcut must point to PUBLIC_FAILURE_MODEL.json');
assert(profile.reviewer_shortcuts?.example_coverage === 'PUBLIC_EXAMPLE_COVERAGE.json', 'project profile example_coverage shortcut must point to PUBLIC_EXAMPLE_COVERAGE.json');
assert(profile.reviewer_shortcuts?.maintenance_model === 'PUBLIC_MAINTENANCE_MODEL.json', 'project profile maintenance_model shortcut must point to PUBLIC_MAINTENANCE_MODEL.json');
assert(profile.reviewer_shortcuts?.change_control === 'PUBLIC_CHANGE_CONTROL_MODEL.json', 'project profile change_control shortcut must point to PUBLIC_CHANGE_CONTROL_MODEL.json');
assert(profile.reviewer_shortcuts?.ownership_map === 'PUBLIC_OWNERSHIP_MAP.json', 'project profile ownership_map shortcut must point to PUBLIC_OWNERSHIP_MAP.json');
assert(profile.reviewer_shortcuts?.traceability_matrix === 'PUBLIC_TRACEABILITY_MATRIX.json', 'project profile traceability_matrix shortcut must point to PUBLIC_TRACEABILITY_MATRIX.json');
assert(profile.reviewer_shortcuts?.dependency_graph === 'PUBLIC_DEPENDENCY_GRAPH.json', 'project profile dependency_graph shortcut must point to PUBLIC_DEPENDENCY_GRAPH.json');
assert(profile.reviewer_shortcuts?.assurance_case === 'PUBLIC_ASSURANCE_CASE.json', 'project profile assurance_case shortcut must point to PUBLIC_ASSURANCE_CASE.json');
assert(profile.reviewer_shortcuts?.update_coherence === 'PUBLIC_UPDATE_COHERENCE_MAP.json', 'project profile update_coherence shortcut must point to PUBLIC_UPDATE_COHERENCE_MAP.json');
assert(profile.reviewer_shortcuts?.limitations_register === 'PUBLIC_LIMITATIONS_REGISTER.json', 'project profile limitations_register shortcut must point to PUBLIC_LIMITATIONS_REGISTER.json');
assert(profile.reviewer_shortcuts?.evidence_timeline === 'PUBLIC_EVIDENCE_TIMELINE.json', 'project profile evidence_timeline shortcut must point to PUBLIC_EVIDENCE_TIMELINE.json');
assert(profile.reviewer_shortcuts?.review_scorecard === 'PUBLIC_REVIEW_SCORECARD.json', 'project profile review_scorecard shortcut must point to PUBLIC_REVIEW_SCORECARD.json');
assert(profile.reviewer_shortcuts?.verification_matrix === 'PUBLIC_VERIFICATION_MATRIX.json', 'project profile verification_matrix shortcut must point to PUBLIC_VERIFICATION_MATRIX.json');
assert(profile.reviewer_shortcuts?.audience_paths === 'PUBLIC_AUDIENCE_PATHS.json', 'project profile audience_paths shortcut must point to PUBLIC_AUDIENCE_PATHS.json');
assert(profile.reviewer_shortcuts?.evidence_strength_map === 'PUBLIC_EVIDENCE_STRENGTH_MAP.json', 'project profile evidence_strength_map shortcut must point to PUBLIC_EVIDENCE_STRENGTH_MAP.json');
assert(profile.reviewer_shortcuts?.adoption_readiness === 'PUBLIC_ADOPTION_READINESS.json', 'project profile adoption_readiness shortcut must point to PUBLIC_ADOPTION_READINESS.json');
assert(profile.reviewer_shortcuts?.freshness_model === 'PUBLIC_FRESHNESS_MODEL.json', 'project profile freshness_model shortcut must point to PUBLIC_FRESHNESS_MODEL.json');
assert(profile.reviewer_shortcuts?.ecosystem_value_map === 'PUBLIC_ECOSYSTEM_VALUE_MAP.json', 'project profile ecosystem_value_map shortcut must point to PUBLIC_ECOSYSTEM_VALUE_MAP.json');
assert(profile.reviewer_shortcuts?.evidence_gaps === 'PUBLIC_EVIDENCE_GAPS_REGISTER.json', 'project profile evidence_gaps shortcut must point to PUBLIC_EVIDENCE_GAPS_REGISTER.json');
assert(profile.reviewer_shortcuts?.program_fit_map === 'PUBLIC_PROGRAM_FIT_MAP.json', 'project profile program_fit_map shortcut must point to PUBLIC_PROGRAM_FIT_MAP.json');
assert(profile.reviewer_shortcuts?.publication_readiness === 'PUBLIC_PUBLICATION_READINESS.json', 'project profile publication_readiness shortcut must point to PUBLIC_PUBLICATION_READINESS.json');
assert(profile.reviewer_shortcuts?.repository_identity === 'PUBLIC_REPOSITORY_IDENTITY.json', 'project profile repository_identity shortcut must point to PUBLIC_REPOSITORY_IDENTITY.json');
assert(profile.reviewer_shortcuts?.capability_matrix === 'PUBLIC_CAPABILITY_MATRIX.json', 'project profile capability_matrix shortcut must point to PUBLIC_CAPABILITY_MATRIX.json');
assert(profile.reviewer_shortcuts?.project_profile === 'PUBLIC_PROJECT_PROFILE.json', 'project profile project_profile shortcut must point to itself');
assert(profile.program_readiness?.active_maintenance_timeline_explicit === true, 'project profile must mark active_maintenance_timeline_explicit true');
assert(profile.program_readiness?.review_scorecard_explicit === true, 'project profile must mark review_scorecard_explicit true');
assert(profile.program_readiness?.verification_coverage_explicit === true, 'project profile must mark verification_coverage_explicit true');
assert(profile.program_readiness?.audience_paths_explicit === true, 'project profile must mark audience_paths_explicit true');
assert(profile.program_readiness?.evidence_strength_hierarchy_explicit === true, 'project profile must mark evidence_strength_hierarchy_explicit true');
assert(profile.program_readiness?.public_adoption_readiness_explicit === true, 'project profile must mark public_adoption_readiness_explicit true');
assert(profile.program_readiness?.freshness_posture_explicit === true, 'project profile must mark freshness_posture_explicit true');
assert(profile.program_readiness?.ecosystem_value_explicit === true, 'project profile must mark ecosystem_value_explicit true');
assert(profile.program_readiness?.evidence_gaps_explicit === true, 'project profile must mark evidence_gaps_explicit true');
assert(profile.program_readiness?.program_fit_explicit === true, 'project profile must mark program_fit_explicit true');
assert(profile.program_readiness?.publication_readiness_explicit === true, 'project profile must mark publication_readiness_explicit true');
assert(profile.program_readiness?.repository_identity_explicit === true, 'project profile must mark repository_identity_explicit true');
assert(profile.purpose?.publishes?.includes('machine-readable repository-identity summaries'), 'project profile publishes must include machine-readable repository-identity summaries');
assert(profile.purpose?.publishes?.includes('public-safe TypeScript and Zod projections'), 'project profile publishes must include public-safe TypeScript and Zod projections');
assert(profile.purpose?.publishes?.includes('machine-readable freshness summaries'), 'project profile publishes must include machine-readable freshness summaries');
assert(profile.purpose?.publishes?.includes('machine-readable ecosystem-value summaries'), 'project profile publishes must include machine-readable ecosystem-value summaries');
assert(profile.purpose?.publishes?.includes('machine-readable public-evidence-gap summaries'), 'project profile publishes must include machine-readable public-evidence-gap summaries');
assert(profile.purpose?.publishes?.includes('machine-readable public-program-fit summaries'), 'project profile publishes must include machine-readable public-program-fit summaries');
assert(profile.purpose?.publishes?.includes('machine-readable publication-readiness summaries'), 'project profile publishes must include machine-readable publication-readiness summaries');

const readme = readText('README.md');
const reviewerGuide = readText('docs/reviewer-guide.md');
assert(readme.includes('PUBLIC_PROJECT_PROFILE.json'), 'README.md must mention PUBLIC_PROJECT_PROFILE.json');
assert(readme.includes('PUBLIC_CAPABILITY_MATRIX.json'), 'README.md must mention PUBLIC_CAPABILITY_MATRIX.json');
assert(readme.includes('PUBLIC_BOUNDARY_MAP.json'), 'README.md must mention PUBLIC_BOUNDARY_MAP.json');
assert(readme.includes('PUBLIC_PORTABILITY_PROFILE.json'), 'README.md must mention PUBLIC_PORTABILITY_PROFILE.json');
assert(readme.includes('PUBLIC_EVALUATION_PACKET.json'), 'README.md must mention PUBLIC_EVALUATION_PACKET.json');
assert(readme.includes('PUBLIC_FAILURE_MODEL.json'), 'README.md must mention PUBLIC_FAILURE_MODEL.json');
assert(readme.includes('PUBLIC_EXAMPLE_COVERAGE.json'), 'README.md must mention PUBLIC_EXAMPLE_COVERAGE.json');
assert(readme.includes('PUBLIC_MAINTENANCE_MODEL.json'), 'README.md must mention PUBLIC_MAINTENANCE_MODEL.json');
assert(readme.includes('PUBLIC_CHANGE_CONTROL_MODEL.json'), 'README.md must mention PUBLIC_CHANGE_CONTROL_MODEL.json');
assert(readme.includes('PUBLIC_OWNERSHIP_MAP.json'), 'README.md must mention PUBLIC_OWNERSHIP_MAP.json');
assert(readme.includes('PUBLIC_TRACEABILITY_MATRIX.json'), 'README.md must mention PUBLIC_TRACEABILITY_MATRIX.json');
assert(readme.includes('PUBLIC_DEPENDENCY_GRAPH.json'), 'README.md must mention PUBLIC_DEPENDENCY_GRAPH.json');
assert(readme.includes('PUBLIC_ASSURANCE_CASE.json'), 'README.md must mention PUBLIC_ASSURANCE_CASE.json');
assert(readme.includes('PUBLIC_UPDATE_COHERENCE_MAP.json'), 'README.md must mention PUBLIC_UPDATE_COHERENCE_MAP.json');
assert(readme.includes('PUBLIC_LIMITATIONS_REGISTER.json'), 'README.md must mention PUBLIC_LIMITATIONS_REGISTER.json');
assert(readme.includes('PUBLIC_EVIDENCE_TIMELINE.json'), 'README.md must mention PUBLIC_EVIDENCE_TIMELINE.json');
assert(readme.includes('PUBLIC_REVIEW_SCORECARD.json'), 'README.md must mention PUBLIC_REVIEW_SCORECARD.json');
assert(readme.includes('PUBLIC_VERIFICATION_MATRIX.json'), 'README.md must mention PUBLIC_VERIFICATION_MATRIX.json');
assert(readme.includes('PUBLIC_AUDIENCE_PATHS.json'), 'README.md must mention PUBLIC_AUDIENCE_PATHS.json');
assert(readme.includes('PUBLIC_EVIDENCE_STRENGTH_MAP.json'), 'README.md must mention PUBLIC_EVIDENCE_STRENGTH_MAP.json');
assert(readme.includes('PUBLIC_ADOPTION_READINESS.json'), 'README.md must mention PUBLIC_ADOPTION_READINESS.json');
assert(readme.includes('PUBLIC_FRESHNESS_MODEL.json'), 'README.md must mention PUBLIC_FRESHNESS_MODEL.json');
assert(readme.includes('PUBLIC_ECOSYSTEM_VALUE_MAP.json'), 'README.md must mention PUBLIC_ECOSYSTEM_VALUE_MAP.json');
assert(readme.includes('PUBLIC_EVIDENCE_GAPS_REGISTER.json'), 'README.md must mention PUBLIC_EVIDENCE_GAPS_REGISTER.json');
assert(readme.includes('PUBLIC_PROGRAM_FIT_MAP.json'), 'README.md must mention PUBLIC_PROGRAM_FIT_MAP.json');
assert(readme.includes('PUBLIC_PUBLICATION_READINESS.json'), 'README.md must mention PUBLIC_PUBLICATION_READINESS.json');
assert(readme.includes('PUBLIC_REPOSITORY_IDENTITY.json'), 'README.md must mention PUBLIC_REPOSITORY_IDENTITY.json');
assert(readme.includes('docs/reviewer-guide.md'), 'README.md must mention docs/reviewer-guide.md');
assert(reviewerGuide.includes('PUBLIC_PROJECT_PROFILE.json'), 'reviewer guide must mention PUBLIC_PROJECT_PROFILE.json');
assert(reviewerGuide.includes('PUBLIC_BOUNDARY_MAP.json'), 'reviewer guide must mention PUBLIC_BOUNDARY_MAP.json');
assert(reviewerGuide.includes('PUBLIC_CAPABILITY_MATRIX.json'), 'reviewer guide must mention PUBLIC_CAPABILITY_MATRIX.json');
assert(reviewerGuide.includes('PUBLIC_PORTABILITY_PROFILE.json'), 'reviewer guide must mention PUBLIC_PORTABILITY_PROFILE.json');
assert(reviewerGuide.includes('PUBLIC_EVALUATION_PACKET.json'), 'reviewer guide must mention PUBLIC_EVALUATION_PACKET.json');
assert(reviewerGuide.includes('PUBLIC_FAILURE_MODEL.json'), 'reviewer guide must mention PUBLIC_FAILURE_MODEL.json');
assert(reviewerGuide.includes('PUBLIC_EXAMPLE_COVERAGE.json'), 'reviewer guide must mention PUBLIC_EXAMPLE_COVERAGE.json');
assert(reviewerGuide.includes('PUBLIC_MAINTENANCE_MODEL.json'), 'reviewer guide must mention PUBLIC_MAINTENANCE_MODEL.json');
assert(reviewerGuide.includes('PUBLIC_CHANGE_CONTROL_MODEL.json'), 'reviewer guide must mention PUBLIC_CHANGE_CONTROL_MODEL.json');
assert(reviewerGuide.includes('PUBLIC_OWNERSHIP_MAP.json'), 'reviewer guide must mention PUBLIC_OWNERSHIP_MAP.json');
assert(reviewerGuide.includes('PUBLIC_TRACEABILITY_MATRIX.json'), 'reviewer guide must mention PUBLIC_TRACEABILITY_MATRIX.json');
assert(reviewerGuide.includes('PUBLIC_DEPENDENCY_GRAPH.json'), 'reviewer guide must mention PUBLIC_DEPENDENCY_GRAPH.json');
assert(reviewerGuide.includes('PUBLIC_ASSURANCE_CASE.json'), 'reviewer guide must mention PUBLIC_ASSURANCE_CASE.json');
assert(reviewerGuide.includes('PUBLIC_UPDATE_COHERENCE_MAP.json'), 'reviewer guide must mention PUBLIC_UPDATE_COHERENCE_MAP.json');
assert(reviewerGuide.includes('PUBLIC_LIMITATIONS_REGISTER.json'), 'reviewer guide must mention PUBLIC_LIMITATIONS_REGISTER.json');
assert(reviewerGuide.includes('PUBLIC_EVIDENCE_TIMELINE.json'), 'reviewer guide must mention PUBLIC_EVIDENCE_TIMELINE.json');
assert(reviewerGuide.includes('PUBLIC_REVIEW_SCORECARD.json'), 'reviewer guide must mention PUBLIC_REVIEW_SCORECARD.json');
assert(reviewerGuide.includes('PUBLIC_VERIFICATION_MATRIX.json'), 'reviewer guide must mention PUBLIC_VERIFICATION_MATRIX.json');
assert(reviewerGuide.includes('PUBLIC_AUDIENCE_PATHS.json'), 'reviewer guide must mention PUBLIC_AUDIENCE_PATHS.json');
assert(reviewerGuide.includes('PUBLIC_EVIDENCE_STRENGTH_MAP.json'), 'reviewer guide must mention PUBLIC_EVIDENCE_STRENGTH_MAP.json');
assert(reviewerGuide.includes('PUBLIC_ADOPTION_READINESS.json'), 'reviewer guide must mention PUBLIC_ADOPTION_READINESS.json');
assert(reviewerGuide.includes('PUBLIC_FRESHNESS_MODEL.json'), 'reviewer guide must mention PUBLIC_FRESHNESS_MODEL.json');
assert(reviewerGuide.includes('PUBLIC_ECOSYSTEM_VALUE_MAP.json'), 'reviewer guide must mention PUBLIC_ECOSYSTEM_VALUE_MAP.json');
assert(reviewerGuide.includes('PUBLIC_EVIDENCE_GAPS_REGISTER.json'), 'reviewer guide must mention PUBLIC_EVIDENCE_GAPS_REGISTER.json');
assert(reviewerGuide.includes('PUBLIC_PROGRAM_FIT_MAP.json'), 'reviewer guide must mention PUBLIC_PROGRAM_FIT_MAP.json');
assert(reviewerGuide.includes('PUBLIC_PUBLICATION_READINESS.json'), 'reviewer guide must mention PUBLIC_PUBLICATION_READINESS.json');
assert(reviewerGuide.includes('PUBLIC_REPOSITORY_IDENTITY.json'), 'reviewer guide must mention PUBLIC_REPOSITORY_IDENTITY.json');
assert(reviewerGuide.includes('PUBLIC_CONTRACT_CATALOG.json'), 'reviewer guide must mention PUBLIC_CONTRACT_CATALOG.json');
assert(reviewerGuide.includes('PUBLIC_RELEASE_METADATA.json'), 'reviewer guide must mention PUBLIC_RELEASE_METADATA.json');

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(`OK: checked public project profile against ${files.length} files, ${repoLocalCheckCount} repo-local checks, and ${upstreamValidatorCheckCount} upstream validator checks`);

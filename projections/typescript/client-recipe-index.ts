export const publishedClientRecipeGroupIds = [
  "shell-live-validator",
  "node-live-validator",
  "source-level-types",
  "raw-schema-ajv",
  "integrity-recipes",
  "python-consumers",
  "package-runtime",
  "package-typescript"
] as const;

export const publishedClientRecipeTaskIds = [
  "live-validate-single",
  "live-validate-batch",
  "live-validate-fix",
  "live-support-routes",
  "node-live-clients",
  "source-recipe-navigation",
  "source-request-reading",
  "source-response-reading",
  "raw-schema-validation",
  "integrity-proof",
  "package-recipe-navigation",
  "package-request-reading",
  "package-response-reading",
  "openapi-direct-consumption",
  "openapi-code-generation",
  "python-recipe-navigation",
  "python-live-clients",
  "python-response-reading"
] as const;

export const publishedClientRecipeRuntimes = [
  "shell",
  "node",
  "typescript",
  "zod",
  "ajv",
  "python",
  "cjs",
  "esm"
] as const;

export const publishedClientRecipeIndexDirectory = "examples/client" as const;

export const publishedClientRecipeIndexPurpose =
  "Machine-readable navigator for public client recipes grouped by task, runtime, and consumption path." as const;

export const publishedClientRecipeIndexCounts = {
  groups: publishedClientRecipeGroupIds.length,
  taskEntrypoints: publishedClientRecipeTaskIds.length,
  runtimes: publishedClientRecipeRuntimes.length
} as const;

export type PublishedClientRecipeGroupId = (typeof publishedClientRecipeGroupIds)[number];
export type PublishedClientRecipeTaskId = (typeof publishedClientRecipeTaskIds)[number];
export type PublishedClientRecipeRuntime = (typeof publishedClientRecipeRuntimes)[number];

export interface PublishedClientRecipeGroupDefinition {
  id: PublishedClientRecipeGroupId;
  title: string;
  description: string;
  audiences: string[];
  primary_docs: string[];
  recommended_start: string;
  files: string[];
}

export interface PublishedClientRecipeTaskEntrypoint {
  id: PublishedClientRecipeTaskId;
  intent: string;
  primary_group: PublishedClientRecipeGroupId;
  recommended: string;
  alternatives: string[];
  docs: string[];
  runtimes: PublishedClientRecipeRuntime[];
}

export interface PublishedClientRecipeIndex {
  version: string;
  directory: typeof publishedClientRecipeIndexDirectory;
  purpose: typeof publishedClientRecipeIndexPurpose;
  groups: PublishedClientRecipeGroupDefinition[];
  task_entrypoints: PublishedClientRecipeTaskEntrypoint[];
}

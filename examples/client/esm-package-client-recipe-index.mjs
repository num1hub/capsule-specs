import recipeIndex from "@num1hub/capsule-specs/examples/client/recipe-index.json" with { type: "json" };

const runtimeStarts = Object.fromEntries(recipeIndex.groups.map((group) => [group.id, group.recommended_start]));
const packageNavigationTask = recipeIndex.task_entrypoints.find((entry) => entry.id === "package-recipe-navigation");
const openapiTask = recipeIndex.task_entrypoints.find((entry) => entry.id === "openapi-direct-consumption");
const sourceNavigationTask = recipeIndex.task_entrypoints.find((entry) => entry.id === "source-recipe-navigation");

if (recipeIndex.directory !== "examples/client") {
  throw new Error("unexpected recipe-index directory");
}

if (!packageNavigationTask || !packageNavigationTask.alternatives.includes("ts-package-client-recipe-index.ts")) {
  throw new Error("missing package recipe-navigation alternatives");
}

if (!openapiTask || !openapiTask.docs.includes("docs/openapi.md")) {
  throw new Error("missing OpenAPI task docs");
}

if (runtimeStarts["package-typescript"] !== "ts-package-live-validator-client.ts") {
  throw new Error("unexpected package-typescript recommended start");
}

if (!sourceNavigationTask || sourceNavigationTask.recommended !== "ts-client-recipe-index.ts") {
  throw new Error("missing source recipe-navigation task");
}

console.log({
  version: recipeIndex.version,
  packageRuntimeStart: runtimeStarts["package-runtime"],
  packageTypescriptStart: runtimeStarts["package-typescript"],
  packageNavigationRuntimes: packageNavigationTask.runtimes,
  openapiTaskDocs: openapiTask.docs.length,
  sourceNavigationRecommended: sourceNavigationTask.recommended
});

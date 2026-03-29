const recipeIndex = require("@num1hub/capsule-specs/examples/client/recipe-index.json");

const runtimeStarts = Object.fromEntries(recipeIndex.groups.map((group) => [group.id, group.recommended_start]));
const liveValidateSingleTask = recipeIndex.task_entrypoints.find((entry) => entry.id === "live-validate-single");
const packageNavigationTask = recipeIndex.task_entrypoints.find((entry) => entry.id === "package-recipe-navigation");

if (recipeIndex.directory !== "examples/client") {
  throw new Error("unexpected recipe-index directory");
}

if (!liveValidateSingleTask || liveValidateSingleTask.recommended !== "curl-validate-single.sh") {
  throw new Error("missing live validate-single task");
}

if (!packageNavigationTask || packageNavigationTask.recommended !== "cjs-package-client-recipe-index.cjs") {
  throw new Error("missing package recipe-navigation task");
}

if (runtimeStarts["package-runtime"] !== "cjs-package-live-validator-client.cjs") {
  throw new Error("unexpected package-runtime recommended start");
}

if (runtimeStarts["source-level-types"] !== "ts-parse-validate-requests.ts") {
  throw new Error("unexpected source-level recommended start");
}

console.log({
  version: recipeIndex.version,
  groupCount: recipeIndex.groups.length,
  taskCount: recipeIndex.task_entrypoints.length,
  packageRuntimeStart: runtimeStarts["package-runtime"],
  sourceLevelStart: runtimeStarts["source-level-types"],
  liveValidateSingleAlternatives: liveValidateSingleTask.alternatives.length,
  packageNavigationRuntimes: packageNavigationTask.runtimes
});

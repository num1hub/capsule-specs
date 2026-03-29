import recipeIndex from "@num1hub/capsule-specs/examples/client/recipe-index.json" with { type: "json" };
import {
  publishedClientRecipeGroupIds,
  publishedClientRecipeIndexCounts,
  publishedClientRecipeIndexDirectory,
  type PublishedClientRecipeIndex
} from "@num1hub/capsule-specs/typescript/client-recipe-index";

const typedRecipeIndex = recipeIndex as PublishedClientRecipeIndex;
const groups = typedRecipeIndex.groups;
const tasks = typedRecipeIndex.task_entrypoints;
const runtimeStarts = Object.fromEntries(groups.map((group) => [group.id, group.recommended_start]));
const packageNavigationTask = tasks.find((entry) => entry.id === "package-recipe-navigation");
const responseReadingTask = tasks.find((entry) => entry.id === "source-response-reading");
const sourceNavigationTask = tasks.find((entry) => entry.id === "source-recipe-navigation");

if (typedRecipeIndex.directory !== publishedClientRecipeIndexDirectory) {
  throw new Error("unexpected recipe-index directory");
}

if (!packageNavigationTask || packageNavigationTask.primary_group !== "package-runtime") {
  throw new Error("unexpected package recipe-navigation task");
}

if (!responseReadingTask || !responseReadingTask.runtimes.includes("zod")) {
  throw new Error("unexpected source response task runtimes");
}

if (runtimeStarts["package-runtime"] !== "cjs-package-live-validator-client.cjs") {
  throw new Error("unexpected package-runtime recommended start");
}

if (runtimeStarts["integrity-recipes"] !== "recompute-integrity-seal.mjs") {
  throw new Error("unexpected integrity recommended start");
}

if (runtimeStarts["source-level-types"] !== "ts-client-recipe-index.ts") {
  throw new Error("unexpected source-level recommended start");
}

if (typedRecipeIndex.groups.length !== publishedClientRecipeIndexCounts.groups) {
  throw new Error("unexpected group count");
}

if (typedRecipeIndex.task_entrypoints.length !== publishedClientRecipeIndexCounts.taskEntrypoints) {
  throw new Error("unexpected task count");
}

if (!publishedClientRecipeGroupIds.includes("python-consumers")) {
  throw new Error("typed client-recipe projection lost python-consumers");
}

if (!sourceNavigationTask || sourceNavigationTask.recommended !== "ts-client-recipe-index.ts") {
  throw new Error("typed client-recipe projection lost source navigator task");
}

export const packageNavigatorSummary = {
  version: typedRecipeIndex.version,
  groupCount: groups.length,
  taskCount: tasks.length,
  packageRuntimeStart: runtimeStarts["package-runtime"],
  sourceLevelStart: runtimeStarts["source-level-types"],
  integrityStart: runtimeStarts["integrity-recipes"],
  packageNavigationAlternatives: packageNavigationTask.alternatives.length,
  responseReadingRuntimes: responseReadingTask.runtimes
};

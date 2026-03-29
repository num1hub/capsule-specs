import recipeIndex from "@num1hub/capsule-specs/examples/client/recipe-index.json" with { type: "json" };

type RecipeGroup = {
  id: string;
  recommended_start: string;
  files: string[];
};

type RecipeTask = {
  id: string;
  primary_group: string;
  recommended: string;
  alternatives: string[];
  docs: string[];
  runtimes: string[];
};

const groups = recipeIndex.groups as RecipeGroup[];
const tasks = recipeIndex.task_entrypoints as RecipeTask[];
const runtimeStarts = Object.fromEntries(groups.map((group) => [group.id, group.recommended_start]));
const packageNavigationTask = tasks.find((entry) => entry.id === "package-recipe-navigation");
const responseReadingTask = tasks.find((entry) => entry.id === "source-response-reading");

if (recipeIndex.directory !== "examples/client") {
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

export const packageNavigatorSummary = {
  version: recipeIndex.version,
  groupCount: groups.length,
  taskCount: tasks.length,
  packageRuntimeStart: runtimeStarts["package-runtime"],
  integrityStart: runtimeStarts["integrity-recipes"],
  packageNavigationAlternatives: packageNavigationTask.alternatives.length,
  responseReadingRuntimes: responseReadingTask.runtimes
};

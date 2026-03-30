import recipeIndex from "./recipe-index.json" with { type: "json" };
import { publishedClientRecipeIndexSchema } from "../../projections/zod/client-recipe-index.js";

const parsedRecipeIndex = publishedClientRecipeIndexSchema.parse(recipeIndex);
const sourceNavigationTask = parsedRecipeIndex.task_entrypoints.find((entry) => entry.id === "source-recipe-navigation");

if (parsedRecipeIndex.directory !== "examples/client") {
  throw new Error("zod source recipe-index directory drifted");
}

if (!sourceNavigationTask || !sourceNavigationTask.runtimes.includes("zod")) {
  throw new Error("zod source recipe-index task runtimes drifted");
}

export const zodRecipeNavigatorSummary = {
  version: parsedRecipeIndex.version,
  groupCount: parsedRecipeIndex.groups.length,
  taskCount: parsedRecipeIndex.task_entrypoints.length,
  sourceNavigationRecommended: sourceNavigationTask.recommended,
  sourceNavigationAlternatives: sourceNavigationTask.alternatives
};

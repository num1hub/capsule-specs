import recipeIndex from "./recipe-index.json" with { type: "json" };
import {
  publishedClientRecipeGroupIds,
  publishedClientRecipeIndexCounts,
  publishedClientRecipeIndexDirectory,
  publishedClientRecipeTaskIds,
  type PublishedClientRecipeIndex
} from "../../projections/typescript/client-recipe-index.js";

const typedRecipeIndex = recipeIndex as PublishedClientRecipeIndex;
const groupIds = typedRecipeIndex.groups.map((group) => group.id);
const taskIds = typedRecipeIndex.task_entrypoints.map((entry) => entry.id);
const sourceNavigationTask = typedRecipeIndex.task_entrypoints.find((entry) => entry.id === "source-recipe-navigation");
const liveValidateTask = typedRecipeIndex.task_entrypoints.find((entry) => entry.id === "live-validate-single");

if (typedRecipeIndex.directory !== publishedClientRecipeIndexDirectory) {
  throw new Error("typed source recipe-index directory drifted");
}

if (typedRecipeIndex.groups.length !== publishedClientRecipeIndexCounts.groups) {
  throw new Error("typed source recipe-index group count drifted");
}

if (typedRecipeIndex.task_entrypoints.length !== publishedClientRecipeIndexCounts.taskEntrypoints) {
  throw new Error("typed source recipe-index task count drifted");
}

for (const groupId of publishedClientRecipeGroupIds) {
  if (!groupIds.includes(groupId)) {
    throw new Error(`typed source recipe-index is missing group ${groupId}`);
  }
}

for (const taskId of publishedClientRecipeTaskIds) {
  if (!taskIds.includes(taskId)) {
    throw new Error(`typed source recipe-index is missing task ${taskId}`);
  }
}

if (!sourceNavigationTask || sourceNavigationTask.recommended !== "ts-client-recipe-index.ts") {
  throw new Error("typed source recipe-navigation task drifted");
}

if (!liveValidateTask || !liveValidateTask.alternatives.includes("ts-live-validator-client.ts")) {
  throw new Error("typed live validate task drifted");
}

export const typedRecipeNavigatorSummary = {
  version: typedRecipeIndex.version,
  groupCount: typedRecipeIndex.groups.length,
  taskCount: typedRecipeIndex.task_entrypoints.length,
  sourceNavigationDocs: sourceNavigationTask.docs,
  firstGroup: typedRecipeIndex.groups[0]?.id,
  lastTask: typedRecipeIndex.task_entrypoints.at(-1)?.id
};

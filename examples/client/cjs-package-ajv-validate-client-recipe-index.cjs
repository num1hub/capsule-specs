const Ajv2020 = require("ajv/dist/2020").default;

const clientRecipeIndexSchema = require("@num1hub/capsule-specs/schemas/client-recipe-index.schema.json");
const recipeIndex = require("@num1hub/capsule-specs/examples/client/recipe-index.json");

const ajv = new Ajv2020({ allErrors: true, strict: true });
const validateRecipeIndex = ajv.compile(clientRecipeIndexSchema);

if (!validateRecipeIndex(recipeIndex)) {
  throw new Error(JSON.stringify(validateRecipeIndex.errors));
}

console.log({
  version: recipeIndex.version,
  groupCount: recipeIndex.groups.length,
  taskCount: recipeIndex.task_entrypoints.length
});

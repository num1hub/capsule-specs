import clientRecipeIndexSchema from "@num1hub/capsule-specs/schemas/client-recipe-index.schema.json" with { type: "json" };
import recipeIndex from "@num1hub/capsule-specs/examples/client/recipe-index.json" with { type: "json" };

type Ajv2020Constructor = new (options: { allErrors: boolean; strict: boolean }) => {
  compile(schema: unknown): {
    (payload: unknown): boolean;
    errors?: unknown[];
  };
};

const Ajv2020 = (await import("ajv/dist/2020.js")).default as unknown as Ajv2020Constructor;
const ajv = new Ajv2020({ allErrors: true, strict: true });
const validateRecipeIndex = ajv.compile(clientRecipeIndexSchema);

if (!validateRecipeIndex(recipeIndex)) {
  throw new Error(JSON.stringify(validateRecipeIndex.errors));
}

export const packageClientRecipeIndexSchemaSummary = {
  version: recipeIndex.version,
  groupCount: recipeIndex.groups.length,
  taskCount: recipeIndex.task_entrypoints.length
};

console.log(packageClientRecipeIndexSchemaSummary);

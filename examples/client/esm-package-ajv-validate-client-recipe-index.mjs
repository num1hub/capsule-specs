import Ajv2020 from "ajv/dist/2020.js";

import clientRecipeIndexSchema from "@num1hub/capsule-specs/schemas/client-recipe-index.schema.json" with { type: "json" };
import recipeIndex from "@num1hub/capsule-specs/examples/client/recipe-index.json" with { type: "json" };

const ajv = new Ajv2020({ allErrors: true, strict: true });
const validateRecipeIndex = ajv.compile(clientRecipeIndexSchema);

if (!validateRecipeIndex(recipeIndex)) {
  console.error(validateRecipeIndex.errors);
  process.exit(1);
}

console.log("AJV OK: installed package schema exports validate the published client-recipe navigator");

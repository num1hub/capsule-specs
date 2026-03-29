import Ajv2020 from "ajv/dist/2020.js";

import clientRecipeIndexSchema from "../../schemas/client-recipe-index.schema.json" with { type: "json" };
import recipeIndex from "./recipe-index.json" with { type: "json" };

const ajv = new Ajv2020({ allErrors: true, strict: true });
const validateRecipeIndex = ajv.compile(clientRecipeIndexSchema);

if (!validateRecipeIndex(recipeIndex)) {
  console.error(validateRecipeIndex.errors);
  process.exit(1);
}

console.log(`AJV OK: client recipe index for ${recipeIndex.directory} matches the published navigator schema`);

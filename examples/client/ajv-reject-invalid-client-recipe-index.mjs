import Ajv2020 from "ajv/dist/2020.js";

import clientRecipeIndexSchema from "../../schemas/client-recipe-index.schema.json" with { type: "json" };
import missingFiles from "../client-invalid/client-recipe-index.missing-files.json" with { type: "json" };
import invalidRuntime from "../client-invalid/client-recipe-index.invalid-runtime.json" with { type: "json" };

const ajv = new Ajv2020({ allErrors: true, strict: true });
const validateClientRecipeIndex = ajv.compile(clientRecipeIndexSchema);

const invalidFixtures = [
  {
    label: "missing-files",
    payload: missingFiles,
    predicate: (error) =>
      error.keyword === "required" &&
      error.instancePath === "/groups/0" &&
      error.params?.missingProperty === "files"
  },
  {
    label: "invalid-runtime",
    payload: invalidRuntime,
    predicate: (error) =>
      error.keyword === "enum" && error.instancePath === "/task_entrypoints/0/runtimes/0"
  }
];

for (const fixture of invalidFixtures) {
  const valid = validateClientRecipeIndex(fixture.payload);
  const errors = validateClientRecipeIndex.errors ?? [];
  if (valid) {
    throw new Error(`expected ${fixture.label} fixture to fail navigator schema validation`);
  }
  if (!errors.some(fixture.predicate)) {
    throw new Error(`expected ${fixture.label} fixture to fail with the documented schema error`);
  }
}

console.log("AJV OK: invalid client-recipe navigator fixtures are rejected by the published navigator schema");

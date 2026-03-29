import clientRecipeIndexSchema from "@num1hub/capsule-specs/schemas/client-recipe-index.schema.json" with { type: "json" };
import missingFiles from "@num1hub/capsule-specs/examples/client-invalid/client-recipe-index.missing-files.json" with { type: "json" };
import invalidRuntime from "@num1hub/capsule-specs/examples/client-invalid/client-recipe-index.invalid-runtime.json" with { type: "json" };

type Ajv2020Constructor = new (options: { allErrors: boolean; strict: boolean }) => {
  compile(schema: unknown): {
    (payload: unknown): boolean;
    errors?: unknown[];
  };
};

const Ajv2020 = (await import("ajv/dist/2020.js")).default as unknown as Ajv2020Constructor;
const ajv = new Ajv2020({ allErrors: true, strict: true });
const validateClientRecipeIndex = ajv.compile(clientRecipeIndexSchema);

const invalidFixtures = [
  {
    label: "missing-files",
    payload: missingFiles,
    predicate: (error: unknown) => {
      const issue = error as {
        keyword?: string;
        instancePath?: string;
        params?: { missingProperty?: string };
      };
      return (
        issue.keyword === "required" &&
        issue.instancePath === "/groups/0" &&
        issue.params?.missingProperty === "files"
      );
    }
  },
  {
    label: "invalid-runtime",
    payload: invalidRuntime,
    predicate: (error: unknown) => {
      const issue = error as { keyword?: string; instancePath?: string };
      return issue.keyword === "enum" && issue.instancePath === "/task_entrypoints/0/runtimes/0";
    }
  }
];

for (const fixture of invalidFixtures) {
  const valid = validateClientRecipeIndex(fixture.payload);
  const errors = validateClientRecipeIndex.errors ?? [];
  if (valid) {
    throw new Error(`expected ${fixture.label} fixture to fail navigator schema validation`);
  }
  if (!errors.some((error: unknown) => fixture.predicate(error))) {
    throw new Error(`expected ${fixture.label} fixture to fail with the documented schema error`);
  }
}

export const invalidClientRecipeIndexSummary = {
  rejectedFixtures: invalidFixtures.map((fixture) => fixture.label)
};

console.log(invalidClientRecipeIndexSummary);

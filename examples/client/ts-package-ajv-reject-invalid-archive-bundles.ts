import archiveBundleSchema from "@num1hub/capsule-specs/schemas/archive-bundle.schema.json" with { type: "json" };
import invalidCreatedAtBundle from "@num1hub/capsule-specs/examples/archive-invalid/archive-bundle.invalid-created-at.json" with { type: "json" };
import invalidContentClassBundle from "@num1hub/capsule-specs/examples/archive-invalid/archive-bundle.invalid-content-class.json" with { type: "json" };

type AjvValidator = {
  (payload: unknown): boolean;
  errors?: unknown[];
};

type Ajv2020Instance = {
  compile(schema: unknown): AjvValidator;
};

type Ajv2020Constructor = new (options: { allErrors: boolean; strict: boolean }) => Ajv2020Instance;

const Ajv2020 = (await import("ajv/dist/2020.js")).default as unknown as Ajv2020Constructor;
const addFormats = (await import("ajv-formats")).default as unknown as (ajv: Ajv2020Instance) => void;

const ajv = new Ajv2020({ allErrors: true, strict: true });
addFormats(ajv);
const validateArchiveBundle = ajv.compile(archiveBundleSchema);

const invalidFixtures = [
  {
    label: "invalid-created-at",
    payload: invalidCreatedAtBundle,
    predicate: (error: unknown) => {
      const issue = error as { keyword?: string; instancePath?: string };
      return issue.keyword === "format" && issue.instancePath === "/createdAt";
    }
  },
  {
    label: "invalid-content-class",
    payload: invalidContentClassBundle,
    predicate: (error: unknown) => {
      const issue = error as { keyword?: string; instancePath?: string };
      return issue.keyword === "enum" && issue.instancePath === "/manifest/0/contentClass";
    }
  }
];

for (const fixture of invalidFixtures) {
  const valid = validateArchiveBundle(fixture.payload);
  const errors = validateArchiveBundle.errors ?? [];
  if (valid) {
    throw new Error(`expected ${fixture.label} archive bundle to fail schema validation`);
  }
  if (!errors.some((error: unknown) => fixture.predicate(error))) {
    throw new Error(`expected ${fixture.label} archive bundle to fail with the documented schema error`);
  }
}

export const invalidArchiveBundleSummary = {
  rejectedFixtures: invalidFixtures.map((fixture) => fixture.label)
};

console.log(invalidArchiveBundleSummary);

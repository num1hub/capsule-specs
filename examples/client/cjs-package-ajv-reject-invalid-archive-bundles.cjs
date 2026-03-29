const Ajv2020 = require("ajv/dist/2020").default;
const addFormats = require("ajv-formats");

const archiveBundleSchema = require("@num1hub/capsule-specs/schemas/archive-bundle.schema.json");
const invalidCreatedAtBundle = require("@num1hub/capsule-specs/examples/archive-invalid/archive-bundle.invalid-created-at.json");
const invalidContentClassBundle = require("@num1hub/capsule-specs/examples/archive-invalid/archive-bundle.invalid-content-class.json");

const ajv = new Ajv2020({ allErrors: true, strict: true });
addFormats(ajv);

const validateArchiveBundle = ajv.compile(archiveBundleSchema);

const invalidFixtures = [
  {
    label: "invalid-created-at",
    payload: invalidCreatedAtBundle,
    predicate: (error) => error.keyword === "format" && error.instancePath === "/createdAt"
  },
  {
    label: "invalid-content-class",
    payload: invalidContentClassBundle,
    predicate: (error) => error.keyword === "enum" && error.instancePath === "/manifest/0/contentClass"
  }
];

for (const fixture of invalidFixtures) {
  const valid = validateArchiveBundle(fixture.payload);
  const errors = validateArchiveBundle.errors ?? [];
  if (valid) {
    throw new Error(`expected ${fixture.label} archive bundle to fail schema validation`);
  }
  if (!errors.some(fixture.predicate)) {
    throw new Error(`expected ${fixture.label} archive bundle to fail with the documented schema error`);
  }
}

console.log({
  rejectedFixtures: invalidFixtures.map((fixture) => fixture.label)
});

const Ajv2020 = require("ajv/dist/2020").default;

const capsuleSchema = require("@num1hub/capsule-specs/schemas/capsule-schema.json");
const neuroSchema = require("@num1hub/capsule-specs/schemas/neuro-concentrate.schema.json");
const missingNeuro = require("@num1hub/capsule-specs/examples/invalid/example-invalid-missing-neuro-concentrate.capsule.json");
const invalidRelationType = require("@num1hub/capsule-specs/examples/invalid/example-invalid-relation-type.capsule.json");

const ajv = new Ajv2020({ allErrors: true, strict: true });

ajv.addSchema(neuroSchema);
ajv.addSchema(capsuleSchema);

const validateCapsule = ajv.getSchema(capsuleSchema.$id) ?? ajv.compile(capsuleSchema);

const invalidFixtures = [
  {
    label: "missing-neuro-concentrate",
    capsule: missingNeuro,
    predicate: (error) => error.keyword === "required" && error.params?.missingProperty === "neuro_concentrate"
  },
  {
    label: "invalid-relation-type",
    capsule: invalidRelationType,
    predicate: (error) =>
      error.keyword === "enum" && error.instancePath === "/recursive_layer/links/0/relation_type"
  }
];

for (const fixture of invalidFixtures) {
  const valid = validateCapsule(fixture.capsule);
  const errors = validateCapsule.errors ?? [];
  if (valid) {
    throw new Error(`expected ${fixture.label} fixture to fail schema validation`);
  }
  if (!errors.some(fixture.predicate)) {
    throw new Error(`expected ${fixture.label} fixture to fail with the documented schema error`);
  }
}

console.log({
  rejectedFixtures: invalidFixtures.map((fixture) => fixture.label)
});

import Ajv2020 from "ajv/dist/2020.js";

import capsuleSchema from "../../schemas/capsule-schema.json" with { type: "json" };
import neuroSchema from "../../schemas/neuro-concentrate.schema.json" with { type: "json" };
import missingNeuro from "../invalid/example-invalid-missing-neuro-concentrate.capsule.json" with { type: "json" };
import invalidRelationType from "../invalid/example-invalid-relation-type.capsule.json" with { type: "json" };

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

console.log("AJV OK: invalid capsule fixtures are rejected by the published capsule schema");

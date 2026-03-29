import capsuleSchema from "@num1hub/capsule-specs/schemas/capsule-schema.json" with { type: "json" };
import neuroSchema from "@num1hub/capsule-specs/schemas/neuro-concentrate.schema.json" with { type: "json" };
import validatorSchema from "@num1hub/capsule-specs/schemas/validator-api-envelopes.schema.json" with { type: "json" };
import invalidSingleRequest from "@num1hub/capsule-specs/examples/api-invalid/validate-request.single.missing-capsule.json" with { type: "json" };
import invalidFailResponse from "@num1hub/capsule-specs/examples/api-invalid/validate-response.fail.invalid-gate.json" with { type: "json" };

type AjvValidator = {
  (payload: unknown): boolean;
  errors?: unknown[];
};

type Ajv2020Instance = {
  addSchema(schema: unknown): void;
  getSchema(id: string): AjvValidator | undefined;
};

type Ajv2020Constructor = new (options: { allErrors: boolean; strict: boolean }) => Ajv2020Instance;

const Ajv2020 = (await import("ajv/dist/2020.js")).default as unknown as Ajv2020Constructor;
const ajv = new Ajv2020({ allErrors: true, strict: true });
ajv.addSchema(neuroSchema);
ajv.addSchema(capsuleSchema);
ajv.addSchema(validatorSchema);

const validateSingleRequest = ajv.getSchema(`${validatorSchema.$id}#/$defs/validateSingleRequest`);
const validateFailResponse = ajv.getSchema(`${validatorSchema.$id}#/$defs/validateFailResponse`);

if (!validateSingleRequest || !validateFailResponse) {
  throw new Error("validator envelope subschemas are not available");
}

const invalidFixtures = [
  {
    label: "missing-capsule",
    payload: invalidSingleRequest,
    validate: validateSingleRequest,
    predicate: (error: unknown) => {
      const issue = error as { keyword?: string; params?: { missingProperty?: string } };
      return issue.keyword === "required" && issue.params?.missingProperty === "capsule";
    }
  },
  {
    label: "invalid-gate",
    payload: invalidFailResponse,
    validate: validateFailResponse,
    predicate: (error: unknown) => {
      const issue = error as { keyword?: string; instancePath?: string };
      return issue.keyword === "pattern" && issue.instancePath === "/errors/0/gate";
    }
  }
];

for (const fixture of invalidFixtures) {
  const valid = fixture.validate(fixture.payload);
  const errors = fixture.validate.errors ?? [];
  if (valid) {
    throw new Error(`expected ${fixture.label} validator envelope fixture to fail schema validation`);
  }
  if (!errors.some((error: unknown) => fixture.predicate(error))) {
    throw new Error(`expected ${fixture.label} validator envelope fixture to fail with the documented schema error`);
  }
}

export const invalidValidatorEnvelopeSummary = {
  rejectedFixtures: invalidFixtures.map((fixture) => fixture.label)
};

console.log(invalidValidatorEnvelopeSummary);

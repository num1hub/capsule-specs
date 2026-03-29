import capsuleSchema from "@num1hub/capsule-specs/schemas/capsule-schema.json" with { type: "json" };
import neuroSchema from "@num1hub/capsule-specs/schemas/neuro-concentrate.schema.json" with { type: "json" };
import validatorSchema from "@num1hub/capsule-specs/schemas/validator-api-envelopes.schema.json" with { type: "json" };
import note from "@num1hub/capsule-specs/examples/example-note.capsule.json" with { type: "json" };
import validateSingleRequest from "@num1hub/capsule-specs/examples/api/validate-request.single.json" with { type: "json" };
import validatePassResponse from "@num1hub/capsule-specs/examples/api/validate-response.pass.json" with { type: "json" };

type AjvValidator = {
  (payload: unknown): boolean;
  errors?: unknown[];
};

type Ajv2020Instance = {
  addSchema(schema: unknown): void;
  compile(schema: unknown): AjvValidator;
  getSchema(id: string): AjvValidator | undefined;
};

type Ajv2020Constructor = new (options: { allErrors: boolean; strict: boolean }) => Ajv2020Instance;

const Ajv2020 = (await import("ajv/dist/2020.js")).default as unknown as Ajv2020Constructor;
const ajv = new Ajv2020({ allErrors: true, strict: true });

ajv.addSchema(neuroSchema);
ajv.addSchema(capsuleSchema);
ajv.addSchema(validatorSchema);

const validateCapsule = ajv.getSchema(capsuleSchema.$id) ?? ajv.compile(capsuleSchema);
const validateRequest = ajv.compile({ $ref: `${validatorSchema.$id}#/$defs/validateSingleRequest` });
const validatePass = ajv.compile({ $ref: `${validatorSchema.$id}#/$defs/validatePassResponse` });

if (!validateCapsule(note)) {
  throw new Error(JSON.stringify(validateCapsule.errors));
}

if (!validateRequest(validateSingleRequest)) {
  throw new Error(JSON.stringify(validateRequest.errors));
}

if (!validatePass(validatePassResponse)) {
  throw new Error(JSON.stringify(validatePass.errors));
}

export const packageContractSchemaSummary = {
  validatedCapsuleId: note.metadata.capsule_id,
  validatedRequestKind: "single",
  validatedPassHashLength: validatePassResponse.computedHash.length
};

console.log(packageContractSchemaSummary);

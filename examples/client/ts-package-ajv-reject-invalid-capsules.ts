import capsuleSchema from "@num1hub/capsule-specs/schemas/capsule-schema.json" with { type: "json" };
import neuroSchema from "@num1hub/capsule-specs/schemas/neuro-concentrate.schema.json" with { type: "json" };
import missingNeuro from "@num1hub/capsule-specs/examples/invalid/example-invalid-missing-neuro-concentrate.capsule.json" with { type: "json" };
import invalidRelationType from "@num1hub/capsule-specs/examples/invalid/example-invalid-relation-type.capsule.json" with { type: "json" };

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

const validateCapsule = ajv.getSchema(capsuleSchema.$id) ?? ajv.compile(capsuleSchema);

const invalidFixtures = [
  {
    label: "missing-neuro-concentrate",
    payload: missingNeuro,
    predicate: (error: unknown) => {
      const issue = error as { keyword?: string; params?: { missingProperty?: string } };
      return issue.keyword === "required" && issue.params?.missingProperty === "neuro_concentrate";
    }
  },
  {
    label: "invalid-relation-type",
    payload: invalidRelationType,
    predicate: (error: unknown) => {
      const issue = error as { keyword?: string; instancePath?: string };
      return issue.keyword === "enum" && issue.instancePath === "/recursive_layer/links/0/relation_type";
    }
  }
];

for (const fixture of invalidFixtures) {
  const valid = validateCapsule(fixture.payload);
  const errors = validateCapsule.errors ?? [];
  if (valid) {
    throw new Error(`expected ${fixture.label} fixture to fail schema validation`);
  }
  if (!errors.some((error: unknown) => fixture.predicate(error))) {
    throw new Error(`expected ${fixture.label} fixture to fail with the documented schema error`);
  }
}

export const invalidPackageCapsuleSummary = {
  rejectedFixtures: invalidFixtures.map((fixture) => fixture.label)
};

console.log(invalidPackageCapsuleSummary);

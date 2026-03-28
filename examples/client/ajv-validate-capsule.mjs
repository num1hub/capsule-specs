import Ajv2020 from "ajv/dist/2020.js";

import capsuleSchema from "../../schemas/capsule-schema.json" with { type: "json" };
import neuroSchema from "../../schemas/neuro-concentrate.schema.json" with { type: "json" };
import note from "../example-note.capsule.json" with { type: "json" };

const ajv = new Ajv2020({ allErrors: true, strict: true });

ajv.addSchema(neuroSchema);
ajv.addSchema(capsuleSchema);

const validateCapsule = ajv.getSchema(capsuleSchema.$id) ?? ajv.compile(capsuleSchema);

if (!validateCapsule(note)) {
  console.error(validateCapsule.errors);
  process.exit(1);
}

console.log(`AJV OK: capsule ${note.metadata.capsule_id} matches the published capsule schema`);


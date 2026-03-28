const contractConstants = require("@num1hub/capsule-specs/references/contract-constants.json");
const validationGates = require("@num1hub/capsule-specs/references/validation-gates.json");

const firstGate = validationGates.gates[0];
const typeSummary = contractConstants.metadata.type_enum.join(", ");

if (!validationGates.gates.length) {
  throw new Error("missing validation gates");
}

console.log({
  rootKeys: contractConstants.capsule_root_keys.length,
  integrityPayloadRootKeys: contractConstants.validator.integrity_payload_root_keys,
  integrityCanonicalization: contractConstants.validator.integrity_canonicalization,
  firstGate: firstGate.id,
  gateFamilies: validationGates.families.map((family) => family.id),
  typeSummary
});

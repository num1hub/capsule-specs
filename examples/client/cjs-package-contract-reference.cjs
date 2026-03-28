const contractConstants = require("@num1hub/capsule-specs/references/contract-constants.json");
const validationGates = require("@num1hub/capsule-specs/references/validation-gates.json");
const validatorRoutes = require("@num1hub/capsule-specs/references/validator-routes.json");

const firstGate = validationGates.gates[0];
const typeSummary = contractConstants.metadata.type_enum.join(", ");
const supportRoutes = validatorRoutes.routes.filter((route) => route.method === "GET").map((route) => route.path);

if (!validationGates.gates.length) {
  throw new Error("missing validation gates");
}

if (validatorRoutes.routes.length !== 5) {
  throw new Error("missing published validator routes");
}

console.log({
  rootKeys: contractConstants.capsule_root_keys.length,
  integrityPayloadRootKeys: contractConstants.validator.integrity_payload_root_keys,
  integrityCanonicalization: contractConstants.validator.integrity_canonicalization,
  firstGate: firstGate.id,
  gateFamilies: validationGates.families.map((family) => family.id),
  supportRoutes,
  typeSummary
});

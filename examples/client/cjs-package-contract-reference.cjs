const contractConstants = require("@num1hub/capsule-specs/references/contract-constants.json");
const validationGates = require("@num1hub/capsule-specs/references/validation-gates.json");
const validatorEnvelopeFamilies = require("@num1hub/capsule-specs/references/validator-envelope-families.json");
const validatorRoutes = require("@num1hub/capsule-specs/references/validator-routes.json");

const firstGate = validationGates.gates[0];
const typeSummary = contractConstants.metadata.type_enum.join(", ");
const supportRoutes = validatorRoutes.routes.filter((route) => route.method === "GET").map((route) => route.path);
const simpleErrorFamily = validatorEnvelopeFamilies.response_families.find((family) => family.id === "simpleErrorResponse");

if (!validationGates.gates.length) {
  throw new Error("missing validation gates");
}

if (validatorRoutes.routes.length !== 5) {
  throw new Error("missing published validator routes");
}

if (validatorEnvelopeFamilies.request_families.length !== 3 || validatorEnvelopeFamilies.response_families.length !== 7) {
  throw new Error("missing published validator envelope families");
}

console.log({
  rootKeys: contractConstants.capsule_root_keys.length,
  integrityPayloadRootKeys: contractConstants.validator.integrity_payload_root_keys,
  integrityCanonicalization: contractConstants.validator.integrity_canonicalization,
  firstGate: firstGate.id,
  gateFamilies: validationGates.families.map((family) => family.id),
  requestFamilyIds: validatorEnvelopeFamilies.request_families.map((family) => family.id),
  responseFamilyIds: validatorEnvelopeFamilies.response_families.map((family) => family.id),
  sharedDefinitionIds: validatorEnvelopeFamilies.shared_definitions.map((definition) => definition.id),
  errorExampleCount: simpleErrorFamily?.example_files.length ?? 0,
  supportRoutes,
  typeSummary
});

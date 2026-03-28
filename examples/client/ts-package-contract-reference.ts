import contractConstants from "@num1hub/capsule-specs/references/contract-constants.json" with { type: "json" };
import validationGates from "@num1hub/capsule-specs/references/validation-gates.json" with { type: "json" };
import validatorEnvelopeFamilies from "@num1hub/capsule-specs/references/validator-envelope-families.json" with { type: "json" };
import validatorRoutes from "@num1hub/capsule-specs/references/validator-routes.json" with { type: "json" };
import {
  publishedValidatorEnvelopeFamilies,
  publishedValidatorEnvelopeFamilyCounts
} from "@num1hub/capsule-specs/typescript/validator-envelope-families";

export const gateIds = validationGates.gates.map((gate) => gate.id);
export const routeIds = validatorRoutes.routes.map((route) => route.id);
const simpleErrorFamily = validatorEnvelopeFamilies.response_families.find(
  (family) => family.id === "simpleErrorResponse"
);

export const referenceSummary = {
  rootKeys: contractConstants.capsule_root_keys,
  integrityPayloadRootKeys: contractConstants.validator.integrity_payload_root_keys,
  integrityCanonicalization: contractConstants.validator.integrity_canonicalization,
  relationTypes: contractConstants.relation_types,
  confidenceDimensions: contractConstants.confidence_vector.dimensions,
  firstGate: validationGates.gates[0]?.id ?? "G01",
  routeCount: validatorRoutes.routes.length,
  requestFamilyCount: publishedValidatorEnvelopeFamilyCounts.requests,
  responseFamilyCount: publishedValidatorEnvelopeFamilyCounts.responses,
  sharedDefinitionIds: publishedValidatorEnvelopeFamilies.sharedDefinitions.map((definition) => definition.id),
  errorExampleCount: simpleErrorFamily?.example_files.length ?? 0,
  supportRoutePaths: validatorRoutes.routes
    .filter((route) => route.method === "GET")
    .map((route) => route.path)
};

if (!gateIds.includes("G16")) {
  throw new Error("missing G16");
}

if (referenceSummary.integrityPayloadRootKeys.length !== 4) {
  throw new Error("unexpected integrity payload root count");
}

if (!routeIds.includes("getGates") || !routeIds.includes("getStats")) {
  throw new Error("missing published support routes");
}

if (referenceSummary.responseFamilyCount !== 7 || referenceSummary.requestFamilyCount !== 3) {
  throw new Error("unexpected published validator envelope family counts");
}

if (referenceSummary.errorExampleCount !== 4) {
  throw new Error("unexpected simpleErrorResponse example count");
}

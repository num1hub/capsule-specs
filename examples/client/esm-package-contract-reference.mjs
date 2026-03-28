import contractConstants from "@num1hub/capsule-specs/references/contract-constants.json" with { type: "json" };
import validationGates from "@num1hub/capsule-specs/references/validation-gates.json" with { type: "json" };
import validatorEnvelopeFamilies from "@num1hub/capsule-specs/references/validator-envelope-families.json" with { type: "json" };
import validatorRoutes from "@num1hub/capsule-specs/references/validator-routes.json" with { type: "json" };
import { publishedValidatorEnvelopeFamilyCounts } from "@num1hub/capsule-specs/typescript/validator-envelope-families";
import { publishedValidatorRouteDefinitions } from "@num1hub/capsule-specs/typescript/validator-routes";

const simpleErrorFamily = validatorEnvelopeFamilies.response_families.find(
  (family) => family.id === "simpleErrorResponse"
);
const statsRoute = publishedValidatorRouteDefinitions.find((route) => route.id === "getStats");
const validateSingleRoute = publishedValidatorRouteDefinitions.find((route) => route.id === "validateSingle");

export const referenceSummary = {
  rootKeys: contractConstants.capsule_root_keys,
  integrityPayloadRootKeys: contractConstants.validator.integrity_payload_root_keys,
  integrityCanonicalization: contractConstants.validator.integrity_canonicalization,
  relationTypes: contractConstants.relation_types,
  firstGate: validationGates.gates[0]?.id ?? "G01",
  routeCount: validatorRoutes.routes.length,
  authProtectedRouteCount: validatorRoutes.routes.filter((route) => route.requires_bearer_auth).length,
  requestFamilyCount: publishedValidatorEnvelopeFamilyCounts.requests,
  responseFamilyCount: publishedValidatorEnvelopeFamilyCounts.responses,
  sharedDefinitionCount: publishedValidatorEnvelopeFamilyCounts.sharedDefinitions,
  errorExampleCount: simpleErrorFamily?.example_files.length ?? 0,
  validateSingleStatusCodes: validateSingleRoute?.responseStatuses.map((status) => status.status) ?? [],
  statsQueryParameters: statsRoute?.queryParameters.map((parameter) => parameter.name) ?? [],
  supportRoutePaths: validatorRoutes.routes.filter((route) => route.method === "GET").map((route) => route.path)
};

if (!validationGates.gates.some((gate) => gate.id === "G16")) {
  throw new Error("missing G16");
}

if (referenceSummary.integrityPayloadRootKeys.length !== 4) {
  throw new Error("unexpected integrity payload root count");
}

if (referenceSummary.responseFamilyCount !== 7 || referenceSummary.requestFamilyCount !== 3) {
  throw new Error("unexpected published validator envelope family counts");
}

if (referenceSummary.errorExampleCount !== 6) {
  throw new Error("unexpected simpleErrorResponse example count");
}

if (referenceSummary.authProtectedRouteCount !== referenceSummary.routeCount) {
  throw new Error("unexpected validator route auth coverage");
}

if (!referenceSummary.statsQueryParameters.includes("limit")) {
  throw new Error("unexpected stats query parameter coverage");
}

if (!referenceSummary.validateSingleStatusCodes.includes(401) || !referenceSummary.validateSingleStatusCodes.includes(429)) {
  throw new Error("unexpected validator route status coverage");
}

console.log(referenceSummary);

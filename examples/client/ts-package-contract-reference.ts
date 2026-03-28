import contractConstants from "@num1hub/capsule-specs/references/contract-constants.json" with { type: "json" };
import validationGates from "@num1hub/capsule-specs/references/validation-gates.json" with { type: "json" };
import validatorRoutes from "@num1hub/capsule-specs/references/validator-routes.json" with { type: "json" };

export const gateIds = validationGates.gates.map((gate) => gate.id);
export const routeIds = validatorRoutes.routes.map((route) => route.id);

export const referenceSummary = {
  rootKeys: contractConstants.capsule_root_keys,
  integrityPayloadRootKeys: contractConstants.validator.integrity_payload_root_keys,
  integrityCanonicalization: contractConstants.validator.integrity_canonicalization,
  relationTypes: contractConstants.relation_types,
  confidenceDimensions: contractConstants.confidence_vector.dimensions,
  firstGate: validationGates.gates[0]?.id ?? "G01",
  routeCount: validatorRoutes.routes.length,
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

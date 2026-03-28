import contractConstants from "@num1hub/capsule-specs/references/contract-constants.json" with { type: "json" };
import validationGates from "@num1hub/capsule-specs/references/validation-gates.json" with { type: "json" };

export const gateIds = validationGates.gates.map((gate) => gate.id);

export const referenceSummary = {
  rootKeys: contractConstants.capsule_root_keys,
  relationTypes: contractConstants.relation_types,
  confidenceDimensions: contractConstants.confidence_vector.dimensions,
  firstGate: validationGates.gates[0]?.id ?? "G01"
};

if (!gateIds.includes("G16")) {
  throw new Error("missing G16");
}

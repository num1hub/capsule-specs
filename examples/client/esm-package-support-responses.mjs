import * as validatorProjection from "@num1hub/capsule-specs/zod/validator-api";
import gatesResponse from "@num1hub/capsule-specs/examples/api/gates-response.sample.json" with { type: "json" };
import statsResponse from "@num1hub/capsule-specs/examples/api/stats-response.sample.json" with { type: "json" };

const gatesResponseSchema = validatorProjection.gatesResponseSchema ?? validatorProjection.default?.gatesResponseSchema;
const statsResponseSchema = validatorProjection.statsResponseSchema ?? validatorProjection.default?.statsResponseSchema;

if (!gatesResponseSchema || !statsResponseSchema) {
  throw new Error("expected ESM package exports to expose support-response schemas");
}

const parsedGates = gatesResponseSchema.parse(gatesResponse);
const parsedStats = statsResponseSchema.parse(statsResponse);

if (!parsedGates.gates.some((gate) => gate.id === "G16")) {
  throw new Error("missing G16 in support response recipe");
}

console.log({
  gateCount: parsedGates.gates.length,
  firstGate: parsedGates.gates[0]?.id ?? null,
  statsTotal: parsedStats.total,
  statsPassRate: parsedStats.passRate
});

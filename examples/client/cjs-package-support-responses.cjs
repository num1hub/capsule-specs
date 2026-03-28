const { gatesResponseSchema, statsResponseSchema } = require("@num1hub/capsule-specs/zod/validator-api");
const gatesResponse = require("@num1hub/capsule-specs/examples/api/gates-response.sample.json");
const statsResponse = require("@num1hub/capsule-specs/examples/api/stats-response.sample.json");

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

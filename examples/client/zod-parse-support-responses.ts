import gatesResponse from "../api/gates-response.sample.json";
import statsResponse from "../api/stats-response.sample.json";
import { gatesResponseSchema, statsResponseSchema } from "../../projections/zod/validator-api.js";

export const parsedGatesResponse = gatesResponseSchema.parse(gatesResponse);
export const parsedStatsResponse = statsResponseSchema.parse(statsResponse);

export const supportResponseSummary = {
  gateCount: parsedGatesResponse.gates.length,
  hasG16: parsedGatesResponse.gates.some((gate) => gate.id === "G16"),
  statsTotal: parsedStatsResponse.total,
  statsPassRate: parsedStatsResponse.passRate
};

if (!supportResponseSummary.hasG16) {
  throw new Error("missing G16 in parsed support responses");
}

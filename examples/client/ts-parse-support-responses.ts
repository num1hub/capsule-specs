import gatesResponse from "../api/gates-response.sample.json";
import statsResponse from "../api/stats-response.sample.json";
import type { GatesResponse, StatsResponse } from "../../projections/typescript/validator-api.js";

export const typedGatesResponse = gatesResponse as GatesResponse;
export const typedStatsResponse = statsResponse as StatsResponse;

export const supportResponseSummary = {
  gateCount: typedGatesResponse.gates.length,
  hasG16: typedGatesResponse.gates.some((gate) => gate.id === "G16"),
  statsTotal: typedStatsResponse.total,
  statsPassRate: typedStatsResponse.passRate
};

if (!supportResponseSummary.hasG16) {
  throw new Error("missing G16 in typed support responses");
}

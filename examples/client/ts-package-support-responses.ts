import type { GatesResponse, StatsResponse } from "@num1hub/capsule-specs/typescript/validator-api";

export const gatesResponse: GatesResponse = {
  gates: [
    {
      id: "G01",
      name: "Exactly 5 root keys",
      description: "The capsule must contain exactly five root keys, adhering to the 5-Element Law.",
      severity: "error",
      autoFixable: false
    },
    {
      id: "G16",
      name: "Integrity seal",
      description: "integrity_sha3_512 must match the recomputed SHA3-512 hash of the canonicalized first four roots.",
      severity: "error",
      autoFixable: true
    }
  ]
};

export const statsResponse: StatsResponse = {
  total: 128,
  passed: 120,
  failed: 8,
  warned: 3,
  passRate: 0.9375,
  recent: [
    {
      capsuleId: "capsule.example.note.v1",
      valid: true,
      timestamp: "2026-03-26T12:00:00Z"
    }
  ],
  trend: [
    {
      bucket: "2026-03-26T12:00:00Z",
      passed: 12,
      failed: 1
    }
  ],
  gates: [
    {
      gate: "G16",
      count: 8
    }
  ]
};

export const supportResponseSummary = {
  gateCount: gatesResponse.gates.length,
  hasG16: gatesResponse.gates.some((gate) => gate.id === "G16"),
  statsTotal: statsResponse.total,
  statsPassRate: statsResponse.passRate
};

if (!supportResponseSummary.hasG16) {
  throw new Error("missing G16 in typed support response summary");
}

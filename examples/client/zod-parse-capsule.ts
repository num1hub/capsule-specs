import { capsuleSchema } from "../../projections/zod/capsule.js";

const candidate = {
  metadata: {
    capsule_id: "capsule.example.public-zod-parse.v1",
    type: "operations",
    subtype: "atomic",
    status: "draft",
    version: "1.0.0",
    semantic_hash: "public-safe-zod-parse-capsule-consumer-layer-proof",
    name: "Public zod parse"
  },
  core_payload: {
    content_type: "markdown",
    content: "# Public zod parse\n\nThis example shows how a consumer can parse the outer capsule contract through the published Zod projection."
  },
  neuro_concentrate: {
    summary: "Public-safe Zod recipe demonstrating how a consumer can parse and validate the published outer capsule contract without reaching into private runtime internals or inventing local capsule shape rules.",
    keywords: [
      "zod",
      "capsule",
      "projection",
      "consumer",
      "validation",
      "schema"
    ],
    confidence_vector: {
      extraction: 1,
      synthesis: 0.97,
      linking: 0.95,
      provenance_coverage: 0.95,
      validation_score: 0.96,
      contradiction_pressure: 0.02
    },
    semantic_hash: "public-safe-zod-parse-capsule-consumer-layer-proof"
  },
  recursive_layer: {
    links: []
  },
  integrity_sha3_512: "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb"
};

export const parsedCapsule = capsuleSchema.parse(candidate);

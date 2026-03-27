import type { Capsule } from "../../projections/typescript/capsule.js";

const capsule: Capsule = {
  metadata: {
    capsule_id: "capsule.example.public-typing-note.v1",
    type: "concept",
    subtype: "atomic",
    status: "active",
    version: "1.0.0",
    semantic_hash: "public-safe-type-projection-capsule-typing-note-layer",
    name: "Public typing note"
  },
  core_payload: {
    content_type: "markdown",
    content: "# Public typing note\n\nThis example shows how a consumer can type the outer capsule contract."
  },
  neuro_concentrate: {
    summary: "Public-safe TypeScript recipe demonstrating how a consumer can rely on the published outer capsule contract without importing private runtime code or guessing the shape from prose alone.",
    keywords: [
      "typescript",
      "capsule",
      "projection",
      "public-specs",
      "consumer",
      "schema"
    ],
    confidence_vector: {
      extraction: 1,
      synthesis: 0.98,
      linking: 0.95,
      provenance_coverage: 0.95,
      validation_score: 0.95,
      contradiction_pressure: 0.02
    },
    semantic_hash: "public-safe-type-projection-capsule-typing-note-layer"
  },
  recursive_layer: {
    links: []
  },
  integrity_sha3_512: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
};

export function summarizeCapsule(value: Capsule): string {
  const label = value.metadata.name ?? value.metadata.capsule_id;
  return `${label} [${value.metadata.type}/${value.metadata.subtype}]`;
}

export const capsuleSummary = summarizeCapsule(capsule);

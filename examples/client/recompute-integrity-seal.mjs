import note from "../example-note.capsule.json" with { type: "json" };
import invalidG16 from "../example-validator-invalid-g16.capsule.json" with { type: "json" };
import contractConstants from "../../references/contract-constants.json" with { type: "json" };
import { createHash } from "node:crypto";

function canonicalizeJson(value) {
  if (value === null) return "null";

  switch (typeof value) {
    case "string":
      return JSON.stringify(value);
    case "number":
      return Number.isFinite(value) ? String(value) : "null";
    case "boolean":
      return value ? "true" : "false";
    case "object":
      if (Array.isArray(value)) {
        return `[${value.map((entry) => canonicalizeJson(entry)).join(",")}]`;
      }

      return `{${Object.keys(value)
        .sort((left, right) => left.localeCompare(right))
        .map((key) => `${JSON.stringify(key)}:${canonicalizeJson(value[key])}`)
        .join(",")}}`;
    default:
      throw new Error(`Unsupported value type in canonicalization: ${typeof value}`);
  }
}

function computeIntegrityHash(capsule) {
  const payload = Object.fromEntries(
    contractConstants.validator.integrity_payload_root_keys.map((key) => [key, capsule[key]])
  );

  return createHash("sha3-512").update(canonicalizeJson(payload)).digest("hex");
}

const noteHash = computeIntegrityHash(note);
if (noteHash !== note.integrity_sha3_512) {
  throw new Error("published note example is not sealed correctly");
}

const repairedInvalidHash = computeIntegrityHash(invalidG16);
if (repairedInvalidHash === invalidG16.integrity_sha3_512) {
  throw new Error("negative G16 teaching example must remain intentionally invalid");
}

const repairedInvalidCapsule = {
  ...invalidG16,
  integrity_sha3_512: repairedInvalidHash
};

console.log(
  JSON.stringify(
    {
      integrityPayloadRootKeys: contractConstants.validator.integrity_payload_root_keys,
      canonicalization: contractConstants.validator.integrity_canonicalization,
      noteHashMatches: true,
      repairedInvalidHash,
      repairedCapsuleIntegrity: repairedInvalidCapsule.integrity_sha3_512
    },
    null,
    2
  )
);

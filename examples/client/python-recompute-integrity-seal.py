from __future__ import annotations

import hashlib
import json
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[2]


def load_json(relative_path: str) -> dict:
    return json.loads((REPO_ROOT / relative_path).read_text(encoding="utf-8"))


def canonicalize_json(value: object) -> str:
    return json.dumps(value, sort_keys=True, separators=(",", ":"), ensure_ascii=False, allow_nan=False)


def compute_integrity_hash(capsule: dict) -> str:
    contract_constants = load_json("references/contract-constants.json")
    payload = {
        key: capsule[key]
        for key in contract_constants["validator"]["integrity_payload_root_keys"]
    }
    canonical = canonicalize_json(payload)
    return hashlib.sha3_512(canonical.encode("utf-8")).hexdigest()


note = load_json("examples/example-note.capsule.json")
invalid_g16 = load_json("examples/example-validator-invalid-g16.capsule.json")

note_hash = compute_integrity_hash(note)
repaired_invalid_hash = compute_integrity_hash(invalid_g16)

assert note["integrity_sha3_512"] == note_hash
assert invalid_g16["integrity_sha3_512"] != repaired_invalid_hash

summary = {
    "noteCapsuleId": note["metadata"]["capsule_id"],
    "noteSealMatches": note["integrity_sha3_512"] == note_hash,
    "invalidCapsuleId": invalid_g16["metadata"]["capsule_id"],
    "publishedInvalidSeal": invalid_g16["integrity_sha3_512"],
    "repairedInvalidSeal": repaired_invalid_hash,
}

print(json.dumps(summary, indent=2))

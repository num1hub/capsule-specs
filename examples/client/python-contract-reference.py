from __future__ import annotations

import json
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[2]


def load_json(relative_path: str) -> dict:
    return json.loads((REPO_ROOT / relative_path).read_text(encoding="utf-8"))


contract_constants = load_json("references/contract-constants.json")
validation_gates = load_json("references/validation-gates.json")
validator_envelope_families = load_json("references/validator-envelope-families.json")
validator_routes = load_json("references/validator-routes.json")
confidence_vector_capsule = load_json(
    "capsules/capsule.foundation.capsuleos.confidence-vector.v1.json"
)

expected_integrity_roots = [
    "metadata",
    "core_payload",
    "neuro_concentrate",
    "recursive_layer",
]

assert len(contract_constants["relation_types"]) == 9
assert contract_constants["validator"]["integrity_payload_root_keys"] == expected_integrity_roots
assert contract_constants["validator"]["integrity_canonicalization"] == "sorted-key-json"
assert len(validation_gates["gates"]) == 16
assert len(validation_gates["families"]) == 4
assert len(validator_envelope_families["request_families"]) == 3
assert len(validator_envelope_families["response_families"]) == 7
assert len(validator_envelope_families["shared_definitions"]) == 4
assert len(validator_routes["routes"]) == 5
assert validator_routes["routes"][0]["path"] == "/api/validate"
assert (
    confidence_vector_capsule["metadata"]["capsule_id"]
    == "capsule.foundation.capsuleos.confidence-vector.v1"
)

simple_error_family = next(
    family
    for family in validator_envelope_families["response_families"]
    if family["id"] == "simpleErrorResponse"
)

summary = {
    "relationTypeCount": len(contract_constants["relation_types"]),
    "gateCount": len(validation_gates["gates"]),
    "gateFamilies": [family["id"] for family in validation_gates["families"]],
    "requestFamilyIds": [family["id"] for family in validator_envelope_families["request_families"]],
    "responseFamilyIds": [family["id"] for family in validator_envelope_families["response_families"]],
    "sharedDefinitionIds": [definition["id"] for definition in validator_envelope_families["shared_definitions"]],
    "errorExampleCount": len(simple_error_family["example_files"]),
    "routeCount": len(validator_routes["routes"]),
    "supportRoutes": [
        route["path"] for route in validator_routes["routes"] if route["method"] == "GET"
    ],
    "integrityPayloadRootKeys": contract_constants["validator"]["integrity_payload_root_keys"],
    "integrityCanonicalization": contract_constants["validator"]["integrity_canonicalization"],
    "confidenceVectorCapsuleId": confidence_vector_capsule["metadata"]["capsule_id"],
}

print(json.dumps(summary, indent=2))

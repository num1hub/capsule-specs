#!/usr/bin/env bash
set -euo pipefail

: "${N1HUB_BASE_URL:?set N1HUB_BASE_URL}"
: "${N1HUB_TOKEN:?set N1HUB_TOKEN}"

curl \
  -X POST \
  "${N1HUB_BASE_URL}/api/validate/batch" \
  -H "Authorization: Bearer ${N1HUB_TOKEN}" \
  -H "Content-Type: application/json" \
  --data "@/home/n1/codex-workspace/examples/api/validate-request.batch.json"

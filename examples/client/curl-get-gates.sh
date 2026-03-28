#!/usr/bin/env bash
set -euo pipefail

: "${N1HUB_BASE_URL:?set N1HUB_BASE_URL}"
: "${N1HUB_TOKEN:?set N1HUB_TOKEN}"

curl \
  "${N1HUB_BASE_URL}/api/validate/gates" \
  -H "Authorization: Bearer ${N1HUB_TOKEN}" \
  -H "Accept: application/json"

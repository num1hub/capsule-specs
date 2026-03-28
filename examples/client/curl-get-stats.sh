#!/usr/bin/env bash
set -euo pipefail

: "${N1HUB_BASE_URL:?set N1HUB_BASE_URL}"
: "${N1HUB_TOKEN:?set N1HUB_TOKEN}"

stats_query=""
if [[ -n "${N1HUB_STATS_LIMIT:-}" ]]; then
  if [[ ! "${N1HUB_STATS_LIMIT}" =~ ^[1-9][0-9]*$ ]]; then
    echo "N1HUB_STATS_LIMIT must be a positive integer" >&2
    exit 1
  fi
  stats_query="?limit=${N1HUB_STATS_LIMIT}"
fi

curl \
  "${N1HUB_BASE_URL}/api/validate/stats${stats_query}" \
  -H "Authorization: Bearer ${N1HUB_TOKEN}" \
  -H "Accept: application/json"

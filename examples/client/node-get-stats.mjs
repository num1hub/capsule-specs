const baseUrl = process.env.N1HUB_BASE_URL;
const token = process.env.N1HUB_TOKEN;
const limitRaw = process.env.N1HUB_STATS_LIMIT;

if (!baseUrl || !token) {
  throw new Error('Set N1HUB_BASE_URL and N1HUB_TOKEN before running this script.');
}

let limit;
if (limitRaw != null) {
  limit = Number.parseInt(limitRaw, 10);
  if (!Number.isInteger(limit) || limit < 1) {
    throw new Error('N1HUB_STATS_LIMIT must be a positive integer.');
  }
}

const statsUrl = new URL('/api/validate/stats', baseUrl);
if (limit != null) {
  statsUrl.searchParams.set('limit', String(limit));
}

const response = await fetch(statsUrl, {
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json'
  }
});

console.log(await response.text());

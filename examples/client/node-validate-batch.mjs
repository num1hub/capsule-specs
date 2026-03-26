import { readFile } from 'node:fs/promises';

const baseUrl = process.env.N1HUB_BASE_URL;
const token = process.env.N1HUB_TOKEN;

if (!baseUrl || !token) {
  throw new Error('Set N1HUB_BASE_URL and N1HUB_TOKEN before running this script.');
}

const body = await readFile(new URL('../api/validate-request.batch.json', import.meta.url), 'utf8');

const response = await fetch(`${baseUrl}/api/validate/batch`, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body
});

console.log(await response.text());

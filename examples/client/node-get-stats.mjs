const baseUrl = process.env.N1HUB_BASE_URL;
const token = process.env.N1HUB_TOKEN;

if (!baseUrl || !token) {
  throw new Error('Set N1HUB_BASE_URL and N1HUB_TOKEN before running this script.');
}

const response = await fetch(`${baseUrl}/api/validate/stats`, {
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json'
  }
});

console.log(await response.text());

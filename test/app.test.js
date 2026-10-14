const { test, before, after } = require('node:test');
const assert = require('node:assert');
const { createApp } = require('../src/app');

let server;
let baseUrl;

before(async () => {
  server = createApp();
  await new Promise((resolve) => server.listen(0, resolve));
  baseUrl = `http://localhost:${server.address().port}`;
});

after(() => server.close());

test('GET /health returns ok', async () => {
  const res = await fetch(`${baseUrl}/health`);
  assert.strictEqual(res.status, 200);
  assert.deepStrictEqual(await res.json(), { status: 'ok' });
});

test('GET /calc/add returns sum', async () => {
  const res = await fetch(`${baseUrl}/calc/add?a=1&b=2`);
  assert.strictEqual(res.status, 200);
  assert.deepStrictEqual(await res.json(), { result: 3 });
});

test('GET /calc/divide by zero returns 400', async () => {
  const res = await fetch(`${baseUrl}/calc/divide?a=1&b=0`);
  assert.strictEqual(res.status, 400);
});

test('unknown route returns 404', async () => {
  const res = await fetch(`${baseUrl}/unknown`);
  assert.strictEqual(res.status, 404);
});

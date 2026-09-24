import assert from 'node:assert/strict';
import { setTimeout } from 'node:timers/promises';

const origin = new URL(process.argv[2] || 'http://127.0.0.1:8080');
const request = (path, options = {}) =>
  fetch(new URL(path, origin), {
    signal: AbortSignal.timeout(5000),
    ...options,
  });
let healthy = false;
for (let attempt = 0; attempt < 20; attempt++) {
  try {
    const response = await request('/healthz');
    healthy = response.ok && (await response.text()).trim() === 'ok';
    if (healthy) break;
  } catch {
    /* NGINX may still be starting. */
  }
  await setTimeout(1000);
}
assert(healthy, 'Container health endpoint did not become ready.');
const response = await request('/');
assert.equal(response.status, 200);
assert.match(response.headers.get('cache-control') || '', /no-cache/);
assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
const html = await response.text();
for (const id of ['top', 'work', 'journey', 'expertise', 'about', 'contact']) {
  assert(html.includes(`id="${id}"`), `Portfolio section ${id} missing.`);
}
assert(html.includes('research-loop'), 'Animated portfolio was not exported.');
const assets = [
  ...new Set(
    [
      ...html.matchAll(/(?:src|href)="(\/[^"#?]+\.(?:js|css|png|svg|woff2))"/g),
    ].map((match) => match[1]),
  ),
];
assert(assets.some((asset) => asset.endsWith('.css')));
assert(assets.some((asset) => asset.endsWith('.js')));
await Promise.all(
  assets.map(async (asset) => {
    const result = await request(asset, { method: 'HEAD' });
    assert.equal(result.status, 200, `Asset failed: ${asset}`);
    if (asset.startsWith('/_next/'))
      assert.match(result.headers.get('cache-control') || '', /immutable/);
  }),
);
for (const path of [
  '/this-route-does-not-exist',
  '/_next/missing-file.js',
  '/.env',
]) {
  const missing = await request(path, { method: 'HEAD' });
  assert(
    [403, 404].includes(missing.status),
    `Unexpected public content: ${path}`,
  );
}
console.log(
  `Container verified at ${origin}: health, six sections, ${assets.length} assets, cache headers, and missing-file responses.`,
);

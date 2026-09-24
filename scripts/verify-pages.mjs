import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve, join } from 'node:path';

const root = resolve('dist/client');
assert(existsSync(join(root, 'index.html')), 'Static index.html is missing.');
assert(
  existsSync(join(root, '.nojekyll')),
  '.nojekyll is needed to serve _next assets on branch-based Pages.',
);
const html = readFileSync(join(root, 'index.html'), 'utf8');
const canonical = html.match(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/);
assert(canonical, 'GitHub Pages canonical URL is missing.');
assert.equal(
  new URL(canonical[1]).href,
  'https://anmol-sharma-01.github.io/',
  'Canonical URL must match the GitHub Pages site.',
);
for (const id of ['top', 'work', 'journey', 'expertise', 'about', 'contact'])
  assert(html.includes(`id="${id}"`), `Missing section #${id}`);
for (const match of html.matchAll(
  /(?:src|href)="(\/[^"#?]*)(?:[?#][^"]*)?"/g,
)) {
  const asset = decodeURIComponent(match[1]);
  if (asset === '/') continue;
  assert(
    existsSync(join(root, asset.slice(1))),
    `Missing public asset: ${asset}`,
  );
}
function checkFiles(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    assert(
      !entry.name.startsWith('.env'),
      'An environment file must not be in public output.',
    );
    if (entry.isDirectory()) checkFiles(path);
  }
}
checkFiles(root);
console.log(
  'GitHub Pages export verified: canonical URL, sections, local assets, .nojekyll, and public file boundary.',
);

import { sites } from '@openai/sites-vite-plugin';
import tailwindcss from '@tailwindcss/postcss';
import { existsSync } from 'node:fs';
import vinext from 'vinext';
import { defineConfig } from 'vite';

// This portfolio is a static export; it does not need a Worker runtime.
export default defineConfig({
  css: { postcss: { plugins: [tailwindcss()] } },
  plugins: [
    vinext(),
    ...(existsSync(new URL('./.openai/hosting.json', import.meta.url))
      ? [sites()]
      : []),
  ],
});

# Anmol Sharma — Portfolio

An original responsive cybersecurity portfolio built with React, TypeScript, Vinext, Tailwind, and Motion. Includes automatic seasonal palettes, light/dark themes, animated project filters, project detail sheets, expertise tabs, a mobile menu, and contact links. Motion Primitives and Watermelon Platform components are adapted with MIT notices in `LICENSES/`; see `THIRD_PARTY_NOTICES.md`.

## Development

Use Node 22 LTS (specified in `.nvmrc` and `.node-version`). The installed Node 24.11.1 runtime on Windows encountered a native shutdown assertion in the build tooling; the full build succeeds on Node 22. You can also run `npm exec --yes --package=node@22 --call "npm run build"` without changing your system runtime.

- `npm install` installs dependencies. On Windows PowerShell, use `npm.cmd` if script execution is restricted.
- `npm run dev` starts the local preview.
- `npm run build` produces the static site in `dist/client`.
- `npx tsc --noEmit` checks TypeScript.

Edit portfolio details in `app/content.ts`; the homepage is in `app/page.tsx`, the sections in `app/portfolio-sections.tsx`, and the theme in `app/globals.css`.

## Docker

Run `docker compose up --build -d`, then open **http://localhost:8080**. See [DOCKER.md](DOCKER.md) for portable image builds, other ports, and deployment instructions.

## Motion

Motion Primitives supplies the rotating research labels, glowing border trail, tilt cards, text effects, and magnetic links. Watermelon supplies the character reveal, shimmer links, copy feedback, and animated tab indicators. Scroll reveals, a reading progress line, and orbiting profile accents tie them together. Use the pause button beside the theme switch to stop animations; system reduced-motion preferences are also respected.

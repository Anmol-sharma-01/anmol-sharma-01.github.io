# Anmol Sharma — Portfolio

An original responsive cybersecurity portfolio built with React, TypeScript, Vinext, Tailwind, and Motion. Includes automatic seasonal palettes, light/dark themes, animated project filters, project detail sheets, expertise tabs, a mobile menu, and contact links. Motion Primitives and Watermelon Platform components are adapted with MIT notices in `LICENSES/`; see `THIRD_PARTY_NOTICES.md`.

## Development

Use Node 22 LTS (specified in `.nvmrc` and `.node-version`). The installed Node 24.11.1 runtime on Windows encountered a native shutdown assertion in the build tooling; the full build succeeds on Node 22. You can also run `npm exec --yes --package=node@22 --call "npm run build"` without changing your system runtime.

- `npm install` installs dependencies. On Windows PowerShell, use `npm.cmd` if script execution is restricted.
- `npm run dev` starts the local preview.
- `npm run build` produces the static site in `dist/client`.
- `npx tsc --noEmit` checks TypeScript.

Edit portfolio details in `app/content.ts`; the homepage is in `app/page.tsx`, the sections in `app/portfolio-sections.tsx`, and the theme in `app/globals.css`.

## Content sources

The owner authorized using their GitHub and LinkedIn profiles. The biography, dates, education, skills, and project summaries were based on these public materials, accessed 23 September 2026:

- https://github.com/Anmol-sharma-01/Anmol-sharma-01/blob/main/README.md
- https://github.com/Anmol-sharma-01/AI-driven-APT-detection-using-OpCodes-ML-classifiers-and-deep-learning-for-malware-analysis.
- https://github.com/Anmol-sharma-01/Safeguarding-Client-Data-in-Ontario-Small-Audit-Firms
- LinkedIn link supplied by the owner: https://www.linkedin.com/in/anmol-sharma-914371271/

LinkedIn page content was not accessible during creation; no details were inferred from similarly named profiles. Experience dates retain the explicit dates from the GitHub profile. Honeypot and OSINT projects link to the public research profile because no separate public repositories were supplied.

The design takes structural inspiration from https://github.com/ShubhamPandya01/ShubhamPandya01.github.io while using original components, styling, diagrams, and copy. No reference portfolio source or photographs were copied.

Project visuals are explanatory workflow diagrams, not screenshots or live telemetry. The email button opens the visitor's email application; the website does not collect or send form submissions.

## Hosting

The public home is **https://anmol-sharma-01.github.io/**. See `GITHUB_PAGES.md` for the deployment workflow and prebuilt upload option. No backend, runtime credentials, database, analytics, or third-party data feeds are required. Private preview configuration is excluded from the public repository.

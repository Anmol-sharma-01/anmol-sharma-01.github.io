# Publish at anmol-sharma-01.github.io

The portfolio is a static export. Its canonical URL is `https://anmol-sharma-01.github.io/`, and all public assets are local. No server, paid hosting, API key, or domain purchase is required.

## Automatic publishing (recommended)

1. Create the public repository `Anmol-sharma-01/anmol-sharma-01.github.io` if it does not exist. If the GitHub connector uses selected repositories, grant it access to this repository.
2. Upload the project source, including `.github/workflows/deploy-pages.yml`, with `main` as the default branch. Do not upload `node_modules`, `.git`, `.env` files, or `work`.
3. In the repository, open **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
4. Push a change to `main` or run **Actions → Publish portfolio to GitHub Pages → Run workflow**.
5. Wait for the deployment job to succeed, then open the URL above.

The workflow uses Node 22, installs from the lockfile, checks TypeScript, builds the static export, uploads `dist/client`, and deploys it to GitHub Pages.

## Prebuilt files (no build required)

The generated `outputs/anmol-github-pages.zip` contains the deployable static files. Extract it and upload its contents to the repository root, retaining `.nojekyll` and the `_next` directory. Then choose **Settings → Pages → Source → Deploy from a branch**, select **main / (root)**, and save. When using this route, do not add the automatic publishing workflow.

## Editing

- Personal data and projects: `app/content.ts`
- Header and introduction: `app/page.tsx`
- Sections: `app/portfolio-sections.tsx`
- Seasonal palette and preference behavior: `app/season-theme.tsx`
- Reference-inspired design: `app/redesign.css`
- Third-party component attribution: `THIRD_PARTY_NOTICES.md`

Use Node 22 as specified in `.nvmrc`. After an edit, run `npm run build` and `npm run verify:pages`. For the prebuilt-files route, regenerate the archive with `npm run package:pages`.

GitHub Pages documentation: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site

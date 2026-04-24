# Wesley.org.ua

Astro site for Wesley content in Ukrainian.

## Local development

Use Node from `.nvmrc`, then install dependencies and run the dev server.

```sh
nvm use
npm ci
npm run dev
```

## Deployment

The repository has two deployment targets:

- `main` or `master` deploys production to GitHub Pages with `SITE_URL=https://wesley.org.ua`.
- `qa` deploys QA to a dedicated Pages repository with `SITE_URL=https://qa.wesley.org.ua`.

### Production

Production deploys through `.github/workflows/deploy.yml` using `actions/deploy-pages`.

To keep the current manual approval flow, protect the `github-pages` environment in repository settings with required reviewers.

### QA

GitHub Pages cannot serve both `wesley.org.ua` and `qa.wesley.org.ua` as separate live environments from the same repository. Because of that, the QA workflow publishes to a second Pages repository.

Set these repository-level values before using the `qa` branch deployment:

- `vars.QA_PAGES_REPOSITORY`: target repository in `owner/repo` form.
- `secrets.QA_PAGES_PAT`: personal access token with permission to push to that target repository.

The target QA repository should:

- publish GitHub Pages from its `gh-pages` branch
- have the custom domain `qa.wesley.org.ua` configured in Pages settings
- have DNS for `qa.wesley.org.ua` pointed at GitHub Pages

## Build

```sh
npm run build
```

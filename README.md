# Wesley.org.ua

# Test qa deployment

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
- `dev` deploys QA to a dedicated Pages repository with `SITE_URL=https://lyubomyr-rudko.github.io` and `SITE_BASE=/wesley-qa-env`.

### Production

Production deploys through `.github/workflows/deploy.yml` using `actions/deploy-pages`.

To keep the current manual approval flow, protect the `github-pages` environment in repository settings with required reviewers.

### QA

GitHub Pages cannot serve both production and QA as separate live environments from the same repository. Because of that, the QA workflow publishes to a second Pages repository.

Set these repository-level values before using the `dev` branch deployment:

- `vars.QA_PAGES_REPOSITORY`: target repository in `owner/repo` form.
- `secrets.QA_PAGES_PAT`: personal access token with permission to push to that target repository.

The target QA repository should:

- publish GitHub Pages from its `gh-pages` branch
- be available at `https://lyubomyr-rudko.github.io/wesley-qa-env/`

## Build

```sh
npm run build
```

## Import translated sermons

If you download translated sermons from Google Drive, you can import them into `src/content/blog/sermons` with:

```sh
npm run import:sermons -- --input-dir /path/to/downloaded-files --dry-run
```

Then run the real import:

```sh
npm run import:sermons -- --input-dir /path/to/downloaded-files
```

What the script does:

- supports `.doc`, `.docx`, `.odt`, `.rtf`, `.html`, `.htm`, `.txt`, `.md`
- matches files to sermon markdown files by leading sermon number or by slugified filename
- preserves frontmatter, title, lead portrait, and metadata block in the target sermon file
- replaces only the sermon body after the `- Source slug:` line

Useful flags:

- `--dry-run`: show what would be updated without writing files
- `--create-missing`: create a new sermon markdown file if a target file does not already exist

Recommended input naming:

- `001 Salvation By Faith.docx`
- `010 The Witness Of The Spirit Discourse One.html`
- `050-the-use-of-money.txt`

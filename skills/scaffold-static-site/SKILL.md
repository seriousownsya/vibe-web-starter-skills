---
name: scaffold-static-site
description: Use when creating a new static website, landing page, documentation site, brochure site, portfolio, or frontend-only Nuxt or Next project that should be TypeScript-first, tested in CI, private on GitHub, and deployed to Netlify with minimal user choices.
---

# Scaffold Static Site

## Overview

Create a secure, frontend-only static site with almost no user choices. Default to Nuxt, TypeScript, npm, a private GitHub repository, GitHub Actions CI, Playwright, Vitest, and a live Netlify deploy.

## Zero-Option Rule

Do not interview the user about framework, hosting, package manager, CI, test runner, or repository visibility. Use these defaults unless the user explicitly asks otherwise:

| Decision | Default |
| --- | --- |
| Framework | Nuxt |
| Next support | Only when user asks for Next, React, or App Router |
| Language | TypeScript only |
| Package manager | npm |
| Repository | private GitHub repository |
| Hosting | Netlify static deploy |
| Node runtime | Node 24 LTS |
| CSS | Tailwind CSS v4 |
| UI kit | none; use small local components only |
| Fonts | system font stack; no external font calls |
| Icons | none by default; add Lucide only when needed |
| Unit tests | Vitest |
| E2E tests | Playwright |
| CI | GitHub Actions |

Ask only when a value cannot be safely inferred and would affect ownership or naming, such as an ambiguous organization account.

## Project Name Rule

The user must provide a project name. If no name is present, ask exactly one question: "What should the project be called?" Then stop until they answer. Do not scaffold with placeholder names.

Derive the folder name, npm package name, private GitHub repo, Netlify site name, and visible project title from that name. Normalize to a lowercase slug. If the target folder or provider site name is taken, append a short safe suffix automatically and report the final names.

## Safe Access

Never ask the user to paste GitHub, Netlify, or npm tokens into chat. Check local auth first:

```powershell
gh auth status
netlify status
```

If auth is missing, stop with the exact command the user should run locally:

```powershell
gh auth login
netlify login
```

If CI secrets are needed later, have the user enter them through `gh secret set`, the provider dashboard, or an interactive CLI prompt. Do not print, echo, commit, or store secrets in source files.

Every generated project must include root `AGENTS.md` from `assets/templates/AGENTS.md`. Also include root `CLAUDE.md` from `assets/templates/CLAUDE.md` so Claude Code imports the same instructions. Do not use symlinks on Windows. Keep `AGENTS.md` as the canonical policy for credential handling, verification, and CI follow-up.

## Lightweight Bootstrap Rule

Assume fresh user systems have little installed. For first-run scaffolding, require only `node`, `npm`, `git`, and the provider CLIs needed for the requested deployment: `gh` and `netlify`. Do not require Python, Docker, gitleaks, trivy, semgrep, or Playwright browsers as initial local prerequisites.

Use the generated no-dependency `scripts/check-no-secrets.mjs` for local secret scanning. Treat gitleaks, trivy, and semgrep as maintainer release-validation tools or later hardening tools, not normal end-user bootstrap requirements.

Run Playwright E2E locally only when browsers are already installed or the user approves the browser install. Otherwise rely on GitHub Actions to install the browser, run E2E, and then inspect/fix CI failures.

## Dependency Gate

Use exact package versions. Do not use `latest`, caret ranges, tilde ranges, or unqualified `npx` package execution.

Before adding each npm package, run this skill's helper script. Resolve the path relative to this `SKILL.md`, not the generated project:

```powershell
& "<skill-dir>\scripts\select-npm-version.ps1" <package-name>
```

Use the returned `package@version`. The helper selects the newest stable version published at least 7 days ago. For packages not checked through the helper, run `npm view <pkg> version time dist-tags repository.url license --json` and apply the same rule manually.

Add `.npmrc` with:

```ini
save-exact=true
fund=false
audit=true
```

Commit `package-lock.json` and use `npm ci` in CI.

## Workflow

1. Enforce the Project Name Rule and derive the project slug.
2. Verify `node`, `npm`, `git`, `gh`, and `netlify` are available. Use Node 24 LTS unless the project has a documented incompatibility. If a provider CLI is missing, stop with the official install/login command; do not install global tools without user approval.
3. Verify GitHub and Netlify auth. If missing, stop for the safe auth command only.
4. Scaffold Nuxt by default with an exact `nuxi` version selected by the dependency gate. For explicit Next requests, use `create-next-app` with exact version and App Router.
5. Add exact versions for Tailwind CSS v4 and `@tailwindcss/vite`; do not add a UI kit unless explicitly requested.
6. Add TypeScript-only scripts: `secret:scan`, `lint`, `typecheck`, `test:unit`, `test:e2e`, `build`, `generate`, and `preview`. `secret:scan` must run `node scripts/check-no-secrets.mjs`.
7. Copy templates from `assets/templates/` and adapt paths if using Next. This includes `AGENTS.md`, `CLAUDE.md`, `.env.example`, `.nvmrc`, `.npmrc`, `scripts/check-no-secrets.mjs`, CI, Netlify, Vitest, Playwright, and starter tests. Append `gitignore-security.txt` to the generated `.gitignore`.
8. Create minimal local UI building blocks only when useful: `AppButton`, `AppCard`, and `TextField`. Use system fonts, CSS variables, and a clean neutral theme.
9. Run the lightweight local checks: `npm run secret:scan`, formatting/linting if configured, `npm run typecheck`, `npm run test:unit`, and `npm run build`. Run `npm run test:e2e` locally only when Playwright browsers are already installed or the user approves the install.
10. Initialize git, create a private GitHub repository with `gh repo create --private --source . --remote origin`, commit, and push.
11. Check GitHub Actions after pushing. If CI fails and credentials allow access, inspect logs with `gh run view --log`, fix the issue, rerun local checks, commit, and push again. Do not rely on a nontechnical user to debug red CI.
12. Create/link a Netlify site without exposing tokens:

```powershell
netlify sites:create --name <project-slug> --json
netlify deploy --prod --build
```

13. Return the GitHub repo URL, Netlify URL, CI status, and the short "next edits" guide.

## Project Shape

For Nuxt, use:

```text
app/
  app.vue
  assets/
    css/
      main.css
  pages/
    index.vue
  components/
  composables/
  utils/
public/
tests/
  unit/
  e2e/
scripts/
  check-no-secrets.mjs
.github/workflows/ci.yml
AGENTS.md
CLAUDE.md
.env.example
.nvmrc
.npmrc
netlify.toml
```

For explicit Next static sites, use `src/app`, route groups only when they clarify the app, and `output: 'export'` in `next.config.ts`.

## User-Facing Finish

End with concise instructions a nontechnical user can act on:

- where to edit the homepage
- how to add a page
- how to run locally
- the live Netlify URL
- the private GitHub repo URL

Do not include provider tokens, raw secret values, or unnecessary implementation history.

## Resources

- `scripts/select-npm-version.ps1`: choose an exact npm package version older than 7 days.
- `references/static-site-notes.md`: framework and deployment notes.
- `assets/templates/`: agent policy, secret scan, CI, Netlify, Vitest, Playwright, and starter test templates.

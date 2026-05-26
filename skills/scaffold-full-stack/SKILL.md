---
name: scaffold-full-stack
description: Use when creating a new full-stack TypeScript app with pages plus REST endpoints, a private GitHub repo, CI, safe Netlify or Railway deployment, and minimal user choices using the preferred Nuxt or explicit Next stack.
---

# Scaffold Full Stack

## Overview

Create one cohesive app with frontend pages and framework-native REST endpoints. Default to Nuxt, TypeScript, npm, private GitHub, GitHub Actions CI, Playwright, Vitest, zod validation, and Netlify for the first visible deployment. Use Railway only when persistence or long-running services make Netlify the wrong runtime.

## Composition Rule

Prefer using the sibling skills when they are installed:

- Use `scaffold-static-site` for frontend-only pieces.
- Use `scaffold-rest-api` for endpoint conventions.

This skill combines their defaults into one app. Do not create separate frontend and backend repos by default. Keep one cohesive app unless the user explicitly asks for separate services or the app needs an independent worker/service.

## Zero-Option Rule

Do not interview the user about framework, hosting, package manager, database, CI, or repository visibility. Use these defaults unless the user explicitly asks otherwise:

| Decision | Default |
| --- | --- |
| Framework | Nuxt |
| Next support | Only when user asks for Next, React, or App Router |
| Pages | framework file-based pages |
| REST endpoints | Nuxt `server/api` or Next Route Handlers |
| Validation | zod schemas |
| Package manager | npm |
| Repository | private GitHub repository |
| Node runtime | Node 24 LTS |
| CSS | Tailwind CSS v4 |
| UI kit | none; use small local components only |
| Fonts | system font stack; no external font calls |
| Icons | none by default; add Lucide only when needed |
| Database | none unless requested or clearly required |
| ORM | Prisma only when a database is required |
| First visible deploy | Netlify when no persistent runtime is needed |
| Railway | database, worker, queue, cron, long-running service, or private networking |

If the request is clearly frontend-only, use `scaffold-static-site`. If it is clearly API-only, use `scaffold-rest-api`.

## Project Name Rule

The user must provide a project name. If no name is present, ask exactly one question: "What should the project be called?" Then stop until they answer. Do not scaffold with placeholder names.

Derive the folder name, npm package name, private GitHub repo, Netlify site name, Railway project name when needed, and visible app title from that name. Normalize to a lowercase slug. If the target folder or provider project name is taken, append a short safe suffix automatically and report the final names.

## Safe Access

Never ask the user to paste provider tokens into chat. Check auth:

```powershell
gh auth status
netlify status
```

Check Railway only if the decision rule requires Railway:

```powershell
railway whoami
```

If auth is missing, stop for the safe local command only:

```powershell
gh auth login
netlify login
railway login
```

Secrets must go through `gh secret set`, Netlify environment variables, Railway variables, or provider dashboards. Do not print, echo, commit, log, or store raw secrets.

Every generated project must include root `AGENTS.md` from `assets/templates/AGENTS.md`. Also include root `CLAUDE.md` from `assets/templates/CLAUDE.md` so Claude Code imports the same instructions. Do not use symlinks on Windows. Keep `AGENTS.md` as the canonical policy for credential handling, verification, and CI follow-up.

## Lightweight Bootstrap Rule

Assume fresh user systems have little installed. For first-run scaffolding, require only `node`, `npm`, `git`, and the provider CLIs needed for the requested deployment: `gh`, `netlify`, and `railway` only when Railway is actually required. Do not require Python, Docker, gitleaks, trivy, semgrep, or Playwright browsers as initial local prerequisites.

Use the generated no-dependency `scripts/check-no-secrets.mjs` for local secret scanning. Treat gitleaks, trivy, and semgrep as maintainer release-validation tools or later hardening tools, not normal end-user bootstrap requirements.

Run Playwright E2E locally only when browsers are already installed or the user approves the browser install. Otherwise rely on GitHub Actions to install the browser, run E2E, and then inspect/fix CI failures.

## Dependency Gate

Use exact package versions. Do not use `latest`, caret ranges, tilde ranges, or unqualified `npx` package execution.

Before adding each package, run this skill's helper script. Resolve the path relative to this `SKILL.md`, not the generated project:

```powershell
& "<skill-dir>\scripts\select-npm-version.ps1" <package-name>
```

Use the returned `package@version`. The helper selects the newest stable version published at least 7 days ago. Always commit `package-lock.json` and use `npm ci` in CI.

Add `.npmrc`:

```ini
save-exact=true
fund=false
audit=true
```

## Workflow

1. Enforce the Project Name Rule and derive the project slug.
2. Verify `node`, `npm`, `git`, `gh`, and `netlify`. Verify `railway` only when Railway is needed. Use Node 24 LTS unless the project has a documented incompatibility. If a provider CLI is missing, stop with the official install/login command; do not install global tools without user approval.
3. Verify provider auth. Stop only for missing safe CLI login.
4. Scaffold Nuxt by default with exact `nuxi`; use exact `create-next-app` only for explicit Next requests.
5. Add exact versions for Tailwind CSS v4, `@tailwindcss/vite`, zod, Vitest, Playwright, and framework test utilities. Add Prisma only when a database is required.
6. Create pages and endpoints using the project shape below.
7. Copy templates from `assets/templates/` and adapt paths if using Next. This includes `AGENTS.md`, `CLAUDE.md`, `.env.example`, `.nvmrc`, `.npmrc`, `scripts/check-no-secrets.mjs`, CI, Netlify, Railway, page, API, schema, and test templates. Append `gitignore-security.txt` to the generated `.gitignore`.
8. Create minimal local UI building blocks only when useful: `AppButton`, `AppCard`, and `TextField`. Use system fonts, CSS variables, and a clean neutral theme.
9. Add scripts: `secret:scan`, `lint`, `typecheck`, `test:unit`, `test:api`, `test:e2e`, `build`, `dev`, `start`, and `preview`. `secret:scan` must run `node scripts/check-no-secrets.mjs`.
10. Run the lightweight local checks: `npm run secret:scan`, `npm run typecheck`, `npm run test:unit`, `npm run build`, and `npm run test:api`. Run `npm run test:e2e` locally only when Playwright browsers are already installed or the user approves the install.
11. Create a private GitHub repo with `gh repo create --private --source . --remote origin`, commit, and push.
12. Check GitHub Actions after pushing. If CI fails and credentials allow access, inspect logs with `gh run view --log`, fix the issue, rerun local checks, commit, and push again. Do not rely on a nontechnical user to debug red CI.
13. Deploy to Netlify when the app has no database, worker, queue, cron, or long-running service:

```powershell
netlify sites:create --name <project-slug> --json
netlify deploy --prod --build
```

14. Use Railway when persistence or long-running services are required. Add `railway.json`, configure variables only through Railway, and deploy with `railway up`. Do not pretend a static deploy is production-ready when the app needs a persistent runtime.

## Project Shape

For Nuxt:

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
server/
  api/
    health.get.ts
    message.post.ts
shared/
  schemas/
    message.ts
tests/
  unit/
  api/
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
railway.json       # only when Railway is needed
```

For explicit Next:

```text
src/
  app/
    page.tsx
    api/
      health/route.ts
      message/route.ts
  components/
  server/
  shared/
    schemas/
tests/
  unit/
  api/
  e2e/
```

Use Next Route Handlers in `src/app/api/**/route.ts`; do not use legacy Pages API routes for new projects.

## User-Facing Finish

End with:

- live app URL
- health endpoint URL
- private GitHub repo URL
- where to edit the homepage
- where to add a page
- where to add an endpoint
- where to add a schema
- how to run locally
- whether Railway was used and why
- CI status

Keep this concise and nontechnical. Do not include raw tokens, secret values, or implementation noise.

## Resources

- `scripts/select-npm-version.ps1`: choose exact npm versions older than 7 days.
- `references/full-stack-notes.md`: composition and deployment notes.
- `assets/templates/`: agent policy, secret scan, CI, Netlify, Railway, page, API, schema, and test templates.

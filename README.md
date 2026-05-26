# Vibe Web Scaffold Skills

Opinionated Codex skills for quickly creating simple websites, REST APIs, and full-stack TypeScript apps with security-conscious defaults.

These scaffolds are for nontechnical builders, solo operators, small companies, and vibe coders who want to get a real project online without making dozens of setup decisions.

Repository slug: `vibe-web-scaffold-skills`

## What This Is

This repository contains three Codex skills:

- `scaffold-static-site` - create a static website, landing page, portfolio, documentation site, or simple company site.
- `scaffold-rest-api` - create a typed REST API with framework-native endpoints.
- `scaffold-full-stack` - create one app with pages and API endpoints.

The default stack is:

- Nuxt
- TypeScript
- npm
- Tailwind CSS v4 for site/app scaffolds
- Vitest
- Playwright
- GitHub Actions CI
- private GitHub repositories
- Netlify for first deploys
- Railway only when a database or persistent service is actually needed

Next.js is supported when explicitly requested, but Nuxt is the default.

## Design Goals

- Almost zero setup choices for the user.
- A project name is required; everything else is derived from it.
- Private GitHub repositories by default.
- No pasted tokens or credentials in chat.
- Local secret scanning from day one.
- CI that runs type checks, tests, builds, and browser/API tests.
- Agent instructions included in every generated project.

## Install

Install from a release zip, or clone this repository and copy the skill folders.

Windows PowerShell from a release zip:

```powershell
Expand-Archive .\scaffold-preferred-stack-skills.zip -DestinationPath "$env:USERPROFILE\.codex\skills" -Force
```

Windows PowerShell from a clone:

```powershell
Copy-Item .\skills\* "$env:USERPROFILE\.codex\skills" -Recurse -Force
```

macOS or Linux from a release zip:

```bash
unzip scaffold-preferred-stack-skills.zip -d ~/.codex/skills
```

macOS or Linux from a clone:

```bash
mkdir -p ~/.codex/skills
cp -R skills/* ~/.codex/skills/
```

Restart Codex after installing.

## Requirements For Generated Projects

The scaffolds are intentionally light for fresh systems.

Required:

- Node.js 24 LTS
- npm
- git
- GitHub CLI: `gh`
- Netlify CLI for Netlify deploys
- Railway CLI only when Railway is needed

Not required for normal first use:

- Docker
- Python
- gitleaks
- trivy
- semgrep
- local Playwright browser installs

The generated projects include a small no-dependency secret scanner that runs with Node.

## Usage Examples

Create a simple site:

```text
Use scaffold-static-site to create "Acme Plumbing"
```

Create an API:

```text
Use scaffold-rest-api to create "Invoice Status API"
```

Create a full-stack app:

```text
Use scaffold-full-stack to create "Client Portal"
```

The skill will ask for a project name if one is missing. It should not ask you to choose a framework, test runner, CSS framework, repository visibility, or hosting provider unless your request clearly needs an exception.

## Credential Safety

Do not paste credentials into Codex, Claude, ChatGPT, GitHub issues, pull requests, docs, or source files.

Use provider login flows instead:

```powershell
gh auth login
netlify login
railway login
```

Generated projects include:

- `AGENTS.md` with security and CI rules for AI coding agents.
- `CLAUDE.md` that imports `AGENTS.md` for Claude Code.
- `.env.example` with placeholders only.
- `.gitignore` additions for local secret files.
- `scripts/check-no-secrets.mjs`.
- `npm run secret:scan`.

## Generated Project Security Defaults

Generated projects are configured to:

- keep repositories private by default
- avoid raw secret handling in chat
- keep secrets out of browser-exposed variables
- use exact npm versions
- avoid `latest`, caret, and tilde dependency ranges
- select npm package versions published more than 7 days ago
- pin GitHub Actions by commit SHA
- run checks in CI
- have the agent inspect and fix failing CI where possible

These defaults reduce common mistakes, but they do not replace responsible account security, provider permissions, or application review.

## What Is Not Included By Default

The scaffolds do not add these unless requested:

- authentication
- analytics
- payments
- email
- file storage
- database
- ORM
- UI component kit
- external fonts
- icon library

This keeps the first project small, understandable, and easier to modify.

## Maintainer Validation

Before publishing a release, maintainers should run:

- official skill validation
- package extraction verification
- `gitleaks`
- `semgrep`
- `trivy`
- manifest/hash verification

These are release-maintainer checks. They are not required on a new user's machine just to create a project.

The current release artifact should be published through GitHub Releases. Do not commit historical zip archives to `main`.

## Current Skills

- `scaffold-static-site`
- `scaffold-rest-api`
- `scaffold-full-stack`

## Disclaimer

This is an opinionated scaffold, not a security product. It provides safer defaults and guardrails, but generated projects should still be reviewed before handling sensitive data, payments, private customer information, or production business workflows.

## License

MIT

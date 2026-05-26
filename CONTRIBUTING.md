# Contributing

This repository is intentionally opinionated. Contributions should keep the scaffolds small, secure, and low-choice for nontechnical builders.

## Principles

- Prefer fewer choices over more configuration.
- Keep generated projects understandable.
- Do not add dependencies unless they are clearly worth the supply-chain and maintenance cost.
- Use exact package versions in generated projects.
- Keep private repositories and safe credential handling as defaults.
- Avoid adding services such as auth, analytics, payments, email, storage, or databases unless a scaffold specifically requires them.

## Before Opening A Pull Request

- Validate each skill's `SKILL.md`.
- Check for secrets with `gitleaks` or an equivalent scanner.
- Review generated `AGENTS.md` changes carefully.
- Ensure public docs do not contain local paths, usernames, tokens, or private account details.

Do not commit generated release zips to `main`; attach release zips to GitHub Releases instead.

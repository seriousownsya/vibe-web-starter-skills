# Security Policy

## Reporting Security Issues

Please do not open public GitHub issues for leaked credentials, private tokens, private keys, vulnerable generated deployments, or other sensitive reports.

Report security issues privately through GitHub's private vulnerability reporting if it is enabled on the repository. If it is not enabled yet, contact the repository owner privately and include only the minimum details needed to reproduce the issue.

## Do Not Include Secrets

When reporting an issue, do not include:

- API keys
- access tokens
- private keys
- passwords
- cookies
- recovery codes
- `.env` contents
- screenshots that reveal secrets

If a credential may have been exposed, rotate it in the provider dashboard before sharing any report.

## Scope

In scope:

- credential leakage risks in the skill templates
- unsafe generated project defaults
- CI configuration issues that could expose secrets
- dependency or supply-chain risks in scaffold instructions
- project instructions that encourage unsafe AI agent behavior

Out of scope:

- vulnerabilities in third-party services such as GitHub, Netlify, Railway, Nuxt, Next.js, npm, Playwright, or Vitest
- generated applications that have been substantially modified after scaffolding
- social engineering, denial of service, or spam

## Maintainer Expectations

Before publishing a release, maintainers should run the release validation checks described in `README.md`, inspect the package contents, and publish only the current release artifact through GitHub Releases.

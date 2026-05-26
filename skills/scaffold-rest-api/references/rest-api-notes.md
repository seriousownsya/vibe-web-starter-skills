# REST API Notes

Use this reference when applying `scaffold-rest-api`.

## Official Sources Checked

- Nuxt server routes and `server/api`: https://nuxt.com/docs/4.x/directory-structure/server
- Nuxt directory structure and shared code: https://nuxt.com/docs/4.x/directory-structure
- Nuxt testing: https://nuxt.com/docs/4.x/getting-started/testing
- Next route handlers: https://nextjs.org/docs/app/getting-started/route-handlers
- Next backend-for-frontend guidance: https://nextjs.org/docs/app/guides/backend-for-frontend
- Netlify Nuxt guide: https://docs.netlify.com/build/frameworks/framework-setup-guides/nuxt/
- Railway Next.js with Postgres: https://docs.railway.com/guides/nextjs
- Railway CLI auth and tokens: https://docs.railway.com/cli/login
- Railway CLI deploys: https://docs.railway.com/cli/deploying
- Playwright CI: https://playwright.dev/docs/ci
- GitHub Actions hardening: https://docs.github.com/actions/security-guides/security-hardening-for-github-actions
- OpenAI Codex `AGENTS.md`: https://developers.openai.com/codex/guides/agents-md
- Claude Code `CLAUDE.md` and `AGENTS.md` import guidance: https://code.claude.com/docs/en/memory
- Node.js release schedule: https://github.com/nodejs/Release

## Deployment Rule

Use Netlify for simple serverless framework APIs and quick public URLs. Use Railway when the user needs a database, long-lived process, queue, worker, cron, private networking, or explicit Railway deployment. Prefer project-scoped `RAILWAY_TOKEN` for CI; use broader `RAILWAY_API_TOKEN` only when account/workspace operations are required.

## Response Headers

Keep `server/middleware/security-headers.ts` in Nuxt API projects. Netlify `[[headers]]` applies to CDN/static paths but did not consistently cover Nuxt serverless API responses during live testing.

## GitHub Actions Pins

The bundled CI template pins these action refs:

- `actions/checkout` v6 -> `de0fac2e4500dabe0009e67214ff5f5447ce83dd`
- `actions/setup-node` v6 -> `48b55a011bda9f5d6aeb4c2d9c7362e8dae4041e`

The generated CI does not upload Playwright artifacts by default. Keep the first-run workflow minimal and avoid extra JavaScript action/runtime surface unless a project actually needs artifacts.

Refresh pins before distributing a new package.

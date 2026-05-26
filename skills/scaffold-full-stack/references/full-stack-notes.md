# Full-Stack Notes

Use this reference when applying `scaffold-full-stack`.

## Official Sources Checked

- Nuxt directory structure: https://nuxt.com/docs/4.x/directory-structure
- Nuxt server routes and `server/api`: https://nuxt.com/docs/4.x/directory-structure/server
- Nuxt pages: https://nuxt.com/docs/4.x/guide/directory-structure/app/pages
- Next App Router installation: https://nextjs.org/docs/app/getting-started/installation
- Next project structure: https://nextjs.org/docs/app/getting-started/project-structure
- Next route handlers: https://nextjs.org/docs/app/getting-started/route-handlers
- Netlify deploys and CLI: https://docs.netlify.com/site-deploys/create-deploys/
- Netlify Nuxt guide: https://docs.netlify.com/build/frameworks/framework-setup-guides/nuxt/
- Railway CLI auth and tokens: https://docs.railway.com/cli/login
- Railway CLI deploys: https://docs.railway.com/cli/deploying
- Railway Next.js with Postgres: https://docs.railway.com/guides/nextjs
- Tailwind CSS Nuxt integration: https://tailwindcss.com/docs/installation/framework-guides/nuxt
- GitHub Actions hardening: https://docs.github.com/actions/security-guides/security-hardening-for-github-actions
- OpenAI Codex `AGENTS.md`: https://developers.openai.com/codex/guides/agents-md
- Claude Code `CLAUDE.md` and `AGENTS.md` import guidance: https://code.claude.com/docs/en/memory
- Node.js release schedule: https://github.com/nodejs/Release

## Runtime Decision

Use Netlify for the first visible deploy when the app is frontend plus serverless endpoints. Use Railway when the app has a database, long-running process, queue, worker, cron, private networking requirement, or persistent runtime. This is a reliability boundary, not a user preference prompt.

## Composition

This skill intentionally reuses the defaults from `scaffold-static-site` and `scaffold-rest-api`. Keep one app by default. Split services only when the runtime requirement is real.

Use Tailwind CSS v4 with the official Vite integration for styling. Keep the starter design local and small: CSS variables, system fonts, and a few components in `app/components`.

## Netlify SSR Notes

For Nuxt SSR on Netlify, keep `hookable` as a direct runtime dependency and inline `@unhead/vue`, `unhead`, and `hookable` in Nitro externals. Live testing found Netlify's function package could otherwise miss the head/runtime dependency graph and return a 500.

Keep `server/middleware/security-headers.ts` in Nuxt full-stack projects. Netlify `[[headers]]` applies to CDN/static paths but did not consistently cover Nuxt serverless API or SSR responses during live testing.

## GitHub Actions Pins

The bundled CI template pins these action refs:

- `actions/checkout` v6 -> `de0fac2e4500dabe0009e67214ff5f5447ce83dd`
- `actions/setup-node` v6 -> `48b55a011bda9f5d6aeb4c2d9c7362e8dae4041e`

The generated CI does not upload Playwright artifacts by default. Keep the first-run workflow minimal and avoid extra JavaScript action/runtime surface unless a project actually needs artifacts.

Refresh pins before distributing a new package.

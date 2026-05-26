# Static Site Notes

Use this reference when applying `scaffold-static-site`.

## Official Sources Checked

- Next.js App Router installation and TypeScript defaults: https://nextjs.org/docs/app/getting-started/installation
- Next.js project structure and `src/app`: https://nextjs.org/docs/app/getting-started/project-structure
- Nuxt directory structure: https://nuxt.com/docs/4.x/directory-structure
- Nuxt pages: https://nuxt.com/docs/4.x/guide/directory-structure/app/pages
- Nuxt testing: https://nuxt.com/docs/4.x/getting-started/testing
- Netlify Nuxt guide: https://docs.netlify.com/build/frameworks/framework-setup-guides/nuxt/
- Netlify deploys and CLI: https://docs.netlify.com/site-deploys/create-deploys/
- Playwright CI: https://playwright.dev/docs/ci
- Tailwind CSS Nuxt integration: https://tailwindcss.com/docs/installation/framework-guides/nuxt
- Vitest globals and TypeScript: https://vitest.dev/guide/learn/writing-tests.html
- GitHub Actions hardening: https://docs.github.com/actions/security-guides/security-hardening-for-github-actions
- OpenAI Codex `AGENTS.md`: https://developers.openai.com/codex/guides/agents-md
- Claude Code `CLAUDE.md` and `AGENTS.md` import guidance: https://code.claude.com/docs/en/memory
- Node.js release schedule: https://github.com/nodejs/Release

## Nuxt Defaults

Prefer Nuxt for static sites unless the user explicitly asks for React or Next. Use `app/pages/index.vue` so adding pages is file-based and easy to explain. Use `npm run generate` for static output and deploy `.output/public` to Netlify.

Use Tailwind CSS v4 with the official Vite integration for styling. Keep the starter design local and small: CSS variables, system fonts, and a few components in `app/components`.

## Next Static Variant

Use Next only when requested. Prefer App Router, TypeScript, `src/app`, and `output: 'export'` for static Netlify hosting. Do not add API route handlers in this skill; switch to `scaffold-rest-api` or `scaffold-full-stack` when the user needs endpoints.

## GitHub Actions Pins

The bundled CI template pins these action refs:

- `actions/checkout` v6 -> `de0fac2e4500dabe0009e67214ff5f5447ce83dd`
- `actions/setup-node` v6 -> `48b55a011bda9f5d6aeb4c2d9c7362e8dae4041e`

The generated CI does not upload Playwright artifacts by default. Keep the first-run workflow minimal and avoid extra JavaScript action/runtime surface unless a project actually needs artifacts.

Refresh pins before distributing a new package.

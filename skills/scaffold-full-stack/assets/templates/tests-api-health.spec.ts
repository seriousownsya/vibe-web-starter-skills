import { expect, test } from '@playwright/test'

test('health endpoint returns ok', async ({ request }) => {
  const response = await request.get('/api/health')

  expect(response.ok()).toBe(true)
  await expect(response.json()).resolves.toEqual({ ok: true, service: 'app' })
})

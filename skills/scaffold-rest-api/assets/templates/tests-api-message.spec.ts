import { expect, test } from '@playwright/test'

test('message endpoint validates and echoes input', async ({ request }) => {
  const response = await request.post('/api/message', {
    data: { message: 'hello' },
  })

  expect(response.ok()).toBe(true)
  const body = await response.json()
  expect(body.message).toBe('hello')
  expect(typeof body.receivedAt).toBe('string')
})

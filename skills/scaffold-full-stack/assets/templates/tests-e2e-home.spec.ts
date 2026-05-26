import { expect, test } from '@playwright/test'

test('home page renders API-backed content', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { level: 1 })).toContainText('Project workspace')
  await expect(page.getByText('Connected')).toBeVisible()
})

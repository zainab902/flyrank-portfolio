import { test, expect } from '@playwright/test';

test.describe('Primary Flow E2E Walkthrough', () => {
  test('User can navigate home and interact with assistant', async ({ page }) => {
    await page.goto('/');

    // Check heading
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    // Check chat header text
    await expect(page.getByText('Portfolio Assistant AI')).toBeVisible();

    // Click quick action prompt
    const promptBtn = page.getByRole('button', { name: /What stack & tools are used in this portfolio\?/i });
    await expect(promptBtn).toBeVisible();
    await promptBtn.click();
  });
});
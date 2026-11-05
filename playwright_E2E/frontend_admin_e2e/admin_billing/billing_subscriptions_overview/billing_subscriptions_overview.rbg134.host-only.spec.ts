// RBG134: authenticated Next.js host-only regression (NOT EXECUTED in source archive).
import { test, expect } from '@playwright/test';
test('auto-renew confirmation can be dismissed by Escape without a backend mutation', async ({page}) => {
  let writes = 0;
  page.on('request', request => {
    if (request.url().includes('/admin/subscriptions/toggleAutoRenew') && request.method() === 'POST') writes++;
  });
  await page.goto('/admin/subscriptions/overview');
  const toggle = page.locator('main > section').first().getByRole('button');
  await expect(toggle).toBeVisible();
  await toggle.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toHaveAttribute('aria-modal','true');
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  expect(writes).toBe(0);
});

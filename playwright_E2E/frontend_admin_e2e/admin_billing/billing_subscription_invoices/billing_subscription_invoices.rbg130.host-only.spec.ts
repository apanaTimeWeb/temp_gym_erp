// HOST-ONLY: requires a real authenticated tenant, application routes, seeded invoice fixtures,
// and functioning Next.js/Playwright test infrastructure. NOT EXECUTED in RBG130.
import { test, expect } from '@playwright/test';

test('invoice page deep-link recovers from a page beyond the last invoice', async ({ page }) => {
  await page.goto('/frontend_admin/admin_billing/billing_subscription_invoices?page=100000');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page).not.toHaveURL(/(?:\?|&)page=100000(?:&|$)/);
  await expect(page.getByRole('navigation')).toBeVisible();
});

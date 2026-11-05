// HOST-ONLY: requires the real authenticated app, seeded billing fixtures and backend test tenant.
// NOT EXECUTED during isolated RBG129 source-level verification.
import { test, expect } from '@playwright/test';
test('payment-method removal requires an explicit confirmation before a write', async ({ page }) => {
  await page.goto('/frontend_admin/admin_billing/billing_subscription_payment_methods');
  const remove = page.locator('[data-testid^="admin_subscriptions-admin_subscriptions-payment-method-click-2-map34-"]:not([disabled])').first();
  await expect(remove).toBeVisible();
  const requests: string[] = [];
  page.on('request', request => { if (request.url().includes('/admin/subscriptions/removePaymentMethod')) requests.push(request.url()); });
  await remove.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.getByRole('dialog').press('Escape');
  expect(requests).toHaveLength(0);
});

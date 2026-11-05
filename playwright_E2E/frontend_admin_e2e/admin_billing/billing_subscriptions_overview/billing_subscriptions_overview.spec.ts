// Responsibility: host-runtime workflow test for the owning autonomous Billing leaf.
import { test, expect } from '@playwright/test';

function requireHostAuth() {
  if (!process.env.PLAYWRIGHT_AUTH_STATE) {
    if (process.env.CI) throw new Error('CI requires PLAYWRIGHT_AUTH_STATE pointing to a host-generated authenticated storage-state file.');
    test.skip(true, 'Host-authenticated storage state is required; provide PLAYWRIGHT_AUTH_STATE.');
  }
}

test.describe('billing_subscriptions_overview', () => {
  test('subscription retry recovers from a transient read failure', async ({ page }) => {
    requireHostAuth();
    let failedFirstSubscriptionRead = false;
    await page.route('**/admin/subscriptions/fetchSubscription*', async (route) => {
      if (!failedFirstSubscriptionRead && route.request().method() === 'GET') {
        failedFirstSubscriptionRead = true;
        await route.abort('failed');
        return;
      }
      await route.continue();
    });
    await page.goto('/frontend_admin/admin_billing/billing_subscriptions_overview', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/\/frontend_admin\/admin_billing\/billing_subscriptions_overview(?:\?.*)?$/);
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
    const error = page.getByRole('alert').filter({ has: page.getByRole('button') }).first();
    await expect(error).toBeVisible();
    const retry = error.getByRole('button');
    const recoveredRead = page.waitForResponse((response) => response.request().resourceType() !== 'document' && response.url().includes('/admin/subscriptions/fetchSubscription') && response.status() === 200);
    await retry.click();
    await recoveredRead;
    await expect(error).toHaveCount(0);
  });
});

// Responsibility: host-runtime workflow test for the owning autonomous Billing leaf.
import { test, expect } from '@playwright/test';

function requireHostAuth() {
  if (!process.env.PLAYWRIGHT_AUTH_STATE) {
    if (process.env.CI) throw new Error('CI requires PLAYWRIGHT_AUTH_STATE pointing to a host-generated authenticated storage-state file.');
    test.skip(true, 'Host-authenticated storage state is required; provide PLAYWRIGHT_AUTH_STATE.');
  }
}

test.describe('billing_subscription_plans', () => {
  test('plans route resolves to plan cards or its documented empty state, never an error state', async ({ page }) => {
    requireHostAuth();
    await page.goto('/frontend_admin/admin_billing/billing_subscription_plans', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/\/frontend_admin\/admin_billing\/billing_subscription_plans(?:\?.*)?$/);
    await expect(page.getByRole('heading', { level: 1, name: /plans/i })).toBeVisible();
    const planCards = page.locator('[data-testid^="admin_subscriptions-admin_subscriptions-plan-card-click"]');
    const emptyState = page.getByText(/No plans are available|कोई प्लान उपलब्ध नहीं है/i);
    const plansError = page.getByRole('alert').filter({ has: page.getByRole('button', { name: /retry|पुनः प्रयास/i }) });
    await expect(plansError).toHaveCount(0);
    await expect.poll(async () => (await planCards.count()) > 0 || await emptyState.count() > 0).toBe(true);
    if (await planCards.count() > 0) await expect(planCards.first()).toBeVisible();
    else await expect(emptyState).toBeVisible();
  });
});

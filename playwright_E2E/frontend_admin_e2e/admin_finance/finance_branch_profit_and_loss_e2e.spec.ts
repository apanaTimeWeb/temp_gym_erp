// RESPONSIBILITY: Defines regression tests for finance_branch_profit_and_loss_e2e.spec; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (frontend_admin_e2e/admin_finance/finance_branch_profit_and_loss_e2e.spec.ts)
import { test, expect } from '@playwright/test';

const requireAuth = () => {
  if (!process.env.PLAYWRIGHT_AUTH_STATE) {
    if (process.env.CI) throw new Error('CI requires PLAYWRIGHT_AUTH_STATE pointing to a host-generated authenticated storage-state file.');
    test.skip(true, 'Host-authenticated storage state is required; provide PLAYWRIGHT_AUTH_STATE.');
  }
};

test.describe('Finance branch profit and loss', () => {
  test('canonical route renders the feature and retains its report controls', async ({ page }) => {
    requireAuth();
    await page.goto('/frontend_admin/admin_finance/finance_branch_profit_and_loss', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/\/frontend_admin\/admin_finance\/finance_branch_profit_and_loss(?:\?.*)?$/);
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
    await expect(page.locator('button').filter({ hasText: /export/i }).first()).toBeVisible();
  });

});

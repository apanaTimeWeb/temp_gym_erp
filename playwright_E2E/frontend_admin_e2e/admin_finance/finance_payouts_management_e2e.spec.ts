// RESPONSIBILITY: Defines regression tests for finance_payouts_management_e2e.spec; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (frontend_admin_e2e/admin_finance/finance_payouts_management_e2e.spec.ts)
import { test, expect } from '@playwright/test';

/** Module-owned UI workflow test. Runtime execution requires the host app and a real authenticated state. */
test.describe('Finance payouts management', () => {
  test('payout sortable headers expose and update sort state', async ({ page }) => {
    if (!process.env.PLAYWRIGHT_AUTH_STATE) {
      if (process.env.CI) throw new Error('CI requires PLAYWRIGHT_AUTH_STATE pointing to a host-generated authenticated storage-state file.');
      test.skip(true, 'Host-authenticated storage state is required; provide PLAYWRIGHT_AUTH_STATE.');
    }
    await page.goto('/frontend_admin/admin_finance/finance_payouts_management', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/\/frontend_admin\/admin_finance\/finance_payouts_management(?:\?.*)?$/);
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
    const sortableHeader = page.locator('table thead th[tabindex="0"]').first();
    await expect(sortableHeader).toBeVisible();
    await sortableHeader.click();
    await expect(sortableHeader).toHaveAttribute('aria-sort', /ascending|descending/);
  });
});

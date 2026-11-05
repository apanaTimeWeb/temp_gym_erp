// RBG108 host-only regression. Requires the authenticated Next.js Admin host.
// Authenticated browser and backend execution are NOT claimed by this authored spec.
import { test, expect } from '@playwright/test';
function requireHostAuth() {
  if (!process.env.PLAYWRIGHT_AUTH_STATE) {
    if (process.env.CI) throw new Error('CI requires PLAYWRIGHT_AUTH_STATE for authenticated Admin E2E.');
    test.skip(true, 'Host-authenticated state not available in the leaf ZIP.');
  }
}
test.describe('Sales pending payments — date and keyboard recovery', () => {
  test('invalid custom date has an associated screen-reader error', async ({ page }) => {
    requireHostAuth();
    await page.goto('/frontend_admin/admin_sales/sales_pending_payments?range=custom&startDate=2026-02-30&endDate=2026-03-01');
    const start = page.getByTestId('admin_sales-custom-start-date');
    const end = page.getByTestId('admin_sales-custom-end-date');
    await expect(start).toHaveAttribute('aria-invalid', 'true');
    await expect(end).not.toHaveAttribute('min');
    const id = await start.getAttribute('aria-describedby');
    expect(id).toBeTruthy();
    await expect(page.locator(`[id="${id}"]`)).toHaveAttribute('role', 'status');
  });
  test('recover out-of-range pagination after a verified successful list response', async ({ page }) => {
    requireHostAuth();
    await page.goto('/frontend_admin/admin_sales/sales_pending_payments?range=monthly&page=100000');
    // This expectation needs a successful authenticated API response from the host.
    await expect(page).toHaveURL(/(?:\?|&)page=1(?:&|$)/);
  });
});

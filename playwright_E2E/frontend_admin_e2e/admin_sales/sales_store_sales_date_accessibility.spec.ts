// Host-only regression specification. Not executed without authenticated Next.js host.
import { test, expect } from '@playwright/test';
function hostAuth() {
  if (!process.env.PLAYWRIGHT_AUTH_STATE) {
    if (process.env.CI) throw new Error('Authenticated host E2E requires PLAYWRIGHT_AUTH_STATE');
    test.skip(true, 'Host auth state is unavailable in autonomous leaf');
  }
}
test.describe('Sales Store Sales — date and pagination', () => {
  test('invalid custom date exposes associated accessible error', async ({ page }) => {
    hostAuth();
    await page.goto('/frontend_admin/admin_sales/sales_store_sales?range=custom&startDate=2026-02-30&endDate=2026-03-01');
    const start = page.getByTestId('admin_sales-custom-start-date');
    const end = page.getByTestId('admin_sales-custom-end-date');
    await expect(start).toHaveAttribute('aria-invalid', 'true');
    await expect(end).not.toHaveAttribute('min');
    const id = await start.getAttribute('aria-describedby');
    expect(id).toBeTruthy();
    await expect(page.locator(`[id="${id}"]`)).toHaveAttribute('role', 'status');
  });
  test('reconciles invalid page after a successful order response', async ({ page }) => {
    hostAuth();
    await page.goto('/frontend_admin/admin_sales/sales_store_sales?range=monthly&page=100000');
    await expect(page).toHaveURL(/(?:\?|&)page=1(?:&|$)/);
  });
});

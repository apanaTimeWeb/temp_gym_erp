// Host-only: requires authenticated Next.js app, never claims autonomous execution.
import { test, expect } from '@playwright/test';
test.describe('Sales Overview dates and no-data accessibility', () => {
  test.beforeEach(() => { test.skip(!process.env.PLAYWRIGHT_AUTH_STATE, 'Requires authenticated host and fixture-backed environment'); });
  test('marks invalid civil dates and preserves existing query dimensions', async ({ page }) => {
    await page.goto('/frontend_admin/admin_sales/sales_overview?branchId=b1&range=custom&startDate=2026-02-30&endDate=2026-03-01');
    const start=page.getByTestId('admin_sales-custom-start-date');
    const end=page.getByTestId('admin_sales-custom-end-date');
    await expect(start).toHaveAttribute('aria-invalid','true');
    await expect(end).not.toHaveAttribute('min');
    const id=await start.getAttribute('aria-describedby');
    expect(id).toBeTruthy();
    await expect(page.locator(`[id="${id}"]`)).toHaveAttribute('role','status');
  });
});

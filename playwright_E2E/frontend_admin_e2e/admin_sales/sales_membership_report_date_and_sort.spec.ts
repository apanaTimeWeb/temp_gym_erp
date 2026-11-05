// HOST ONLY: requires a real authenticated Next.js app with report fixtures; not autonomously executed.
import { test, expect } from '@playwright/test';

test.describe('Sales Membership Report filter and sort accessibility', () => {
  test.beforeEach(() => { test.skip(!process.env.PLAYWRIGHT_AUTH_STATE, 'Authenticated host and fixtures required'); });
  test('rejects impossible date input and associates its validation status', async ({ page }) => {
    await page.goto('/frontend_admin/admin_sales/sales_membership_report?branchId=b1&range=custom&startDate=2026-02-30&endDate=2026-03-01');
    const start = page.getByTestId('admin_sales-custom-start-date');
    const end = page.getByTestId('admin_sales-custom-end-date');
    await expect(start).toHaveAttribute('aria-invalid', 'true');
    await expect(end).not.toHaveAttribute('min');
    const id = await start.getAttribute('aria-describedby');
    expect(id).toBeTruthy();
    await expect(page.locator(`[id="${id}"]`)).toHaveAttribute('role', 'status');
  });
  test('exposes the active sort on the column header, not on its button', async ({ page }) => {
    await page.goto('/frontend_admin/admin_sales/sales_membership_report');
    const header = page.getByRole('columnheader', { name: /receivable/i });
    await expect(header).toHaveAttribute('aria-sort', 'descending');
    await expect(header.getByRole('button')).not.toHaveAttribute('aria-sort');
  });
});

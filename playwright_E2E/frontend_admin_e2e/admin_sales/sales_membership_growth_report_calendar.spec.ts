// RBG107 host-only browser regression: requires real authenticated Admin state + running Next.js host.
// This suite is authored, NOT executed in the isolated role-archive environment.
import { test, expect } from '@playwright/test';

function requireHostAuth() {
  if (!process.env.PLAYWRIGHT_AUTH_STATE) {
    if (process.env.CI) throw new Error('CI requires PLAYWRIGHT_AUTH_STATE for the real host-authenticated Admin session.');
    test.skip(true, 'Host-authenticated storage-state fixture is not available.');
  }
}

test.describe('Sales Membership Growth — custom calendar', () => {
  test('month navigation and cross-boundary keyboard focus do not snap back', async ({ page }) => {
    requireHostAuth();
    await page.goto('/frontend_admin/admin_sales/sales_membership_growth_report?range=custom&startDate=2026-10-31');
    const trigger = page.getByTestId('admin-sales-membership-growth-date-range-trigger');
    await expect(trigger).toBeVisible();
    await trigger.click();
    const oct31 = page.getByTestId('admin-sales-membership-growth-calendar-day-2026-10-31');
    await expect(oct31).toBeFocused();
    await page.keyboard.press('ArrowRight');
    await expect(page.getByRole('grid', { name: 'November 2026' })).toBeVisible();
    await expect(page.getByTestId('admin-sales-membership-growth-calendar-day-2026-11-01')).toBeFocused();
    await page.getByRole('button', { name: 'Next month' }).click();
    await expect(page.getByRole('grid', { name: 'December 2026' })).toBeVisible();
    await page.getByRole('button', { name: 'Previous month' }).click();
    await expect(page.getByRole('grid', { name: 'November 2026' })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(trigger).toBeFocused();
    await expect(page.getByRole('dialog')).toHaveCount(0);
  });

  test('two-date selection sends an inclusive range in the existing URL contract', async ({ page }) => {
    requireHostAuth();
    await page.goto('/frontend_admin/admin_sales/sales_membership_growth_report?range=custom&startDate=2026-10-01&endDate=2026-10-20');
    await page.getByTestId('admin-sales-membership-growth-date-range-trigger').click();
    await page.getByTestId('admin-sales-membership-growth-calendar-day-2026-10-12').click();
    await page.getByTestId('admin-sales-membership-growth-calendar-day-2026-10-15').click();
    await expect(page).toHaveURL(/(?:\?|&)startDate=2026-10-12(?:&|$)/);
    await expect(page).toHaveURL(/(?:\?|&)endDate=2026-10-15(?:&|$)/);
    await expect(page.getByRole('dialog')).toHaveCount(0);
  });
});

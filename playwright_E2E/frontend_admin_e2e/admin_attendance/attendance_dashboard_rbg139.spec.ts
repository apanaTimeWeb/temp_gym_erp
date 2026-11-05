import { test, expect } from '@playwright/test';

test.describe('RBG139 attendance dashboard host-only filter continuity', () => {
  test('restores search after authenticated browser history navigation', async ({ page }) => {
    if (!process.env.PLAYWRIGHT_AUTH_STATE) {
      if (process.env.CI) throw new Error('PLAYWRIGHT_AUTH_STATE is required in CI for authenticated admin tests.');
      test.skip(true, 'Requires authorized host app and authenticated state.');
    }
    await page.goto('/frontend_admin/admin_attendance/attendance_dashboard?search=RBG139', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/search=RBG139/);
    await page.goto('/frontend_admin/admin_attendance/attendance_dashboard?status=late', { waitUntil: 'domcontentloaded' });
    await page.goBack({ waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/search=RBG139/);
  });
});

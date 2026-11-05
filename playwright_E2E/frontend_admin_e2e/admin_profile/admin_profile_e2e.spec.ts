// RESPONSIBILITY: Defines regression tests for admin_profile_e2e.spec; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (frontend_admin_e2e/admin_profile/admin_profile_e2e.spec.ts)
import { test, expect } from '@playwright/test';

/** Module-owned UI workflow test. Runtime execution requires the host app and a real authenticated state. */
test.describe('admin_profile', () => {
  test('profile tabs switch between personal and security forms', async ({ page }) => {
    if (!process.env.PLAYWRIGHT_AUTH_STATE) {
      if (process.env.CI) throw new Error('CI requires PLAYWRIGHT_AUTH_STATE pointing to a host-generated authenticated storage-state file.');
      test.skip(true, 'Host-authenticated storage state is required; provide PLAYWRIGHT_AUTH_STATE.');
    }
    await page.goto('/frontend_admin/admin_profile', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/\/frontend_admin\/admin_profile\/profile_overview(?:\?.*)?$/);
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
    const securityTab = page.getByTestId('admin_profile-tabs-security');
    await expect(securityTab).toBeVisible();
    await securityTab.click();
    await expect(page.getByTestId('admin_profile-security-form')).toBeVisible();
    const personalTab = page.getByTestId('admin_profile-tabs-personal');
    await personalTab.click();
    await expect(page.getByTestId('admin_profile-personal-form')).toBeVisible();
  });
});

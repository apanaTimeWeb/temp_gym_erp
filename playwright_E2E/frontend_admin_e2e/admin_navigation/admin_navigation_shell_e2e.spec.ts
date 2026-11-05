// RESPONSIBILITY: Defines regression tests for the Admin Navigation shell; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (frontend_admin_e2e/admin_navigation/admin_navigation_shell_e2e.spec.ts)
import { test, expect } from '@playwright/test';

test.describe('admin_navigation shell', () => {
  test('shell search has an accessible name and the sidebar toggle remains actionable', async ({ page }) => {
    if (!process.env.PLAYWRIGHT_AUTH_STATE) {
      if (process.env.CI) throw new Error('CI requires PLAYWRIGHT_AUTH_STATE pointing to a host-generated authenticated storage-state file.');
      test.skip(true, 'Host-authenticated storage state is required; provide PLAYWRIGHT_AUTH_STATE.');
    }
    await page.goto('/frontend_admin/admin_members', { waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
    const search = page.locator('[data-testid="admin_navigation-admin-sidebar-control"]');
    await expect(search).toBeVisible();
    expect((await search.getAttribute('aria-label'))?.trim().length).toBeGreaterThan(0);
    const toggle = page.getByTestId('admin_navigation-admin-header-sidebar-toggle');
    await expect(toggle).toBeVisible();
    await toggle.click();
    await expect(page.locator('[data-admin-shell-sidebar]')).toBeVisible();
  });
});

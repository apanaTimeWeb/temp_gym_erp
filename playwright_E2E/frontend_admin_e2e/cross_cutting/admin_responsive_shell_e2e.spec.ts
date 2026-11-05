// RESPONSIBILITY: Defines regression tests for admin_responsive_shell_e2e.spec; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (frontend_admin_e2e/cross_cutting/admin_responsive_shell_e2e.spec.ts)
import { test, expect } from '@playwright/test';

function requireHostAuth() {
  if (!process.env.PLAYWRIGHT_AUTH_STATE) {
    if (process.env.CI) throw new Error('CI requires PLAYWRIGHT_AUTH_STATE pointing to a host-generated authenticated storage-state file.');
    test.skip(true, 'Host-authenticated storage state is required; provide PLAYWRIGHT_AUTH_STATE.');
  }
}

test.describe('Admin responsive shell contract', () => {
  for (const width of [320, 375, 768, 1024, 1280, 1440]) {
    test(`dashboard remains viewport-contained at ${width}px`, async ({ page }) => {
      requireHostAuth();
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/frontend_admin/admin_dashboard', { waitUntil: 'domcontentloaded' });
      await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
      const dimensions = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, body: document.body.scrollWidth, root: document.documentElement.scrollWidth }));
      expect(dimensions.body, `body overflow at ${width}px`).toBeLessThanOrEqual(dimensions.viewport + 1);
      expect(dimensions.root, `document overflow at ${width}px`).toBeLessThanOrEqual(dimensions.viewport + 1);
      const toggle = page.getByTestId('admin_navigation-admin-header-sidebar-toggle');
      if (width < 768) await expect(toggle).toBeVisible();
    });
  }

  test('sidebar toggle supports keyboard focus and escape closes mobile navigation', async ({ page }) => {
    requireHostAuth();
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/frontend_admin/admin_dashboard', { waitUntil: 'domcontentloaded' });
    const toggle = page.getByTestId('admin_navigation-admin-header-sidebar-toggle');
    await toggle.focus();
    await expect(toggle).toBeFocused();
    await toggle.click();
    await expect(page.locator('[data-admin-shell-sidebar]')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(toggle).toBeFocused();
  });
});

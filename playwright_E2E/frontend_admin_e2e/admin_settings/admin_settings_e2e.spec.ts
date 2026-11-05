// RESPONSIBILITY: Defines regression tests for admin_settings_e2e.spec; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (frontend_admin_e2e/admin_settings/admin_settings_e2e.spec.ts)
import { test, expect } from '@playwright/test';

/** Module-owned UI workflow test. Runtime execution requires the host app and a real authenticated state. */
test.describe('admin_settings', () => {
  test('settings navigation updates the tab URL and renders the matching form', async ({ page }) => {
    if (!process.env.PLAYWRIGHT_AUTH_STATE) {
      if (process.env.CI) throw new Error('CI requires PLAYWRIGHT_AUTH_STATE pointing to a host-generated authenticated storage-state file.');
      test.skip(true, 'Host-authenticated storage state is required; provide PLAYWRIGHT_AUTH_STATE.');
    }
    await page.goto('/frontend_admin/admin_settings', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/\/frontend_admin\/admin_settings\/settings_management(?:\?.*)?$/);
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();

    const nav = page.locator('[data-testid^="admin_settings-admin_settings-nav-click-map28-"]');
    await expect(nav).toHaveCount(7);
    await nav.nth(1).click();
    await expect(page).toHaveURL(/(?:\?|&)tab=notifications(?:&|$)/);
    await expect(page.locator('[data-testid="admin_settings-admin_settings-notifications-control"]')).toBeVisible();

    const eventSortHeader = page.locator('[data-testid="admin_settings-admin_settings-notifications-control-4"]');
    await expect(eventSortHeader).toHaveAttribute('aria-sort', /ascending|descending/);
    const initialSort = await eventSortHeader.getAttribute('aria-sort');
    await eventSortHeader.getByRole('button').click();
    await expect(eventSortHeader).not.toHaveAttribute('aria-sort', initialSort ?? '');

    await nav.nth(0).click();
    await expect(page).toHaveURL(/(?:\?|&)tab=profile(?:&|$)/);
    await expect(page.locator('[data-testid="admin_settings-admin_settings-gym-profile-control"]')).toBeVisible();
  });
});

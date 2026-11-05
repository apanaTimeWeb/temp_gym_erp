// RESPONSIBILITY: Defines regression tests for admin_members_e2e.spec; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (frontend_admin_e2e/admin_members/admin_members_e2e.spec.ts)
import { test, expect } from '@playwright/test';

/** Module-owned UI workflow test. Runtime execution requires the host app and a real authenticated state. */
test.describe('admin_members', () => {
  test('member search preserves its query and renders the matching no-results state', async ({ page }) => {
    if (!process.env.PLAYWRIGHT_AUTH_STATE) {
      if (process.env.CI) throw new Error('CI requires PLAYWRIGHT_AUTH_STATE pointing to a host-generated authenticated storage-state file.');
      test.skip(true, 'Host-authenticated storage state is required; provide PLAYWRIGHT_AUTH_STATE.');
    }
    await page.goto('/frontend_admin/admin_members', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/\/frontend_admin\/admin_members\/members_directory(?:\?.*)?$/);
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
    const search = page.locator('[data-testid="admin_members-admin_members-header-search-search"]');
    await expect(search).toBeVisible();
    await search.fill('e2e-query-no-match');
    await expect(search).toHaveValue('e2e-query-no-match');
    await expect(page.locator('[data-testid="admin_members-admin_members-empty-state-state"]')).toBeVisible();
  });
});

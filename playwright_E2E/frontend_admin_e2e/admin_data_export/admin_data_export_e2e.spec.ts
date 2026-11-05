// RESPONSIBILITY: Defines regression tests for admin_data_export_e2e.spec; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (frontend_admin_e2e/admin_data_export/admin_data_export_e2e.spec.ts)
import { test, expect } from '@playwright/test';

/** Module-owned UI workflow test. Runtime execution requires the host app and a real authenticated state. */
test.describe('admin_data_export', () => {
  test('data export explicitly explains the missing contract and does not fabricate controls', async ({ page }) => {
    if (!process.env.PLAYWRIGHT_AUTH_STATE) {
      if (process.env.CI) throw new Error('CI requires PLAYWRIGHT_AUTH_STATE pointing to a host-generated authenticated storage-state file.');
      test.skip(true, 'Host-authenticated storage state is required; provide PLAYWRIGHT_AUTH_STATE.');
    }
    await page.goto('/frontend_admin/admin_data_export', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/\/frontend_admin\/admin_data_export\/data_export_requests(?:\?.*)?$/);
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
    await expect(page.locator('[data-testid="admin_data_export-admin_data_export-main-state"]')).toBeVisible();
    const blocker = page.locator('#data-export-scope-heading');
    await expect(blocker).toBeVisible();
    await expect(blocker).toContainText(/BLOCKED BY SUPPLIED SCOPE|प्रदत्त स्कोप द्वारा अवरुद्ध/i);
    const scopePanel = page.locator('section[aria-labelledby="data-export-scope-heading"]');
    await expect(scopePanel).toContainText(/request\/response contract|अनुरोध\/उत्तर कॉन्ट्रैक्ट/i);
    await expect(scopePanel).toContainText(/No invented export controls are exposed|कोई काल्पनिक निर्यात नियंत्रण/i);
    // The absent controls are asserted only after verifying the explicit, documented scope blocker above.
    await expect(page.locator('button[type="submit"], a[download]')).toHaveCount(0);
  });
});

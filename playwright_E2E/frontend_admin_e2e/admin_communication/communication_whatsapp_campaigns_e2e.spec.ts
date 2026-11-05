// RESPONSIBILITY: Defines regression tests for communication_whatsapp_campaigns_e2e.spec; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (frontend_admin_e2e/admin_communication/communication_whatsapp_campaigns_e2e.spec.ts)
import { test, expect } from '@playwright/test';

/** Module-owned UI workflow test. Runtime execution requires the host app and a real authenticated state. */
test.describe('Communication WhatsApp campaigns', () => {
  test('campaign queue remains unavailable until prerequisites are satisfied', async ({ page }) => {
    if (!process.env.PLAYWRIGHT_AUTH_STATE) {
      if (process.env.CI) throw new Error('CI requires PLAYWRIGHT_AUTH_STATE pointing to a host-generated authenticated storage-state file.');
      test.skip(true, 'Host-authenticated storage state is required; provide PLAYWRIGHT_AUTH_STATE.');
    }
    await page.goto('/frontend_admin/admin_communication/communication_whatsapp_campaigns', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/\/frontend_admin\/admin_communication\/communication_whatsapp_campaigns(?:\?.*)?$/);
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
    const composer = page.locator('[data-testid="admin_campaigns-admin_campaigns-composer"]');
    await expect(composer).toBeVisible();
    const queueAction = page.locator('[data-testid="admin_campaigns-admin_campaigns-main-click-2"]');
    await expect(queueAction).toBeVisible();
    await expect(queueAction).toBeDisabled();
    const message = composer.locator('textarea').first();
    await expect(message).toBeVisible();
    await message.fill('E2E draft only — not queued');
    await expect(message).toHaveValue('E2E draft only — not queued');
    await expect(queueAction).toBeDisabled();
  });
});

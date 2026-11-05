// Host-only regression specification; not executed in this source-only environment.
import { test, expect } from '@playwright/test';

test('audit logs filter keyboard navigation and redaction boundary', async ({ page }) => {
  await page.goto('/frontend_admin/admin_security/security_audit_logs_explorer');
  await expect(page.locator('main')).toBeVisible();
  const actorDropdown = page.getByTestId('admin_audit_logs-admin_audit_logs-toolbar-change');
  await actorDropdown.click();
  const actorSearch = page.getByTestId('admin_audit_logs-admin_audit_logs-toolbar-change-search');
  await actorSearch.press('End');
  await actorSearch.press('Enter');
  await expect(actorDropdown).toHaveAttribute('aria-expanded', 'false');
  await expect(actorDropdown).toBeFocused();
  await expect(page.locator('body')).not.toContainText(/Bearer\s+[A-Za-z0-9_-]{12,}/);
});

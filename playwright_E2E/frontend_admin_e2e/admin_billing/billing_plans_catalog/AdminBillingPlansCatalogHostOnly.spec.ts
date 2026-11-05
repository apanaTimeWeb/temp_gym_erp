// HOST-ONLY regression: requires an authenticated English-locale admin host with a seeded deletable plan.
// Not executed in the source-only RBG133 environment. This test never approves a destructive write.
import { test, expect } from '@playwright/test';

test('cancelled plan deletion does not issue a backend delete request', async ({ page }) => {
  let deleteRequests = 0;
  page.on('request', (request) => {
    if (/\/admin\/plans\/deletePlan(?:[?#]|$)/.test(request.url())) deleteRequests += 1;
  });
  await page.goto('/frontend_admin/admin_billing/billing_plans_catalog');
  const deleteButton = page.getByRole('button', { name: /delete/i }).first();
  await expect(deleteButton).toBeVisible();
  await deleteButton.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await dialog.getByRole('button', { name: /cancel/i }).click();
  await expect(dialog).toHaveCount(0);
  expect(deleteRequests).toBe(0);
});

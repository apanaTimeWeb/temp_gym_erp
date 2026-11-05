// Host-only spec: requires mounted Next.js host, authenticated Admin fixture and backend/MSW configuration.
import { test, expect } from '@playwright/test';
test('plan revenue period selector exposes its selection', async ({ page }) => {
  await page.goto('/frontend_admin/admin_finance/finance_plan_revenue_analytics');
  await expect(page.locator('button[aria-pressed="true"]')).toHaveCount(1);
  const options = page.locator('button[aria-pressed]');
  await expect(options).toHaveCount(4);
  await options.nth(1).click();
  await expect(options.nth(1)).toHaveAttribute('aria-pressed', 'true');
});

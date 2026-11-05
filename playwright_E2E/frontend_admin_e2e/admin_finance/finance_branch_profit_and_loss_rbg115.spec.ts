// HOST-ONLY: requires authenticated Next.js application, fixture-backed P&L API and Playwright.
import { test, expect } from '@playwright/test';
test('P&L period change and expanded-row disclosure retain semantics', async ({ page }) => {
  await page.goto('/frontend_admin/admin_finance/finance_branch_profit_and_loss');
  await expect(page.locator('button[aria-pressed="true"]')).toHaveCount(1);
  const period = page.locator('button[aria-pressed]');
  await period.nth(2).click();
  await expect(period.nth(2)).toHaveAttribute('aria-pressed', 'true');
  const rowButton = page.locator('button[data-testid^="admin_finance-admin_finance-pnl-table-expand-"]').first();
  await rowButton.click();
  await expect(rowButton).toHaveAttribute('aria-expanded', 'true');
  const controls = await rowButton.getAttribute('aria-controls');
  expect(controls).toBeTruthy();
  await expect(page.locator('tr[id]').filter({ has: page.locator('[class*="grid"]') }).first()).toHaveAttribute('id', controls!);
});

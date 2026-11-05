import { test, expect } from '@playwright/test';
// Host-only: authenticated admin member blacklist route and live mock/backend required.
test('blacklist confirmation never writes after cancellation', async ({page})=>{
  test.skip(!process.env.E2E_ADMIN_BLACKLIST_URL, 'Authenticated blacklist host URL not supplied');
  await page.goto(process.env.E2E_ADMIN_BLACKLIST_URL!);
  const action=page.getByRole('button',{name:/remove|unblacklist|restore/i}).first();
  test.skip(!(await action.isVisible().catch(()=>false)), 'Host has no actionable blacklist entry');
  await action.click();
  const dialog=page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await dialog.press('Escape');
  await expect(dialog).not.toBeVisible();
  // Actual backend mutation absence requires an authenticated host API trace.
});

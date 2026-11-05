// HOST-ONLY: authenticated Next.js host required. Authored in RBG119, not executed here.
import { test, expect } from '@playwright/test';
test('Payouts gym dropdown keyboard navigation and disabled semantics', async ({page}) => {
  await page.goto('/frontend_admin/admin_finance/finance_payouts_management');
  const gym = page.getByRole('button', {name:/gym/i}).first();
  await gym.click();
  const combo = page.getByRole('combobox').first();
  await combo.press('End');
  await expect(combo).toHaveAttribute('aria-activedescendant', /option-/);
  await combo.press('Home');
  await combo.press('ArrowDown');
  await combo.press('Enter');
  await expect(gym).toHaveAttribute('aria-expanded','false');
});

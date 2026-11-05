// Host-only: requires authenticated Admin Next.js app and seeded Finance staff ledger records.
// NOT EXECUTED in the isolated role archive.
import { test, expect } from '@playwright/test';
test('staff ledger selector supports keyboard selection and restored focus', async ({ page }) => {
 await page.goto('/frontend_admin/admin_finance/finance_staff_ledger_management');
 const trigger=page.getByTestId('admin_hr-admin_hr-ledger-table-change');
 await expect(trigger).toBeVisible();
 await trigger.click();
 const input=page.getByRole('combobox');
 await expect(input).toBeVisible();
 await input.press('End');
 await expect(input).toHaveAttribute('aria-activedescendant',/option-\d+$/);
 await input.press('Home');await input.press('Enter');
 await expect(trigger).toBeFocused();
});

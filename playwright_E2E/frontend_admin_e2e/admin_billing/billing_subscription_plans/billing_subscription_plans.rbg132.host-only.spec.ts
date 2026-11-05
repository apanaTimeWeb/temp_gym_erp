// RBG132 host-only authenticated browser check. AUTHORED / NOT EXECUTED.
import { test, expect } from '@playwright/test';
test('a subscription plans upgrade CTA opens a single accessible confirmation before a write',async({page})=>{
 await page.goto('/admin/subscriptions/plans');
 const upgrade=page.getByTestId('admin_subscriptions-admin_subscriptions-plan-card-click').first();
 await expect(upgrade).toBeVisible();
 await upgrade.click();
 const dialog=page.getByRole('dialog');
 await expect(dialog).toBeVisible();
 await expect(dialog).toHaveAttribute('aria-modal','true');
 await page.keyboard.press('Escape');
 await expect(dialog).toHaveCount(0);
});

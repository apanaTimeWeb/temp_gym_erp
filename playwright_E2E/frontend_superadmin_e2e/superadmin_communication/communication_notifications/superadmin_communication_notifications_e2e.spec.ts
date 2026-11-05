import { expect, test } from '@playwright/test';
const route='/frontend_superadmin/superadmin_communication/communication_notifications';
const ready='superadmin-communication-notifications-page';
test.describe('Superadmin Notifications standalone workflow',()=>{
 test('loads standalone notifications view and no client overlay',async({page})=>{
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(route);
  await expect(page.getByTestId(ready)).toBeVisible();
  await expect(page.getByRole('heading',{name:/notifications/i})).toBeVisible();
  await expect(page.locator('nextjs-portal')).toHaveCount(0);
  expect(errors).toEqual([]);
 });
 test('redirects legacy messaging notifications tab',async({page})=>{
  await page.goto('/frontend_superadmin/superadmin_communication/communication_messaging_center?tab=notifications');
  await expect(page).toHaveURL(/communication_notifications/);
  await expect(page.getByTestId(ready)).toBeVisible();
 });
});

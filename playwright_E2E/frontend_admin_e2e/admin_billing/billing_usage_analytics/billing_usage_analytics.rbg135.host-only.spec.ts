// RBG135 authenticated host-only regression — NOT EXECUTED in a source-only bundle.
import {test,expect} from '@playwright/test';
test('upgrade prompt cancelled by Escape never issues an upgrade write',async({page})=>{
 let posts=0;
 page.on('request',request=>{if(request.url().includes('/admin/usage/upgrade-request')&&request.method()==='POST')posts++});
 await page.goto('/frontend_admin/admin_billing/billing_usage_analytics');
 const target=page.getByRole('button',{name:'Upgrade',exact:true}).first();await expect(target).toBeVisible();await target.click();
 const modal=page.getByRole('dialog');await expect(modal).toBeVisible();await page.keyboard.press('Escape');await expect(modal).toHaveCount(0);expect(posts).toBe(0);
});

// HOST E2E: requires a configured authenticated trainer storage-state and a running Next.js host.
import { test, expect } from '@playwright/test';
const base = process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000';
const route = '/frontend_trainer/trainer_operations/operations_leave_requests';
test.describe('trainer_operations/operations_leave_requests', () => {
  test('canonical trainer route mounts without a Next.js error', async ({page}) => {
    await page.goto(`${base}${route}`);
    await expect(page).toHaveURL(new RegExp(route.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    await expect(page.locator('#trainer-main-content')).toBeVisible();
    await expect(page.locator('body')).not.toContainText(/Application error|Internal Server Error/i);
  });
  test('has a visible role shell on a small viewport', async ({page}) => {
    await page.setViewportSize({width:390,height:844});
    await page.emulateMedia({reducedMotion:'reduce'});
    await page.goto(`${base}${route}`);
    await expect(page.locator('#trainer-sidebar')).toBeAttached();
    await expect(page.locator('#trainer-main-content')).toBeVisible();
  });
});

// Critical user action: do not silently close an invalid leave submission.
test('leave request open, required-field validation, cancel and reopen', async ({ page }) => {
  await page.goto(`${base}${route}`);
  await page.getByTestId('trainer_schedule-schedule-leave_requests_request_leave').click();
  const form = page.getByTestId('trainer_schedule-trainerschedulerequestleavemodal-form_3');
  await expect(form).toBeVisible();
  await page.getByTestId('trainer_schedule-schedule-request_leave_modal_submit').click();
  await expect(form).toBeVisible();
  await expect(form.locator('[aria-invalid="true"]')).not.toHaveCount(0);
  await page.getByTestId('trainer_schedule-trainerschedulerequestleavemodal-button_2').click();
  await expect(form).toBeHidden();
  await page.getByTestId('trainer_schedule-schedule-leave_requests_request_leave').click();
  await expect(form).toBeVisible();
});

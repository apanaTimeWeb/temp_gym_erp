// RESPONSIBILITY: Covers public form backend field errors and custom dirty-form navigation confirmation.
// FLOW: Playwright -> canonical shipped Next.js route -> intercepted mock booking/contact POST -> DOM feedback.
import { expect, test } from '@playwright/test';
const route = '/frontend_public/public_landing';
function futureDate(): string { const d = new Date(); d.setDate(d.getDate() + 7); return [d.getFullYear(), String(d.getMonth() + 1).padStart(2, '0'), String(d.getDate()).padStart(2, '0')].join('-'); }
test.describe('RBG4 public regression', () => {
  test('booking API 400 maps backend email field validation without erasing input', async ({ page }) => {
    await page.route('**/landing/bookings', async (request) => request.fulfill({ status: 400, contentType: 'application/json', body: JSON.stringify({ success: false, message: 'Form validation failed', data: null, statusCode: 400, errorCode: 'VALIDATION_ERROR', validationErrors: [{ field: 'email', message: 'This email is already registered.' }] }) }));
    await page.goto(`${route}#booking`);
    await page.getByTestId('public_landing-booking-name-input').fill('Member One');
    await page.getByTestId('public_landing-booking-email-input').fill('member@example.org');
    await page.getByTestId('public_landing-booking-phone-input').fill('9876543210');
    await page.getByTestId('public_landing-booking-date-input').fill(futureDate());
    await page.getByTestId('public_landing-booking-submit').click();
    await expect(page.getByTestId('public_landing-booking-email-error')).toHaveText('This email is already registered.');
    await expect(page.getByTestId('public_landing-booking-email-input')).toHaveValue('member@example.org');
  });
  test('dirty contact form offers accessible navigation confirmation and keeps query/hash', async ({ page }) => {
    await page.goto(`${route}#contact`);
    await page.getByTestId('public_landing-contact-name-input').fill('Unsaved Person');
    await page.evaluate(() => {
      const anchor = document.createElement('a'); anchor.href = '/frontend_public/public_landing?source=test#plans';
      anchor.textContent = 'Navigate internally'; document.body.appendChild(anchor); anchor.click(); anchor.remove();
    });
    await expect(page.getByRole('alertdialog', { name: 'Leave this page?' })).toBeVisible();
    await page.getByRole('button', { name: 'Stay on page' }).click();
    await expect(page.getByRole('alertdialog')).toHaveCount(0);
    await page.evaluate(() => {
      const anchor = document.createElement('a'); anchor.href = '/frontend_public/public_landing?source=test#plans';
      document.body.appendChild(anchor); anchor.click(); anchor.remove();
    });
    await page.getByRole('button', { name: 'Leave page' }).click();
    await expect(page).toHaveURL(/source=test#plans$/);
  });
});

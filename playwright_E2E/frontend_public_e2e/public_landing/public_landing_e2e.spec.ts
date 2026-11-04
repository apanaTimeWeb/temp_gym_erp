import { expect, test } from '@playwright/test';

function dateInputDaysFromToday(daysAhead: number): string {
  const date = new Date();
  date.setDate(date.getDate() + daysAhead);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

test.describe('PublicLanding major flows', () => {
  test('public navigation and BMI flow reach visible end states', async ({ page }) => {
    await page.goto('/frontend_public/public_landing');
    await page.getByRole('link', { name: 'Plans', exact: true }).click();
    await expect(page.locator('#plans')).toBeVisible();
    await page.getByLabel('Height (cm)').fill('175');
    await page.getByLabel('Weight (kg)').fill('70');
    await page.getByRole('button', { name: 'Calculate BMI', exact: true }).click();
    await expect(page.getByTestId('public_landing-bmi-result-value')).toHaveText('22.9');
  });

  test('booking retry reuses its idempotency key and creates one logical record', async ({ page }) => {
    const seenKeys: string[] = [];
    let attempts = 0;
    const processedKeys = new Set<string>();
    const logicalBookings: string[] = [];
    await page.route('**/landing/bookings', async (route) => {
      attempts += 1;
      const key = route.request().headers()['idempotency-key'] ?? '';
      seenKeys.push(key);
      if (key && !processedKeys.has(key)) {
        processedKeys.add(key);
        logicalBookings.push(key);
      }
      if (attempts === 1) {
        await route.fulfill({ status: 503, contentType: 'application/json', body: JSON.stringify({ success: false, message: 'Booking service is temporarily unavailable. Please try again.', data: null, errorCode: 'BOOKING_SERVICE_UNAVAILABLE' }) });
        return;
      }
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: true, message: 'Booking submitted successfully. Our team will contact you shortly.', data: null }) });
    });
    await page.goto('/frontend_public/public_landing#booking');
    await page.getByRole('radio', { name: 'Book Trial', exact: true }).check();
    await page.getByLabel('Full Name').fill('E2E Visitor');
    await page.getByLabel('Email Address').fill('visitor@example.org');
    await page.getByLabel('Phone / WhatsApp').fill('9876543210');
    await page.getByLabel('Preferred Date').fill(dateInputDaysFromToday(7));
    await page.getByRole('button', { name: 'Proceed to Book', exact: true }).click();
    await expect(page.getByTestId('public_landing-booking-api-error')).toBeVisible();
    await page.getByRole('button', { name: 'Try again', exact: true }).click();
    await expect(page.getByTestId('public_landing-booking-success-state')).toBeVisible();
    expect(attempts).toBe(2);
    expect(seenKeys[0]).toBeTruthy();
    expect(seenKeys[0]).toBe(seenKeys[1]);
    expect(logicalBookings).toHaveLength(1);
    expect(logicalBookings[0]).toBe(seenKeys[0]);
  });


  test('responsive layout avoids document overflow at supported viewport widths', async ({ page }) => {
    await page.goto('/frontend_public/public_landing');
    for (const width of [320, 375, 414, 600, 768, 1024, 1280, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await expect.poll(async () => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    }
    await page.evaluate(() => { document.documentElement.dir = 'rtl'; });
    await page.setViewportSize({ width: 375, height: 812 });
    await expect.poll(async () => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });

  test('mobile navigation closes with Escape and restores focus to its trigger', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/frontend_public/public_landing');
    const trigger = page.getByRole('button', { name: 'Open navigation menu', exact: true });
    await trigger.focus();
    await page.keyboard.press('Enter');
    const dialog = page.getByRole('dialog', { name: /menu/i });
    await expect(dialog).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test('contact reaches success after valid submit', async ({ page }) => {
    await page.route('**/landing/contact', async (route) => {
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: true, message: 'Your message has been received.', data: null }) });
    });
    await page.goto('/frontend_public/public_landing#contact');
    await page.getByLabel('Your Name').fill('E2E Visitor');
    await page.getByLabel('Email Address').fill('visitor@example.org');
    await page.getByLabel('Message').fill('Please share membership details.');
    await page.getByRole('button', { name: 'Send Message', exact: true }).click();
    await expect(page.getByTestId('public_landing-contact-success-state')).toBeVisible();
  });
});

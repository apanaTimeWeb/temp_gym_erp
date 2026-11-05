import { expect, test } from '@playwright/test';

const configured = (keys: string[]) => keys.every((key) => Boolean(process.env[key]));

test.describe('Superadmin critical security and mutation flows', () => {
  test('Gyms Directory masks administrator email in row text and title attributes', async ({ page }) => {
    const keys = [
      'E2E_GYMS_DIRECTORY_ROUTE',
      'E2E_GYMS_ADMIN_EMAIL_ROW_SELECTOR',
      'E2E_GYMS_RAW_ADMIN_EMAIL',
      'E2E_GYMS_EXPECTED_MASKED_EMAIL',
    ];
    test.skip(!configured(keys), 'Configure a host-backed Gyms Directory route, row selector, fixture email, and expected masked value.');

    await page.goto(process.env.E2E_GYMS_DIRECTORY_ROUTE!);
    const row = page.locator(process.env.E2E_GYMS_ADMIN_EMAIL_ROW_SELECTOR!);
    await expect(row).toBeVisible();
    await expect(row).toContainText(process.env.E2E_GYMS_EXPECTED_MASKED_EMAIL!);

    const rawEmail = process.env.E2E_GYMS_RAW_ADMIN_EMAIL!;
    expect(await row.innerText()).not.toContain(rawEmail);
    const titles = await row.locator('[title]').evaluateAll((nodes) =>
      nodes.map((node) => node.getAttribute('title') ?? ''),
    );
    expect(titles).not.toContain(rawEmail);
    expect(titles).toContain(process.env.E2E_GYMS_EXPECTED_MASKED_EMAIL!);
  });

  test('Ghost Login does not persist a tenant object or administrator email in browser storage', async ({ page }) => {
    const keys = ['E2E_GYMS_GHOST_LOGIN_ROUTE', 'E2E_GYMS_GHOST_LOGIN_ACTION_SELECTOR'];
    test.skip(!configured(keys), 'Configure an isolated Ghost Login route and accessible action selector.');

    await page.goto(process.env.E2E_GYMS_GHOST_LOGIN_ROUTE!);
    await page.locator(process.env.E2E_GYMS_GHOST_LOGIN_ACTION_SELECTOR!).click();
    await expect.poll(async () => page.evaluate(() => document.readyState)).toBe('complete');

    const persisted = await page.evaluate(() => ({
      sessionKeys: Object.keys(window.sessionStorage),
      sessionValues: Object.values(window.sessionStorage),
      localKeys: Object.keys(window.localStorage),
      localValues: Object.values(window.localStorage),
    }));
    const allKeys = [...persisted.sessionKeys, ...persisted.localKeys];
    const allValues = [...persisted.sessionValues, ...persisted.localValues];
    expect(allKeys).not.toContain('APP_SUPERADMIN_GYMS_GHOST_LOGIN_SESSION_V1');
    expect(allValues.some((value) => /adminEmail|"adminEmail"|"ownerEmail"/i.test(value))).toBe(false);
    expect(allValues.some((value) => /ghostTenant\s*[:=]\s*\{/.test(value))).toBe(false);
  });

  test('A configured destructive or financial action requires confirmation before the result appears', async ({ page }) => {
    const keys = [
      'E2E_SUPERADMIN_CONFIRM_ROUTE',
      'E2E_SUPERADMIN_ACTION_SELECTOR',
      'E2E_SUPERADMIN_CONFIRM_SELECTOR',
      'E2E_SUPERADMIN_RESULT_SELECTOR',
    ];
    test.skip(!configured(keys), 'Configure an isolated destructive/financial flow with action, confirmation, and resulting-state selectors.');

    await page.goto(process.env.E2E_SUPERADMIN_CONFIRM_ROUTE!);
    const result = page.locator(process.env.E2E_SUPERADMIN_RESULT_SELECTOR!);
    await expect(result).toHaveCount(0);
    await page.locator(process.env.E2E_SUPERADMIN_ACTION_SELECTOR!).click();
    await expect(page.locator(process.env.E2E_SUPERADMIN_CONFIRM_SELECTOR!)).toBeVisible();
    await page.locator(process.env.E2E_SUPERADMIN_CONFIRM_SELECTOR!).click();
    await expect(result).toBeVisible();
  });
});

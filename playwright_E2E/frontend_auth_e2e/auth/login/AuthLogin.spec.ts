import { expect, test } from '@playwright/test';

import { StatusCodes } from 'http-status-codes';

import { AuthLoginE2eRouteConstants } from './AuthLoginE2eRouteConstants';



/**
 * RESPONSIBILITY: Proves the public Auth Login route and secure Auth route contracts through user-observable browser behavior.
 * DATA FLOW: Browser route -> Login UI -> Auth actions -> session/refresh/logout endpoints -> observable result.
 */
test.describe('Auth Login', () => {
  test('renders the Login controls and blocks an empty submission', async ({ page }) => {
    await page.goto(AuthLoginE2eRouteConstants.PAGES.LOGIN);
    await expect(page.getByTestId('auth_login-form-email')).toBeVisible();
    await expect(page.getByTestId('auth_login-form-password')).toBeVisible();
    await page.getByTestId('auth_login-form-submit').click();
    await expect(page.getByTestId('auth_login-form-email-error')).toBeVisible();
    await expect(page.getByTestId('auth_login-form-password-error')).toBeVisible();
  });

  test('toggles password visibility without submitting the form', async ({ page }) => {
    await page.goto(AuthLoginE2eRouteConstants.PAGES.LOGIN);
    const password = page.getByTestId('auth_login-form-password');
    const toggle = page.getByTestId('auth_login-form-password-toggle');
    await password.fill('demo123');
    await toggle.click();
    await expect(password).toHaveAttribute('type', 'text');
    await expect(page.getByTestId('auth_login-form-password-toggle')).toHaveAttribute('aria-pressed', 'true');
  });

  test('executes the supplied host login journey when credentials are configured', async ({ page }) => {
    test.skip(!process.env.AUTH_E2E_EMAIL || !process.env.AUTH_E2E_PASSWORD, 'Requires host application Auth E2E credentials and working session/backend infrastructure.');
    await page.goto(AuthLoginE2eRouteConstants.PAGES.LOGIN);
    await page.getByTestId('auth_login-form-email').fill(process.env.AUTH_E2E_EMAIL!);
    await page.getByTestId('auth_login-form-password').fill(process.env.AUTH_E2E_PASSWORD!);
    await page.getByTestId('auth_login-form-submit').click();
    const dashboardTargets = [
      AuthLoginE2eRouteConstants.PAGES.SUPERADMIN_DASHBOARD,
      AuthLoginE2eRouteConstants.PAGES.ADMIN_DASHBOARD,
      AuthLoginE2eRouteConstants.PAGES.MANAGER_DASHBOARD,
      AuthLoginE2eRouteConstants.PAGES.TRAINER_DASHBOARD,
    ];
    await expect.poll(() => dashboardTargets.includes(new URL(page.url()).pathname)).toBe(true);
  });

  test('rejects an unauthenticated refresh request instead of creating a session', async ({ page }) => {
    const response = await page.request.post(AuthLoginE2eRouteConstants.API.REFRESH);
    expect(response.status()).toBe(StatusCodes.UNAUTHORIZED);
    const body = await response.json();
    expect(body.data).toBeNull();
  });

  test('accepts idempotent local logout cleanup without requiring browser token access', async ({ page }) => {
    const response = await page.request.post(AuthLoginE2eRouteConstants.API.LOGOUT);
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.data).toBeNull();
    const setCookieHeader = response.headers()['set-cookie'] || '';
    expect(setCookieHeader).toContain('HttpOnly');
  });

  test('keeps the Login surface usable at the mobile breakpoint', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(AuthLoginE2eRouteConstants.PAGES.LOGIN);
    await expect(page.getByTestId('auth_login-form-root')).toBeVisible();
    await expect(page.getByTestId('auth_login-form-email')).toBeVisible();
    await expect(page.getByTestId('auth_login-form-password')).toBeVisible();
    await expect(page.getByTestId('auth_login-hero_secure-status')).toBeHidden();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });

  test('keeps the Login surface usable at the documented narrow 320px viewport', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 720 });
    await page.goto(AuthLoginE2eRouteConstants.PAGES.LOGIN);
    await expect(page.getByTestId('auth_login-form-root')).toBeVisible();
    await expect(page.getByTestId('auth_login-form-password-toggle')).toBeVisible();
    await expect(page.getByTestId('auth_login-hero_secure-status')).toBeHidden();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });

  test('keeps the Login tablet layout usable at 768px without showing the desktop hero', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 900 });
    await page.goto(AuthLoginE2eRouteConstants.PAGES.LOGIN);
    await expect(page.getByTestId('auth_login-form-root')).toBeVisible();
    await expect(page.getByTestId('auth_login-hero_secure-status')).toBeHidden();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });

  test('keeps the desktop hero and two-column geometry at the desktop breakpoint', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(AuthLoginE2eRouteConstants.PAGES.LOGIN);
    await expect(page.getByTestId('auth_login-hero_secure-status')).toBeVisible();
    await expect(page.getByTestId('auth_login-form-root')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });

});

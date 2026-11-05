import { expect, test } from '@playwright/test';

const dashboardRoute = '/frontend_superadmin/superadmin_dashboard';
const hostAuthConfigured = Boolean(process.env.E2E_BASE_URL && (process.env.E2E_STORAGE_STATE || process.env.E2E_AUTH_SETUP === 'true'));
const sidebarToggle = 'SuperadminPlatformShellLayoutStyles-superadmin-header-superadmin-header-toggle-sidebar';
const backdrop = 'superadmin_platform_shell_layout-superadminsidebar-interaction-layer-1';
const tabletSearch = 'SuperadminPlatformShellLayoutStyles-superadmin-sidebar-superadmin-sidebar-tablet-search';
const sidebarSearchInput = 'SuperadminPlatformShellLayoutStyles-superadmin-sidebar-layout-superadmin-sidebar-text';
const profileToggle = 'SuperadminPlatformShellLayoutStyles-superadmin-header-profile-header-profile-profile-menu';

test.describe('Superadmin role layout interactions', () => {
  test.beforeEach(() => {
    test.skip(!hostAuthConfigured, 'Requires the integrated host URL and either an authenticated storage state or configured real auth setup.');
  });

  test('mobile drawer overlays the backdrop and closes when backdrop is activated', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(dashboardRoute);
    await page.getByTestId(sidebarToggle).click();

    const backdropLayer = page.getByTestId(backdrop);
    const sidebar = page.locator('aside[aria-label]');
    await expect(backdropLayer).toBeVisible();
    const backdropZ = await backdropLayer.evaluate((element) => Number(window.getComputedStyle(element).zIndex));
    const sidebarZ = await sidebar.evaluate((element) => Number(window.getComputedStyle(element).zIndex));
    expect(sidebarZ).toBeGreaterThan(backdropZ);

    await backdropLayer.click({ position: { x: 380, y: 30 } });
    await expect(backdropLayer).toHaveCount(0);
  });

  test('tablet collapsed sidebar search button reveals and focuses its search field', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.goto(dashboardRoute);
    await page.getByTestId(sidebarToggle).click();
    const searchButton = page.getByTestId(tabletSearch);
    await expect(searchButton).toBeVisible();
    await searchButton.click();
    const input = page.getByTestId(sidebarSearchInput);
    await expect(input).toBeVisible();
    await expect(input).toBeFocused();
  });

  test('profile menu closes on Escape and restores focus to its trigger', async ({ page }) => {
    await page.goto(dashboardRoute);
    const trigger = page.getByTestId(profileToggle);
    await trigger.click();
    const menu = page.getByRole('menu');
    await expect(menu).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(menu).toHaveCount(0);
    await expect(trigger).toBeFocused();
  });
});

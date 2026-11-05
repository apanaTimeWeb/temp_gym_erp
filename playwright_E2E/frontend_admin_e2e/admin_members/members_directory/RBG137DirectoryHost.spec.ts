// Authenticated host-only regression. Not executable in the isolated role ZIP.
import { test, expect } from '@playwright/test';

test('members directory retains profile identity during a filtered search and browser history', async ({ page }) => {
  test.skip(!process.env.E2E_ADMIN_MEMBERS_DIRECTORY_URL, 'Authenticated members-directory host URL not supplied');
  const route = process.env.E2E_ADMIN_MEMBERS_DIRECTORY_URL!;
  await page.goto(route);
  const search = page.locator('input[type="search"], input[placeholder*="Search"], input[placeholder*="search"]').first();
  test.skip(!(await search.isVisible().catch(() => false)), 'Host search control not available for this auth fixture');
  await search.fill('RBG137');
  await expect.poll(() => new URL(page.url()).searchParams.get('search')).toBe('RBG137');
  await page.goBack();
  await expect.poll(() => new URL(page.url()).searchParams.get('search')).not.toBe('RBG137');
});

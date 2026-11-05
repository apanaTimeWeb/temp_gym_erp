import { test, expect } from '@playwright/test';
// Requires the authenticated host's existing storageState and the module-owned MSW registration.
test('cache workspace is independently reachable and a flush requires confirmation', async ({ page }) => {
 await page.goto('/frontend_superadmin/superadmin_system_ops/system_ops_cache_management');
 await expect(page.getByRole('heading', { name: /Redis cache management/i })).toBeVisible();
 await page.getByTestId('superadmin_system_ops_cache_management-superadmin-system-ops-infrastructure-redis-controls-redis-controls-flush-all').click();
 await expect(page.getByRole('dialog')).toBeVisible();
 await page.getByRole('dialog').getByRole('button', { name: /cancel/i }).click();
 await expect(page.getByRole('dialog')).toHaveCount(0);
});

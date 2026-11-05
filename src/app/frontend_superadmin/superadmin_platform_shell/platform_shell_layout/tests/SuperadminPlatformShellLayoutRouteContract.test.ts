import { describe, expect, it } from 'vitest';
import { SUPERADMIN_PLATFORM_SHELL_LAYOUT_ROUTES } from '@/app/frontend_superadmin/superadmin_platform_shell/platform_shell_layout/config/superadmin_platform_shell_layout.url_config';

describe('Superadmin layout route contract', () => {
  it('exposes the canonical module-owned main route without duplicating a host route tree', () => {
    expect(SUPERADMIN_PLATFORM_SHELL_LAYOUT_ROUTES.MAIN).toBe('/superadmin');
  });
});

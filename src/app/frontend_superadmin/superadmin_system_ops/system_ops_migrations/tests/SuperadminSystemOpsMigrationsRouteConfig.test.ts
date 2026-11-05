import { describe, expect, it } from 'vitest';

import { SUPERADMIN_SYSTEM_OPS_MIGRATIONS_ROUTES } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_migrations/config/superadmin_system_ops_migrations.url_config';

describe('Superadmin System Ops Migrations route contract', () => {
  it('uses the canonical leaf as the primary route and exposes no deleted alias', () => {
    const canonical = '/frontend_superadmin/superadmin_system_ops/system_ops_migrations';
    expect(SUPERADMIN_SYSTEM_OPS_MIGRATIONS_ROUTES.MAIN).toBe(canonical);
    expect(SUPERADMIN_SYSTEM_OPS_MIGRATIONS_ROUTES.CANONICAL_LEAF).toBe(canonical);
    expect(JSON.stringify(SUPERADMIN_SYSTEM_OPS_MIGRATIONS_ROUTES)).not.toContain('LEGACY_PATH');
    expect(JSON.stringify(SUPERADMIN_SYSTEM_OPS_MIGRATIONS_ROUTES)).not.toContain('/superadmin_system_ops/superadmin_system_ops_migrations');
  });
});

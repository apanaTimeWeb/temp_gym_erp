// RESPONSIBILITY: Renders the SuperadminSystemOpsMigrationsBasic.test UI for the system ops feature. Business/data orchestration is delegated to module-owned hooks.
import { describe, expect, it } from 'vitest';

import { SUPERADMIN_MIGRATION_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_migrations/constants/superadmin_system_ops_migrations.constants';
import { MOCK_MIGRATIONS } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_migrations/mocks/SuperadminSystemOpsMigrationsMockData';



describe('Superadmin Migrations fixture behavior', () => {
  it('contains completed, pending, and failed migration states for status UI coverage', () => {
    expect(MOCK_MIGRATIONS).toHaveLength(3);
    expect(new Set(MOCK_MIGRATIONS.map((migration) => migration.status))).toEqual(new Set([SUPERADMIN_MIGRATION_STATUS_CODES.COMPLETED, SUPERADMIN_MIGRATION_STATUS_CODES.PENDING, SUPERADMIN_MIGRATION_STATUS_CODES.FAILED]));
    expect(MOCK_MIGRATIONS.find((migration) => migration.status === SUPERADMIN_MIGRATION_STATUS_CODES.FAILED)?.errorLog).toBeTruthy();
  });
});

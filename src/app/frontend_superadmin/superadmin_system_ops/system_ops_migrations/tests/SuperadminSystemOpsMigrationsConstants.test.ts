// RESPONSIBILITY: Verifies the public utility contract of the owning feature utility module.
import { describe, expect, it } from 'vitest';

import { SUPERADMIN_MIGRATION_STATUS_STYLES, isValidMigrationTargetVersion } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_migrations/constants/superadmin_system_ops_migrations.constants';



describe('SUPERADMIN_MIGRATION_STATUS_STYLES', () => {
  it('contains semantic visual mappings', () => {
    expect(Object.keys(SUPERADMIN_MIGRATION_STATUS_STYLES).length).toBeGreaterThan(0);
  });
});

describe('migration target version syntax', () => {
  it('accepts the documented dotted release version forms', () => { expect(isValidMigrationTargetVersion('v1.6.0')).toBe(true); expect(isValidMigrationTargetVersion('2026.10')).toBe(true); expect(isValidMigrationTargetVersion('2026.10.1')).toBe(true); });
  it('rejects empty and malformed version strings', () => { for (const value of ['', '   ', 'latest', 'v1', '1.2.3;DROP']) expect(isValidMigrationTargetVersion(value)).toBe(false); });
});

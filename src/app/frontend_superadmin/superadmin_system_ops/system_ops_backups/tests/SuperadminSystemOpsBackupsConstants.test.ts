import { describe, expect, it } from 'vitest';

import { SUPERADMIN_BACKUPS_STATUS_COLORS, SUPERADMIN_BACKUPS_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/constants/superadmin_system_ops_backups.constants';

describe('SUPERADMIN_BACKUPS_STATUS_COLORS', () => {
  it('maps each active list status to approved semantic tokens', () => {
    expect(SUPERADMIN_BACKUPS_STATUS_COLORS[SUPERADMIN_BACKUPS_STATUS_CODES.SUCCESS]).toContain('text-success');
    expect(SUPERADMIN_BACKUPS_STATUS_COLORS[SUPERADMIN_BACKUPS_STATUS_CODES.IN_PROGRESS]).toContain('text-primary');
    expect(SUPERADMIN_BACKUPS_STATUS_COLORS[SUPERADMIN_BACKUPS_STATUS_CODES.FAILED]).toContain('text-danger');
  });
});

import {describe, expect, it, beforeEach} from 'vitest';

import { resetSuperadminBackupsMockState } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/mocks/SuperadminSystemOpsBackupsMockHandlers';
import { SUPERADMIN_BACKUPS_HEALTH_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/mocks/SuperadminSystemOpsBackupsV1MockFixtures';
import { SuperadminBackupsV1DataSchema } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/schemas/superadmin_system_ops_backups_v1.schemas';


beforeEach(() => {
  resetSuperadminBackupsMockState();
});

describe('Backup Safety & Restore Readiness contract', () => {
    it('accepts the complete module fixture', () => {
        const result = SuperadminBackupsV1DataSchema.safeParse(SUPERADMIN_BACKUPS_HEALTH_MOCK_FIXTURE);
        expect(result.success).toBe(true);
    });
});

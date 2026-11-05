import { beforeEach, describe, expect, it, vi } from 'vitest';

import { superadminSystemOpsMigrationsApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_migrations/api/superadmin_system_ops_migrations_api_fetch.api';
import { migrationsApi } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_migrations/api/superadmin_system_ops_migrations.api';
import { SUPERADMIN_MIGRATION_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_migrations/constants/superadmin_system_ops_migrations.constants';



vi.mock('@/app/frontend_superadmin/superadmin_system_ops/system_ops_migrations/api/superadmin_system_ops_migrations_api_fetch.api', () => ({
    superadminSystemOpsMigrationsApiFetch: vi.fn(),
}));

describe('migrationsApi contract', () => {
    beforeEach(() => vi.clearAllMocks());

    it('calls the feature endpoint with encoded server-side filter parameters and its Zod boundary', async () => {
        const payload = {
            success: true,
            message: 'Migrations loaded',
            data: [{
                id: 'MIG-001',
                tenantId: 'GYM-001',
                status: SUPERADMIN_MIGRATION_STATUS_CODES.COMPLETED,
                startedAt: '2026-01-01T10:00:00Z',
                completedAt: '2026-01-01T10:05:00Z',
            }],
        };
        vi.mocked(apiFetch).mockResolvedValue(payload as never);

        const result = await migrationsApi.fetchMigrations({ status: SUPERADMIN_MIGRATION_STATUS_CODES.FAILED, page: '1' });

        expect(apiFetch).toHaveBeenCalledWith(
            expect.stringContaining('?status=FAILED&page=1'),
            expect.objectContaining({ dataSchema: expect.anything() }),
        );
        expect(result).toEqual(payload);
    });

    it('sends the target version and one explicit idempotency key on migration trigger', async () => {
        const payload = { success: true, message: 'Migration triggered', data: { id: 'MIG-002', version: '2026.10', status: 'QUEUED' } };
        vi.mocked(apiFetch).mockResolvedValue(payload as never);

        await migrationsApi.startMigration('2026.10', 'migration-intent-001');

        expect(apiFetch).toHaveBeenCalledWith(
            expect.any(String),
            expect.objectContaining({
                method: 'POST',
                body: JSON.stringify({ targetVersion: '2026.10' }),
                headers: { 'Idempotency-Key': 'migration-intent-001' },
                dataSchema: expect.anything(),
            }),
        );
    });

    it('preserves the backend failure envelope instead of hiding the message', async () => {
        const payload = { success: false, message: 'Tenant database is locked' };
        vi.mocked(apiFetch).mockResolvedValue(payload as never);

        const result = await migrationsApi.startMigration('2026.10', 'migration-intent-locked');

        expect(result.success).toBe(false);
        expect(result.message).toBe('Tenant database is locked');
    });
});

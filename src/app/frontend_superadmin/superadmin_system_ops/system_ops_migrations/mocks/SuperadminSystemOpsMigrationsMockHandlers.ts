import { http, HttpResponse, delay } from 'msw';

import { SUPERADMIN_SYSTEM_OPS_MIGRATIONS_API } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_migrations/config/superadmin_system_ops_migrations.url_config';
import { SUPERADMIN_MIGRATION_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_migrations/constants/superadmin_system_ops_migrations.constants';
import { MOCK_MIGRATIONS } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_migrations/mocks/SuperadminSystemOpsMigrationsMockData';

import type { MigrationLog } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_migrations/types/superadmin_system_ops_migrations.types';
import type { ApiResponse } from '@/lib/api';


/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminSystemOpsMigrationsMockHandlers owned by the superadmin_system_ops_migrations feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: msw, @/app/frontend_superadmin/superadmin_system_ops/system_ops_migrations/mocks/SuperadminSystemOpsMigrationsMockData, @/app/frontend_superadmin/superadmin_system_ops/system_ops_migrations/constants/superadmin_system_ops_migrations.constants, @/app/frontend_superadmin/superadmin_system_ops/system_ops_migrations/config/superadmin_system_ops_migrations.url_config, @/app/frontend_superadmin/superadmin_system_ops/system_ops_migrations/types/superadmin_system_ops_migrations.types, @/lib/api
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Provides deterministic MSW scenarios for the Superadmin migrations API contract.


const migrationLogs: MigrationLog[] = [...MOCK_MIGRATIONS];
const responsesByIdempotencyKey = new Map<string, { targetVersion: string; response: MigrationLog }>();

/** Reset mutable MSW state between tests and isolated mock sessions. */
export function resetSuperadminSystemOpsMigrationsMockState(): void {
  migrationLogs.splice(0, migrationLogs.length, ...MOCK_MIGRATIONS);
  responsesByIdempotencyKey.clear();
}
export const superadminMigrationsHandlers = [
    http.get('*' + SUPERADMIN_SYSTEM_OPS_MIGRATIONS_API.BASE, async () => {
        await delay(400);
        return HttpResponse.json<ApiResponse<MigrationLog[]>>({
            success: true,
            message: 'Success',
            data: migrationLogs,
            requestId: crypto.randomUUID(),
        });
    }),
    http.post('*' + SUPERADMIN_SYSTEM_OPS_MIGRATIONS_API.TRIGGER, async ({ request }) => {
        await delay(600);
        const body = (await request.json()) as { targetVersion?: unknown };
        const targetVersion = typeof body.targetVersion === 'string' ? body.targetVersion.trim() : '';
        const idempotencyKey = request.headers.get('Idempotency-Key')?.trim();
        if (!idempotencyKey || !targetVersion) {
            return HttpResponse.json({ success: false, message: !idempotencyKey ? 'An idempotency key is required.' : 'A target version is required.', errorCode: 'VALIDATION_ERROR', statusCode: 400, requestId: crypto.randomUUID(), data: null}, { status: 400 });
        }
        const previous = responsesByIdempotencyKey.get(idempotencyKey);
        if (previous) {
            if (previous.targetVersion !== targetVersion) {
                return HttpResponse.json({ success: false, message: 'This idempotency key was already used for a different target version.', errorCode: 'CONFLICT', statusCode: 409, requestId: crypto.randomUUID(), data: null}, { status: 409 });
            }
            return HttpResponse.json<ApiResponse<MigrationLog>>({ success: true, message: 'Migration already triggered for this intent', data: previous.response, requestId: crypto.randomUUID()});
        }
        const newMigration: MigrationLog = {
            id: `migration-${Date.now()}-${responsesByIdempotencyKey.size + 1}`,
            version: targetVersion,
            description: 'Manual schema rollout',
            appliedAt: null,
            status: SUPERADMIN_MIGRATION_STATUS_CODES.IN_PROGRESS,
            targetTenants: 'ALL',
            durationMs: null,
            errorLog: null,
        };
        migrationLogs.unshift(newMigration);
        responsesByIdempotencyKey.set(idempotencyKey, { targetVersion, response: newMigration });
        return HttpResponse.json<ApiResponse<MigrationLog>>({ success: true, message: 'Migration triggered', data: newMigration, requestId: crypto.randomUUID()});
    }),
];

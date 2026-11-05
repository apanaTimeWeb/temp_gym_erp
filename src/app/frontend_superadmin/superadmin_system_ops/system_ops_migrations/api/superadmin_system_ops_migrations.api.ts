import { superadminSystemOpsMigrationsApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_migrations/api/superadmin_system_ops_migrations_api_fetch.api';
import { SUPERADMIN_SYSTEM_OPS_MIGRATIONS_API } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_migrations/config/superadmin_system_ops_migrations.url_config';
import { MigrationTriggerResponseSchema, SuperadminMigrationsListDataSchema } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_migrations/schemas/superadmin_system_ops_migrations_api.schemas';

import type { MigrationLog } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_migrations/types/superadmin_system_ops_migrations.types';


/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminSystemOpsMigrationsApi owned by the superadmin_system_ops_migrations feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_system_ops/system_ops_migrations/schemas/superadmin_system_ops_migrations_api.schemas, @/app/frontend_superadmin/superadmin_system_ops/system_ops_migrations/api/superadmin_system_ops_migrations_api_fetch.api, @/app/frontend_superadmin/superadmin_system_ops/system_ops_migrations/config/superadmin_system_ops_migrations.url_config, @/app/frontend_superadmin/superadmin_system_ops/system_ops_migrations/types/superadmin_system_ops_migrations.types, @/lib/api
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Owns all Superadmin migration API calls and validates every response at the API boundary.


export const migrationsApi = {
    fetchMigrations: (params?: Record<string, string>) => {
        const search = params ? `?${new URLSearchParams(params).toString()}` : '';
        return apiFetch<MigrationLog[]>(`${SUPERADMIN_SYSTEM_OPS_MIGRATIONS_API.BASE}${search}`, { dataSchema: SuperadminMigrationsListDataSchema });
    },
    startMigration: (targetVersion: string, idempotencyKey: string) => apiFetch<{ id: string; version: string; status: string }>(SUPERADMIN_SYSTEM_OPS_MIGRATIONS_API.TRIGGER, {
        method: 'POST',
        body: JSON.stringify({ targetVersion }),
        headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: MigrationTriggerResponseSchema,
    }),
};

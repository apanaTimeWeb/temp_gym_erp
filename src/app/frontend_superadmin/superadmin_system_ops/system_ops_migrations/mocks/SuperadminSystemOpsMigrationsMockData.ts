/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminSystemOpsMigrationsMockData owned by the superadmin_system_ops_migrations feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_system_ops/system_ops_migrations/constants/superadmin_system_ops_migrations.constants, @/app/frontend_superadmin/superadmin_system_ops/system_ops_migrations/types/superadmin_system_ops_migrations.types
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Module-owned mock fixture data for Superadmin.
import { SUPERADMIN_MIGRATION_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_migrations/constants/superadmin_system_ops_migrations.constants';

import type { MigrationLog } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_migrations/types/superadmin_system_ops_migrations.types';


export const MOCK_MIGRATIONS: MigrationLog[] = [
    {
        id: 'mig-1',
        version: 'v1.4.2',
        description: 'Added composite index on tenant members table',
        appliedAt: '2026-09-01T10:00:00Z',
        status: SUPERADMIN_MIGRATION_STATUS_CODES.COMPLETED,
        targetTenants: 'ALL_ACTIVE',
        durationMs: 4500,
        errorLog: null
    },
    {
        id: 'mig-2',
        version: 'v1.5.0',
        description: 'Migrating legacy billing schemas to Stripe unified model',
        appliedAt: null,
        status: SUPERADMIN_MIGRATION_STATUS_CODES.PENDING,
        targetTenants: 'LEGACY_TIER',
        durationMs: null,
        errorLog: null
    },
    {
        id: 'mig-3',
        version: 'v1.4.1',
        description: 'Hotfix: alter column type for attendance timestamps',
        appliedAt: '2026-08-15T08:30:00Z',
        status: SUPERADMIN_MIGRATION_STATUS_CODES.FAILED,
        targetTenants: 'ALL',
        durationMs: 1200,
        errorLog: 'Relation "attendance_logs" is locked by concurrent transaction'
    }
];

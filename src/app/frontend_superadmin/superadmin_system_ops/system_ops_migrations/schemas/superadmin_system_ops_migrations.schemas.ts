/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminSystemOpsMigrationsSchema owned by the superadmin_system_ops_migrations feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: zod
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import { z } from 'zod';

export const MigrationStatusSchema = z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'FAILED', 'ROLLED_BACK', 'SUCCESS', 'ROLLBACK']);

export const MigrationLogSchema = z.object({
    id: z.string(),
    version: z.string(),
    description: z.string(),
    appliedAt: z.string().nullable().optional(),
    status: MigrationStatusSchema,
    targetTenants: z.string().optional(),
    durationMs: z.number().nullable().optional(),
    errorLog: z.string().nullable().optional(),
    executedAt: z.string().optional(),
    executedBy: z.string().optional(),
    errorDetails: z.string().optional(),
});

export const SuperadminMigrationsTenantSchema = z.object({
    id: z.string(),
    name: z.string(),
    plan: z.string(),
});

export const SchemaMigrationSchema = z.object({
    id: z.string(),
    name: z.string(),
    appliedAt: z.string().nullable(),
    status: z.enum(['PENDING', 'SUCCESS', 'FAILED']),
});

export const MigrationsPageDataSchema = z.object({
    migrations: z.array(SchemaMigrationSchema),
    tenants: z.array(SuperadminMigrationsTenantSchema),
});

/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminSystemOpsTypesSchemas owned by the superadmin_system_ops feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: zod
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import { z } from 'zod';

export const SuperadminSystemOpsHealthStatusSchema = z.enum(['HEALTHY', 'DEGRADED', 'DOWN']);

export const SuperadminSystemOpsJobStatusSchema = z.enum(['IDLE', 'PENDING', 'FAILED']);

export const SuperadminSystemOpsBackupStatusSchema = z.enum(['HEALTHY', 'DEGRADED', 'FAILED']);

export const SuperadminSystemOpsMigrationStatusSchema = z.enum(['UP_TO_DATE', 'PENDING', 'FAILED']);

export const SuperadminSystemOpsSummarySchema = z.object({
  infrastructureStatus: SuperadminSystemOpsHealthStatusSchema,
  pendingJobs: z.number().int().nonnegative(),
  lastBackupAt: z.string().datetime().nullable(),
  backupStatus: SuperadminSystemOpsBackupStatusSchema,
  migrationStatus: SuperadminSystemOpsMigrationStatusSchema,
});

/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminSystemOpsBackupsSchema owned by the superadmin_system_ops_backups feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: zod
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import { z } from 'zod';

export const BackupRecordSchema = z.object({
    id: z.string(),
    tenantName: z.string(),
    databaseName: z.string(),
    sizeMB: z.number(),
    status: z.enum(['SUCCESS', 'FAILED', 'IN_PROGRESS']),
    timestamp: z.string()
});

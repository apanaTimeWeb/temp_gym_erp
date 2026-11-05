/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminSystemOpsBackupsV1Schema owned by the superadmin_system_ops_backups feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: zod
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import { z } from 'zod';

export const SuperadminBackupsV1DataSchema = z.object({ summary: z.object({ healthy: z.number(), warning: z.number(), failed: z.number(), lastRestoreTest: z.string(), restoreTestStatus: z.string(), recoveryPointTarget: z.string(), recoveryTimeTarget: z.string() }), tenants: z.array(z.object({ gym: z.string(), lastBackup: z.string(), size: z.string(), ageHours: z.number(), status: z.string() })), restoreHistory: z.array(z.object({ date: z.string(), scope: z.string(), durationMinutes: z.number(), status: z.string() })) });

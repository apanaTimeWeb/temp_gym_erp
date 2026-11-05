/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminSystemOpsBackupsApiSchema owned by the superadmin_system_ops_backups feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: zod, @/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/schemas/superadmin_system_ops_backups.schemas
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import { z } from 'zod';

import { BackupRecordSchema } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/schemas/superadmin_system_ops_backups.schemas';



export const SuperadminBackupsListDataSchema = z.array(BackupRecordSchema);
export const SuperadminBackupsNullDataSchema = z.null();
export const SuperadminBackupDownloadDataSchema = z.object({ downloadUrl: z.string().min(1) });

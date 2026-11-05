import type { BackupRecordSchema } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/schemas/superadmin_system_ops_backups.schemas';

import type { infer as ZodInfer } from 'zod';


// RESPONSIBILITY: Encapsulates functionality for superadmin_backups_types.ts
export type BackupRecord = ZodInfer<typeof BackupRecordSchema>;

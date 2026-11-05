import type { SuperadminSystemOpsBackupsV1ResponseSchema } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/schemas/superadmin_system_ops_backups_v1_response.schemas';
import type { SuperadminBackupsV1DataSchema } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/schemas/superadmin_system_ops_backups_v1.schemas';

import type { infer as ZodInfer } from 'zod';


// RESPONSIBILITY: Defines the runtime-validated data contract for Backup Safety & Restore Readiness.

export type SuperadminBackupsV1Data = ZodInfer<typeof SuperadminBackupsV1DataSchema>;
export type SuperadminBackupsV1Response = ZodInfer<typeof SuperadminSystemOpsBackupsV1ResponseSchema>;
export interface SuperadminBackupsV1SectionProps {
    data: SuperadminBackupsV1Data;
}

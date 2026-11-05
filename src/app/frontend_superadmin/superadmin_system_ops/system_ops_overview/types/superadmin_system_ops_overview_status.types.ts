import { SuperadminSystemOpsHealthStatusSchema, SuperadminSystemOpsJobStatusSchema, SuperadminSystemOpsBackupStatusSchema, SuperadminSystemOpsMigrationStatusSchema, SuperadminSystemOpsSummarySchema } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_overview/schemas/superadmin_system_ops_overview_types.schemas';

import type { infer as ZodInfer } from 'zod';


// RESPONSIBILITY: Defines the validated API contract for the Superadmin System Ops summary feature.
export type SuperadminSystemOpsHealthStatus = ZodInfer<typeof SuperadminSystemOpsHealthStatusSchema>;
export type SuperadminSystemOpsJobStatus = ZodInfer<typeof SuperadminSystemOpsJobStatusSchema>;
export type SuperadminSystemOpsBackupStatus = ZodInfer<typeof SuperadminSystemOpsBackupStatusSchema>;
export type SuperadminSystemOpsMigrationStatus = ZodInfer<typeof SuperadminSystemOpsMigrationStatusSchema>;
export type SuperadminSystemOpsSummary = ZodInfer<typeof SuperadminSystemOpsSummarySchema>;

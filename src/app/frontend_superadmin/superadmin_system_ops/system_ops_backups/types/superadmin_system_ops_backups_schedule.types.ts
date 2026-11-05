import type { SuperadminSystemOpsBackupsScheduleSchema, SuperadminBackupsScheduleInputSchema } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/schemas/superadmin_system_ops_backups_schedule.schemas';

import type { infer as ZodInfer } from 'zod';


export type SuperadminBackupsSchedule = ZodInfer<typeof SuperadminSystemOpsBackupsScheduleSchema>;
export type SuperadminBackupsScheduleInput = ZodInfer<typeof SuperadminBackupsScheduleInputSchema>;
